"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
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
    tag: "SMART SPACES & INMÓTICA",
    title: "Ablu Tech: Inmótica, CCTV Inteligente & Control.",
    desc: "Transformación de espacios residenciales y corporativos en entornos autónomos. Telemetría climática, videovigilancia IP con analítica de IA, control biométrico y automatización centralizada bajo estándares abiertos.",
    kpis: [
      { label: "Empresa", value: "Ablu Tech Ltda." },
      { label: "RUT Oficial", value: "78.539.015-6" },
      { label: "Protocolos", value: "Zigbee / Matter" },
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

  // Update video frame smoothly based on scroll using requestAnimationFrame throttling
  useEffect(() => {
    let animationFrameId: number;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (videoRef.current && !isPlaying && isLoaded) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          if (!videoRef.current) return;
          // Map 0.0 - 1.0 to video duration
          const targetTime = Math.min(Math.max(latest * duration, 0), duration);
          // Only update if difference > 0.04s to avoid mobile GPU micro-stutter
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.04) {
            videoRef.current.currentTime = targetTime;
            setCurrentTime(targetTime);
          }

          // Determine scene
          if (latest < 0.33) {
            setActiveSceneIndex(0);
          } else if (latest < 0.67) {
            setActiveSceneIndex(1);
          } else {
            setActiveSceneIndex(2);
          }
        });
      }
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
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
      className="relative w-full max-w-full min-w-0 h-[130vh] sm:h-[190vh] bg-[#000d10] text-white"
    >
      {/* Sticky Fullscreen Presentation */}
      <div className="sticky top-0 h-[100dvh] w-full max-w-full min-w-0 overflow-hidden flex flex-col justify-between px-4 pb-3 pt-20 sm:p-8 lg:p-12 z-20">
        
        {/* Background Video Layer with Film Vignette */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/media/showcase-scroll-motion.mp4"
            playsInline
            muted
            preload="metadata"
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
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-cyan-400/50 shadow-md shadow-cyan-400/30 shrink-0 bg-[#000d10]">
              <Image
                src="/brand/rondontech-emblem-circle.webp"
                alt="RondonTech Emblem"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/90 font-semibold">
              RONDONTECH // CINEMATIC SCROLL
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Scrubber timecode */}
            <div className="font-mono text-[11px] sm:text-xs tracking-wider text-white/90 bg-white/5 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10">
              <span className="text-cyan-400">TCR:</span> 00:0{Math.floor(currentTime)}:
              {Math.floor((currentTime % 1) * 100).toString().padStart(2, "0")} / 00:10:00
            </div>

            {/* Manual Play/Pause override */}
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-mono font-semibold bg-white text-[#000d10] hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> <span className="hidden xs:inline">Reproducir</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center / Left: Dynamic Editorial Scene Card */}
        <div className="relative z-10 max-w-2xl my-auto py-4 sm:py-8">
          <motion.div
            key={currentScene.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Scene tag & index */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-white/40">
                {currentScene.number}
              </span>
              <div className="h-px w-6 sm:w-8 bg-white/20" />
              <span
                className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border font-semibold"
                style={{
                  borderColor: `${currentScene.accentColor}60`,
                  color: currentScene.accentColor,
                  backgroundColor: `${currentScene.accentColor}15`,
                }}
              >
                {currentScene.tag}
              </span>
            </div>

            {/* Headline in Hyer Aviation style */}
            <h3 className="font-display-63 text-white tracking-tight">
              {currentScene.title}
            </h3>

            {/* Body with crisp contrast */}
            <p className="font-body-editorial text-zinc-200 max-w-xl text-sm sm:text-base leading-relaxed">
              {currentScene.desc}
            </p>

            {/* Technical KPIs */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10 max-w-lg">
              {currentScene.kpis.map((kpi, idx) => (
                <div key={idx} className="space-y-0.5 sm:space-y-1">
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white/60">
                    {kpi.label}
                  </div>
                  <div className="font-mono text-xs sm:text-base font-bold text-white">
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct jump to Especialidades when reaching Scene 03 */}
            {activeSceneIndex === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2"
              >
                <a
                  href="#especialidades"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono font-semibold bg-cyan-400 text-[#000d10] hover:bg-cyan-300 transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
                >
                  <span>Continuar a Especialidades</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar: Timeline Progress & Scene Switcher */}
        <div className="relative z-10 border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 w-full min-w-0">
          {/* Scroll instruction indicator */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
            <span className="truncate">DESPLÁZATE HACIA ABAJO PARA EXPLORAR</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cyan-400 shrink-0" />
          </div>

          {/* 3 Step Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
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
                className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono text-[11px] sm:text-xs transition-all cursor-pointer ${
                  activeSceneIndex === i
                    ? "bg-white text-[#000d10] font-bold"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
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