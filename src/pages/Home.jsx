import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Sparkles, Flower2, Home as HomeIcon, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-btcGreen animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Available in your area</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
          >
            BRING THE <br />
            <span className="text-btcGreen">CLEAN<span className="text-slate-900">.</span></span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-lg text-slate-500 mb-6"
          >
            The premium standard for modern homes. COSHH certified cleaners specializing in high-end domestic and garden maintenance.
          </motion.p>

          {/* Fair Pay Manifesto - Small but readable */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mb-10 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-btcGreen" /> Fair Pricing, Fair Pay
            </p>
            <p className="text-[13px] leading-relaxed text-slate-500">
              We believe great cleans come from cleaners who are valued and paid properly. 
              That’s why we guarantee a minimum of <span className="font-bold text-slate-900">£15 per hour</span> to our cleaners. 
              Our prices may be slightly higher than some agencies, but it ensures <span className="font-bold text-slate-900">reliable, motivated cleaners</span> and consistently high standards.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="bg-btcDark text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl flex items-center gap-2">
              Book Your Service <ArrowRight size={18} />
            </Link>
            <Link to="/pricing" className="bg-white text-btcDark border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              View Price List
            </Link>
          </div>
        </div>
      </section>


      {/* The Bento Grid Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]"
          >
            {/* Big Card: Main Service */}
            <motion.div variants={item} className="md:col-span-2 md:row-span-2 bg-btcDark rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="bg-btcGreen w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <HomeIcon className="text-white" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 tracking-tight">Home <br />Excellence</h3>
                  <p className="text-slate-400 max-w-xs text-lg">Detailed cleaning designed for modern living spaces.</p>
                </div>
                <ul className="space-y-3">
                  {['Standard', 'Deep Clean', 'End of Tenancy'].map(i => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <Star size={16} className="text-btcGreen" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Sparkles size={200} />
              </div>
            </motion.div>

            {/* Square Card: COSHH */}
            <motion.div variants={item} className="md:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 flex flex-col justify-between hover:border-btcGreen transition-colors">
              <div className="flex justify-between items-start">
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <ShieldCheck className="text-btcGreen" />
                </div>
                <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full">CERTIFIED</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">COSHH Trained</h3>
                <p className="text-slate-500 text-sm">Professional handling of all cleaning agents for maximum safety.</p>
              </div>
            </motion.div>

            {/* Small Card: Garden */}
            <motion.div variants={item} className="bg-emerald-500 rounded-[2.5rem] p-8 text-white flex flex-col justify-between group cursor-pointer">
              <Flower2 className="group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-bold leading-tight">Garden <br />Curating</h3>
            </motion.div>

            {/* Small Card: Booking */}
            <motion.div variants={item} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-slate-900 hover:text-white transition-all">
              <p className="text-sm font-bold mb-2 opacity-50">READY?</p>
              <h3 className="text-xl font-bold mb-4">Book in 60s</h3>
              <div className="bg-btcGreen p-2 rounded-full text-white">
                <ArrowRight size={20} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}