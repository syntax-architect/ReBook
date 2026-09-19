import React, { memo } from 'react';
import { motion } from 'framer-motion';

const getStyleForStatus = (status) => {
  switch (status) {
    case 'confirmed':
      return {
        colorBar: 'bg-secondary',
        pillBg: 'bg-secondary-container/40 text-on-secondary-container',
        icon: 'check_circle',
        label: 'Confirmed',
        fade: false,
      };
    case 'reminded':
      return {
        colorBar: 'bg-primary-container',
        pillBg: 'bg-primary-fixed text-on-primary-fixed-variant',
        icon: 'schedule_send',
        label: 'Reminded',
        fade: false,
      };
    case 'new':
      return {
        colorBar: 'bg-tertiary-fixed-dim',
        pillBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
        icon: 'fiber_new',
        label: 'New',
        fade: false,
      };
    case 'completed':
      return {
        colorBar: 'bg-surface-variant',
        pillBg: 'bg-surface-container-high text-on-surface-variant',
        icon: 'check',
        label: 'Completed',
        fade: true,
      };
    case 'no-show':
      return {
        colorBar: 'bg-error-container',
        pillBg: 'bg-error-container text-on-error-container',
        icon: 'close',
        label: 'No-Show',
        fade: true,
      };
    case 'cancelled':
      return {
        colorBar: 'bg-error-container',
        pillBg: 'bg-error-container text-on-error-container',
        icon: 'cancel',
        label: 'Cancelled',
        fade: true,
      };
    case 'blocked':
      return {
        colorBar: 'bg-surface-container-highest',
        pillBg: 'bg-surface-variant text-on-surface-variant',
        icon: 'event_busy',
        label: 'Blocked',
        fade: true,
      };
    default:
      return {
        colorBar: 'bg-surface-container',
        pillBg: 'bg-surface-container text-on-surface-variant',
        icon: 'help',
        label: 'Unknown',
        fade: false,
      };
  }
};

const AppointmentCard = memo(({ app, handleStatusChange, setAppointments }) => {
  const style = getStyleForStatus(app.status);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.25 }}
      className={`appointment-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md relative overflow-hidden ${style.fade ? 'opacity-50 grayscale-[50%]' : ''}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.colorBar}`}></div>

      <div className="flex items-start md:items-center gap-space-md pl-1">
        <div className="flex flex-col items-center justify-center w-16 py-2 px-1 rounded-xl bg-surface-container-low text-on-surface shrink-0">
          <span className="font-headline-sm text-headline-sm font-bold leading-none">
            {app.time}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold mt-0.5 uppercase">
            {app.meridiem}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {app.client}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${style.pillBg}`}
            >
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {style.icon}
              </span>
              {style.label}
            </span>
            {app.metadata && (
              <span className="text-body-sm font-body-sm text-on-surface-variant">
                • {app.metadata}
              </span>
            )}
            {app.isFlightRisk && (
              <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 bg-error-container text-on-error-container">
                <span className="material-symbols-outlined text-xs">warning</span>
                Flight Risk
              </span>
            )}
          </div>
          <span className="text-body-md font-body-md text-on-surface">{app.service}</span>

          <div className="flex items-center gap-2 mt-1">
            {app.price !== '-' && (
              <span className="font-label-md text-label-md font-bold text-on-surface">
                {app.price}
              </span>
            )}
            {app.price !== '-' && <span className="text-outline-variant">•</span>}
            <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
              <span
                className={`material-symbols-outlined text-xs ${app.status === 'confirmed' ? 'text-secondary' : 'text-primary'}`}
              >
                {app.timelineIcon}
              </span>
              {app.timelineMsg}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0">
        {app.hasSendWhatsApp && app.status === 'new' && (
          <button
            onClick={() => handleStatusChange(app.id, 'reminded')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-semibold shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">send_to_mobile</span>
            <span>Send WhatsApp</span>
          </button>
        )}
        {app.status !== 'completed' &&
          app.status !== 'no-show' &&
          app.status !== 'cancelled' &&
          app.status !== 'blocked' && (
            <>
              <button
                onClick={() => handleStatusChange(app.id, 'completed')}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-lg text-label-lg font-semibold shadow-sm transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg font-bold">check</span>
                <span>Mark Completed</span>
              </button>
              <button
                onClick={() => handleStatusChange(app.id, 'no-show')}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-tertiary-fixed text-tertiary hover:bg-tertiary-fixed-dim font-label-lg text-label-lg font-semibold border border-tertiary-container/20 transition-all active:scale-95"
                title="Mark No-Show"
              >
                <span className="material-symbols-outlined text-lg">close</span>
                <span>Mark No-show</span>
              </button>
              <button
                onClick={() => handleStatusChange(app.id, 'cancelled')}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-label-lg text-label-lg font-semibold transition-all active:scale-95"
                title="Cancel Booking"
              >
                <span className="material-symbols-outlined text-lg">cancel</span>
                <span>Cancel</span>
              </button>
            </>
          )}
        {(app.status === 'completed' || app.status === 'no-show' || app.status === 'cancelled') && (
          <button
            onClick={() => handleStatusChange(app.id, 'confirmed')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg font-semibold border border-outline-variant/30 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">undo</span>
            <span>Undo</span>
          </button>
        )}
        {app.status === 'blocked' && (
          <button
            onClick={() => setAppointments((prev) => prev.filter((a) => a.id !== app.id))}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-surface-container-high text-on-surface-variant hover:bg-error-container hover:text-on-error-container font-label-lg text-label-lg font-semibold transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
            <span>Unblock</span>
          </button>
        )}
      </div>
    </motion.div>
  );
});

export default AppointmentCard;
