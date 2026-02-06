import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Package, TrendingUp, ArrowRight, Zap, Sparkles, Clock, LayoutGrid, ArrowUpRight } from 'lucide-react';
import api from '../api/api';

const SearchBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [totalFound, setTotalFound] = useState(0);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState(['Wireless Printers', 'Ink Tank', 'LaserJet Pro']);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setSuggestions([]);
            setTotalFound(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length > 0) {
                setLoading(true);
                try {
                    const res = await api.get(`/products?search=${encodeURIComponent(query.trim())}`);
                    setTotalFound(res.data.length);
                    // Show all results in the overlay since it's scrollable, 
                    // or a very large limit like 50 to avoid performance issues if thousands exist
                    setSuggestions(res.data); 
                } catch (error) {
                    console.error("Search error");
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
                setTotalFound(0);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSearch = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            if (!recentSearches.includes(query.trim())) {
                setRecentSearches(prev => [query.trim(), ...prev].slice(0, 5));
            }
            onClose();
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white/80 backdrop-blur-3xl animate-in fade-in duration-500">
            
            {/* --- TOP COMMAND BAR --- */}
            <div className="bg-[#0A0A0A] border-b border-white/5 py-6 md:py-10 relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full -translate-x-1/4 -translate-y-1/4"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-6 max-w-5xl mx-auto">
                        <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-brand-500 shadow-2xl">
                            <Search size={28} strokeWidth={2.5} />
                        </div>
                        
                        <form onSubmit={handleSearch} className="flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Start typing to explore products..."
                                className="w-full bg-transparent text-2xl md:text-5xl font-black tracking-tighter outline-none text-white placeholder:text-slate-800"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>

                        <button 
                            onClick={onClose}
                            className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-2xl transition-all group"
                        >
                            <X size={24} className="text-slate-400 group-hover:text-white transition-all duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- RESULTS PANEL (Bento Layout) --- */}
            <div className="flex-1 overflow-y-auto search-modal-scroll py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
                        
                        {/* LEFT CONTENT: RESULTS OR DISCOVERY (Col 8) */}
                        <div className="lg:col-span-8">
                            {query.length > 0 ? (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                                        <div>
                                            <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Database Scan</span>
                                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                                                {loading ? 'Fetching Matches...' : `Found ${totalFound} products for "${query}"`}
                                            </h2>
                                        </div>
                                        {suggestions.length > 0 && (
                                            <button onClick={handleSearch} className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                                                Advanced Search <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {suggestions.map((item) => (
                                            <Link 
                                                key={item.id} 
                                                to={`/product/${item.slug}`}
                                                onClick={onClose}
                                                className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all group relative overflow-hidden"
                                            >
                                                <div className="w-24 h-24 bg-slate-50 rounded-[1.5rem] flex items-center justify-center p-4 shrink-0 group-hover:bg-white group-hover:scale-105 transition-all duration-500">
                                                    <img 
                                                        src={item.image_url?.startsWith('http') ? item.image_url : `/products/${item.image_url}`} 
                                                        alt={item.name}
                                                        className="max-h-full object-contain mix-blend-multiply"
                                                        onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=PR'}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 relative z-10">
                                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{item.category_name}</p>
                                                    <p className="font-black text-slate-900 truncate text-lg leading-tight mb-2 group-hover:text-brand-600 transition-colors">{item.name}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl font-black text-slate-950 tracking-tighter">${item.price}</span>
                                                        <ArrowUpRight size={16} className="text-slate-200 group-hover:text-brand-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                                    </div>
                                                </div>
                                                
                                                {/* Subtle hover accent */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </Link>
                                        ))}
                                    </div>
                                    
                                    {!loading && suggestions.length === 0 && (
                                        <div className="py-24 bg-white rounded-[3rem] border border-slate-100 text-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                                                <Package size={32} />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">No Precision Matches</h3>
                                            <p className="text-slate-500 font-medium max-w-xs mx-auto">We couldn't find a perfect match. Try searching for a broader category or brand.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    
                                    {/* Recent Searches Bento Block */}
                                    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
                                        <div className="flex items-center gap-3 mb-10">
                                            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                                                <Clock size={20} />
                                            </div>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Recent Activity</h3>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {recentSearches.map(tag => (
                                                <button 
                                                    key={tag}
                                                    onClick={() => { setQuery(tag); }}
                                                    className="flex items-center justify-between p-4 bg-slate-50 hover:bg-black hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all group"
                                                >
                                                    {tag}
                                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trending Bento Block */}
                                    <div className="bg-[#0A0A0A] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/20 blur-3xl rounded-full"></div>
                                        <div className="flex items-center gap-3 mb-10 relative z-10">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-400">
                                                <TrendingUp size={20} />
                                            </div>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-white">Market Trends</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 relative z-10">
                                            {['Smart LaserJet', 'EcoTank Pro', 'Enterprise Scan', '3D Pro Materials'].map(cat => (
                                                <button 
                                                    key={cat}
                                                    onClick={() => { setQuery(cat); }}
                                                    className="p-4 bg-white/5 border border-white/5 hover:border-brand-500 rounded-2xl text-left transition-all group"
                                                >
                                                    <span className="block text-[8px] font-black uppercase tracking-widest text-brand-500 mb-1">Trending</span>
                                                    <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white">{cat}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDEBAR: PROMOS (Col 4) */}
                        <div className="lg:col-span-4 space-y-8">
                            
                            {/* Feature Promo */}
                            <div className="bg-brand-50 border border-brand-100 rounded-[3rem] p-10 flex flex-col justify-between group">
                                <div className="mb-10">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm mb-8 group-hover:scale-110 transition-transform">
                                        <Sparkles size={28} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-600 mb-2 block">Pro Experience</span>
                                    <h4 className="text-3xl font-black text-slate-900 leading-none tracking-tight mb-4">Enterprise Grade Tech.</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed opacity-80">Join our business network for priority support and exclusive volume pricing.</p>
                                </div>
                                <Link 
                                    to="/contact"
                                    onClick={onClose}
                                    className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:gap-5 transition-all"
                                >
                                    Get Started <ArrowRight size={18} className="text-brand-500" />
                                </Link>
                            </div>

                            {/* Quick Categories Bento Block */}
                            <div className="bg-white border border-slate-100 rounded-[3rem] p-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900">
                                        <LayoutGrid size={16} />
                                    </div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Jump</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Printers', 'Laptops', 'Ink', 'Paper'].map(item => (
                                        <Link 
                                            key={item}
                                            to={`/products?category=${item.toLowerCase()}`}
                                            onClick={onClose}
                                            className="px-4 py-3 bg-slate-50 border border-transparent hover:border-black rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 text-center transition-all"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
