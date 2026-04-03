import React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteGridProps {
  /** Cell size in px */
  cellSize?: number;
  /** Speed of the diagonal scroll (px per frame) */
  speed?: number;
  /** Base grid color (always-visible dim layer) */
  baseColor?: string;
  /** Revealed grid color (mouse-hover bright layer) */
  revealColor?: string;
  /** Opacity of the always-visible base layer (0–1) */
  baseOpacity?: number;
  /** Opacity of the mouse-reveal layer (0–1) */
  revealOpacity?: number;
  /** Radius of the mouse reveal spotlight in px */
  revealRadius?: number;
  className?: string;
}

function GridSVG({
  offsetX,
  offsetY,
  color,
}: {
  offsetX: any;
  offsetY: any;
  color: string;
}) {
  return (
    <svg className="w-full h-full" aria-hidden>
      <defs>
        <motion.pattern
          id="infinite-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#infinite-grid-pattern)" />
    </svg>
  );
}

export function InfiniteGrid({
  cellSize = 40,
  speed = 0.5,
  baseColor = "rgba(123,44,191,0.35)",
  revealColor = "rgba(123,44,191,0.70)",
  baseOpacity = 1,
  revealOpacity = 0.7,
  revealRadius = 320,
  className,
}: InfiniteGridProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  // Diagonal infinite scroll
  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + speed) % cellSize);
    gridOffsetY.set((gridOffsetY.get() + speed) % cellSize);
  });

  // Radial reveal mask follows mouse
  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base layer — always visible, dim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: baseOpacity }}
      >
        <GridSVG
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          color={baseColor}
        />
      </div>

      {/* Reveal layer — shown only under the cursor via radial mask */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: revealOpacity,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridSVG
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          color={revealColor}
        />
      </motion.div>
    </div>
  );
}
