"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Search, X } from "lucide-react";
import { PROFILE_DATA, type SkillCategory } from "@/data/profileData";
import { SpotlightSkillCard } from "./SpotlightSkillCard";
import { AcademicCredentialsDeck } from "./AcademicCredentialsDeck";

type SkillFilterId = "all" | SkillCategory["category"];

const CATEGORIES: ReadonlyArray<{ id: SkillFilterId; label: string }> = [
  { id: "all", label: "Todas las Áreas" },
  { id: "telecom", label: "Telecom & RF" },
  { id: "iot", label: "IoT & Domótica" },
  { id: "energy", label: "Energía & O&M" },
  { id: "ai", label: "IA & Software" },
  { id: "tools", label: "Herramientas O&M" },
];

export function SkillsMatrixSection() {
  const [activeFilter, setActiveFilter] = useState<SkillFilterId>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return PROFILE_DATA.skillsCategories.filter((cat) => {
      if (activeFilter !== "all" && cat.category !== activeFilter) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      return (
        cat.title.toLowerCase().includes(normalizedQuery) ||
        cat.description.toLowerCase().includes(normalizedQuery) ||
        cat.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [activeFilter, normalizedQuery]);

  const totalTechnologies = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + cat.tags.length, 0),
    [filteredCategories],
  );

  const activeCategoryLabel =
    CATEGORIES.find((cat) => cat.id === activeFilter)?.label ??
    "Todas las Áreas";

  const handleResetFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
  };

  return (
    <section
      id="habilidades"
      className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 w-full max-w-7xl mx-auto min-w-0 overflow-x-clip"
    >
      <div className="w-full min-w-0">
        {/* Section Header */}
        <div className="space-y-4 mb-10 sm:mb-12 w-full min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#000d10] shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-zinc-600 font-semibold break-words">
              MATRIZ TÉCNICA // CAPACIDADES DE INGENIERÍA
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end w-full min-w-0">
            <h2 className="lg:col-span-8 font-display-xl text-[#000d10] tracking-tight break-words text-4xl sm:text-5xl lg:text-7xl">
              Habilidades.
            </h2>
            <p className="lg:col-span-4 font-body-editorial text-zinc-700 text-sm sm:text-base lg:text-lg break-words leading-relaxed">
              Dominio integral de instrumentación en terreno, protocolos de red,
              sistemas de energía y automatizaciones con IA moderna.
            </p>
          </div>
        </div>

        {/* Editorial Filter Bar & Technology Search */}
        <div className="mb-10 sm:mb-12 flex flex-col gap-3.5 rounded-2xl bg-white border border-[#d5d3d4] p-3 sm:p-4 shadow-[0_2px_12px_-6px_rgba(0,13,16,0.06)]">
          <div
            role="group"
            aria-label="Filtrar habilidades por área técnica"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] ${
                    isActive
                      ? "text-white border border-transparent"
                      : "bg-white text-[#000d10] border border-[#d5d3d4] hover:border-[#000d10]/40 hover:bg-[#fbfbfd]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-filter-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-xl bg-[#000d10]"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#d5d3d4]/70">
            <div className="relative flex-1 min-w-0">
              <label htmlFor="skills-search-input" className="sr-only">
                Buscar tecnología, equipo o protocolo...
              </label>
              <Search
                className="pointer-events-none w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="skills-search-input"
                type="text"
                role="searchbox"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar: 5G, Ericsson, Python, Winfiol..."
                aria-label="Buscar tecnología, equipo o protocolo..."
                className="w-full rounded-xl border border-[#d5d3d4] bg-[#fbfbfd] pl-10 pr-10 py-2.5 text-sm text-[#000d10] placeholder:text-zinc-500 font-mono focus:outline-none focus:bg-white focus:border-[#000d10] focus:ring-2 focus:ring-[#0284c7]/20 transition-colors"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-[#000d10] hover:bg-[#e4e4e7]/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div
              aria-live="polite"
              className="flex items-center justify-between sm:justify-end gap-2 shrink-0 font-mono text-xs text-zinc-600 tabular-nums px-1"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    filteredCategories.length > 0
                      ? "bg-[#bc7155]"
                      : "bg-zinc-400"
                  }`}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-[#000d10] font-semibold">
                    {filteredCategories.length}
                  </strong>{" "}
                  {filteredCategories.length === 1 ? "área" : "áreas"} ·{" "}
                  <strong className="text-[#000d10] font-semibold">
                    {totalTechnologies}
                  </strong>{" "}
                  {totalTechnologies === 1 ? "tecnología" : "tecnologías"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Skills Cards Grid or Empty State */}
        <AnimatePresence mode="wait" initial={false}>
          {filteredCategories.length > 0 ? (
            <motion.div
              key="skills-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 relative"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredCategories.map((skillGroup, idx) => (
                  <motion.div
                    key={skillGroup.title}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 flex"
                  >
                    <SpotlightSkillCard
                      index={idx}
                      title={skillGroup.title}
                      category={skillGroup.category}
                      description={skillGroup.description}
                      tags={skillGroup.tags}
                      searchQuery={searchQuery}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="skills-empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mb-14 rounded-2xl bg-white border border-[#d5d3d4] p-8 sm:p-12 text-center shadow-[0_2px_12px_-6px_rgba(0,13,16,0.06)]"
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-[#fbfbfd] border border-[#d5d3d4] flex items-center justify-center text-[#bc7155]">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#000d10] tracking-tight mb-2">
                Sin coincidencias técnicas
              </h3>
              <p className="text-sm text-zinc-700 max-w-md mx-auto mb-6 leading-relaxed">
                No se encontraron capacidades para{" "}
                {searchQuery.trim() ? (
                  <span className="font-mono font-semibold text-[#000d10]">
                    &ldquo;{searchQuery.trim()}&rdquo;
                  </span>
                ) : (
                  "la selección actual"
                )}{" "}
                en{" "}
                <span className="font-mono font-semibold text-[#000d10]">
                  {activeCategoryLabel}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#000d10] text-white hover:bg-[#000d10]/90 font-mono text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reiniciar filtros</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Academic Credentials Dark Bridge */}
        <AcademicCredentialsDeck education={PROFILE_DATA.education} />
      </div>
    </section>
  );
}
