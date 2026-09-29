import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, submitInquiry } = usePortfolio();
  const { profile } = data;

  const [form, setForm] = useState({
    name: '',
    email: '',
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
    setForm({ name: '', email: '', subject: '', message: '' });
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
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');

    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-[60px] md:py-[80px] bg-[#12343b] border-b-2 border-[#e1b382]/40 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#e1b382]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2d545e]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block animate-float-subtle group cursor-default transition-all duration-300">
            <div className="px-6 py-2.5 rounded-2xl bg-[#2d545e]/50 border border-[#c89666]/40 shadow-xl group-hover:border-[#e1b382] group-hover:shadow-sand-glow group-hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
                Get in <span className="text-[#e1b382] group-hover:drop-shadow-[0_0_12px_rgba(225,179,130,0.8)] transition-all">Touch</span>
              </h2>
            </div>
          </div>
          <p className="text-base font-regular text-[#f3e8d6]">
            Send a direct message via WhatsApp, Email, or standard inquiry
          </p>
        </div>

        {/* Professional 2-Column Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column (5 Cols): Compact Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Contact Details Box */}
            <div className="bg-[#2d545e]/90 glow-card-running rounded-3xl p-6 space-y-5 border border-[#c89666]/40 shadow-xl backdrop-blur-sm">
              
              <div className="border-b border-[#c89666]/30 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                    Direct Reach Out
                  </h3>
                  <p className="text-xs text-[#e1b382] font-mono">
                    Fast response channels
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#12343b] text-[#e1b382] border border-[#c89666]/30">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Email Card */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#12343b] hover:bg-[#e1b382] text-[#f3e8d6] hover:text-[#12343b] border border-[#c89666]/30 transition-all duration-300 group shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-[#2d545e] text-[#e1b382] group-hover:bg-[#12343b] group-hover:text-[#e1b382] transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase text-[#e1b382] group-hover:text-[#12343b] font-bold">Email Address</div>
                  <div className="text-xs font-semibold truncate">{profile.email}</div>
                </div>
              </a>

              {/* Phone & WhatsApp Card */}
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#12343b] hover:bg-[#e1b382] text-[#f3e8d6] hover:text-[#12343b] border border-[#c89666]/30 transition-all duration-300 group shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-[#2d545e] text-[#25D366] group-hover:bg-[#12343b] transition-colors shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase text-[#e1b382] group-hover:text-[#12343b] font-bold">Phone & WhatsApp</div>
                  <div className="text-xs font-semibold truncate">{profile.phone}</div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#12343b] text-[#f3e8d6] border border-[#c89666]/30 shadow-sm">
                <div className="p-2.5 rounded-xl bg-[#2d545e] text-[#e1b382] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono uppercase text-[#e1b382] font-bold">Location</div>
                  <div className="text-xs font-semibold truncate">{profile.location}</div>
                </div>
              </div>

              {/* Social Links Icons */}
              <div className="pt-2 border-t border-[#c89666]/30 flex items-center justify-around">
                <a
                  href={profile.github || 'https://github.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#12343b] text-[#e1b382] hover:bg-[#e1b382] hover:text-[#12343b] transition-all shadow-sm hover:scale-110"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#12343b] text-[#e1b382] hover:bg-[#e1b382] hover:text-[#12343b] transition-all shadow-sm hover:scale-110"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#12343b] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm hover:scale-110"
                  title="WhatsApp Direct Chat"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-[#12343b] text-[#e1b382] hover:bg-[#e1b382] hover:text-[#12343b] transition-all shadow-sm hover:scale-110"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Modern Glass Message Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-3xl bg-[#2d545e]/90 border-2 border-[#e1b382] text-center space-y-3 shadow-sand-glow backdrop-blur-sm">
                <CheckCircle2 className="w-10 h-10 text-[#e1b382] mx-auto" />
                <h3 className="text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  Message Dispatched!
                </h3>
                <p className="text-sm font-medium text-[#f3e8d6]">
                  Your message has been sent successfully. Mohamed will review and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-[#e1b382] text-[#12343b] rounded-xl text-xs font-bold hover:bg-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-[#2d545e]/90 glow-card-running p-6 sm:p-7 rounded-3xl space-y-5 border border-[#c89666]/40 shadow-xl backdrop-blur-sm">
                
                <div className="flex items-center justify-between border-b border-[#c89666]/30 pb-3">
                  <span className="text-base font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                    Send Direct Message
                  </span>
                  <span className="text-xs font-mono text-[#e1b382] bg-[#12343b] px-3 py-1 rounded-full border border-[#c89666]/30">
                    Instant Dispatch
                  </span>
                </div>

                <form className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#e1b382]">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-[#12343b] border border-[#c89666]/60 focus:border-[#e1b382] p-2.5 rounded-xl text-xs text-[#ffffff] placeholder-[#cbd5e1]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#e1b382]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-[#12343b] border border-[#c89666]/60 focus:border-[#e1b382] p-2.5 rounded-xl text-xs text-[#ffffff] placeholder-[#cbd5e1]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#e1b382]">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity / Technical Project"
                      className="w-full bg-[#12343b] border border-[#c89666]/60 focus:border-[#e1b382] p-2.5 rounded-xl text-xs text-[#ffffff] placeholder-[#cbd5e1]/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#e1b382]">Message Body</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your detailed message here..."
                      className="w-full bg-[#12343b] border border-[#c89666]/60 focus:border-[#e1b382] p-2.5 rounded-xl text-xs text-[#ffffff] placeholder-[#cbd5e1]/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Dispatch Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full sm:w-1/2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#ffffff] font-extrabold text-xs rounded-xl shadow-sand-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp 💬</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="w-full sm:w-1/2 py-3 px-4 bg-[#e1b382] hover:bg-[#ffffff] text-[#12343b] font-extrabold text-xs rounded-xl border-2 border-[#c89666] shadow-sand-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email ✉️</span>
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

