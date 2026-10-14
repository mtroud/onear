import React from 'react';

interface ArabesqueCornersProps {
  opacity?: number;
  className?: string;
}

export const ArabesqueCorners: React.FC<ArabesqueCornersProps> = ({
  opacity = 0.9,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      {/* Top Right Corner Filigree */}
      <div className="absolute top-0 right-0 w-80 h-80 sm:w-96 sm:h-96">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arabesqueGold" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="25%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="75%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#713f12" />
            </radialGradient>
          </defs>

          {/* Master corner rosette flower 1 */}
          <g transform="translate(360, 40)">
            {/* 8 petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle})`}>
                <path
                  d="M0 -8 C 10 -22, 18 -42, 0 -62 C -18 -42, -10 -22, 0 -8 Z"
                  fill="url(#arabesqueGold)"
                  stroke="#451a03"
                  strokeWidth="1"
                />
                <circle cx="0" cy="-35" r="4" fill="#fef08a" />
              </g>
            ))}
            <circle cx="0" cy="0" r="14" fill="url(#flowerCenter)" stroke="#78350f" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#fff" opacity="0.8" />
          </g>

          {/* Secondary rosette flower 2 */}
          <g transform="translate(280, 25)">
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle})`}>
                <path
                  d="M0 -6 C 8 -16, 14 -32, 0 -45 C -14 -32, -8 -16, 0 -6 Z"
                  fill="url(#arabesqueGold)"
                  stroke="#451a03"
                  strokeWidth="1"
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="10" fill="url(#flowerCenter)" stroke="#78350f" strokeWidth="1.5" />
          </g>

          {/* Secondary rosette flower 3 */}
          <g transform="translate(375, 125)">
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle})`}>
                <path
                  d="M0 -6 C 8 -16, 14 -32, 0 -45 C -14 -32, -8 -16, 0 -6 Z"
                  fill="url(#arabesqueGold)"
                  stroke="#451a03"
                  strokeWidth="1"
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="10" fill="url(#flowerCenter)" stroke="#78350f" strokeWidth="1.5" />
          </g>

          {/* Intricate Swirling Stems and Tendrils */}
          <path
            d="M 400 0 C 350 20, 300 60, 260 120 C 220 180, 200 240, 200 320"
            stroke="url(#arabesqueGold)"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M 320 0 C 290 50, 240 100, 210 170 C 180 240, 150 280, 130 350"
            stroke="url(#arabesqueGold)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Leaflets and curl motifs */}
          <path
            d="M 260 120 C 240 110, 230 80, 250 65 C 270 50, 280 85, 260 120 Z"
            fill="url(#arabesqueGold)"
            stroke="#451a03"
            strokeWidth="1"
          />
          <path
            d="M 210 170 C 190 160, 180 130, 200 115 C 220 100, 230 135, 210 170 Z"
            fill="url(#arabesqueGold)"
            stroke="#451a03"
            strokeWidth="1"
          />
          <path
            d="M 230 210 C 250 220, 280 210, 285 180 C 290 150, 260 170, 230 210 Z"
            fill="url(#arabesqueGold)"
            stroke="#451a03"
            strokeWidth="1"
          />

          {/* Spiral flourishes */}
          <path
            d="M 280 160 C 310 170, 330 200, 320 230 C 310 260, 280 260, 270 240 C 260 220, 280 200, 300 210"
            stroke="url(#arabesqueGold)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="300" cy="210" r="3" fill="#b45309" />
          <circle cx="270" cy="240" r="2" fill="#b45309" />
          <circle cx="340" cy="260" r="4" fill="url(#flowerCenter)" stroke="#78350f" />
        </svg>
      </div>

      {/* Bottom Right Corner Filigree */}
      <div className="absolute bottom-0 right-0 w-80 h-80 sm:w-96 sm:h-96">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 400) scale(1, -1)">
            {/* Master corner rosette flower 1 */}
            <g transform="translate(360, 40)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <g key={idx} transform={`rotate(${angle})`}>
                  <path
                    d="M0 -8 C 10 -22, 18 -42, 0 -62 C -18 -42, -10 -22, 0 -8 Z"
                    fill="url(#arabesqueGold)"
                    stroke="#451a03"
                    strokeWidth="1"
                  />
                  <circle cx="0" cy="-35" r="4" fill="#fef08a" />
                </g>
              ))}
              <circle cx="0" cy="0" r="14" fill="url(#flowerCenter)" stroke="#78350f" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#fff" opacity="0.8" />
            </g>

            {/* Secondary rosette flower 2 */}
            <g transform="translate(280, 25)">
              {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                <g key={idx} transform={`rotate(${angle})`}>
                  <path
                    d="M0 -6 C 8 -16, 14 -32, 0 -45 C -14 -32, -8 -16, 0 -6 Z"
                    fill="url(#arabesqueGold)"
                    stroke="#451a03"
                    strokeWidth="1"
                  />
                </g>
              ))}
              <circle cx="0" cy="0" r="10" fill="url(#flowerCenter)" stroke="#78350f" strokeWidth="1.5" />
            </g>

            {/* Secondary rosette flower 3 */}
            <g transform="translate(375, 125)">
              {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                <g key={idx} transform={`rotate(${angle})`}>
                  <path
                    d="M0 -6 C 8 -16, 14 -32, 0 -45 C -14 -32, -8 -16, 0 -6 Z"
                    fill="url(#arabesqueGold)"
                    stroke="#451a03"
                    strokeWidth="1"
                  />
                </g>
              ))}
              <circle cx="0" cy="0" r="10" fill="url(#flowerCenter)" stroke="#78350f" strokeWidth="1.5" />
            </g>

            {/* Stems & curves */}
            <path
              d="M 400 0 C 350 20, 300 60, 260 120 C 220 180, 200 240, 200 320"
              stroke="url(#arabesqueGold)"
              strokeWidth="3.5"
              fill="none"
            />
            <path
              d="M 320 0 C 290 50, 240 100, 210 170 C 180 240, 150 280, 130 350"
              stroke="url(#arabesqueGold)"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Leaflet */}
            <path
              d="M 260 120 C 240 110, 230 80, 250 65 C 270 50, 280 85, 260 120 Z"
              fill="url(#arabesqueGold)"
              stroke="#451a03"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* Right Edge Connecting Border Pattern */}
      <div className="absolute top-1/4 right-0 bottom-1/4 w-12 flex flex-col items-center justify-around opacity-75">
        {[1, 2, 3].map((item) => (
          <div key={item} className="w-8 h-8 rounded-full border-2 border-amber-600/60 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-amber-600/40" />
          </div>
        ))}
      </div>
    </div>
  );
};
