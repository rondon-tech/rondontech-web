"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Download,
  ArrowRight,
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Globe,
  Cpu,
  ShieldCheck,
  Maximize2,
  X,
} from "lucide-react";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function HeroEditorial() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const profileVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isProfileVideoPlaying, setIsProfileVideoPlaying] = useState(true);
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Escape key listener for cinema modal
  useEffect(() => {
    if (!isCinemaModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCinemaModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCinemaModalOpen]);

  const toggleProfileVideoPlay = () => {
    if (!profileVideoRef.current) return;
    if (profileVideoRef.current.paused) {
      profileVideoRef.current.play().catch(() => {});
      setIsProfileVideoPlaying(true);
    } else {
      profileVideoRef.current.pause();
      setIsProfileVideoPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const triggerDownloadCV = () => {
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.45 },
      colors: ["#00f0ff", "#bc7155", "#ffffff", "#38bdf8"],
    });

    const link = document.createElement("a");
    link.href = "/cv/CV_Abrahan_Rondon.pdf";
    link.download = "CV_Abrahan_Rondon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative w-full max-w-full min-w-0 bg-gradient-to-b from-[#01030a] via-[#020510] to-[#000d10] text-white pt-20 sm:pt-24 pb-12 sm:pb-20 overflow-hidden"
    >
      {/* Semantic H1 for SEO & Screen Readers while keeping 3D video stage unobstructed */}
      <h1 className="sr-only">
        RondonTech — Beyond Infrastructure | Abrahan Rondon Arteaga, Ingeniero en Electrónica y Telecomunicaciones 5G, Domótica e Inmótica en Ablu Tech Ltda. e Inteligencia Artificial
      </h1>

      {/* Subtle Ambient Deep-Space Backdrop Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.06] pointer-events-none" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-72 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top HUD Telemetry & Audio Control Strip */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-white/10 w-full min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.18em] text-zinc-200 font-semibold truncate">
              INGENIERO EN ELECTRÓNICA & TELECOMUNICACIONES // SANTIAGO, CL
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs">
            <span className="hidden xl:inline text-zinc-400">
              DISPONIBILIDAD: PROYECTOS CRÍTICOS & CONSULTORÍA
            </span>

            {/* Optional Orbital Soundscape Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border transition-all cursor-pointer ${
                !isMuted
                  ? "bg-cyan-400/20 border-cyan-400/60 text-cyan-200 shadow-sm shadow-cyan-400/25"
                  : "bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300 hover:text-white"
              }`}
              aria-label={isMuted ? "Activar audio orbital" : "Silenciar audio orbital"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                  <span>Audio ON</span>
                </>
              )}
            </button>

            {/* Compact Play/Pause Control */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={togglePlayback}
                className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isPaused ? "Reproducir animación" : "Pausar animación"}
              >
                {isPaused ? (
                  <Play className="w-3 h-3 fill-current" />
                ) : (
                  <Pause className="w-3 h-3" />
                )}
              </button>
            )}

            {/* Official Brand Chip */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.06] text-white font-bold border border-white/15">
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-cyan-400/50 shadow-sm shadow-cyan-500/30">
                <Image
                  src="/brand/rondontech-emblem-circle.webp"
                  alt="RondonTech Emblem"
                  fill
                  sizes="16px"
                  className="object-cover"
                />
              </div>
              <span>RONDONTECH v3.2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Centerpiece Orbital Cinema Stage (Zero lateral clipping on mobile, seamless full-bleed cosmos on desktop) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto mt-2 sm:mt-1">
        <div className="relative w-full aspect-[16/9.2] sm:aspect-[16/8.6] lg:aspect-[16/7.9] max-h-[650px] mx-auto overflow-hidden bg-[#01030a]">
          {/* Layer 0: Instant LCP High-Resolution Keyframe Poster */}
          <Image
            src="/media/hero-orbital-poster.webp"
            alt="RondonTech — Beyond Infrastructure Orbital Presentation"
            fill
            priority
            sizes="100vw"
            className="object-contain sm:object-cover object-center select-none"
          />

          {/* Layer 1: Seamless Faststart 3D Orbital Video Loop */}
          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              src="/media/hero-orbital-intro.mp4"
              poster="/media/hero-orbital-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setIsVideoReady(true)}
              onPlaying={() => setIsVideoReady(true)}
              className={`absolute inset-0 w-full h-full object-contain sm:object-cover object-center transition-opacity duration-700 ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Layer 2: Multi-Directional Cosmic Vignette Masks for Invisible Edge Blending */}
          <div className="absolute inset-x-0 top-0 h-8 sm:h-16 bg-gradient-to-b from-[#01030a] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-12 sm:h-28 bg-gradient-to-t from-[#020510] via-[#020510]/45 to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-[#020510] to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-[#020510] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Editorial Glassmorphic Command Deck (Integrated harmoniously below the orbital horizon) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 -mt-2 sm:-mt-10 lg:-mt-16">
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-[#050b18]/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-10 overflow-hidden">
          {/* Luminous Top Horizon Hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full min-w-0">
            {/* Left Column: Kinetic Flare + Value Proposition + Pill CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 w-full min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                {/* Signature Kinetic Optical Flare Rail */}
                <div className="flare-track h-1.5 w-24 sm:w-36 rounded-full relative overflow-visible">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-[#bc7155] to-cyan-400 rounded-full opacity-90 shadow-sm shadow-cyan-400/30" />
                  <span className="flare" aria-hidden="true">
                    <b>
                      <i></i>
                      <em></em>
                    </b>
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cyan-300/90 font-semibold">
                  ARQUITECTURA FÍSICA & COGNITIVA
                </span>
              </div>

              {/* High-Contrast Editorial Value Proposition */}
              <p className="font-body-editorial text-zinc-200 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed">
                Soluciones de alta fidelidad que conectan el terreno físico con el cómputo cognitivo.
                Especialista en redes celulares <strong className="text-white font-semibold">5G/RF</strong>, salas de datos de alta disponibilidad,
                domótica e inmótica corporativa en <strong className="text-[#e89578] font-semibold">Ablu Tech Ltda.</strong>, y automatización con{" "}
                <strong className="text-cyan-300 font-semibold">Agentes de IA Autónomos</strong>.
              </p>

              {/* Full Pill CTAs (1000px border radius) */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1">
                <a
                  href="#cinematica"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#000d10] hover:bg-cyan-50 px-6 py-3.5 text-sm sm:text-base font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-cyan-500/15 w-full sm:w-auto"
                >
                  <span>Explorar Secuencia Cinemática</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={triggerDownloadCV}
                  className="btn-pill-clay !py-3.5 !px-6 !text-sm sm:!text-base w-full sm:w-auto cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Currículum [PDF]</span>
                </button>

                <a
                  href="#contacto"
                  className="btn-pill-ghost-light !py-3.5 !px-6 !text-sm sm:!text-base w-full sm:w-auto"
                >
                  <span>Iniciar Contacto</span>
                </a>
              </div>
            </div>

            {/* Right Column: Aerospace Executive Identity Credential */}
            <div className="lg:col-span-5 w-full min-w-0">
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-[#081226]/90 via-[#050b18]/95 to-[#020510]/98 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-4 sm:p-5 sm:py-6 overflow-hidden group hover:border-cyan-400/40 transition-all duration-500">
                {/* Luminous hairline and ambient radial flare */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-colors" />

                <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5">
                  {/* High-Impact Living Video Portrait Frame (3:4 Ratio) */}
                  <div className="relative w-36 sm:w-44 md:w-48 h-56 sm:h-64 md:h-72 shrink-0 rounded-2xl overflow-hidden border border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.25)] bg-[#000d10] group-hover:border-cyan-400/60 transition-all duration-300">
                    {/* Corner Telemetry Reticles */}
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/80 z-10 pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/80 z-10 pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/80 z-10 pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/80 z-10 pointer-events-none" />

                    {/* Living Profile Video */}
                    <video
                      ref={profileVideoRef}
                      src="/media/profile-video-3x4.mp4"
                      poster="/avatar/avatar-portrait.webp"
                      autoPlay={!prefersReducedMotion}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Live Status Indicator Pill (Top Left) */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#020510]/85 backdrop-blur-md border border-cyan-400/30 text-[9px] font-mono text-cyan-300 font-semibold shadow-md pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="tracking-wider uppercase">LIVE FEED</span>
                    </div>

                    {/* Interactive Overlay Controls (Bottom Pill) */}
                    <div className="absolute bottom-2.5 inset-x-2 z-10 flex items-center justify-between gap-1 px-2.5 py-1 rounded-full bg-[#020510]/85 backdrop-blur-md border border-cyan-400/35 text-[10px] font-mono text-cyan-300 shadow-lg">
                      <button
                        type="button"
                        onClick={toggleProfileVideoPlay}
                        className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                        title={isProfileVideoPlaying ? "Pausar video" : "Reproducir video"}
                      >
                        {isProfileVideoPlaying ? (
                          <Pause className="w-3 h-3 text-cyan-400" />
                        ) : (
                          <Play className="w-3 h-3 text-cyan-400" />
                        )}
                        <span>{isProfileVideoPlaying ? "PAUSA" : "PLAY"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsCinemaModalOpen(true)}
                        className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold text-cyan-300"
                        title="Ver toma panorámica completa 16:9 con audio"
                      >
                        <Maximize2 className="w-3 h-3 text-cyan-400" />
                        <span>16:9 HD</span>
                      </button>
                    </div>
                  </div>

                  {/* Identity Credentials Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1 text-center sm:text-left">
                    <div>
                      {/* Official Seal Badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 font-mono text-[10px] sm:text-[11px] text-cyan-300 font-semibold mb-2">
                        <span className="relative w-3.5 h-3.5 rounded-full overflow-hidden inline-block shrink-0">
                          <Image
                            src="/brand/rondontech-emblem-circle.webp"
                            alt="RondonTech Seal"
                            fill
                            sizes="14px"
                            className="object-cover"
                          />
                        </span>
                        <span>RondonTech® Official</span>
                      </div>

                      {/* Full Name */}
                      <h2 className="font-mono text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                        ABRAHAN RONDON ARTEAGA
                      </h2>

                      {/* Profession and Degree */}
                      <p className="font-mono text-xs text-zinc-300 leading-snug mt-1">
                        Ingeniero en Electrónica mención Control
                      </p>
                      <div className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Registro Colegiado & Titulado</span>
                      </div>
                    </div>

                    {/* Cyber-Telemetry Data Block */}
                    <div className="pt-3 mt-3 border-t border-white/10 space-y-2 text-[11px] sm:text-xs font-mono">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400">UBICACIÓN</span>
                        <span className="text-white font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#bc7155]" /> Santiago de Chile
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400">DOMINIO WEB</span>
                        <a
                          href="https://rondontech.com"
                          className="text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5 text-cyan-400" /> rondontech.com
                        </a>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400">ENFOQUE</span>
                        <span className="text-[#e89578] font-semibold flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-[#e89578]" /> 5G, Infraestructura & AI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Strip with ScrambleText Cyber-Decoding */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 border-t border-white/10">
            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Experiencia
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                <ScrambleText text="+10 Años" durationMs={800} delayMs={100} />
              </div>
              <div className="text-xs text-zinc-400">Telecom & Terreno</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Despliegues
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                <ScrambleText text="+500 Sitios" durationMs={800} delayMs={250} />
              </div>
              <div className="text-xs text-zinc-400">Entel / Movistar 5G</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Empresa
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-[#e89578]">
                <ScrambleText text="Ablu Tech" durationMs={800} delayMs={400} />
              </div>
              <div className="text-xs text-zinc-400">Fundador & COO</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Innovación
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-300">
                <ScrambleText text="AI Agents" durationMs={800} delayMs={550} />
              </div>
              <div className="text-xs text-zinc-400">Google Antigravity</div>
            </div>
          </div>
        </div>
      </div>

      {/* 16:9 Cinema Widescreen Modal */}
      {isCinemaModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setIsCinemaModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-cyan-400/40 bg-[#050b18] shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#020510]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider uppercase">
                  TRANSMISIÓN CINEMÁTICA // 16:9 WIDESCREEN
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCinemaModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar ventana (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container 16:9 */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/media/profile-video-full.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-[#020510] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>ABRAHAN RONDON ARTEAGA · PERFIL OFICIAL</span>
              <span className="text-cyan-300">rondontech.com</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
