import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  payment_status: 'pending' | 'completed';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[AuthContext] Supabase Connection Check:", import.meta.env.VITE_SUPABASE_URL || "URL MISSING");
    
    // Safety Timeout: 3 seconds (Fast UX)
    const safetyTimeout = setTimeout(() => {
      console.warn("[AuthContext] Initialization taking too long. Check your Supabase URL/API Keys in .env");
      setLoading(false);
    }, 3000);

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(safetyTimeout);
      console.log("[AuthContext] Initial session retrieved:", session?.user?.id || "None");
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    }).catch(err => {
      clearTimeout(safetyTimeout);
      console.error("[AuthContext] Failed to get session:", err.message);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AuthContext] Auth state changed:", event);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    console.log("[AuthContext] Fetching profile for:", userId);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('[AuthContext] Error fetching profile:', error);
        if (error.code === 'PGRST106' || error.message?.includes('406')) {
           console.warn("[AuthContext] Possible Schema Mismatch (406). Check profiles table.");
        }
      } else {
        console.log("[AuthContext] Profile fetched success:", data?.payment_status);
        setProfile(data);
      }
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    console.log("[AuthContext] Logging out...");
    try {
      await supabase.auth.signOut();
      // Clear persistence just in case
      localStorage.removeItem('supabase.auth.token');
    } catch (err) {
      console.error("[AuthContext] Error during sign out:", err);
    } finally {
      setUser(null);
      setProfile(null);
      console.log("[AuthContext] Session cleared locally.");
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
