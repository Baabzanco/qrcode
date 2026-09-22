import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  activeNav: string;
  onNavClick: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeNav, onNavClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-[#E5E7EB] h-[64px]">
      <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <div
          onClick={() => onNavClick('Create')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-[10px] bg-[#635BFF] flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-[#5147E5] transition-colors">
            QR
          </div>
          <span className="font-bold text-[18px] sm:text-[20px] text-[#111827] tracking-tight">
            QR Toolkit
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F9FAFB] p-1 rounded-[10px] border border-[#E5E7EB]">
          {['Create', 'Tools', 'Resources'].map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onNavClick(item)}
                className={`px-4 py-1.5 rounded-[8px] text-[14px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-[#111827] shadow-2xs font-semibold'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-white/50'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right side minimal */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[13px] text-[#6B7280] font-medium bg-[#F5F3FF] text-[#635BFF] px-2.5 py-1 rounded-[6px] border border-[#635BFF]/10">
            Free & Private
          </span>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#4B5563] hover:text-[#111827] rounded-[8px] hover:bg-[#F3F4F6] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeNav={activeNav}
        onNavClick={onNavClick}
      />
    </header>
  );
};
