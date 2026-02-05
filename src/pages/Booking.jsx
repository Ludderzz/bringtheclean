import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, 
  Clock, RefreshCw, Plus, Trash2, Leaf, Home, Fuel, Scissors,
  Timer, Zap, Search, User, Mail, Dog, ShieldCheck, Phone
} from 'lucide-react';

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({ 
    firstName: '', lastName: '', email: '', phone: '', address: '', postcode: '', 
    date: '', hasPets: false, isPriority: false, notes: '' 
  });
  
  const [postcodeStatus, setPostcodeStatus] = useState({ fee: 0, label: 'Not Entered', color: 'text-slate-300', valid: null });

  // --- THE FULL 6 SERVICES ---
  const services = [
    { id: 'hc-std', cat: 'Home', name: "Standard Clean", price: 28, icon: <Home size={22}/>, type: 'hourly' },
    { id: 'hc-deep', cat: 'Home', name: "Deep Clean", price: 45, icon: <Sparkles size={22}/>, type: 'hourly' },
    { id: 'hc-ten', cat: 'Home', name: "End-of-Tenancy", price: 120, icon: <CheckCircle2 size={22}/>, type: 'fixed' },
    { id: 'gd-lawn', cat: 'Garden', name: "Lawn & Edging", price: 28, icon: <Leaf size={22}/>, type: 'hourly' },
    { id: 'gd-hdg', cat: 'Garden', name: "Hedge Trimming", price: 35, icon: <Scissors size={22}/>, type: 'hourly' },
    { id: 'gd-full', cat: 'Garden', name: "Full Day Garden", price: 250, icon: <Zap size={22}/>, type: 'fixed' },
  ];

  // --- Postcode Logic ---
  const handlePostcodeLogic = (val) => {
    const pc = val.toLowerCase().trim();
    setFormData(prev => ({ ...prev, postcode: val }));
    if (!pc) { setPostcodeStatus({ fee: 0, label: 'Not Entered', color: 'text-slate-300', valid: null }); return; }

    const match = (str) => pc.includes(str);
    const isCore = match('bs21') || match('clevedon');
    const isOuter = match('bs20') || match('bs48') || match('bs49') || match('nailsea') || match('portishead');
    const isDistance = match('bs22') || match('bs24') || match('weston');

    if (isCore) setPostcodeStatus({ fee: 0, label: 'Core Zone: Free', color: 'text-emerald-500', valid: true });
    else if (isOuter) setPostcodeStatus({ fee: 2, label: 'Outer Zone: +£2 Fuel', color: 'text-orange-500', valid: true });
    else if (isDistance) setPostcodeStatus({ fee: 5, label: 'Distance Zone: +£5 Fuel', color: 'text-orange-600', valid: true });
    else if (pc.length >= 3) setPostcodeStatus({ fee: 0, label: 'Out of Area', color: 'text-blue-500', valid: false });
  };

  // --- Calculations ---
  const totalCost = useMemo(() => {
    const sCost = selectedServices.reduce((sum, s) => sum + (s.type === 'hourly' ? s.price * s.hours : s.price), 0);
    const fuel = (postcodeStatus.valid && postcodeStatus.fee) ? postcodeStatus.fee : 0;
    const priorityFee = formData.isPriority ? 15 : 0;
    return sCost + fuel + priorityFee;
  }, [selectedServices, postcodeStatus, formData.isPriority]);

  const toggleService = (service) => {
    const exists = selectedServices.find(s => s.id === service.id);
    if (exists) setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    else setSelectedServices([...selectedServices, { ...service, frequency: 'One-off', hours: 2 }]);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Steps */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                
                {/* 1. Location Gate */}
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10"><MapPin size={120} /></div>
                  <h3 className="text-2xl font-black mb-6 italic tracking-tighter">1. Where are we working?</h3>
                  <div className="flex flex-col md:flex-row gap-4 relative z-10">
                    <input 
                      type="text" value={formData.postcode} placeholder="Enter Postcode (e.g. BS21)" 
                      className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all text-lg" 
                      onChange={(e) => handlePostcodeLogic(e.target.value)} 
                    />
                    {postcodeStatus.valid !== null && (
                      <div className={`px-8 py-5 rounded-2xl bg-white flex items-center justify-center font-black text-xs uppercase tracking-[0.2em] shadow-lg ${postcodeStatus.color}`}>
                        {postcodeStatus.label}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Service Selection Grid */}
                {postcodeStatus.valid !== false && (
                  <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                      <h2 className="text-4xl font-black mb-10 text-slate-900 tracking-tighter italic">2. Select Services</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {services.map((s) => {
                          const isActive = selectedServices.find(item => item.id === s.id);
                          return (
                            <button 
                              key={s.id} 
                              onClick={() => toggleService(s)} 
                              className={`p-8 rounded-[2.5rem] text-left border-2 transition-all group relative ${
                                isActive 
                                ? 'border-emerald-500 bg-emerald-50 shadow-emerald-500/10 shadow-xl' 
                                : 'border-slate-100 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                  {s.icon}
                                </div>
                                {isActive && <CheckCircle2 className="text-emerald-500" size={28} />}
                              </div>
                              <div>
                                <h4 className={`text-xl font-black uppercase tracking-tighter mb-1 ${isActive ? 'text-emerald-600' : 'text-slate-900'}`}>
                                  {s.name}
                                </h4>
                                <p className={`text-xs font-black uppercase tracking-[0.2em] ${isActive ? 'text-emerald-500/70' : 'text-slate-400'}`}>
                                  £{s.price}{s.type === 'hourly' ? '/hr' : ' Fixed Session'}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Configurators */}
                    {selectedServices.map((s) => (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={s.id} className="bg-white p-10 rounded-[3rem] border-2 border-emerald-500/20 shadow-xl space-y-8 relative">
                        <div className="flex justify-between items-center">
                          <h3 className="font-black text-2xl uppercase tracking-tighter text-slate-900">Configure {s.name}</h3>
                          <button onClick={() => toggleService(s)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={24}/></button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                          {s.type === 'hourly' ? (
                            <div className="space-y-6">
                              <div className="flex justify-between items-end">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Timer size={16}/> Duration</label>
                                <span className="text-2xl font-black text-emerald-500">{s.hours} Hours</span>
                              </div>
                              <input type="range" min="1" max="8" value={s.hours} onChange={(e) => setSelectedServices(selectedServices.map(item => item.id === s.id ? {...item, hours: parseInt(e.target.value)} : item))} className="w-full h-3 bg-slate-100 rounded-lg appearance-none accent-emerald-500 cursor-pointer" />
                            </div>
                          ) : (
                            <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm"><Zap size={24} /></div>
                               <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Fixed Rate Plan</p><p className="text-sm font-bold text-emerald-900 leading-tight">Professional {s.name} Completion</p></div>
                            </div>
                          )}
                          <div className="space-y-6">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><RefreshCw size={16}/> Frequency</label>
                            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                              {['One-off', 'Weekly', 'Bi-Weekly', 'Monthly'].map(f => (
                                <button key={f} onClick={() => setSelectedServices(selectedServices.map(item => item.id === s.id ? {...item, frequency: f} : item))} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${s.frequency === f ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-400'}`}>{f}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {selectedServices.length > 0 && (
                      <button onClick={() => setStep(2)} className="w-full py-8 rounded-[2.5rem] font-black bg-slate-900 text-white flex items-center justify-center gap-4 shadow-2xl hover:bg-emerald-600 transition-all text-lg group">
                        Next: Contact Details <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              /* --- UPDATED STEP 3: FINAL DETAILS --- */
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">3. Final Details</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact & Property Information</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">First Name</label>
                    <input type="text" placeholder="John" className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Last Name</label>
                    <input type="text" placeholder="Smith" className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Contact Number</label>
                    <input type="tel" placeholder="07123 456789" className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Property Address</label>
                    <input type="text" placeholder="123 Clevedon Road" className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Postcode</label>
                    <input type="text" value={formData.postcode} readOnly className="w-full p-5 rounded-2xl bg-slate-100 border-none font-black text-slate-400 cursor-not-allowed uppercase" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button onClick={() => setFormData({...formData, isPriority: !formData.isPriority})} className={`flex items-center justify-between w-full p-6 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest ${formData.isPriority ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>
                     <div className="flex items-center gap-3"><Zap size={18} /> Priority Booking Required</div>
                     <span>+£15.00</span>
                  </button>
                  <textarea placeholder="Any specific tasks or instructions for the team?" className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all font-bold h-32 outline-none" onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
                  <button onClick={() => setStep(1)} className="flex-1 py-6 rounded-2xl font-black bg-slate-100 text-slate-400 uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-colors">Back</button>
                  <button onClick={() => alert('Booking Request Sent!')} className="flex-[2] py-6 rounded-2xl font-black bg-slate-900 text-white shadow-xl uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all">Request Appointment</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Sidebar Summary */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl space-y-8">
            <h3 className="font-black text-2xl text-center border-b border-slate-50 pb-6 text-slate-900 tracking-tighter italic">Your Plan Summary</h3>
            {selectedServices.length > 0 ? (
              <div className="space-y-6">
                <div className="space-y-5">
                  {selectedServices.map(s => (
                    <div key={s.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-black text-slate-900 uppercase tracking-tighter leading-none">{s.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase mt-2 tracking-widest">{s.frequency} • {s.type === 'hourly' ? `${s.hours}hrs` : 'Fixed'}</p>
                      </div>
                      <span className="font-black text-slate-900 text-lg">£{s.type === 'hourly' ? s.price * s.hours : s.price}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-slate-50 space-y-3">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <span>Fuel & Zone</span>
                     <span className={postcodeStatus.color}>{postcodeStatus.fee === 0 ? 'Free' : `+£${postcodeStatus.fee}`}</span>
                   </div>
                   {formData.isPriority && <div className="flex justify-between text-[10px] font-black uppercase text-orange-600"><span>Priority Surcharge</span><span>+£15.00</span></div>}
                </div>
                <div className="pt-8 border-t border-slate-100 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Estimated Total</p>
                  <p className="text-7xl font-black text-slate-900 tracking-tighter">£{totalCost}</p>
                  <div className="bg-emerald-500 text-white py-3 px-8 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mt-8 shadow-lg">Professional Visit</div>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center text-slate-200 italic font-black uppercase tracking-widest leading-tight">Build your plan <br/> on the left</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}