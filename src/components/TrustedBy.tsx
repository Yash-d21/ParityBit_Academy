import { motion } from 'motion/react';
import { LogoCloud } from '@/components/ui/logo-cloud-4';

const logos = [
  {
    src: "/deloitte.png",
    alt: "Deloitte Logo",
  },
  {
    src: "/nasscom.png",
    alt: "NASSCOM Logo",
  },
  {
    src: "/ict-academy.png",
    alt: "ICT Academy Logo",
  },
];

export default function TrustedBy() {
  return (
    <section className="py-12 relative overflow-hidden bg-transparent">
      
      {/* Structural background refinement */}
      <div className="absolute inset-0 bg-[#FBFBF7]/40 pointer-events-none" />

      <div className="relative z-10 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-8 bg-[#7B2CBF]/10" />
              <p className="text-[#524769] text-[10px] font-black uppercase tracking-[0.4em] text-center">
                Alumni Impact Network
              </p>
              <span className="h-[1px] w-8 bg-[#7B2CBF]/10" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1A122E] text-center tracking-tight leading-none">
              Already used by the <span className="text-rich-navy">Best in the Game.</span>
            </h2>
          </motion.div>
        </div>

        {/* The iBelick Logo Cloud Integration */}
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}
