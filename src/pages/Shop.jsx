import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
    Search, Heart, ShoppingBag, X, 
    CheckCircle2, SlidersHorizontal,
    Zap, Sparkles, ArrowRight
} from 'lucide-react';

// Custom debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const Shop = () => {
    const location = useLocation();
    
    // State
    const [priceRange, setPriceRange] = useState(100000);
    const debouncedPriceRange = useDebounce(priceRange, 500); // Debounce price

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categorySEO, setCategorySEO] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Filters State
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('search') || '');
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term
    const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(location.search).get('category') || 'All');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        if (selectedCategory !== 'All') {
            const cat = categories.find(c => c.slug === selectedCategory);
            if (cat) setCategorySEO(cat);
        } else {
            setCategorySEO(null);
        }
    }, [selectedCategory, categories]);

    const getDisplayCategoryName = () => {
        if (selectedCategory === 'All') return 'All Collections';
        const cat = categories.find(c => c.slug === selectedCategory);
        return cat ? cat.name : selectedCategory;
    };

    const displayCategoryName = getDisplayCategoryName();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (selectedCategory !== 'All') params.append('category', selectedCategory);
                if (debouncedSearchTerm) params.append('search', debouncedSearchTerm.trim());
                
                // Use debounced price range
                if (debouncedPriceRange < 100000) params.append('maxPrice', debouncedPriceRange);
                
                if (sortBy) params.append('sort', sortBy);
                
                const res = await api.get(`/products?${params.toString()}`);
                
                // Client-side fallback: If search is active, ensure we prioritize matches
                let filteredProducts = res.data;
                
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, debouncedSearchTerm, debouncedPriceRange, sortBy]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const catRes = await api.get('/categories');
                setCategories(catRes.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchTerm(queryParams.get('search') || '');
        setSelectedCategory(queryParams.get('category') || 'All');
    }, [location.search]);

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setPriceRange(100000);
        setSortBy('newest');
    };

    return (
        <div className="bg-white min-h-screen font-sans text-black">
            <SEO 
                pageName="shop" 
                fallbackTitle="Shop Premium Tech - printlast" 
                fallbackDesc="Browse our curated selection of printers and office tech."
                manualTitle={categorySEO?.meta_title}
                manualDesc={categorySEO?.meta_description}
                manualKeywords={categorySEO?.meta_keywords}
            />

            {/* --- CINEMATIC HERO HEADER --- */}
            <div className="relative pt-48 pb-32 bg-[#050505] overflow-hidden">
                {/* Advanced Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-900/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/3"></div>
                
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
                            <Sparkles size={14} className="text-brand-300" />
                            <span className="text-brand-100 font-bold tracking-[0.2em] text-[10px] uppercase">
                                {searchTerm ? 'Search Intelligence' : 'Premium Catalogue'}
                            </span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            {searchTerm ? (
                                <>
                                    Results for <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                                        "{searchTerm}"
                                    </span>
                                </>
                            ) : selectedCategory !== 'All' ? (
                                <>
                                    {displayCategoryName.split(' ')[0]} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                                        {displayCategoryName.split(' ').slice(1).join(' ')}
                                    </span>
                                </>
                            ) : (
                                <>
                                    The Future of <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Printing Tech</span>
                                </>
                            )}
                        </h1>
                        
                        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-in fade-in slide-in-from-bottom-12 duration-1000">
                            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                                {products.length} Products Found
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                <Zap size={14} className="text-amber-400" />
                                Live Inventory
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* --- SIDEBAR FILTERS (Premium Glass) --- */}
                    <div className={`fixed inset-0 z-[100] lg:sticky lg:top-32 lg:z-0 lg:w-72 transition-all duration-500 lg:block ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}`}>
                        <div 
                            className="h-full overflow-y-auto lg:overflow-visible bg-white lg:bg-white lg:border lg:border-slate-100 lg:rounded-[2.5rem] lg:p-10 p-8 shadow-2xl shadow-black/5 lg:shadow-none search-modal-scroll"
                        >
                            {/* Mobile Header */}
                            <div className="flex lg:hidden justify-between items-center mb-10">
                                <span className="text-2xl font-black tracking-tighter">Filters</span>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-50 rounded-2xl"><X size={24}/></button>
                            </div>

                            {/* Search */}
                            <div className="mb-12">
                                <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">Search Model</h4>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        placeholder="Type keywords..." 
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-black rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors" size={18} />
                                </div>
                            </div>

                            {/* Categories (Improved Visual List) */}
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Department</h4>
                                    <span className="text-[10px] font-black text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">{categories.length + 1}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={() => setSelectedCategory('All')}
                                        className={`group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${selectedCategory === 'All' ? 'bg-black text-white shadow-2xl shadow-black/20' : 'hover:bg-slate-50 text-slate-600'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${selectedCategory === 'All' ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-white shadow-sm'}`}>
                                            <SlidersHorizontal size={18} className={selectedCategory === 'All' ? 'text-white' : 'text-slate-400'} />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs font-black uppercase tracking-widest">All Models</span>
                                            <span className={`text-[9px] font-bold uppercase tracking-tight ${selectedCategory === 'All' ? 'text-slate-400' : 'text-slate-300'}`}>Full Catalog</span>
                                        </div>
                                    </button>

                                    {categories.map((cat) => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${selectedCategory === cat.slug ? 'bg-black text-white shadow-2xl shadow-black/20' : 'hover:bg-slate-50 text-slate-600'}`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl overflow-hidden transition-all duration-500 ${selectedCategory === cat.slug ? 'ring-2 ring-white/20' : 'bg-slate-100 group-hover:shadow-md'}`}>
                                                <img 
                                                    src={cat.image?.startsWith('http') ? cat.image : `/category/${cat.image}`} 
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                                                />
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                                                <span className={`text-[9px] font-bold uppercase tracking-tight ${selectedCategory === cat.slug ? 'text-slate-400' : 'text-slate-300'}`}>Premium Series</span>
                                            </div>
                                            {selectedCategory === cat.slug && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Slider */}
                            <div className="mb-12">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Budget</h4>
                                    <span className="text-xs font-black text-black tracking-tight">${priceRange.toLocaleString()}</span>
                                </div>
                                <input 
                                    type="range" min="0" max="100000" step="1000"
                                    value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black mb-4"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                    <span>Min $0</span>
                                    <span>Limit $100k</span>
                                </div>
                            </div>

                            {/* Clear Button */}
                            <button onClick={clearAllFilters} className="w-full py-5 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 hover:text-black hover:border-black transition-all">
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* --- MAIN GRID --- */}
                    <div className="flex-1 w-full">
                        
                        {/* Toolbar (Mobile & Desktop Sort) */}
                        <div className="flex justify-between items-center mb-12">
                             <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex lg:hidden items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/10"
                            >
                                <SlidersHorizontal size={16}/> Filter Models
                            </button>

                            <div className="hidden lg:flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Inventory</span>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 hidden sm:block">Sort Results:</span>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black focus:ring-0 cursor-pointer shadow-sm outline-none"
                                >
                                    <option value="newest">Latest Release</option>
                                    <option value="price-low">Economic Value</option>
                                    <option value="price-high">Premium Range</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-white p-4 rounded-[2.5rem] border border-slate-50">
                                        <Skeleton className="w-full aspect-square rounded-[2rem] mb-4" />
                                        <Skeleton className="w-2/3 h-5 mb-2" />
                                        <Skeleton className="w-1/3 h-4" />
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <ShopProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Large Info Card */}
                                    <div className="md:col-span-2 bg-slate-50 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border border-slate-100">
                                        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mb-10">
                                            <Search size={40} className="text-slate-200" />
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Intelligence Check: <br/> <span className="text-slate-400">Zero Matches Found</span></h3>
                                        <p className="text-slate-500 font-medium mb-12 max-w-sm leading-relaxed">We couldn't find anything matching your exact enquiry. Our database is extensive, so perhaps a broader term would help?</p>
                                        <button 
                                            onClick={clearAllFilters} 
                                            className="px-12 py-6 bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-brand-600 transition-all shadow-2xl shadow-black/10 flex items-center gap-3"
                                        >
                                            Reset All Filters <ArrowRight size={16} />
                                        </button>
                                    </div>

                                    {/* Sidebar Suggestions */}
                                    <div className="flex flex-col gap-6">
                                        <div className="bg-[#0A0A0A] rounded-[3rem] p-10 text-white relative overflow-hidden group">
                                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-600/20 blur-3xl rounded-full"></div>
                                            <h4 className="text-xl font-black mb-4 relative z-10">Popular Now</h4>
                                            <div className="flex flex-col gap-3 relative z-10">
                                                {['Wireless Printers', 'Ink Tank', 'Laser Pro'].map(term => (
                                                    <button 
                                                        key={term}
                                                        onClick={() => setSearchTerm(term)}
                                                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/item"
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{term}</span>
                                                        <ArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-brand-50 rounded-[3rem] p-10 border border-brand-100 flex flex-col justify-between">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm mb-6">
                                                <Zap size={24} />
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 mb-2">Need Expert Help?</h4>
                                            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">Our tech team can help you find exactly what you need.</p>
                                            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-brand-600 flex items-center gap-2 hover:gap-4 transition-all">
                                                Contact Specialist <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

const ShopProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isAdded, setIsAdded] = useState(false);
    const activeWishlist = isInWishlist(product.id);
    const imageUrl = product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`;

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

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
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isAdded ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-brand-600'}`}
                     >
                         {isAdded ? (
                            <>
                                <CheckCircle2 size={18} /> Added
                            </>
                         ) : (
                            <>
                                <ShoppingBag size={18} /> Add to Cart
                            </>
                         )}
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

export default Shop;