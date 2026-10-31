"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Radio, Cpu, CheckCircle2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export function TimelineSection() {
  const [expandedId, setExpandedId] = useState<string | null>("entel");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experiencia" className="py-24 px-4 sm:px-8 relative z-10 max-w-6xl mx-auto">
      {/* Anchor for both #experiencia and #trayectoria */}
      <span id="trayectoria" className="relative -top-24 block" />
      <div>
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#000d10]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8e8e95]">
              HISTORIAL TÉCNICO // TELECOMUNICACIONES & EMPRENDIMIENTO
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-8 font-display-xl text-[#000d10] tracking-tight">
              Trayectoria.
            </h2>
            <p className="lg:col-span-4 font-body-editorial text-[#8e8e95]">
              Más de 6 años liderando auditorías en terreno, modernizando redes celulares 5G/LTE y fundando soluciones tecnológicas de alta gama.
            </p>
          </div>
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
                      className="pt-4 border-t border-cyan-500/15 space-y-4"
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

                      {/* Real Field Photos for Entel */}
                      {item.id === "entel" && (
                        <div className="pt-3 border-t border-cyan-500/10">
                          <div className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            Evidencia en Terreno (Red Entel Santiago):
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="relative h-28 rounded-xl overflow-hidden border border-cyan-500/25 bg-[#030611] group/img">
                              <Image
                                src="/images/telecom-rooftop-site.webp"
                                alt="Azotea Estación Base Entel Santiago"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-300 filter contrast-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                                <span className="font-mono text-[9px] text-cyan-300 font-bold">
                                  ● SITIO AZOTEA STGO
                                </span>
                              </div>
                            </div>

                            <div className="relative h-28 rounded-xl overflow-hidden border border-cyan-500/25 bg-[#030611] group/img">
                              <Image
                                src="/images/ericsson-antennas-rooftop.webp"
                                alt="Antenas y Radios Ericsson 5G/4G"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-300 filter contrast-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                                <span className="font-mono text-[9px] text-emerald-300 font-bold">
                                  ● ERICSSON 5G RAN
                                </span>
                              </div>
                            </div>

                            <div className="relative h-28 rounded-xl overflow-hidden border border-cyan-500/25 bg-[#030611] group/img">
                              <Image
                                src="/images/telecom-energy-generator.webp"
                                alt="Respaldo de Energía y Generadores"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-300 filter contrast-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                                <span className="font-mono text-[9px] text-yellow-300 font-bold">
                                  ● ENERGÍA & GENERADORES
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Real Project Photos for Ablu Tech */}
                      {item.id === "ablutech" && (
                        <div className="pt-3 border-t border-cyan-500/10">
                          <div className="font-mono text-[11px] text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Proyectos Destacados Ablu Tech:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="relative h-28 rounded-xl overflow-hidden border border-blue-500/25 bg-[#030611] group/img">
                              <Image
                                src="/images/ablutech_domotica.webp"
                                alt="Domótica Residencial Inteligente"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                                <span className="font-mono text-[9px] text-blue-300 font-bold">
                                  ● DOMÓTICA RESIDENCIAL
                                </span>
                              </div>
                            </div>

                            <div className="relative h-28 rounded-xl overflow-hidden border border-blue-500/25 bg-[#030611] group/img">
                              <Image
                                src="/images/ablutech_cctv.webp"
                                alt="CCTV y Control de Acceso"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                                <span className="font-mono text-[9px] text-cyan-300 font-bold">
                                  ● CCTV & ACCESO IP
                                </span>
                              </div>
                            </div>

                            <div className="relative h-28 rounded-xl overflow-hidden border border-blue-500/25 bg-[#030611] group/img">
                              <Image
                                src="/images/ablutech_iot.webp"
                                alt="Infraestructura IoT y Servidores"
                                fill
                                className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                                <span className="font-mono text-[9px] text-emerald-300 font-bold">
                                  ● SERVIDORES & IOT
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.techStack && (
                        <div className="pt-2 flex flex-wrap gap-2">
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
