import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, 
  MessageSquare, Sparkles, Copy, Check, User, Tag, Clock, Zap, ExternalLink 
} from 'lucide-react';

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

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');

  const copyToClipboard = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleQuickTopic = (topic: string) => {
    setForm((prev) => ({ ...prev, subject: topic }));
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
      `*Phone:* ${form.phone || 'N/A'}\n` +
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
    <section id="contact" className="py-[70px] md:py-[95px] bg-[#000000] border-b border-[#2A2A2A] relative overflow-hidden">
      
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-[#F0444B]/20 via-[#27D6D9]/15 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-[#27D6D9]/20 via-[#F0444B]/15 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Floating Sparkle/Light Particle accents */}
      <div className="absolute top-12 left-1/3 w-2 h-2 rounded-full bg-[#27D6D9] animate-ping opacity-75 pointer-events-none" />
      <div className="absolute bottom-20 left-1/5 w-1.5 h-1.5 rounded-full bg-[#F0444B] animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-70 pointer-events-none" style={{ animationDuration: '4s' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-7 py-3 rounded-3xl bg-[#050508]/90 border border-[#2A2A2A] shadow-[0_0_25px_rgba(240,68,75,0.3)] group-hover:border-[#F0444B] group-hover:shadow-[0_0_35px_rgba(240,68,75,0.5)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-md">
              <h2 className="text-3xl sm:text-[38px] font-bold text-[#FFFFFF] font-['Plus_Jakarta_Sans'] tracking-tight flex items-center justify-center gap-3">
                Let's <span className="text-sand-gradient">Connect</span>
                <Sparkles className="w-7 h-7 text-[#27D6D9] inline-block animate-bounce" />
              </h2>
            </div>
          </div>
          <p className="text-base sm:text-lg font-regular text-[#BDBDBD] max-w-2xl mx-auto">
            Have an exciting opportunity, high-impact project, or engineering collaboration in mind? Reach out below for an instant response.
          </p>
        </div>

        {/* 2-Column Side-by-Side Glowing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column (5 Cols): Glowing Direct Contact Cards & Glowing Social Icons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Header Badge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>Available for Opportunities · Fast Reply</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#BDBDBD] leading-relaxed">
                Click any contact card to copy details instantly or open direct communication on WhatsApp & Email.
              </p>
            </div>

            {/* Glowing Main Container Card */}
            <div className="bg-[#050508]/90 rounded-3xl p-6 sm:p-7 space-y-6 border border-[#2A2A2A] shadow-[0_0_35px_rgba(0,0,0,0.9)] backdrop-blur-md flex-1 flex flex-col justify-between hover:border-[#F0444B]/40 transition-all duration-500 group/container">
              
              {/* Contact Detail Cards List */}
              <div className="space-y-4">
                
                {/* 1. Email Address Card (Gmail Red #EA4335 Glow) */}
                <div className="relative group/card p-4 rounded-2xl bg-[#000000]/80 border border-[#2A2A2A] hover:border-[#EA4335] hover:shadow-[0_0_30px_rgba(234,67,53,0.45)] transition-all duration-300 flex items-center justify-between shadow-md hover:-translate-y-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div className="p-3.5 rounded-xl bg-[#EA4335]/20 text-[#EA4335] border border-[#EA4335]/40 group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(234,67,53,0.7)] transition-all duration-300 shrink-0 animate-float-icon-1">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#EA4335] font-bold flex items-center gap-1.5">
                        <span>Email Address</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] animate-ping" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover/card:text-[#FF6B6B] truncate transition-colors">
                        {profile.email}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.email, 'email')}
                    className="p-2.5 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-xl transition-all shrink-0 ml-2 border border-transparent hover:border-[#EA4335]/40 hover:shadow-[0_0_12px_rgba(234,67,53,0.3)]"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? (
                      <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                        <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span className="hidden sm:inline">Copied!</span>
                      </div>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 2. Phone & WhatsApp Card (WhatsApp Green #25D366 Glow) */}
                <div className="relative group/card p-4 rounded-2xl bg-[#000000]/80 border border-[#2A2A2A] hover:border-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.45)] transition-all duration-300 flex items-center justify-between shadow-md hover:-translate-y-1">
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div className="p-3.5 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(37,211,102,0.7)] transition-all duration-300 shrink-0 animate-float-icon-2">
                      <MessageSquare className="w-5 h-5 fill-current" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#25D366] font-bold flex items-center gap-1.5">
                        <span>Phone & WhatsApp</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover/card:text-[#2CEE74] truncate transition-colors">
                        {profile.phone}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.phone, 'phone')}
                    className="p-2.5 text-[#BDBDBD] hover:text-white hover:bg-[#1B1B1B] rounded-xl transition-all shrink-0 ml-2 border border-transparent hover:border-[#25D366]/40 hover:shadow-[0_0_12px_rgba(37,211,102,0.3)]"
                    title="Copy Phone Number"
                  >
                    {copiedField === 'phone' ? (
                      <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                        <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span className="hidden sm:inline">Copied!</span>
                      </div>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 3. Location Card (Rose Crimson #F43F5E Glow) */}
                <div className="relative group/card p-4 rounded-2xl bg-[#000000]/80 border border-[#2A2A2A] hover:border-[#F43F5E] hover:shadow-[0_0_30px_rgba(244,63,94,0.45)] transition-all duration-300 flex items-center gap-4 shadow-md hover:-translate-y-1">
                  <div className="p-3.5 rounded-xl bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/40 group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(244,63,94,0.7)] transition-all duration-300 shrink-0 animate-float-icon-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#F43F5E] font-bold">
                      Location & Timezone
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white truncate">
                      {profile.location} <span className="text-[#BDBDBD] font-normal text-xs">(IST / GMT+5:30)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing Social Media Buttons Section */}
              <div className="pt-5 border-t border-[#2A2A2A] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-center text-[#BDBDBD] font-bold block flex items-center justify-center gap-2">
                  <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F0444B]" />
                  <span>Social & Developer Networks</span>
                  <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#27D6D9]" />
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* GitHub (Glowing Silver / White + Cyan) */}
                  <a
                    href={profile.github || 'https://github.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden py-3 px-3 rounded-2xl bg-[#000000] text-white border border-white/30 animate-social-github transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1.5 hover:scale-105"
                    title="GitHub Profile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Github className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                    <span className="text-xs font-bold font-mono">GitHub</span>
                  </a>

                  {/* LinkedIn (Glowing Brand Deep Blue #0A66C2) */}
                  <a
                    href={profile.linkedin || 'https://linkedin.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden py-3 px-3 rounded-2xl bg-[#000000] text-[#0A66C2] border border-[#0A66C2]/40 animate-social-linkedin transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1.5 hover:scale-105"
                    title="LinkedIn Profile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A66C2]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:scale-125 transition-transform duration-300 shrink-0" />
                    <span className="text-xs font-bold font-mono">LinkedIn</span>
                  </a>

                  {/* WhatsApp (Glowing Brand Electric Green #25D366) */}
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden py-3 px-3 rounded-2xl bg-[#000000] text-[#25D366] border border-[#25D366]/40 animate-social-whatsapp transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1.5 hover:scale-105"
                    title="WhatsApp Chat"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#25D366]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <MessageSquare className="w-4 h-4 text-[#25D366] fill-current group-hover:scale-125 transition-transform duration-300 shrink-0" />
                    <span className="text-xs font-bold font-mono">WhatsApp</span>
                  </a>

                </div>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Executive Interactive & Glowing Form Card */}
          <div className="lg:col-span-7 flex flex-col">
            {submitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-[#05050A]/95 border border-[#F0444B]/40 text-center space-y-6 shadow-[0_0_50px_rgba(240,68,75,0.3)] backdrop-blur-md my-auto animate-float-subtle">
                <div className="w-20 h-20 rounded-full bg-[#F0444B]/20 text-[#F0444B] border-2 border-[#F0444B] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(240,68,75,0.6)] animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm font-medium text-[#BDBDBD] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your inquiry has been logged and Mohamed will get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-gradient-to-r from-[#F0444B] to-[#FF6B6B] text-white font-bold rounded-2xl text-xs sm:text-sm hover:scale-105 transition-all shadow-[0_0_25px_rgba(240,68,75,0.5)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="relative overflow-hidden bg-[#040408]/95 p-6 sm:p-9 rounded-3xl space-y-6 border border-[#2A2A38] hover:border-[#F0444B]/60 shadow-[0_0_45px_rgba(240,68,75,0.2)] hover:shadow-[0_0_65px_rgba(39,214,217,0.4)] backdrop-blur-xl flex-1 flex flex-col justify-between transition-all duration-500 group/formcard">
                
                {/* Background Glow Accents inside card */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F0444B]/15 rounded-full blur-[90px] pointer-events-none animate-pulse-glow" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#27D6D9]/15 rounded-full blur-[90px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

                {/* Form Title & Description Header */}
                <div className="relative z-10 space-y-2 border-b border-[#2A2A38] pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2.5">
                      <span className="text-sand-gradient">Send an Instant Inquiry</span>
                      <Sparkles className="w-5 h-5 text-[#27D6D9] animate-bounce" />
                    </h4>
                    <span className="text-[11px] font-mono text-[#F0444B] bg-[#F0444B]/15 px-3 py-1 rounded-full border border-[#F0444B]/40 font-bold shadow-[0_0_12px_rgba(240,68,75,0.3)]">
                      Direct Dispatch
                    </span>
                  </div>
                  <p className="text-xs text-[#BDBDBD] leading-relaxed">
                    Fill in your project details below to initiate direct communication via Email or WhatsApp.
                  </p>
                </div>
                
                {/* Interactive Glowing Form */}
                <form className="relative z-10 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#D4D4D8] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <User className={`w-3.5 h-3.5 transition-colors ${focusedField === 'name' || form.name ? 'text-[#F0444B]' : 'text-[#888888]'}`} />
                            <span>Your Name</span>
                          </span>
                          <span className="text-[#F0444B] text-[10px]">*</span>
                        </label>
                        <div className="relative group/input flex items-center">
                          <div className={`absolute left-3.5 p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'name' || form.name ? 'bg-[#F0444B]/20 text-[#F0444B] shadow-[0_0_10px_rgba(240,68,75,0.5)]' : 'bg-[#181820] text-[#777777]'}`}>
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-[#020205] border border-[#2A2A38] focus:border-[#F0444B] pl-11 pr-10 py-3.5 rounded-2xl text-xs text-white placeholder-[#666666] shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:border-[#F0444B]/50 hover:shadow-[0_0_20px_rgba(240,68,75,0.25)] focus:outline-none focus:ring-2 focus:ring-[#F0444B]/40 focus:shadow-[0_0_30px_rgba(240,68,75,0.55),inset_0_0_12px_rgba(240,68,75,0.15)] focus:bg-[#070710] transition-all duration-300 font-medium"
                          />
                          {form.name && (
                            <div className="absolute right-3.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                              <Check className="w-3.5 h-3.5 animate-bounce" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#D4D4D8] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Mail className={`w-3.5 h-3.5 transition-colors ${focusedField === 'email' || form.email ? 'text-[#27D6D9]' : 'text-[#888888]'}`} />
                            <span>Email Address</span>
                          </span>
                          <span className="text-[#F0444B] text-[10px]">*</span>
                        </label>
                        <div className="relative group/input flex items-center">
                          <div className={`absolute left-3.5 p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'email' || form.email ? 'bg-[#27D6D9]/20 text-[#27D6D9] shadow-[0_0_10px_rgba(39,214,217,0.5)]' : 'bg-[#181820] text-[#777777]'}`}>
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@company.com"
                            className="w-full bg-[#020205] border border-[#2A2A38] focus:border-[#27D6D9] pl-11 pr-10 py-3.5 rounded-2xl text-xs text-white placeholder-[#666666] shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:border-[#27D6D9]/50 hover:shadow-[0_0_20px_rgba(39,214,217,0.25)] focus:outline-none focus:ring-2 focus:ring-[#27D6D9]/40 focus:shadow-[0_0_30px_rgba(39,214,217,0.55),inset_0_0_12px_rgba(39,214,217,0.15)] focus:bg-[#070710] transition-all duration-300 font-medium"
                          />
                          {form.email && form.email.includes('@') && (
                            <div className="absolute right-3.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                              <Check className="w-3.5 h-3.5 animate-bounce" />
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Phone & Quick Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Phone Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#D4D4D8] flex items-center gap-1.5">
                          <Phone className={`w-3.5 h-3.5 transition-colors ${focusedField === 'phone' || form.phone ? 'text-[#25D366]' : 'text-[#888888]'}`} />
                          <span>Phone / WhatsApp</span>
                        </label>
                        <div className="relative group/input flex items-center">
                          <div className={`absolute left-3.5 p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'phone' || form.phone ? 'bg-[#25D366]/20 text-[#25D366] shadow-[0_0_10px_rgba(37,211,102,0.5)]' : 'bg-[#181820] text-[#777777]'}`}>
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="text"
                            value={form.phone}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 91509 00577"
                            className="w-full bg-[#020205] border border-[#2A2A38] focus:border-[#25D366] pl-11 pr-10 py-3.5 rounded-2xl text-xs text-white placeholder-[#666666] shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:border-[#25D366]/50 hover:shadow-[0_0_20px_rgba(37,211,102,0.25)] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 focus:shadow-[0_0_30px_rgba(37,211,102,0.55),inset_0_0_12px_rgba(37,211,102,0.15)] focus:bg-[#070710] transition-all duration-300 font-medium"
                          />
                          {form.phone && (
                            <div className="absolute right-3.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                              <Check className="w-3.5 h-3.5 animate-bounce" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Subject Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#D4D4D8] flex items-center gap-1.5">
                          <Tag className={`w-3.5 h-3.5 transition-colors ${focusedField === 'subject' || form.subject ? 'text-[#F0444B]' : 'text-[#888888]'}`} />
                          <span>Subject</span>
                        </label>
                        <div className="relative group/input flex items-center">
                          <div className={`absolute left-3.5 p-1.5 rounded-lg transition-all duration-300 ${focusedField === 'subject' || form.subject ? 'bg-[#F0444B]/20 text-[#F0444B] shadow-[0_0_10px_rgba(240,68,75,0.5)]' : 'bg-[#181820] text-[#777777]'}`}>
                            <Tag className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="text"
                            value={form.subject}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            placeholder="Project Opportunity"
                            className="w-full bg-[#020205] border border-[#2A2A38] focus:border-[#F0444B] pl-11 pr-10 py-3.5 rounded-2xl text-xs text-white placeholder-[#666666] shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:border-[#F0444B]/50 hover:shadow-[0_0_20px_rgba(240,68,75,0.25)] focus:outline-none focus:ring-2 focus:ring-[#F0444B]/40 focus:shadow-[0_0_30px_rgba(240,68,75,0.55),inset_0_0_12px_rgba(240,68,75,0.15)] focus:bg-[#070710] transition-all duration-300 font-medium"
                          />
                          {form.subject && (
                            <div className="absolute right-3.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                              <Check className="w-3.5 h-3.5 animate-bounce" />
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Quick Topic Chips */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-[#A1A1AA] font-bold block flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#27D6D9]" />
                        <span>Quick Subject Presets:</span>
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          '💼 Full-time Role',
                          '🚀 Freelance Project',
                          '🤝 Tech Advisory',
                          '💬 Quick Question',
                        ].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleQuickTopic(preset)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all duration-300 ${
                              form.subject === preset
                                ? 'bg-gradient-to-r from-[#F0444B]/25 to-[#FF6B6B]/20 text-[#FF6B6B] border-[#F0444B] shadow-[0_0_20px_rgba(240,68,75,0.6)] scale-105 font-bold'
                                : 'bg-[#020205] text-[#BDBDBD] border-[#2A2A38] hover:border-[#27D6D9] hover:text-[#27D6D9] hover:shadow-[0_0_16px_rgba(39,214,217,0.45)] hover:-translate-y-0.5'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#D4D4D8] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className={`w-3.5 h-3.5 transition-colors ${focusedField === 'message' || form.message ? 'text-[#27D6D9]' : 'text-[#888888]'}`} />
                          <span>Message</span>
                        </span>
                        <span className="text-[#F0444B] text-[10px]">*</span>
                      </label>
                      <div className="relative group/input">
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Hi Mohamed, I'd like to discuss an opportunity regarding..."
                          className="w-full bg-[#020205] border border-[#2A2A38] focus:border-[#27D6D9] p-4 rounded-2xl text-xs text-white placeholder-[#666666] shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:border-[#27D6D9]/50 hover:shadow-[0_0_20px_rgba(39,214,217,0.25)] focus:outline-none focus:ring-2 focus:ring-[#27D6D9]/40 focus:shadow-[0_0_30px_rgba(39,214,217,0.55),inset_0_0_12px_rgba(39,214,217,0.15)] focus:bg-[#070710] transition-all duration-300 resize-none font-medium"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Submit Action Buttons with Dynamic Shimmer Streaks & Glowing Shadows */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    
                    {/* Email Dispatch Button */}
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="relative overflow-hidden w-full py-4 px-6 bg-gradient-to-r from-[#F0444B] via-[#FF6B6B] to-[#F0444B] bg-[length:200%_100%] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-[0_0_30px_rgba(240,68,75,0.55)] hover:shadow-[0_0_50px_rgba(240,68,75,0.85)] transition-all duration-300 flex items-center justify-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <Send className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span>Send via Email</span>
                    </button>
                    
                    {/* WhatsApp Dispatch Button */}
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="relative overflow-hidden w-full sm:w-auto py-4 px-7 bg-gradient-to-r from-[#25D366] via-[#2CEE74] to-[#25D366] text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-[0_0_30px_rgba(37,211,102,0.55)] hover:shadow-[0_0_50px_rgba(37,211,102,0.85)] transition-all duration-300 flex items-center justify-center gap-2.5 shrink-0 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <MessageSquare className="w-4 h-4 text-slate-950 fill-current group-hover:rotate-12 transition-transform duration-300" />
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


