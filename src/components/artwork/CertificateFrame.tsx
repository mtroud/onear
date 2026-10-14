import React from 'react';
import { FrameStyle } from '../../types';

interface CertificateFrameProps {
  style: FrameStyle;
  className?: string;
}

export const CertificateFrame: React.FC<CertificateFrameProps> = ({ style, className = '' }) => {
  if (style === 'none') {
    return null;
  }

  // 1. Ornate Gold Frame (إطار ذهبي مزخرف)
  if (style === 'ornate_gold') {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
        {/* Outer and Inner Gold Borders */}
        <div className="absolute inset-3 sm:inset-5 border-2 border-amber-600/75 rounded-2xl shadow-xs" />
        <div className="absolute inset-4 sm:inset-6 border border-amber-700/40 rounded-xl" />
        <div className="absolute inset-5 sm:inset-7 border border-dashed border-amber-500/50 rounded-lg" />

        {/* 4 Ornate Floral Filigree Corners */}
        {/* Top-Left */}
        <div className="absolute top-3 sm:top-5 left-3 sm:left-5 w-14 h-14 sm:w-20 sm:h-20 text-amber-600/85">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path
              d="M 5 35 C 5 15, 15 5, 35 5 L 75 5 C 45 5, 25 25, 25 55 L 25 75 C 25 45, 5 45, 5 35 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M 2 40 C 2 12, 12 2, 40 2"
              stroke="#b45309"
              strokeWidth="3"
            />
            <path
              d="M 8 40 C 8 18, 18 8, 40 8"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="4" fill="#b45309" />
            <circle cx="16" cy="16" r="2" fill="#fef08a" />
            <path
              d="M 16 16 C 24 24, 30 20, 36 28 C 30 36, 24 30, 16 16"
              fill="#d97706"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Top-Right */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 w-14 h-14 sm:w-20 sm:h-20 text-amber-600/85 scale-x-[-1]">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path
              d="M 5 35 C 5 15, 15 5, 35 5 L 75 5 C 45 5, 25 25, 25 55 L 25 75 C 25 45, 5 45, 5 35 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M 2 40 C 2 12, 12 2, 40 2"
              stroke="#b45309"
              strokeWidth="3"
            />
            <path
              d="M 8 40 C 8 18, 18 8, 40 8"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="4" fill="#b45309" />
            <circle cx="16" cy="16" r="2" fill="#fef08a" />
            <path
              d="M 16 16 C 24 24, 30 20, 36 28 C 30 36, 24 30, 16 16"
              fill="#d97706"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Bottom-Left */}
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-14 h-14 sm:w-20 sm:h-20 text-amber-600/85 scale-y-[-1]">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path
              d="M 5 35 C 5 15, 15 5, 35 5 L 75 5 C 45 5, 25 25, 25 55 L 25 75 C 25 45, 5 45, 5 35 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M 2 40 C 2 12, 12 2, 40 2"
              stroke="#b45309"
              strokeWidth="3"
            />
            <path
              d="M 8 40 C 8 18, 18 8, 40 8"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="4" fill="#b45309" />
            <circle cx="16" cy="16" r="2" fill="#fef08a" />
            <path
              d="M 16 16 C 24 24, 30 20, 36 28 C 30 36, 24 30, 16 16"
              fill="#d97706"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Bottom-Right */}
        <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 w-14 h-14 sm:w-20 sm:h-20 text-amber-600/85 scale-[-1]">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path
              d="M 5 35 C 5 15, 15 5, 35 5 L 75 5 C 45 5, 25 25, 25 55 L 25 75 C 25 45, 5 45, 5 35 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M 2 40 C 2 12, 12 2, 40 2"
              stroke="#b45309"
              strokeWidth="3"
            />
            <path
              d="M 8 40 C 8 18, 18 8, 40 8"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="4" fill="#b45309" />
            <circle cx="16" cy="16" r="2" fill="#fef08a" />
            <path
              d="M 16 16 C 24 24, 30 20, 36 28 C 30 36, 24 30, 16 16"
              fill="#d97706"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Center Top & Bottom Floral Crest Accents */}
        <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-70">
          <div className="w-6 h-[1.5px] bg-amber-600" />
          <div className="w-2 h-2 rotate-45 bg-amber-600" />
          <div className="w-6 h-[1.5px] bg-amber-600" />
        </div>
      </div>
    );
  }

  // 2. Simple Modern Frame (إطار بسيط وناعم)
  if (style === 'simple_modern') {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
        {/* Clean dual perimeter lines */}
        <div className="absolute inset-3 sm:inset-5 border border-amber-900/25 rounded-xl" />
        <div className="absolute inset-4 sm:inset-6 border border-amber-700/20 rounded-lg" />

        {/* Minimalist corner cross-ticks */}
        <div className="absolute top-3 sm:top-5 left-3 sm:left-5 w-4 h-4 border-t-2 border-l-2 border-amber-800/60" />
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 w-4 h-4 border-t-2 border-r-2 border-amber-800/60" />
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-4 h-4 border-b-2 border-l-2 border-amber-800/60" />
        <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 w-4 h-4 border-b-2 border-r-2 border-amber-800/60" />
      </div>
    );
  }

  // 3. Islamic Geometric Frame (إطار إسلامي هندسي)
  if (style === 'islamic_geometric') {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
        {/* Geometric dual border */}
        <div className="absolute inset-3 sm:inset-5 border-2 border-amber-700/70 rounded-xl" />
        <div className="absolute inset-4 sm:inset-6 border border-amber-600/35 rounded-lg" />

        {/* 8-Pointed Star Medallions in Corners */}
        {/* Top-Left */}
        <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 w-7 h-7 sm:w-9 sm:h-9 text-amber-700">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
            <rect x="10" y="10" width="20" height="20" opacity="0.8" />
            <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" opacity="0.8" />
            <circle cx="20" cy="20" r="4" fill="#fef08a" />
          </svg>
        </div>

        {/* Top-Right */}
        <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 text-amber-700">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
            <rect x="10" y="10" width="20" height="20" opacity="0.8" />
            <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" opacity="0.8" />
            <circle cx="20" cy="20" r="4" fill="#fef08a" />
          </svg>
        </div>

        {/* Bottom-Left */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 w-7 h-7 sm:w-9 sm:h-9 text-amber-700">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
            <rect x="10" y="10" width="20" height="20" opacity="0.8" />
            <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" opacity="0.8" />
            <circle cx="20" cy="20" r="4" fill="#fef08a" />
          </svg>
        </div>

        {/* Bottom-Right */}
        <div className="absolute bottom-2.5 sm:bottom-4 right-2.5 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 text-amber-700">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
            <rect x="10" y="10" width="20" height="20" opacity="0.8" />
            <rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)" opacity="0.8" />
            <circle cx="20" cy="20" r="4" fill="#fef08a" />
          </svg>
        </div>

        {/* Side decorative diamond motifs */}
        <div className="absolute top-1/2 left-3 sm:left-5 -translate-y-1/2 w-2 h-2 rotate-45 bg-amber-600" />
        <div className="absolute top-1/2 right-3 sm:right-5 -translate-y-1/2 w-2 h-2 rotate-45 bg-amber-600" />
      </div>
    );
  }

  // 4. Double Royal Frame (إطار ملكي مزدوج)
  if (style === 'double_royal') {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
        {/* Thick Outer Border + Gap + Fine Inner Border */}
        <div className="absolute inset-3 sm:inset-5 border-[3px] border-amber-700/80 rounded-xl" />
        <div className="absolute inset-4 sm:inset-6.5 border-[1.5px] border-amber-500/70 rounded-lg" />

        {/* Solid corner brackets */}
        <div className="absolute top-3 sm:top-5 left-3 sm:left-5 w-6 h-6 border-t-[5px] border-l-[5px] border-amber-800" />
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 w-6 h-6 border-t-[5px] border-r-[5px] border-amber-800" />
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-6 h-6 border-b-[5px] border-l-[5px] border-amber-800" />
        <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 w-6 h-6 border-b-[5px] border-r-[5px] border-amber-800" />

        {/* Golden Diamond Studs */}
        <div className="absolute top-5 left-5 w-2 h-2 rotate-45 bg-amber-500 shadow-xs" />
        <div className="absolute top-5 right-5 w-2 h-2 rotate-45 bg-amber-500 shadow-xs" />
        <div className="absolute bottom-5 left-5 w-2 h-2 rotate-45 bg-amber-500 shadow-xs" />
        <div className="absolute bottom-5 right-5 w-2 h-2 rotate-45 bg-amber-500 shadow-xs" />
      </div>
    );
  }

  return null;
};
