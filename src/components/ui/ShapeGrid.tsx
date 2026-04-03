import { useRef, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ShapeGridProps {
  speed?: number;
  squareSize?: number;
  direction?: 'diagonal' | 'horizontal' | 'vertical';
  borderColor?: string;
  hoverFillColor?: string;
  shape?: 'square' | 'circle' | 'diamond';
  hoverTrailAmount?: number;
  className?: string;
}

export function ShapeGrid({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#999',
  hoverFillColor = '#222',
  shape = 'square',
  hoverTrailAmount = 0,
  className,
}: ShapeGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  // Build grid on mount / resize
  const buildGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    cellsRef.current = [];

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    const cols = Math.ceil(W / squareSize) + 1;
    const rows = Math.ceil(H / squareSize) + 1;

    container.style.setProperty('--sq', `${squareSize}px`);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.dataset.row = String(r);
        cell.dataset.col = String(c);
        cell.style.cssText = `
          position: absolute;
          left: ${c * squareSize}px;
          top: ${r * squareSize}px;
          width: ${squareSize}px;
          height: ${squareSize}px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        `;

        const inner = document.createElement('div');
        const inset = 1;
        inner.style.cssText = `
          width: ${squareSize - inset * 2}px;
          height: ${squareSize - inset * 2}px;
          border: 1px solid ${borderColor};
          background: transparent;
          transition: background ${0.3 / speed}s ease, opacity ${0.4 / speed}s ease;
          opacity: 1;
          ${shape === 'circle' ? 'border-radius: 50%;' : ''}
          ${shape === 'diamond' ? 'transform: rotate(45deg); width: ${(squareSize - inset * 2) * 0.7}px; height: ${(squareSize - inset * 2) * 0.7}px;' : ''}
        `;

        cell.appendChild(inner);
        container.appendChild(cell);
        cellsRef.current.push(cell);
      }
    }
  }, [squareSize, borderColor, shape, speed]);

  // Wave animation
  const animate = useCallback((timestamp: number) => {
    const dt = timestamp - timeRef.current;
    timeRef.current = timestamp;

    if (!containerRef.current) return;
    const cells = cellsRef.current;
    const W = containerRef.current.offsetWidth;
    const H = containerRef.current.offsetHeight;

    cells.forEach((cell) => {
      const r = parseInt(cell.dataset.row ?? '0');
      const c = parseInt(cell.dataset.col ?? '0');
      const inner = cell.firstElementChild as HTMLDivElement | null;
      if (!inner) return;

      // Wave value based on direction
      let phase = 0;
      if (direction === 'diagonal') phase = (c + r) * 0.3;
      else if (direction === 'horizontal') phase = c * 0.4;
      else phase = r * 0.4;

      const wave = Math.sin(timestamp * 0.001 * speed + phase) * 0.5 + 0.5; // 0→1

      // Pulse: opacity between 0.35 and 0.65 (+0.20 from original)
      const opacity = 0.35 + wave * 0.3;
      inner.style.opacity = String(opacity);

      // Mouse hover fill
      if (mouseRef.current) {
        const { x, y } = mouseRef.current;
        const cellX = c * squareSize + squareSize / 2;
        const cellY = r * squareSize + squareSize / 2;
        const dist = Math.hypot(x - cellX, y - cellY);
        const radius = squareSize * 3;
        if (dist < radius) {
          const t = 1 - dist / radius;
          inner.style.background = hoverFillColor;
          inner.style.opacity = String(Math.max(opacity, t * 0.7));
        } else {
          if (hoverTrailAmount === 0) {
            inner.style.background = 'transparent';
          }
        }
      } else {
        inner.style.background = 'transparent';
      }
    });

    frameRef.current = requestAnimationFrame(animate);
  }, [direction, speed, squareSize, hoverFillColor, hoverTrailAmount]);

  // Mouse tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = null; };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Resize observer
  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  // RAF loop
  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-auto', className)}
      style={{ position: 'absolute', inset: 0 }}
    />
  );
}
