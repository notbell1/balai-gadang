import React from 'react';

/**
 * AnimatedBackground
 * Menghadirkan efek gerak halus ("tipis-tipis") di latar belakang seluruh halaman
 * Menggunakan gradasi warna khas (Purple #633B83/#7E549E & Amber/Orange #FCA228)
 * Dilengkapi dengan pointer-events-none & optimasi rendering tanpa mengganggu interaktivitas.
 */
export const AnimatedBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
    >
      {/* 1. Large Ambient Soft Orbs with organic floating movement */}
      {/* Top Left: Royal Purple Soft Glow */}
      <div
        className="absolute -top-[12%] -left-[8%] w-[32rem] sm:w-[42rem] h-[32rem] sm:h-[42rem] rounded-full bg-[#633B83]/8 blur-[120px] animate-float-slow"
        style={{ willChange: 'transform' }}
      />

      {/* Top Right: Warm Amber/Orange Soft Glow */}
      <div
        className="absolute top-[8%] -right-[12%] w-[28rem] sm:w-[38rem] h-[28rem] sm:h-[38rem] rounded-full bg-[#FCA228]/8 blur-[110px] animate-float-reverse"
        style={{ willChange: 'transform' }}
      />

      {/* Mid Left: Medium Purple & Lavender Glow */}
      <div
        className="absolute top-[40%] -left-[15%] w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] rounded-full bg-[#7E549E]/7 blur-[130px] animate-float-slow"
        style={{ willChange: 'transform' }}
      />

      {/* Mid Right: Gold & Yellow-Orange Glow */}
      <div
        className="absolute top-[58%] -right-[10%] w-[26rem] sm:w-[34rem] h-[26rem] sm:h-[34rem] rounded-full bg-[#FCCB5D]/8 blur-[100px] animate-float-reverse"
        style={{ willChange: 'transform' }}
      />

      {/* Bottom Center: Deep Purple Subtle Accent */}
      <div
        className="absolute -bottom-[10%] left-[20%] w-[35rem] sm:w-[45rem] h-[35rem] sm:h-[45rem] rounded-full bg-[#633B83]/6 blur-[140px] animate-float-gentle"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Floating Delicate Geometric Rings & Topographic Curves */}
      <div className="absolute top-[18%] left-[8%] opacity-[0.06] animate-rotate-slow">
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#7E549E" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="60" stroke="#FCA228" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" stroke="#633B83" strokeWidth="1.5" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="absolute top-[65%] right-[6%] opacity-[0.05] animate-rotate-slow" style={{ animationDirection: 'reverse' }}>
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="85" stroke="#FCA228" strokeWidth="1.5" strokeDasharray="5 7" />
          <circle cx="100" cy="100" r="55" stroke="#7E549E" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 3. Subtle Floating Ambient Dots / Stardust */}
      <div className="absolute top-[25%] left-[22%] w-2 h-2 rounded-full bg-[#FCA228] opacity-25 animate-drift-1 blur-[0.5px]" />
      <div className="absolute top-[35%] right-[28%] w-2.5 h-2.5 rounded-full bg-[#7E549E] opacity-25 animate-drift-2 blur-[0.5px]" />
      <div className="absolute top-[52%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#FCCB5D] opacity-30 animate-drift-3 blur-[0.5px]" />
      <div className="absolute top-[75%] left-[45%] w-2 h-2 rounded-full bg-[#8F66AC] opacity-20 animate-drift-1 blur-[0.5px]" />
      <div className="absolute top-[85%] right-[18%] w-3 h-3 rounded-full bg-[#FCA228] opacity-20 animate-drift-2 blur-[1px]" />
      <div className="absolute top-[12%] right-[40%] w-1.5 h-1.5 rounded-full bg-[#633B83] opacity-25 animate-drift-3 blur-[0.5px]" />

      {/* 4. Fine Subtle Grid / Dot Matrix Mask */}
      <div
        className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#7E549E_1px,transparent_1px)] [background-size:32px_32px]"
      />
    </div>
  );
};
