import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextType from './ui/TextType';
import { FloatingPaths } from './ui/background-paths';

const PromotionalPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    // 1. Show after 5 seconds initially (once)
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // 2. Show every 20 seconds (recurring)
    // This will ensure the popup keeps appearing to drive conversion
    const recurringInterval = setInterval(() => {
      setIsVisible((prev) => {
        if (!prev) return true;
        return prev;
      });
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringInterval);
    };
  }, []);

  useEffect(() => {
    // 3. Scroll listener for bottom scroll (once per session)
    const handleScroll = () => {
      if (hasScrolledToBottom) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      // Trigger when user is near the very bottom
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setIsVisible(true);
        setHasScrolledToBottom(true);
      }
    };

    // 4. Keyboard listener for Escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [hasScrolledToBottom]);

  const closePopup = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200] overflow-hidden"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[440px] z-[210] rounded-[32px] overflow-hidden bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100"
          >
            {/* Background Paths Animation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
               <FloatingPaths position={1} />
               <FloatingPaths position={-1} />
            </div>

            {/* Header / Logo Area */}
            <div className="relative pt-12 pb-8 px-8 text-center bg-transparent z-10">
               <button 
                onClick={closePopup}
                className="absolute top-6 right-6 size-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 flex items-center justify-center transition-all duration-300"
               >
                 <X className="size-5" />
               </button>

               <div className="mb-6 h-12 flex items-center justify-center">
                  <img src="/icon.png" alt="ParityBit Academy" className="h-full w-auto object-contain transition-transform hover:scale-105 duration-500" />
               </div>

               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black tracking-[0.25em] text-[#7B2CBF] uppercase mb-4 px-3 py-1 bg-violet-50 rounded-full border border-violet-100/50">Limited Invitation_</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    <TextType 
                      text="Wait! One more thing_" 
                      typingSpeed={60} 
                      pauseDuration={3000} 
                      showCursor={true}
                      cursorCharacter="_"
                      className="text-[#1A122E]"
                    />
                  </h2>
               </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 px-8 pb-10 text-[#1A122E]">
               <div className="mb-8 space-y-4">
                  <div className="flex gap-4 items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/30 transition-all duration-300 group">
                     <div className="size-10 shrink-0 rounded-xl bg-violet-100 flex items-center justify-center border border-violet-200 group-hover:scale-110 transition-transform">
                        <Trophy className="size-5 text-[#7B2CBF]" />
                     </div>
                     <p className="text-sm font-medium leading-relaxed text-slate-600">
                        Join <span className="text-[#1A122E] font-bold">800+ students</span> mastering ethical hacking today.
                     </p>
                  </div>
                  
                  <div className="flex gap-4 items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                     <div className="size-10 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200 group-hover:scale-110 transition-transform">
                        <Video className="size-5 text-blue-600" />
                     </div>
                     <p className="text-sm font-medium leading-relaxed text-slate-600">
                        Get <span className="text-[#1A122E] font-bold">70+ exclusive HD lessons</span> with 24/7 support.
                     </p>
                  </div>
               </div>

               <div className="space-y-4">
                  <Link 
                    to="/signup" 
                    onClick={closePopup}
                    className="group w-full h-16 bg-[#1A122E] hover:bg-[#7B2CBF] text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 transition-all duration-500 overflow-hidden relative"
                  >
                    <span className="relative z-10">Secure My Final Slot</span>
                    <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  </Link>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromotionalPopup;
