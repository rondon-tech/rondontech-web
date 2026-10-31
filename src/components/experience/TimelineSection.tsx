"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Radio, Cpu, CheckCircle2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export function TimelineSection() {
  const [expandedId, setExpandedId] = useState<string | null>("entel");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experiencia" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-wider uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Trayectoria Comprobada</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Experiencia en{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Infraestructura & Terreno
            </span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-zinc-400">
            Más de una década resolviendo incidencias críticas en terreno, modernizando redes celulares y liderando integraciones tecnológicas.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {PROFILE_DATA.experience.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/40">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {/* Card */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className={`glass-panel p-5 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isExpanded
                      ? "border-cyan-500/40 bg-[#070e24]/80 shadow-xl shadow-cyan-950/30"
                      : "border-cyan-500/15 bg-[#050a18]/60 hover:border-cyan-500/30"
                  }`}
                >
                  {/* Top Bar: Dates & Organization */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-wide uppercase flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5" />
                      {item.organization}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {item.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <div className="p-1 rounded-full text-zinc-400 hover:text-cyan-300">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Context Summary */}
                  <p className="text-sm text-zinc-300 mt-2 mb-4 leading-relaxed">
                    {item.context}
                  </p>

                  {/* Expanded Bullets */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-cyan-500/15 space-y-2.5"
                    >
                      <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                        // Actividades & Responsabilidades Clave:
                      </div>
                      {item.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}

                      {item.techStack && (
                        <div className="pt-4 flex flex-wrap gap-2">
                          {item.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-cyan-950/60 border border-cyan-500/25 text-cyan-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
