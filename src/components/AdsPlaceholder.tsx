import React from 'react';

export const AdsPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div 
      aria-label="Advertisement placeholder" 
      className={`w-full max-w-[1200px] mx-auto my-8 px-4 sm:px-6 ${className}`}
    >
      <div className="w-full h-[90px] rounded-[10px] border border-dashed border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center text-[12px] text-[#9CA3AF] tracking-wide select-none">
        Advertisement Space (Optional / Future)
      </div>
    </div>
  );
};
