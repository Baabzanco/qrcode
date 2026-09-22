import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[14px] font-medium text-[#374151]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full h-[44px] bg-white px-3 py-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] rounded-[10px] border transition-all duration-150 outline-none ${
          error
            ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
            : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#635BFF] focus:ring-[3px] focus:ring-[#635BFF]/12'
        } ${className}`}
        {...props}
      />
      {helperText && (
        <p className={`text-[12px] ${error ? 'text-[#DC2626]' : 'text-[#6B7280]'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
