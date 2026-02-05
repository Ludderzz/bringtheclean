import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, ChevronDown, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function InfoPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What does COSHH certified mean?",
      a: "COSHH stands for 'Control of Substances Hazardous to Health.' It means our team is professionally trained to handle cleaning chemicals safely, ensuring your home is spotless without leaving behind dangerous residues or fumes."
    },
    {
      q: "Do I need to provide cleaning supplies?",
      a: "Yes! BTC will need you to supply products and gardening tools, While we grow this will change!."
    },
    {
      q: "Are your gardeners and cleaners insured?",
      a: "Absolutely. Every member of the BTC team—both home and garden—is fully insured for public liability, giving you total peace of mind while we work on your property."
    },
    {
      q: "What is your cancellation policy?",
      a: "We understand plans change. We offer free cancellation up to 24 hours before your scheduled clean. Cancellations within 24 hours is non refundable, this is so our cleaners can still be paid if there is no last minute jobs."
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section for Info */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-3 bg-emerald-100 rounded-2xl mb-4 text-btcGreen"
          >
            <ShieldCheck size={32} />
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Your Safety, <br />Our Standard.</h1>
          <p className="text-slate-500 text-lg">Everything you need to know about how BTC operates.</p>
        </div>

        {/* Safety Standards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4 text-btcGreen">
              <Sparkles size={24} />
              <h3 className="font-bold text-xl">COSHH Training</h3>
            </div>
            <p className="text-slate-500 leading-relaxed">
              We don't just 'clean.' We understand the chemistry of hygiene. Our COSHH certification means we know exactly which agents to use on specific surfaces to prevent damage and ensure a sterile environment.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4 text-btcBlue">
              <CheckCircle2 size={24} />
              <h3 className="font-bold text-xl">Vetted Staff</h3>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Every BTC cleaner undergoes a rigorous background check and in-person vetting process. We only hire professionals we would trust in our own homes.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black mb-8">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 last:border-0">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-6 flex justify-between items-center text-left hover:text-btcGreen transition-colors"
                >
                  <span className="font-bold text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === idx ? 'auto' : 0, opacity: openFaq === idx ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-btcDark rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-slate-400">Our team is happy to discuss your specific needs.</p>
          </div>
          <button className="whitespace-nowrap bg-btcGreen text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}