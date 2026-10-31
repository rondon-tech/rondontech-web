"use client";

import React, { useState } from "react";
import Image from "next/image";
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#bc7155", "#000d10", "#ffffff", "#00f0ff"],
    });

    const link = document.createElement("a");
    link.href = "/cv/CV_Abrahan_Rondon.pdf";
    link.download = "CV_Abrahan_Rondon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer id="contacto" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#000d10] text-white relative z-10 border-t border-white/10 w-full max-w-full min-w-0 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 w-full min-w-0">
        {/* Main Editorial CTA Card */}
        <div className="bg-[#151623] border border-white/15 p-6 sm:p-12 lg:p-16 rounded-none relative overflow-hidden w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-w-0">
            {/* Left Column: Big Statement */}
            <div className="lg:col-span-8 space-y-6 w-full min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">DISPONIBLE PARA PROYECTOS & CONSULTORÍA CRÍTICA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight break-words">
                Construyamos la Próxima <br />
                <span className="text-[#bc7155]">Frontera Tecnológica.</span>
              </h2>

              <p className="font-body-editorial text-zinc-300 max-w-xl text-sm sm:text-base lg:text-lg break-words leading-relaxed">
                Ya sea para modernización de redes de telecomunicaciones, auditorías de centros de datos,
                domótica de alta gama con Ablu Tech o sistemas autónomos de IA, conversemos directamente.
              </p>

              {/* Action Buttons in 1000px Pills - Full Width on Mobile */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <a
                  href={`https://wa.me/${PROFILE_DATA.phone.replace(/[^0-9]/g, "")}?text=Hola%20Abrahan,%20vi%20tu%20perfil%20en%20rondontech.com%20y%20me%20gustar%C3%ADa%20conversar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-clay w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar vía WhatsApp</span>
                </a>

                <button onClick={copyEmail} className="btn-pill-ghost-light w-full sm:w-auto cursor-pointer">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{PROFILE_DATA.email} (Copiado)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Correo Electrónico</span>
                    </>
                  )}
                </button>

                <button onClick={triggerDownloadCV} className="btn-pill-ghost-light w-full sm:w-auto cursor-pointer">
                  <Download className="w-4 h-4" />
                  <span>Descargar CV [PDF]</span>
                </button>
              </div>
            </div>

            {/* Right Column: Contact Portrait Badge */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-end justify-center">
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-white/20 p-2 bg-[#0f0f1c] overflow-hidden shadow-2xl">
                <Image
                  src="/avatar/avatar-contact.webp"
                  alt="Abrahan Rondon"
                  fill
                  sizes="(max-width: 640px) 160px, 208px"
                  className="object-cover object-top filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000d10]/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mt-4 text-center sm:text-right">
                <div className="font-mono text-sm font-bold text-white">Abrahan Isaac Rondon Arteaga</div>
                <div className="font-mono text-xs text-zinc-400">Ingeniero en Electrónica & Telecomunicaciones</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10 items-end">
          {/* Brand mark */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-cyan-400/50 shadow-lg shadow-cyan-500/30 shrink-0 bg-[#000d10] group">
                <Image
                  src="/brand/rondontech-emblem-circle.webp"
                  alt="RondonTech Official Logo"
                  fill
                  sizes="56px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white block break-words">
                RONDONTECH<span className="text-[#bc7155]">.</span>
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400 max-w-sm">
              Plataforma profesional y portafolio de ingeniería de Abrahan Rondon.
              Telecomunicaciones 5G, Centros de Datos, Domótica Inmótica y Software Cloud.
            </p>
          </div>

          {/* Quick links & metadata */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-5 font-mono text-xs text-zinc-400">
            <a
              href="https://ablutech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Ablu Tech Ltda. <ArrowUpRight className="w-3.5 h-3.5 text-[#bc7155]" />
            </a>
            <a
              href="https://linkedin.com/in/abrahan-rondon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5 text-[#bc7155]" />
            </a>
            <span>Santiago, Chile · 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}