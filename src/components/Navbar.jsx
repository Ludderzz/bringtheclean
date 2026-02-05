import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // The specific pages you requested
  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Info', path: '/info' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-300 px-4 md:px-8 py-4">
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-[2.5rem] border ${
          isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-xl border-slate-200 py-3' 
          : 'bg-white/60 backdrop-blur-md border-white/40 py-5'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10">
          
          {/* LOGO WITH PULSE */}
          <div className="flex items-center gap-8">
            <a href="/" className="group flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                  BTC<span className="text-emerald-500">.</span>
                </h1>
                <span className="absolute -top-1 -right-3 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            </a>

            {/* UPDATED NAV LINKS */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* STATUS PILL */}
            <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-emerald-50 rounded-full border border-emerald-100/50">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">
                Clevedon & Surrounding areas
              </p>
            </div>

            <a 
              href="/booking" 
              className="group relative flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
            >
              <span>Book Now</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <button className="lg:hidden p-2 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden">
              <div className="p-8 space-y-6 bg-white rounded-b-[2.5rem]">
                <div className="grid grid-cols-2 gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.path}
                      className="p-4 rounded-2xl bg-slate-50 text-center text-[10px] font-black uppercase tracking-widest text-slate-600"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}