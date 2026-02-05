import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Layout & Components
import Navbar from './components/Navbar';
import ServiceArea from './components/ServiceArea';

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import Info from './pages/Info';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* The landing page now shows the Hero + Service Area Policy */}
            <Route path="/" element={
              <>
                <Home />
                <ServiceArea />
              </>
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/info" element={<Info />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-100 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl font-black tracking-tighter text-slate-900">
                BTC<span className="text-btcGreen">.</span>
              </span>
              <p className="text-slate-400 text-sm mt-2">Premium Property Maintenance.</p>
            </div>
            
            <div className="flex gap-8 text-sm font-bold text-slate-600">
              <a href="/pricing" className="hover:text-btcGreen">Pricing</a>
              <a href="/booking" className="hover:text-btcGreen">Booking</a>
              <a href="/info" className="hover:text-btcGreen">Policy</a>
            </div>

            <p className="text-slate-400 text-xs">
              © 2026 BringTheClean. COSHH Certified Specialists.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;