import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';
import api from '../api/api';
import Skeleton from './Skeleton';
import {
    ShoppingCart,
    User,
    Heart,
    Menu,
    X,
    Search,
    LogOut,
    Package,
    LayoutDashboard,
    Zap,
    Store,
    ArrowRight,
    Home,
    Phone,
    Info,
    HelpCircle
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [branding, setBranding] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';
    // Navbar is transparent only on Home Page when not scrolled
    const isTransparent = isHomePage && !isScrolled;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`)
            .then(res => setBranding({ 
                ...res.data, 
                logo_url: res.data.logo_url || '/logo/logo.svg' 
            }))
            .catch(() => { });
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Mobile Sidebar Navigation */}
            <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>
                <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[400px] bg-white shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full p-8">
                        <div className="flex items-center justify-between mb-12">
                            {branding ? (
                                <span className="text-3xl font-black tracking-tighter text-black">{branding.name}<span className="text-brand-600">.</span></span>
                            ) : (
                                <Skeleton className="h-6 w-24" />
                            )}
                            <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-slate-100 rounded-2xl hover:bg-black hover:text-white transition-all">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 space-y-2">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    onClick={() => setIsMenuOpen(false)} 
                                    className={`block py-4 px-6 text-xl font-black uppercase tracking-widest rounded-2xl transition-all ${location.pathname === link.path ? 'bg-black text-white' : 'hover:bg-slate-50'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-8 border-t border-slate-100">
                             <div className="grid grid-cols-2 gap-4">
                                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-[2rem] hover:bg-black hover:text-white transition-all group">
                                    <Package size={24} className="text-slate-400 group-hover:text-white" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Orders</span>
                                </Link>
                                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-[2rem] hover:bg-black hover:text-white transition-all group">
                                    <Heart size={24} className="text-slate-400 group-hover:text-white" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Wishlist</span>
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className={`fixed left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'top-4 mx-4 md:mx-12 py-3 glass-effect rounded-[2.5rem] shadow-2xl shadow-black/5' : 'top-0 lg:top-12 py-8 bg-transparent border-transparent'}`}>
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between">

                        {/* 1. LEFT: Logo */}
                        <div className="flex items-center gap-6">
                             {/* Mobile Hamburger */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`lg:hidden p-2 rounded-xl transition-colors ${isTransparent ? 'text-white bg-white/10' : 'text-black bg-slate-100'}`}
                            >
                                <Menu size={24} strokeWidth={2} />
                            </button>

                            <Link to="/" className="flex items-center gap-2 group">
                                {branding ? (
                                    branding.logo_url ? (
                                        <img
                                            src={(isTransparent && branding.logo_url === '/logo/logo.svg') ? '/logo/logo-white.svg' : branding.logo_url}
                                            alt={branding.name}
                                            className={`h-8 md:h-10 w-auto object-contain transition-all duration-500`}
                                        />
                                    ) : (
                                        <span className={`font-black tracking-tighter text-3xl transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-black'}`}>
                                            {branding.name}<span className="text-brand-600">.</span>
                                        </span>
                                    )
                                ) : (
                                    <Skeleton className="h-8 w-24 md:w-32" />
                                )}
                            </Link>
                        </div>

                        {/* 2. CENTER: Desktop Links */}
                        <nav className="hidden lg:flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-xl ${
                                        location.pathname === link.path 
                                        ? 'bg-black text-white shadow-lg' 
                                        : `${isTransparent ? 'text-white hover:bg-white/20' : 'text-slate-600 hover:text-black hover:bg-slate-100'}`
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* 3. RIGHT: Actions */}
                        <div className="flex items-center gap-3 md:gap-5">
                            <button 
                                onClick={() => setIsSearchOpen(true)}
                                className={`p-2.5 rounded-xl transition-all duration-300 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-slate-600 hover:text-black hover:bg-slate-100'}`}
                            >
                                <Search size={22} strokeWidth={2} />
                            </button>

                            <Link 
                                to="/wishlist" 
                                className={`hidden sm:flex p-2.5 rounded-xl transition-all duration-300 relative ${isTransparent ? 'text-white hover:bg-white/20' : 'text-slate-600 hover:text-black hover:bg-slate-100'}`}
                            >
                                <Heart size={22} strokeWidth={2} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full animate-ping"></span>
                                )}
                            </Link>

                            <Link 
                                to="/cart" 
                                className={`flex items-center gap-2 p-2.5 px-4 rounded-xl transition-all duration-300 relative ${isTransparent ? 'bg-white text-black hover:bg-slate-100' : 'bg-black text-white hover:bg-brand-600 shadow-xl shadow-black/10'}`}
                            >
                                <ShoppingCart size={20} strokeWidth={2} />
                                <span className={`text-xs font-black ${isTransparent ? 'text-black' : 'text-white'}`}>
                                    {cartCount}
                                </span>
                            </Link>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`p-2.5 rounded-xl transition-all duration-300 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-slate-600 hover:text-black hover:bg-slate-100'}`}
                                >
                                    <User size={22} strokeWidth={2} />
                                </button>

                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                        <div className="absolute top-full right-0 mt-6 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                                            {user ? (
                                                <div className="flex flex-col gap-1">
                                                    <div className="px-6 py-6 bg-slate-50 rounded-[1.5rem] mb-2">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Authenticated As</p>
                                                        <p className="text-lg font-black text-black truncate">{user.name}</p>
                                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-brand-600 hover:text-black transition-colors">Manage Account</Link>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1">
                                                        <DropdownItem to="/orders" icon={<Package size={18} />} text="Order History" onClick={() => setIsProfileOpen(false)} />
                                                        <DropdownItem to="/wishlist" icon={<Heart size={18} />} text="My Wishlist" onClick={() => setIsProfileOpen(false)} />
                                                        {user.role === 'admin' && (
                                                            <DropdownItem to="/admin" icon={<LayoutDashboard size={18} />} text="Administrator" onClick={() => setIsProfileOpen(false)} />
                                                        )}
                                                        <button 
                                                            onClick={handleLogout} 
                                                            className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all mt-2"
                                                        >
                                                            Sign Out <LogOut size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-6 text-center">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                                                        <User size={32} />
                                                    </div>
                                                    <p className="text-sm font-black text-black mb-2 uppercase tracking-tight">Welcome Guest</p>
                                                    <p className="text-xs font-medium text-slate-400 mb-8 leading-relaxed">Sign in to sync your cart and track your latest orders.</p>
                                                    <div className="flex flex-col gap-3">
                                                        <Link to="/login" onClick={() => setIsProfileOpen(false)} className="py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-600 shadow-xl shadow-black/10 transition-all">Member Login</Link>
                                                        <Link to="/register" onClick={() => setIsProfileOpen(false)} className="py-4 border-2 border-slate-100 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all">Create Account</Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const DropdownItem = ({ to, icon, text, onClick }) => (
    <Link to={to} onClick={onClick} className="flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-black rounded-2xl transition-all group">
        <span className="text-slate-300 group-hover:text-brand-500 transition-colors">{icon}</span>
        {text}
    </Link>
);

export default Navbar;