import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react';

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

  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');

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
    <section id="contact" className="py-[60px] md:py-[80px] bg-[#0b0d17] border-b border-[#38bdf8]/20 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#ef4444]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header matching Sajid Yaqub Screenshot */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#161a2e] border border-[#38bdf8]/40 shadow-xl group-hover:border-[#ef4444] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                Contact <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#ef4444] bg-clip-text text-transparent">Us</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#cbd5e1]">
            Have a project in mind? Let's connect and discuss how I can help bring your ideas to life.
          </p>
        </div>

        {/* 2-Column Side-by-Side Layout matching Sajid Yaqub Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column (5 Cols): Get in touch today */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                Get in touch today
              </h3>
              <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Details Box */}
            <div className="bg-[#161a2e] glow-card-running rounded-3xl p-6 space-y-4 border border-[#38bdf8]/30 shadow-xl backdrop-blur-sm">
              
              {/* Email Card */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0b0d17] hover:bg-[#38bdf8] text-[#cbd5e1] hover:text-[#0b0d17] border border-[#38bdf8]/30 transition-all duration-300 group shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-[#161a2e] text-[#38bdf8] group-hover:bg-[#0b0d17] group-hover:text-[#38bdf8] transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase text-[#38bdf8] group-hover:text-[#0b0d17] font-bold">Email Address</div>
                  <div className="text-xs font-semibold truncate">{profile.email}</div>
                </div>
              </a>

              {/* Phone & WhatsApp Card */}
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0b0d17] hover:bg-[#38bdf8] text-[#cbd5e1] hover:text-[#0b0d17] border border-[#38bdf8]/30 transition-all duration-300 group shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-[#161a2e] text-[#25D366] group-hover:bg-[#0b0d17] transition-colors shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase text-[#38bdf8] group-hover:text-[#0b0d17] font-bold">Phone & WhatsApp</div>
                  <div className="text-xs font-semibold truncate">{profile.phone}</div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0b0d17] text-[#cbd5e1] border border-[#38bdf8]/30 shadow-sm">
                <div className="p-2.5 rounded-xl bg-[#161a2e] text-[#38bdf8] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase text-[#38bdf8] font-bold">Location</div>
                  <div className="text-xs font-semibold truncate">{profile.location}</div>
                </div>
              </div>

              {/* Social Links Icons */}
              <div className="pt-2 border-t border-[#1e2238] flex items-center justify-around">
                <a
                  href={profile.github || 'https://github.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0b0d17] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0b0d17] transition-all shadow-sm hover:scale-110"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0b0d17] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0b0d17] transition-all shadow-sm hover:scale-110"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0b0d17] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm hover:scale-110"
                  title="WhatsApp Direct Chat"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-[#0b0d17] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0b0d17] transition-all shadow-sm hover:scale-110"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Modern Dark Form Container matching Sajid Yaqub Screenshot */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-3xl bg-[#161a2e] border border-[#38bdf8] text-center space-y-3 shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-sm">
                <CheckCircle2 className="w-10 h-10 text-[#38bdf8] mx-auto" />
                <h3 className="text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  Message Dispatched!
                </h3>
                <p className="text-sm font-medium text-[#cbd5e1]">
                  Your message has been sent successfully. Mohamed will review and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-[#38bdf8] to-[#ef4444] text-white rounded-xl text-xs font-bold hover:scale-105 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-[#161a2e] glow-card-running p-6 sm:p-7 rounded-3xl space-y-5 border border-[#38bdf8]/30 shadow-xl backdrop-blur-sm">
                
                <form className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#cbd5e1]">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Carter"
                        className="w-full bg-[#0b0d17] border border-[#38bdf8]/30 focus:border-[#38bdf8] p-3 rounded-xl text-xs text-[#ffffff] placeholder-[#94a3b8]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#cbd5e1]">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                        className="w-full bg-[#0b0d17] border border-[#38bdf8]/30 focus:border-[#38bdf8] p-3 rounded-xl text-xs text-[#ffffff] placeholder-[#94a3b8]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#cbd5e1]">Phone</label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 91509 00577"
                        className="w-full bg-[#0b0d17] border border-[#38bdf8]/30 focus:border-[#38bdf8] p-3 rounded-xl text-xs text-[#ffffff] placeholder-[#94a3b8]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#cbd5e1]">Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Project Inquiry"
                        className="w-full bg-[#0b0d17] border border-[#38bdf8]/30 focus:border-[#38bdf8] p-3 rounded-xl text-xs text-[#ffffff] placeholder-[#94a3b8]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#cbd5e1]">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please type your message here..."
                      className="w-full bg-[#0b0d17] border border-[#38bdf8]/30 focus:border-[#38bdf8] p-3 rounded-xl text-xs text-[#ffffff] placeholder-[#94a3b8]/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Vibrant Sajid Yaqub Style Gradient Send Message Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#ef4444] hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send message</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full sm:w-auto py-3.5 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-105"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Chat</span>
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

