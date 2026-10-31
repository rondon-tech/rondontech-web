"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, MessageSquare, Download, X, ChevronUp, Radio, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "@/data/profileData";

interface PoseConfig {
  src: string;
  label: string;
  status: string;
  badgeColor: string;
}

const SECTION_POSES: Record<string, PoseConfig> = {
  hero: {
    src: "/avatar/avatar-hud.webp",
    label: "Centro de Mando",
    status: "EN LÍNEA",
    badgeColor: "border-cyan-500/50 text-cyan-300",
  },
  especialidades: {
    src: "/avatar/avatar-specialties.webp",
    label: "Especialidades 5G & AI",
    status: "ESPECIALISTA",
    badgeColor: "border-blue-500/50 text-blue-300",
  },
  trayectoria: {
    src: "/avatar/avatar-hero.webp",
    label: "Trayectoria & Experiencia",
    status: "7+ AÑOS CORE",
    badgeColor: "border-indigo-500/50 text-indigo-300",
  },
  skills: {
    src: "/avatar/avatar-hero.webp",
    label: "Stack & Habilidades",
    status: "HARDWARE & SOFTWARE",
    badgeColor: "border-cyan-500/50 text-cyan-300",
  },
  consola: {
    src: "/avatar/avatar-terminal.webp",
    label: "Terminal Interactiva",
    status: "MODO OPERADOR",
    badgeColor: "border-emerald-500/50 text-emerald-300",
  },
  contacto: {
    src: "/avatar/avatar-contact.webp",
    label: "Contacto & Alianzas",
    status: "DISPONIBLE",
    badgeColor: "border-amber-500/50 text-amber-300",
  },
};

export function AvatarHUDWidget() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "especialidades", "trayectoria", "skills", "consola", "contacto"];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentPose = SECTION_POSES[activeSection] || SECTION_POSES.hero;

  const triggerDownloadCV = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#00f0ff", "#0066ff", "#ffffff"],
    });

    const link = document.createElement("a");
    link.href = "/cv/CV_Abrahan_Rondon.pdf";
    link.download = "CV_Abrahan_Rondon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-5 right-5 z-50 p-2.5 rounded-full bg-[#050c1e]/90 border border-cyan-500/40 text-cyan-400 backdrop-blur-md shadow-xl shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-all group"
        title="Abrir Asistente Holográfico"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400">
          <Image
            src={currentPose.src}
            alt="Abrahan Rondon HUD"
            width={80}
            height={80}
            className="object-cover object-top"
          />
        </div>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Quick Action Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 rounded-2xl border border-cyan-500/30 bg-[#050c1e]/95 backdrop-blur-xl p-4 shadow-2xl shadow-cyan-500/20 text-white font-mono"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-cyan-300">ACCIONES RÁPIDAS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              Explora la terminal interactiva, comunícate directamente o descarga el CV oficial.
            </p>

            <div className="space-y-2">
              <a
                href="#consola"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all text-xs flex items-center gap-2.5"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Abrir Terminal / Consola</span>
              </a>

              <a
                href={PROFILE_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all text-xs flex items-center gap-2.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Directo</span>
              </a>

              <button
                onClick={() => {
                  triggerDownloadCV();
                  setIsOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-all text-xs flex items-center gap-2.5 cursor-pointer text-left"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Descargar CV (PDF)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Reactive Avatar HUD Pill */}
      <motion.div
        layout
        className="group flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full border border-cyan-500/40 bg-[#050c1e]/90 backdrop-blur-md shadow-xl shadow-cyan-500/20 hover:border-cyan-400/80 transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Animated Avatar Frame with Posture Transitions */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-cyan-400/60 bg-gradient-to-b from-cyan-950/50 to-[#030712] shadow-inner flex items-end justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPose.src}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <Image
                src={currentPose.src}
                alt="Abrahan Rondon"
                width={90}
                height={90}
                className="object-contain object-bottom filter contrast-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Mini Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Dynamic Context Information */}
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-white tracking-wide">
              ABRAHAN RONDON
            </span>
          </div>
          <div className="text-[9px] text-cyan-300 font-medium">
            {currentPose.label}
          </div>
        </div>

        {/* Minimize Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors ml-1"
          title="Minimizar HUD"
        >
          <ChevronUp className="w-3.5 h-3.5 rotate-180" />
        </button>
      </motion.div>
    </div>
  );
}
