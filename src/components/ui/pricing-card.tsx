"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PricingFeature {
  title: string;
  items: string[];
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: PricingFeature[];
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function PricingCard({
  title,
  description,
  price,
  originalPrice,
  features,
  buttonText = "Get Started",
  onButtonClick,
  className,
}: PricingCardProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  } as const;

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  } as const;

  return (
    <motion.section
      ref={containerRef}
      className={cn("w-full h-full", className)}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Card className="relative mx-auto w-full h-full overflow-hidden bg-white border-0 shadow-none flex flex-col rounded-[24px]">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Column - Pricing Info */}
          <motion.div
            className="flex flex-col justify-between p-6 lg:w-2/5 lg:p-8 shrink-0 bg-white"
            variants={itemVariants}
          >
            <div>
              <CardHeader className="p-0">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-black text-[#1A122E] tracking-tight">{title}</CardTitle>
                    <CardDescription className="mt-2 text-[#524769]/80 font-medium">{description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <motion.div className="mt-8 space-y-2" variants={itemVariants}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl lg:text-6xl font-black text-[#1A122E] tracking-tight">₹{price.toLocaleString('en-IN')}</span>
                    {originalPrice && (
                      <span className="text-xl lg:text-2xl text-[#524769]/50 line-through font-bold">
                        ₹{originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
                <span className="block text-sm font-semibold text-[#7B2CBF] uppercase tracking-widest mt-2">
                  One-time payment
                </span>
              </motion.div>
            </div>
            
            <motion.div className="mt-8 lg:mt-auto" variants={itemVariants}>
              <Button 
                className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-[#7B2CBF]/20" 
                size="lg" 
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>

          <Separator className="lg:hidden bg-[#524769]/10" />

          {/* Right Column - Features */}
          <motion.div
            className="bg-[#FBFBF7] p-6 lg:w-3/5 lg:p-8 flex-1"
            variants={itemVariants}
          >
            <div className="space-y-6 h-full flex flex-col justify-center">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex}>
                  <h3 className="mb-4 text-xs font-black text-[#1A122E] uppercase tracking-widest">
                    {feature.title}:
                  </h3>
                  <ul className="grid grid-cols-1 gap-y-3 lg:gap-y-4 md:grid-cols-2 gap-x-4">
                    {feature.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={listItemVariants}
                        custom={index + featureIndex * feature.items.length}
                      >
                        <Check className="mr-3 h-4 w-4 text-[#7B2CBF] shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-sm font-medium text-[#524769] leading-snug">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && <Separator className="my-6 bg-[#524769]/10" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.section>
  );
}
