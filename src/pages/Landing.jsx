import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <>
      {/* Custom styles from the original HTML head */}
      <style>{`
        .whatsapp-chat-bg {
          background-color: #fbf9f6;
          background-image: radial-gradient(#e4ded5 0.75px, transparent 0.75px);
          background-size: 12px 12px;
        }
      `}</style>
      {/* Render the converted HTML */}
      <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased overflow-x-hidden text-slate-900">
{/* HEADER / NAVIGATION: Pristine, refined, minimal */}
<header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/70 transition-all">
<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
{/* Brand Mark */}
<a className="flex items-center gap-2.5 group" href="#">
<div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white shadow-xs">
<svg className="w-3.5 h-3.5 text-indigo-200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
<path d="m9 10 2 2 4-4"></path>
</svg>
</div>
<div className="flex items-center gap-2">
<span className="text-sm font-semibold tracking-tight text-slate-900">Rebook</span>
<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-tight bg-slate-100 text-slate-500">v2.4</span>
</div>
</a>
{/* Precision Links */}
<nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-600">
<a className="hover:text-slate-900 transition-colors" href="#product">Product</a>
<a className="hover:text-slate-900 transition-colors" href="#how-it-works">How It Works</a>
<a className="hover:text-slate-900 transition-colors" href="#economics">Clinic Economics</a>
<a className="hover:text-slate-900 transition-colors" href="#integrations">Integrations</a>
</nav>
{/* Right Action Cluster */}
<div className="flex items-center gap-3">
<Link className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors" to="/login">
        Sign in
      </Link>
<a className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 shadow-subtle transition-all duration-150 active:scale-[0.99]" href="#trial">
<span>Start Free Trial</span>
</a>
</div>
</div>
</header>
{/* HERO SECTION: Serene, Apple/Stripe-caliber luxury typography & calm confidence */}
<main className="relative pt-16 sm:pt-24 pb-20 overflow-hidden"><div className="absolute inset-0 pointer-events-none overflow-hidden -z-10"><img alt="Fluid ambient silk background" className="w-full h-[850px] object-cover object-top opacity-35 mix-blend-multiply filter blur-[0.5px]" src="https://lh3.googleusercontent.com/aida/AEtjO1XP2iiugfuOHhw9iuthBtXOEcSGHjxPB66G5aVQ5IWQR43yGuU3seSDgzK8sL4GQ0cMmv7k7f9M5k3X75yqRu9JulttmnaBDpCvHy7g0LPD8997tqi12nIM_paPCRJfSWAWUGu6kMxyHIw0MEnDyy_dHVTxKsPOb-GWG239A79TsexitSb8oPp6Ba9iD2GcecfP94D4KUbRz0q4tTExxU-zAeuq8bb1A4PLOlcoowzuLazssZBLZrlZSBJ1"/><div className="absolute inset-0 bg-gradient-to-b from-white/60 via-[#FAFAFA]/40 to-[#FAFAFA]"></div><div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent"></div></div>
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="max-w-5xl mx-auto px-6 text-center"
>
{/* Meta Partner Category Pill */}
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-subtle text-[11px] font-medium text-slate-600 mb-8">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span className="font-medium text-slate-900">Official Meta WhatsApp Cloud API</span>
<span className="text-slate-300">/</span>
<span>Zero Engineering Required</span>
</div>
{/* Hero Headlines */}
<h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-slate-900 leading-[1.1] text-balance mb-6 font-display">
      Predictable clinic schedules.<br/>
<span className="text-slate-500 font-normal">Zero no-shows.</span>
</h1>
<p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto text-balance mb-9 font-sans">
      The automated WhatsApp attendance engine for premier aesthetic clinics and luxury wellness spas. Eliminate ghosted chairs with 2-hour verified reminders, frictionless client self-rescheduling, and instant waitlist backfilling.
    </p>
{/* Action Cluster */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
<motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-subtle transition-all flex items-center justify-center gap-1.5" href="#trial">
<span>Start 14-Day Free Trial</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</motion.a>
<motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm text-slate-700 hover:text-slate-900 bg-white border border-slate-200/90 shadow-subtle hover:bg-slate-50 transition-all flex items-center justify-center gap-2" href="#walkthrough">
<span className="material-symbols-outlined text-sm text-slate-500">play_circle</span>
<span>Book Studio Walkthrough</span>
</motion.a>
</div>
{/* Clinic Trust Strip */}
<div className="mt-10 flex items-center justify-center gap-2.5 text-xs text-slate-500">
<div className="flex text-amber-500 text-xs tracking-tight">★★★★★</div>
<span><strong className="font-semibold text-slate-800">4.9/5 rated</strong> across 2,400+ aesthetic clinics &amp; wellness studios</span>
</div>
{/* BESPOKE PRODUCT SHOWCASE: Pure white, clean studio canvas, zero dark tech console styling */}
<div className="relative max-w-5xl mx-auto mt-14" id="product">
<div className="rounded-xl bg-white border border-slate-200/90 shadow-elevated overflow-hidden text-left">
{/* Window Titlebar */}
<div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs">
<div className="flex items-center gap-2">
<div className="flex gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
<span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
<span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
</div>
<span className="ml-2 font-mono text-[11px] text-slate-400">rebook.app/aura-wellness/schedule</span>
</div>
<div className="flex items-center gap-3">
<span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium px-2 py-0.5 rounded-full bg-emerald-50/80 border border-emerald-100">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Live Sync
            </span>
<span className="text-slate-600 text-xs font-medium">Aura Wellness Flagship</span>
</div>
</div>
{/* Split Clinic Software Layout */}
<div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
{/* LEFT PANE: Clean Daily Schedule Feed */}
<div className="lg:col-span-7 p-6 bg-white space-y-4">
<div className="flex items-center justify-between pb-1">
<div>
<h3 className="text-sm font-semibold text-slate-900">Today's Treatment Dispatch</h3>
<p className="text-xs text-slate-400 mt-0.5">Thursday, Oct 24 • 18 of 20 Slots Filled</p>
</div>
<span className="text-xs font-medium text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded border border-emerald-100">
                0% No-Shows Today
              </span>
</div>
{/* Schedule Items */}
<div className="space-y-2.5">
{/* Item 1 */}
<div className="p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-white transition-all flex items-center justify-between">
<div className="flex items-center gap-3.5">
<div className="w-14">
<div className="text-xs font-semibold text-slate-900">10:00 AM</div>
<div className="text-[11px] text-slate-400">45 mins</div>
</div>
<div className="w-px h-8 bg-slate-100"></div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-semibold text-slate-900">Priya Sharma</span>
<span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">Auto-Confirmed</span>
</div>
<div className="text-[11px] text-slate-500 mt-0.5">HydraFacial Deluxe • Dr. Priya (Suite 02)</div>
</div>
</div>
<div className="text-right">
<span className="text-[11px] font-medium text-emerald-700 flex items-center justify-end gap-1">
<span className="material-symbols-outlined text-[13px]">done_all</span> 08:04 AM
                  </span>
<span className="text-[10px] text-slate-400">Arriving on time</span>
</div>
</div>
{/* Item 2 */}
<div className="p-3.5 rounded-lg border border-indigo-100/80 bg-indigo-50/20 hover:border-indigo-200 transition-all flex items-center justify-between">
<div className="flex items-center gap-3.5">
<div className="w-14">
<div className="text-xs font-semibold text-slate-900">11:30 AM</div>
<div className="text-[11px] text-slate-400">60 mins</div>
</div>
<div className="w-px h-8 bg-indigo-100"></div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-semibold text-slate-900">Rohan Mehta</span>
<span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">Moved to 3:30 PM</span>
</div>
<div className="text-[11px] text-slate-500 mt-0.5">Deep Tissue Therapy • Therapist Vikram</div>
</div>
</div>
<div className="text-right">
<span className="text-[11px] font-medium text-indigo-900">Waitlist Backfilled</span>
<span className="text-[10px] text-slate-400 block">Filled in 3 mins</span>
</div>
</div>
{/* Item 3 */}
<div className="p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-white transition-all flex items-center justify-between">
<div className="flex items-center gap-3.5">
<div className="w-14">
<div className="text-xs font-semibold text-slate-900">01:15 PM</div>
<div className="text-[11px] text-slate-400">90 mins</div>
</div>
<div className="w-px h-8 bg-slate-100"></div>
<div>
<div className="flex items-center gap-2">
<span className="text-xs font-semibold text-slate-900">Ananya Rao</span>
<span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">En Route</span>
</div>
<div className="text-[11px] text-slate-500 mt-0.5">Keratin Treatment • Stylist Sunita (Chair 04)</div>
</div>
</div>
<div className="text-right">
<span className="text-[11px] font-medium text-slate-600 flex items-center justify-end gap-1">
<span className="material-symbols-outlined text-[13px] text-slate-400">navigation</span> Maps Opened
                  </span>
<span className="text-[10px] text-slate-400">Sent 11:15 AM</span>
</div>
</div>
</div>
{/* Footer Sync Row */}
<div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
<span className="flex items-center gap-1.5 text-slate-500 font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Connected to Fresha, Zenoti &amp; Google Calendar
              </span>
<span>Synced 4s ago</span>
</div>
</div>
{/* RIGHT PANE: Authentic Patient WhatsApp Interface */}
<div className="lg:col-span-5 p-6 bg-[#FAF9F6] flex flex-col justify-center items-center">
<div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden max-w-sm w-full">
{/* Header */}
<div className="px-3.5 py-2.5 bg-[#075E54] text-white flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-[10px]">AW</div>
<div>
<div className="text-xs font-semibold flex items-center gap-1">
                      Aura Wellness Flagship
                      <span className="material-symbols-outlined text-[13px] text-emerald-300">verified</span>
</div>
<div className="text-[9px] text-emerald-100/80">Official Business Account</div>
</div>
</div>
<span className="material-symbols-outlined text-xs text-emerald-200">more_vert</span>
</div>
{/* Chat Surface */}
<div className="p-3.5 whatsapp-chat-bg space-y-2.5 text-xs min-h-[300px]">
<div className="text-center">
<span className="bg-white/90 px-2 py-0.5 rounded text-[9px] text-slate-400 shadow-2xs border border-slate-100">
                    Official Meta WhatsApp Business Cloud
                  </span>
</div>
{/* Template Message Bubble */}
<div className="bg-white rounded-lg p-3 max-w-[95%] shadow-subtle space-y-2 border-l-2 border-emerald-600">
<div className="flex items-center justify-between text-[10px] font-medium text-slate-400 pb-1 border-b border-slate-100">
<span>APPOINTMENT REMINDER</span>
<span className="text-emerald-700 font-medium">T-120 MINS</span>
</div>
<p className="leading-relaxed text-slate-700 text-[11px]">
                    Hi <span className="font-semibold text-slate-900">Priya</span>, your <span className="font-semibold text-slate-900">HydraFacial Deluxe</span> with Dr. Priya is scheduled for today at <span className="font-semibold text-slate-900">10:00 AM</span>.
                  </p>
<p className="text-[10px] text-slate-400">
                    Need directions or wish to move your slot? Choose below:
                  </p>
{/* Native Interactive WhatsApp Buttons */}
<div className="pt-1 space-y-1 text-[11px] font-medium">
<div className="py-1.5 px-3 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 text-center flex items-center justify-center gap-1.5 border border-slate-200/80 cursor-pointer">
<span className="material-symbols-outlined text-[13px] text-slate-600">near_me</span>
<span>Directions &amp; Valet Pin</span>
</div>
<div className="py-1.5 px-3 rounded bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-950 text-center flex items-center justify-center gap-1.5 border border-indigo-100 cursor-pointer">
<span className="material-symbols-outlined text-[13px]">event_repeat</span>
<span>1-Tap Reschedule Slot</span>
</div>
</div>
<div className="text-[9px] text-slate-400 text-right flex items-center justify-end gap-1">
<span>08:00 AM</span>
<span className="text-blue-500">✓✓</span>
</div>
</div>
{/* Client Reply */}
<div className="flex justify-end">
<div className="bg-[#E7F8E8] rounded-lg p-2.5 max-w-[85%] text-slate-800 shadow-2xs text-[11px] space-y-1">
<p>Confirmed! On my way, see you at 10 🙌</p>
<div className="text-[9px] text-slate-400 text-right flex items-center justify-end gap-1">
<span>08:04 AM</span>
<span className="text-blue-500">✓✓</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</motion.div>
</main>
{/* EDITORIAL LOGO BANNER */}
<motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-12 border-y border-slate-200/60 bg-white">
<div className="max-w-6xl mx-auto px-6">
<p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">
      Trusted by leading clinics and wellness destinations
    </p>
<div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-center text-slate-700 text-center">
<div className="font-medium tracking-widest text-xs uppercase opacity-70 hover:opacity-100 transition-opacity">AURA WELLNESS</div>
<div className="font-medium tracking-widest text-xs uppercase opacity-70 hover:opacity-100 transition-opacity">ÉSTHÉTIQUE DERMA</div>
<div className="font-medium tracking-widest text-xs uppercase opacity-70 hover:opacity-100 transition-opacity">THE KROMA LAB</div>
<div className="font-medium tracking-widest text-xs uppercase opacity-70 hover:opacity-100 transition-opacity">PRANA AYURVEDA</div>
<div className="font-medium tracking-widest text-xs uppercase opacity-70 hover:opacity-100 transition-opacity">NOOR SKIN CLINIC</div>
<div className="font-medium tracking-widest text-xs uppercase opacity-70 hover:opacity-100 transition-opacity">VELVET NAILS</div>
</div>
</div>
</motion.section>
{/* EDITORIAL CLINIC ECONOMICS & BENCHMARK COMPARISON */}
<motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-20 bg-white" id="economics">
<div className="max-w-6xl mx-auto px-6">
<div className="max-w-2xl mb-14">
<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium text-slate-600 bg-slate-100 mb-3">
        Attendance Benchmarks
      </div>
<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        Why traditional SMS fails modern aesthetic clinics.
      </h2>
<p className="text-slate-500 text-sm mt-2 leading-relaxed">
        Cluttered SMS inboxes and friction-heavy phone calls encourage patients to ghost. WhatsApp native interaction removes all hesitation.
      </p>
</div>
{/* Clean 3-Column Metric Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="p-6 rounded-xl border border-slate-200/80 bg-[#FAFAFA] space-y-3">
<div className="text-xs font-medium text-slate-500">Read &amp; Deliverability Rate</div>
<div className="text-3xl font-semibold text-slate-900 tracking-tight">98.4%</div>
<p className="text-xs text-slate-500 leading-relaxed">
          Versus 12% SMS delivery. Rebook delivers directly as an official verified Meta WhatsApp push notification read within 5 minutes.
        </p>
<div className="pt-2 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check_circle</span> 8.2x higher than legacy carrier SMS
        </div>
</div>
<div className="p-6 rounded-xl border border-slate-200/80 bg-[#FAFAFA] space-y-3">
<div className="text-xs font-medium text-slate-500">Rescheduling Friction</div>
<div className="text-3xl font-semibold text-slate-900 tracking-tight">4 Seconds</div>
<p className="text-xs text-slate-500 leading-relaxed">
          Versus 15 minutes of front-desk phone tag. Clients tap one button to immediately claim alternative open appointment windows.
        </p>
<div className="pt-2 text-[11px] font-medium text-indigo-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">bolt</span> Zero staff coordination required
        </div>
</div>
<div className="p-6 rounded-xl border border-slate-200/80 bg-[#FAFAFA] space-y-3">
<div className="text-xs font-medium text-slate-500">Monthly Recovered Value</div>
<div className="text-3xl font-semibold text-slate-900 tracking-tight">₹48,000</div>
<p className="text-xs text-slate-500 leading-relaxed">
          Average gross revenue saved per treatment chair each month by turning empty vacated slots into confirmed visits.
        </p>
<div className="pt-2 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">trending_up</span> Measured across 300+ surveyed clinics
        </div>
</div>
</div>
</div>
</motion.section>
{/* SYSTEM CAPABILITIES: Serene Bento Grid */}
<motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-20 border-t border-slate-100 bg-[#FAFAFA]" id="how-it-works">
<div className="max-w-6xl mx-auto px-6">
<div className="max-w-2xl mb-14">
<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium text-slate-600 bg-white border border-slate-200/70 mb-3">
        Capabilities
      </div>
<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        Engineered for zero dropped appointments.
      </h2>
<p className="text-slate-500 text-sm mt-2 leading-relaxed">
        Three integrated mechanisms calibrated to protect practitioner utilization.
      </p>
</div>
{/* Clean Bento Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Feature 1 */}
<div className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-subtle flex flex-col justify-between">
<div>
<span className="text-xs font-mono font-medium text-slate-400">01</span>
<h3 className="text-base font-semibold text-slate-900 mt-2 mb-2">The 120-Minute Smart Dispatch</h3>
<p className="text-xs text-slate-500 leading-relaxed">
            Reminders sent 24 hours prior are forgotten. Rebook notifies patients 2 hours before the session with navigation, valet pin, and practitioner room details.
          </p>
</div>
<div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
<span>Optimal timing window</span>
<span className="text-slate-800 font-medium">99.4% opened</span>
</div>
</div>
{/* Feature 2 */}
<div className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-subtle flex flex-col justify-between">
<div>
<span className="text-xs font-mono font-medium text-slate-400">02</span>
<h3 className="text-base font-semibold text-slate-900 mt-2 mb-2">Frictionless WhatsApp Rescheduling</h3>
<p className="text-xs text-slate-500 leading-relaxed">
            Patients who face last-minute conflicts can instantly select alternative openings without needing to call reception or feel uncomfortable.
          </p>
</div>
<div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
<span>1-tap confirmation</span>
<span className="text-slate-800 font-medium">Calendar sync</span>
</div>
</div>
{/* Feature 3 */}
<div className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-subtle flex flex-col justify-between">
<div>
<span className="text-xs font-mono font-medium text-slate-400">03</span>
<h3 className="text-base font-semibold text-slate-900 mt-2 mb-2">Instant Waitlist Auto-Backfill</h3>
<p className="text-xs text-slate-500 leading-relaxed">
            When a client reschedules, the newly vacated slot is immediately offered via discrete WhatsApp alert to prioritized waitlisted clients.
          </p>
</div>
<div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
<span>Average refill time</span>
<span className="text-emerald-700 font-medium">3m 48s</span>
</div>
</div>
</div>
{/* Integrations strip */}
<div className="mt-10 p-5 rounded-xl border border-slate-200/80 bg-white shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4" id="integrations">
<div className="flex items-center gap-3 text-xs text-slate-600">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="font-medium text-slate-900">Seamless integration with your existing stack:</span>
<span className="text-slate-400">Fresha, Zenoti, Google Calendar, Calendly &amp; Custom Webhooks</span>
</div>
<a className="text-xs font-medium text-slate-800 hover:text-slate-950 flex items-center gap-1" href="#trial">
<span>View all 18 integrations</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>
</motion.section>
{/* INTERACTIVE ROI CALCULATOR & CLINIC TESTIMONIAL */}
<motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-20 bg-white border-t border-slate-200/70 relative"><div className="absolute inset-0 pointer-events-none overflow-hidden -z-10"><img alt="Luxury aesthetic clinic interior architecture" className="w-full h-full object-cover object-center opacity-15 filter saturate-75" src="https://lh3.googleusercontent.com/aida/AEtjO1UsDajX5zg_erVBc5UoC7N8Z6bNtJUUVDWpANw-s8OSa9bJ-NDKBvhOtE6P3jmXhO2u9eHiyh7CPPHyuGicgGdSbbne6thqX6D3t3ZQ-EL1nQKgEYUWWva1A4-06vt6-yFeAfYiDqk3WVDeHDQF2RfmICJhw9shfO1fB-CGV8rFtWWn38FmXY475Bx8_gDu8TjgfsCUla3rQ-FE8TKQOSNUsIyUY_U_F9GgKGJmOcWjTkLElKvFtqGIBu-L"/><div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90"></div><div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"></div><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div></div>
<div className="max-w-6xl mx-auto px-6">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
{/* Left Editorial Context & Quote */}
<div className="lg:col-span-5 space-y-6">
<div>
<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium text-slate-600 bg-slate-100 mb-3">
            Economic Impact
          </div>
<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 leading-snug">
            Perishable treatment hours. Fixed clinical overhead.
          </h2>
<p className="text-slate-500 text-sm mt-3 leading-relaxed">
            When a patient no-shows, your clinic still absorbs lease, utility, and practitioner retainer costs. Rebook ensures treatment chairs generate expected revenue.
          </p>
</div>
{/* Real Clinic Quote */}
<div className="p-5 rounded-xl border border-slate-200/80 bg-[#FAFAFA] space-y-3 backdrop-blur-md">
<p className="text-xs text-slate-600 italic leading-relaxed">
            "Before Rebook, our six treatment rooms averaged 3 ghosted slots every day—costing over ₹1,80,000 every month. Within two weeks of turning on WhatsApp automated reminders, our no-show rate collapsed below 1.5%."
          </p>
<div className="flex items-center gap-2.5 pt-2 border-t border-slate-200/60">
<div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center">
              RN
            </div>
<div>
<div className="text-xs font-semibold text-slate-900">Dr. Radhika Nambiar, MD</div>
<div className="text-[11px] text-slate-400">Founder &amp; Medical Director, SkinAura Aesthetics</div>
</div>
</div>
</div>
</div>
{/* Right Interactive Calculator Card */}
<div className="lg:col-span-7 bg-[#FAFAFA] rounded-xl border border-slate-200/80 p-6 sm:p-7 shadow-card">
<div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
<div>
<h3 className="text-sm font-semibold text-slate-900">Clinic Recovery Calculator</h3>
<p className="text-xs text-slate-400">Estimated annual recovered margin</p>
</div>
<span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200/70">
            Real-time projection
          </span>
</div>
{/* Sliders */}
<div className="py-5 space-y-5">
<div>
<div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
<span>Practitioner Chairs / Treatment Rooms</span>
<span className="font-semibold text-slate-900">4 Chairs</span>
</div>
<input className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" max="20" min="1" type="range" value="4"/>
<div className="flex justify-between text-[10px] text-slate-400 mt-1">
<span>1 Solo Chair</span>
<span>10 Suites</span>
<span>20+ Multi-location</span>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
<span>Average Ticket Size per Treatment</span>
<span className="font-semibold text-slate-900">₹2,800</span>
</div>
<input className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" max="15000" min="1000" step="500" type="range" value="2800"/>
<div className="flex justify-between text-[10px] text-slate-400 mt-1">
<span>₹1,000 (Express Salon)</span>
<span>₹5,000 (Aesthetic Derma)</span>
<span>₹15,000 (MedSpa)</span>
</div>
</div>
</div>
{/* Calculated Metrics Box (Clean light contrast, no terminal styling) */}
<div className="p-4 rounded-lg bg-white border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Projected Annual Recovery</div>
<div className="text-2xl font-semibold text-emerald-700 mt-0.5">₹5,37,600</div>
<div className="text-[11px] text-slate-400 mt-0.5">Directly added to clinic net margin</div>
</div>
<div className="sm:border-l sm:border-slate-100 sm:pl-4">
<div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Front Desk Hours Saved</div>
<div className="text-2xl font-semibold text-slate-900 mt-0.5">112 Hours</div>
<div className="text-[11px] text-slate-400 mt-0.5">Manual phone follow-ups eliminated</div>
</div>
</div>
<div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-1">
<span>Based on 82% benchmark drop in no-shows</span>
<a className="text-slate-800 font-medium hover:underline" href="#trial">Deploy in 3 minutes →</a>
</div>
</div>
</div>
</div>
</motion.section>
{/* CLOSING CALL TO ACTION: Pure light, serene, warm card */}
<motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="py-20 bg-[#FAFAFA] border-t border-slate-200/60" id="trial">
<div className="max-w-4xl mx-auto px-6 text-center">
<div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/90 shadow-card">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 mb-5">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span>Instant 3-Minute Activation</span>
</div>
<h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
        Put your clinic attendance on autopilot.
      </h2>
<p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
        Connect your appointment calendar in 3 minutes. Turn on verified WhatsApp reminders, and eliminate empty treatment chairs tomorrow morning.
      </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
<a className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-subtle transition-all flex items-center justify-center gap-1.5" href="#">
<span>Start 14-Day Free Trial</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
<a className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm text-slate-700 hover:text-slate-900 bg-white border border-slate-200 shadow-subtle hover:bg-slate-50 transition-all flex items-center justify-center gap-2" href="#demo">
<span>Schedule Concierge Setup</span>
</a>
</div>
{/* Trust signals */}
<div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-emerald-600 text-xs">verified</span> Official Meta Cloud Partner
        </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-slate-400 text-xs">lock</span> HIPAA &amp; GDPR Compliant
        </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-slate-400 text-xs">credit_card_off</span> No Credit Card Required
        </span>
</div>
</div>
</div>
</motion.section>
{/* INSTITUTIONAL LUXURY FOOTER: Crisp, airy, light */}
<footer className="bg-white border-t border-slate-200/70 py-10 text-xs text-slate-500">
<div className="max-w-6xl mx-auto px-6">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-semibold text-[11px]">
          R
        </div>
<span className="text-xs font-semibold text-slate-900">Rebook Technologies, Inc.</span>
</div>
<div className="flex flex-wrap items-center gap-6 font-medium text-slate-600">
<a className="hover:text-slate-900 transition-colors" href="#product">Product</a>
<a className="hover:text-slate-900 transition-colors" href="#how-it-works">How It Works</a>
<a className="hover:text-slate-900 transition-colors" href="#economics">Clinic Economics</a>
<a className="hover:text-slate-900 transition-colors" href="#integrations">Integrations</a>
<a className="hover:text-slate-900 transition-colors" href="#">Security &amp; Privacy</a>
</div>
<div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span>Meta Cloud API Operational</span>
</div>
</div>
<div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
<div>
        © 2025 Rebook Technologies, Inc. WhatsApp and Meta are registered trademarks of Meta Platforms, Inc.
      </div>
<div className="flex items-center gap-4 text-slate-500">
<a className="hover:text-slate-800 transition-colors" href="#">Twitter (X)</a>
<span>•</span>
<a className="hover:text-slate-800 transition-colors" href="#">LinkedIn</a>
<span>•</span>
<a className="hover:text-slate-800 transition-colors" href="#">Clinic Concierge Support</a>
</div>
</div>
</div>
</footer>
</div>
    </>
  );
}
