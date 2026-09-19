import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', icon, type = 'button', className = '' }) {
  const baseStyle = "flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-150 active:scale-95 group";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    secondary: "bg-secondary text-on-secondary hover:bg-secondary/90",
    outline: "border border-outline-variant/50 text-on-surface hover:bg-surface-container",
    ghost: "text-on-surface-variant hover:text-on-surface hover:bg-surface-container shadow-none hover:shadow-none"
  };

  return (
    <button onClick={onClick} type={type} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
