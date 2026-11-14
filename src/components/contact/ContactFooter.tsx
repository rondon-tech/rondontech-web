"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Download, Copy, Check, ArrowUpRight, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "@/data/profileData";

interface InquiryTrack {
  id: "telecom" | "inmotica" | "ai-cloud";
  label: string;
  slaNote: string;
  whatsappGreeting: string;
}

const INQUIRY_TRACKS: InquiryTrack[] = [
  {
    id: "telecom",
    label: "Rol Senior / Telecom 5G",
    slaNote: "SLA estimado: respuesta directa en < 2h hábiles · Roles senior, RAN 5G, MMOO e infraestructura crítica.",
    whatsappGreeting:
      "Hola Abrahan, vi tu perfil en rondontech.com y me gustaría conversar sobre un Rol Senior o consultoría en Telecomunicaciones 5G / Infraestructura Crítica.",
  },
  {
    id: "inmotica",
    label: "Proyecto Inmótica / Ablu Tech",
    slaNote: "SLA estimado: respuesta en < 4h hábiles · Levantamiento técnico y solución llave en mano con Ablu Tech Ltda.",
    whatsappGreeting:
      "Hola Abrahan, vi tu perfil en rondontech.com y quiero evaluar un proyecto de Inmótica, Domótica o Seguridad Electrónica con Ablu Tech.",
  },
  {
    id: "ai-cloud",
    label: "Agentes IA & Software Cloud",
    slaNote: "SLA estimado: respuesta en < 4h hábiles · Arquitectura de agentes autónomos, automatización y plataformas cloud.",
    whatsappGreeting:
      "Hola Abrahan, vi tu perfil en rondontech.com y me interesa conversar sobre Agentes IA, automatización operativa y Software Cloud.",
  },
];

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<InquiryTrack["id"]>("telecom");

  const activeTrack =
    INQUIRY_TRACKS.find((track) => track.id === selectedTrackId) ?? INQUIRY_TRACKS[0];

  const sanitizedPhone = PROFILE_DATA.phone.replace(/[^0-9]/g, "");
  const whatsappHref = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(
    activeTrack.whatsappGreeting
  )}`;

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

              {/* Intent-Based Inquiry Tracks */}
              <div className="space-y-3 pt-1">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  Selecciona el foco de tu consulta:
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de consulta">
                  {INQUIRY_TRACKS.map((track) => {
                    const isSelected = track.id === activeTrack.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedTrackId(track.id)}
                        className={`px-3.5 py-2 rounded-full font-mono text-xs transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
                          isSelected
                            ? "bg-[#bc7155]/20 border-[#bc7155] text-white shadow-sm shadow-[#bc7155]/30"
                            : "bg-white/5 border-white/15 text-zinc-300 hover:border-white/35 hover:text-white"
                        }`}
                      >
                        {track.label}
                      </button>
                    );
                  })}
                </div>
                <p className="font-mono text-[11px] sm:text-xs text-cyan-300/90 flex items-start gap-2 leading-relaxed">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{activeTrack.slaNote}</span>
                </p>
              </div>

              {/* Action Buttons in 1000px Pills - Full Width on Mobile */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-clay w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Contactar vía WhatsApp</span>
                </a>

                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-ghost-light w-full sm:w-auto"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-[#bc7155] shrink-0" />
                </a>

                <button type="button" onClick={copyEmail} className="btn-pill-ghost-light w-full sm:w-auto cursor-pointer">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{PROFILE_DATA.email} (Copiado)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>Copiar Correo Electrónico</span>
                    </>
                  )}
                </button>

                <button type="button" onClick={triggerDownloadCV} className="btn-pill-ghost-light w-full sm:w-auto cursor-pointer">
                  <Download className="w-4 h-4 shrink-0" />
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
          {/* Brand mark - Exact BannerLogo.jpg Aerospace Typography */}
          <div className="md:col-span-7 space-y-3">
            <a href="#hero" className="inline-flex items-center gap-3.5 sm:gap-4.5 group select-none cursor-pointer">
              {/* Emblem with Cyan Orbital Halo */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-cyan-400/60 shadow-lg shadow-cyan-500/40 shrink-0 bg-[#000d10] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/brand/rondontech-emblem-circle.webp"
                  alt="RondonTech Emblem"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              {/* Exact BannerLogo Brand Typography: RONDON (White) + TECH (Cyan) + BEYOND INFRASTRUCTURE */}
              <div className="space-y-1">
                <div className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.08em] leading-none flex items-center">
                  <span className="text-white group-hover:text-zinc-100 transition-colors">RONDON</span>
                  <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(0,240,255,0.7)] group-hover:text-cyan-300 transition-colors">
                    TECH
                  </span>
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.28em] text-zinc-400 uppercase font-semibold">
                  BEYOND INFRASTRUCTURE
                </div>
              </div>
            </a>

            <p className="font-mono text-xs text-zinc-400 max-w-md pt-1">
              Plataforma profesional y portafolio de ingeniería de Abrahan Rondon.
              Telecomunicaciones 5G, Centros de Datos, Domótica Inmótica y Software Cloud.
            </p>
          </div>

          {/* Quick links & metadata */}
          <div className="md:col-span-5 flex flex-wrap items-center justify-start md:justify-end gap-5 font-mono text-xs text-zinc-400">
            <a
              href="https://ablutech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Ablu Tech Ltda. <ArrowUpRight className="w-3.5 h-3.5 text-[#bc7155]" />
            </a>
            <a
              href={PROFILE_DATA.linkedin}
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