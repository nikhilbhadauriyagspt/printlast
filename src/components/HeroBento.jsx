import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, ShieldCheck, Truck, Headphones, MoveRight } from 'lucide-react';

const HeroBento = () => {
    return (
        <section className="container mx-auto px-6 py-12 lg:-mt-[150px] -mt-[76px] pt-24 lg:pt-40">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                
                {/* --- MAIN LARGE BLOCK (2x2) --- */}
                <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[3rem] bg-slate-900 shadow-2xl">
                    <img 
                        src="/banner/banner-2.jpg" 
                        alt="Premium Office Solutions"
                        className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 backdrop-blur-md border border-brand-500/30 rounded-full w-fit mb-4">
                            <Zap size={14} className="text-brand-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-200">New Arrivals</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                            Performance. <br />
                            <span className="text-slate-400">Without Limits.</span>
                        </h1>
                        <p className="text-slate-300 text-sm md:text-base font-medium max-w-md mb-8 opacity-80">
                            Transform your workspace with our enterprise-grade solutions engineered for precision.
                        </p>
                        <Link 
                            to="/products" 
                            className="group/btn flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all w-fit"
                        >
                            Shop Collection <MoveRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* --- TOP RIGHT MEDIUM BLOCK (2x1) --- */}
                <div className="md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-[3rem] bg-slate-100">
                    <img 
                        src="/banner/banner-1.jpg" 
                        alt="Professional Photography"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-between items-start">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Color Perfected</span>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight mb-4">Inkjet Pro Series</h2>
                            <Link 
                                to="/products?category=inkjet" 
                                className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest border-b border-white pb-1 hover:text-brand-400 hover:border-brand-400 transition-all"
                            >
                                Explore <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM RIGHT MEDIUM BLOCK (2x1) --- */}
                <div className="md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-[3rem] bg-slate-800">
                    <img 
                        src="/banner/banner-3.jpg" 
                        alt="Eco-Friendly Innovation"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <span className="text-brand-400 text-[10px] font-black uppercase tracking-widest mb-2">Sustainable Printing</span>
                        <h3 className="text-3xl font-black text-white tracking-tight mb-4">Eco-Tank SuperTank</h3>
                        <Link 
                            to="/products?category=supertank" 
                            className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest border-b border-white pb-1 hover:text-brand-400 hover:border-brand-400 transition-all w-fit"
                        >
                            Discover More <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>

            </div>

            {/* --- ENHANCED TRUST BAR --- */}
            {/* <div className="mt-16 bg-white border border-slate-100 rounded-[2.5rem] p-4 md:p-8 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative">
                    <TrustItem icon={<Truck size={22} className="text-brand-600" />} title="Free Shipping" subtitle="On all orders over $50" isFirst />
                    <TrustItem icon={<ShieldCheck size={22} className="text-brand-600" />} title="2 Year Warranty" subtitle="Full coverage protection" />
                    <TrustItem icon={<Headphones size={22} className="text-brand-600" />} title="Expert Support" subtitle="24/7 Dedicated help" />
                    <TrustItem icon={<Zap size={22} className="text-brand-600" />} title="Secure Payment" subtitle="100% Encrypted" />
                </div>
            </div> */}
        </section>
    );
};

const TrustItem = ({ icon, title, subtitle, isFirst }) => (
    <div className={`flex items-center gap-5 px-6 py-2 group cursor-default transition-all duration-300 hover:-translate-y-1 ${!isFirst ? 'lg:border-l lg:border-slate-100' : ''}`}>
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm">
            {icon}
        </div>
        <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.1em] text-slate-900 group-hover:text-brand-600 transition-colors">{title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{subtitle}</p>
        </div>
    </div>
);

export default HeroBento;