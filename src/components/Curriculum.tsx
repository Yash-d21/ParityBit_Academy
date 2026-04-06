import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Terminal, Shield, Lock, Network, Database, FileText, Cpu, Activity, Server, Search, Briefcase, ChevronRight, PlayCircle, Clock } from 'lucide-react';

const modules = [
  { title: 'Cyber Foundations', lessons: 5, lang: 'Hindi + English', icon: BookOpen, desc: 'Understand the modern threat landscape, attacker kill chains, and the CIA triad. Get hands-on with VirtualBox and VMware to set up isolated lab environments. Build your first threat model using the STRIDE framework.' },
  { title: 'Modern Linux & Python', lessons: 7, lang: 'Hindi + English', icon: Terminal, desc: 'Master the Linux CLI — file permissions, cron jobs, bash scripting, and process management on Kali Linux. Write Python scripts using Scapy for packet crafting and Requests for automated web reconnaissance.' },
  { title: 'Security Architecture', lessons: 3, lang: 'English', icon: Shield, desc: 'Design zero-trust architectures and implement defense-in-depth strategies. Learn to map controls using NIST CSF and build risk registers. Understand firewalls (pfSense), IDS/IPS (Snort), and network segmentation.' },
  { title: 'Web PenTesting', lessons: 9, lang: 'English', icon: Lock, desc: 'Hunt OWASP Top 10 vulnerabilities using Burp Suite Professional — intercept proxies, Intruder, and Repeater. Execute SQL injection, XSS, CSRF, and SSRF attacks on intentionally vulnerable apps like DVWA and Juice Shop.' },
  { title: 'Network Exploitation', lessons: 11, lang: 'English', icon: Network, desc: 'Perform network reconnaissance with Nmap and Netcat. Analyze packet captures in Wireshark and conduct ARP spoofing with Ettercap. Exploit services using Metasploit Framework and escalate privileges on compromised hosts.' },
  { title: 'Cryptography Mastery', lessons: 3, lang: 'English', icon: Database, desc: 'Implement AES, RSA, and hashing algorithms using OpenSSL and Python\'s cryptography library. Understand PKI infrastructure, TLS handshakes, and certificate pinning. Crack weak hashes with Hashcat and John the Ripper.' },
  { title: 'GRC & Compliance', lessons: 6, lang: 'English', icon: FileText, desc: 'Master ISO 27001 controls, NIST 800-53, and GDPR compliance frameworks. Conduct risk assessments using qualitative and quantitative methodologies. Build audit checklists and write professional compliance reports for enterprises.' },
  { title: 'Emerging Tech & AI', lessons: 4, lang: 'English', icon: Cpu, desc: 'Threat model AI/LLM applications for prompt injection and data poisoning. Secure IoT devices using firmware analysis tools like Binwalk. Harden cloud infrastructure on AWS (IAM, S3, VPC) and Azure using CIS Benchmarks.' },
  { title: 'SOC Operations', lessons: 2, lang: 'English', icon: Activity, desc: 'Operate inside a real-world SOC workflow — alert triage, incident classification, and escalation playbooks. Work with SIEM dashboards, ticketing systems like TheHive, and coordinate incident response using the NIST IR lifecycle.' },
  { title: 'SIEM & Detection', lessons: 3, lang: 'English', icon: Server, desc: 'Deploy and configure Splunk Enterprise for log ingestion from Windows Event Logs, Syslog, and firewalls. Write SPL queries and build correlation rules for threat detection. Perform proactive threat hunting using MITRE ATT&CK mappings.' },
  { title: 'Forensics & RCA', lessons: 3, lang: 'English', icon: Search, desc: 'Investigate breaches using Autopsy and FTK Imager for disk forensics. Analyze memory dumps with Volatility and reconstruct attack timelines. Produce professional Root Cause Analysis (RCA) reports with evidence chains for stakeholders.' },
  { title: 'Career Acceleration', lessons: 4, lang: 'English', icon: Briefcase, desc: 'Engineer an ATS-optimized cybersecurity resume and build a portfolio on GitHub with documented pentest reports. Practice CTF challenges on TryHackMe and HackTheBox. Prepare for technical interviews at top security firms.' },
];

export default function Curriculum() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="curriculum" className="py-24 relative overflow-hidden bg-[#FBFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Simplified Header */}
        <div className="text-center mb-16">
          <p className="text-[#BC6C25] text-xs font-bold uppercase tracking-[0.2em] mb-4">Masterclass Syllabus</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A122E] mb-6 tracking-tight">
            Comprehensive <span className="text-rich-navy">Learning Journal</span>
          </h2>
          <div className="w-16 h-1 bg-[#7B2CBF] mx-auto rounded-full" />
        </div>

        {/* The Journal (Book Thing) */}
        <div className="relative group perspective-[2000px]">
          {/* Subtle 3D shadow base */}
          <div className="absolute inset-x-0 bottom-[-20px] h-20 bg-black/5 blur-3xl -z-10 rounded-full" />

          <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(27,67,50,0.08)] border border-[#E7E7DE] overflow-hidden flex flex-col md:flex-row min-h-[600px]">

            {/* Left: Tabbed Index (TOC) */}
            <div className="w-full md:w-80 border-r border-[#E7E7DE] bg-[#F2F2EB]/30 overflow-y-auto max-h-[400px] md:max-h-[600px]">
              <div className="p-6 border-b border-[#E7E7DE] bg-white sticky top-0 z-10 flex justify-between items-center">
                <span className="text-[10px] font-black text-[#8C92AC] uppercase tracking-widest">Chapters</span>
                <span className="text-[10px] font-bold text-[#7B2CBF] bg-[#7B2CBF]/5 px-2 py-0.5 rounded-full">12 Total</span>
              </div>
              <div className="py-2">
                {modules.map((mod, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all relative ${activeIdx === i
                        ? 'bg-white font-bold text-[#7B2CBF] shadow-[0_0_20px_rgba(123,44,191,0.05)] z-10'
                        : 'text-[#524769] hover:bg-[#F2F2EB]/50'
                      }`}
                  >
                    <span className={`font-mono text-[10px] w-5 opacity-40 ${activeIdx === i ? 'opacity-100' : ''}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm truncate">{mod.title}</span>
                    {activeIdx === i && (
                      <motion.div layoutId="marker" className="absolute left-0 w-1 h-8 bg-[#7B2CBF] rounded-r-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Page (Content) */}
            <div className="flex-1 p-8 md:p-16 relative overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-[#7B2CBF]/5 flex items-center justify-center border border-[#7B2CBF]/10">
                        {React.createElement(modules[activeIdx].icon, { className: "w-8 h-8 text-[#7B2CBF]" })}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#BC6C25] uppercase tracking-[0.25em] mb-1">Module {activeIdx + 1}</p>
                        <h3 className="text-2xl md:text-3xl font-black text-[#1A122E] leading-tight">{modules[activeIdx].title}</h3>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-4 py-2 rounded-xl bg-[#F2F2EB] border border-[#E7E7DE] flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-[#7B2CBF]" />
                        <span className="text-xs font-bold text-[#7B2CBF]">{modules[activeIdx].lessons} Lessons</span>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-[#525C58] leading-relaxed mb-10 font-medium">
                      {modules[activeIdx].desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                    {[
                      { label: 'Language', val: modules[activeIdx].lang, icon: FileText },
                      { label: 'Intensity', val: activeIdx < 4 ? 'Fundamental' : 'Advanced', icon: Activity },
                    ].map((item, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-[#E7E7DE] bg-[#FBFBF7] group hover:border-[#1B4332]/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className="w-4 h-4 text-[#BC6C25]" />
                          <span className="text-[10px] font-black text-[#525C58] uppercase tracking-widest">{item.label}</span>
                        </div>
                        <div className="text-sm font-bold text-[#1A231F]">{item.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-[#E7E7DE] flex justify-between items-center">
                    <button
                      disabled={activeIdx === 0}
                      onClick={() => setActiveIdx(prev => prev - 1)}
                      className="text-xs font-bold text-[#524769] hover:text-[#7B2CBF] disabled:opacity-30 flex items-center gap-2 transition-colors"
                    >
                      Prev Module
                    </button>
                    <button
                      disabled={activeIdx === modules.length - 1}
                      onClick={() => setActiveIdx(prev => prev + 1)}
                      className="group px-6 py-3 rounded-full bg-[#7B2CBF] text-white text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-[#7B2CBF]/10"
                    >
                      Next Chapter
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
