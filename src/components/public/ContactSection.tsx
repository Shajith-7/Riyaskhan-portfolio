import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, MessageSquare, Sparkles, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, submitInquiry } = usePortfolio();
  const { profile } = data;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');

  const copyToClipboard = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    submitInquiry({
      name: form.name,
      email: form.email,
      projectType: 'WhatsApp Inquiry',
      subject: form.subject || `WhatsApp Message from ${form.name}`,
      message: form.message,
    });

    const text = `*New Portfolio Inquiry*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Subject:* ${form.subject || 'General Opportunity'}\n\n` +
      `*Message:*\n${form.message}`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    submitInquiry({
      name: form.name,
      email: form.email,
      projectType: 'Direct Email',
      subject: form.subject || `Email Inquiry from ${form.name}`,
      message: form.message,
    });

    const subject = encodeURIComponent(form.subject || `Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');

    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-[60px] md:py-[80px] bg-[#000000] border-b border-[#2A2A2A] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#27D6D9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F0444B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#050505] border border-[#2A2A2A] shadow-xl group-hover:border-[#F0444B] group-hover:shadow-[0_0_20px_rgba(240,68,75,0.25)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight flex items-center justify-center gap-2">
                Let's <span className="text-[#F0444B]">Connect</span>
                <Sparkles className="w-6 h-6 text-[#27D6D9] inline-block animate-pulse" />
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#BDBDBD]">
            Have an opportunity, project, or collaboration in mind? I'd love to hear from you.
          </p>
        </div>

        {/* 2-Column Side-by-Side Professional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column (5 Cols): Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Available for Opportunities · Responds quickly</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                Get in Touch Today
              </h3>
              <p className="text-sm text-[#BDBDBD] leading-relaxed">
                Feel free to reach out directly via email, phone, or WhatsApp. You can also copy details directly with one click.
              </p>
            </div>

            {/* Contact Details Card Container */}
            <div className="bg-[#050505] rounded-3xl p-6 space-y-4 border border-[#2A2A2A] shadow-2xl backdrop-blur-sm flex-1 flex flex-col justify-between">
              <div className="space-y-3.5">
                
                {/* 1. Email Address Card (Original Gmail Red #EA4335) */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#EA4335]/60 transition-all duration-300 group shadow-md">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                  >
                    <div className="p-3 rounded-xl bg-[#EA4335]/15 text-[#EA4335] border border-[#EA4335]/30 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(234,67,53,0.4)] transition-all shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#EA4335] font-bold">
                        Email Address
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-[#FFFFFF] group-hover:text-white truncate">
                        {profile.email}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.email, 'email')}
                    className="p-2 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-lg transition-colors shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 2. Phone & WhatsApp Card (Original WhatsApp Green #25D366) */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] hover:border-[#25D366]/60 transition-all duration-300 group shadow-md">
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                  >
                    <div className="p-3 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#25D366] font-bold">
                        Phone & WhatsApp
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-[#FFFFFF] group-hover:text-white truncate">
                        {profile.phone}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.phone, 'phone')}
                    className="p-2 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-lg transition-colors shrink-0 ml-2"
                    title="Copy Phone Number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 3. Location Card (Original Maps Pin Crimson #F43F5E) */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#000000] border border-[#2A2A2A] shadow-md">
                  <div className="p-3 rounded-xl bg-[#F43F5E]/15 text-[#F43F5E] border border-[#F43F5E]/30 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#F43F5E] font-bold">
                      Location
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#FFFFFF] truncate">
                      {profile.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Channels with Authentic Brand Colors */}
              <div className="pt-4 border-t border-[#2A2A2A]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#BDBDBD] font-bold block mb-3 text-center">
                  Social & Developer Profiles
                </span>
                
                <div className="grid grid-cols-3 gap-2.5">
                  
                  {/* GitHub (White) */}
                  <a
                    href={profile.github || 'https://github.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#000000] hover:bg-[#1B1B1B] text-white border border-[#2A2A2A] transition-all flex items-center justify-center gap-2 group shadow-sm hover:-translate-y-0.5"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold font-mono">GitHub</span>
                  </a>

                  {/* LinkedIn (#0A66C2) */}
                  <a
                    href={profile.linkedin || 'https://linkedin.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#000000] hover:bg-[#0A66C2]/15 text-[#0A66C2] border border-[#2A2A2A] hover:border-[#0A66C2]/50 transition-all flex items-center justify-center gap-2 group shadow-sm hover:-translate-y-0.5"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold font-mono">LinkedIn</span>
                  </a>

                  {/* WhatsApp (#25D366) */}
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#000000] hover:bg-[#25D366]/15 text-[#25D366] border border-[#2A2A2A] hover:border-[#25D366]/50 transition-all flex items-center justify-center gap-2 group shadow-sm hover:-translate-y-0.5"
                    title="WhatsApp Chat"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold font-mono">WhatsApp</span>
                  </a>

                </div>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Executive Message Form */}
          <div className="lg:col-span-7 flex flex-col">
            {submitted ? (
              <div className="p-8 rounded-3xl bg-[#050505] border border-[#2A2A2A] text-center space-y-4 shadow-2xl backdrop-blur-sm my-auto">
                <div className="w-14 h-14 rounded-full bg-[#F0444B]/20 text-[#F0444B] border border-[#F0444B]/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                  Message Dispatched!
                </h3>
                <p className="text-sm font-medium text-[#BDBDBD] max-w-md mx-auto">
                  Thank you for reaching out. Your inquiry has been delivered directly and Mohamed will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2.5 bg-[#F0444B] text-white font-bold rounded-xl text-xs hover:bg-[#FF6B6B] transition-all shadow-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-[#050505] p-6 sm:p-8 rounded-3xl space-y-6 border border-[#2A2A2A] shadow-2xl backdrop-blur-sm flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                    <span>Send a Direct Message</span>
                  </h4>
                  <p className="text-xs text-[#BDBDBD]">
                    Fill in your contact info below to launch an instant inquiry.
                  </p>
                </div>
                
                <form className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#BDBDBD] flex items-center justify-between">
                          <span>Your Name</span>
                          <span className="text-[#F0444B] text-[10px]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-[#000000] border border-[#2A2A2A] focus:border-[#F0444B] p-3 rounded-xl text-xs text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F0444B] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#BDBDBD] flex items-center justify-between">
                          <span>Email Address</span>
                          <span className="text-[#F0444B] text-[10px]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full bg-[#000000] border border-[#2A2A2A] focus:border-[#F0444B] p-3 rounded-xl text-xs text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F0444B] transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#BDBDBD]">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="text"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 91509 00577"
                          className="w-full bg-[#000000] border border-[#2A2A2A] focus:border-[#F0444B] p-3 rounded-xl text-xs text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F0444B] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#BDBDBD]">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder="Project Opportunity"
                          className="w-full bg-[#000000] border border-[#2A2A2A] focus:border-[#F0444B] p-3 rounded-xl text-xs text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F0444B] transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#BDBDBD] flex items-center justify-between">
                        <span>Message</span>
                        <span className="text-[#F0444B] text-[10px]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Hi Mohamed, I'd like to discuss an opportunity..."
                        className="w-full bg-[#000000] border border-[#2A2A2A] focus:border-[#F0444B] p-3 rounded-xl text-xs text-white placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F0444B] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Action Buttons */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="w-full py-3.5 px-6 bg-[#F0444B] hover:bg-[#FF6B6B] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#F0444B]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Send via Email</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full sm:w-auto py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-105 active:scale-[0.99]"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950 fill-current" />
                      <span>WhatsApp Direct</span>
                    </button>
                  </div>

                </form>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};


