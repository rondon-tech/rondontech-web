"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Radio, Cpu, Sparkles, ShieldCheck } from "lucide-react";

export function HeroAvatarHolo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics with spring smoothing
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const holoGlowX = useTransform(smoothX, [-0.5, 0.5], ["30%", "70%"]);
  const holoGlowY = useTransform(smoothY, [-0.5, 0.5], ["30%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none perspective-1000"
      style={{ perspective: 1200 }}
    >
      {/* Outer Hologram Radial Halo */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer Cyber Tech HUD Ring (Rotating Clockwise) */}
      <div className="absolute inset-2 sm:inset-4 rounded-full border border-cyan-500/20 animate-[spin_32s_linear_infinite] pointer-events-none">
        {/* Ticks on Ring */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#0066ff]" />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#0066ff]" />
      </div>

      {/* Middle Segmented HUD Ring (Counter-Clockwise) */}
      <div className="absolute inset-6 sm:inset-10 rounded-full border border-dashed border-blue-400/25 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

      {/* Inner Holographic Portal Frame with 3D Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Glassmorphic Portal Circle */}
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full p-2 bg-gradient-to-b from-cyan-500/30 via-[#030712]/80 to-blue-600/30 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_40px_rgba(0,240,255,0.25)] overflow-hidden">
          {/* Internal Scanlines Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Dynamic Laser Scan Beam */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff] z-20 pointer-events-none"
            animate={{
              top: ["0%", "100%", "0%"],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* High-Resolution Cutout Avatar */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-end justify-center">
            <Image
              src="/avatar/avatar-hero.webp"
              alt="Abrahan Rondon - Holographic Avatar"
              width={700}
              height={700}
              priority
              className="w-[96%] h-[96%] object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter contrast-105"
            />
          </div>

          {/* Hologram Pedestal Base Glow */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-cyan-500/30 via-cyan-500/10 to-transparent pointer-events-none" />
        </div>

        {/* Floating Telemetry Badge 1: 5G & RF (Top-Left) */}
        <motion.div
          style={{ transform: "translateZ(30px)" }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1 -left-2 sm:top-4 sm:-left-4 z-30 px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-[#050c1e]/90 backdrop-blur-md shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <div className="text-left font-mono">
            <div className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">CORE RF</div>
            <div className="text-xs text-white font-bold">5G / Microondas</div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge 2: AI Automation (Top-Right) */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1 -right-2 sm:top-8 sm:-right-4 z-30 px-3 py-1.5 rounded-xl border border-blue-500/40 bg-[#050c1e]/90 backdrop-blur-md shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <div className="p-1 rounded-md bg-blue-500/20 text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-left font-mono">
            <div className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">AI WORKFLOWS</div>
            <div className="text-xs text-white font-bold">Multi-Agentes</div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge 3: Domótica & Seguridad (Bottom-Right) */}
        <motion.div
          style={{ transform: "translateZ(35px)" }}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-2 sm:bottom-4 sm:-right-2 z-30 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-[#050c1e]/90 backdrop-blur-md shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left font-mono">
            <div className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">ABLU TECH</div>
            <div className="text-xs text-white font-bold">CCTV & Domótica</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
