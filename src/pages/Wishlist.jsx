import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import { 
    Trash2, ShoppingBag, Heart, ArrowLeft, 
    Zap, ShoppingCart, ArrowRight, Star,
    MoveRight, Sparkles, Package
} from 'lucide-react';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleMoveToCart = (item) => {
        addToCart(item);
        removeFromWishlist(item.id);
        toast.success(`Moved ${item.name} to vault`);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 font-sans">
                <SEO pageName="wishlist" fallbackTitle="Empty Wishlist - printlast" />
                <div className="relative mb-12">
                    <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                        <Heart size={64} strokeWidth={1} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-black text-sm">0</div>
                </div>
                <h2 className="text-5xl font-black text-black mb-6 tracking-tighter text-center">Your wishlist is empty.</h2>
                <p className="text-slate-500 mb-12 font-medium max-w-sm text-center leading-relaxed">Collect your favorite premium technology here to acquire them later.</p>
                <Link to="/products" className="px-12 py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-2xl shadow-black/10 flex items-center gap-3">
                    Discover Products <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans text-black selection:bg-brand-100 selection:text-brand-600 overflow-x-hidden">
            <SEO pageName="wishlist" fallbackTitle="My Wishlist - printlast" />

            {/* --- CINEMATIC HERO --- */}
            <div className="relative pt-48 pb-24 bg-black overflow-hidden">
                {/* Decorative Glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                            <Star size={12} className="text-brand-500 fill-brand-500" />
                            <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Curated Collection</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                            Interest <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-700">Portfolio.</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed font-medium opacity-80">
                            You have {wishlistItems.length} items saved for future acquisition.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="flex items-center justify-between mb-16 pb-6 border-b border-slate-100">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Saved Intelligence</h2>
                    <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600 hover:text-black transition-colors">
                        <ArrowLeft size={14} /> Back to Catalogue
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {wishlistItems.map((item) => {
                        const imageUrl = item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/400';
                        
                        return (
                            <div key={item.id} className="group bg-white p-4 rounded-[2.5rem] border border-slate-100 hover:border-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 relative">
                                {/* Remove Button */}
                                <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg transition-all z-20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* Image Wrapper */}
                                <div className="relative overflow-hidden bg-slate-50 mb-6 aspect-square rounded-[2rem] p-8 flex items-center justify-center">
                                     <Link to={`/product/${item.slug}`} className="block w-full h-full">
                                        <img 
                                            src={imageUrl} 
                                            alt={item.name} 
                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=Product'}
                                        />
                                     </Link>
                                </div>

                                {/* Info */}
                                <div className="px-2 pb-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.category_name}</p>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                        </div>
                                    </div>
                                    <Link to={`/product/${item.slug}`}>
                                        <h3 className="text-lg font-black text-slate-900 hover:text-brand-600 transition-colors mb-4 line-clamp-1 tracking-tight">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                                        <span className="text-2xl font-black text-black tracking-tighter">${item.price}</span>
                                        <button 
                                            onClick={() => handleMoveToCart(item)}
                                            className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all shadow-lg shadow-black/10"
                                            title="Add to Cart"
                                        >
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- FOOTER CTA --- */}
                <div className="mt-32 p-12 md:p-20 bg-slate-900 rounded-[4rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-600/10 blur-[120px] rounded-full"></div>
                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Ready to acquire?</h3>
                        <p className="text-slate-400 mb-12 font-medium max-w-xl mx-auto text-lg leading-relaxed">
                            Complete your setup with our precision-engineered printing solutions. Performance without compromise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/cart" className="px-12 py-6 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 hover:text-white transition-all shadow-2xl">
                                Review Cart
                            </Link>
                            <Link to="/products" className="px-12 py-6 border-2 border-white/10 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                                Continue Exploring
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;