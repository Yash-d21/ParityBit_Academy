import { motion } from 'motion/react';
import { Timer, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BorderGlow from './BorderGlow';
import { PricingCard } from '@/components/ui/pricing-card';

import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const handleEnroll = () => {
    if (!user) {
      navigate('/signup');
      return;
    }
    
    if (profile?.payment_status === 'completed') {
      navigate('/dashboard');
    } else {
      navigate('/payment');
    }
  };

  return (
    <section id="pricing" className="py-24 relative bg-[#FBFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#7B2CBF]/20" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.25em]">
              Simple Pricing
            </p>
            <span className="h-px w-10 bg-[#7B2CBF]/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A122E] tracking-tight max-w-2xl mx-auto">
            Invest in Your <span className="text-[#7B2CBF]">Future.</span>
          </h2>
          <p className="mt-4 text-[#524769] text-base font-medium max-w-lg mx-auto">
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </motion.div>

        {/* Timer badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 text-sm text-[#BC6C25] font-bold mb-8 px-5 py-2.5 rounded-full bg-[#BC6C25]/10 border border-[#BC6C25]/20"
        >
          <Timer className="w-4 h-4" />
          Limited-time offer · Seats filling fast
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl"
        >
          <BorderGlow
            backgroundColor="#ffffff"
            borderRadius={26}
            glowRadius={60}
            edgeSensitivity={30}
            glowIntensity={1.5}
            glowColor="123 44 191" // #7B2CBF in RGB
            colors={['#7B2CBF', '#9D4EDD', '#C77DFF']}
          >
            <PricingCard
              className="rounded-[24px]"
              title="Cybersecurity Masterclass"
              description="Complete access from zero to advanced."
              price={1000}
              originalPrice={5000}
              buttonText={!user ? "Enroll Now & Start Learning" : (profile?.payment_status === 'completed' ? "Access My Course" : "Complete Your Enrollment")}
              onButtonClick={handleEnroll}
              features={[
                {
                  title: "Everything included",
                  items: [
                    "70+ HD Video Lessons (Bilingual Hindi + English)",
                    "Hands-on Labs & Vulnerable Virtual Machines",
                    "Live Weekly Q&A Sessions with Instructor",
                    "2-Month Applied Internship (Guaranteed)",
                    "CyberMasteryX Certification",
                    "Resume & Interview Preparation",
                    "Lifetime Access + Free Course Updates",
                    "Private Discord Community Access",
                  ],
                },
              ]}
            />
          </BorderGlow>
          
          {/* Footer strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-[11px] uppercase font-bold tracking-widest text-[#524769]/60"
          >
            <Shield className="w-3.5 h-3.5" />
            Secure checkout via Razorpay · 7-day money-back guarantee
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
