import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, Users, BookOpen, Briefcase, ChevronRight, Play } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { InfiniteGrid } from '@/components/ui/the-infinite-grid';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { user, profile } = useAuth();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[85vh] flex flex-col justify-center items-center pt-28 pb-20 overflow-hidden">

      {/* ── Layered Ambient Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Infinite scrolling grid + mouse-reveal spotlight */}
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{
            maskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, black 15%, transparent 90%)'
          }}
        >
          <InfiniteGrid
            speed={0.4}
            cellSize={40}
            baseColor="rgba(123,44,191,0.28)"
            revealColor="rgba(123,44,191,0.75)"
            baseOpacity={1}
            revealOpacity={0.85}
            revealRadius={280}
          />
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#9D4EDD] to-transparent"
            style={{ animation: 'scanLine 8s ease-in-out infinite', top: '30%' }} />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FBFBF7] to-transparent" />
      </div>

      <motion.div style={{ opacity }} className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <a href="#curriculum" className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-bold text-[#7B2CBF] cursor-pointer group shadow-sm bg-white border border-[#E7E7DE]"
            style={{
              backdropFilter: 'blur(10px)',
            }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD] animate-glow-pulse" />
            Introducing Zero to Hero Masterclass 2026
            <ChevronRight className="w-3.5 h-3.5 text-[#7B2CBF] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight leading-[1.05] mb-10 max-w-5xl mx-auto"
          style={{ letterSpacing: '-0.04em' }}
        >
          {['Master', 'Cybersecurity.', 'Best Course', 'in India.'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block mr-3 md:mr-5"
            >
              <span className={(i === 1 || i === 3) ? (i === 1 ? "text-gradient-purple-neon" : "text-rich-navy") : "text-opacity-90 text-[#1A122E]"}>
                {word}
              </span>
              {(i === 1) && <div className="sm:hidden w-full h-px" />}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Become a security expert with the <strong className="text-[#1A122E]">best cybersecurity course for beginners in India</strong>. Master ethical hacking online, SOC operations, and VAPT with an industry-recognized certification and 2-month applied internship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link 
            to={!user ? "/signup" : (profile?.payment_status === 'completed' ? "/dashboard" : "/payment")} 
            className="btn-primary px-8 py-4 rounded-xl text-white font-bold text-base tracking-wide border border-[#011F5B] flex items-center justify-center min-w-[200px]"
          >
            {!user ? "Enroll Now" : (profile?.payment_status === 'completed' ? "Go to Dashboard" : "Complete Payment")}
          </Link>
          <a href="#curriculum" className="px-8 py-4 rounded-xl text-[#7B2CBF] font-bold text-base flex items-center gap-2 justify-center border border-[#7B2CBF]/20 bg-white hover:bg-white/80 transition-all shadow-sm">
            <Play className="w-4 h-4 text-[#7B2CBF] fill-[#7B2CBF]" />
            View Curriculum
          </a>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, val: '800+', label: 'Enrolled Students', color: 'text-blue-400' },
              { icon: BookOpen, val: '12', label: 'Core Modules', color: 'text-violet-400' },
              { icon: ShieldCheck, val: '70', label: 'Video Lessons', color: 'text-blue-400' },
              { icon: Briefcase, val: '2 Mo', label: 'Live Internship', color: 'text-violet-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                className="glass-card flex flex-col items-center p-6 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(123,44,191,0.06)', border: '1px solid rgba(123,44,191,0.1)' }}>
                  <stat.icon className={`w-5 h-5 text-[#9D4EDD]`} />
                </div>
                <h3 className={`text-3xl font-black tracking-tight mb-1 text-[#1A122E]`}>{stat.val}</h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
