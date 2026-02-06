import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { 
    Trash2, Plus, Minus, ArrowLeft, 
    ShoppingBag, Zap, ShieldCheck, Truck, 
    ArrowRight, ShoppingCart
} from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 49;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 font-sans">
                <SEO pageName="cart" fallbackTitle="Empty Cart - printlast" />
                <div className="relative mb-12">
                    <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                        <ShoppingCart size={64} strokeWidth={1} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-black text-sm">0</div>
                </div>
                <h2 className="text-5xl font-black text-black mb-6 tracking-tighter text-center">Your vault is empty.</h2>
                <p className="text-slate-500 mb-12 font-medium max-w-sm text-center leading-relaxed">Looks like you haven't added any premium hardware to your collection yet.</p>
                <Link to="/products" className="px-12 py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-2xl shadow-black/10 flex items-center gap-3">
                    Start Exploring <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans text-black selection:bg-brand-100 selection:text-brand-600 overflow-x-hidden">
            <SEO pageName="cart" fallbackTitle="Shopping Cart - printlast" />

            {/* --- CINEMATIC HERO --- */}
            <div className="relative pt-48 pb-24 bg-black overflow-hidden">
                {/* Decorative Glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                            <Zap size={12} className="text-brand-500" />
                            <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Secure Checkout</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                            Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-700">Vault.</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed font-medium opacity-80">
                            You have {cartItems.length} precision items ready for dispatch.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* --- ITEMS LIST --- */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Inventory Selection</h2>
                            <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600 hover:text-black transition-colors">
                                <ArrowLeft size={14} /> Continue Shopping
                            </button>
                        </div>

                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="group relative flex flex-col sm:flex-row items-center gap-8 p-8 bg-white border border-slate-100 rounded-[3rem] hover:border-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                                    {/* Image Wrapper */}
                                    <div className="relative w-full sm:w-40 aspect-square bg-slate-50 rounded-[2rem] p-6 flex items-center justify-center overflow-hidden shrink-0">
                                        <img 
                                            src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/200'} 
                                            alt={item.name} 
                                            className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110" 
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-8">
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[10px] text-brand-600 font-black uppercase tracking-widest mb-2">{item.category_name}</p>
                                            <Link to={`/product/${item.slug}`} className="text-2xl font-black text-slate-900 hover:text-brand-600 transition-colors tracking-tight leading-tight mb-4">
                                                {item.name}
                                            </Link>
                                            <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                <span>Unit Price: <span className="text-slate-900">${item.price}</span></span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                                <span>Ref: 00{item.id}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-6">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:shadow-sm transition-all"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-12 text-center text-sm font-black">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:shadow-sm transition-all"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subtotal</p>
                                                <p className="text-2xl font-black text-slate-900 tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute -top-3 -right-3 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-100 hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- ORDER SUMMARY (Glass Card) --- */}
                    <div className="w-full lg:w-[450px] lg:sticky lg:top-32">
                        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-600/20 blur-[100px] rounded-full"></div>
                            
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-12">Order Architecture</h2>
                            
                            <div className="space-y-6 mb-12 relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Base Subtotal</span>
                                    <span className="text-lg font-black tracking-tight text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Shipping</span>
                                    <span className={shipping === 0 ? "text-brand-400 font-black" : "text-lg font-black tracking-tight"}>
                                        {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Estimated Taxes</span>
                                    <span className="text-lg font-black tracking-tight text-white">$0.00</span>
                                </div>
                                
                                <div className="pt-8 border-t border-white/5 mt-8">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">Total Amount</span>
                                            <span className="text-5xl font-black text-white tracking-tighter leading-none">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Currency</span>
                                            <p className="font-black text-white">USD</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-white text-black py-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 hover:text-white transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group"
                            >
                                Secure Transmission <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-10">
                                <div className="flex flex-col items-center gap-3 text-center">
                                    <ShieldCheck size={20} className="text-slate-500" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Encrypted</span>
                                </div>
                                <div className="flex flex-col items-center gap-3 text-center border-x border-white/5">
                                    <Truck size={20} className="text-slate-500" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Tracked</span>
                                </div>
                                <div className="flex flex-col items-center gap-3 text-center">
                                    <Zap size={20} className="text-slate-500" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Fast</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8 text-center px-10 leading-relaxed">
                            Price and availability are not guaranteed until the transaction is finalized.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
