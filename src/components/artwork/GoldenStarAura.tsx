import React from 'react';

interface GoldenStarAuraProps {
  density?: 'gentle' | 'vibrant' | 'luxury';
  enableAnimation?: boolean;
  className?: string;
}

export const GoldenStarAura: React.FC<GoldenStarAuraProps> = ({
  density = 'luxury',
  enableAnimation = true,
  className = '',
}) => {
  const isGentle = density === 'gentle';

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none flex items-center justify-center -z-10 ${className}`}
      style={{
        // Extend well beyond the circular photo frame
        transform: 'scale(1.45)',
        transformOrigin: 'center center',
      }}
      aria-hidden="true"
    >
      {/* 1. Ambient Warm Golden Radial Glow */}
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0.22) 48%, rgba(217, 119, 6, 0.08) 68%, transparent 75%)',
          filter: 'blur(8px)',
        }}
      />

      {/* 2. SVG Vector Star Rays and Geometric Elements */}
      <svg
        viewBox="0 0 300 300"
        className={`w-full h-full absolute inset-0 ${
          enableAnimation ? 'animate-slow-spin-aura' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden Gradients */}
          <linearGradient id="goldRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#fde047" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="starShineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="80%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Radiant Sunburst Spikes (16 rays) */}
        <g opacity={isGentle ? '0.45' : '0.8'}>
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <line
                key={`ray-${i}`}
                x1="150"
                y1="150"
                x2={150 + Math.cos((angle * Math.PI) / 180) * 135}
                y2={150 + Math.sin((angle * Math.PI) / 180) * 135}
                stroke="url(#goldRayGrad)"
                strokeWidth={i % 2 === 0 ? '2.5' : '1.2'}
                strokeLinecap="round"
                strokeDasharray={i % 2 === 0 ? '6 3' : 'none'}
              />
            );
          })}
        </g>

        {/* Delicate Golden Concentric Halo Ring */}
        <circle
          cx="150"
          cy="150"
          r="105"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.5"
        />
        <circle
          cx="150"
          cy="150"
          r="125"
          stroke="#fbbf24"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          opacity="0.4"
        />

        {/* 8-Pointed Islamic Geometric Radiant Stars (Subtle at cardinal & diagonal points) */}
        {!isGentle && (
          <g opacity="0.6">
            <polygon
              points="150,22 154,34 166,38 154,42 150,54 146,42 134,38 146,34"
              fill="url(#starShineGrad)"
            />
            <polygon
              points="150,246 154,258 166,262 154,266 150,278 146,266 134,262 146,258"
              fill="url(#starShineGrad)"
            />
            <polygon
              points="22,150 34,154 38,166 42,154 54,150 42,146 38,134 34,146"
              fill="url(#starShineGrad)"
            />
            <polygon
              points="246,150 258,154 262,166 266,154 278,150 266,146 262,134 258,146"
              fill="url(#starShineGrad)"
            />
          </g>
        )}
      </svg>

      {/* 3. Golden Sparkling Diamond Stars Layer (Scattered around outer perimeter) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-Right Big Sparkling Star */}
        <div
          className={`absolute top-[4%] right-[8%] w-7 h-7 ${
            enableAnimation ? 'animate-twinkle-fast' : ''
          }`}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]">
            <path
              d="M20 0 Q20 20 40 20 Q20 20 20 40 Q20 20 0 20 Q20 20 20 0 Z"
              fill="url(#starShineGrad)"
            />
            <circle cx="20" cy="20" r="3.5" fill="#ffffff" />
          </svg>
        </div>

        {/* Top-Left Sparkling Star */}
        <div
          className={`absolute top-[8%] left-[10%] w-6 h-6 ${
            enableAnimation ? 'animate-twinkle-mid' : ''
          }`}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_5px_rgba(251,191,36,0.85)]">
            <path
              d="M20 0 Q20 20 40 20 Q20 20 20 40 Q20 20 0 20 Q20 20 20 0 Z"
              fill="url(#starShineGrad)"
            />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom-Right Sparkling Star */}
        <div
          className={`absolute bottom-[6%] right-[10%] w-6 h-6 ${
            enableAnimation ? 'animate-twinkle-slow' : ''
          }`}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_5px_rgba(251,191,36,0.85)]">
            <path
              d="M20 0 Q20 20 40 20 Q20 20 20 40 Q20 20 0 20 Q20 20 20 0 Z"
              fill="url(#starShineGrad)"
            />
            <circle cx="20" cy="20" r="2.8" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom-Left Sparkling Star */}
        <div
          className={`absolute bottom-[8%] left-[7%] w-7 h-7 ${
            enableAnimation ? 'animate-twinkle-fast' : ''
          }`}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]">
            <path
              d="M20 0 Q20 20 40 20 Q20 20 20 40 Q20 20 0 20 Q20 20 20 0 Z"
              fill="url(#starShineGrad)"
            />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
          </svg>
        </div>

        {/* Top-Center Star Crown */}
        <div
          className={`absolute top-[0%] left-1/2 -translate-x-1/2 w-5 h-5 ${
            enableAnimation ? 'animate-twinkle-mid' : ''
          }`}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_4px_rgba(251,191,36,0.9)]">
            <path
              d="M20 2 Q20 20 38 20 Q20 20 20 38 Q20 20 2 20 Q20 20 20 2 Z"
              fill="#fbbf24"
            />
            <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
          </svg>
        </div>

        {/* Secondary Shimmer Dots and Micro-Sparkles */}
        <div className="absolute top-[22%] right-[2%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#fbbf24]" />
        <div className="absolute top-[28%] left-[3%] w-2.5 h-2.5 rounded-full bg-yellow-200 shadow-[0_0_7px_#fde047]" />
        <div className="absolute bottom-[24%] right-[4%] w-2 h-2 rounded-full bg-yellow-100 shadow-[0_0_5px_#fef08a]" />
        <div className="absolute bottom-[20%] left-[2%] w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
        <div className="absolute top-[14%] right-[24%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
        <div className="absolute bottom-[12%] left-[26%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_4px_#fde047]" />
      </div>
    </div>
  );
};
