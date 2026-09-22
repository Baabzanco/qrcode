import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'p-6',
}) => {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${padding} ${className}`}
    >
      {children}
    </div>
  );
};
