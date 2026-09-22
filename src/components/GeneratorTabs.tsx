import React from 'react';
import { GeneratorTabType } from '../types';
import { Link, FileText, Wifi, Mail, Phone, MessageSquare, MessageCircle, User } from 'lucide-react';

interface GeneratorTabsProps {
  activeTab: GeneratorTabType;
  onSelectTab: (tab: GeneratorTabType) => void;
}

const TABS: { type: GeneratorTabType; label: string; icon: React.ElementType }[] = [
  { type: 'URL', label: 'URL', icon: Link },
  { type: 'Text', label: 'Text', icon: FileText },
  { type: 'WiFi', label: 'WiFi', icon: Wifi },
  { type: 'Email', label: 'Email', icon: Mail },
  { type: 'Phone', label: 'Phone', icon: Phone },
  { type: 'SMS', label: 'SMS', icon: MessageSquare },
  { type: 'WhatsApp', label: 'WhatsApp', icon: MessageCircle },
  { type: 'vCard', label: 'vCard', icon: User },
];

export const GeneratorTabs: React.FC<GeneratorTabsProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="w-full">
      <div 
        tabIndex={0}
        role="region"
        aria-label="QR Code Generator Types"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 rounded-[10px]"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.type;
          return (
            <button
              key={tab.type}
              onClick={() => onSelectTab(tab.type)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] text-[14px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#F5F3FF] text-[#635BFF] font-semibold shadow-2xs border border-[#635BFF]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#635BFF]' : 'text-[#6B7280]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
