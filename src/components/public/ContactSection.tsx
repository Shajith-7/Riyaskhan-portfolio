import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';

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
  const [submitChannel, setSubmitChannel] = useState<'whatsapp' | 'email'>('whatsapp');

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <h2 className="text-3xl sm:text-[36px] font-bold text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
            Get in <span className="text-[#e1b382]">Touch</span>
          </h2>
          <p className="text-base font-regular text-[#f3e8d6]">
            Send a direct message via WhatsApp, Email, or standard inquiry
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1 — Email */}
          <div className="bg-[#2d545e] glow-card-running rounded-[20px] p-[28px] text-center hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group">
            <div className="text-[#12343b] p-3 rounded-full bg-[#e1b382] group-hover:bg-[#ffffff] transition-colors duration-300 shadow-sand-glow">
              <Mail className="w-[28px] h-[28px]" />
            </div>
            <h3 className="text-base font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
              Email Address
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-semibold text-[#e1b382] hover:text-[#ffffff] hover:underline"
            >
              {profile.email}
            </a>
          </div>

          {/* Card 2 — Phone & WhatsApp */}
          <div className="bg-[#2d545e] glow-card-running rounded-[20px] p-[28px] text-center hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group">
            <div className="text-[#12343b] p-3 rounded-full bg-[#e1b382] group-hover:bg-[#ffffff] transition-colors duration-300 shadow-sand-glow">
              <Phone className="w-[28px] h-[28px]" />
            </div>
            <h3 className="text-base font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
              Phone & WhatsApp
            </h3>
            <div className="flex flex-col items-center gap-1">
              <a
                href={`tel:${profile.phone}`}
                className="text-sm font-semibold text-[#e1b382] hover:text-[#ffffff] hover:underline"
              >
                {profile.phone}
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3 — Location */}
          <div className="bg-[#2d545e] glow-card-running rounded-[20px] p-[28px] text-center hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group">
            <div className="text-[#12343b] p-3 rounded-full bg-[#e1b382] group-hover:bg-[#ffffff] transition-colors duration-300 shadow-sand-glow">
              <MapPin className="w-[28px] h-[28px]" />
            </div>
            <h3 className="text-base font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
              Location
            </h3>
            <div className="text-sm font-semibold text-[#e1b382]">
              {profile.location}
            </div>
          </div>

        </div>

        {/* Contact Form Container */}
        <div className="max-w-[600px] mx-auto mt-[40px]">
          {submitted ? (
            <div className="p-8 rounded-[20px] bg-[#2d545e] border-2 border-[#e1b382] text-center space-y-3 shadow-sand-glow">
              <CheckCircle2 className="w-10 h-10 text-[#e1b382] mx-auto" />
              <h3 className="text-lg font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                Message Received!
              </h3>
              <p className="text-sm font-medium text-[#f3e8d6]">
                Your message has been dispatched and logged to Mohamed's inbox. He will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-[#e1b382] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-[#2d545e] glow-card-running p-6 sm:p-8 rounded-[24px] space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#c89666]/60 pb-3">
                <span className="text-sm font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">
                  Send Direct Message
                </span>
                <span className="text-xs font-mono text-[#e1b382]">
                  Instant Dispatch
                </span>
              </div>

              <form className="space-y-4">
                {/* Field 1 — Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#e1b382]">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#12343b] border-2 border-[#c89666] focus:border-[#e1b382] p-[12px_16px] rounded-[12px] text-sm text-[#ffffff] placeholder-[#cbd5e1]/60 focus:outline-none transition-all"
                  />
                </div>

                {/* Field 2 — Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#e1b382]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#12343b] border-2 border-[#c89666] focus:border-[#e1b382] p-[12px_16px] rounded-[12px] text-sm text-[#ffffff] placeholder-[#cbd5e1]/60 focus:outline-none transition-all"
                  />
                </div>

                {/* Field 3 — Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#e1b382]">Subject / Topic</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Internship Opportunity / Web Project"
                    className="w-full bg-[#12343b] border-2 border-[#c89666] focus:border-[#e1b382] p-[12px_16px] rounded-[12px] text-sm text-[#ffffff] placeholder-[#cbd5e1]/60 focus:outline-none transition-all"
                  />
                </div>

                {/* Field 4 — Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#e1b382]">Message Body</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your detailed message here..."
                    className="w-full bg-[#12343b] border-2 border-[#c89666] focus:border-[#e1b382] p-[12px_16px] rounded-[12px] text-sm text-[#ffffff] placeholder-[#cbd5e1]/60 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Action Buttons for WhatsApp vs Email */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-1/2 py-[13px] px-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#ffffff] font-extrabold text-sm rounded-[12px] shadow-sand-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp 💬</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="w-full sm:w-1/2 py-[13px] px-4 bg-[#e1b382] hover:bg-[#ffffff] text-[#12343b] font-extrabold text-sm rounded-[12px] border-2 border-[#c89666] shadow-sand-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email ✉️</span>
                  </button>
                </div>

                <div className="text-[11px] text-[#f3e8d6]/80 text-center pt-1 font-mono">
                  *All messages are also logged to the Admin CMS Inbox.
                </div>
              </form>

            </div>
          )}

          {/* Social Links */}
          <div className="mt-[36px] pt-6 border-t border-[#c89666]/60 flex items-center justify-center gap-[20px]">
            <a
              href={profile.github || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              className="text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] hover:scale-125 transition-transform duration-300 p-2.5 rounded-full border border-[#c89666] shadow-sand-glow"
              title="GitHub"
            >
              <Github className="w-[26px] h-[26px]" />
            </a>
            <a
              href={profile.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noreferrer"
              className="text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] hover:scale-125 transition-transform duration-300 p-2.5 rounded-full border border-[#c89666] shadow-sand-glow"
              title="LinkedIn"
            >
              <Linkedin className="w-[26px] h-[26px]" />
            </a>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] hover:scale-125 transition-transform duration-300 p-2.5 rounded-full border border-[#c89666] shadow-sand-glow"
              title="WhatsApp Chat"
            >
              <MessageSquare className="w-[26px] h-[26px]" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-[#12343b] bg-[#e1b382] hover:bg-[#ffffff] hover:scale-125 transition-transform duration-300 p-2.5 rounded-full border border-[#c89666] shadow-sand-glow"
              title="Email"
            >
              <Mail className="w-[26px] h-[26px]" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

