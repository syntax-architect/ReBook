import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 bg-inverse-surface text-inverse-on-surface rounded-2xl shadow-elevated"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${toast.icon === 'error' ? 'text-error' : 'text-secondary-fixed'}`}
          >
            {toast.icon}
          </span>
          <span className="text-sm font-label-lg font-medium">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
