import React, { useState, useEffect } from 'react';
import api from '../api/api';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import { Mail, Phone, MapPin, Send, CheckCircle2, Zap } from 'lucide-react';

const Contact = () => {
  const [branding, setBranding] = useState(null);

  useEffect(() => {
    const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
    const fetchBranding = async () => {
      try {
        const res = await api.get(`/websites/${websiteId}`); // Dynamic ID
        setBranding(res.data);
      } catch (error) {
        console.error("Failed to fetch contact branding");
      }
    };
    fetchBranding();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website_id: import.meta.env.VITE_WEBSITE_ID || 1 // Dynamic ID
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', website_id: import.meta.env.VITE_WEBSITE_ID || 1 });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      <SEO 
        pageName="contact" 
        fallbackTitle="Contact Us | Support & Help" 
        fallbackDesc="Get in touch with our expert team." 
      />

      {/* --- CINEMATIC HERO --- */}
      <div className="relative pt-48 pb-24 bg-black overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                    <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                    <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Support Center</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-10">
                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-700">touch.</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed font-medium opacity-80">
                    Have questions about our premium hardware or need technical assistance? Our team of experts is ready to help you optimize your workflow.
                </p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Info (Bento Style) */}
          <div className="lg:col-span-4 space-y-6">
            <ContactInfoCard 
                icon={<Mail size={24} />} 
                title="Email Support" 
                value={branding ? branding.contact_email : 'support@printlast.com'} 
                bgColor="bg-blue-50/50"
                iconColor="text-blue-600"
            />
            <ContactInfoCard 
                icon={<Phone size={24} />} 
                title="Direct Line" 
                value={branding ? branding.phone : '+1 (800) 000-0000'} 
                bgColor="bg-brand-50/50"
                iconColor="text-brand-600"
            />
            <ContactInfoCard 
                icon={<MapPin size={24} />} 
                title="Global Office" 
                value={branding ? branding.contact_address : 'Loading address...'} 
                bgColor="bg-emerald-50/50"
                iconColor="text-emerald-600"
            />
            
            {/* Business Hours Card */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Operating Hours</h3>
                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-400">Mon - Fri</span>
                        <span className="text-sm font-black text-white">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-400">Sat - Sun</span>
                        <span className="text-sm font-black text-white">Priority Only</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Form (Premium Container) */}
          <div className="lg:col-span-8 bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-black/5 relative overflow-hidden">
            {success ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Transmission Received!</h2>
                    <p className="text-slate-500 text-lg mb-10 font-medium">Our specialists have been notified and will contact you shortly.</p>
                    <button onClick={() => setSuccess(false)} className="text-brand-600 font-black uppercase tracking-widest text-xs border-b-2 border-brand-600 pb-1 hover:text-black hover:border-black transition-all">Send Another Message</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormInput 
                            label="Full Identity" 
                            type="text" 
                            placeholder="Your Name" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                        />
                        <FormInput 
                            label="Electronic Mail" 
                            type="email" 
                            placeholder="email@example.com" 
                            value={formData.email} 
                            onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                        <FormInput 
                            label="Communication Line" 
                            type="tel" 
                            placeholder="+1 (000) 000-0000" 
                            value={formData.phone} 
                            onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                        <FormInput 
                            label="Subject Matter" 
                            type="text" 
                            placeholder="How can we help?" 
                            value={formData.subject} 
                            onChange={e => setFormData({...formData, subject: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Message Content</label>
                        <textarea 
                            rows="6" 
                            required 
                            className="w-full p-8 bg-slate-50 border-2 border-transparent rounded-[2.5rem] focus:bg-white focus:border-black outline-none transition-all font-medium text-slate-700 resize-none" 
                            placeholder="Describe your requirements in detail..." 
                            value={formData.message} 
                            onChange={e => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>
                    <button 
                        disabled={loading}
                        className="bg-black text-white px-16 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-600 transition-all flex items-center gap-4 group shadow-2xl shadow-black/10 disabled:bg-slate-200"
                    >
                        {loading ? 'Transmitting...' : 'Send Message'} 
                        {!loading && <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                    </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, value, bgColor, iconColor }) => (
    <div className={`p-10 rounded-[3rem] ${bgColor} border border-white/20 backdrop-blur-md group hover:-translate-y-2 transition-all duration-500`}>
        <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${iconColor} shadow-sm mb-8 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="font-black text-slate-900 mb-2 text-[10px] uppercase tracking-[0.2em] opacity-50">{title}</h3>
        <p className="text-base font-black text-slate-900 break-words">{value}</p>
    </div>
);

const FormInput = ({ label, ...props }) => (
    <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">{label}</label>
        <input 
            required 
            className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-bold text-slate-700 placeholder-slate-300" 
            {...props} 
        />
    </div>
);

export default Contact;
