import { motion } from "framer-motion";

export default function RefundPolicy() {
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
            Refund <span className="text-rich-navy">Policy.</span>
          </h1>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-8 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">1. 7-Day Money-Back Guarantee</h2>
              <p>
                We offer a full, no-questions-asked refund within 7 days of your purchase. If you feel that our course content, labs, or internship structure are not right for you, we will issue a full refund immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">2. Refund Eligibility</h2>
              <p>
                After the initial 7-day period has elapsed, refunds will only be considered on a case-by-case basis under extraordinary circumstances. Once the CyberMasteryX Certification has been issued, no refunds will be provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">3. Process for Requests</h2>
              <p>
                To request a refund, please email our support team at <strong className="text-[#1A122E]">contact@paritybitsecurity.com</strong> with your enrollment details. Refunds will be processed within 5-10 business days via the original payment method.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
