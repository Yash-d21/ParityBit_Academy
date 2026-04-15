import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Loader2, Lock, CheckCircle2, ChevronRight, CreditCard, Wallet, Landmark, Timer, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [loadingStep, setLoadingStep] = useState("");
  const [isInitiating, setIsInitiating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Protect the page
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (profile?.payment_status === 'completed') {
        console.log("Payment status completed, redirecting to dashboard");
        navigate('/dashboard');
      }
    }
  }, [user, profile, loading, navigate]);

  const handlePayment = async () => {
    if (!user) {
      setErrorMessage("No user session found. Please login again.");
      return;
    }
    
    setErrorMessage("");
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    if (!razorpayKey) {
      setErrorMessage("Payment gateway configuration missing.");
      return;
    }

    try {
      setIsInitiating(true);
      
      const host = window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.hostname;
      const API_URL = `${window.location.protocol}//${host}:5000`;
      console.log("Calling Backend API at:", API_URL);
      
      const response = await fetch(`${API_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 99900, 
          currency: "INR",
          userId: user.id
        })
      });

      if (!response.ok) throw new Error("Failed to create payment order");
      const order = await response.json();

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "ParityBit Academy",
        description: "Zero to Hero Masterclass Enrollment",
        image: `${window.location.protocol}//${window.location.host}/icon.png`,
        order_id: order.id,
        handler: async function (response: any) {
          console.log("[Payment] Razorpay handler invoked", response);
          setStatus("processing");
          setLoadingStep("Verifying Signature...");
          
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            console.log("[Payment] Contacting backend verification API...");
            const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id
              }),
              signal: controller.signal
            });
            clearTimeout(timeoutId);

            console.log("[Payment] Verification API response received:", verifyResponse.status);
            
            const verifyData = await verifyResponse.json().catch(() => null);
            console.log("[Payment] Verification API Data:", verifyData);

            if (!verifyResponse.ok) {
               throw new Error(verifyData?.message || "Payment verification failed");
            }

            setLoadingStep("Updating Enrollment...");
            console.log("[Payment] Updating DB Profile...");
            // Update database on the frontend since backend doesn't have service role key
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ payment_status: 'completed' })
              .eq('id', user.id);

            if (updateError) {
              console.error("[Payment] Supabase update error:", updateError);
              throw updateError;
            }

            setLoadingStep("Finalizing...");
            console.log("[Payment] Operation fully successful. Refreshing profile.");
            setStatus("success");
            await refreshProfile();
            console.log("[Payment] Navigating to dashboard.");
            setTimeout(() => navigate("/dashboard"), 1500);

          } catch (err: any) {
            console.error("[Payment] Handled Error:", err);
            const msg = err.name === 'AbortError' ? 'Verification timed out. Check connection.' : (err.message || "Please contact support");
            setErrorMessage(`Verification Error: ${msg}`);
            setIsInitiating(false);
            setStatus("idle");
          }
        },
        prefill: {
          name: profile?.full_name || "",
          email: user.email || "",
        },
        theme: {
          color: "#7B2CBF",
        },
        modal: {
          ondismiss: function() {
            setIsInitiating(false);
            setStatus("idle");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setErrorMessage(`Payment Failed: ${response.error.description}`);
        setIsInitiating(false);
        setStatus("idle");
      });
      rzp.open();
      // Keep isInitiating=true until modal is closed or payment is successful to prevent double clicks


    } catch (err: any) {
      setErrorMessage(`Error: ${err.message || "Could not initialize payment"}`);
      setIsInitiating(false);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF7] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7B2CBF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C77DFF]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Branding */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative z-20"
      >
        <Link to="/" className="flex items-center gap-3">
          <img src="/icon.png" className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" alt="Logo" />
          <div className="flex flex-col leading-none tracking-tighter font-black text-xl uppercase">
            <span className="text-[#1A122E]">ParityBit</span>
            <span className="text-[#641c8c] text-[15px] tracking-[0.2em] mt-0.5">Academy_</span>
          </div>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white border border-slate-200 rounded-[40px] shadow-2xl shadow-[#1A122E]/5 overflow-hidden flex flex-col md:row relative z-10 min-h-[680px]"
        style={{ flexDirection: 'row' } as any} // Ensure row layout on large screens while maintaining flex-col for small implicitly done by tailwind but this is for specific forcing
      >
        {/* Left Side: Order Summary & Features */}
        <div className="hidden md:flex md:w-[45%] bg-[#1A122E] p-10 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <ShieldCheck className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-1 bg-[#7B2CBF] rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C77DFF]">Zero to Hero Masterclass</span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight mb-3 leading-tight">Secure Your Spot_</h2>
            <p className="text-white/50 text-sm font-medium mb-8">Join the next cohort of global defensive and offensive cyber elites.</p>

            <div className="space-y-4">
              {[
                { title: "70+ HD Video Lessons", desc: "Hindi + English Dual Audio" },
                { title: "Hands-on Labs", desc: "Access to Vulnerable Machines" },
                { title: "2-Month Internship", desc: "Guaranteed Applied Internship" },
                { title: "pCCSP Certification", desc: "Lifetime* - Never Expires", highlight: true },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 border ${item.highlight ? 'bg-[#7B2CBF]/15 border-[#7B2CBF]/40 shadow-lg shadow-[#7B2CBF]/10 scale-[1.02]' : 'bg-white/[0.03] border-white/5'}`}
                >
                  <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 ${item.highlight ? 'bg-[#7B2CBF] border-[#7B2CBF] text-white shadow-lg' : 'bg-[#7B2CBF]/20 border-[#7B2CBF]/40 text-[#C77DFF]'}`}>
                     {item.highlight ? <Star className="w-3 h-3 fill-current" /> : <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className={`text-xs font-black uppercase tracking-wider ${item.highlight ? 'text-white' : 'text-white'}`}>{item.title}</p>
                    <p className={`text-[10px] font-medium ${item.highlight ? 'text-[#C77DFF]' : 'text-white/40'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
             <div className="flex items-center gap-3 text-[#C77DFF] bg-[#C77DFF]/10 p-4 rounded-2xl border border-[#C77DFF]/20">
                <Timer className="w-5 h-5 animate-pulse" />
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#C77DFF]">Limited Time Offer</p>
                   <p className="text-[10px] text-white/60 font-medium">80% scholarship included in this billing.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Billing & Checkout */}
        <div className="w-full md:w-[55%] p-10 lg:p-14 bg-white flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-black text-[#1A122E] tracking-tight uppercase mb-2">Checkout Details_</h3>
                  <p className="text-slate-400 text-sm font-medium">Review your enrollment summary and proceed.</p>
                </div>

                {/* Single Pricing Card Details */}
                <div className="p-8 rounded-[32px] bg-[#1A122E]/[0.02] border-2 border-[#1A122E]/5 flex flex-col gap-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4">
                      <Sparkles className="w-6 h-6 text-[#7B2CBF]/30" />
                   </div>
                   
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#7B2CBF] text-[10px] font-black text-white uppercase tracking-widest">Masterclass Plan</span>
                        <span className="text-[10px] font-bold text-[#7B2CBF] uppercase tracking-widest">Limited Offer</span>
                      </div>
                      <h4 className="text-xl font-black text-[#1A122E] uppercase tracking-tight">Full Stack Cybersecurity Bootcamp</h4>
                   </div>

                   <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-[#1A122E]">₹999</span>
                      <span className="text-lg font-bold text-slate-300 line-through">₹5,000</span>
                      <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">80% OFF</span>
                   </div>
                   
                   <p className="text-[11px] font-black text-[#7B2CBF] bg-[#7B2CBF]/5 px-4 py-2 rounded-xl border border-[#7B2CBF]/10 uppercase tracking-widest flex items-center gap-2 w-fit">
                      <Star className="w-3.5 h-3.5 fill-[#7B2CBF]" /> Certificate Never Expires (Lifetime*)
                   </p>
                </div>

                {/* Gateway Selector */}
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-[#1A122E]/40 px-2 lg:px-4">Secure Payment Method</p>
                  <div className="p-6 rounded-[28px] border-2 border-[#7B2CBF] bg-[#7B2CBF]/[0.03] flex items-center justify-between shadow-xl shadow-[#7B2CBF]/5">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center p-3 border border-slate-100">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="w-full grayscale-0" />
                        </div>
                        <div>
                           <p className="text-sm font-black text-[#1A122E] uppercase tracking-wide">Razorpay Gateway</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">UPI, Cards, Wallets, Netbanking</p>
                        </div>
                     </div>
                     <div className="w-6 h-6 rounded-full bg-[#7B2CBF] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                     </div>
                  </div>
                </div>

                {/* Final Breakdown */}
                <div className="space-y-3 px-2 lg:px-4">
                   <div className="flex justify-between items-center text-2xl font-black text-[#1A122E]">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300">Final Total</span>
                      <span className="text-[#7B2CBF]">₹999</span>
                   </div>
                </div>

                <div className="space-y-4 pt-2">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3">
                      <div className="size-2 bg-red-600 rounded-full animate-pulse" />
                      {errorMessage}
                    </div>
                  )}
                  
                  <Button 
                    onClick={handlePayment}
                    disabled={isInitiating}
                    className="w-full h-16 bg-[#1A122E] hover:bg-[#7B2CBF] text-white rounded-[24px] font-black tracking-widest uppercase transition-all shadow-2xl shadow-[#1A122E]/10 group flex items-center justify-center gap-4 text-sm disabled:opacity-50"
                  >
                    {isInitiating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Initializing Payment...
                      </>
                    ) : (
                      <>
                        Complete Payment & Start Learning
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-[10px] text-center font-bold text-slate-400 max-w-sm mx-auto leading-relaxed">
                    By clicking to complete payment, you agree to our <Link to="/terms" className="text-[#7B2CBF] hover:underline">Terms</Link> and <Link to="/privacy" className="text-[#7B2CBF] hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
              </motion.div>
            ) : status === "processing" ? (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-8"
              >
                <div className="relative">
                   <div className="size-20 rounded-full border-4 border-slate-100 border-t-[#7B2CBF] animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-[#7B2CBF]/20" />
                   </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black text-[#1A122E] uppercase tracking-widest italic animate-pulse">{loadingStep || "Verifying Payment_"}</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mt-2">Connecting to secure servers...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-8 text-center"
              >
                <div className="size-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20 border-8 border-emerald-50">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1A122E] uppercase tracking-tighter mb-4 italic leading-tight">Enrollment <br/>Successful_</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-[280px] mx-auto leading-relaxed">Your journey begins now. <br/>Setting up your learning lab...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(123,44,191,0.3);
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
