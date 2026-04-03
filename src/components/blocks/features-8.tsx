import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Video,
  Laptop,
  Trophy,
  Shield,
  Network,
  Wrench,
  Play,
  CheckCircle2,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   Card 1 — 70 Video Lessons  (wide: col-span-2)
───────────────────────────────────────────────────────────────────────── */
const VideoLessonsCard = () => (
  <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 border-[#7B2CBF]/10 bg-white/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(123,44,191,0.06)] hover:shadow-[0_8px_50px_rgba(123,44,191,0.12)] transition-shadow duration-500">
    <CardContent className="relative m-auto size-fit pt-6 pb-8 text-center">
      {/* Orbital rings */}
      <div className="relative flex h-28 w-60 items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-28 rounded-full border border-[#7B2CBF]/10" />
          <div className="absolute size-36 rounded-full border border-[#7B2CBF]/6" />
          <div className="absolute size-44 rounded-full border border-[#7B2CBF]/4" />
        </div>
        {/* Play icon inside orbit */}
        <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-[#7B2CBF]/10 border border-[#7B2CBF]/20">
          <Play className="size-7 text-[#7B2CBF] fill-[#7B2CBF]" />
        </div>
        {/* Big stat floating */}
        <span className="absolute -right-2 -top-2 text-4xl font-black text-[#1A122E] tracking-tighter">
          70+
        </span>
      </div>
      <h2 className="mt-5 text-2xl font-black text-[#1A122E] tracking-tight">
        Video Lessons
      </h2>
      <p className="mt-2 text-sm text-[#524769]/75 leading-relaxed max-w-[180px] mx-auto">
        Bite-sized architectural lessons covering the full offensive security spectrum.
      </p>
    </CardContent>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────
   Card 2 — Hands-On Labs  (sm:col-span-3 lg:col-span-2)
───────────────────────────────────────────────────────────────────────── */
const LabsCard = () => (
  <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-[#7B2CBF]/10 bg-white/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(123,44,191,0.06)] hover:shadow-[0_8px_50px_rgba(123,44,191,0.12)] transition-shadow duration-500">
    <CardContent className="pt-6 pb-8">
      {/* Terminal window */}
      <div className="relative mx-auto w-full max-w-[220px] rounded-lg overflow-hidden border border-[#7B2CBF]/12 bg-[#1A122E]">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-yellow-400/70" />
          <span className="size-2 rounded-full bg-green-400/70" />
          <span className="ml-2 font-mono text-[9px] text-white/30">lab-env</span>
        </div>
        <div className="px-3 py-3 font-mono text-[10px] leading-5">
          <p><span className="text-[#9D4EDD]">$</span> <span className="text-white/70">nmap -sV target</span></p>
          <p className="text-green-400">PORT&nbsp;&nbsp;STATE&nbsp;SERVICE</p>
          <p className="text-white/50">22/tcp open&nbsp;ssh</p>
          <p className="text-white/50">80/tcp open&nbsp;http</p>
          <p><span className="text-[#9D4EDD]">$</span> <span className="text-white/70">exploit --run</span></p>
          <p className="text-green-400">✓ Shell obtained</p>
        </div>
      </div>
      <div className="relative z-10 mt-5 space-y-1 text-center">
        <h2 className="text-lg font-black text-[#1A122E] tracking-tight">Hands-On Labs</h2>
        <p className="text-sm text-[#524769]/75 leading-relaxed px-2">
          Practice in sandboxed environments. Master the art of the exploit in safe zones.
        </p>
      </div>
    </CardContent>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────
   Card 3 — Capstone Project  (sm:col-span-3 lg:col-span-2)
───────────────────────────────────────────────────────────────────────── */
const CapstoneCard = () => (
  <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-[#7B2CBF]/10 bg-white/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(123,44,191,0.06)] hover:shadow-[0_8px_50px_rgba(123,44,191,0.12)] transition-shadow duration-500">
    <CardContent className="pt-6 pb-8">
      {/* Trophy + checklist */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B2CBF]/15 to-[#BC6C25]/10 border border-[#7B2CBF]/15">
          <Trophy className="size-7 text-[#BC6C25]" strokeWidth={1.5} />
        </div>
        <div className="w-full space-y-2 px-2">
          {[
            'Enterprise infra hardening',
            'Full pentest report',
            'Portfolio-ready artifact',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg bg-[#FBFBF7] border border-[#7B2CBF]/8 px-3 py-2">
              <CheckCircle2 className="size-3.5 shrink-0 text-[#7B2CBF]" strokeWidth={2.5} />
              <span className="text-[11px] font-semibold text-[#1A122E]">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-5 space-y-1 text-center">
        <h2 className="text-lg font-black text-[#1A122E] tracking-tight">Capstone Project</h2>
        <p className="text-sm text-[#524769]/75 leading-relaxed px-2">
          Build a battle-ready portfolio securing complex enterprise-grade infrastructure.
        </p>
      </div>
    </CardContent>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────
   Card 4 — SOC & Pentest Roles  (col-span-full lg:col-span-3)
───────────────────────────────────────────────────────────────────────── */
const SOCRolesCard = () => (
  <Card className="relative col-span-full overflow-hidden lg:col-span-3 border-[#7B2CBF]/10 bg-white/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(123,44,191,0.06)] hover:shadow-[0_8px_50px_rgba(123,44,191,0.12)] transition-shadow duration-500">
    <CardContent className="grid pt-6 pb-8 sm:grid-cols-2">
      <div className="relative z-10 flex flex-col justify-between space-y-10 lg:space-y-6">
        <div className="relative flex aspect-square size-12 rounded-full border border-[#7B2CBF]/20 before:absolute before:-inset-2 before:rounded-full before:border before:border-[#7B2CBF]/8">
          <Shield className="m-auto size-5 text-[#7B2CBF]" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-black text-[#1A122E] tracking-tight">
            Elite Operational Roles
          </h2>
          <p className="text-sm text-[#524769]/75 leading-relaxed max-w-[220px]">
            Crafted to transition students into high-impact SOC Analyst and Penetration Tester positions.
          </p>
        </div>
      </div>
      {/* Role badges */}
      <div className="relative -mb-6 -mr-6 mt-6 border-l border-t border-[#7B2CBF]/10 p-5 sm:ml-6 rounded-tl-xl bg-[#FBFBF7]/60">
        <div className="flex flex-col gap-2.5 pt-2">
          {[
            { role: 'SOC Analyst L1/L2', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { role: 'Junior Pentester', color: 'bg-violet-50 text-violet-700 border-violet-200' },
            { role: 'Security Engineer', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { role: 'Threat Intelligence', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            { role: 'GRC Analyst', color: 'bg-[#7B2CBF]/5 text-[#7B2CBF] border-[#7B2CBF]/20' },
          ].map(({ role, color }) => (
            <span key={role} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${color}`}>
              <span className="size-1.5 rounded-full bg-current opacity-60" />
              {role}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────
   Card 5 — MITRE ATT&CK  (col-span-full lg:col-span-3)
───────────────────────────────────────────────────────────────────────── */
const MitreCard = () => {
  const tactics = ['Recon', 'Resource Dev', 'Initial Access', 'Execution', 'Persistence', 'Privilege Esc', 'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Move', 'Collection', 'Exfiltration'];
  return (
    <Card className="relative col-span-full overflow-hidden lg:col-span-3 border-[#7B2CBF]/10 bg-white/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(123,44,191,0.06)] hover:shadow-[0_8px_50px_rgba(123,44,191,0.12)] transition-shadow duration-500">
      <CardContent className="grid pt-6 pb-8 sm:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-between space-y-10 lg:space-y-6">
          <div className="relative flex aspect-square size-12 rounded-full border border-[#7B2CBF]/20 before:absolute before:-inset-2 before:rounded-full before:border before:border-[#7B2CBF]/8">
            <Network className="m-auto size-5 text-[#7B2CBF]" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-black text-[#1A122E] tracking-tight">
              Active Frameworks
            </h2>
            <p className="text-sm text-[#524769]/75 leading-relaxed max-w-[220px]">
              Utilize the industry-standard MITRE ATT&amp;CK matrix for real-world threat modelling and adversary simulation.
            </p>
          </div>
        </div>
        {/* Mini MITRE matrix */}
        <div className="relative -mb-6 -mr-6 mt-6 border-l border-t border-[#7B2CBF]/10 p-4 sm:ml-6 rounded-tl-xl bg-[#FBFBF7]/60 overflow-hidden">
          <p className="mb-2 font-mono text-[8px] font-bold uppercase tracking-widest text-[#524769]/50">
            MITRE ATT&amp;CK™
          </p>
          <div className="grid grid-cols-3 gap-1">
            {tactics.map((tactic, i) => (
              <div
                key={tactic}
                className="rounded px-1.5 py-1 text-center"
                style={{
                  background: `rgba(123, 44, 191, ${0.06 + (i / tactics.length) * 0.18})`,
                  border: `1px solid rgba(123, 44, 191, ${0.08 + (i / tactics.length) * 0.15})`,
                }}
              >
                <span className="block font-mono text-[7px] font-bold text-[#1A122E]/70 leading-tight">
                  {tactic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Card 6 — Industry Tools  (col-span-full)
───────────────────────────────────────────────────────────────────────── */
const tools = [
  { name: 'Splunk',      bg: 'from-orange-50 to-orange-100/60',   border: 'border-orange-200/60',   text: 'text-orange-700' },
  { name: 'Wireshark',   bg: 'from-blue-50 to-blue-100/60',       border: 'border-blue-200/60',     text: 'text-blue-700'   },
  { name: 'Nessus',      bg: 'from-green-50 to-green-100/60',     border: 'border-green-200/60',    text: 'text-green-700'  },
  { name: 'Metasploit',  bg: 'from-red-50 to-red-100/60',         border: 'border-red-200/60',      text: 'text-red-700'    },
  { name: 'Burp Suite',  bg: 'from-violet-50 to-violet-100/60',   border: 'border-violet-200/60',   text: 'text-violet-700' },
  { name: 'Kali Linux',  bg: 'from-slate-50 to-slate-100/60',     border: 'border-slate-200/60',    text: 'text-slate-700'  },
];

const ToolsCard = () => (
  <Card className="relative col-span-full overflow-hidden border-[#7B2CBF]/10 bg-white/90 backdrop-blur-sm shadow-[0_4px_40px_rgba(123,44,191,0.06)] hover:shadow-[0_8px_50px_rgba(123,44,191,0.12)] transition-shadow duration-500">
    <CardContent className="pt-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left text */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="relative flex aspect-square size-12 rounded-full border border-[#7B2CBF]/20 before:absolute before:-inset-2 before:rounded-full before:border before:border-[#7B2CBF]/8">
            <Wrench className="m-auto size-5 text-[#7B2CBF]" strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-[#1A122E] tracking-tight">
              Hardware &amp; Tools
            </h2>
            <p className="text-sm text-[#524769]/75 leading-relaxed max-w-[200px]">
              Master the elite arsenal used by security professionals worldwide.
            </p>
          </div>
        </div>
        {/* Tool chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1 max-w-lg">
          {tools.map(({ name, bg, border, text }) => (
            <div
              key={name}
              className={`flex items-center gap-2 rounded-xl border bg-gradient-to-br ${bg} ${border} px-4 py-3`}
            >
              <span className={`font-mono text-[10px] font-black uppercase tracking-wider ${text}`}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────
   Main Section Export
───────────────────────────────────────────────────────────────────────── */
export function SkillsFeatures() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#FBFBF7]">
      {/* Schematic grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#7B2CBF]" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-[#7B2CBF]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-[#7B2CBF]" />
      </div>

      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#7B2CBF]/20" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.25em]">
              Skills &amp; Operations
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A122E] leading-tight tracking-tighter max-w-2xl">
            Architecting Skills That Make You{' '}
            <span className="text-rich-navy">Hireable.</span>
          </h2>
          <p className="mt-4 text-[#524769]/80 text-base leading-relaxed max-w-xl">
            Every module maps directly to a real-world job outcome — from SOC analyst to senior penetration tester.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-10 grid grid-cols-6 gap-3"
        >
          <VideoLessonsCard />
          <LabsCard />
          <CapstoneCard />
          <SOCRolesCard />
          <MitreCard />
          <ToolsCard />
        </motion.div>
      </div>
    </section>
  );
}
