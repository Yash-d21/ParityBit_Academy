import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { ExplodedScroll } from './ui/exploded-scroll';

// Typewriter Hook
const useTypewriter = (texts: string[], typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = texts[loopNum % texts.length];

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => setDisplayText(currentText.substring(0, displayText.length - 1)), deletingSpeed);
      } else {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    } else {
      if (displayText.length < currentText.length) {
        timer = setTimeout(() => setDisplayText(currentText.substring(0, displayText.length + 1)), typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// Only One Terminal: Uses Typewriter Effect
const TerminalOne = () => {
  const commands = [
    "nmap -sV -A 192.168.1.0/24",
    "python3 exploit_cve2021.py",
    "john --wordlist=rockyou.txt hash.txt",
    "msfconsole -q -x 'use exploit/multi/handler'",
    "sqlmap -u 'http://target.com' --dump"
  ];
  const currentCommand = useTypewriter(commands);

  return (
    <div className="relative w-full max-w-[600px] glass-card rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl origin-center mx-auto" style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.1)' }}>
      <div className="flex items-center gap-2 px-6 py-4" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center pr-8">
          <span className="text-xs text-slate-400 font-mono">paritybit@academy:~</span>
        </div>
      </div>
      <div className="p-8 font-mono text-xs sm:text-sm md:text-base space-y-4 relative" style={{ background: '#0f172a', minHeight: '340px' }}>
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-slate-500">root@paritybit</span>
          <span className="text-slate-700">:</span>
          <span className="text-blue-400">~/labs</span>
          <span className="text-slate-700">$</span>
          <span className="text-white"> {currentCommand}<span className="inline-block w-2 ml-0.5 bg-white animate-pulse h-4 md:h-5 align-middle" /></span>
        </div>

        {/* Animated Terminal Output Lines matching the typing state */}
        <div className="space-y-2 transition-opacity duration-300" style={{ opacity: currentCommand === commands[0] && currentCommand.length > 5 ? 1 : 0 }}>
          <p className="text-green-400/80 pl-6">[+] Initializing scanner...</p>
          <p className="text-slate-500 pl-6">[*] Scanning 254 hosts on subnet</p>
          <p className="text-yellow-400/80 pl-6">[!] CVE-2021-44228 detected on 8080</p>
          <p className="text-green-400 pl-6 pt-2 font-semibold">[✓] Live Exploit Framework Loaded...</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)' }} />
      </div>
      <div className="px-8 py-5 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#1e293b' }}>
        <span className="text-[11px] text-slate-400 font-mono">Hands-on lab environment</span>
        <span className="text-[11px] text-green-400 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulse_2s_ease-in-out_infinite]" /> Live Session Active
        </span>
      </div>
    </div>
  );
};



export default function ProgramOverview() {
  return (
    <section className="py-12 md:py-16 relative bg-[#FBFBF7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20 relative z-10 flex flex-col items-center w-full">

        {/* Main Section Header - Top Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mb-10 w-full"
        >
          <div className="inline-flex items-center gap-3 mb-4 bg-white border border-[#7B2CBF]/20 shadow-sm px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#9D4EDD] animate-pulse" />
            <p className="text-[#1A122E] text-xs font-black uppercase tracking-[0.2em]">Program Overview</p>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-black text-[#1A122E] mb-4 tracking-[-0.03em] leading-[1.05]">
            Built for <span className="text-gradient-purple-neon">Real-World</span> Cyber Impact.
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-[#1A122E]/80 leading-relaxed font-medium max-w-4xl mx-auto">
            Most courses teach <span className="line-through opacity-50">theory</span>. We teach you <span className="text-[#1A122E] font-black">Applied Offensive Security, Defensive Operations, and Incident Response</span> in real-time environments. Launch your career with hands-on experience that matters.
          </p>
        </motion.div>

        {/* Exploded View Assembly */}
        <div className="-mt-10 xl:-mt-20 w-full relative z-20">
          <ExplodedScroll 
            centerContent={<TerminalOne />}
            features={[
              { title: "Industry-Led Training", text: "Curriculum designed by active cybersecurity professionals running live infrastructure." },
              { title: "Portfolio Centric", text: "Build actual exploits and defend real networks to showcase your skills to employers." },
              { title: "Community Support", text: "Join an elite network of 800+ like-minded hackers, instructors, and alumni." }
            ]}
          />
        </div>

      </div>
    </section>
  );
}
