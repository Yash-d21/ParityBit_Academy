import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 bg-[#FBFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-[#7B2CBF]" />
            <p className="text-[#7B2CBF] text-xs font-black uppercase tracking-[0.2em]">Legal Information</p>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-[#1A122E] tracking-tight mb-12">
            Terms of <span className="text-rich-navy">Service.</span>
          </h1>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-8 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">1. Acceptance of Terms</h2>
              <p>
                By enrolling in ParityBit Academy’s "Zero to Hero" masterclass, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our educational services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">2. Use License</h2>
              <p>
                All course content, including videos, labs, and internship materials, is provided for personal, non-commercial use only. You may not distribute or re-sell any materials provided by ParityBit Security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">3. Certification</h2>
              <p>
                The eCCSP - Certified Cyber Security Practitioner is awarded upon the successful completion of all training modules and the final capstone project. ParityBit Security reserves the right to withhold certification if academic integrity is compromised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">4. Modification to Services</h2>
              <p>
                ParityBit Academy reserves the right to modify or discontinue any part of the masterclass without notice at any time. We are not liable for any changes to course content or lab availability.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
