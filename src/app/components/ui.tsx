import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 sm:p-6", className)}>
    {children}
  </div>
);

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'info', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-gradient-to-r from-[#FF3B5C] to-[#FF7A18] text-white hover:opacity-90 shadow-md focus:ring-[#FF3B5C]",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
      danger: "bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 focus:ring-[#EF4444]",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      success: "bg-[#22C55E] text-white hover:opacity-90 focus:ring-[#22C55E]",
      info: "bg-blue-500 text-white hover:opacity-90 focus:ring-blue-500",
    };
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "min-h-[48px] px-4 py-2 text-[15px]",
      lg: "min-h-[56px] px-6 text-[16px]",
    };
    
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    );
  }
);
Button.displayName = 'Button';

export const Badge = ({ children, variant = 'default', className, icon: Icon }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info', className?: string, icon?: React.ElementType }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-[#22C55E] text-white",
    warning: "bg-[#F59E0B] text-white",
    danger: "bg-[#EF4444] text-white",
    info: "bg-blue-500 text-white",
  };
  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium gap-1.5", variants[variant], className)}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("block text-sm font-medium text-gray-700 mb-1", className)}>
    {children}
  </label>
);
