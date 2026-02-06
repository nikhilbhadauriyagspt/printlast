import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import HeroBento from '../components/HeroBento';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import { staticBlogs } from '../utils/staticBlogs';
import {
    Heart, ShoppingBag, ArrowRight, MoveRight, 
    Zap, ShieldCheck, Truck, Headphones, Search,
    ArrowUpRight
} from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState(staticBlogs);
    const [activeTab, setActiveTab] = useState('New Arrivals');
    const [deal, setDeal] = useState(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { addToCart } = useCart();

    // Timer Logic
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            // Target: End of current day
            const target = new Date();
            target.setHours(23, 59, 59, 999);

            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);
    
    // Loading states
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const fetchFastData = async () => {
            try {
                const [catRes, dealRes, prodRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/settings/deal'),
                    api.get('/products') // Fetch products here to pick a fallback deal
                ]);
                setCategories(catRes.data);
                
                // Prioritize the targeted HP product, then any HP printer, then the database deal, then the latest product
                if (prodRes.data && Array.isArray(prodRes.data) && prodRes.data.length > 0) {
                    const targetProduct = prodRes.data.find(p => {
                        const name = (p.name || '').toLowerCase();
                        return name.includes('m255dw') || 
                               (name.includes('hp') && name.includes('m255')) ||
                               (name.includes('laserjet') && name.includes('color')) ||
                               name.includes('hp laserjet pro m255dw') ||
                               name.includes('hp'); // Any HP product
                    });

                    const finalTarget = targetProduct || prodRes.data.find(p => (p.name || '').toLowerCase().includes('printer')) || prodRes.data.find(p => (p.name || '').toLowerCase().includes('laser'));

                    if (finalTarget) {
                        setDeal(finalTarget);
                    } else if (dealRes.data) {
                        setDeal(dealRes.data);
                    } else {
                        const latestProducts = [...prodRes.data].reverse();
                        const fallbackDeal = latestProducts.find(p => p.is_featured) || latestProducts[0];
                        setDeal(fallbackDeal);
                    }
                } else if (dealRes.data) {
                    setDeal(dealRes.data);
                }

            } catch (error) {
                console.error("Error fetching fast data:", error);
            } finally {
                setIsInitialLoading(false);
            }
        };
        fetchFastData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const prodRes = await api.get('/products');
                setProducts(prodRes.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsProductsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const getTabProducts = () => {
        if (activeTab === 'New Arrivals') return [...products].sort((a, b) => b.id - a.id).slice(0, 8);
        if (activeTab === 'Best Sellers') return products.filter(p => p.is_best_selling).slice(0, 8);
        if (activeTab === 'On Sale') return products.filter(p => parseFloat(p.mrp) > parseFloat(p.price)).slice(0, 8);
        return products.slice(0, 8);
    };

    const tabProducts = getTabProducts();

    return (
        <div className="bg-white min-h-screen font-sans text-black overflow-x-hidden">
            <SEO pageName="home" fallbackTitle="Home - printlast" fallbackDesc="Shop premium technology." />

            <HeroBento />

            {/* --- SECTION 1: CATEGORIES (Bento Grid) --- */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Our Collections</span>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            Shop by <br /> <span className="text-slate-400">Categories</span>
                        </h2>
                    </div>
                    <Link to="/products" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-2 transition-all hover:gap-5">
                        Discover More <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
                    {isInitialLoading ? Array(4).fill(0).map((_, i) => (
                         <Skeleton key={i} className={`w-full h-full ${i === 0 ? 'md:col-span-2 md:row-span-2' : i === 1 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}`} />
                    )) : (
                        <>
                            {categories[0] && (
                                <Link 
                                    to={`/products?category=${categories[0].slug}`}
                                    className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-slate-100 rounded-3xl"
                                >
                                    <img 
                                        src={categories[0].image?.startsWith('http') ? categories[0].image : `/category/${categories[0].image}`} 
                                        alt={categories[0].name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-10 left-10 text-white">
                                        <h3 className="text-4xl font-black mb-4 tracking-tight">{categories[0].name}</h3>
                                        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white text-black px-6 py-3 rounded-full group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                            View Collection <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            )}
                            {categories[1] && (
                                <Link 
                                    to={`/products?category=${categories[1].slug}`}
                                    className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-slate-100 rounded-3xl"
                                >
                                    <img 
                                        src={categories[1].image?.startsWith('http') ? categories[1].image : `/category/${categories[1].image}`} 
                                        alt={categories[1].name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <h3 className="text-3xl font-black mb-3 tracking-tight">{categories[1].name}</h3>
                                        <span className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 group-hover:text-brand-400 group-hover:border-brand-400 transition-all">Explore</span>
                                    </div>
                                </Link>
                            )}
                            {categories.slice(2, 4).map((cat, i) => (
                                <Link 
                                    key={cat.id}
                                    to={`/products?category=${cat.slug}`}
                                    className="md:col-span-1 md:row-span-1 group relative overflow-hidden bg-slate-100 rounded-3xl"
                                >
                                    <img 
                                        src={cat.image?.startsWith('http') ? cat.image : `/category/${cat.image}`} 
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                                        <h3 className="text-xl font-black mb-2 tracking-tight">{cat.name}</h3>
                                        <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            </section>

            {/* --- SECTION 2: PRODUCTS (Modern Tabs) --- */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 space-y-8">
                        <div className="text-center">
                            <span className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Trending Items</span>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Popular Choice</h2>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4 bg-white p-2 rounded-2xl shadow-sm">
                            {['New Arrivals', 'Best Sellers', 'On Sale'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === tab
                                        ? 'bg-black text-white shadow-lg shadow-black/20'
                                        : 'text-gray-400 hover:text-black hover:bg-slate-50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {isProductsLoading ? Array(8).fill(0).map((_, i) => (
                             <div key={i} className="bg-white p-4 rounded-3xl">
                                <Skeleton className="w-full aspect-square rounded-2xl mb-4" />
                                <Skeleton className="w-2/3 h-5 mb-2" />
                                <Skeleton className="w-1/3 h-4" />
                             </div>
                        )) : (
                            tabProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                    
                    <div className="mt-20 text-center">
                         <Link to="/products" className="inline-flex items-center gap-4 px-12 py-5 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all duration-300 rounded-full shadow-2xl shadow-black/10">
                             Browse All Products <MoveRight size={18} />
                         </Link>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: DEAL (Premium Soft Design) --- */}
            {deal && (
                <section className="py-24 relative overflow-hidden bg-slate-50">
                    {/* Animated Background Elements - Softened */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/40 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/40 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
                    
                    {/* Subtle Grid Pattern Overlay - Lighter */}
                    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Left: Content (Col 7) */}
                            <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
                                    <Zap size={12} className="text-brand-500 fill-brand-500 animate-pulse" />
                                    <span className="text-brand-600 font-black tracking-[0.15em] text-[9px] uppercase">Exclusive Offer</span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-[0.95] tracking-tight">
                                    {deal.name.split(' ').slice(0, -1).join(' ')} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
                                        {deal.name.split(' ').slice(-1)}
                                    </span>
                                </h2>

                                <div className="mb-10 relative group/desc">
                                    <p className={`text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-lg transition-all duration-700 ease-in-out ${isDescriptionExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-[80px] line-clamp-3 overflow-hidden'}`}>
                                        {deal.description}
                                    </p>
                                    {deal.description.length > 120 && (
                                        <button 
                                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                            className="inline-flex items-center gap-2 text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mt-4 hover:text-brand-800 transition-all group/btn"
                                        >
                                            <span className="w-6 h-[1px] bg-brand-600 transition-all group-hover/btn:w-10"></span>
                                            {isDescriptionExpanded ? 'Close' : 'Read More'}
                                        </button>
                                    )}
                                </div>
                                
                                {/* Modern Countdown Timer - Light Theme */}
                                <div className="flex gap-3 md:gap-5 mb-10">
                                    {[
                                        { label: 'Days', value: timeLeft.days },
                                        { label: 'Hours', value: timeLeft.hours },
                                        { label: 'Mins', value: timeLeft.minutes },
                                        { label: 'Secs', value: timeLeft.seconds }
                                    ].map((item, i) => (
                                        <div key={i} className="relative group">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-slate-100 rounded-[1rem] flex flex-col items-center justify-center shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-brand-200">
                                                <span className="text-lg md:text-2xl font-black text-slate-900 leading-none mb-0.5">
                                                    {item.value.toString().padStart(2, '0')}
                                                </span>
                                                <span className="text-[7px] md:text-[8px] text-slate-400 font-bold uppercase tracking-widest">{item.label}</span>
                                            </div>
                                            {/* Decorative dots between units */}
                                            {i < 3 && <span className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg">:</span>}
                                        </div>
                                    ))}
                                </div>

                                {/* Stock Progress & Pricing - Light Theme */}
                                <div className="w-full max-w-sm bg-white border border-slate-100 p-6 rounded-[2rem] mb-8 shadow-sm">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Deal Price</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl font-black text-slate-900 tracking-tighter">${deal.price}</span>
                                                {parseFloat(deal.mrp) > parseFloat(deal.price) && (
                                                    <span className="text-slate-400 line-through text-sm font-bold">${deal.mrp}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-brand-600 text-[9px] font-black uppercase tracking-widest block mb-1">Stock Left</span>
                                            <span className="text-slate-900 font-black text-base tracking-tight">42 / 100</span>
                                        </div>
                                    </div>
                                    
                                    {/* Urgency Progress Bar */}
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-500 w-[42%] rounded-full relative"></div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button 
                                        onClick={() => addToCart(deal)}
                                        className="group relative px-8 py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:pr-12 shadow-lg shadow-black/10 hover:shadow-xl hover:bg-brand-600"
                                    >
                                        <span className="relative z-10">Add to Cart</span>
                                        <ArrowRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                    <Link to={`/product/${deal.slug}`} className="px-8 py-4 border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-slate-50 transition-all">
                                        Details
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Product Display (Clean & Minimal) */}
                            <div className="lg:col-span-5 relative order-1 lg:order-2">
                                <div className="relative group">
                                    
                                    {/* Soft Background Glow */}
                                    <div className="absolute inset-0 bg-brand-100/50 blur-[60px] rounded-full scale-90 group-hover:scale-100 transition-transform duration-700"></div>

                                    {/* Main Display Card */}
                                    <div className="relative aspect-[4/5] bg-white border border-slate-100 rounded-[3rem] p-8 md:p-10 flex items-center justify-center overflow-hidden shadow-xl shadow-slate-200/50 transition-all duration-700 group-hover:shadow-2xl group-hover:border-slate-200">
                                        
                                        {/* Minimal Badge */}
                                        <div className="absolute top-6 right-6 z-20">
                                            <div className="w-16 h-16 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-lg animate-[float_4s_ease-in-out_infinite]">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-brand-300 mb-0.5">Save</span>
                                                <div className="flex items-start leading-none">
                                                    <span className="text-xl font-black tracking-tighter">{Math.round(((deal.mrp - deal.price) / deal.mrp) * 100)}</span>
                                                    <span className="text-[10px] font-black mt-0.5">%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Image */}
                                        <Link to={`/product/${deal.slug}`} className="block w-full h-full relative z-10 flex items-center justify-center">
                                            <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                                                <img
                                                    src={deal.image_url?.startsWith('http') ? deal.image_url : `/products/${deal.image_url}`}
                                                    alt={deal.name}
                                                    className="max-w-[85%] max-h-[85%] object-contain drop-shadow-xl"
                                                    onError={(e) => e.target.src = 'https://via.placeholder.com/600'}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* --- SECTION 4: FEATURES (Bento Style) --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureItem 
                            icon={<Truck size={32} className="text-blue-500" />} 
                            title="Free Shipping" 
                            desc="Fast & Reliable delivery nationwide" 
                            bgColor="bg-blue-50"
                        />
                        <FeatureItem 
                            icon={<ShieldCheck size={32} className="text-emerald-500" />} 
                            title="Secure Payment" 
                            desc="100% encrypted checkout process" 
                            bgColor="bg-emerald-50"
                        />
                        <FeatureItem 
                            icon={<Zap size={32} className="text-amber-500" />} 
                            title="Instant Access" 
                            desc="Priority support for all members" 
                            bgColor="bg-amber-50"
                        />
                        <FeatureItem 
                            icon={<Headphones size={32} className="text-rose-500" />} 
                            title="Expert Care" 
                            desc="24/7 Dedicated human support" 
                            bgColor="bg-rose-50"
                        />
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: BLOGS (Modern Cards) --- */}
            {blogs.length > 0 && (
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <span className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4 block">Knowledge Hub</span>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Latest Stories</h2>
                            </div>
                            <Link to="/blogs" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-2 transition-all hover:gap-5">
                                Read All News <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.slice(0, 3).map((blog) => (
                                <Link key={blog.id} to={`/blog/${blog.slug}`} className="group block bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                                    <div className="overflow-hidden aspect-[16/10] relative">
                                        <img 
                                            src={blog.image_url || "https://via.placeholder.com/800x500"} 
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6 glass-effect px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-black">
                                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="p-10">
                                        <h3 className="text-2xl font-black text-black mb-4 group-hover:text-brand-600 transition-colors leading-tight">{blog.title}</h3>
                                        <p className="text-slate-500 text-base line-clamp-2 leading-relaxed font-medium mb-6">{blog.description}</p>
                                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black group-hover:gap-4 transition-all">
                                            Read More <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

// --- SUB-COMPONENTS ---

const FeatureItem = ({ icon, title, desc, bgColor }) => (
    <div className={`p-10 rounded-[2.5rem] ${bgColor} group transition-all duration-500 hover:-translate-y-2`}>
        <div className="mb-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
);

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const activeWishlist = isInWishlist(product.id);
    const imageUrl = product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`;

    return (
        <div className="group bg-white p-4 rounded-[2.5rem] border border-slate-100 hover:border-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
            {/* Image Wrapper */}
            <div className="relative overflow-hidden bg-slate-50 mb-6 aspect-square rounded-[2rem]">
                 {parseFloat(product.mrp) > parseFloat(product.price) && (
                    <span className="absolute top-4 left-4 glass-effect text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 z-10 rounded-full">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </span>
                 )}
                 
                 <Link to={`/product/${product.slug}`} className="block w-full h-full p-6">
                    <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
                    />
                 </Link>

                 {/* Actions */}
                 <div className="absolute inset-x-4 bottom-4 flex justify-between gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                     <button 
                        onClick={() => addToCart(product)}
                        className="flex-1 h-14 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
                     >
                         <ShoppingBag size={18} /> Add to Cart
                     </button>
                     <button 
                        onClick={() => toggleWishlist(product)}
                        className={`w-14 h-14 flex items-center justify-center rounded-2xl shadow-lg transition-all ${activeWishlist ? 'bg-red-500 text-white' : 'glass-effect text-black hover:bg-black hover:text-white'}`}
                     >
                         <Heart size={18} fill={activeWishlist ? "currentColor" : "none"} />
                     </button>
                 </div>
            </div>

            {/* Info */}
            <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{product.category_name}</p>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    </div>
                </div>
                <Link to={`/product/${product.slug}`}>
                    <h3 className="text-lg font-black text-slate-900 hover:text-brand-600 transition-colors mb-4 line-clamp-1 tracking-tight">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-black tracking-tighter">${product.price}</span>
                    {parseFloat(product.mrp) > parseFloat(product.price) && (
                        <span className="text-slate-400 line-through text-xs font-bold">${product.mrp}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;