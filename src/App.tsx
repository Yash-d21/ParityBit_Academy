/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const authRoutes = ['/login', '/signup', '/payment', '/dashboard'];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#FBFBF7] text-[#1A122E] font-sans selection:bg-[#7B2CBF]/20 selection:text-[#7B2CBF] overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      
      <div 
        className={`transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center bg-[#FBFBF7] min-h-screen ${
          !isAuthPage && isMenuOpen ? 'scale-[0.95] opacity-60 rounded-[2rem] pointer-events-none select-none blur-[1px]' : 'scale-100 opacity-100'
        }`}
        style={{
          boxShadow: !isAuthPage && isMenuOpen ? '0px 0px 50px 10px rgba(0,0,0,0.8)' : 'none'
        }}
        aria-hidden={!isAuthPage && isMenuOpen}
      >
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
