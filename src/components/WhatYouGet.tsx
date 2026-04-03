import { PlayCircle, Video, Briefcase, Award } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FeatureCard } from '@/components/ui/grid-feature-cards';
import React from 'react';

const features = [
  {
    icon: PlayCircle,
    tag: '70+ Lessons',
    title: 'Self-Paced Learning',
    description:
      'Learn at your own speed with 70+ high-quality video lessons available 24/7. Content available in English & Hindi.',
  },
  {
    icon: Video,
    tag: 'Weekly Live',
    title: 'Live Weekly Sessions',
    description:
      'Get doubts resolved and dive deeper into complex topics with interactive live sessions every week.',
  },
  {
    icon: Briefcase,
    tag: '2 Months',
    title: 'Applied Internship',
    description:
      'Gain real-world experience with a guaranteed 2-month applied internship upon course completion.',
  },
  {
    icon: Award,
    tag: 'Certified',
    title: 'CyberMasteryX Certification',
    description:
      'Earn the industry-recognized CyberMasteryX Certification to validate your skills to employers.',
  },
];

type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function WhatYouGet() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[#FBFBF7]/60 border-y border-[#7B2CBF]/10">
      <div className="mx-auto w-full max-w-5xl space-y-12 px-4 sm:px-6">

        {/* Header */}
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.25em] mb-4">
            What You Get
          </p>
          <h2 className="text-3xl font-black tracking-tighter text-[#1A122E] text-balance md:text-4xl lg:text-5xl">
            Everything You Need to{' '}
            <span className="text-rich-navy">Succeed.</span>
          </h2>
          <p className="text-[#524769]/80 mt-4 text-sm tracking-wide text-balance md:text-base leading-relaxed">
            A complete ecosystem designed to take you from beginner to job-ready professional.
          </p>
        </AnimatedContainer>

        {/* 4-card grid — 1 col on mobile, 2 on sm, 4 across on lg */}
        <AnimatedContainer
          delay={0.3}
          className="grid grid-cols-1 divide-y divide-x-0 divide-dashed border border-dashed border-[#7B2CBF]/15 sm:grid-cols-2 sm:divide-x sm:divide-y lg:grid-cols-4"
          style={{ '--tw-divide-color': 'rgba(123,44,191,0.12)' } as React.CSSProperties}
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              feature={feature}
              className="group bg-white/40 hover:bg-white/90 transition-colors duration-500"
            />
          ))}
        </AnimatedContainer>

      </div>
    </section>
  );
}
