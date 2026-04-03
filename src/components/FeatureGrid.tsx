import { motion } from 'motion/react';
import { Video, Laptop, Target, Crosshair, Network, Wrench } from 'lucide-react';

const features = [
  {
    id: 'SKL-01',
    icon: Video,
    title: '70+ Video Lessons',
    desc: 'Bite-sized architectural lessons covering the full spectrum of modern offensive security.',
  },
  {
    id: 'SKL-02',
    icon: Laptop,
    title: 'Hands-On Labs',
    desc: 'Practice in sandboxed environments. Master the art of the exploit in safe zones.',
  },
  {
    id: 'SKL-03',
    icon: Target,
    title: 'Capstone Project',
    desc: 'Build a battle-ready portfolio by securing complex enterprise-grade infrastructure.',
  },
  {
    id: 'SKL-04',
    icon: Crosshair,
    title: 'SOC Analyst Course India',
    desc: 'Crafted specifically to transition students into high-impact Security Operations Center (SOC) roles in India.',
  },
  {
    id: 'SKL-05',
    icon: Network,
    title: 'VAPT Course Online',
    desc: 'Master Vulnerability Assessment and Penetration Testing (VAPT) with the industry-standard MITRE ATT&CK matrix.',
  },
  {
    id: 'SKL-06',
    icon: Wrench,
    title: 'Splunk & Tool Mastery',
    desc: 'Master the elite arsenal: Splunk architecture, Wireshark, Nessus, Metasploit, and the Burp Suite ecosystem.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#FBFBF7]">
      
      {/* Schematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#7B2CBF]" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-[#7B2CBF]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-[#7B2CBF]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with "Blue Touch" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-[#7B2CBF]/20" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.25em]">Skills & Operations</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1A122E] leading-tight tracking-tighter">
            Architecting the Skills <br />
            That Make You <span className="text-rich-navy">Hireable.</span>
          </h2>
        </motion.div>

        {/* Diagonal Schematic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 relative">
          
          {/* Decorative Connectors (Desktop) */}
          <div className="hidden lg:block absolute top-[50%] left-0 w-full h-px bg-[#7B2CBF]/10 -z-10" />
          <div className="hidden lg:block absolute top-0 left-[33%] w-px h-full bg-[#7B2CBF]/10 -z-10" />
          <div className="hidden lg:block absolute top-0 left-[66%] w-px h-full bg-[#7B2CBF]/10 -z-10" />

          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative p-10 border-[#7B2CBF]/5 hover:bg-white transition-all duration-500 
                ${i % 3 === 2 ? 'border-r-0' : 'border-r'} 
                ${i < 3 ? 'border-b md:border-b-0 lg:border-b' : ''}
              `}
            >
              {/* Notched Corner Detail */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#7B2CBF]/10 group-hover:border-[#7B2CBF]/40 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-10 h-10 rounded-sm bg-[#7B2CBF]/5 flex items-center justify-center group-hover:bg-[#7B2CBF] group-hover:text-white transition-all duration-500">
                    <feature.icon className="w-5 h-5 transition-transform group-hover:rotate-[15deg]" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#BC6C25] opacity-50 tracking-tighter">{feature.id}</span>
                </div>

                <h3 className="text-lg font-black text-[#1A122E] mb-4 group-hover:text-[#7B2CBF] transition-colors tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#524769] leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {feature.desc}
                </p>

                {/* Industrial Progress Bar Decor */}
                <div className="mt-8 flex gap-1">
                   {[1, 2, 3, 4, 5].map(dot => (
                     <div key={dot} className={`h-0.5 w-4 rounded-full transition-all duration-700 ${
                       i % 2 === 0 ? 'bg-[#7B2CBF]/10 group-hover:bg-[#7B2CBF]/30' : 'bg-[#BC6C25]/10 group-hover:bg-[#BC6C25]/30'
                     }`} />
                   ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B2CBF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
