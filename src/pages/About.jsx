import { motion } from 'framer-motion';
import { CheckCircle2, Users, Target, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-black mb-6 leading-tight">The Story Behind <br /><span className="text-btcGreen">BTC.</span></h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            BringTheClean was founded on a simple principle: high-end properties deserve high-end maintenance. We noticed a gap between "basic cleaning" and "professional estate management." 
          </p>
          <div className="space-y-4">
            {[
              "Every cleaner is COSHH Certified",
              "Local BTC staff only, no sub-contracting",
              "Premium eco-safe equipment provided",
              "Fully insured and vetted professionals"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-emerald-100 rounded-full p-1">
                  <CheckCircle2 className="text-btcGreen w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <h4 className="text-4xl font-black text-btcGreen mb-1">100%</h4>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">COSHH Certified</p>
          </div>
          <div className="bg-btcDark p-8 rounded-[2rem] text-white text-center">
            <h4 className="text-4xl font-black mb-1">5★</h4>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Client Reviews</p>
          </div>
          <div className="bg-slate-100 p-8 rounded-[2rem] text-center col-span-2">
            <h4 className="text-2xl font-black mb-1">Professional Excellence</h4>
            <p className="text-slate-500 text-sm italic">"We don't just clean; we restore your space to its prime state."</p>
          </div>
        </div>
      </div>
    </div>
  );
}