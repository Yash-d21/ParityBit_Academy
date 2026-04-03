"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "../../lib/utils";

export interface TabItem {
  id: string;
  title: string;
  description: string;
}

interface VerticalTabsProps {
  tabs: TabItem[];
  rightSideContent: React.ReactNode;
  headerContent?: React.ReactNode;
  autoPlayDuration?: number;
}

export function VerticalTabs({ tabs, rightSideContent, headerContent, autoPlayDuration = 3000 }: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); // Triggers when 30% of the section is visible

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % tabs.length);
  }, [tabs.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    // If not in view or paused, we don't increment.
    // We also reset to the first tab whenever it scrolls completely out of view.
    if (!isInView) {
      setActiveIndex(0);
      return;
    }
    
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, isInView, handleNext, autoPlayDuration]);

  return (
    <div className="w-full" ref={sectionRef}>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex flex-col space-y-0">
              {tabs.map((tab, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-start gap-4 py-3 md:py-4 text-left transition-all duration-500 border-t border-[#1A122E]/10 first:border-0",
                      isActive
                        ? "text-[#1A122E]"
                        : "text-[#8B8B8B] hover:text-[#1A122E]"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[3px] bg-[#1A122E]/10 rounded-full overflow-hidden">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}-${isInView}`}
                          className="absolute top-0 left-0 w-full bg-[#7B2CBF] origin-top"
                          initial={{ height: "0%" }}
                          animate={
                            (isPaused || !isInView) ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: autoPlayDuration / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className={cn(
                      "text-[10px] md:text-xs font-black mt-1 tabular-nums transition-colors duration-500",
                      isActive ? "text-[#7B2CBF]" : "text-[#8B8B8B]/50"
                    )}>
                      /{tab.id}
                    </span>

                    <div className="flex flex-col gap-1.5 flex-1">
                      <span
                        className={cn(
                          "text-xl md:text-2xl lg:text-3xl font-black tracking-tight transition-colors duration-500",
                          isActive ? "text-[#1A122E]" : ""
                        )}
                      >
                        {tab.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-[#8B8B8B] font-medium text-sm md:text-base leading-relaxed max-w-sm pt-1 pb-1">
                              {tab.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Only One Terminal */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full order-1 lg:order-2">
            <div
              className="relative w-full h-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative w-full rounded-[2.5rem] p-0 md:p-4 bg-transparent pt-0 md:pt-0">
                {rightSideContent}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
