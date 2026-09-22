import React from 'react';

export const PrivacyBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F3FF] border border-[#635BFF]/20 text-[#635BFF] text-[13px] font-medium shadow-2xs ${className}`}>
      <span aria-hidden="true" className="text-[12px]">🔒</span>
      <span>Processed in your browser</span>
    </div>
  );
};
