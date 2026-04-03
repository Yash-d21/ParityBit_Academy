import React, { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  /** Reverse scroll direction */
  reverse?: boolean;
  /** Pause on hover */
  pauseOnHover?: boolean;
  children: React.ReactNode;
  /** Scroll vertically instead of horizontally */
  vertical?: boolean;
  /** Animation duration e.g. "40s" */
  duration?: string;
}

/**
 * Seamless infinite marquee.
 * Works by duplicating children once inside a single animated track.
 * The track moves by exactly -50% (= one full copy width/height) so the
 * loop reset is always invisible.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  duration = '40s',
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden',
        vertical ? 'flex flex-col' : 'flex flex-row',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 will-change-transform',
          vertical ? 'flex-col' : 'flex-row',
          vertical
            ? 'animate-marquee-seamless-vertical'
            : 'animate-marquee-seamless',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: duration, gap: '1rem' }}
      >
        {/* Original copy */}
        <div className={cn('flex shrink-0', vertical ? 'flex-col gap-4' : 'flex-row gap-4')}>
          {children}
        </div>
        {/* Seamless duplicate — aria-hidden so screen readers skip it */}
        <div className={cn('flex shrink-0', vertical ? 'flex-col gap-4' : 'flex-row gap-4')} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
