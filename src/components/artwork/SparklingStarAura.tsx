import React from 'react';

interface SparklingStarAuraProps {
  className?: string;
}

export const SparklingStarAura: React.FC<SparklingStarAuraProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-[-20%] pointer-events-none select-none z-0 flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full animate-[spin_40s_linear_infinite]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial Gold Glow */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>

          {/* Shimmer Gold Gradient for Rays */}
          <linearGradient id="rayGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#fde047" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </linearGradient>

          <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Radiant Soft Halo */}
        <circle cx="150" cy="150" r="130" fill="url(#starGlow)" />

        {/* 12 Radiant Golden Rays Bursting Outward */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
          <g key={`ray-${idx}`} transform={`rotate(${angle} 150 150)`}>
            <polygon
              points="150,15 153,100 147,100"
              fill="url(#rayGold)"
              opacity={idx % 2 === 0 ? '0.75' : '0.45'}
              filter="url(#goldShine)"
            />
            {/* Small circular pearl/dot at ray tip */}
            <circle cx="150" cy="18" r={idx % 2 === 0 ? '3' : '2'} fill="#fef08a" />
          </g>
        ))}

        {/* Inner 8 Sparkling 4-Pointed Diamonds */}
        {[15, 60, 105, 150, 195, 240, 285, 330].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const dist = 120;
          const cx = 150 + dist * Math.cos(rad);
          const cy = 150 + dist * Math.sin(rad);
          const size = idx % 2 === 0 ? 10 : 7;
          return (
            <g key={`diamond-${idx}`} transform={`translate(${cx}, ${cy})`}>
              <path
                d={`M 0 -${size} Q 0 0 ${size} 0 Q 0 0 0 ${size} Q 0 0 -${size} 0 Q 0 0 0 -${size} Z`}
                fill="#fef08a"
                stroke="#d97706"
                strokeWidth="0.8"
                filter="url(#goldShine)"
              />
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </g>
          );
        })}

        {/* Floating Twinkle Sparkles */}
        {[45, 135, 225, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const dist = 138;
          const cx = 150 + dist * Math.cos(rad);
          const cy = 150 + dist * Math.sin(rad);
          return (
            <g key={`sparkle-${idx}`} transform={`translate(${cx}, ${cy})`}>
              <circle cx="0" cy="0" r="3" fill="#ffffff" filter="url(#goldShine)" />
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#fef08a" strokeWidth="1.2" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#fef08a" strokeWidth="1.2" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
