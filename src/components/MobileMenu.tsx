import React from 'react';
import { X, QrCode, Wrench, BookOpen } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeNav,
  onNavClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-lg p-6 flex flex-col justify-between border-l border-[#E5E7EB] transition-transform duration-180">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[8px] bg-[#635BFF] flex items-center justify-center text-white font-bold text-sm">
                QR
              </div>
              <span className="font-bold text-[18px] text-[#111827]">QR Toolkit</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#4B5563] hover:text-[#111827] rounded-[8px] hover:bg-[#F3F4F6] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-2">
            {[
              { name: 'Create', icon: QrCode },
              { name: 'Tools', icon: Wrench },
              { name: 'Resources', icon: BookOpen },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavClick(item.name);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[10px] text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F5F3FF] text-[#635BFF]'
                      : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E5E7EB] text-center">
          <p className="text-[13px] text-[#6B7280]">
            Free & Privacy-First <br />
            No account required.
          </p>
        </div>
      </div>
    </div>
  );
};
