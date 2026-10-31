"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, GraduationCap, Award, CheckCircle, Terminal, Cpu, Radio, Shield, Zap } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export function SkillsMatrixSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todas las Áreas" },
    { id: "telecom", label: "Telecom & RF" },
    { id: "iot", label: "IoT & Domótica" },
    { id: "energy", label: "Energía & O&M" },
    { id: "ai", label: "IA & Software" },
    { id: "tools", label: "Herramientas O&M" },
  ];

  const filteredCategories =
    activeFilter === "all"
      ? PROFILE_DATA.skillsCategories
      : PROFILE_DATA.skillsCategories.filter((cat) => cat.category === activeFilter);

  return (
    <section id="habilidades" className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 w-full max-w-7xl mx-auto min-w-0 overflow-hidden">
      <div className="w-full min-w-0">
        {/* Section Header */}
        <div className="space-y-4 mb-12 sm:mb-14 w-full min-w-0">
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

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-cyan-400 text-black shadow-md shadow-cyan-500/25 scale-105"
                  : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-cyan-500/40 hover:text-cyan-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredCategories.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-3xl border border-cyan-500/15 bg-[#050a18]/60 hover:border-cyan-500/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {skillGroup.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  {skillGroup.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80">
                {skillGroup.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-zinc-900/90 text-cyan-200 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Academic Foundation */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 bg-[#060c1d]/70">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-6">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Formación Académica & Titulaciones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROFILE_DATA.education.map((edu, eIdx) => (
              <div key={eIdx} className="p-5 rounded-2xl bg-[#030611]/80 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-300 font-semibold">{edu.dates}</span>
                  <span className="text-[11px] font-mono text-zinc-500">TÍTULO OFICIAL</span>
                </div>
                <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                <div className="font-mono text-xs text-zinc-400">{edu.institution}</div>
                <p className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/60">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
