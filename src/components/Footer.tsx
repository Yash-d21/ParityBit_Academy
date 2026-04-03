import { Shield, Mail, Globe, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Curriculum', href: '/#curriculum' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Student Login', href: '/login' },
  ];

  const programLinks = [
    { label: 'Zero to Hero Masterclass', href: '/#curriculum' },
    { label: 'Applied Internship', href: '/#pricing' },
    { label: 'CyberMasteryX Cert', href: '/#pricing' },
  ];

  return (
    <footer className="relative bg-[#1A122E] pt-0 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">

      {/* Continuing the dark box from the CTA box to wrap the footer content properly - Now Full Screen */}
      <div className="w-full bg-[#1A122E] pb-0 pt-8 relative z-10">

        {/* Inner Content Constraint */}
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-0">

            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="/footer_logo.png" alt="Parity Bit Academy Logo" className="h-10 md:h-12 w-auto object-contain" />
                <span className="text-white font-extrabold text-xl tracking-tighter">
                  Parity Bit <span className="text-[#C77DFF]">Academy_</span>
                </span>
              </div>
              <p className="text-[#D1D5DB] text-sm leading-relaxed font-medium">
                Empowering the next generation of cybersecurity professionals with practical, hands-on training and real-world experience.
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/paritybitsecurity/" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#D1D5DB] hover:text-[#C77DFF] transition-all duration-300 hover:scale-110 bg-[#7B2CBF]/10 border border-[#7B2CBF]/20 shadow-sm">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-black text-[#C77DFF] tracking-widest uppercase mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}
                      className="text-[#D1D5DB] hover:text-white text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 group">
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Program Info */}
            <div>
              <h4 className="text-xs font-black text-[#C77DFF] tracking-widest uppercase mb-6">Program</h4>
              <ul className="space-y-3">
                {programLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-[#D1D5DB] hover:text-white text-sm font-semibold transition-all duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-black text-[#C77DFF] tracking-widest uppercase mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#C77DFF] shrink-0" />
                  <a href="https://paritybitsecurity.com" target="_blank" rel="noopener noreferrer" className="text-[#D1D5DB] hover:text-white transition-colors duration-200 text-sm font-semibold">
                    paritybitsecurity.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C77DFF] shrink-0" />
                  <a href="mailto:contact@paritybitsecurity.com" className="text-[#D1D5DB] hover:text-white transition-colors duration-200 text-sm font-semibold">
                    contact@paritybitsecurity.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#7B2CBF]/10">
            <p className="text-[#D1D5DB]/60 text-xs font-bold">
              © {new Date().getFullYear()} ParityBit Security. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[#D1D5DB]/60 hover:text-white text-xs font-bold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[#D1D5DB]/60 hover:text-white text-xs font-bold transition-colors">Terms</Link>
              <Link to="/refund" className="text-[#D1D5DB]/60 hover:text-white text-xs font-bold transition-colors">Refund Policy</Link>
            </div>
          </div>

          {/* Huge Bold Brand Text at Footer Bottom */}
          <div className="w-full flex items-end justify-center px-4 md:px-8 mt-12 overflow-hidden pointer-events-none select-none">
            <h1 className="text-[10vw] sm:text-[12vw] md:text-[14vw] font-black text-white/5 leading-[0.75] tracking-tighter whitespace-nowrap">
              PARITYBIT
            </h1>
          </div>

        </div>
      </div>
    </footer>
  );
}
