import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionNavLink = motion(NavLink);

export default function Layout() {
  const location = useLocation();

  const getNavClasses = ({ isActive }) => 
    isActive 
      ? "flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg"
      : "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors";

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-margin px-gutter">
        <div className="flex flex-col gap-space-xl">
          <div className="flex items-center gap-space-sm">
            <img alt="Rebook Brand Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm-3KhIc3fEcmirBioz2OtSRUYWGPmU-0eOnq97rsZBOf_X-e9SnJfGH8YnWiF5oZ569mLBQMhMosApAeytlqP9bMr_ONO4NuhwapQU2S54CrAH8B5bfHv2regjlZam7IsKrNIgLJhILqRarSNZ3hgxkdsPRzVWyKOo7WXinqWjM_-Z7TuDlBjMY6D5pLh7U2MyXQ-pumRyF7D7sf3ZLyiLBPGQvF6r_TQKY0uGIozxaH_Y1vSenJhzg" />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Rebook</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">WhatsApp Reminders</span>
            </div>
          </div>
          <nav className="flex flex-col gap-space-xs">
            <MotionNavLink to="/dashboard" className={getNavClasses} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <span className="material-symbols-outlined text-primary">calendar_today</span>Dashboard
            </MotionNavLink>
            <MotionNavLink to="/services" className={getNavClasses} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <span className="material-symbols-outlined text-primary">spa</span>Services
            </MotionNavLink>
            <MotionNavLink to="/settings" className={getNavClasses} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <span className="material-symbols-outlined text-primary">tune</span>Settings
            </MotionNavLink>
          </nav>
        </div>
        <div className="flex flex-col gap-space-md">
          <motion.div whileHover={{ scale: 1.02 }} className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs cursor-default">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-sm">support_agent</span>
              <span className="font-label-sm text-label-sm text-on-surface">Automated Dispatch</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">99.8% prompt rate over WhatsApp Gateway</span>
          </motion.div>
        </div>
      </aside>
      
      <div className="pl-64">
        <header className="fixed top-0 left-64 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="h-16 w-full px-margin flex items-center justify-between">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-secondary-container/40">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                <span className="font-label-sm text-label-sm text-on-secondary-container">WhatsApp API Connected</span>
              </div>
            </div>
            <div className="flex items-center gap-space-lg">
              <div className="flex items-center gap-space-sm">
                <div className="flex flex-col text-right">
                  <span className="font-label-lg text-label-lg text-on-surface">Aura Wellness Studio &amp; Salon</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Front Desk Manager</span>
                </div>
                <img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6PbbzewuogXQPM7GBB0BQfz9iI8xs02VHnkoEsJljiNIx2YmR3VGO6yziNIq3T2uH_47TLKxYBIJxztOhJ1VxirZHFnGFgORpN12PkvMp4SX8Y1-J6VqHBmOMALQQ9sXvNCGqWRKiFgrQ8NcwL1Z12GCj7st_VCgxD3mwF82YJATfz3MHBdp5wT1wBQi7fRE8VdcDrBN87YP43AwXG_3V-BbNCMUGBkSV0lhHUAU2Cnv5oVKJ5jwNVg" />
              </div>
            </div>
          </div>
        </header>
        
        <main className="w-full pt-16 bg-surface min-h-screen px-margin overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
