"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Terminal, Download, Radio, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerDownloadCV = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.15 },
      colors: ["#bc7155", "#000d10", "#8e8e95", "#00f0ff"],
    });

    const link = document.createElement("a");
    link.href = "/cv/CV_Abrahan_Rondon.pdf";
    link.download = "CV_Abrahan_Rondon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-full px-6 py-3 flex items-center justify-between border border-[#d5d3d4] bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 transition-all">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#000d10] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-bold tracking-tight text-[#000d10]">
                RONDONTECH<span className="text-[#bc7155]">.</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#000d10]/5 text-[#8e8e95] border border-[#d5d3d4]">
                PRO
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#8e8e95]">
            <a href="#cinematica" className="hover:text-[#000d10] transition-colors">
              // Cinemática
            </a>
            <a href="#especialidades" className="hover:text-[#000d10] transition-colors">
              // Especialidades
            </a>
            <a href="#experiencia" className="hover:text-[#000d10] transition-colors">
              // Trayectoria
            </a>
            <a href="#consola" className="hover:text-[#000d10] transition-colors flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#bc7155]" />
              Consola
            </a>
            <a href="#habilidades" className="hover:text-[#000d10] transition-colors">
              // Skills
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={triggerDownloadCV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold text-white bg-[#000d10] hover:bg-[#1f2937] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV [PDF]</span>
            </button>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold text-white bg-[#bc7155] hover:bg-[#a55f46] transition-all duration-300 shadow-sm shadow-[#bc7155]/20 cursor-pointer"
            >
              <span>Contacto</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button (Circular Icon Button) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-[#000d10] text-white flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 rounded-3xl border border-[#d5d3d4] bg-white/95 backdrop-blur-2xl shadow-xl flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-[#000d10]">
            <a
              href="#cinematica"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-zinc-100"
            >
              // Cinemática
            </a>
            <a
              href="#especialidades"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-zinc-100"
            >
              // Especialidades
            </a>
            <a
              href="#experiencia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-zinc-100"
            >
              // Trayectoria
            </a>
            <a
              href="#consola"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-zinc-100 flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-[#bc7155]" />
              Consola
            </a>
            <a
              href="#habilidades"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-zinc-100"
            >
              // Skills
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full bg-[#bc7155] text-white font-bold text-center"
            >
              Iniciar Contacto
            </a>
          </div>
        )}
      </div>
    </header>
  );
}