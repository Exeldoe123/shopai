import React from 'react';
import { clsx } from 'clsx';

export default function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("bg-surface border border-white/5 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm", className)} {...props}>
      {children}
    </div>
  );
}
