import React from 'react';

/**
 * UisbLogo Component
 * Official Logo of Universitas Islam Sumatera Barat (UISB)
 * Purple & Orange Gradient Motif
 */
export const UisbLogo: React.FC<{
  className?: string;
  variant?: 'full' | 'icon-only' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ className = 'h-9 w-auto', variant = 'full', size }) => {
  if (variant === 'icon-only') {
    return (
      <svg
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Logo Simbol UISB"
      >
        <defs>
          <linearGradient id="uisbIcoOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB326" />
            <stop offset="45%" stopColor="#FCA228" />
            <stop offset="100%" stopColor="#E8830C" />
          </linearGradient>
          <linearGradient id="uisbIcoPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8F66AC" />
            <stop offset="50%" stopColor="#7E549E" />
            <stop offset="100%" stopColor="#5B3179" />
          </linearGradient>
        </defs>
        <path
          d="M42 28 C26 28 14 42 14 60 L14 120 C14 168 54 192 95 192 C114 192 125 186 134 176 C122 170 108 158 98 144 C84 148 68 142 58 130 C48 118 48 104 48 90 L48 60 C48 50 54 44 62 44 C70 44 76 50 76 60 L76 92 C76 106 88 118 102 118 C116 118 128 106 128 92 L128 60 C128 42 114 28 96 28 C78 28 64 42 64 60 L64 90"
          fill="none"
          stroke="url(#uisbIcoOrange)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M128 60 L128 120 C128 152 104 174 76 174 C58 174 44 164 34 150"
          fill="none"
          stroke="url(#uisbIcoPurple)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <path
          d="M128 60 C128 42 114 28 96 28 C78 28 64 42 64 60 L64 90"
          fill="none"
          stroke="url(#uisbIcoPurple)"
          strokeWidth="24"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <img
      src="/images/uisb.svg"
      alt="Logo Universitas Islam Sumatera Barat"
      className={className}
      onError={(e) => {
        // Fallback to embedded vector rendering if SVG file fetch fails
        (e.target as HTMLImageElement).src = '/images/uisb.png';
      }}
    />
  );
};

/**
 * KknBalaiGadangLogo Component
 * Official Badge of KKN Kelurahan Balai Gadang 2026
 * Minangkabau Gonjong, Sun, Green Fields, and Golden Accents
 */
export const KknBalaiGadangLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ className = 'h-10 w-10' }) => {
  return (
    <img
      src="/images/kkn.svg"
      alt="Logo KKN Kelurahan Balai Gadang 2026"
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/images/logo.png';
      }}
    />
  );
};
