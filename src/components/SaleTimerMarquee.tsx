import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer } from 'lucide-react';

const SaleTimerMarquee: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const marqueeText = `⚡ SPECIAL OFFER: FLAT 50% OFF ENDS IN ${formatNumber(timeLeft.hours)}h ${formatNumber(timeLeft.minutes)}m ${formatNumber(timeLeft.seconds)}s • ENROLL NOW TO SECURE YOUR SPOT • limited time deal ends tonight! • `;

  return (
    <div className="w-full bg-[#7B2CBF] text-white py-2 overflow-hidden relative z-[110] flex items-center border-b border-white/10 shadow-lg">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1035],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-xs font-bold tracking-widest uppercase">
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SaleTimerMarquee;
