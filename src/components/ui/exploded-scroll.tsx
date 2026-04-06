import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useMediaQuery } from '@/hooks/use-media-query';

export const ExplodedScroll = ({ centerContent, features }: { centerContent: React.ReactNode, features: { title: string, text: string }[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Use raw scroll progress for 1:1 precise, zero-delay response
  // as spring physics can feel 'floaty' or laggy to certain users.
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Center Terminal Transforms
  // Zooms Out, fluidly sweeps
  const terminalScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const terminalY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, isMobile ? -250 : -200]);

  // Card 1 (Industry-Led)
  const c1X = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0, isMobile ? -50 : -400, isMobile ? 0 : -320]);
  const c1Y = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0, isMobile ? -300 : -100, isMobile ? -50 : 200]);
  const c1Op = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1]);
  const c1Scale = useTransform(scrollYProgress, [0, 0.05, 0.5, 1], [0.5, 0.5, 1.05, 1]);

  // Card 2 (Portfolio)
  const c2X = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0, isMobile ? 50 : 400, 0]);
  const c2Y = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0, isMobile ? 250 : -100, isMobile ? 150 : 200]);
  const c2Op = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1]);
  const c2Scale = useTransform(scrollYProgress, [0, 0.05, 0.5, 1], [0.5, 0.5, 1.05, 1]);

  // Card 3 (Community)
  const c3X = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0, 0, isMobile ? 0 : 320]);
  const c3Y = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], [0, 0, isMobile ? 450 : 300, isMobile ? 350 : 200]);
  const c3Op = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1]);
  const c3Scale = useTransform(scrollYProgress, [0, 0.05, 0.5, 1], [0.5, 0.5, 1.05, 1]);

  const cards = [
    { x: c1X, y: c1Y, op: c1Op, scale: c1Scale, data: features[0] },
    { x: c2X, y: c2Y, op: c2Op, scale: c2Scale, data: features[1] },
    { x: c3X, y: c3Y, op: c3Op, scale: c3Scale, data: features[2] },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        


        {/* The Hub (Center component) */}
        <motion.div 
          style={{ scale: terminalScale, y: terminalY, willChange: 'transform' }}
          className="relative z-30 w-full px-4 flex justify-center origin-center"
        >
          {centerContent}
        </motion.div>

        {/* Exploding Nodes */}
        {cards.map((card, i) => (
          <motion.div
            key={i}
            style={{ 
              x: card.x, 
              y: card.y, 
              opacity: card.op, 
              scale: card.scale,
              willChange: 'transform, opacity'
            }}
            className="absolute z-20 w-[90%] max-w-[320px] origin-center px-4 md:px-0"
          >
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#7B2CBF]/10 hover:border-[#7B2CBF]/30 transition-colors shadow-2xl bg-white/95 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#7B2CBF]/20 group-hover:bg-[#7B2CBF] transition-colors" />
              <p className="text-[10px] font-black tracking-[0.2em] text-[#BC6C25] mb-2 uppercase">Part 0{i + 1}</p>
              <h3 className="text-xl font-black text-[#1A122E] tracking-tight mb-3">
                {card.data.title}
              </h3>
              <p className="text-sm font-bold text-[#1A122E] leading-relaxed">
                {card.data.text}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};
