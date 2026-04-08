import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Database, BookOpen, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (profile?.payment_status !== 'completed') {
        navigate("/payment");
      }
    }
  }, [user, profile, loading, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBF7] flex items-center justify-center">
        <div className="size-12 rounded-full border-4 border-[#7B2CBF]/20 border-t-[#7B2CBF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBF7] flex">
      {/* Sidebar Mock */}
      <div className="w-20 lg:w-64 bg-[#1A122E] flex flex-col p-6 text-white border-r border-white/5 transition-all">
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
            <div className="size-8 rounded-lg bg-[#7B2CBF] shrink-0" />
            <span className="font-black text-xs tracking-widest uppercase hidden lg:inline">Academy_</span>
        </div>
        
        <nav className="space-y-4 flex-1">
            {[LayoutDashboard, Database, BookOpen, User].map((Icon, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/5">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="hidden lg:inline">Menu Item {i+1}</span>
                </div>
            ))}
        </nav>

        <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-white/40 hover:text-white mt-auto p-0 hover:bg-transparent"
        >
            <LogOut className="w-5 h-5 lg:mr-3" />
            <span className="hidden lg:inline text-xs font-black uppercase tracking-widest">Logout</span>
        </Button>
      </div>

      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <header className="mb-12 border-b border-slate-100 pb-8">
                <h1 className="text-4xl font-black text-[#1A122E] tracking-tighter uppercase mb-2 italic underline decoration-[#7B2CBF] decoration-8 underline-offset-8">lms here</h1>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7B2CBF]">Academy Learning Management Suite</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-20 pointer-events-none filter blur-[1px]">
                {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="h-48 rounded-3xl border-4 border-dashed border-slate-200" />
                ))}
            </div>
        </motion.div>
      </div>
    </div>
  );
}
