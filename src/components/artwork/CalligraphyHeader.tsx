import React from 'react';

interface CalligraphyHeaderProps {
  title?: string;
  className?: string;
}

export const CalligraphyHeader: React.FC<CalligraphyHeaderProps> = ({
  title = 'مجمع سيد الشهداء',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Decorative Top Flourish */}
      <div className="flex items-center gap-2 mb-1">
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
          <path d="M40 6C30 6 25 1 20 6C15 11 10 6 0 6" stroke="#92400e" strokeWidth="1.5" />
          <circle cx="20" cy="6" r="2" fill="#d97706" />
        </svg>
        <span className="text-amber-800 text-xs">﷽</span>
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
          <path d="M0 6C10 6 15 1 20 6C25 11 30 6 40 6" stroke="#92400e" strokeWidth="1.5" />
          <circle cx="20" cy="6" r="2" fill="#d97706" />
        </svg>
      </div>

      {/* Main Calligraphy Logo */}
      <div className="relative inline-flex items-center justify-center">
        {/* If title is the default or contains 'مجمع سيد الشهداء', render the signature stylized Thuluth calligraphy layout */}
        <div className="font-['Amiri',serif] font-bold text-3xl sm:text-4xl text-slate-900 tracking-wide text-center drop-shadow-sm flex items-center justify-center gap-2">
          <span>{title}</span>
          <span className="text-xl sm:text-2xl text-amber-800 font-semibold align-super">
            (ع)
          </span>
        </div>
      </div>

      {/* Decorative Underline Ornament */}
      <div className="flex items-center justify-center gap-1.5 mt-1.5">
        <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-amber-600 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-amber-600 bg-amber-100" />
        <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-amber-600 to-transparent" />
      </div>
    </div>
  );
};
