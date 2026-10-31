"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Server, Home, Bot, ExternalLink, ShieldCheck, Zap, ArrowRight, Layers } from "lucide-react";

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
  },
  {
    id: "smart-building",
    number: "03",
    title: "Smart Buildings & Domótica Inmótica.",
    subtitle: "Fundador & Director de Operaciones en Ablu Tech Ltda.",
    tagline: "El bloque exclusivo de automatización y seguridad integrada",
    description:
      "Creación e integración de soluciones tecnológicas avanzadas en ABLU TECH SERVICIOS DE AUTOMATIZACIÓN Y SEGURIDAD LIMITADA (RUT: 78.539.015-6) para residencias de alto estándar y edificios corporativos. Control de iluminación inteligente, videovigilancia IP con analítica de IA, accesos biométricos y climatización unificada.",
    image: "/media/smart-building-iot.webp",
    isFeaturedClay: true, // The iconic Clay Ember #bc7155 card
    metrics: [
      { label: "Razón Social", val: "Ablu Tech Ltda." },
      { label: "RUT Sociedad", val: "78.539.015-6" },
      { label: "Ecosistemas", val: "Matter / Zigbee" },
    ],
    tags: ["Ablu Tech", "CCTV AI", "Control Climático", "Audio Multiroom", "Inmótica"],
    clientOrOrg: "Ablu Tech Ltda. (ablutech.com)",
    ctaText: "Visitar Ablu Tech (ablutech.com)",
    ctaHref: "https://ablutech.com",
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
  },
];

export function DomainShowcaseAnimated() {
  const [activeId, setActiveId] = useState<string>("smart-building");
  const activeDomain = DOMAINS.find((d) => d.id === activeId) || DOMAINS[0];

  return (
    <section id="especialidades" className="py-16 sm:py-24 px-4 sm:px-8 w-full max-w-7xl mx-auto min-w-0 overflow-hidden">
      {/* Editorial Header */}
      <div className="space-y-4 mb-12 sm:mb-16 w-full min-w-0">
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

      {/* Pill Selector (1000px border radius, mobile horizontal scroll) */}
      <div className="w-full max-w-full min-w-0 flex flex-nowrap sm:flex-wrap items-center gap-2 sm:gap-3 mb-8 pb-3 border-b border-[#d5d3d4] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {DOMAINS.map((domain) => {
          const isActive = domain.id === activeId;
          return (
            <button
              key={domain.id}
              onClick={() => setActiveId(domain.id)}
              className={`relative px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                isActive
                  ? domain.isFeaturedClay
                    ? "bg-[#bc7155] text-white shadow-md shadow-[#bc7155]/30"
                    : "bg-[#000d10] text-white"
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

      {/* Kinetic Domain Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDomain.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`w-full max-w-full min-w-0 grid grid-cols-1 lg:grid-cols-12 rounded-none overflow-hidden transition-colors duration-300 ${
            activeDomain.isFeaturedClay
              ? "bg-[#bc7155] text-white"
              : "bg-white text-[#000d10] border border-[#d5d3d4]"
          }`}
        >
          {/* Left Column: Visual Showcase (2K Image with Pan Zoom) */}
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[420px] lg:min-h-[580px] w-full overflow-hidden group">
            <Image
              src={activeDomain.image}
              alt={activeDomain.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle Gradient Shade */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                activeDomain.isFeaturedClay
                  ? "bg-gradient-to-t from-[#bc7155] via-transparent to-transparent opacity-60"
                  : "bg-gradient-to-t from-[#000d10]/40 via-transparent to-transparent opacity-40"
              }`}
            />

            {/* Floating Top Badge */}
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 z-10 max-w-[85%]">
              <span
                className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md truncate inline-block ${
                  activeDomain.isFeaturedClay
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-[#000d10]/80 text-white border border-white/20"
                }`}
              >
                {activeDomain.clientOrOrg}
              </span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-10 flex items-center justify-between">
              <span
                className={`font-mono text-[9px] sm:text-xs uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md hidden sm:inline-block ${
                  activeDomain.isFeaturedClay
                    ? "bg-white/20 text-white border border-white/20"
                    : "bg-white/90 text-[#000d10] border border-[#d5d3d4]"
                }`}
              >
                RESOLUCIÓN 2K ULTRA CRISP // HIGH-RES ASSET
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Technical Breakdown */}
          <div className="lg:col-span-5 p-5 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 sm:space-y-8 w-full min-w-0">
            <div className="space-y-4 sm:space-y-6 w-full min-w-0">
              {/* Header Number & Subtitle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b pb-3 sm:pb-4 border-current/15">
                <span className="font-mono text-2xl sm:text-3xl font-bold opacity-50">
                  {activeDomain.number}
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest opacity-90 break-words">
                  {activeDomain.subtitle}
                </span>
              </div>

              {/* Title in Hyer Style */}
              <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight break-words ${activeDomain.isFeaturedClay ? "text-white" : "text-[#000d10]"}`}>
                {activeDomain.title}
              </h3>

              {/* Tagline */}
              <p
                className={`text-xs sm:text-sm md:text-base font-semibold break-words ${
                  activeDomain.isFeaturedClay ? "text-white/95" : "text-[#bc7155]"
                }`}
              >
                {activeDomain.tagline}
              </p>

              {/* Description Body - 100% High Contrast */}
              <p
                className={`font-body-editorial text-sm sm:text-base break-words leading-relaxed ${
                  activeDomain.isFeaturedClay ? "!text-white text-white/95" : "text-zinc-700"
                }`}
              >
                {activeDomain.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-current/15 w-full min-w-0">
                {activeDomain.metrics.map((m, i) => (
                  <div key={i} className="space-y-1 min-w-0">
                    <div className={`font-mono text-[9px] sm:text-[11px] uppercase tracking-wider truncate ${activeDomain.isFeaturedClay ? "text-white/80" : "text-zinc-500"}`}>
                      {m.label}
                    </div>
                    <div className={`font-mono text-xs sm:text-base font-bold break-words ${activeDomain.isFeaturedClay ? "text-white" : "text-[#000d10]"}`}>
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {activeDomain.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-mono text-[9px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
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

            {/* Action Pill Button (1000px) */}
            <div className="pt-4 sm:pt-6 border-t border-current/15">
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
        </motion.div>
      </AnimatePresence>
    </section>
  );
}