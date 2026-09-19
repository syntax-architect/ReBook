import React from 'react';
import { motion } from 'framer-motion';

export default function MetricsCards({
  totalBookings,
  confirmedCount,
  confirmationPct,
  remindedCount,
  showToast,
}) {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-space-md"
    >
      {/* Metric 1 */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all"
      >
        <div className="absolute right-0 top-0 w-28 h-28 bg-surface-container/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Today's Bookings
            </span>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
                {totalBookings}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container/40 text-on-secondary-container font-semibold">
                <span className="material-symbols-outlined text-xs">trending_up</span>+4 vs y'day
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">event_upcoming</span>
          </div>
        </div>
        <div className="mt-space-md flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
            <span>Confirmation progress</span>
            <span className="font-semibold text-on-surface">
              {confirmedCount} / {totalBookings} Confirmed ({confirmationPct}%)
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-700"
              style={{ width: `${confirmationPct}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Metric 2 */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all"
      >
        <div className="absolute right-0 top-0 w-28 h-28 bg-secondary-container/20 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Reminders Sent
            </span>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">
                {20 + remindedCount}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container font-semibold">
                <span
                  className="material-symbols-outlined text-xs"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  done_all
                </span>
                98% delivery
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <span className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-secondary">
              mark_chat_read
            </span>
            {remindedCount} awaiting reply
          </span>
          <span
            onClick={() => showToast('Viewing delivery logs...', 'receipt_long')}
            className="text-label-sm font-label-sm text-primary font-semibold hover:underline cursor-pointer"
          >
            Logs →
          </span>
        </div>
      </motion.div>

      {/* Metric 3 */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className="bg-gradient-to-br from-secondary via-secondary to-on-secondary-fixed-variant text-on-secondary rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary-fixed/20 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-wider font-semibold">
              Revenue Saved This Week
            </span>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-secondary">
                ₹28,500
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-white/20 text-on-secondary font-semibold">
                +32% no-show drop
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary-fixed">
            <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-secondary-fixed">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">verified</span>9 appointments
            rescued from no-show
          </span>
          <span className="text-label-sm font-label-sm bg-white/15 px-2 py-0.5 rounded text-white font-medium">
            ₹3,166 avg
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
