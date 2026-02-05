import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Leaf, Home, Info, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('home');

  const pricingData = {
    home: [
      { 
        name: "Standard Clean", 
        price: "24", 
        unit: "hr", 
        desc: "Ideal for weekly maintenance. 2-hour minimum.",
        features: ["Kitchen & Bathroom scrub", "Dusting & Vacuuming", "Surface sanitization", "Bin emptying"]
      },
      { 
        name: "Deep Clean", 
        price: "30", 
        unit: "hr", 
        desc: "A thorough, top-to-bottom refresh of your home.",
        features: ["Inside windows", "Skirting boards", "Behind appliances", "Lime-scale removal"],
        popular: true
      },
      { 
        name: "End-of-Tenancy", 
        price: "180", 
        unit: "from", 
        desc: "Full clean designed to secure your deposit.",
        features: ["Deposit-back guarantee", "Full appliance clean", "Tiered by bedroom count", "Professional report"]
      }
    ],
    garden: [
      { 
        name: "Lawn & Edging", 
        price: "28", 
        unit: "hr", 
        desc: "Keep your turf looking sharp and healthy.",
        features: ["Mowing", "Strimming edges", "Clipping removal", "Small weed check"]
      },
      { 
        name: "Hedge Trimming", 
        price: "35", 
        unit: "hr", 
        desc: "Precision shaping for hedges and shrubs.",
        features: ["Waste removal included", "Professional tools", "Height management", "Seasonal shaping"]
      },
      { 
        name: "Full Day Garden Job", 
        price: "250", 
        unit: "day", 
        desc: "A complete overhaul for overgrown spaces.",
        features: ["8 hours of labor", "Mix of all services", "Waste clearance", "Major transformation"],
        popular: true
      }
    ]
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-slate-900 mb-4"
          >
            Simple <span className="text-emerald-500">Rates.</span>
          </motion.h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            No hidden fees or complex contracts. Just professional COSHH-certified service at a fair price.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200/50 p-1.5 rounded-2xl flex gap-1 border border-slate-200">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'home' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Home size={18} /> Home
            </button>
            <button 
              onClick={() => setActiveTab('garden')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'garden' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Leaf size={18} /> Garden
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          layout
          className="grid md:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {pricingData[activeTab].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className={`relative flex flex-col bg-white rounded-[2.5rem] p-8 border-2 transition-all hover:shadow-2xl hover:shadow-emerald-100/50 ${item.popular ? 'border-emerald-500 shadow-xl' : 'border-white'}`}
              >
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
                    <Zap size={12} fill="currentColor" /> Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900">£{item.price}</span>
                  <span className="text-slate-400 font-bold">/{item.unit}</span>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <div className="mt-1 bg-emerald-100 rounded-full p-0.5">
                        <Check size={12} className="text-emerald-500 stroke-[4px]" />
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>

                <Link to="/booking">
                  <button className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${item.popular ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    Book Now
                  </button>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Trust Note */}
        <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-2xl">
              <Sparkles className="text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Need a custom quote?</p>
              <p className="text-slate-500 text-sm">For large estates or commercial contracts.</p>
            </div>
          </div>
          <button className="text-emerald-600 font-black border-b-2 border-emerald-500 hover:text-emerald-700 transition-colors">
            Get in Touch →
          </button>
        </div>
      </div>
    </div>
  );
}