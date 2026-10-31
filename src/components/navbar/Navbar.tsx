"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Terminal, Download, Menu, X, ArrowUpRight } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-full px-3.5 py-2 sm:px-6 sm:py-3 flex items-center justify-between border border-white/15 bg-[#050b18]/85 backdrop-blur-xl shadow-2xl shadow-black/35 transition-all">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0" aria-label="RondonTech Home">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-[#000d10] border border-cyan-400/40 shadow-md shadow-cyan-500/20 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300 group-hover:shadow-cyan-400/40">
              <Image
                src="/brand/rondontech-emblem-circle.webp"
                alt="RondonTech Emblem"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-white">
                RONDONTECH<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                PRO
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-zinc-300">
            <a href="#cinematica" className="hover:text-cyan-300 transition-colors">
              // Cinemática
            </a>
            <a href="#especialidades" className="hover:text-cyan-300 transition-colors">
              // Especialidades
            </a>
            <a href="#experiencia" className="hover:text-cyan-300 transition-colors">
              // Trayectoria
            </a>
            <a href="#consola" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#bc7155]" />
              Consola
            </a>
            <a href="#habilidades" className="hover:text-cyan-300 transition-colors">
              // Skills
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={triggerDownloadCV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>CV [PDF]</span>
            </button>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold text-white bg-[#bc7155] hover:bg-[#a55f46] transition-all duration-300 shadow-md shadow-[#bc7155]/30 cursor-pointer"
            >
              <span>Contacto</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button (Circular Icon Button) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 rounded-3xl border border-white/15 bg-[#060d1e]/95 backdrop-blur-2xl shadow-2xl shadow-black/60 flex flex-col gap-2.5 font-mono text-xs uppercase tracking-wider text-zinc-200">
            <a
              href="#cinematica"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-white/10 hover:text-cyan-300 transition-colors"
            >
              // Cinemática
            </a>
            <a
              href="#especialidades"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-white/10 hover:text-cyan-300 transition-colors"
            >
              // Especialidades
            </a>
            <a
              href="#experiencia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-white/10 hover:text-cyan-300 transition-colors"
            >
              // Trayectoria
            </a>
            <a
              href="#consola"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-white/10 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-[#bc7155]" />
              Consola
            </a>
            <a
              href="#habilidades"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full hover:bg-white/10 hover:text-cyan-300 transition-colors"
            >
              // Skills
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerDownloadCV();
              }}
              className="py-2.5 px-3 rounded-full bg-white/10 border border-white/15 text-white font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              Descargar CV [PDF]
            </button>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-full bg-[#bc7155] text-white font-bold text-center shadow-md shadow-[#bc7155]/30"
            >
              Iniciar Contacto
            </a>
          </div>
        )}
      </div>
    </header>
  );
}