import React from "react";
import { ArrowDownRight, Instagram, Linkedin } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
  
export default function Instructor() {
  return (
    <section className="min-h-[90vh] overflow-hidden relative py-24 bg-[#FBFBF7]">
      <div className="mx-auto max-w-7xl relative z-20 px-6">
        
        {/* Massive Headline Group */}
        <div className="relative mt-4 md:mt-8">
          <p className="text-[10px] md:text-sm absolute -top-8 md:-top-4 left-6 md:left-20 font-bold tracking-[0.25em] text-[#7B2CBF]">
            800+ ALUMNI
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="z-20 text-[#1A122E] relative font-black text-center tracking-[-2px] md:tracking-[-8px] lg:tracking-[-14px] leading-[0.85] pt-4 text-5xl md:text-8xl lg:text-[10rem]"
          >
            LEAD INSTRUCTOR
          </motion.h1>
          <p className="text-3xl md:text-4xl hidden xl:block absolute -bottom-8 right-24 font-thin tracking-[8px] text-[#8B8B8B] opacity-50">
            HARSHIT BHARDWAJ
          </p>
          <p className="text-[22px] md:text-2xl mt-4 text-center xl:hidden font-light tracking-[6px] text-[#8B8B8B] opacity-70">
            HARSHIT BHARDWAJ
          </p>
        </div>

        {/* Expertise Grid & Floating Portrait */}
        <div className="grid relative mt-6 md:mt-16">
          <div className="relative space-y-8 pt-8 md:pt-24 flex gap-6 justify-center lg:justify-start lg:pl-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-6 bg-[#1A122E] text-white w-full max-w-xl h-fit p-6 md:p-12 items-end space-y-2 rounded-xl border border-white/10 shadow-2xl"
            >
              <div className="font-bold text-sm md:text-lg lg:text-xl space-y-3 tracking-wide">
                <div className="hover:text-[#C77DFF] transition-colors cursor-default opacity-90 transition-opacity hover:opacity-100 flex items-center gap-2">
                  <span className="text-[#C77DFF] font-black">/</span> SR. INFOSEC ANALYST
                </div>
                <div className="hover:text-[#C77DFF] transition-colors cursor-default opacity-90 transition-opacity hover:opacity-100 flex items-center gap-2">
                  <span className="text-[#C77DFF] font-black">/</span> EX-FSL | NFSU’24
                </div>
                <div className="hover:text-[#C77DFF] transition-colors cursor-default opacity-90 transition-opacity hover:opacity-100 flex items-center gap-2">
                  <span className="text-[#C77DFF] font-black">/</span> FACT’24 QUALIFIED
                </div>
              </div>
            </motion.div>

            {/* Desktop Portrait Breakout - Moved Outside for stable animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute hidden md:flex left-1/2 lg:left-auto lg:right-[15%] -top-10 w-fit overflow-hidden bg-white border-4 border-white shadow-xl rotate-3"
            >
              <img
                src="/harshith_b.jpg"
                alt="Instructor Portrait"
                className="h-72 w-56 object-cover hover:grayscale-0 transition-all duration-700"
              />
              <div className="text-left bg-white text-[#1A122E] p-2 rotate-180 [writing-mode:vertical-rl] text-[10px] font-black tracking-widest uppercase">
                Harshit Bhardwaj
              </div>
            </motion.div>
          </div>
          
          {/* Mobile Portrait Breakout */}
          <div className="flex justify-center mt-8 md:hidden w-full overflow-hidden border-4 border-white shadow-xl rotate-2 bg-white max-w-[240px] mx-auto">
            <img
              src="/harshith_b.jpg"
              alt="Instructor Portrait"
              className="h-64 justify-center object-cover"
            />
            <div className="text-left bg-white text-[#1A122E] p-2 rotate-180 [writing-mode:vertical-rl] text-[10px] font-black tracking-widest uppercase">
              Harshit Bhardwaj
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-16 md:mt-32 px-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl font-mono text-center text-xs md:text-sm lg:text-base font-semibold tracking-widest text-[#1A122E] leading-loose uppercase"
          >
            Architected by a Senior Information Security Analyst and TryHackMe Top 1% Expert.
            <br />
            ParityBit Academy is building the next generation of 
            <br />
            bulletproof cyber defenders for global enterprises.
          </motion.p>
        </div>
        
        {/* Credentials / Call To Action Area */}
        <div className="md:flex mt-16 md:mt-24 items-end justify-between pb-12">
          {/* Social Connect */}
          <div className="relative pl-0 md:pl-12 lg:pl-20 mb-12 md:mb-0 flex flex-col sm:flex-row gap-4 items-center sm:items-center">
            <a 
              href="https://www.linkedin.com/in/harshit-bhardwaj-65388622a/" 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col justify-center px-8 py-5 bg-[#1A122E] text-white rounded-xl shadow-xl hover:bg-[#0A66C2] transition-colors duration-300 w-full sm:w-auto"
            >
              <div className="flex justify-between items-center w-full min-w-[140px] mb-2">
                <Linkedin className="w-6 h-6 text-white" />
                <ArrowDownRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </div>
              <span className="font-mono text-xs font-bold tracking-widest uppercase">LinkedIn</span>
            </a>
            
            <a 
              href="https://www.instagram.com/cswithharsh_/" 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col justify-center px-8 py-5 bg-[#1A122E] text-white rounded-xl shadow-xl hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] transition-all duration-300 w-full sm:w-auto"
            >
              <div className="flex justify-between items-center w-full min-w-[140px] mb-2">
                <Instagram className="w-6 h-6 text-white" />
                <ArrowDownRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </div>
              <span className="font-mono text-xs font-bold tracking-widest uppercase">Instagram</span>
            </a>
          </div>
          
          {/* Notable Achievements Details */}
          <div className="px-0 md:pr-12 lg:pr-20 max-w-sm ml-auto text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-3 text-[#7B2CBF]">
              <span className="text-[10px] md:text-sm font-bold tracking-[0.2em]">
                CERTIFIED EXPERTISE
              </span>
              <ArrowDownRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="mt-4 md:text-right">
              <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-[-1px] md:tracking-[-4px] font-black text-[#1A122E] mb-6">
                Notable <br className="hidden md:block" /> Achievements.
              </h2>
              
              <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-6 font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                <span className="bg-[#1A122E] px-3 py-1 pb-1.5 rounded-full border border-black/10">CHFI</span>
                <span className="bg-[#1A122E] px-3 py-1 pb-1.5 rounded-full border border-black/10">eCIR</span>
                <span className="bg-[#1A122E] px-3 py-1 pb-1.5 rounded-full border border-black/10">ISO/IEC 27001</span>
                <span className="bg-[#1A122E] px-3 py-1 pb-1.5 rounded-full border border-black/10">CCNA</span>
                <span className="bg-[#1A122E] px-3 py-1 pb-1.5 rounded-full border border-black/10">ISC² CC</span>
                <span className="bg-[#1A122E] px-3 py-1 pb-1.5 rounded-full border border-black/10">AWS Cloud</span>
                <span className="bg-[#7B2CBF] px-4 py-1 pb-1.5 rounded-full shadow-lg">TryHackMe Top 1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Pattern Background Masks - Custom Cream Theme */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(26,18,46,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26,18,46,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}
