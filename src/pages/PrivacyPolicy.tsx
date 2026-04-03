import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
            Privacy <span className="text-rich-navy">Policy.</span>
          </h1>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-8 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">1. Information We Collect</h2>
              <p>
                At ParityBit Academy, we collect personal information you provide to us when you register for our courses, subscribe to our newsletter, or contact us for support. This includes your name, email address, payment information, and educational background.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">2. How We Use Your Data</h2>
              <p>
                Your information is used to provide and maintain our services, notify you about changes to our program, and provide customer support. We also use data to improve the quality of our cybersecurity training modules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal data. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#1A122E] mb-4 uppercase tracking-tighter">4. Third-Party Services</h2>
              <p>
                We may use third-party companies and individuals to facilitate our services (e.g., payment processors like Razorpay). These third parties have access to your personal data only to perform these tasks on our behalf.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
