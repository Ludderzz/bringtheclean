import { motion } from 'framer-motion';
import { MapPin, Fuel, Clock, ShieldCheck, Info } from 'lucide-react';

export default function ServiceArea() {
  const zones = [
    {
      title: "Core Zone",
      area: "Main City & Surrounding 10 Miles",
      status: "Standard Rates",
      desc: "No additional travel fees apply to properties within this radius."
    },
    {
      title: "Outer Zone",
      area: "10 - 25 Mile Radius",
      status: "Fuel Charge Applies",
      desc: "A small fuel surcharge is added to cover transit costs to your location."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Map Visual / Policy */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                Where we <span className="text-btcGreen">Bring The Clean.</span>
              </h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                We operate across the region, ensuring the BTC standard is available even in more remote locations. 
                To maintain our quality, we use a transparent zone-based travel policy.
              </p>

              <div className="space-y-4">
                {zones.map((zone, i) => (
                  <div key={i} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 flex gap-4">
                    <div className={`p-3 rounded-2xl h-fit ${i === 0 ? 'bg-emerald-100 text-btcGreen' : 'bg-orange-100 text-orange-600'}`}>
                      {i === 0 ? <MapPin size={24} /> : <Fuel size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-slate-900">{zone.title}</h4>
                        <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 rounded-full border border-slate-200">
                          {zone.status}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-700 mb-1">{zone.area}</p>
                      <p className="text-xs text-slate-500">{zone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: The "Arrival Policy" Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-btcDark text-white p-10 rounded-[3rem] relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Clock size={180} />
            </div>

            <div className="relative z-10">
              <div className="bg-btcGreen w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                <Clock className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">Arrival & Quality Guarantee</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1"><Info size={20} className="text-btcGreen" /></div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="text-white font-bold italic">Note on Transit:</span> Due to varying travel times and traffic conditions, our specialists may arrive slightly earlier or later than the requested slot. 
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><ShieldCheck size={20} className="text-btcGreen" /></div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="text-white font-bold uppercase tracking-tighter">Full Service Hours:</span> Regardless of arrival time, you will <span className="text-btcGreen font-bold">always</span> receive the full duration of the service you paid for. We don't cut corners based on the clock.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs text-slate-500 font-medium italic">
                  *Travel times are calculated via real-time traffic data to minimize disruption.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}