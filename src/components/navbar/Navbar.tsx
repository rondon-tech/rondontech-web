"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Terminal, Download, Radio, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerDownloadCV = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 },
      colors: ["#00f0ff", "#0066ff", "#38bdf8", "#ffffff"],
    });

    const link = document.createElement("a");
    link.href = "/cv/CV_Abrahan_Rondon.pdf";
    link.download = "CV_Abrahan_Rondon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel rounded-full px-5 py-2.5 flex items-center justify-between border border-cyan-500/20 bg-[#060b18]/80 backdrop-blur-xl shadow-lg shadow-cyan-950/20">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center p-[1px] shadow-sm shadow-cyan-500/40">
              <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center">
                <Radio className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-wider text-white flex items-center gap-1.5">
                RONDON<span className="text-cyan-400">TECH</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">v2.6</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <a href="#especialidades" className="hover:text-cyan-300 transition-colors">
              // Especialidades
            </a>
            <a href="#experiencia" className="hover:text-cyan-300 transition-colors">
              // Trayectoria
            </a>
            <a href="#consola" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" />
              Consola
            </a>
            <a href="#habilidades" className="hover:text-cyan-300 transition-colors">
              // Skills
            </a>
            <a href="#contacto" className="hover:text-cyan-300 transition-colors">
              // Contacto
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={triggerDownloadCV}
              className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-md shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>CV [PDF]</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 glass-panel rounded-2xl border border-cyan-500/20 bg-[#060b18]/95 backdrop-blur-2xl flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-zinc-300">
            <a
              href="#especialidades"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-cyan-950/40 hover:text-cyan-300"
            >
              // Especialidades
            </a>
            <a
              href="#experiencia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-cyan-950/40 hover:text-cyan-300"
            >
              // Trayectoria
            </a>
            <a
              href="#consola"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-cyan-950/40 hover:text-cyan-300 flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Consola Interactiva
            </a>
            <a
              href="#habilidades"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-cyan-950/40 hover:text-cyan-300"
            >
              // Skills
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-cyan-950/40 hover:text-cyan-300"
            >
              // Contacto
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerDownloadCV();
              }}
              className="mt-2 w-full py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar CV [PDF]
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
