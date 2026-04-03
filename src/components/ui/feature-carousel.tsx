"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export interface CarouselFeature {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  customComponent: React.ReactNode;
}

interface FeatureCarouselProps {
  features: CarouselFeature[];
  autoPlayInterval?: number;
}

const ITEM_HEIGHT = 70;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({ features, autoPlayInterval = 4000 }: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, autoPlayInterval]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full relative">
      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-[#7B2CBF]/20 shadow-2xl">
        
        {/* Left Side: Orbiting Menu */}
        <div className="w-full lg:w-[45%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-[#1A122E]">
          <div className="absolute inset-x-0 top-0 h-16 md:h-24 lg:h-24 bg-gradient-to-b from-[#1A122E] via-[#1A122E]/90 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 md:h-24 lg:h-24 bg-gradient-to-t from-[#1A122E] via-[#1A122E]/90 to-transparent z-40 pointer-events-none" />
          
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start w-full"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-8 py-4 rounded-2xl w-full max-w-[320px] transition-all duration-700 text-left group border focus:outline-none",
                      isActive
                        ? "bg-[#7B2CBF]/20 border-[#7B2CBF]/40 shadow-[0_0_30px_rgba(123,44,191,0.2)] z-10"
                        : "bg-transparent border-transparent hover:border-[#7B2CBF]/20 hover:bg-[#7B2CBF]/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-500",
                        isActive ? "bg-[#7B2CBF] text-white shadow-lg" : "bg-[#7B2CBF]/10 text-[#8B8B8B] group-hover:text-[#C77DFF]"
                      )}
                    >
                      <feature.icon size={20} strokeWidth={2} />
                    </div>

                    <div className="flex flex-col flex-1 overflow-hidden">
                      <span className={cn(
                        "font-bold text-sm md:text-base tracking-tight whitespace-nowrap transition-colors duration-500",
                        isActive ? "text-white" : "text-[#8B8B8B] group-hover:text-white"
                      )}>
                        {feature.label}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Showcase Content */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-[#FBFBF7] border-t lg:border-t-0 lg:border-l border-[#7B2CBF]/20 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,44,191,0.05),transparent_70%)] pointer-events-none" />

          <div className="relative w-full max-w-[480px] aspect-square lg:aspect-auto xl:aspect-[4/5] flex items-center justify-center lg:h-[80%]">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="absolute inset-0 origin-center flex flex-col justify-center"
                >
                  
                  {/* Dynamic 3D Component Rendering */}
                  <div className={cn(
                    "w-full h-full xl:max-h-[500px] flex items-center justify-center overflow-hidden transition-all duration-700",
                    isActive ? "grayscale-0 blur-0" : "grayscale-[50%] blur-[2px]"
                  )}>
                    {feature.customComponent}
                  </div>

                  {/* Info Panel corresponding to active slide */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-8 left-0 right-0 p-6 bg-white rounded-3xl border border-[#7B2CBF]/20 shadow-[0_10px_40px_rgba(123,44,191,0.1)] pointer-events-none"
                      >
                        <p className="text-[#1A122E] font-medium text-sm md:text-base leading-relaxed tracking-tight text-center">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
