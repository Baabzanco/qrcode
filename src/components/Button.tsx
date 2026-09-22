import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold text-[14px] h-[44px] px-4 rounded-[10px] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30';
  
  const variantStyles = {
    primary: 'bg-[#635BFF] text-white hover:bg-[#5147E5] shadow-xs',
    secondary: 'bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] shadow-xs',
    ghost: 'bg-transparent text-[#4B5563] hover:bg-[#F3F4F6]'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
