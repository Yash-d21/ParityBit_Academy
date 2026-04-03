import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDir: number;
  color: string;
}

interface GeomShape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'hexagon' | 'triangle' | 'ring';
  color: string;
}

const COLORS = {
  blue: 'rgba(59,130,246,',
  violet: 'rgba(124,58,237,',
  cyan: 'rgba(34,211,238,',
};

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<GeomShape[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const colorKeys = Object.values(COLORS);
    particlesRef.current = Array.from({ length: 110 }, () => {
      const color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.35 + 0.08,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
        color,
      };
    });

    // Init geometric shapes
    shapesRef.current = Array.from({ length: 14 }, () => {
      const types: GeomShape['type'][] = ['hexagon', 'triangle', 'ring'];
      const color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 28 + 12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        opacity: Math.random() * 0.07 + 0.02,
        type: types[Math.floor(Math.random() * types.length)],
        color,
      };
    });

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // ── Particles ──
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir;
        if (p.opacity <= 0.05 || p.opacity >= 0.5) p.opacityDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grd.addColorStop(0, p.color + p.opacity.toFixed(2) + ')');
        grd.addColorStop(1, p.color + '0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Geometric shapes ──
      for (const s of shapesRef.current) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.6 + s.x);
        const effectiveOpacity = s.opacity * (0.7 + 0.3 * pulse);

        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;

        if (s.x < -80) s.x = canvas.width + 80;
        if (s.x > canvas.width + 80) s.x = -80;
        if (s.y < -80) s.y = canvas.height + 80;
        if (s.y > canvas.height + 80) s.y = -80;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = s.color + effectiveOpacity.toFixed(3) + ')';
        ctx.lineWidth = 0.8;

        if (s.type === 'hexagon') {
          drawHexagon(ctx, 0, 0, s.size);
          ctx.stroke();
        } else if (s.type === 'triangle') {
          drawTriangle(ctx, 0, 0, s.size);
          ctx.stroke();
        } else if (s.type === 'ring') {
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Twinkling connection lines between nearby particles ──
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.04;
            ctx.strokeStyle = `rgba(59,130,246,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    />
  );
}
