import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settings() {
  const [showToken, setShowToken] = useState(false);
  const [testStatus, setTestStatus] = useState('idle'); // idle, loading, success
  const [templateText, setTemplateText] = useState(`Hi {client_name}! ✨ Your booking for {service_name} at Aura Wellness Studio is confirmed for {date} at {time}.\n\nNeed to reschedule or cancel? Tap the link below anytime or reply to this chat.`);
  const [toast, setToast] = useState({ show: false, message: '', icon: '' });
  
  const textareaRef = useRef(null);

  const showToast = (message, icon = 'info') => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast({ show: false, message: '', icon: '' }), 3500);
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText("https://api.rebook.app/v1/webhooks/whatsapp/aura-wellness");
    showToast("Webhook URL copied to clipboard", "content_copy");
  };

  const handleTestConnection = () => {
    setTestStatus('loading');
    setTimeout(() => {
      setTestStatus('success');
      showToast("Connection test successful", "check_circle");
    }, 800);
  };

  const handleSave = () => {
    showToast("Settings Saved Successfully! All parameters synchronized.", "check_circle");
  };

  const insertTag = (tag) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newText = templateText.substring(0, start) + tag + templateText.substring(end);
      setTemplateText(newText);
      
      setTimeout(() => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + tag.length, start + tag.length);
      }, 0);
    } else {
      setTemplateText(prev => prev + tag);
    }
  };

  const renderLivePreview = () => {
    return templateText
      .replace(/{client_name}/g, 'Priya Sharma')
      .replace(/{service_name}/g, 'HydraFacial Glow')
      .replace(/{date}/g, 'Thu, 24 Oct')
      .replace(/{time}/g, '10:00 AM')
      .replace(/{price}/g, '₹2,000');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full pb-space-xl"
    >
      {/* Top Header Area */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between pb-5 border-b border-outline-variant/30 pt-space-md mb-8"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-on-surface tracking-tight">Settings & Configurations</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-on-primary shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">tune</span> Config Hub
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-1">Manage your business profile, WhatsApp API connection, and automated booking rules.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button type="button" className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-all duration-150 active:scale-95">
            Discard
          </button>
          <button onClick={handleSave} type="button" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-xl shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-150 active:scale-95 group">
            <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">check_circle</span>
            <span>Save Changes</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Sticky Sub-navigation */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="col-span-12 md:col-span-4 lg:col-span-3 sticky top-28 space-y-3"
        >
          <div className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/50 shadow-sm">
            <div className="px-3 py-2 text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Configuration Sections</div>
            <nav className="space-y-1">
              <a href="#business-profile" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-primary bg-primary-fixed border border-primary/20 transition-all">
                <span className="material-symbols-outlined text-xl fill-1">store</span>
                <span>Business Profile</span>
              </a>
              <a href="#whatsapp-integration" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl text-secondary">chat</span>
                <span>WhatsApp Integration</span>
              </a>
              <a href="#booking-rules" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl">rule</span>
                <span>Booking & Automation</span>
              </a>
              <a href="#notification-templates" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl">quickreply</span>
                <span>Notification Templates</span>
              </a>
            </nav>
          </div>

          <div className="bg-secondary-container/30 rounded-2xl p-4 border border-secondary/20 text-xs text-on-surface-variant space-y-2.5">
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <span className="material-symbols-outlined text-base">help</span>
              <span>WhatsApp Meta Compliance</span>
            </div>
            <p className="leading-relaxed text-[12px] text-on-surface-variant/80">
              Messages are delivered through the official WhatsApp Business Cloud API with end-to-end verified encryption.
            </p>
            <a href="#" className="inline-flex items-center gap-1 font-semibold text-secondary hover:underline text-[12px]">
              API Documentation <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Settings Forms Cards (Wrapped in Stagger Animation) */}
        <motion.div 
          className="col-span-12 md:col-span-8 lg:col-span-9 space-y-8"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
        >

          {/* CARD A: Business Profile */}
          <motion.section variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} id="business-profile" className="bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm p-7 transition-all scroll-mt-28">
            <div className="flex items-start justify-between pb-5 border-b border-outline-variant/30 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">storefront</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface tracking-tight">Business Profile</h2>
                  <p className="text-xs text-on-surface-variant/80 mt-0.5">Shown to clients on their booking page and WhatsApp greeting dispatches.</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-tertiary-fixed text-tertiary rounded-full border border-tertiary/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Publicly Visible
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Business Name</label>
                <div className="relative">
                  <input type="text" defaultValue="Aura Wellness Studio & Salon" className="w-full bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium" />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant/50 text-lg">verified</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Contact Email</label>
                <div className="relative">
                  <input type="email" defaultValue="contact@aurawellness.in" className="w-full bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant/50 text-lg">mail</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Studio / Business Physical Address</label>
                <div className="relative">
                  <input type="text" defaultValue="100ft Road, 4th Block, Indiranagar, Bengaluru, Karnataka 560038" className="w-full bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant/50 text-lg">location_on</span>
                </div>
                <p className="text-[11px] text-on-surface-variant/70">This address is automatically embedded into Google Maps links sent via WhatsApp.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Operating Currency</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium pr-10">
                    <option value="INR">₹ INR - Indian Rupee</option>
                    <option value="USD">$ USD - US Dollar</option>
                    <option value="AED">د.إ AED - UAE Dirham</option>
                    <option value="GBP">£ GBP - British Pound</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant/50 pointer-events-none text-xl">expand_more</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Industry Category</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium pr-10">
                    <option>Salon & Aesthetic Wellness Clinic</option>
                    <option>Fitness Center / Gym / Yoga Studio</option>
                    <option>Dental & Healthcare Clinic</option>
                    <option>Pet Care & Grooming</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant/50 pointer-events-none text-xl">expand_more</span>
                </div>
              </div>
            </div>
          </motion.section>


          {/* CARD B: WhatsApp API Integration */}
          <motion.section variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} id="whatsapp-integration" className="bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm p-7 transition-all scroll-mt-28">
            <div className="flex items-start justify-between pb-5 border-b border-outline-variant/30 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">chat</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface tracking-tight">WhatsApp API Integration</h2>
                  <p className="text-xs text-on-surface-variant/80 mt-0.5">Direct connection to Meta Business Cloud for sending instant appointment alerts.</p>
                </div>
              </div>
              <button onClick={() => showToast("Meta API Sync initiated", "sync")} type="button" className="px-3.5 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/50 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-95">
                <span className="material-symbols-outlined text-base">sync</span> Re-sync Meta
              </button>
            </div>

            <div className="mb-6 rounded-xl bg-gradient-to-r from-secondary-container/30 to-tertiary-container/30 border border-secondary/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-xl">check</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-secondary">API Connected: +91 98765 43210</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-fixed text-secondary border border-secondary/40">Active</span>
                  </div>
                  <p className="text-xs text-secondary/80 mt-0.5">Meta Business WABA Account ID: <code className="bg-white/60 px-1.5 py-0.5 rounded font-mono text-[11px] text-on-surface">waba_994208472910</code></p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs text-secondary font-semibold block">Quality Rating: High 🟢</span>
                <span className="text-[11px] text-secondary/80">Tier: 10,000 msgs/day</span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">WhatsApp Cloud API Permanent Token</label>
                  <span className="text-[11px] text-on-surface-variant/60">Never share your secret token</span>
                </div>
                <div className="relative flex items-center">
                  <input type={showToken ? "text" : "password"} defaultValue="EAAGm0PX4ZB9wBAOpq7K983hdjf92348hsdff9348hf938hfd98h238fh" readOnly className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-3.5 pr-28 py-2.5 text-sm text-on-surface font-mono tracking-wider focus:outline-none transition-all" />
                  <button onClick={() => setShowToken(!showToken)} type="button" className="absolute right-2 px-3 py-1 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant border border-outline-variant/50 rounded-lg text-xs font-medium flex items-center gap-1 transition-all active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined text-sm">{showToken ? 'visibility_off' : 'visibility'}</span>
                    <span>{showToken ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Webhook Callback URL</label>
                <div className="relative flex items-center">
                  <input type="text" defaultValue="https://api.rebook.app/v1/webhooks/whatsapp/aura-wellness" readOnly className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-3.5 pr-24 py-2.5 text-sm text-on-surface font-mono focus:outline-none transition-all" />
                  <button onClick={handleCopyWebhook} type="button" className="absolute right-2 px-3 py-1 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant border border-outline-variant/50 rounded-lg text-xs font-medium flex items-center gap-1 transition-all active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-[11px] text-on-surface-variant/70">Configure this URL in your Meta App Dashboard under WhatsApp &gt; Configuration &gt; Webhooks.</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button onClick={handleTestConnection} type="button" className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/90 text-on-secondary text-xs font-semibold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
                  <span className={`material-symbols-outlined text-base ${testStatus === 'loading' ? 'animate-spin' : ''}`}>
                    {testStatus === 'loading' ? 'refresh' : 'cell_tower'}
                  </span>
                  <span>{testStatus === 'loading' ? 'Pinging...' : 'Test Connection'}</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-on-surface-variant/80 font-medium">
                  <span className={`w-2 h-2 rounded-full ${testStatus === 'success' ? 'bg-tertiary' : 'bg-outline-variant'}`}></span>
                  {testStatus === 'success' ? (
                    <span className="text-tertiary font-semibold">Success (200 OK): Latency 38ms</span>
                  ) : (
                    <span>Last heartbeat verified: <strong className="text-on-surface">2 minutes ago</strong> (RTT: 42ms)</span>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* CARD C: Booking Rules & Automation */}
          <motion.section variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} id="booking-rules" className="bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm p-7 transition-all scroll-mt-28">
            <div className="flex items-start justify-between pb-5 border-b border-outline-variant/30 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">rule_settings</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface tracking-tight">Booking Rules & Automation</h2>
                  <p className="text-xs text-on-surface-variant/80 mt-0.5">Control operational slot timings, limits, and automated client interactions.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/30">Auto-Sync Enabled</span>
            </div>

            <div className="space-y-4 mb-7">
              <div className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/50 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-semibold text-on-surface block">Auto-confirm new bookings</span>
                  <span className="text-xs text-on-surface-variant">When enabled, appointment slots are instantly blocked and confirmed without manual owner review.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-12 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                </label>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/50 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-semibold text-on-surface block">Allow cancellations via WhatsApp</span>
                  <span className="text-xs text-on-surface-variant">Clients can reply 'CANCEL' or click the quick-action button in WhatsApp to release their slot.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-12 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                </label>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/50 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="pr-4">
                  <span className="text-sm font-semibold text-on-surface block">Send 2-Hour WhatsApp Reminder Dispatch</span>
                  <span className="text-xs text-on-surface-variant">Dispatches an automated ping 120 minutes prior to treatment with venue GPS directions.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-12 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary shadow-inner"></div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-outline-variant/30">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Minimum Notice for Booking (Hours)</label>
                <div className="relative">
                  <input type="number" min="0" max="72" defaultValue="2" className="w-full bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
                  <span className="absolute right-3.5 top-2.5 text-xs text-on-surface-variant/60 font-medium">hrs before slot</span>
                </div>
                <p className="text-[11px] text-on-surface-variant/70">Prevents last-minute walk-in collisions or unprepared staff.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Maximum Advance Booking (Days)</label>
                <div className="relative">
                  <input type="number" min="1" max="180" defaultValue="30" className="w-full bg-surface border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
                  <span className="absolute right-3.5 top-2.5 text-xs text-on-surface-variant/60 font-medium">days in future</span>
                </div>
                <p className="text-[11px] text-on-surface-variant/70">How far ahead clients are permitted to schedule treatments.</p>
              </div>
            </div>
          </motion.section>

          {/* CARD D: Notification Templates */}
          <motion.section variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} id="notification-templates" className="bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm p-7 transition-all scroll-mt-28">
            <div className="flex items-start justify-between pb-5 border-b border-outline-variant/30 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">mark_chat_read</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface tracking-tight">Notification Templates</h2>
                  <p className="text-xs text-on-surface-variant/80 mt-0.5">Customize real-time WhatsApp copy with smart dynamic variables.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="text-xs font-semibold text-primary hover:underline px-2 py-1">Reset Default</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-on-surface-variant tracking-wide uppercase">Booking Confirmation Message</label>
                    <span className="text-[11px] text-on-surface-variant/60"><span>{templateText.length}</span> / 1024 chars</span>
                  </div>
                  <div className="relative">
                    <textarea 
                      ref={textareaRef}
                      value={templateText}
                      onChange={e => setTemplateText(e.target.value)}
                      rows="7" 
                      className="w-full bg-surface border border-outline-variant/50 rounded-xl p-3.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-sans leading-relaxed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Clickable Dynamic Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {['{client_name}', '{service_name}', '{date}', '{time}', '{price}'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => insertTag(tag)}
                        type="button" 
                        className="var-tag px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-primary-fixed text-primary border border-primary/20 hover:bg-primary hover:text-on-primary transition-all active:scale-95 flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-xs">add</span> {tag}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-on-surface-variant/60 mt-1">Tags are automatically substituted when Rebook delivers the automated WhatsApp push.</p>
                </div>
              </div>

              {/* Right: Real-time WhatsApp Message Mockup Preview */}
              <div className="lg:col-span-5 bg-[#EFEAE2] rounded-2xl p-4 border border-[#E0D8CE] flex flex-col justify-between relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold">
                      AW
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-tight">Aura Wellness</span>
                      <span className="text-[10px] text-gray-500">Official Business Account</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-500 text-sm">more_vert</span>
                </div>

                <div className="my-4 space-y-2">
                  <div className="bg-white rounded-xl rounded-tl-none p-3.5 shadow-sm max-w-[95%] border border-gray-100 text-xs text-gray-900 relative">
                    <p className="whitespace-pre-wrap leading-relaxed font-sans">{renderLivePreview()}</p>
                    
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="text-[#006A60] font-medium">Quick Reschedule Link Included</span>
                      <span className="flex items-center gap-1 text-[10px]">
                        10:42 AM <span className="material-symbols-outlined text-[#34B7F1] text-xs">done_all</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-xl px-4 py-1.5 text-center text-xs font-semibold text-[#006A60] shadow-sm hover:bg-gray-50 cursor-pointer flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">calendar_month</span> View Booking & Directions
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-xs text-emerald-600">lock</span>
                  <span>Customer End-to-End Encrypted Preview</span>
                </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>

      <AnimatePresence>
      {toast.show && (
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-on-surface text-surface px-4 py-3 rounded-xl shadow-xl font-label-md text-label-md"
        >
          <span className="material-symbols-outlined text-secondary text-lg">{toast.icon}</span>
          <span>{toast.message}</span>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}
