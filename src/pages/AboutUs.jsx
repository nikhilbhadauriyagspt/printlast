import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { ShieldCheck, Truck, Users, Award, ChevronRight, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const AboutUs = () => {
      const [branding, setBranding] = useState({ name: 'printlast' });
  useEffect(() => {
      const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
      api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => {});
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-100 selection:text-brand-600 overflow-x-hidden">
      <SEO 
        pageName="about" 
        fallbackTitle={`About ${branding.name}`} 
        fallbackDesc={`Learn more about ${branding.name} and our mission.`} 
      />

      {/* --- CINEMATIC HERO --- */}
      <div className="relative pt-48 pb-32 bg-black overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                    <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">The {branding.name} Vision</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    We're defining the <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-700">next standard</span> <br/>
                    of office tech.
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium opacity-80 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    {branding.name} isn't just a supplier. We are a team of tech enthusiasts dedicated to empowering modern businesses with precision-engineered printing solutions.
                </p>
            </div>
        </div>
      </div>

      {/* --- BENTO STATS SECTION --- */}
      <section className="py-24 bg-white relative -mt-12 z-20">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2 bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col justify-between group hover:bg-black transition-all duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-12 group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <Users size={32} />
                    </div>
                    <div>
                        <h3 className="text-5xl font-black mb-4 tracking-tighter group-hover:text-white transition-colors">10,000+</h3>
                        <p className="text-slate-500 font-black uppercase tracking-widest text-xs group-hover:text-slate-400 transition-colors">Global Users Empowered</p>
                    </div>
                </div>
                <div className="bg-brand-50 p-10 rounded-[3rem] border border-brand-100 flex flex-col justify-between group hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500">
                    <div className="text-brand-600">
                        <Award size={40} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="text-4xl font-black text-brand-900 mb-2 tracking-tighter">99.9%</h3>
                        <p className="text-brand-600 font-black uppercase tracking-widest text-[10px]">Success Rate</p>
                    </div>
                </div>
                <div className="bg-slate-900 p-10 rounded-[3rem] flex flex-col justify-between text-white relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="text-brand-400">
                        <ShieldCheck size={40} />
                    </div>
                    <div>
                        <h3 className="text-4xl font-black mb-2 tracking-tighter">24/7</h3>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Expert Care</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- FEATURE SPLIT --- */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-600/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 rounded-[4rem] overflow-hidden group shadow-2xl shadow-black/10">
                <img 
                    src="/about-us.jpg" 
                    alt="Our Workspace" 
                    className="w-full transition-transform duration-[2000ms] group-hover:scale-110"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
                <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Legacy</span>
                <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Engineering Efficiency <br/> <span className="text-slate-400">Since 2015.</span></h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                    At {branding.name}, we don't just sell hardware. We provide the operational backbone that keeps your business running smoothly. From home offices to enterprise networks, we deliver tech that works.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    <ValueItem icon={<Truck size={20} />} title="Fast Global Logistics" />
                    <ValueItem icon={<ShieldCheck size={20} />} title="Enterprise Security" />
                    <ValueItem icon={<Users size={20} />} title="Human-Centric Support" />
                    <ValueItem icon={<Award size={20} />} title="Certified Excellence" />
                </div>

                <Link to="/contact" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest border-b-2 border-black pb-3 hover:gap-6 transition-all">
                    Partner with us <ArrowRight size={16} />
                </Link>
            </div>

          </div>
        </div>
      </section>

      {/* --- PARTNERS --- */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-20 bg-slate-50 inline-block px-10 left-1/2 -translate-x-1/2 relative">Trusted Technology Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {['HP', 'CANON', 'EPSON', 'BROTHER', 'XEROX', 'RICOH'].map((brand) => (
                <span key={brand} className="text-3xl font-black tracking-tighter text-center cursor-default hover:text-brand-600 transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-40 relative bg-black overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-600/10 blur-[150px] rounded-full"></div>
        <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-none">
                Ready to optimize <br/> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">infrastructure?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                <Link to="/products" className="px-12 py-6 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 hover:text-white transition-all shadow-2xl shadow-white/5">
                    Explore Solutions
                </Link>
                <Link to="/contact" className="px-12 py-6 border-2 border-white/10 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                    Schedule Consultation
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
};

const ValueItem = ({ icon, title }) => (
    <div className="flex items-center gap-4 group">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
            {icon}
        </div>
        <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{title}</span>
    </div>
);

export default AboutUs;