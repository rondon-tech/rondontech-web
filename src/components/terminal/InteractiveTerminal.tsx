"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Terminal, CornerDownLeft, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "@/data/profileData";

interface OutputLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string;
  isHtml?: boolean;
}

const COMMAND_CHIPS = ["status", "skills", "experience", "pillars", "contact", "cv", "clear"];

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "INICIALIZANDO RONDONTECH KERNEL v3.1 ... [OK]",
    },
    {
      id: "init-logo",
      type: "system",
      text: "SELLO OFICIAL: RondonTech Cyber-Aerospace R-Logo cargado [VERIFICADO]",
    },
    {
      id: "init-2",
      type: "system",
      text: "TELEMETRÍA CONECTADA: Santiago, Chile | Estación O&M Entel & Ablu Tech activa.",
    },
    {
      id: "init-3",
      type: "output",
      text: "Escribe un comando o haz clic en los chips rápidos inferiores. Prueba 'status' o 'cv'.",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    // Add input to history
    const userLine: OutputLine = {
      id: `cmd-${Date.now()}`,
      type: "input",
      text: `visitor@rondontech:~$ ${cmdText}`,
    };

    setCommandList((prev) => [...prev, cmdText]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let responseLines: OutputLine[] = [];

    switch (trimmed) {
      case "help":
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "output",
            text: "Comandos disponibles: 'status', 'skills', 'experience', 'pillars', 'contact', 'cv', 'clear'",
          },
        ];
        break;

      case "status":
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "output",
            text: "● STATUS: ONLINE // DISPONIBLE PARA NUEVOS RETOS PROFESIONALES",
          },
          {
            id: `res-${Date.now()}-2`,
            type: "output",
            text: "Ubicación: Santiago, Chile | Ingeniero en Electrónica & Automatización",
          },
          {
            id: `res-${Date.now()}-3`,
            type: "output",
            text: "Especialidades: Telecomunicaciones 5G/RF, Domótica & CCTV (Ablu Tech), Agentes de IA.",
          },
        ];
        break;

      case "skills":
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "output",
            text: ">>> MATRIZ DE COMPETENCIAS TÉCNICAS:",
          },
          {
            id: `res-${Date.now()}-2`,
            type: "output",
            text: "• Telecom & RAN: 5G NR, 4G LTE, GSM/UMTS, Ericsson RBS 6000, Huawei, Nokia, SiteMaster.",
          },
          {
            id: `res-${Date.now()}-3`,
            type: "output",
            text: "• Transmisión & Energía: Microondas (MMOO), Fibra Óptica, MPLS, Sistemas AC/DC, Rectificadores Eltek/Eaton, UPS.",
          },
          {
            id: `res-${Date.now()}-4`,
            type: "output",
            text: "• IoT & Domótica: CCTV IP/NVR, Control de Acceso, Rutinas inteligentes residenciales y oficinas (Ablu Tech).",
          },
          {
            id: `res-${Date.now()}-5`,
            type: "output",
            text: "• Software, IA & Bases de Datos: Google Antigravity, OpenCode, Claude Code, Codex, Dify, Python, Next.js, MySQL, PostgreSQL, MariaDB.",
          },
        ];
        break;

      case "pillars":
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "output",
            text: "PILARES ESTRATÉGICOS DE ABRAHAN RONDON:",
          },
          {
            id: `res-${Date.now()}-2`,
            type: "output",
            text: "1. Telecomunicaciones Críticas: Operación y comisionamiento 5G/RF y transmisión de datos.",
          },
          {
            id: `res-${Date.now()}-3`,
            type: "output",
            text: "2. Espacios Inteligentes (Ablu Tech): Domótica, CCTV y control de acceso integral.",
          },
          {
            id: `res-${Date.now()}-4`,
            type: "output",
            text: "3. Automatización con IA: Soluciones y agentes autónomos para optimización de procesos.",
          },
        ];
        break;

      case "experience":
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "output",
            text: ">>> HISTORIAL OPERACIONAL:",
          },
          {
            id: `res-${Date.now()}-2`,
            type: "output",
            text: "• Entel Connect Center (2023 - Presente): O&M de terreno de redes móviles 5G/LTE y transmisión.",
          },
          {
            id: `res-${Date.now()}-3`,
            type: "output",
            text: "• Ablu Tech Ltda. (2025 - Presente): Fundador & Director de Operaciones. Domótica e inmótica de alto estándar, CCTV con IA y automatización empresarial.",
          },
          {
            id: `res-${Date.now()}-4`,
            type: "output",
            text: "• WISECOM SpA (2022): Ingeniero TSSR WOM (Modernización RF y proyectos 5G).",
          },
          {
            id: `res-${Date.now()}-5`,
            type: "output",
            text: "• Telrad Services LATAM (2018 - 2022): O&M Ericsson RBS y transmisión para Entel.",
          },
          {
            id: `res-${Date.now()}-6`,
            type: "output",
            text: "• CelPlan Technologies (2017 - 2018): Jefe de grupo de instalaciones Claro, Movistar y WOM.",
          },
        ];
        break;

      case "contact":
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "output",
            text: ">>> VÍAS DE CONTACTO DIRECTO:",
          },
          {
            id: `res-${Date.now()}-2`,
            type: "output",
            text: `• WhatsApp: +56 9 6552 9637 (${PROFILE_DATA.whatsappUrl})`,
          },
          {
            id: `res-${Date.now()}-3`,
            type: "output",
            text: `• LinkedIn: ${PROFILE_DATA.linkedin}`,
          },
          {
            id: `res-${Date.now()}-4`,
            type: "output",
            text: `• Email: ${PROFILE_DATA.email}`,
          },
          {
            id: `res-${Date.now()}-5`,
            type: "output",
            text: `• Sitio Web: https://${PROFILE_DATA.domain} | https://ablutech.com`,
          },
        ];
        break;

      case "cv":
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#00f0ff", "#0066ff", "#38bdf8", "#10b981"],
        });

        const link = document.createElement("a");
        link.href = "/cv/CV_Abrahan_Rondon.pdf";
        link.download = "CV_Abrahan_Rondon.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "system",
            text: "✔ Descarga del currículum vitae iniciada: CV_Abrahan_Rondon.pdf",
          },
          {
            id: `res-${Date.now()}-2`,
            type: "output",
            text: "Documento generado con especificaciones técnicas ATS, historial y certificaciones.",
          },
        ];
        break;

      default:
        responseLines = [
          {
            id: `res-${Date.now()}-1`,
            type: "error",
            text: `Comando no reconocido: '${trimmed}'. Escribe 'help' para ver los comandos válidos.`,
          },
        ];
        break;
    }

    setHistory((prev) => [...prev, userLine, ...responseLines]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <section id="consola" className="py-20 sm:py-24 px-4 sm:px-8 relative z-10 bg-[#0f0f1c] text-white border-y border-white/10 w-full max-w-full min-w-0 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 w-full min-w-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 bg-white/5 text-[#bc7155] font-mono text-[10px] sm:text-xs tracking-wider uppercase mb-4 max-w-full">
            <Terminal className="w-3.5 h-3.5 text-[#bc7155] shrink-0" />
            <span className="truncate">INTERACTIVE TELEMETRY TERMINAL // KERNEL v3.0</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 break-words">
            Consola Operacional de Comandos.
          </h2>
          <p className="font-body-editorial text-zinc-400 max-w-lg text-sm sm:text-base break-words">
            Interactúa en tiempo real con el runtime para auditar experiencia, credenciales y descargar el CV oficial.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-none border border-white/15 bg-[#151623] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Window Header Bar with Operator Live Feed */}
          <div className="px-4 py-2.5 bg-[#080e1e] border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-cyan-400/80 bg-black flex-shrink-0">
                  <Image
                    src="/avatar/avatar-terminal.webp"
                    alt="Operator Abrahan Rondon"
                    width={40}
                    height={40}
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay pointer-events-none" />
                </div>
                <span className="text-xs text-zinc-300 font-mono font-medium hidden sm:inline">
                  OPERATOR: ABRAHAN RONDON
                </span>
                <span className="text-[10px] text-cyan-400 font-mono sm:hidden">OPERATOR ACTIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400/80">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-cyan-400/60 shadow-sm shadow-cyan-400/30 shrink-0 bg-black">
                <Image
                  src="/brand/rondontech-emblem-circle.webp"
                  alt="RondonTech Emblem"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">RONDONTECH KERNEL // PORT 22</span>
              <span className="sm:hidden">ONLINE</span>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 min-h-[300px] max-h-[460px] overflow-y-auto space-y-2 cursor-text"
          >
            {history.map((line) => {
              if (line.type === "input") {
                return (
                  <div key={line.id} className="text-cyan-300 font-semibold">
                    {line.text}
                  </div>
                );
              } else if (line.type === "system") {
                return (
                  <div key={line.id} className="text-emerald-400 font-medium">
                    {line.text}
                  </div>
                );
              } else if (line.type === "error") {
                return (
                  <div key={line.id} className="text-red-400 font-medium">
                    {line.text}
                  </div>
                );
              } else {
                return (
                  <div key={line.id} className="text-zinc-300 leading-relaxed pl-2">
                    {line.text}
                  </div>
                );
              }
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Input Line */}
          <div className="px-4 sm:px-6 py-3 bg-[#060b18] border-t border-cyan-500/20 flex items-center gap-2">
            <span className="text-cyan-400 font-bold whitespace-nowrap">visitor@rondontech:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe 'help', 'status', 'skills' o 'cv'..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-zinc-600 font-mono text-xs sm:text-sm"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-3 h-3" />
              <span>Ejecutar</span>
            </button>
          </div>

          {/* Suggested Quick Chips */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#040813] border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-zinc-500 whitespace-nowrap">Comandos rápidos:</span>
            {COMMAND_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => executeCommand(chip)}
                className="px-2.5 py-1 rounded-md bg-zinc-900 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-950/60 hover:border-cyan-400/50 transition-all whitespace-nowrap cursor-pointer active:scale-95"
              >
                ${chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
