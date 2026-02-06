import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import toast from 'react-hot-toast';
import { 
    Star, ShoppingBag, Heart, ShieldCheck, Truck, 
    Minus, Plus, ChevronRight, Share2, Zap, RotateCcw,
    Sparkles, Package, ArrowRight, CheckCircle2, Info,
    ArrowUpRight
} from 'lucide-react';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist: checkWishlist } = useWishlist();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const productRes = await api.get(`/products/slug/${slug}`);
                setProduct(productRes.data);

                const relRes = await api.get('/products');
                const allProducts = relRes.data;
                const related = allProducts
                    .filter(p => p.category_name === productRes.data.category_name && p.id !== productRes.data.id)
                    .slice(0, 4);
                
                if (related.length === 0) {
                     setRelatedProducts(allProducts.filter(p => p.id !== productRes.data.id).slice(0, 4));
                } else {
                     setRelatedProducts(related);
                }

            } catch (error) {
                console.error("Failed to fetch product data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
        window.scrollTo(0, 0);
    }, [slug]);

    const activeWishlist = product ? checkWishlist(product.id) : false;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAdded(true);
        toast.success(`Added ${product.name} to cart`);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleShare = async () => {
        const shareData = {
            title: product.name,
            text: product.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
            <Package size={64} className="text-slate-200 mb-6" />
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Product Not Found</h1>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">The item you are looking for might have been moved or is no longer available.</p>
            <Link to="/products" className="px-10 py-4 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all">Return to Catalogue</Link>
        </div>
    );

    const imageUrl = product.image_url ? (product.image_url.startsWith('http') ? product.image_url : `/products/${product.image_url}`) : 'https://via.placeholder.com/800';

    return (
        <div className="bg-slate-50 min-h-screen pb-32 font-sans text-slate-900">
            <SEO 
                pageName={`prod_${product.id}`} 
                manualTitle={product.meta_title || product.name}
                manualDesc={product.meta_description || product.description}
                manualKeywords={product.meta_keywords}
                image={imageUrl} 
                type="product" 
            />
            <SchemaMarkup type="product" data={product} />

            {/* --- IMMERSIVE PRODUCT HERO --- */}
            <div className="relative pt-32 lg:pt-48 pb-20 bg-white overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-12">
                        <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <Link to="/products" className="hover:text-brand-600 transition-colors">Catalogue</Link>
                        <ChevronRight size={10} />
                        <span className="text-slate-900 truncate max-w-[150px] md:max-w-none">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        
                        {/* LEFT: Visual Presentation */}
                        <div className="lg:col-span-6 relative group">
                            <div className="relative aspect-square bg-slate-50 rounded-[4rem] p-12 lg:p-20 overflow-hidden flex items-center justify-center border border-slate-100 shadow-2xl shadow-slate-200/50">
                                <img 
                                    src={imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2000ms] group-hover:scale-110 drop-shadow-2xl" 
                                />
                                
                                {/* Floating Badges */}
                                {parseFloat(product.mrp) > parseFloat(product.price) && (
                                    <div className="absolute top-10 left-10 glass-effect px-5 py-2 rounded-full border-brand-500/20">
                                        <span className="text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                                            <Zap size={12} className="text-brand-600 fill-brand-600" />
                                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% Discount
                                        </span>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={() => toggleWishlist(product)}
                                    className={`absolute top-10 right-10 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${activeWishlist ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white text-slate-900 hover:bg-black hover:text-white'}`}
                                >
                                    <Heart size={20} fill={activeWishlist ? "currentColor" : "none"} strokeWidth={activeWishlist ? 0 : 2} />
                                </button>
                            </div>
                            
                            {/* Visual Detail Accents */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-600/10 blur-3xl rounded-full"></div>
                        </div>

                        {/* RIGHT: High-End Details */}
                        <div className="lg:col-span-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 rounded-lg text-brand-600 font-black uppercase tracking-[0.2em] text-[9px] mb-6">
                                <Sparkles size={12} /> {product.category_name}
                            </div>
                            
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
                                {product.name.split(' ').slice(0, -1).join(' ')} <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-500 to-slate-400">
                                    {product.name.split(' ').slice(-1)}
                                </span>
                            </h1>

                            <div className="flex items-end gap-6 mb-10 pb-10 border-b border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Elite Price</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl font-black text-slate-950 tracking-tighter">${product.price}</span>
                                        {parseFloat(product.mrp) > parseFloat(product.price) && (
                                            <span className="text-xl text-slate-300 line-through font-bold">${product.mrp}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="ml-auto flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">In Stock</span>
                                </div>
                            </div>

                            <p className="text-slate-500 leading-relaxed text-lg font-medium mb-12 opacity-80 line-clamp-3">
                                {product.description}
                            </p>

                            {/* Action Matrix */}
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 h-16 w-40">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                                            className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-900"
                                        >
                                            <Minus size={18} strokeWidth={2.5}/>
                                        </button>
                                        <span className="flex-1 text-center font-black text-lg text-slate-950">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)} 
                                            className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-900"
                                        >
                                            <Plus size={18} strokeWidth={2.5}/>
                                        </button>
                                    </div>
                                    
                                    <button 
                                        onClick={handleAddToCart}
                                        disabled={isAdded || product.stock <= 0}
                                        className={`flex-1 h-16 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/10 group ${isAdded ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-brand-600'}`}
                                    >
                                        {isAdded ? (
                                            <>
                                                <CheckCircle2 size={20} className="animate-in zoom-in duration-300" /> Added to Portfolio
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" /> Add To Portfolio
                                            </>
                                        )}
                                    </button>
                                </div>

                                <button 
                                    onClick={() => { handleAddToCart(); navigate('/checkout'); }}
                                    className="w-full h-16 border-2 border-slate-100 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:border-slate-950 transition-all flex items-center justify-center gap-2"
                                >
                                    Instant Checkout <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Quick Trust Bar */}
                            <div className="mt-12 grid grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">2 Year Coverage</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                        <Truck size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Priority Logistics</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- BENTO INFORMATION SECTION --- */}
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Bento: Description (Large) */}
                    <div className="md:col-span-8 bg-[#0A0A0A] rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-brand-400">
                                    <Info size={24} />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">Intelligence Report</h3>
                            </div>
                            
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-slate-400 font-medium leading-relaxed mb-8">
                                    {product.description}
                                </p>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    The {product.name} is engineered for professionals who demand excellence. Every detail has been meticulously crafted to provide a superior user experience, combining state-of-the-art technology with an intuitive interface.
                                </p>
                            </div>
                            
                            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/5">
                                {[
                                    { label: 'Model', val: `v.${product.id}.0` },
                                    { label: 'Category', val: product.category_name },
                                    { label: 'Series', val: 'Elite Pro' },
                                    { label: 'Status', val: 'Certified' }
                                ].map((spec, i) => (
                                    <div key={i}>
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-1">{spec.label}</p>
                                        <p className="text-xs font-bold text-slate-300">{spec.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bento: Sidebar Stack */}
                    <div className="md:col-span-4 space-y-6">
                        {/* Specs Card */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">System Specs</h4>
                            <div className="space-y-6">
                                <SpecRow label="Total Mass" value="1.2 kg" />
                                <SpecRow label="Dimensions" value="24x12x5 cm" />
                                <SpecRow label="Chassis" value="Pro Alloy" />
                                <SpecRow label="Interface" value="Smart Connect" />
                            </div>
                        </div>

                        {/* Share Card */}
                        <div className="bg-brand-600 rounded-[3rem] p-10 text-white text-center group cursor-pointer overflow-hidden relative" onClick={handleShare}>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <Share2 size={32} className="mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                            <h4 className="font-black text-lg uppercase tracking-tight">Share Intelligence</h4>
                            <p className="text-brand-200 text-[10px] font-bold uppercase tracking-widest mt-1">Copy Link to Terminal</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- RELATED PRODUCTS (Curated Grid) --- */}
            {relatedProducts.length > 0 && (
                <div className="container mx-auto px-6 mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-brand-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Discovery</span>
                            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">You Might Also <span className="text-slate-400">Enquire.</span></h3>
                        </div>
                        <Link to="/products" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest border-b-2 border-slate-950 pb-2 transition-all hover:gap-5">
                            Full Catalogue <ArrowRight size={16} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((relProduct) => (
                            <RelatedProductCard key={relProduct.id} product={relProduct} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const SpecRow = ({ label, value }) => (
    <div className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
);

const RelatedProductCard = ({ product }) => {
    const imageUrl = product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`;
    
    return (
        <Link to={`/product/${product.slug}`} className="group block bg-white p-4 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
             <div className="relative aspect-square bg-slate-50 mb-6 rounded-[2rem] overflow-hidden p-8">
                <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2000ms] group-hover:scale-110"
                    onError={(e) => e.target.src='https://via.placeholder.com/400'} 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
             </div>
             <div className="px-2 pb-2">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{product.category_name}</p>
                 <h4 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-4 truncate tracking-tight">{product.name}</h4>
                 <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-950 tracking-tighter">${product.price}</span>
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowUpRight size={18} />
                    </div>
                 </div>
             </div>
        </Link>
    );
};

export default ProductDetails;