import React from 'react';

export default function Badge({ children, variant = 'primary', icon, className = '' }) {
  const baseStyle = "px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm w-fit";
  
  const variants = {
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary text-on-secondary",
    error: "bg-error-container text-on-error-container",
    warning: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    surface: "bg-surface-container text-on-surface-variant"
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  );
}
