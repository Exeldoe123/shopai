import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    warning: 'bg-accent/10 text-accent border border-accent/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    info: 'bg-primary/10 text-primary border border-primary/20',
  };

  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
