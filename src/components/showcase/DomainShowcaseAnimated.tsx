"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import {
  HARNESS_TELEMETRY,
  RONDONTECH_ADAPTER_TELEMETRY,
} from "@/data/harnessTelemetry";
import { HarnessArchitectureInspector } from "./HarnessArchitectureInspector";

interface DomainItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  isFeaturedClay?: boolean;
  metrics: { label: string; val: string }[];
  tags: string[];
  clientOrOrg: string;
  ctaText: string;
  ctaHref: string;
  verifiedSeal?: {
    companyName: string;
    rut: string;
    registry: string;
    status: string;
  };
  highlightFeatures?: string[];
}

const DOMAINS: DomainItem[] = [
  {
    id: "telecom",
    number: "01",
    title: "Telecomunicaciones 5G, RF & RAN.",
    subtitle: "Ingeniería de Radiofrecuencia & Redes Celulares",
    tagline: "Despliegue y optimización masiva de radiobases móviles",
    description:
      "Liderazgo en cuadrillas de terreno para auditorías técnicas, instalación y comisionamiento de estaciones 5G/LTE en operadores líderes de Chile (Entel, Movistar). Calibración de enlaces microondas, azimut, tilt y análisis de cobertura de espectro radioeléctrico.",
    image: "/media/telecom-ran-5g.webp",
    isFeaturedClay: false,
    metrics: [
      { label: "Estaciones Auditadas", val: "+500 Sitios" },
      { label: "Redes", val: "5G NR / 4G LTE" },
      { label: "Operador Principal", val: "Entel Chile" },
    ],
    tags: ["Huawei RAN", "Ericsson", "Enlaces MW", "SiteMaster", "RF Safety"],
    clientOrOrg: "Entel / Insytel / Telefónica",
    ctaText: "Ver Trayectoria Telecom",
    ctaHref: "#experiencia",
    highlightFeatures: [
      "Auditorías en torres arriostradas y autosoportadas",
      "Certificación de barrido de líneas (VSWR / Return Loss)",
      "Puesta en marcha de radiobases 5G en banda n78 / n28",
    ],
  },
  {
    id: "datacenter",
    number: "02",
    title: "Centros de Datos & Energía Crítica.",
    subtitle: "Transmisión de Alta Capacidad & Continuidad",
    tagline: "Arquitectura física y lógica para disponibilidad 99.999%",
    description:
      "Supervisión y montaje de salas técnicas de conmutación (Centrales MSC/BSC). Racks de distribución de fibra óptica, tendidos de alta densidad, sistemas de fuerza continua DC (-48V), bancos de baterías y respaldo de grupos electrógenos.",
    image: "/media/datacenter-infrastructure.webp",
    isFeaturedClay: false,
    metrics: [
      { label: "Sistemas Críticos", val: "UPS & -48V DC" },
      { label: "Conectividad", val: "DWDM / Fibra" },
      { label: "Disponibilidad", val: "Tier III+" },
    ],
    tags: ["Salas Técnicas", "DWDM", "Bancos Baterías", "OTDR", "PDU Power"],
    clientOrOrg: "Infraestructura Nacional",
    ctaText: "Explorar Infraestructura",
    ctaHref: "#experiencia",
    highlightFeatures: [
      "Distribución de tableros de transferencia automática (TTA)",
      "Mediciones reflectométricas OTDR e inserción óptica",
      "Monitoreo ambiental y supresión de incendios FM200",
    ],
  },
  {
    id: "smart-building",
    number: "03",
    title: "Smart Buildings, Inmótica & Seguridad Integrada.",
    subtitle: "Fundador & Director de Operaciones · Ablu Tech Ltda.",
    tagline: "Infraestructura física y digital autónoma para residencias de alto estándar y corporativos",
    description:
      "Diseño, integración y comisionamiento de ingeniería inmótica y domótica de alto estándar. Centralización de iluminación inteligente, videovigilancia IP con analítica de IA, accesos biométricos unificados y climatización zonificada de máxima eficiencia energética bajo protocolos de estándar internacional.",
    image: "/media/smart-building-iot.webp",
    isFeaturedClay: true, // The iconic Clay Ember #bc7155 card
    metrics: [
      { label: "Proyectos & Obras", val: "+80 Despliegues" },
      { label: "Ecosistemas", val: "Matter / Zigbee / IP" },
      { label: "Garantía & SLA", val: "100% Certificada" },
    ],
    tags: ["Ablu Tech", "Inmótica Corporativa", "CCTV AI", "Control Climático", "Audio Multiroom", "Acceso Biométrico"],
    clientOrOrg: "Ablu Tech Ltda. (ablutech.com)",
    ctaText: "Visitar Ablu Tech (ablutech.com)",
    ctaHref: "https://ablutech.com",
    verifiedSeal: {
      companyName: "ABLU TECH SERVICIOS DE AUTOMATIZACIÓN Y SEGURIDAD LIMITADA",
      rut: "78.539.015-6",
      registry: "Registro de Empresas y Sociedades · Ministerio de Economía de Chile",
      status: "Empresa Constituida & Certificada",
    },
    highlightFeatures: [
      "Integración de automatización cableada e inalámbrica Zigbee/Matter",
      "Analítica perimetral con detección de intrusos por IA en CCTV",
      "Control de accesos corporativos y cerraduras inteligentes RFID/Biometría",
    ],
  },
  {
    id: "ai-software",
    number: "04",
    title: "Sistemas Multi-Agente & Software Cloud.",
    subtitle: "Automatización de Negocios & Desarrollo Full-Stack",
    tagline: "Ingeniería de software impulsada por modelos generativos y agentes",
    description:
      "Desarrollo de aplicaciones modernas y orquestación de agentes autónomos con el SDK de Google Antigravity y frameworks de vanguardia. Creación de portales de telemetría, automatizaciones operativas e integraciones API resilientes.",
    image: "/media/software-ai-agents.webp",
    isFeaturedClay: false,
    metrics: [
      { label: "Arquitectura", val: "Multi-Agent AI" },
      { label: "Frontend / Cloud", val: "Next.js / Vercel" },
      { label: "Despliegues", val: "CI/CD Edge" },
    ],
    tags: ["Google Antigravity", "Next.js 16", "TypeScript", "Python", "Cloudflare"],
    clientOrOrg: "RondonTech Soluciones",
    ctaText: "Probar Consola Interactiva",
    ctaHref: "#consola",
    highlightFeatures: [
      "Orquestación de pipelines autónomos con agentes de DeepMind",
      "APIs asíncronas de telemetría y webhooks de alta concurrencia",
      "Despliegues Edge Serverless con latencias menores a 25ms",
    ],
  },
];

export function DomainShowcaseAnimated() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHarnessOpen, setIsHarnessOpen] = useState<boolean>(false);

  const activeDomain = DOMAINS[currentIndex];
  const isInspectorActive = isHarnessOpen && activeDomain.id === "ai-software";

  // 6-second autoplay cycle for comfortable reading (pauses on hover or open Harness² inspector)
  useEffect(() => {
    if (!isPlaying || isHovered || isInspectorActive) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DOMAINS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isInspectorActive, currentIndex]);

  const handleSelectDomain = (idx: number) => {
    setCurrentIndex(idx);
    if (DOMAINS[idx]?.id !== "ai-software") {
      setIsHarnessOpen(false);
    }
  };

  const handleNext = () => {
    setIsHarnessOpen(false);
    setCurrentIndex((prev) => (prev + 1) % DOMAINS.length);
  };

  const handlePrev = () => {
    setIsHarnessOpen(false);
    setCurrentIndex((prev) => (prev - 1 + DOMAINS.length) % DOMAINS.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section
      id="especialidades"
      className="py-16 sm:py-24 px-4 sm:px-8 w-full max-w-7xl mx-auto min-w-0 overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="space-y-4 mb-8 sm:mb-12 w-full min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#bc7155] shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-zinc-600 font-semibold break-words">
            DOMINIOS DE ALTA INGENIERÍA // CUATRO PILARES
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end w-full min-w-0">
          <h2 className="lg:col-span-8 font-display-xl text-[#000d10] tracking-tight break-words text-4xl sm:text-5xl lg:text-7xl">
            Especialidades.
          </h2>
          <p className="lg:col-span-4 font-body-editorial text-zinc-700 text-sm sm:text-base lg:text-lg break-words leading-relaxed">
            Integración vertical desde el espectro electromagnético en terreno hasta
            la orquestación de agentes cognitivos en la nube.
          </p>
        </div>
      </div>

      {/* Pill Selector & Playback HUD Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#d5d3d4]">
        {/* Category Pill Selector */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {DOMAINS.map((domain, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={domain.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectDomain(idx)}
                className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? domain.isFeaturedClay
                      ? "bg-[#bc7155] text-white shadow-md shadow-[#bc7155]/30 font-bold"
                      : "bg-[#000d10] text-white font-bold"
                    : "bg-white text-[#000d10] border border-[#d5d3d4] hover:border-[#000d10]"
                }`}
              >
                <span className="font-mono text-[11px] sm:text-xs opacity-75">{domain.number}</span>
                <span>{domain.title.split(".")[0]}</span>
                {domain.isFeaturedClay && (
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-white/25 ml-0.5">
                    Destacado
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Playback Controls Toolbar */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#d5d3d4] shadow-sm">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Especialidad anterior"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#000d10] transition-colors cursor-pointer"
            title="Especialidad anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold transition-all cursor-pointer ${
              isPlaying
                ? "bg-emerald-500/10 text-emerald-800 border border-emerald-500/30"
                : "bg-amber-500/10 text-amber-800 border border-amber-500/30"
            }`}
            title={isPlaying ? "Pausar carrusel automático (6s)" : "Reanudar carrusel"}
          >
            {isPlaying ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Pause className="w-3 h-3 text-emerald-700" />
                <span>6s AUTO</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-amber-700 fill-amber-700" />
                <span>PAUSADO</span>
              </>
            )}
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente especialidad"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#000d10] transition-colors cursor-pointer"
            title="Siguiente especialidad"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Indicator */}
          <div className="font-mono text-xs font-bold text-[#000d10]/80 pl-1 border-l border-black/10">
            0{currentIndex + 1} <span className="opacity-40">/</span> 04
          </div>
        </div>
      </div>

      {/* Kinetic Domain Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDomain.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full max-w-full min-w-0 rounded-2xl overflow-hidden transition-colors duration-300 shadow-xl ${
            activeDomain.isFeaturedClay
              ? "bg-[#bc7155] text-white border border-[#bc7155]"
              : "bg-white text-[#000d10] border border-[#d5d3d4]"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-w-0">
          {/* Left Column: Visual Showcase (UNCROPPED 16:9 Image Frame + Technical Deck) */}
          <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
            {/* 16:9 Widescreen Image Container - ZERO CROP */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-black/30 border border-current/15 group shadow-md">
              <Image
                src={activeDomain.image}
                alt={activeDomain.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  activeDomain.isFeaturedClay
                    ? "bg-gradient-to-t from-[#bc7155]/80 via-transparent to-black/20"
                    : "bg-gradient-to-t from-black/60 via-transparent to-black/20"
                }`}
              />

              {/* Floating Top Client / Organization Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 max-w-[85%]">
                <span
                  className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md truncate inline-block ${
                    activeDomain.isFeaturedClay
                      ? "bg-white/25 text-white border border-white/30 font-semibold"
                      : "bg-[#000d10]/85 text-white border border-white/20 font-semibold"
                  }`}
                >
                  {activeDomain.clientOrOrg}
                </span>
              </div>

              {/* Top Right: Resolution Pill */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-white/90 border border-white/20 backdrop-blur-md">
                  16:9 COMPLETO // 2K ULTRA CRISP
                </span>
              </div>

              {/* Bottom Overlay Title on Image for Quick Context */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center justify-between">
                <div className="font-mono text-xs sm:text-sm font-bold text-white drop-shadow-md">
                  {activeDomain.subtitle}
                </div>
              </div>
            </div>

            {/* Slide Progress Bar (fills during 6 seconds) */}
            <div className="w-full space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] opacity-75">
                <span>CICLO AUTOMÁTICO</span>
                <span>
                  {isInspectorActive
                    ? "INSPECTOR ACTIVO"
                    : isPlaying && !isHovered
                    ? "REPRODUCIENDO"
                    : isHovered
                    ? "PAUSA POR HOVER"
                    : "PAUSADO"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  key={`${currentIndex}-${isPlaying}-${isHovered}-${isInspectorActive}`}
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      isPlaying && !isHovered && !isInspectorActive
                        ? "100%"
                        : "0%",
                  }}
                  transition={{
                    duration: 6,
                    ease: "linear",
                  }}
                  className={`h-full rounded-full ${
                    activeDomain.isFeaturedClay
                      ? "bg-white shadow-sm shadow-white/50"
                      : "bg-[#bc7155] shadow-sm shadow-[#bc7155]/50"
                  }`}
                />
              </div>
            </div>

            {/* Official Verified Company Seal for Ablu Tech OR Key Highlights */}
            {activeDomain.verifiedSeal ? (
              <div className="rounded-xl border border-white/30 bg-black/25 backdrop-blur-md p-3.5 sm:p-4 space-y-2 text-white shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-emerald-300">
                      {activeDomain.verifiedSeal.status}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/30">
                    RUT: {activeDomain.verifiedSeal.rut}
                  </span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight leading-snug break-words">
                  {activeDomain.verifiedSeal.companyName}
                </div>
                <div className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-white/80 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="break-words leading-snug">{activeDomain.verifiedSeal.registry}</span>
                </div>
              </div>
            ) : (
              activeDomain.highlightFeatures && (
                <div
                  className={`rounded-xl border p-3.5 sm:p-4 space-y-2 text-xs sm:text-sm ${
                    activeDomain.isFeaturedClay
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-[#d5d3d4] bg-[#000d10]/[0.02] text-zinc-700"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider font-semibold opacity-70">
                    Capacidades Clave Verificadas
                  </div>
                  <ul className="space-y-1.5">
                    {activeDomain.highlightFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            activeDomain.isFeaturedClay ? "text-white" : "text-[#bc7155]"
                          }`}
                        />
                        <span className="leading-snug text-xs sm:text-[13px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* Right Column: Editorial Technical Breakdown */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 sm:space-y-6 w-full min-w-0 border-t lg:border-t-0 lg:border-l border-current/15">
            <div className="space-y-4 sm:space-y-5 w-full min-w-0">
              {/* Header Number & Subtitle */}
              <div className="flex items-center justify-between gap-2 border-b pb-3 border-current/15">
                <span className="font-mono text-2xl sm:text-3xl font-bold opacity-50">
                  {activeDomain.number}
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest opacity-90 break-words text-right">
                  {activeDomain.subtitle}
                </span>
              </div>

              {/* Title in Hyer Style */}
              <h3
                className={`text-2xl sm:text-3xl font-bold tracking-tight break-words leading-tight ${
                  activeDomain.isFeaturedClay ? "text-white" : "text-[#000d10]"
                }`}
              >
                {activeDomain.title}
              </h3>

              {/* Tagline */}
              <p
                className={`text-xs sm:text-sm font-semibold break-words leading-snug ${
                  activeDomain.isFeaturedClay ? "text-white/95" : "text-[#bc7155]"
                }`}
              >
                {activeDomain.tagline}
              </p>

              {/* Description Body - 100% High Contrast */}
              <p
                className={`font-body-editorial text-xs sm:text-sm md:text-[15px] break-words leading-relaxed ${
                  activeDomain.isFeaturedClay ? "!text-white text-white/95" : "text-zinc-700"
                }`}
              >
                {activeDomain.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-current/15 w-full min-w-0">
                {activeDomain.metrics.map((m, i) => (
                  <div key={i} className="space-y-0.5 min-w-0">
                    <div
                      className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider truncate ${
                        activeDomain.isFeaturedClay ? "text-white/80" : "text-zinc-500"
                      }`}
                    >
                      {m.label}
                    </div>
                    <div
                      className={`font-mono text-xs sm:text-sm font-bold break-words leading-tight ${
                        activeDomain.isFeaturedClay ? "text-white" : "text-[#000d10]"
                      }`}
                    >
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeDomain.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full ${
                      activeDomain.isFeaturedClay
                        ? "bg-white/20 text-white border border-white/30"
                        : "bg-[#000d10]/5 text-[#000d10] border border-[#d5d3d4]"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Slide 04: Harness² Recursive Architecture Trigger */}
            {activeDomain.id === "ai-software" && (
              <div className="rounded-xl bg-[#0f0f1c] text-white border border-cyan-400/30 p-3.5 space-y-2.5 shadow-sm min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300 font-semibold break-words">
                      Harness² · {RONDONTECH_ADAPTER_TELEMETRY.paperRef}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-300 shrink-0">
                    {RONDONTECH_ADAPTER_TELEMETRY.totalExecutions} execs · $
                    {RONDONTECH_ADAPTER_TELEMETRY.totalUsdCost.toFixed(2)}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-zinc-300 leading-snug break-words">
                  2 ejecuciones reales ({RONDONTECH_ADAPTER_TELEMETRY.domain} +{" "}
                  {HARNESS_TELEMETRY.domain}):{" "}
                  <span className="text-emerald-300">
                    {RONDONTECH_ADAPTER_TELEMETRY.editedComponentPath}
                  </span>{" "}
                  &amp;{" "}
                  <span className="text-cyan-300">
                    {HARNESS_TELEMETRY.editedComponentPath}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsHarnessOpen((prev) => !prev)}
                  aria-expanded={isHarnessOpen}
                  className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#000d10] font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5 min-w-0 text-left">
                    <Cpu className="w-3.5 h-3.5 shrink-0" />
                    <span className="break-words">
                      {isHarnessOpen
                        ? "Ocultar Inspector Harness²"
                        : "Inspeccionar Arquitectura Harness²"}
                    </span>
                  </span>
                  {isHarnessOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  )}
                </button>
              </div>
            )}

            {/* Action Pill Button (1000px) */}
            <div className="pt-4 border-t border-current/15">
              <a
                href={activeDomain.ctaHref}
                target={activeDomain.ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={activeDomain.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className={
                  activeDomain.isFeaturedClay
                    ? "btn-pill-dark w-full justify-between"
                    : "btn-pill-clay w-full justify-between"
                }
              >
                <span>{activeDomain.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          </div>

          {/* Expandable Harness² Recursive Agent Architecture Panel (Slide 04) */}
          <AnimatePresence initial={false}>
            {isInspectorActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <HarnessArchitectureInspector
                  onClose={() => setIsHarnessOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
