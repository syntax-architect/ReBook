import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.span
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="material-symbols-outlined text-[24px] text-primary"
            >
              auto_awesome
            </motion.span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              Rebook
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary-fixed-variant text-on-primary font-label-md rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Header section */}
      <section className="pt-24 pb-16 px-6 text-center max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-container/20 text-primary font-label-sm mb-6 border border-primary/20 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">verified</span>
          Simple, transparent pricing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline-xl text-on-surface mb-6 tracking-tight leading-tight"
        >
          Put your front desk on{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            autopilot
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl text-on-surface-variant font-body-lg"
        >
          Stop losing money to no-shows. Rebook acts as your 24/7 digital receptionist, filling your
          calendar and confirming slots instantly via WhatsApp.
        </motion.p>
      </section>

      {/* Billing Toggle */}
      <section className="flex justify-center mb-16 relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 p-1.5 bg-surface-container rounded-full border border-outline-variant/50 shadow-inner relative"
        >
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative px-6 py-2.5 rounded-full font-label-md text-sm transition-all z-10 ${!isAnnual ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            {!isAnnual && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-surface-container-lowest rounded-full shadow-sm border border-outline-variant/30"
                style={{ zIndex: -1 }}
              />
            )}
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative px-6 py-2.5 rounded-full font-label-md text-sm transition-all z-10 flex items-center gap-2 ${isAnnual ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            {isAnnual && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-surface-container-lowest rounded-full shadow-sm border border-outline-variant/30"
                style={{ zIndex: -1 }}
              />
            )}
            Annual
            <motion.span
              animate={isAnnual ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: isAnnual ? Infinity : 0, duration: 2 }}
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-sm ${isAnnual ? 'bg-gradient-to-r from-secondary to-[#008f63] text-on-secondary' : 'bg-secondary-container text-on-secondary-container'}`}
            >
              Save 2 Months
            </motion.span>
          </button>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-24 relative z-10">
        {/* Starter Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/40 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-shadow"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-on-surface">
              rocket_launch
            </span>
          </div>
          <div className="mb-6 relative z-10">
            <h3 className="text-2xl font-headline-md font-semibold text-on-surface mb-2">
              Starter
            </h3>
            <p className="text-sm font-body-sm text-on-surface-variant h-10">
              Essential booking automation for solo practitioners.
            </p>
          </div>
          <div className="mb-6 flex items-end gap-1 relative z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={isAnnual ? 'annual' : 'monthly'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-4xl font-bold font-headline-xl text-on-surface"
              >
                ₹{isAnnual ? '8,990' : '899'}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm font-body-sm text-on-surface-variant mb-1">
              / {isAnnual ? 'yr' : 'mo'}
            </span>
          </div>
          <div className="mb-8 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm font-body-sm text-on-surface-variant flex items-center justify-between">
            <span>Setup Fee</span>
            <span className="font-semibold text-on-surface">₹999</span>
          </div>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4 mb-8 flex-1"
          >
            {[
              '100 bookings/month',
              'Public Booking Link',
              'Standard Calendar Dashboard',
              '1-Hour WhatsApp Reminders',
            ].map((feature, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-3 text-sm font-body-sm text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">
                  check_circle
                </span>{' '}
                {feature}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/signup"
              className="block w-full py-3.5 rounded-xl border-2 border-outline/30 hover:border-primary text-on-surface hover:text-primary font-label-md text-center transition-colors font-semibold"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </motion.div>

        {/* Growth Plan (Recommended) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="bg-gradient-to-b from-surface-container-lowest to-primary-container/5 rounded-3xl p-8 border-2 border-primary shadow-xl flex flex-col relative overflow-hidden transform md:-translate-y-4"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-primary">trending_up</span>
          </div>
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-primary-fixed-variant text-on-primary text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow-sm">
            Recommended
          </div>

          <div className="mb-6 mt-2 relative z-10">
            <h3 className="text-2xl font-headline-md font-bold text-primary mb-2 flex items-center gap-2">
              Growth{' '}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="material-symbols-outlined text-[20px] text-secondary"
              >
                verified
              </motion.span>
            </h3>
            <p className="text-sm font-body-sm text-on-surface-variant h-10">
              Advanced AI and automation for busy salons and clinics.
            </p>
          </div>
          <div className="mb-6 flex items-end gap-1 relative z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={isAnnual ? 'annual' : 'monthly'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-5xl font-bold font-headline-xl text-on-surface"
              >
                ₹{isAnnual ? '14,990' : '1,499'}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm font-body-sm text-on-surface-variant mb-1.5">
              / {isAnnual ? 'yr' : 'mo'}
            </span>
          </div>

          {/* Setup Fee Box */}
          <div
            className={`mb-8 p-3.5 rounded-xl border text-sm font-body-sm flex items-center justify-between transition-colors duration-300 ${isAnnual ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant'}`}
          >
            <span className="font-medium">White-Glove Setup</span>
            {isAnnual ? (
              <span className="font-bold flex items-center gap-1.5">
                <span className="line-through opacity-60">₹2,000</span>
                <span className="text-on-secondary bg-secondary px-2 py-0.5 rounded-md text-[10px] uppercase shadow-sm">
                  Free
                </span>
              </span>
            ) : (
              <span className="font-semibold text-on-surface">₹2,000</span>
            )}
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4 mb-8 flex-1"
          >
            {[
              { icon: 'all_inclusive', text: 'Unlimited Bookings', bold: true },
              { icon: 'smart_toy', text: 'AI Waitlist Auto-Backfill' },
              { icon: 'warning', text: 'Flight-Risk Detection' },
              { icon: 'campaign', text: '500 WhatsApp Promo Broadcasts' },
              { icon: 'forum', text: '2-Way WhatsApp Cancellations' },
            ].map((feature, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className={`flex items-start gap-3 text-sm font-body-sm text-on-surface ${feature.bold ? 'font-semibold' : ''}`}
              >
                <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                  {feature.icon}
                </span>{' '}
                {feature.text}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/signup"
              className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-fixed-variant text-on-primary shadow-lg hover:shadow-xl font-label-md text-center transition-all font-semibold flex items-center justify-center gap-2 group"
            >
              Get Started
              <motion.span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/40 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-shadow"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-on-surface">business</span>
          </div>
          <div className="mb-6 relative z-10">
            <h3 className="text-2xl font-headline-md font-semibold text-on-surface mb-2">
              Premium
            </h3>
            <p className="text-sm font-body-sm text-on-surface-variant h-10">
              Enterprise features for multi-staff facilities.
            </p>
          </div>
          <div className="mb-6 flex items-end gap-1 relative z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={isAnnual ? 'annual' : 'monthly'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-4xl font-bold font-headline-xl text-on-surface"
              >
                ₹{isAnnual ? '29,990' : '2,999'}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm font-body-sm text-on-surface-variant mb-1">
              / {isAnnual ? 'yr' : 'mo'}
            </span>
          </div>

          <div
            className={`mb-8 p-3 rounded-xl border text-sm font-body-sm flex items-center justify-between transition-colors duration-300 ${isAnnual ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant'}`}
          >
            <span>White-Glove Setup</span>
            {isAnnual ? (
              <span className="font-semibold flex items-center gap-1">
                <span className="line-through opacity-60">₹2,000</span>
                <span className="text-on-secondary bg-secondary px-1.5 py-0.5 rounded-md text-[10px] uppercase shadow-sm">
                  Free
                </span>
              </span>
            ) : (
              <span className="font-semibold text-on-surface">₹2,000</span>
            )}
          </div>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4 mb-8 flex-1"
          >
            {[
              { icon: 'done_all', text: 'Everything in Growth', bold: true },
              { icon: 'groups', text: 'Multi-Staff Calendars' },
              { icon: 'language', text: 'Custom Domain (booking.brand.com)' },
              { icon: 'all_inclusive', text: 'Unlimited WhatsApp Broadcasts' },
              { icon: 'support_agent', text: 'Priority Support SLA' },
            ].map((feature, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className={`flex items-start gap-3 text-sm font-body-sm text-on-surface ${feature.bold ? 'font-semibold' : ''}`}
              >
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">
                  {feature.icon}
                </span>{' '}
                {feature.text}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/signup"
              className="block w-full py-3.5 rounded-xl border-2 border-outline/30 hover:border-primary text-on-surface hover:text-primary font-label-md text-center transition-colors font-semibold"
            >
              Contact Sales
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-6 mb-32 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl font-headline-lg font-bold text-on-surface mb-10 text-center">
            Compare all features
          </h2>
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-lg shadow-surface-variant/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container/50 border-b border-outline-variant/30">
                  <th className="p-5 font-label-lg text-on-surface-variant font-bold w-1/3">
                    Features
                  </th>
                  <th className="p-5 font-label-lg text-on-surface font-bold text-center w-2/9">
                    Starter
                  </th>
                  <th className="p-5 font-label-lg text-primary font-bold text-center w-2/9 bg-primary-container/10 border-x border-primary/10">
                    Growth
                  </th>
                  <th className="p-5 font-label-lg text-on-surface font-bold text-center w-2/9">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="font-body-md text-on-surface">
                {/* Group 1 */}
                <tr className="border-b border-outline-variant/20 bg-surface-container-lowest">
                  <td
                    colSpan="4"
                    className="p-4 pl-6 font-label-sm uppercase tracking-wider text-primary font-bold bg-primary/5"
                  >
                    Booking Engine
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">Monthly Booking Limit</td>
                  <td className="p-5 text-center font-medium">100</td>
                  <td className="p-5 text-center font-bold text-primary bg-primary-container/5 border-x border-primary/10">
                    Unlimited
                  </td>
                  <td className="p-5 text-center font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">AI Waitlist Auto-Backfill</td>
                  <td className="p-5 text-center text-outline-variant">-</td>
                  <td className="p-5 text-center text-secondary bg-primary-container/5 border-x border-primary/10">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                  <td className="p-5 text-center text-secondary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">Flight-Risk Detection</td>
                  <td className="p-5 text-center text-outline-variant">-</td>
                  <td className="p-5 text-center text-secondary bg-primary-container/5 border-x border-primary/10">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                  <td className="p-5 text-center text-secondary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                </tr>

                {/* Group 2 */}
                <tr className="border-b border-outline-variant/20 bg-surface-container-lowest">
                  <td
                    colSpan="4"
                    className="p-4 pl-6 font-label-sm uppercase tracking-wider text-primary font-bold bg-primary/5"
                  >
                    WhatsApp Automation
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">Booking Confirmations</td>
                  <td className="p-5 text-center text-secondary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                  <td className="p-5 text-center text-secondary bg-primary-container/5 border-x border-primary/10">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                  <td className="p-5 text-center text-secondary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">Promo Broadcasts / month</td>
                  <td className="p-5 text-center text-outline-variant">-</td>
                  <td className="p-5 text-center font-bold text-primary bg-primary-container/5 border-x border-primary/10">
                    500
                  </td>
                  <td className="p-5 text-center font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">2-Way Cancellations</td>
                  <td className="p-5 text-center text-outline-variant">-</td>
                  <td className="p-5 text-center text-secondary bg-primary-container/5 border-x border-primary/10">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                  <td className="p-5 text-center text-secondary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                </tr>

                {/* Group 3 */}
                <tr className="border-b border-outline-variant/20 bg-surface-container-lowest">
                  <td
                    colSpan="4"
                    className="p-4 pl-6 font-label-sm uppercase tracking-wider text-primary font-bold bg-primary/5"
                  >
                    Workspace & Setup
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">Staff Calendars</td>
                  <td className="p-5 text-center font-medium">1</td>
                  <td className="p-5 text-center font-bold text-primary bg-primary-container/5 border-x border-primary/10">
                    1
                  </td>
                  <td className="p-5 text-center font-medium">Unlimited</td>
                </tr>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 text-on-surface-variant pl-6">Custom Domain</td>
                  <td className="p-5 text-center text-outline-variant">-</td>
                  <td className="p-5 text-center text-outline-variant bg-primary-container/5 border-x border-primary/10">
                    -
                  </td>
                  <td className="p-5 text-center text-secondary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-24 px-6 text-center border-t border-outline-variant/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-fixed-variant z-0"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50 z-0"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-headline-lg font-bold text-on-primary mb-6"
          >
            Ready to reclaim your revenue?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-on-primary/80 font-body-lg mb-10 max-w-xl mx-auto"
          >
            Join hundreds of salons and clinics in India saving over ₹48,000 a month in recovered
            no-shows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/signup"
              className="inline-flex px-8 py-4 bg-surface-container-lowest text-primary rounded-xl font-label-lg font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your 7-Day Free Trial
            </Link>
          </motion.div>
          <p className="mt-6 text-[13px] font-body-sm text-on-primary/70">
            No credit card required to start.
          </p>
        </div>
      </section>
    </div>
  );
}
