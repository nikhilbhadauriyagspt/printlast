import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import SEO from '../components/SEO';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, Truck, ShieldCheck, User, MapPin, ArrowLeft, ShoppingBag, Zap, Tag, Check, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

// --- HELPER COMPONENTS ---

const FormInput = ({ label, ...props }) => (
    <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">{label}</label>
        <input 
            required 
            className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-black outline-none transition-all font-black text-slate-900 placeholder-slate-300 text-sm disabled:bg-slate-100 disabled:text-slate-400" 
            {...props} 
        />
    </div>
);

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [settings, setSettings] = useState(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        payment_method: ''
    });

    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            navigate('/cart');
        }

        // Fetch payment settings
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                setSettings(res.data);
                // Set default payment method based on what's enabled
                if (res.data.cod_enabled === '1') setFormData(prev => ({ ...prev, payment_method: 'COD' }));
                else if (res.data.paypal_enabled === '1') setFormData(prev => ({ ...prev, payment_method: 'PayPal' }));
            } catch (error) {
                console.error("Failed to load payment settings");
            }
        };

        const fetchCoupons = async () => {
            try {
                const res = await api.get('/coupons/public');
                setAvailableCoupons(res.data);
            } catch (error) {
                console.error("Failed to fetch coupons");
            }
        };

        fetchSettings();
        fetchCoupons();
    }, [cartItems.length, navigate, orderPlaced]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyCoupon = async (codeOverride = null) => {
        const codeToUse = codeOverride || couponCode;
        if (!codeToUse) return;

        try {
            const res = await api.post('/coupons/validate', {
                code: codeToUse,
                cartTotal: getCartTotal()
            });
            setDiscount(res.data.discountAmount);
            setAppliedCoupon(res.data.code);
            setCouponCode(res.data.code);
            toast.success(`Coupon ${res.data.code} applied!`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid coupon code");
        }
    };

    const placeOrder = async (paypalDetails = null) => {
        setLoading(true);
        try {
            const orderData = {
                user_id: user?.id || null,
                guest_name: formData.name,
                guest_email: formData.email,
                guest_phone: formData.phone,
                shipping_address: `${formData.address}, ${formData.city}, ${formData.zip}`,
                payment_method: formData.payment_method,
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: total,
                website_id: import.meta.env.VITE_WEBSITE_ID || 1 // Dynamic ID
            };

            const res = await api.post('/orders', orderData);
            setOrderPlaced(true);
            clearCart();
            navigate('/order-success', { state: { orderId: res.data.orderId || res.data.order_id } });
        } catch (error) {
            console.error("Order Failed:", error.response?.data || error);
            toast.error("Failed to place order: " + (error.response?.data?.error || "Please try again."));
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 20;
    const total = subtotal + shipping - discount;

    if (!settings) return <div className="min-h-screen flex items-center justify-center italic text-gray-400">Loading checkout...</div>;

    const paypalClientId = settings.paypal_mode === 'live' ? settings.paypal_live_client_id : settings.paypal_sandbox_client_id;

    return (
        <PayPalScriptProvider options={{
            "client-id": paypalClientId || "test",
            "currency": "USD",
            "intent": "capture"
        }}>
            <div className="bg-white min-h-screen font-sans text-black selection:bg-brand-100 selection:text-brand-600 overflow-x-hidden">
                <SEO pageName="checkout" fallbackTitle="Secure Checkout - printlast" />

                {/* --- CINEMATIC HERO --- */}
                <div className="relative pt-48 pb-24 bg-black overflow-hidden">
                    {/* Decorative Glows */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                                <ShieldCheck size={12} className="text-brand-500" />
                                <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Encrypted Transaction</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                                Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-700">Checkout.</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium opacity-80">
                                Finalize your order and initiate global priority dispatch.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-24">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">

                        <div className="flex-1 space-y-10 w-full">
                            {/* Navigation Link */}
                            <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-600 hover:text-black transition-colors mb-4">
                                <ArrowLeft size={14} /> Back to Vault
                            </button>

                            {/* Customer Details */}
                            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-black/[0.02]">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight">Identity Profile</h2>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Owner Information</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <FormInput label="Full Identity" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} disabled={!!user} />
                                    </div>
                                    <FormInput label="Electronic Mail" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} disabled={!!user} />
                                    <FormInput label="Direct Line" name="phone" type="tel" placeholder="+1 (000) 000-0000" value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-black/[0.02]">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight">Dispatch Point</h2>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Shipping Destination</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <FormInput label="Global Address" name="address" type="text" placeholder="Street Name and Number" value={formData.address} onChange={handleInputChange} />
                                    </div>
                                    <FormInput label="City" name="city" type="text" placeholder="Location City" value={formData.city} onChange={handleInputChange} />
                                    <FormInput label="Registry Code" name="zip" type="text" placeholder="ZIP / Postal Code" value={formData.zip} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-black/[0.02]">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight">Settlement</h2>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Transaction Gateway</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {settings.cod_enabled === '1' && (
                                        <label className={`group flex flex-col justify-between p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 ${formData.payment_method === 'COD' ? 'border-black bg-slate-50 shadow-xl' : 'border-slate-100 hover:border-slate-200'}`}>
                                            <div className="flex justify-between items-start mb-12">
                                                <input type="radio" name="payment_method" value="COD" checked={formData.payment_method === 'COD'} onChange={handleInputChange} className="w-6 h-6 accent-black" />
                                                <Truck size={32} className={`transition-colors ${formData.payment_method === 'COD' ? 'text-black' : 'text-slate-200'}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-widest mb-1">Cash On Priority</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none">Pay upon arrival</p>
                                            </div>
                                        </label>
                                    )}

                                    {settings.paypal_enabled === '1' && (
                                        <label className={`group flex flex-col justify-between p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 ${formData.payment_method === 'PayPal' ? 'border-blue-600 bg-blue-50/30 shadow-xl shadow-blue-600/5' : 'border-slate-100 hover:border-slate-200'}`}>
                                            <div className="flex justify-between items-start mb-12">
                                                <input type="radio" name="payment_method" value="PayPal" checked={formData.payment_method === 'PayPal'} onChange={handleInputChange} className="w-6 h-6 accent-blue-600" />
                                                <div className="flex gap-1.5 opacity-60">
                                                    <div className="w-10 h-6 bg-blue-600 rounded-lg"></div>
                                                    <div className="w-10 h-6 bg-sky-400 rounded-lg"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-widest mb-1">PayPal / Cards</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none">Global encrypted payment</p>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[450px] lg:sticky lg:top-32">
                            <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-12 text-white relative overflow-hidden">
                                {/* Decorative Glow */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-600/20 blur-[100px] rounded-full"></div>
                                
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-12">Summary Architecture</h2>

                                {/* Coupon Section (Glass) */}
                                <div className="mb-12 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem]">
                                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-1">Voucher Code</label>
                                    <div className="flex gap-3 mb-4">
                                        <input
                                            type="text"
                                            placeholder="ENTER CODE"
                                            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 outline-none transition-all text-xs uppercase font-black placeholder-slate-600"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            disabled={!!appliedCoupon}
                                        />
                                        <button
                                            onClick={() => handleApplyCoupon()}
                                            disabled={!couponCode || !!appliedCoupon}
                                            className="px-6 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-500 hover:text-white disabled:bg-white/10 disabled:text-slate-600 transition-all"
                                        >
                                            Apply
                                        </button>
                                    </div>

                                    {/* Available Coupons List */}
                                    {availableCoupons.length > 0 && !appliedCoupon && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {availableCoupons.map(coupon => (
                                                <button
                                                    key={coupon.code}
                                                    onClick={() => handleApplyCoupon(coupon.code)}
                                                    className="px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black text-slate-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                                                >
                                                    <Tag size={10} className="text-brand-500" />
                                                    <span>{coupon.code}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {appliedCoupon && (
                                        <div className="flex items-center justify-between bg-brand-500/10 p-4 rounded-xl border border-brand-500/20">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white">
                                                    <Check size={14} />
                                                </div>
                                                <p className="text-[10px] text-brand-400 font-black uppercase tracking-tight">Code {appliedCoupon} Activated</p>
                                            </div>
                                            <button onClick={() => { setAppliedCoupon(''); setDiscount(0); setCouponCode(''); }} className="text-slate-500 hover:text-red-500 font-black text-[9px] uppercase transition-colors">Revoke</button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6 mb-12 relative z-10">
                                    <div className="max-h-[200px] overflow-y-auto space-y-4 mb-8 custom-scrollbar pr-2">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between text-xs">
                                                <span className="text-slate-400 truncate flex-1 pr-4 font-bold">{item.name} <span className="text-brand-500 ml-2">× {item.quantity}</span></span>
                                                <span className="font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-8 border-t border-white/5 space-y-4">
                                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            <span>Inventory Base</span>
                                            <span className="text-white">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            <span>Global Priority</span>
                                            <span className={shipping === 0 ? "text-brand-400" : "text-white"}>{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-xs font-black text-brand-500 uppercase tracking-widest">
                                                <span>Voucher Credit</span>
                                                <span>-${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        
                                        <div className="pt-8 border-t border-white/5 mt-8">
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">Total Liability</span>
                                                    <span className="text-5xl font-black text-white tracking-tighter leading-none">${total.toFixed(2)}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Currency</span>
                                                    <p className="font-black text-white text-sm">USD</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Action */}
                                <div className="relative z-10">
                                                                        {formData.payment_method === 'COD' ? (
                                                                            <button
                                                                                disabled={loading || !formData.address || !formData.phone}
                                                                                onClick={() => placeOrder()}
                                                                                className="w-full bg-white text-black py-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 hover:text-white disabled:bg-white/5 disabled:text-slate-600 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group"
                                                                            >
                                                                                {loading ? 'Validating...' : 'Complete Transmission'} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                                                            </button>
                                                                        ) : formData.payment_method === 'PayPal' ? (
                                                                            <div className="relative z-0">
                                                                                                                                <PayPalButtons
                                                                                                                                    key="paypal-desktop"
                                                                                                                                    disabled={!formData.address || !formData.phone}
                                                                                                                                    style={{ layout: "vertical", shape: "pill", label: "pay", height: 50 }}                                                                                    createOrder={(data, actions) => {
                                                                                        return actions.order.create({
                                                                                            purchase_units: [{ amount: { value: Number(total).toFixed(2) } }]
                                                                                        });
                                                                                    }}
                                                                                    onApprove={(data, actions) => {
                                                                                        return actions.order.capture().then((details) => {
                                                                                            placeOrder(details);
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        ) : null}
                                </div>

                                <div className="mt-12 flex items-center justify-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                                    <ShieldCheck size={16} className="text-brand-500" />
                                    Secured by Protocol SSL
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 p-6 z-[50] flex items-center gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Total Settlement</p>
                    <p className="text-3xl font-black text-black tracking-tighter">${total.toFixed(2)}</p>
                </div>
                <div className="flex-[1.5]">
                    {formData.payment_method === 'COD' ? (
                        <button
                            disabled={loading || !formData.address || !formData.phone}
                            onClick={() => placeOrder()}
                            className="w-full bg-black text-white h-16 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-2xl shadow-black/20 disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            {loading ? '...' : 'Initiate Order'}
                        </button>
                    ) : formData.payment_method === 'PayPal' ? (
                        <div className="relative z-0 max-h-16 overflow-hidden rounded-[1.5rem]">
                            <PayPalButtons
                                key="paypal-mobile"
                                disabled={!formData.address || !formData.phone}
                                style={{ layout: "horizontal", height: 50, shape: "rect", label: "pay", tagline: false }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{ amount: { value: Number(total).toFixed(2) } }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        placeOrder(details);
                                    });
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default Checkout;