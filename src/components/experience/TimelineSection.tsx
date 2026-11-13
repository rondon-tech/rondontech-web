"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronsDownUp, ChevronsUpDown, MapPin, Calendar } from "lucide-react";
import { PROFILE_DATA, type ExperienceItem } from "@/data/profileData";
import { SpotlightTimelineCard } from "./SpotlightTimelineCard";
import {
  FieldGalleryLightbox,
  type FieldGalleryItem,
} from "./FieldGalleryLightbox";

type TimelineFilter = "all" | "current" | "telecom" | "ai-business";

const FILTER_TABS: ReadonlyArray<{ id: TimelineFilter; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "current", label: "Actualidad" },
  { id: "telecom", label: "Telecom & RF" },
  { id: "ai-business", label: "Emprendimiento & IA" },
];

const CURRENT_ROLE_IDS = new Set(["ablutech", "entel"]);
const TELECOM_ROLE_IDS = new Set(["entel", "wisecom", "telrad", "celplan"]);
const AI_BUSINESS_ROLE_IDS = new Set(["ablutech"]);

const ENTEL_GALLERY: FieldGalleryItem[] = [
  {
    src: "/images/telecom-rooftop-site.webp",
    alt: "Azotea Estación Base Entel Santiago",
    label: "● SITIO AZOTEA STGO",
    badgeClassName: "text-cyan-300",
  },
  {
    src: "/images/ericsson-antennas-rooftop.webp",
    alt: "Antenas y Radios Ericsson 5G/4G",
    label: "● ERICSSON 5G RAN",
    badgeClassName: "text-emerald-300",
  },
  {
    src: "/images/telecom-energy-generator.webp",
    alt: "Respaldo de Energía y Generadores",
    label: "● ENERGÍA & GENERADORES",
    badgeClassName: "text-amber-300",
  },
];

const ABLUTECH_GALLERY: FieldGalleryItem[] = [
  {
    src: "/images/ablutech_domotica.webp",
    alt: "Domótica Residencial Inteligente",
    label: "● DOMÓTICA RESIDENCIAL",
    badgeClassName: "text-sky-300",
  },
  {
    src: "/images/ablutech_cctv.webp",
    alt: "CCTV y Control de Acceso",
    label: "● CCTV & ACCESO IP",
    badgeClassName: "text-cyan-300",
  },
  {
    src: "/images/ablutech_iot.webp",
    alt: "Infraestructura IoT y Servidores",
    label: "● SERVIDORES & IOT",
    badgeClassName: "text-emerald-300",
  },
];

function matchesFilter(item: ExperienceItem, filter: TimelineFilter): boolean {
  switch (filter) {
    case "current":
      return CURRENT_ROLE_IDS.has(item.id);
    case "telecom":
      return TELECOM_ROLE_IDS.has(item.id);
    case "ai-business":
      return AI_BUSINESS_ROLE_IDS.has(item.id);
    case "all":
    default:
      return true;
  }
}

export function TimelineSection() {
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>("all");
  const [expandedIds, setExpandedIds] = useState<string[]>([
    "ablutech",
    "entel",
  ]);
  const [timelineHeight, setTimelineHeight] = useState(0);

  const timelineRef = useRef<HTMLDivElement | null>(null);

  const filteredExperience = useMemo(
    () =>
      PROFILE_DATA.experience.filter((item) =>
        matchesFilter(item, activeFilter),
      ),
    [activeFilter],
  );

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) {
      return;
    }

    const measure = () => {
      setTimelineHeight(container.getBoundingClientRect().height);
    };

    const rafId = requestAnimationFrame(measure);
    const observer = new ResizeObserver(() => {
      measure();
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [filteredExperience.length, expandedIds]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const beamHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(timelineHeight, 1)],
  );
  const beamOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((existingId) => existingId !== id)
        : [...prev, id],
    );
  };

  const allVisibleExpanded =
    filteredExperience.length > 0 &&
    filteredExperience.every((item) => expandedIds.includes(item.id));

  const handleToggleAll = () => {
    const visibleIds = filteredExperience.map((item) => item.id);
    if (allVisibleExpanded) {
      setExpandedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }
    setExpandedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  return (
    <section
      id="experiencia"
      className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 w-full max-w-6xl mx-auto min-w-0 overflow-x-clip"
    >
      {/* Anchor for both #experiencia and #trayectoria */}
      <span id="trayectoria" className="relative -top-24 block" />

      <div className="w-full min-w-0">
        {/* Section Header */}
        <div className="space-y-4 mb-8 sm:mb-10 w-full min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#000d10] shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-zinc-600 font-semibold break-words">
              HISTORIAL TÉCNICO // TELECOMUNICACIONES & EMPRENDIMIENTO
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end w-full min-w-0">
            <h2 className="lg:col-span-8 font-display-xl text-[#000d10] tracking-tight break-words text-4xl sm:text-5xl lg:text-7xl">
              Trayectoria.
            </h2>
            <p className="lg:col-span-4 font-body-editorial text-zinc-700 text-sm sm:text-base lg:text-lg break-words leading-relaxed">
              Más de 10 años liderando operaciones técnicas en terreno,
              modernizando redes celulares 5G/LTE y fundando soluciones
              tecnológicas de alta gama.
            </p>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl bg-white border border-[#d5d3d4] p-2 sm:p-2.5 shadow-[0_2px_12px_-6px_rgba(0,13,16,0.06)]">
          <div
            role="group"
            aria-label="Filtrar experiencia por categoría"
            className="flex flex-wrap items-center gap-1.5"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] ${
                    isActive
                      ? "text-white"
                      : "text-zinc-700 hover:text-[#000d10] hover:bg-[#fbfbfd]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="timeline-filter-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-xl bg-[#000d10]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 px-1 sm:px-0">
            <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
              {filteredExperience.length}{" "}
              {filteredExperience.length === 1 ? "rol" : "roles"}
            </span>
            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#d5d3d4] bg-[#fbfbfd] hover:border-[#000d10]/40 hover:bg-white font-mono text-xs font-semibold text-[#000d10] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
            >
              {allVisibleExpanded ? (
                <>
                  <ChevronsDownUp className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Compactar</span>
                </>
              ) : (
                <>
                  <ChevronsUpDown className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Expandir todo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sticky Left Column + Scroll Beam Timeline */}
        <div ref={timelineRef} className="relative space-y-10 sm:space-y-14">
          {/* Vertical Track + Animated Scroll Beam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-3 sm:left-4 top-2 bottom-2 w-[2px] overflow-hidden"
          >
            <div className="absolute inset-0 w-[2px] bg-[#d5d3d4] rounded-full" />
            <motion.div
              style={{
                height: beamHeight,
                opacity: beamOpacity,
              }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-[#bc7155] via-sky-500 to-[#000d10]"
            />
          </div>

          {filteredExperience.map((item) => {
            const isCurrent = CURRENT_ROLE_IDS.has(item.id);
            const isExpanded = expandedIds.includes(item.id);

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start min-w-0"
              >
                {/* Sticky Left Column */}
                <div className="relative pl-9 sm:pl-12 lg:col-span-4 lg:sticky lg:top-28 self-start min-w-0 pt-0.5">
                  {/* Node Marker aligned directly on the vertical rail */}
                  <div
                    aria-hidden="true"
                    className="absolute left-3 sm:left-4 -translate-x-1/2 top-1.5 flex items-center justify-center"
                  >
                    {isCurrent ? (
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bc7155]/45" />
                        <span className="relative inline-flex h-4 w-4 rounded-full bg-white border-2 border-[#bc7155] items-center justify-center shadow-sm">
                          <span className="h-2 w-2 rounded-full bg-[#bc7155]" />
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex h-3.5 w-3.5 rounded-full bg-white border-2 border-[#000d10] items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#000d10]" />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bc7155]/12 border border-[#bc7155]/35 text-[#8c4329] font-mono text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#bc7155]" />
                          ACTUALIDAD
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-700">
                        <Calendar
                          className="w-3.5 h-3.5 text-zinc-500 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item.dates}</span>
                      </span>
                    </div>

                    <p className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#000d10] break-words">
                      {item.organization}
                    </p>

                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600">
                      <MapPin
                        className="w-3.5 h-3.5 text-zinc-500 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Elevated Spotlight Card + Field Gallery */}
                <div className="pl-9 sm:pl-12 lg:pl-0 lg:col-span-8 min-w-0">
                  <SpotlightTimelineCard
                    id={item.id}
                    role={item.role}
                    organization={item.organization}
                    context={item.context}
                    bullets={item.bullets}
                    techStack={item.techStack}
                    isCurrent={isCurrent}
                    isExpanded={isExpanded}
                    onToggle={() => toggleExpand(item.id)}
                  >
                    {item.id === "entel" && (
                      <FieldGalleryLightbox
                        items={ENTEL_GALLERY}
                        title="Evidencia en Terreno (Red Entel Santiago)"
                        accent="ember"
                      />
                    )}
                    {item.id === "ablutech" && (
                      <FieldGalleryLightbox
                        items={ABLUTECH_GALLERY}
                        title="Proyectos Destacados Ablu Tech"
                        accent="ember"
                      />
                    )}
                  </SpotlightTimelineCard>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
