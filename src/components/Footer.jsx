import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import Skeleton from './Skeleton';
import { 
    Mail, Phone, MapPin, Zap, 
    ArrowRight, Globe, ShieldCheck
} from 'lucide-react';

const Footer = () => {
    const [branding, setBranding] = useState(null);
    const [email, setEmail] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
                const [brandingRes, catRes] = await Promise.all([
                    api.get(`/websites/${websiteId}`),
                    api.get('/categories')
                ]);
                setBranding({
                    ...brandingRes.data,
                    logo_url: brandingRes.data.logo_url || '/logo/logo.svg'
                });
                setCategories(catRes.data.slice(0, 5)); // Take first 5 categories
            } catch (error) {
                console.error("Footer data fetch error", error);
            }
        };
        fetchData();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        toast.success("Successfully Subscribed!");
        setEmail('');
    };

    return (
        <footer className="bg-black text-white pt-32 pb-12 border-t border-white/5 font-sans overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-600/10 blur-[120px] rounded-full"></div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                
                {/* --- TOP SECTION: NEWSLETTER --- */}
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 md:p-20 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-brand-500 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Newsletter</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-6">
                                Join our community <br /> & <span className="text-slate-400">get 10% off</span>
                            </h2>
                            <p className="text-slate-400 font-medium">Be the first to know about new collections and exclusive offers.</p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="relative">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-brand-500 transition-all placeholder-slate-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="absolute right-2 top-2 bottom-2 px-8 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- MIDDLE SECTION: LINKS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:pr-10">
                        <Link to="/" className="block mb-8">
                            {branding ? (
                                branding.logo_url ? (
                                    <img 
                                        src={branding.logo_url === '/logo/logo.svg' ? '/logo/logo-white.svg' : branding.logo_url} 
                                        alt={branding.name} 
                                        className="h-10 w-auto object-contain"
                                    />
                                ) : (
                                    <span className="text-3xl font-black tracking-tighter">
                                        {branding.name}<span className="text-brand-600">.</span>
                                    </span>
                                )
                            ) : (
                                <Skeleton className="h-8 w-32 bg-white/5" />
                            )}
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
                            Revolutionizing your workspace with premium technology and minimalist design. Quality without compromise.
                        </p>
                    </div>

                    <FooterColumn title="Collections" links={
                        categories.length > 0 
                        ? categories.map(cat => ({ label: cat.name, to: `/products?category=${cat.slug}` }))
                        : [
                            { label: 'New Arrivals', to: '/products' },
                            { label: 'Best Sellers', to: '/products' },
                            { label: 'Sale', to: '/products' },
                        ]
                    } />
                    
                    <FooterColumn title="Support" links={[
                        { label: 'Track Your Order', to: '/track' },
                        { label: 'Help Center', to: '/faq' },
                        { label: 'Privacy Policy', to: '/pages/privacy' },
                        { label: 'Terms of Service', to: '/pages/terms' },
                        { label: 'Shipping Info', to: '/pages/shipping' }
                    ]} />

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-white">Contact</h4>
                        {branding ? (
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                        <MapPin size={18} />
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{branding.contact_address}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                        <Phone size={18} />
                                    </div>
                                    <p className="text-sm font-black text-white">{branding.phone}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <p className="text-sm font-black text-white">{branding.contact_email}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full bg-white/5" />
                                <Skeleton className="h-4 w-2/3 bg-white/5" />
                                <Skeleton className="h-4 w-1/2 bg-white/5" />
                            </div>
                        )}
                    </div>
                </div>

                {/* --- BOTTOM SECTION: COPYRIGHT --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                        © 2026 {branding ? branding.name : 'Printlast'}. Crafted by PrimeFix Solutions LLC.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link to="/pages/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Privacy</Link>
                        <Link to="/pages/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Terms</Link>
                        <Link to="/faq" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

// --- HELPER COMPONENTS ---

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-white">{title}</h4>
        <ul className="space-y-4">
            {links.map((link, i) => (
                <li key={i}>
                    <Link to={link.to} className="text-sm text-slate-400 font-medium hover:text-brand-500 transition-all flex items-center gap-0 hover:gap-2 group">
                        <ArrowRight size={14} className="w-0 group-hover:w-4 transition-all opacity-0 group-hover:opacity-100" />
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const SocialIcon = ({ icon }) => (
    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black transition-all">
        {icon}
    </button>
);


export default Footer;