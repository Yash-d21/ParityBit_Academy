import { motion } from 'motion/react';
import { Accordion05, type FaqItem } from '@/components/ui/accordion-05';

const faqs: FaqItem[] = [
  {
    id: "01",
    title: "Who is this for?",
    content:
      "This program is built for college students, fresh graduates, IT professionals looking to upskill, and career changers from any background. We start from the absolute basics — zero prior knowledge required.",
  },
  {
    id: "02",
    title: "Prior knowledge needed?",
    content:
      "None. Modules 1 and 2 cover all prerequisites including Linux fundamentals and Python scripting before moving into core cybersecurity concepts.",
  },
  {
    id: "03",
    title: "Self-paced or live?",
    content:
      "Hybrid. You get 24/7 access to 70+ pre-recorded HD lessons for self-paced learning, plus weekly live interactive sessions with the instructor for Q&A and advanced discussions.",
  },
  {
    id: "04",
    title: "How does the internship work?",
    content:
      "After completing the core modules, you enter a structured 2-month internship phase — working on real-world simulated projects, performing vulnerability assessments, and producing professional pentest reports for your portfolio.",
  },
  {
    id: "05",
    title: "Is the certification recognized?",
    content:
      "Yes. The pCCSP - Certified Cyber Security Practitioner is recognized by our hiring partners and demonstrates rigorous hands-on training, a practical internship, and real-world project experience — making you genuinely job-ready.",
  },
  {
    id: "06",
    title: "What's the refund policy?",
    content:
      "We offer a 7-day no-questions-asked money-back guarantee. If you feel the course isn't right for you within the first 7 days, we'll issue a full refund immediately.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.title,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.content
    }
  }))
};

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden bg-[#FBFBF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-10 bg-[#7B2CBF]/20" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.25em]">FAQ</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1A122E] leading-tight tracking-tighter max-w-2xl">
            Frequently Asked{' '}
            <span className="text-rich-navy">Questions.</span>
          </h2>
          <p className="mt-4 text-[#524769]/80 text-base leading-relaxed max-w-lg">
            Everything you need to know about the course and your future in cybersecurity.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Accordion05 items={faqs} defaultValue="01" />
        </motion.div>

      </div>
    </section>
  );
}
