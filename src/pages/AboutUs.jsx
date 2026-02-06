import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { ShieldCheck, Truck, Users, Award, ChevronRight, CheckCircle2, ArrowRight, Target, Eye, Rocket } from 'lucide-react';

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
                fallbackTitle={`About Us | ${branding.name}`} 
                fallbackDesc={`Discover the story, mission, and vision of ${branding.name} - your trusted partner for premium printing solutions.`} 
            />

            {/* --- MODERN HERO --- */}
            <div className="relative pt-48 pb-32 bg-slate-950 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                            <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                            <span className="text-white/70 font-black uppercase tracking-[0.3em] text-[10px]">Innovation in Print</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-10">
                            Empowering your <br/> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-200 to-white">digital workflow</span> <br/>
                            with precision.
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium">
                            {branding.name} was born from a simple realization: businesses need more than just hardware. They need a technology partner that understands the critical role of printing in modern operations.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- OUR STORY SECTION --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="w-full lg:w-1/2">
                            <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Journey</span>
                            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-none">A Fresh Perspective <br/> <span className="text-slate-400">on Printing Tech.</span></h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                                <p>
                                    In an era where digital transformation is at the forefront, the importance of reliable physical output often gets overlooked. {branding.name} was founded to bridge this gap, bringing cutting-edge printing technology to businesses of all sizes.
                                </p>
                                <p>
                                    We started with a clear goal: to curate a selection of the world's most reliable printing solutions and back them with unparalleled technical expertise. Today, we stand as a dedicated supplier focused on quality, efficiency, and long-term reliability.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative">
                            <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl group">
                                <img 
                                    src="/about-us.jpg" 
                                    alt="Modern Printing Technology" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MISSION & VISION BENTO --- */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-8">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight uppercase">Our Mission</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                To simplify business operations by providing high-performance, cost-effective printing solutions that enhance productivity. We are committed to delivering the right technology for every unique workspace, ensuring seamless physical-to-digital integration.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-slate-900 p-12 rounded-[3rem] border border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 text-white">
                            <div className="w-16 h-16 bg-white/10 text-brand-400 rounded-2xl flex items-center justify-center mb-8">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">Our Vision</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                To redefine the standard of office technology distribution by becoming the most customer-centric printing solutions provider globally. We envision a future where every business, regardless of size, has access to enterprise-grade printing infrastructure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CORE VALUES --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center mb-20">
                    <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">What We Stand For</span>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Our Core Values</h2>
                </div>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <ValueCard 
                            icon={<ShieldCheck size={28} />} 
                            title="Reliability" 
                            desc="We only partner with brands that meet our rigorous standards for durability and performance."
                        />
                        <ValueCard 
                            icon={<Rocket size={28} />} 
                            title="Innovation" 
                            desc="Always looking ahead to bring you the latest advancements in smart printing and cloud integration."
                        />
                        <ValueCard 
                            icon={<Users size={28} />} 
                            title="Integrity" 
                            desc="Transparent pricing, honest advice, and long-term relationships are at the heart of our business."
                        />
                        <ValueCard 
                            icon={<Award size={28} />} 
                            title="Excellence" 
                            desc="We strive for perfection in every delivery, every support call, and every technology consultation."
                        />
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE US --- */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-600/5 blur-[100px] rounded-full"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-5xl font-black text-white mb-8 tracking-tighter leading-none">Why Partner <br/> <span className="text-brand-500">With {branding.name}?</span></h2>
                            <p className="text-slate-400 text-lg mb-12">
                                Choosing a printing partner is about more than just finding a machine. It's about ensuring your business never stops moving.
                            </p>
                            <div className="space-y-6">
                                <WhyItem title="Direct Brand Partnerships" desc="We source directly from leading manufacturers to ensure authenticity." />
                                <WhyItem title="Tailored Solutions" desc="Custom recommendations based on your specific volume and workflow." />
                                <WhyItem title="Expert Technical Support" desc="Our team knows the tech inside and out, ready to help when you need it." />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-end">
                                    <Truck className="text-brand-500 mb-4" size={32} />
                                    <p className="text-white font-black uppercase tracking-widest text-xs">Fast Logistics</p>
                                </div>
                                <div className="aspect-square bg-brand-600 rounded-3xl p-8 flex flex-col justify-end">
                                    <ShieldCheck className="text-white mb-4" size={32} />
                                    <p className="text-white font-black uppercase tracking-widest text-xs">Full Warranty</p>
                                </div>
                            </div>
                            <div className="space-y-6 pt-12">
                                <div className="aspect-square bg-white/10 rounded-3xl p-8 flex flex-col justify-end">
                                    <Users className="text-white mb-4" size={32} />
                                    <p className="text-white font-black uppercase tracking-widest text-xs">Dedicated Support</p>
                                </div>
                                <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-end">
                                    <CheckCircle2 className="text-brand-500 mb-4" size={32} />
                                    <p className="text-white font-black uppercase tracking-widest text-xs">Verified Quality</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-40 bg-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 tracking-tighter leading-none">
                        Let's build a better <br/> <span className="text-brand-600">workspace together.</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/products" className="px-12 py-6 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 transition-all shadow-2xl">
                            View Catalog
                        </Link>
                        <Link to="/contact" className="px-12 py-6 border-2 border-slate-200 text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                            Contact Our Team
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

const ValueCard = ({ icon, title, desc }) => (
    <div className="group">
        <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
            {icon}
        </div>
        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const WhyItem = ({ title, desc }) => (
    <div className="flex gap-4">
        <div className="shrink-0 mt-1">
            <CheckCircle2 className="text-brand-500" size={20} />
        </div>
        <div>
            <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">{title}</h4>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    </div>
);

export default AboutUs;
