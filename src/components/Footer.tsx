import React from 'react';

interface FooterProps {
  onNavClick: (nav: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-[#635BFF] flex items-center justify-center text-white font-bold text-xs">
              QR
            </div>
            <span className="font-bold text-[16px] text-[#111827]">QR Toolkit</span>
          </div>
          <p className="text-[14px] text-[#6B7280]">
            Free QR tools that work in your browser.
          </p>
        </div>

        <nav className="flex items-center gap-6 text-[14px] font-medium text-[#4B5563]">
          <button
            onClick={() => onNavClick('Create')}
            className="hover:text-[#635BFF] transition-colors"
          >
            Create QR
          </button>
          <button
            onClick={() => onNavClick('Tools')}
            className="hover:text-[#635BFF] transition-colors"
          >
            Tools
          </button>
          <button
            onClick={() => onNavClick('Privacy')}
            className="hover:text-[#635BFF] transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => onNavClick('About')}
            className="hover:text-[#635BFF] transition-colors"
          >
            About
          </button>
        </nav>

        <div className="text-[13px] text-[#6B7280] text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} QR Toolkit. No account required.</p>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">100% client-side privacy.</p>
        </div>
      </div>
    </footer>
  );
};
