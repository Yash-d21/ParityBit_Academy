import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { GlobeCdn } from './ui/cobe-globe-cdn';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function FinalCTA() {
  const { user, profile } = useAuth();
  
  const enrollLink = !user ? "/signup" : (profile?.payment_status === 'completed' ? "/dashboard" : "/payment");
  const enrollText = !user ? "Enroll Now" : (profile?.payment_status === 'completed' ? "My Dashboard" : "Complete Enroll");

  return (
    <section className="relative pt-32 bg-[#FBFBF7] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* The Boxed Section - Now Full Screen Edge-to-Edge */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-[#1A122E] rounded-t-[40px] md:rounded-t-[60px] border-t border-[#7B2CBF]/20 relative z-10"
      >
        {/* Subtle Ambient Background inside the dark box */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(123,44,191,0.15),transparent_50%)] pointer-events-none" />

        {/* Inner Content Constraint */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-16 lg:p-20 relative z-10">
          
          {/* Left Side: Content */}
          <div className="flex-1 max-w-2xl relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-[#7B2CBF]" />
              <p className="text-[#C77DFF] text-xs font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Start Today
              </p>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Ready to <span className="text-[#9D4EDD]">Start Your</span> Cybersecurity Journey?
            </h2>
            
            <p className="text-[#E0E0E0] text-xl font-medium leading-relaxed mb-10 max-w-xl">
              The 2026 <strong className="text-white font-black">Zero to Hero Complete Security Bundle</strong> is officially open. Join the next cohort of global defensive and offensive cyber elites.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="h-16 px-8 rounded-xl text-lg font-bold shadow-xl shadow-[#7B2CBF]/20 group flex items-center justify-center gap-2 bg-white text-[#1A122E] hover:bg-gray-100"
              >
                <Link to={enrollLink}>
                  {enrollText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side: Interactive Cobe Globe */}
          <div className="flex-1 w-full max-w-[320px] lg:max-w-[400px] relative aspect-square z-10">
            {/* Ambient Background Glow for Globe */}
            <div className="absolute inset-0 bg-[#7B2CBF]/20 rounded-full blur-[100px] pointer-events-none" />
            
            <GlobeCdn 
              className="w-full h-full scale-110 drop-shadow-2xl" 
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
