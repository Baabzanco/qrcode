import React from 'react';
import { ArrowUpRight, Scan, Search, Wrench, ShieldCheck, GitCompare, Eye } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  iconName: string;
  onClick?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Scan,
  Search,
  Wrench,
  ShieldCheck,
  GitCompare,
  Eye,
};

export const ToolCard: React.FC<ToolCardProps> = ({
  name,
  description,
  iconName,
  onClick,
}) => {
  const IconComponent = ICON_MAP[iconName] || Scan;

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-[#E5E7EB] hover:border-[#635BFF]/40 rounded-[14px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(99,91,255,0.08)] transition-all duration-150 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#F5F3FF] text-[#635BFF] flex items-center justify-center group-hover:bg-[#635BFF] group-hover:text-white transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-[#F9FAFB] text-[#6B7280] group-hover:bg-[#F5F3FF] group-hover:text-[#635BFF] flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-[16px] font-semibold text-[#111827] mb-1 group-hover:text-[#635BFF] transition-colors">
          {name}
        </h3>
        <p className="text-[14px] text-[#6B7280] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-[12px] font-medium text-[#6B7280]">
        <span>Browser Tool</span>
        <span className="text-[#635BFF] opacity-0 group-hover:opacity-100 transition-opacity">
          Launch tool &rarr;
        </span>
      </div>
    </div>
  );
};
