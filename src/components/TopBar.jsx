import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Phone, Mail, HelpCircle, Truck, ChevronDown, MapPin, Sparkles } from 'lucide-react';

const TopBar = () => {
  const [branding, setBranding] = useState({
    contact_email: 'support@printlast.com'
  });
  useEffect(() => {
    const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
    const fetchBranding = async () => {
      try {
        const res = await api.get(`/websites/${websiteId}`);
        setBranding(res.data);
      } catch (error) {
        console.error("Failed to fetch topbar data");
      }
    };
    fetchBranding();
  }, []);

  return (
    <div className="hidden lg:block bg-black text-white py-3 relative z-[70]">
      <div className="container mx-auto px-12">
        <div className="flex justify-between items-center h-6">

          {/* Left: Ticker/Message */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-brand-500 animate-pulse" />
              <p className="text-[10px] font-black tracking-[0.2em] uppercase">
                Free Delivery on orders over <span className="text-brand-400">$200</span>
              </p>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Support: <span className="text-white">{branding.phone}</span>
            </p>
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center gap-8">
            <Link to="/track" className="flex items-center gap-2 hover:text-brand-400 transition-colors text-[10px] font-black tracking-[0.2em] uppercase">
              Track Order
            </Link>
            <Link to="/faq" className="flex items-center gap-2 hover:text-brand-400 transition-colors text-[10px] font-black tracking-[0.2em] uppercase">
              Help Center
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;
