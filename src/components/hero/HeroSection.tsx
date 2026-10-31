"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, ShieldCheck, Radio, Cpu, Sparkles, MessageSquare, Download } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";
import confetti from "canvas-confetti";

const ROLES = [
  "Telecomunicaciones 5G/RF & Redes Móviles",
  "Domótica, CCTV & Espacios Inteligentes",
  "Agentes & Automatización con IA",
];

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const triggerDownloadCV = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f0ff", "#0066ff", "#38bdf8", "#ffffff"],
    });

    const link = document.createElement("a");
    link.href = "/cv/CV_Abrahan_Rondon.pdf";
    link.download = "CV_Abrahan_Rondon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-8 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Telemetry Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md mb-8 shadow-sm shadow-cyan-500/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            {PROFILE_DATA.status} // SANTIAGO, CL
          </span>
        </motion.div>

        {/* Main Name Heading with Cyber Gradient */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          <span className="text-zinc-300">Abrahan</span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent text-glow-cyan">
            Rondon
          </span>
        </motion.h1>

        {/* Dynamic Rotating Specialty */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-base sm:text-2xl text-cyan-400 font-semibold flex items-center gap-2"
            >
              <span className="text-blue-500">&gt;</span>
              <span>{ROLES[currentRoleIndex]}</span>
              <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-0.5" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed mb-10"
        >
          Ingeniero en Electrónica mención Control y TSU en Informática. Conectando la{" "}
          <strong className="text-white font-semibold">infraestructura crítica de telecomunicaciones (5G/RF/Transmisión)</strong> con la{" "}
          <strong className="text-cyan-300 font-semibold">seguridad electrónica IoT en Ablu Tech</strong> y la vanguardia de la{" "}
          <strong className="text-blue-400 font-semibold">automatización mediante agentes de IA</strong>.
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-16"
        >
          <a
            href="#consola"
            className="group px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <Terminal className="w-4 h-4" />
            <span>Abrir Terminal Interactiva</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={PROFILE_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-medium border border-cyan-500/30 bg-[#091122]/70 text-cyan-300 hover:bg-cyan-950/60 hover:border-cyan-400/60 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Directo</span>
          </a>

          <button
            onClick={triggerDownloadCV}
            className="px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-medium border border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Descargar CV</span>
          </button>
        </motion.div>

        {/* Telemetry Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl"
        >
          {PROFILE_DATA.telemetryMetrics.map((metric, i) => (
            <div
              key={i}
              className="glass-panel p-4 rounded-2xl border border-cyan-500/15 bg-[#050a17]/60 text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors" />
              <div className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {metric.label}
              </div>
              <div className="font-mono text-base sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {metric.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
