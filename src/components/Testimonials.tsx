import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonials';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'SOC Analyst',
    company: 'Tech Mahindra',
    img: 'https://picsum.photos/seed/rahul/100/100',
    body: 'The hands-on labs were a game-changer. I went from knowing basic networking to analyzing real malware traffic in Wireshark. The internship directly helped me land my current job.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Junior Pentester',
    company: 'Codec Networks',
    img: 'https://picsum.photos/seed/priya/100/100',
    body: "Harshit's teaching style is incredible — complex cryptography and application security concepts broken down into digestible, practical lessons. Best ₹1,000 I ever spent.",
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Security Engineer',
    company: 'Deloitte',
    img: 'https://picsum.photos/seed/amit/100/100',
    body: 'I was stuck in IT support for 3 years. This masterclass gave me the exact roadmap to transition into cybersecurity. The CyberMasteryX cert genuinely moved my resume to the top.',
    rating: 5,
  },
  {
    name: 'Sneha Nair',
    role: 'GRC Analyst',
    company: 'NASSCOM',
    img: 'https://picsum.photos/seed/sneha/100/100',
    body: 'The GRC and compliance modules are incredibly thorough. I got ISO 27001 certified 3 months after completing this course. ParityBit genuinely prepared me.',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    role: 'Threat Intelligence Analyst',
    company: 'Wipro',
    img: 'https://picsum.photos/seed/arjun/100/100',
    body: 'The MITRE ATT&CK framework coverage is unmatched. I can now model adversary behaviour and write detection rules that actually catch real threats.',
    rating: 5,
  },
  {
    name: 'Divya Krishnan',
    role: 'Security Consultant',
    company: 'EY India',
    img: 'https://picsum.photos/seed/divya/100/100',
    body: 'Went from zero to landing a consulting role in 6 months. The curriculum is dense but structured perfectly — every module builds on the last.',
    rating: 5,
  },
  {
    name: 'Karthik Ram',
    role: 'Penetration Tester',
    company: 'HCL Security',
    img: 'https://picsum.photos/seed/karthik/100/100',
    body: 'Burp Suite, Nessus, Metasploit — we covered them all with real attack scenarios. I wrote my first professional pentest report during the internship phase.',
    rating: 5,
  },
  {
    name: 'Ananya Singh',
    role: 'SOC L2 Analyst',
    company: 'Infosys',
    img: 'https://picsum.photos/seed/ananya/100/100',
    body: 'The live weekly sessions were invaluable. Getting direct feedback from the instructor on my log analysis saved me months of self-study.',
    rating: 5,
  },
  {
    name: 'Rohan Desai',
    role: 'Network Security Engineer',
    company: 'Cisco India',
    img: 'https://picsum.photos/seed/rohan/100/100',
    body: 'The structured internship gave me a real project for my portfolio. My interviewer at Cisco was genuinely impressed by the pentest report I presented.',
    rating: 5,
  },
];

function TestimonialCard({
  img,
  name,
  role,
  company,
  body,
  rating,
}: (typeof testimonials)[number]) {
  return (
    <Card className="w-56 border-[#7B2CBF]/10 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <Avatar className="size-8">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-black text-[#1A122E] truncate">{name}</span>
            <span className="text-[10px] text-[#524769]/70 truncate">
              {role} · {company}
            </span>
          </div>
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-2.5 fill-[#BC6C25] text-[#BC6C25]" />
          ))}
        </div>
        <blockquote className="text-[11px] text-[#524769]/80 leading-relaxed line-clamp-4">
          "{body}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#FBFBF7]">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#7B2CBF]/20" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.25em]">
              Student Reviews
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A122E] leading-tight tracking-tighter max-w-2xl">
            Trusted by Future{' '}
            <span className="text-rich-navy">Experts.</span>
          </h2>
          <p className="mt-4 text-[#524769]/80 text-base leading-relaxed max-w-lg">
            Hear from students who launched their cybersecurity careers with our guidance.
          </p>
        </motion.div>
      </div>

      {/* 3D Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex h-[480px] w-full flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]"
      >
        <div
          className="flex flex-row items-center gap-3 will-change-transform"
          style={{
            transform:
              'translate3d(-80px, 0px, -80px) rotateX(18deg) rotateY(-8deg) rotateZ(18deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <Marquee vertical pauseOnHover duration="38s">
            {testimonials.map((t) => <TestimonialCard key={t.name + '1'} {...t} />)}
          </Marquee>
          <Marquee vertical pauseOnHover reverse duration="42s">
            {testimonials.map((t) => <TestimonialCard key={t.name + '2'} {...t} />)}
          </Marquee>
          <Marquee vertical pauseOnHover duration="35s">
            {testimonials.map((t) => <TestimonialCard key={t.name + '3'} {...t} />)}
          </Marquee>
          <Marquee vertical pauseOnHover reverse duration="44s">
            {testimonials.map((t) => <TestimonialCard key={t.name + '4'} {...t} />)}
          </Marquee>
        </div>

        {/* Gradient fade overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#FBFBF7]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#FBFBF7]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#FBFBF7]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#FBFBF7]" />
      </motion.div>
    </section>
  );
}
