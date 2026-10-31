"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Download, Copy, Check, Radio, ExternalLink, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "@/data/profileData";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerDownloadCV = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
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
    <footer id="contacto" className="py-24 px-4 sm:px-8 relative z-10 border-t border-cyan-500/15 bg-[#02050e]/90">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#060e22]/90 to-[#02050f]/90 text-center relative overflow-hidden mb-16 shadow-2xl shadow-cyan-950/40">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-mono text-xs tracking-wider uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Disponible para Oportunidades & Proyectos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            ¿Listo para construir el{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              siguiente nivel?
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-300 mb-8 leading-relaxed">
            Ya sea para liderar operaciones de telecomunicaciones 5G/RF, implementar proyectos de domótica y seguridad electrónica en Ablu Tech, o automatizar flujos empresariales con Inteligencia Artificial.
          </p>

          {/* Action Cards / Contact Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-2xl mx-auto">
            {/* WhatsApp */}
            <a
              href={PROFILE_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>Chatear por WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold border border-cyan-500/30 bg-[#091122] text-cyan-300 hover:bg-cyan-950/70 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66a1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
              </svg>
              <span>Perfil de LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            {/* Email Copy */}
            <button
              onClick={copyEmail}
              className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-medium border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-zinc-400" />}
              <span>{copied ? "¡Correo Copiado!" : PROFILE_DATA.email}</span>
            </button>

            {/* Download CV */}
            <button
              onClick={triggerDownloadCV}
              className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-medium border border-blue-500/30 bg-blue-950/40 text-blue-300 hover:bg-blue-900/60 hover:border-blue-400 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Descargar CV [PDF ATS]</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800/80 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 font-semibold">rondontech.com</span>
            <span>// Abrahan Isaac Rondon Arteaga</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://ablutech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>Ablu Tech</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>Santiago, Chile</span>
            <span>•</span>
            <span className="text-emerald-400">● 100% Edge Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
