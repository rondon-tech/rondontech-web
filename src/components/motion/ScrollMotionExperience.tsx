"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Activity, Cpu, Wifi, ShieldCheck, ChevronDown } from "lucide-react";

interface SceneInfo {
  start: number;
  end: number;
  number: string;
  tag: string;
  title: string;
  desc: string;
  kpis: { label: string; value: string }[];
  accentColor: string;
}

const SCENES: SceneInfo[] = [
  {
    start: 0,
    end: 0.33,
    number: "01",
    tag: "CRITICAL INFRASTRUCTURE",
    title: "Data Centers, Redes de Fibra & Respaldo Crítico.",
    desc: "Auditoría, montaje y puesta en marcha de infraestructura de alta disponibilidad. Racks de telecomunicaciones, distribución de energía AC/DC, sistemas UPS y supervisión en salas de conmutación.",
    kpis: [
      { label: "Disponibilidad", value: "99.999%" },
      { label: "Monitoreo", value: "24/7/365" },
      { label: "Normativa", value: "Tier III / IV" },
    ],
    accentColor: "#00f0ff",
  },
  {
    start: 0.33,
    end: 0.67,
    number: "02",
    tag: "ADVANCED AI & SOFTWARE",
    title: "Arquitectura Multi-Agente & Plataformas Cloud.",
    desc: "Diseño y despliegue de soluciones full-stack e ingeniería de agentes de IA autónomos. Automatización de flujos de trabajo de misión crítica, APIs escalables y telemetría en tiempo real.",
    kpis: [
      { label: "Stack", value: "Next.js + Node" },
      { label: "Orquestación", value: "Multi-Agent AI" },
      { label: "Latencia", value: "< 25ms Edge" },
    ],
    accentColor: "#bc7155",
  },
  {
    start: 0.67,
    end: 1.0,
    number: "03",
    tag: "SMART SPACES & DOMÓTICA",
    title: "Ablu Tech: Inmótica, CCTV Inteligente & Control.",
    desc: "Transformación de espacios residenciales y corporativos en ecosistemas inteligentes. Telemetría climática, videovigilancia IP analítica y automatización centralizada de accesos y energía.",
    kpis: [
      { label: "Empresa", value: "Ablu Tech SpA" },
      { label: "Protocolos", value: "Zigbee / Matter" },
      { label: "Seguridad", value: "CCTV AI Analitycs" },
    ],
    accentColor: "#38bdf8",
  },
];

export function ScrollMotionExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Bind scroll progress inside the container (250vh track)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const duration = 10.0; // 10 seconds total video duration

  // Update video frame smoothly based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (videoRef.current && !isPlaying && isLoaded) {
        // Map 0.0 - 1.0 to video duration
        const targetTime = Math.min(Math.max(latest * duration, 0), duration);
        videoRef.current.currentTime = targetTime;
        setCurrentTime(targetTime);

        // Determine scene
        if (latest < 0.33) {
          setActiveSceneIndex(0);
        } else if (latest < 0.67) {
          setActiveSceneIndex(1);
        } else {
          setActiveSceneIndex(2);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isPlaying, isLoaded]);

  // Video time update listener when playing manually
  const handleTimeUpdate = () => {
    if (videoRef.current && isPlaying) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      const ratio = time / duration;
      if (ratio < 0.33) setActiveSceneIndex(0);
      else if (ratio < 0.67) setActiveSceneIndex(1);
      else setActiveSceneIndex(2);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const currentScene = SCENES[activeSceneIndex];

  return (
    <section
      ref={containerRef}
      id="cinematica"
      className="relative w-full h-[280vh] bg-[#000d10] text-white"
    >
      {/* Sticky Fullscreen Presentation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-12 z-20">
        
        {/* Background Video Layer with Film Vignette */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/media/showcase-scroll-motion.mp4"
            playsInline
            muted
            preload="auto"
            onLoadedData={() => setIsLoaded(true)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover opacity-80"
          />
          {/* Editorial Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000d10] via-transparent to-[#000d10]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000d10]/90 via-[#000d10]/40 to-transparent pointer-events-none" />
          {/* Subtle Film Grain / Grid */}
          <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
        </div>

        {/* Top HUD: Editorial Status & Timecode */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              CINEMATIC SCROLL TELEMETRY // SEED 2026
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Scrubber timecode */}
            <div className="font-mono text-xs tracking-wider text-white/80 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="text-cyan-400">TCR:</span> 00:0{Math.floor(currentTime)}:
              {Math.floor((currentTime % 1) * 100).toString().padStart(2, "0")} / 00:10:00
            </div>

            {/* Manual Play/Pause override */}
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white text-[#000d10] hover:bg-zinc-200 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pausar
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Reproducir
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center / Left: Dynamic Editorial Scene Card */}
        <div className="relative z-10 max-w-2xl my-auto py-8">
          <motion.div
            key={currentScene.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Scene tag & index */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-bold text-white/30">
                {currentScene.number}
              </span>
              <div className="h-px w-8 bg-white/20" />
              <span
                className="font-mono text-xs uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: `${currentScene.accentColor}50`,
                  color: currentScene.accentColor,
                  backgroundColor: `${currentScene.accentColor}10`,
                }}
              >
                {currentScene.tag}
              </span>
            </div>

            {/* Headline in Hyer Aviation style */}
            <h3 className="font-display-63 text-white tracking-tight">
              {currentScene.title}
            </h3>

            {/* Body */}
            <p className="font-body-editorial text-zinc-300 max-w-xl text-base sm:text-lg">
              {currentScene.desc}
            </p>

            {/* Technical KPIs */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
              {currentScene.kpis.map((kpi, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                    {kpi.label}
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold text-white">
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Timeline Progress & Scene Switcher */}
        <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Scroll instruction indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>DESPLÁZATE HACIA ABAJO PARA EXPLORAR LA SECUENCIA</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </div>

          {/* 3 Step Indicator */}
          <div className="flex items-center gap-2">
            {SCENES.map((scene, i) => (
              <button
                key={scene.number}
                onClick={() => {
                  if (videoRef.current) {
                    const targetT = (i * 3.33) + 0.1;
                    videoRef.current.currentTime = targetT;
                    setCurrentTime(targetT);
                    setActiveSceneIndex(i);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  activeSceneIndex === i
                    ? "bg-white text-[#000d10] font-bold"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{scene.number}</span>
                <span className="hidden md:inline">{scene.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-[#bc7155] to-blue-500 transition-all duration-100 ease-out"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}