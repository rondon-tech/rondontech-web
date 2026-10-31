"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Radio, Shield, Cpu, Activity, ExternalLink, Zap, Network, Server, ArrowUpRight } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export function BentoSection() {
  const telecom = PROFILE_DATA.pillars[0];
  const iot = PROFILE_DATA.pillars[1];
  const ai = PROFILE_DATA.pillars[2];

  return (
    <section id="especialidades" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-wider uppercase mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Matriz de Especialidades</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Los Tres Pilares de Mi{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Perfil Profesional
            </span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-zinc-400">
            Una combinación singular que une la experiencia técnica pesada en terreno de telecomunicaciones con el desarrollo de software y la inteligencia artificial.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Telecomunicaciones (Large: 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between border border-cyan-500/20 bg-[#060c1d]/70"
          >
            {/* Background cyber accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-500" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 tracking-wider">
                  {telecom.badge}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>5G LIVE / 99.9% UPTIME</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <Radio className="w-6 h-6 text-cyan-400" />
                {telecom.title}
              </h3>
              <p className="font-mono text-xs text-cyan-400/80 mb-4 font-medium">
                {telecom.subtitle}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                {telecom.description}
              </p>

              {/* Real Telecom Field Imagery Showcase */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 group/img h-32 sm:h-36 bg-[#030611]">
                  <Image
                    src="/images/telecom-rooftop-site.webp"
                    alt="Estación Base y Antenas en Azoteas de Santiago"
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2.5">
                    <span className="font-mono text-[10px] text-cyan-300 font-bold tracking-tight">
                      ● SITIO AZOTEA SANTIAGO
                    </span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 group/img h-32 sm:h-36 bg-[#030611]">
                  <Image
                    src="/images/ericsson-antennas-rooftop.webp"
                    alt="Equipamiento Ericsson 3G/4G/5G"
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2.5">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold tracking-tight">
                      ● ERICSSON 5G/4G RAN
                    </span>
                  </div>
                </div>
              </div>

              {/* Signal & Carrier Status Visualizer */}
              <div className="p-4 rounded-2xl bg-[#030611]/80 border border-cyan-500/20 mb-6 font-mono text-xs">
                <div className="text-zinc-400 text-[11px] mb-2 flex items-center justify-between">
                  <span>TELEMETRÍA DE RED:</span>
                  <span className="text-cyan-300">ENTEL // WOM // ERICSSON</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/15">
                    <div className="text-cyan-400 font-bold text-sm">3.5 GHz</div>
                    <div className="text-[10px] text-zinc-400">5G NR BANDS</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-500/15">
                    <div className="text-blue-400 font-bold text-sm">MMOO / FO</div>
                    <div className="text-[10px] text-zinc-400">TRANSMISIÓN</div>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/15">
                    <div className="text-indigo-400 font-bold text-sm">AC/DC</div>
                    <div className="text-[10px] text-zinc-400">ENERGÍA CRÍTICA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-cyan-500/15">
              {telecom.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-zinc-900/80 text-zinc-300 border border-zinc-700/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Domótica & IoT Ablu Tech (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between border border-blue-500/20 bg-[#060c1d]/70"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold text-blue-300 bg-blue-950/80 border border-blue-500/30 tracking-wider">
                  {iot.badge}
                </span>
                <a
                  href="https://ablutech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>ablutech.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                {iot.title}
              </h3>
              <p className="font-mono text-xs text-blue-400/80 mb-4 font-medium">
                {iot.subtitle}
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                {iot.description}
              </p>

              {/* Real Project Visual: Ablu Tech Luxury Living Room */}
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 group/img h-44 sm:h-48 mb-5 bg-[#030611]">
                <Image
                  src="/images/ablutech_domotica.webp"
                  alt="Ablu Tech - Domótica y Espacios Inteligentes"
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent flex flex-col justify-end p-3">
                  <span className="font-mono text-[10px] text-blue-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    PROYECTOS RESIDENCIALES & CORPORATIVOS
                  </span>
                </div>
              </div>

              {/* IoT Live Monitoring Card */}
              <div className="p-4 rounded-2xl bg-[#030611]/80 border border-blue-500/20 mb-6 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                  <span>DISPOSITIVOS CONECTADOS:</span>
                  <span className="text-emerald-400">● 100% ONLINE</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-zinc-800 text-[11px]">
                  <span className="text-zinc-300">CCTV & NVR Inteligente</span>
                  <span className="text-cyan-400">Full HD / IP</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-zinc-800 text-[11px]">
                  <span className="text-zinc-300">Control de Acceso</span>
                  <span className="text-cyan-400">Biometría / RFID</span>
                </div>
                <div className="flex items-center justify-between py-1 text-[11px]">
                  <span className="text-zinc-300">Rutinas Automatizadas</span>
                  <span className="text-cyan-400">Luces & Clima</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-500/15">
              {iot.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-zinc-900/80 text-zinc-300 border border-zinc-700/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Automatización con IA (Full Width / 12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-12 glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-indigo-500/20 bg-[#060c1d]/70"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                {/* Header Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 tracking-wider">
                    {ai.badge}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-300">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>AGENTIC AI POWERED</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-indigo-400" />
                  {ai.title}
                </h3>
                <p className="font-mono text-xs text-indigo-400/80 mb-4 font-medium">
                  {ai.subtitle}
                </p>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  {ai.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {ai.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-zinc-900/80 text-zinc-300 border border-zinc-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Agent Flow Node Visualizer with High-Tech Graphic */}
              <div className="md:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 group/img h-40 sm:h-44 bg-[#030611]">
                  <Image
                    src="/images/ablutech_soporte.webp"
                    alt="Ablu Tech Neural Processor & Agentic IA"
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060c1d] via-transparent to-transparent flex items-end p-3">
                    <span className="font-mono text-[10px] text-cyan-300 font-bold">
                      ● NEURAL ENGINE & MULTI-AGENT PLATFORM
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#030611]/90 border border-indigo-500/25 font-mono text-xs space-y-2">
                  <div className="text-zinc-400 text-[11px] flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
                      <Network className="w-3.5 h-3.5 text-indigo-400" />
                      ORQUESTACIÓN DE MODELOS
                    </span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-200">1. Antigravity, OpenCode, Claude & Codex</span>
                      <span className="text-[10px] text-cyan-300">Desarrollo y Lógica</span>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-200">2. Dify Workflows & LLMs</span>
                      <span className="text-[10px] text-purple-300">Orquestación</span>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-200">3. MySQL, Postgres & MariaDB</span>
                      <span className="text-[10px] text-blue-300">Bases de Datos & APIs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
