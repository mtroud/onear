import React from 'react';

interface ShrineDomeWatermarkProps {
  opacity?: number;
  className?: string;
}

export const ShrineDomeWatermark: React.FC<ShrineDomeWatermarkProps> = ({
  opacity = 0.35,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-y-0 left-0 w-1/2 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 600 700"
        className="w-full h-full object-cover origin-bottom-left"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMax slice"
      >
        <defs>
          <linearGradient id="goldDomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#e5c158" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#b8860b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b6508" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="sunburst" cx="25%" cy="65%" r="65%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fde68a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fdfbf7" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="minaretGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8860b" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8b6508" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Ambient warm aura */}
        <circle cx="150" cy="450" r="400" fill="url(#sunburst)" />

        {/* Minaret Column on far left */}
        <g opacity="0.85">
          {/* Minaret Base & Shaft */}
          <rect x="25" y="160" width="46" height="540" fill="url(#minaretGrad)" rx="2" />
          
          {/* Minaret Horizontal Ribs / Decorative bands */}
          <line x1="23" y1="200" x2="73" y2="200" stroke="#78350f" strokeWidth="3" opacity="0.4" />
          <line x1="23" y1="250" x2="73" y2="250" stroke="#78350f" strokeWidth="2" opacity="0.3" />
          <line x1="23" y1="300" x2="73" y2="300" stroke="#78350f" strokeWidth="2.5" opacity="0.4" />
          <line x1="23" y1="380" x2="73" y2="380" stroke="#78350f" strokeWidth="3" opacity="0.4" />
          <line x1="23" y1="460" x2="73" y2="460" stroke="#78350f" strokeWidth="2" opacity="0.3" />
          
          {/* Minaret Balcony (Muazzin Gallery) */}
          <path
            d="M15 160 C 15 150, 81 150, 81 160 L 73 175 L 23 175 Z"
            fill="#d4af37"
            stroke="#92400e"
            strokeWidth="1.5"
          />
          {/* Balcony Railing */}
          <rect x="18" y="142" width="60" height="18" fill="none" stroke="#b45309" strokeWidth="2" />
          <path d="M22 142 L22 160 M32 142 L32 160 M42 142 L42 160 M52 142 L52 160 M62 142 L62 160 M72 142 L72 160" stroke="#b45309" strokeWidth="1.5" />
          
          {/* Upper Minaret lantern */}
          <rect x="33" y="105" width="30" height="37" fill="url(#minaretGrad)" />
          {/* Upper dome of minaret */}
          <path d="M30 105 C 30 75, 66 75, 66 105 Z" fill="#d4af37" />
          {/* Minaret Spire & Crescent Finial */}
          <line x1="48" y1="75" x2="48" y2="35" stroke="#b45309" strokeWidth="2.5" />
          <circle cx="48" cy="55" r="4" fill="#d4af37" stroke="#b45309" strokeWidth="1" />
          <path d="M48 35 C 44 32, 44 26, 48 24 C 52 26, 52 32, 48 35 Z" fill="#f59e0b" />
          <path d="M48 24 A 6 6 0 1 1 54 18 A 5 5 0 1 0 48 24" fill="#f59e0b" />
        </g>

        {/* Grand Dome on the left */}
        <g opacity="0.75">
          {/* Dome Base Drum */}
          <rect x="0" y="520" width="320" height="180" fill="url(#goldDomeGrad)" />
          <path d="M0 520 Q 160 510 320 520" stroke="#b45309" strokeWidth="4" />
          
          {/* Dome Drum Arched Windows */}
          <g opacity="0.6">
            <path d="M40 550 C 40 535, 65 535, 65 550 L65 590 L40 590 Z" fill="#78350f" />
            <path d="M90 550 C 90 535, 115 535, 115 550 L115 590 L90 590 Z" fill="#78350f" />
            <path d="M140 550 C 140 535, 165 535, 165 550 L165 590 L140 590 Z" fill="#78350f" />
            <path d="M190 550 C 190 535, 215 535, 215 550 L215 590 L190 590 Z" fill="#78350f" />
            <path d="M240 550 C 240 535, 265 535, 265 550 L265 590 L240 590 Z" fill="#78350f" />
          </g>

          {/* Majestic Onion / Persian Shaped Golden Dome */}
          <path
            d="M -20 520 
               C 10 400, 70 300, 160 270 
               C 160 270, 162 250, 162 245
               C 162 250, 164 270, 164 270
               C 254 300, 314 400, 344 520
               Z"
            fill="url(#goldDomeGrad)"
            stroke="#b45309"
            strokeWidth="2"
          />

          {/* Dome ribs and reflections */}
          <path d="M 162 270 C 110 330, 40 430, 20 520" stroke="#fef08a" strokeWidth="3" opacity="0.6" fill="none" />
          <path d="M 162 270 C 140 330, 90 430, 70 520" stroke="#fef08a" strokeWidth="2.5" opacity="0.4" fill="none" />
          <path d="M 162 270 C 162 340, 150 440, 140 520" stroke="#fef08a" strokeWidth="2" opacity="0.3" fill="none" />
          <path d="M 162 270 C 184 330, 234 430, 254 520" stroke="#92400e" strokeWidth="2" opacity="0.3" fill="none" />

          {/* Dome Spire with Crescent */}
          <line x1="162" y1="245" x2="162" y2="180" stroke="#b45309" strokeWidth="3.5" />
          <circle cx="162" cy="215" r="7" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
          <circle cx="162" cy="195" r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
          <path d="M 162 180 A 10 10 0 1 1 172 170 A 8 8 0 1 0 162 180" fill="#f59e0b" />
        </g>
      </svg>
    </div>
  );
};
