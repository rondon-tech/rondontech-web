"use client";

import React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Download, ArrowRight, ShieldCheck, Radio, Sparkles, MapPin } from "lucide-react";

export function HeroEditorial() {
  const triggerDownloadCV = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.3 },
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
    <section className="relative pt-24 pb-14 sm:pt-36 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Top Status & Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#d5d3d4]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-zinc-700 font-semibold">
            INGENIERO EN ELECTRÓNICA & TELECOMUNICACIONES // SANTIAGO, CL
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] sm:text-xs text-zinc-600">
          <span className="hidden md:inline">DISPONIBILIDAD: PROYECTOS CRÍTICOS & CONSULTORÍA</span>
          <span className="px-2.5 py-1 rounded-full bg-[#000d10]/5 text-[#000d10] font-bold border border-[#d5d3d4]">
            RONDONTECH v3.1
          </span>
        </div>
      </div>

      {/* Main Architectural Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Massive Editorial Typography */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Hero Wordmark with signature Hyer stop */}
          <div className="space-y-1">
            <h1 className="font-display-hero text-[#000d10] uppercase tracking-[-0.035em] leading-[0.92] break-words text-[34px] xs:text-[44px] sm:text-6xl md:text-7xl lg:text-[110px] xl:text-[150px] 2xl:text-[180px]">
              RONDONTECH<span className="text-[#bc7155]">.</span>
            </h1>
            <div className="h-1.5 w-20 sm:w-24 bg-[#bc7155] rounded-full mt-2" />
          </div>

          {/* Secondary Hero Headline (60-63px) */}
          <h2 className="font-display-63 text-[#000d10] tracking-tight">
            Beyond <br />
            <span className="text-zinc-600">Infrastructure.</span>
          </h2>

          {/* Calibrated Editorial Body Copy with high contrast */}
          <p className="font-body-editorial text-zinc-700 max-w-2xl text-base sm:text-lg sm:leading-relaxed">
            Soluciones de alta fidelidad que conectan el terreno físico con el cómputo cognitivo.
            Especialista en redes celulares <strong>5G/RF</strong>, salas de datos de alta disponibilidad,
            domótica e inmótica corporativa en <strong>Ablu Tech SpA</strong>, y automatización con <strong>Agentes de IA Autónomos</strong>.
          </p>

          {/* Full Pill CTAs (1000px border radius) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <a href="#cinematica" className="btn-pill-dark w-full sm:w-auto">
              <span>Explorar Secuencia Cinemática</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button onClick={triggerDownloadCV} className="btn-pill-clay w-full sm:w-auto cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Descargar Currículum [PDF]</span>
            </button>

            <a href="#contacto" className="btn-pill-ghost w-full sm:w-auto">
              <span>Iniciar Contacto</span>
            </a>
          </div>

          {/* Editorial Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#d5d3d4]">
            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Experiencia
              </div>
              <div className="font-mono text-2xl font-bold text-[#000d10]">
                +6 Años
              </div>
              <div className="text-xs text-zinc-600">Telecom & Terreno</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Despliegues
              </div>
              <div className="font-mono text-2xl font-bold text-[#000d10]">
                +500 Sitios
              </div>
              <div className="text-xs text-zinc-600">Entel / Movistar 5G</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Empresa
              </div>
              <div className="font-mono text-2xl font-bold text-[#bc7155]">
                Ablu Tech
              </div>
              <div className="text-xs text-zinc-600">Fundador & COO</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Innovación
              </div>
              <div className="font-mono text-2xl font-bold text-[#000d10]">
                AI Agents
              </div>
              <div className="text-xs text-zinc-600">Google Antigravity</div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Portrait Showcase Card */}
        <div className="lg:col-span-4 relative mt-4 lg:mt-0">
          <div className="relative bg-white border border-[#d5d3d4] p-4 sm:p-6 shadow-xl shadow-black/5">
            {/* Image Container with high contrast border */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#000d10]">
              <Image
                src="/avatar/avatar-portrait.webp"
                alt="Abrahan Rondon - Ingeniero en Electrónica y Telecomunicaciones"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d10]/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Tag in image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  ABRAHAN RONDON ARTEAGA
                </span>
                <p className="font-mono text-xs text-white/90 mt-1">
                  Ingeniero Titulado · Registro Colegiado
                </p>
              </div>
            </div>

            {/* Micro details beneath portrait */}
            <div className="mt-4 pt-4 border-t border-[#d5d3d4] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-600">UBICACIÓN</span>
                <span className="text-[#000d10] font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#bc7155]" /> Santiago de Chile
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-600">DOMINIO WEB</span>
                <span className="text-[#000d10] font-semibold">rondontech.com</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-600">ENFOQUE</span>
                <span className="text-[#bc7155] font-semibold">5G, Infraestructura & AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}