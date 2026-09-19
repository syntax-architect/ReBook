import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignIn, SignUp } from '@clerk/clerk-react';

export default function Login({ mode = 'login' }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full bg-white text-slate-800 font-sans antialiased"
      >
        <div className="min-h-full flex flex-col lg:flex-row">
          {/* LEFT SIDE: The Form (Pristine, Clinical Precision & Elevated Clarity) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-white min-h-screen">
            {/* Top Bar: Logo & Navigation Back */}
            <div className="flex items-center justify-between">
              <a className="inline-flex items-center gap-3 group" href="#">
                <div className="w-10 h-10 rounded-xl bg-[#3730A3] flex items-center justify-center shadow-sm text-white group-hover:bg-[#312e81] transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    <path d="M8 12h.01M12 12h.01M16 12h.01"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-tight font-display text-slate-900">
                      Rebook
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>
                      Meta Cloud
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    WhatsApp Attendance Automation
                  </span>
                </div>
              </a>
              {/* Quick Help / Support link */}
              <a
                className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
                href="#"
              >
                <span className="">Need help?</span>
                <i className="fa-regular fa-circle-question text-slate-400"></i>
              </a>
            </div>
            {/* Main Form Container */}
            <div className="max-w-[420px] w-full mx-auto my-auto py-10 flex justify-center items-center">
              {mode === 'login' ? (
                <SignIn
                  routing="path"
                  path="/login"
                  fallbackRedirectUrl="/dashboard"
                  forceRedirectUrl="/dashboard"
                />
              ) : (
                <SignUp
                  routing="path"
                  path="/signup"
                  fallbackRedirectUrl="/dashboard"
                  forceRedirectUrl="/dashboard"
                />
              )}
            </div>
            {/* Quick Trust Indicators on Mobile */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <i className="fa-brands fa-whatsapp text-emerald-600 text-sm"></i> Official Meta
                Partner
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="fa-solid fa-check text-slate-500"></i> Zero SMS Fallback Fees
              </span>
            </div>
          </div>
          {/* Bottom Footer (Left Side) */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 text-xs text-slate-400 gap-2">
            <p className="">© 2025 Rebook Technologies, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-slate-600 transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-slate-600 transition-colors" href="#">
                Security &amp; HIPAA
              </a>
              <a className="hover:text-slate-600 transition-colors" href="#">
                Terms
              </a>
            </div>
          </div>
          {/* RIGHT SIDE: Editorial Luxury Architectural Showcase (Aman / Aesop Quiet Luxury) */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-[#181615] overflow-hidden flex-col justify-between p-10 xl:p-14 min-h-screen text-white">
            {/* Architectural Spa / Clinic Background Image with Sophisticated Warm Dark Vignette */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, 50, -50, 0],
                  y: [0, -50, 50, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] mix-blend-screen"
              />
              <motion.div
                animate={{
                  x: [0, -60, 40, 0],
                  y: [0, 60, -40, 0],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen"
              />
              <img
                alt="Luxury aesthetic clinic and wellness reception interior in Rebook brand tones"
                className="relative w-full h-full object-cover object-center transform scale-[1.02] filter contrast-[0.98] brightness-[0.88] z-10 opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChqDM_RcGc2M6AKL12QeTQQXB1ov9oQrtbX2LkU0XyciddZ5Ygp1BOxABL94zb0Fey_pTZ1Zf4Ek8DNV-cXrBf3s7LvBi9WNjVmaDfMa3FG2RzotPxhcmv87zIWRikEYo4SfOjcHr2iTBuFHinLsE-Xex_a8WlJEJn6kOCG-zuMI9yi13G8YCOKzj19rF3cnjpaoB2RCeJwRvu2NsIDXqYgMPg8zLySur0-JiLClKJxdAXCZg8gOT8UQ"
              />
              {/* Multi-layered warm editorial film scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c] via-[#121110]/60 to-[#1c1a17]/80 z-20"></div>
              <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[0.5px] z-20"></div>
            </div>
            {/* Top Row: Minimalist B2B Architectural Badges */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-medium text-stone-200 shadow-sm tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="">Trusted by 2,400+ Aesthetic Clinics &amp; Luxury Spas</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-[11px] text-stone-300 font-medium">
                <i className="fa-brands fa-whatsapp text-emerald-400 text-xs"></i>
                <span className="">Official Meta Cloud Partner</span>
              </div>
            </div>
            {/* Centerpiece: Quiet Luxury Editorial Quote & Verified Practitioner Details */}
            <div className="relative z-10 max-w-xl my-auto py-12">
              {/* Architectural Section Tag */}
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-amber-200/50"></span>
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-amber-100/80">
                  Clinical Operations Case Study
                </span>
              </div>
              {/* Editorial Typography Quote */}
              <blockquote className="text-2xl sm:text-3xl xl:text-[34px] xl:leading-[1.3] font-serif italic text-stone-100 font-normal tracking-tight mb-8 drop-shadow-sm">
                “Rebook transformed our patient experience and eliminated ghosted appointment slots
                from day one.”
              </blockquote>
              {/* Refined Testimonial Identity Capsule */}
              <div className="inline-flex items-center gap-4 p-3.5 pr-6 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-xl shadow-black/20">
                <div className="relative flex-shrink-0">
                  <img
                    alt="Dr. Radhika Nambiar"
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover ring-1 ring-white/20 shadow-md"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UBTG9a-os8RUQCpQ60fAdYLT0hUlpDu-R-EA3FU5rcWw3QRvJD3URO0hd2X7SVZPP00VtfCFBYGFGY5Bl9Zf9YDcxnf5rEs3wiUnCWUkJu5ZKHjEpqGjwQAAyChI_rTXazKKiV2b32yTslOve75fAQ18CCliYXiPCDk0ld6gKxK-vqlwFr-eUudGP1rG3ACiU8Glp8gH_cVp3IvFZ2HJjrJemEy3UWq9_vAMBzK5sbj20MoCRQxGhvOkaC"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center">
                    <i className="fa-solid fa-check text-[7px] text-white"></i>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm text-stone-100 font-display">
                      Dr. Radhika Nambiar
                    </h4>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-stone-300 border border-white/10">
                      MD
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <i className="fa-solid fa-certificate text-[9px]"></i> Verified Partner
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">Founder &amp; Medical Director</p>
                  <p className="text-[11px] text-amber-200/90 font-medium tracking-wide">
                    SkinAura Aesthetics (6 Clinics)
                  </p>
                </div>
              </div>
              {/* Discreet Performance Footprint */}
              <div className="mt-8 space-y-4">
                <div className="bg-black/45 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl shadow-black/20 grid grid-cols-3 divide-x divide-white/10 text-center">
                  <div className="px-2">
                    <div className="text-2xl font-semibold text-white tracking-tight font-display">
                      40%
                    </div>
                    <div className="text-[10px] text-stone-300 mt-1 uppercase tracking-wider font-medium">
                      No-Show Cut
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-2xl font-semibold text-white tracking-tight font-display">
                      &lt; 4s
                    </div>
                    <div className="text-[10px] text-stone-300 mt-1 uppercase tracking-wider font-medium">
                      Auto-Fill Speed
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-2xl font-semibold text-emerald-400 tracking-tight font-display">
                      99.4%
                    </div>
                    <div className="text-[10px] text-stone-300 mt-1 uppercase tracking-wider font-medium">
                      Attendance
                    </div>
                  </div>
                </div>
                <div className="p-3.5 px-4 rounded-xl bg-black/35 backdrop-blur-md border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-300 font-medium">
                    <span className="flex items-center gap-1.5 text-stone-200">
                      <i className="fa-solid fa-certificate text-emerald-400 text-[10px]"></i>{' '}
                      Trusted across Mumbai, Delhi &amp; Bengaluru
                    </span>
                    <span className="text-[10px] text-amber-200/90 font-semibold tracking-wider uppercase">
                      140+ Aesthetic Clinics
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[10px] text-stone-400">
                    <span className="inline-flex items-center gap-1">
                      <i className="fa-brands fa-whatsapp text-emerald-400 text-xs"></i> 99.98% API
                      Uptime
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <i className="fa-solid fa-shield-halved text-stone-300 text-[9px]"></i> HIPAA
                      &amp; ISO 27001
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <i className="fa-solid fa-check text-emerald-400 text-[9px]"></i> Instant Slot
                      Recovery
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Status Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs text-stone-400 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-stone-300">
                <i className="fa-solid fa-shield-halved text-emerald-400 text-xs"></i>
                <span className="">HIPAA &amp; SOC2 Compliant Cloud Architecture</span>
              </div>
              <div className="text-[11px] text-stone-400 tracking-wide">
                Zero Engineering • Turnkey Integration
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
