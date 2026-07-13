"use client";

import { useState } from "react";
import PillButton from "./PillButton";
import MenuOverlay from "./MenuOverlay";

export default function HeaderLockup() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-bone-white border-none relative z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-ink-black flex-shrink-0" />
          <div className="text-[12px] uppercase font-normal text-ink-black tracking-normal leading-[1.43] hidden sm:block">
            UNIQUE PUBLIC INTERVENTIONS<br />
            IMMERSIVE ACTIVATIONS
          </div>
        </div>
        
        <PillButton onClick={() => setIsMenuOpen(true)}>Menu</PillButton>
      </header>
      
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
