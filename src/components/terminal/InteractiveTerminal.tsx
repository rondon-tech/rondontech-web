"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Terminal, CornerDownLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "@/data/profileData";
import {
  HARNESS_TELEMETRY,
  RONDONTECH_ADAPTER_TELEMETRY,
  type DemoRunTelemetry,
} from "@/data/harnessTelemetry";

type OutputLineType =
  | "input"
  | "output"
  | "system"
  | "error"
  | "header"
  | "accent"
  | "meta"
  | "diff-add"
  | "diff-del";

interface OutputLine {
  id: string;
  type: OutputLineType;
  text: string;
}

type TelemetryTarget = "demo" | "rondon";

const COMMAND_CHIPS = [
  "status",
  "adapter",
  "harness",
  "trace",
  "library",
  "skills",
  "experience",
  "pillars",
  "contact",
  "cv",
  "clear",
];

const TELEMETRY_DATASETS: Record<
  TelemetryTarget,
  { tag: string; title: string; data: DemoRunTelemetry }
> = {
  demo: {
    tag: "DEMO // ACCOUNTING",
    title: "Google Research Upstream Demo (runs/demo)",
    data: HARNESS_TELEMETRY,
  },
  rondon: {
    tag: "RONDONTECH // TELECOM-INFRA",
    title: "RondonTech Engineering Adapter (runs/rondontech)",
    data: RONDONTECH_ADAPTER_TELEMETRY,
  },
};

const INITIAL_HISTORY: OutputLine[] = [
  {
    id: "init-1",
    type: "system",
    text: "INICIALIZANDO RONDONTECH KERNEL v3.2 ... [OK]",
  },
  {
    id: "init-logo",
    type: "system",
    text: "SELLO OFICIAL: RondonTech Cyber-Aerospace R-Logo cargado [VERIFICADO]",
  },
  {
    id: "init-2",
    type: "system",
    text: "TELEMETRÍA CONECTADA: Santiago, Chile | Estación O&M Entel, Ablu Tech & Harness² Lab activa.",
  },
  {
    id: "init-harness",
    type: "accent",
    text: `HARNESS² ENGINE: ${HARNESS_TELEMETRY.packageName} v${HARNESS_TELEMETRY.packageVersion} (${HARNESS_TELEMETRY.paperRef}) | ${HARNESS_TELEMETRY.pythonRuntime} | ${HARNESS_TELEMETRY.packageManager}`,
  },
  {
    id: "init-adapter",
    type: "accent",
    text: `ADAPTADOR FASE 3: ${RONDONTECH_ADAPTER_TELEMETRY.domain} (${RONDONTECH_ADAPTER_TELEMETRY.taskComparisons.map((t) => t.taskId).join(" + ")}) | exit ${RONDONTECH_ADAPTER_TELEMETRY.exitCode}`,
  },
  {
    id: "init-3",
    type: "output",
    text: "Escribe un comando o haz clic en los chips rápidos inferiores. Prueba 'adapter', 'harness', 'trace', 'library' o 'cv'.",
  },
];

function resolveTarget(arg?: string): TelemetryTarget | null {
  if (!arg) return null;
  if (["rondon", "rondontech", "telecom", "adapter"].includes(arg)) {
    return "rondon";
  }
  if (["demo", "upstream", "accounting", "ledger"].includes(arg)) {
    return "demo";
  }
  return null;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<OutputLine[]>(INITIAL_HISTORY);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const outputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineCounterRef = useRef(0);

  const nextLineId = (prefix = "line") => {
    lineCounterRef.current += 1;
    return `${prefix}-${lineCounterRef.current}`;
  };

  useEffect(() => {
    const container = outputContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const makeLines = (
    entries: Array<{ type: OutputLineType; text: string }>
  ): OutputLine[] =>
    entries.map((entry) => ({
      id: nextLineId("res"),
      type: entry.type,
      text: entry.text,
    }));

  const buildDiffEntries = (
    data: DemoRunTelemetry
  ): Array<{ type: OutputLineType; text: string }> => {
    const header = {
      type: "header" as OutputLineType,
      text: `--- DIFF REAL ADOPTADO (${data.editedComponentPath}: ${data.baseScriptBytes}B -> ${data.adoptedScriptBytes}B) ---`,
    };
    const lines = data.unifiedDiff.split("\n").map((line) => {
      let type: OutputLineType = "meta";
      if (line.startsWith("+") && !line.startsWith("+++")) {
        type = "diff-add";
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        type = "diff-del";
      }
      return { type, text: line };
    });
    return [header, ...lines];
  };

  const buildHarnessEntries = (
    target: TelemetryTarget
  ): Array<{ type: OutputLineType; text: string }> => {
    const { title, data } = TELEMETRY_DATASETS[target];
    const modifiedComponents = data.components.filter(
      (c) => c.demoStatus === "modified"
    );

    const componentLines = data.components.map((c) => {
      const sizeTag = c.demoBytes !== null ? `, ${c.demoBytes}B` : "";
      return {
        type: (c.demoStatus === "modified"
          ? "system"
          : c.demoStatus === "active"
            ? "accent"
            : "output") as OutputLineType,
        text: `• [${c.id.toUpperCase()}] ${c.name} (${c.contextScope} · ${c.runtimeRole}) -> ${c.opencodePath} [${c.demoStatus}${sizeTag}]`,
      };
    });

    return [
      {
        type: "header",
        text: `>>> HARNESS² ARCHITECTURE // ${title}`,
      },
      {
        type: "meta",
        text: `Engine: ${data.packageName} v${data.packageVersion} (${data.license}, ${data.paperRef}) | Repo: ${data.repository}`,
      },
      {
        type: "meta",
        text: `Runtime: ${data.pythonRuntime} + ${data.packageManager} | Dominio: ${data.domain} (k=${data.kBudget})`,
      },
      {
        type: "accent",
        text: `Comando: '${data.command}' (exit ${data.exitCode}) | Executions: ${data.totalExecutions} | Editor calls: ${data.totalEditorCalls} | Costo: $${data.totalUsdCost.toFixed(2)}`,
      },
      {
        type: "meta",
        text: `Presupuesto Always-On: ${data.adoptedAlwaysOnChars} / ${data.alwaysOnMaxChars} chars max`,
      },
      {
        type: "header",
        text: "--- SUPERFICIE EDITABLE DEL HARNESS (c1..c8) ---",
      },
      ...componentLines,
      ...modifiedComponents.map((comp) => ({
        type: "meta" as OutputLineType,
        text: `Nota [${comp.id.toUpperCase()}]: ${comp.description}`,
      })),
    ];
  };

  const buildTraceEntries = (
    target: TelemetryTarget,
    compactStages: boolean
  ): Array<{ type: OutputLineType; text: string }> => {
    const { tag, data } = TELEMETRY_DATASETS[target];

    const taskLines = data.taskComparisons.flatMap((task) => [
      {
        type: "accent" as OutputLineType,
        text: `• ${task.taskId} (${task.sourceFile})`,
      },
      {
        type: "output" as OutputLineType,
        text: `  BASE: ${task.baseOutput}  ==>  ADOPTED (${task.adoptedAggLabel} / ${task.adoptedSeqLabel}): ${task.adoptedOutput} [fp:${task.harnessFingerprint}]`,
      },
    ]);

    const stages = compactStages
      ? data.recursionTrace.filter(
          (step) => step.phase === "BASE" || step.phase === "COMPOSE"
        )
      : data.recursionTrace;

    const stageLines = stages.map((step) => ({
      type: (step.phase === "COMPOSE"
        ? "system"
        : step.keptBase
          ? "meta"
          : "output") as OutputLineType,
      text: `• [${step.mode.toUpperCase()}] ${step.phase} (${step.label}/${step.dim}) -> ${step.outputPreview} | keptBase=${step.keptBase} | ${step.notes}`,
    }));

    return [
      {
        type: "header",
        text: `>>> TRAZA PROPOSE-PROBE-COMPOSE // ${tag} (k=${data.kBudget})`,
      },
      {
        type: "meta",
        text: `Tareas: ${data.tasksCompleted} completadas, ${data.tasksFailed} fallidas | Rollouts/modo-tarea: ${data.rolloutsPerModeTask} | Etapas/modo-tarea: ${data.stagesPerModeTask}`,
      },
      {
        type: "header",
        text: "--- CONTRASTE DE EJECUCIÓN (BASE vs ADOPTED) ---",
      },
      ...taskLines,
      {
        type: "header",
        text: compactStages
          ? "--- ETAPAS CLAVE (BASE & COMPOSE) ---"
          : "--- ETAPAS RECURSIVAS COMPLETAS (agg: paralelo · seq: secuencial) ---",
      },
      ...stageLines,
      ...buildDiffEntries(data),
    ];
  };

  const buildLibraryEntries = (
    target: TelemetryTarget,
    compact: boolean
  ): Array<{ type: OutputLineType; text: string }> => {
    const { tag, data } = TELEMETRY_DATASETS[target];

    if (compact) {
      const primary = data.experienceLessons[0];
      const rolloutLines = data.experienceLessons.map((entry) => ({
        type: "output" as OutputLineType,
        text: `• [${entry.mode.toUpperCase()}] ${entry.taskId} -> ${entry.adoptedLabel} (${entry.adoptedRunId}) | libraryEntriesBefore=${entry.libraryEntriesBefore} | verdict=${entry.verdict}`,
      }));
      return [
        {
          type: "header",
          text: `>>> EXPERIENCE.md & INDEX.md // ${tag}`,
        },
        ...rolloutLines,
        ...(primary
          ? [
              {
                type: "system" as OutputLineType,
                text: `  Cue: "${primary.cue}" -> Lesson: "${primary.lesson}"`,
              },
              {
                type: "meta" as OutputLineType,
                text: `  Evidencia: ${primary.evidence} (${primary.confidence}) | ${primary.componentsSummary}`,
              },
            ]
          : []),
      ];
    }

    const lessonLines = data.experienceLessons.flatMap((entry) => [
      {
        type: "accent" as OutputLineType,
        text: `• [${entry.mode.toUpperCase()}] ${entry.taskId} -> ${entry.adoptedLabel} (${entry.adoptedRunId}) [verdict: ${entry.verdict}]`,
      },
      {
        type: "output" as OutputLineType,
        text: `  Componente: ${entry.componentEdited} (${entry.candidateRef}) | Cambio: ${entry.changeSummary}`,
      },
      {
        type: "system" as OutputLineType,
        text: `  Cue: "${entry.cue}" -> Lesson: "${entry.lesson}"`,
      },
      {
        type: "meta" as OutputLineType,
        text: `  Evidencia: ${entry.evidence} (confidence: ${entry.confidence})`,
      },
      {
        type: "meta" as OutputLineType,
        text: `  Estado: ${entry.componentsSummary} | libraryEntriesBefore=${entry.libraryEntriesBefore} | fp:${entry.harnessFingerprint}`,
      },
    ]);

    return [
      {
        type: "header",
        text: `>>> HARNESSING LIBRARY // EXPERIENCE.md & INDEX.md (${tag})`,
      },
      {
        type: "meta",
        text: `Rollouts adoptados persistidos: ${data.experienceLessons.length} registros (modos agg y seq)`,
      },
      ...lessonLines,
    ];
  };

  const buildAdapterResponse = (target: TelemetryTarget): OutputLine[] => {
    const { data } = TELEMETRY_DATASETS[target];
    const primaryLesson = data.experienceLessons[0];

    return makeLines([
      {
        type: "header",
        text: `>>> RONDONTECH DOMAIN ADAPTER // ${data.domain.toUpperCase()} (${data.command})`,
      },
      {
        type: "accent",
        text: `Contrato: BenchmarkAdapter / BenchSpec / BenchPrompts / OpencodeSubstrate | k=${data.kBudget} | ${data.tasksCompleted}/${data.tasksCompleted + data.tasksFailed} tareas OK | ${data.totalExecutions} execs | ${data.totalEditorCalls} editor calls | $${data.totalUsdCost.toFixed(2)} USD`,
      },
      {
        type: "meta",
        text: `Always-On: ${data.adoptedAlwaysOnChars} / ${data.alwaysOnMaxChars} chars | Componentes editados: c2 guardrails.md (188B), c3 LongTermMEMORY.md (330B), c7 ${data.editedComponentPath} (${data.baseScriptBytes}B -> ${data.adoptedScriptBytes}B)`,
      },
      {
        type: "header",
        text: "--- AUDITORÍA DE TAREAS REALES (runs/rondontech) ---",
      },
      ...data.taskComparisons.flatMap((task) => [
        {
          type: "accent" as OutputLineType,
          text: `• ${task.taskId} (${task.sourceFile})`,
        },
        {
          type: "meta" as OutputLineType,
          text: `  Muestras: ${task.amounts.join(" · ")}`,
        },
        {
          type: "output" as OutputLineType,
          text: `  BASE:    ${task.baseOutput}`,
        },
        {
          type: "system" as OutputLineType,
          text: `  ADOPTED: ${task.adoptedOutput} (${task.adoptedAggLabel}/${task.adoptedSeqLabel}, fp:${task.harnessFingerprint})`,
        },
      ]),
      ...buildDiffEntries(data),
      ...(primaryLesson
        ? [
            {
              type: "header" as OutputLineType,
              text: "--- RETENCIÓN EN EXPERIENCE.md ---",
            },
            {
              type: "system" as OutputLineType,
              text: `Cue: "${primaryLesson.cue}" -> Lesson: "${primaryLesson.lesson}"`,
            },
            {
              type: "meta" as OutputLineType,
              text: `Evidencia: ${primaryLesson.evidence} | libraryEntriesBefore: 0 -> 1`,
            },
          ]
        : []),
      {
        type: "meta",
        text: "Tip: ejecuta 'harness rondon', 'trace rondon' o 'library rondon' (o 'demo' para el run upstream de accounting).",
      },
    ]);
  };

  const executeCommand = (cmdText: string) => {
    const normalized = cmdText.trim().toLowerCase().replace(/\s+/g, " ");
    if (!normalized) return;

    const [command, arg] = normalized.split(" ");

    const userLine: OutputLine = {
      id: nextLineId("cmd"),
      type: "input",
      text: `visitor@rondontech:~$ ${cmdText}`,
    };

    setCommandList((prev) => [...prev, cmdText]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let responseLines: OutputLine[] = [];

    switch (command) {
      case "help":
        responseLines = makeLines([
          {
            type: "header",
            text: ">>> COMANDOS DISPONIBLES (RONDONTECH KERNEL v3.2):",
          },
          {
            type: "accent",
            text: "• adapter    — Adaptador Fase 3 RondonTech (Telecom 5G NR / -48V DC / Tier III SLA)",
          },
          {
            type: "accent",
            text: "• harness    — Arquitectura Harness² c1..c8 ('harness demo' o 'harness rondon')",
          },
          {
            type: "accent",
            text: "• trace      — Traza Propose-Probe-Compose y diffs reales ('trace demo' / 'trace rondon')",
          },
          {
            type: "accent",
            text: "• library    — Lecciones EXPERIENCE.md ('library demo' / 'library rondon')",
          },
          {
            type: "output",
            text: "• status     — Estado operativo, ubicación y especialidades actuales",
          },
          {
            type: "output",
            text: "• skills     — Matriz técnica (5G/RF, IoT/Domótica, Software/IA, BBDD)",
          },
          {
            type: "output",
            text: "• experience — Historial operacional (Entel, Ablu Tech, WISECOM, Telrad, CelPlan)",
          },
          {
            type: "output",
            text: "• pillars    — Pilares estratégicos de ingeniería y automatización",
          },
          {
            type: "output",
            text: "• contact    — Canales directos (WhatsApp, LinkedIn, Email, Web)",
          },
          {
            type: "output",
            text: "• cv         — Descarga oficial del CV en PDF (CV_Abrahan_Rondon.pdf)",
          },
          {
            type: "output",
            text: "• clear      — Limpia la salida de la terminal",
          },
        ]);
        break;

      case "adapter": {
        if (arg) {
          const target = resolveTarget(arg);
          if (!target) {
            responseLines = makeLines([
              {
                type: "error",
                text: `Argumento no reconocido '${arg}' para 'adapter'. Usa 'adapter', 'adapter rondon' o 'adapter demo'.`,
              },
            ]);
            break;
          }
          responseLines = buildAdapterResponse(target);
        } else {
          responseLines = buildAdapterResponse("rondon");
        }
        break;
      }

      case "harness": {
        if (arg) {
          const target = resolveTarget(arg);
          if (!target) {
            responseLines = makeLines([
              {
                type: "error",
                text: `Argumento no reconocido '${arg}' para 'harness'. Usa 'harness', 'harness demo' o 'harness rondon'.`,
              },
            ]);
            break;
          }
          responseLines = makeLines(buildHarnessEntries(target));
        } else {
          responseLines = makeLines([
            ...buildHarnessEntries("demo"),
            {
              type: "meta",
              text: `Fase 3 disponible: ejecuta 'harness rondon' o 'adapter' para inspeccionar c1..c8 de ${RONDONTECH_ADAPTER_TELEMETRY.domain} (${RONDONTECH_ADAPTER_TELEMETRY.adoptedAlwaysOnChars} chars always-on).`,
            },
          ]);
        }
        break;
      }

      case "trace": {
        if (arg) {
          const target = resolveTarget(arg);
          if (!target) {
            responseLines = makeLines([
              {
                type: "error",
                text: `Argumento no reconocido '${arg}' para 'trace'. Usa 'trace', 'trace demo' o 'trace rondon'.`,
              },
            ]);
            break;
          }
          responseLines = makeLines(buildTraceEntries(target, false));
        } else {
          responseLines = makeLines([
            ...buildTraceEntries("demo", true),
            ...buildTraceEntries("rondon", true),
            {
              type: "meta",
              text: "Tip: ejecuta 'trace demo' o 'trace rondon' para desplegar las 13 etapas completas de cada corrida.",
            },
          ]);
        }
        break;
      }

      case "library": {
        if (arg) {
          const target = resolveTarget(arg);
          if (!target) {
            responseLines = makeLines([
              {
                type: "error",
                text: `Argumento no reconocido '${arg}' para 'library'. Usa 'library', 'library demo' o 'library rondon'.`,
              },
            ]);
            break;
          }
          responseLines = makeLines(buildLibraryEntries(target, false));
        } else {
          responseLines = makeLines([
            ...buildLibraryEntries("demo", true),
            ...buildLibraryEntries("rondon", true),
            {
              type: "meta",
              text: "Tip: ejecuta 'library demo' o 'library rondon' para ver los 4 rollouts detallados de cada dominio.",
            },
          ]);
        }
        break;
      }

      case "status":
        responseLines = makeLines([
          {
            type: "system",
            text: "● STATUS: ONLINE // DISPONIBLE PARA NUEVOS RETOS PROFESIONALES",
          },
          {
            type: "output",
            text: "Ubicación: Santiago, Chile | Ingeniero en Electrónica & Automatización",
          },
          {
            type: "output",
            text: "Especialidades: Telecomunicaciones 5G/RF, Domótica & CCTV (Ablu Tech), Agentes de IA (Harness²).",
          },
        ]);
        break;

      case "skills":
        responseLines = makeLines([
          {
            type: "header",
            text: ">>> MATRIZ DE COMPETENCIAS TÉCNICAS:",
          },
          {
            type: "output",
            text: "• Telecom & RAN: 5G NR, 4G LTE, GSM/UMTS, Ericsson RBS 6000, Huawei, Nokia, SiteMaster.",
          },
          {
            type: "output",
            text: "• Transmisión & Energía: Microondas (MMOO), Fibra Óptica, MPLS, Sistemas AC/DC, Rectificadores Eltek/Eaton, UPS.",
          },
          {
            type: "output",
            text: "• IoT & Domótica: CCTV IP/NVR, Control de Acceso, Rutinas inteligentes residenciales y oficinas (Ablu Tech).",
          },
          {
            type: "output",
            text: "• Software, IA & Bases de Datos: Google Antigravity, OpenCode, Claude Code, Codex, Dify, Python, Next.js, MySQL, PostgreSQL, MariaDB.",
          },
        ]);
        break;

      case "pillars":
        responseLines = makeLines([
          {
            type: "header",
            text: "PILARES ESTRATÉGICOS DE ABRAHAN RONDON:",
          },
          {
            type: "output",
            text: "1. Telecomunicaciones Críticas: Operación y comisionamiento 5G/RF y transmisión de datos.",
          },
          {
            type: "output",
            text: "2. Espacios Inteligentes (Ablu Tech): Domótica, CCTV y control de acceso integral.",
          },
          {
            type: "output",
            text: "3. Automatización con IA: Soluciones y agentes autónomos para optimización de procesos.",
          },
        ]);
        break;

      case "experience":
        responseLines = makeLines([
          {
            type: "header",
            text: ">>> HISTORIAL OPERACIONAL:",
          },
          {
            type: "output",
            text: "• Entel Connect Center (2023 - Presente): O&M de terreno de redes móviles 5G/LTE y transmisión.",
          },
          {
            type: "output",
            text: "• Ablu Tech Ltda. (2025 - Presente): Fundador & Director de Operaciones. Domótica e inmótica de alto estándar, CCTV con IA y automatización empresarial.",
          },
          {
            type: "output",
            text: "• WISECOM SpA (2022): Ingeniero TSSR WOM (Modernización RF y proyectos 5G).",
          },
          {
            type: "output",
            text: "• Telrad Services LATAM (2018 - 2022): O&M Ericsson RBS y transmisión para Entel.",
          },
          {
            type: "output",
            text: "• CelPlan Technologies (2017 - 2018): Jefe de grupo de instalaciones Claro, Movistar y WOM.",
          },
        ]);
        break;

      case "contact":
        responseLines = makeLines([
          {
            type: "header",
            text: ">>> VÍAS DE CONTACTO DIRECTO:",
          },
          {
            type: "output",
            text: `• WhatsApp: +56 9 6552 9637 (${PROFILE_DATA.whatsappUrl})`,
          },
          {
            type: "output",
            text: `• LinkedIn: ${PROFILE_DATA.linkedin}`,
          },
          {
            type: "output",
            text: `• Email: ${PROFILE_DATA.email}`,
          },
          {
            type: "output",
            text: `• Sitio Web: https://${PROFILE_DATA.domain} | https://ablutech.com`,
          },
        ]);
        break;

      case "cv": {
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

        responseLines = makeLines([
          {
            type: "system",
            text: "✔ Descarga del currículum vitae iniciada: CV_Abrahan_Rondon.pdf",
          },
          {
            type: "output",
            text: "Documento generado con especificaciones técnicas ATS, historial y certificaciones.",
          },
        ]);
        break;
      }

      default:
        responseLines = makeLines([
          {
            type: "error",
            text: `Comando no reconocido: '${normalized}'. Escribe 'help' para ver los comandos válidos.`,
          },
        ]);
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
        const nextIdx =
          historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
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

  const renderLineClass = (type: OutputLineType): string => {
    const wrap = "whitespace-pre-wrap break-words [overflow-wrap:anywhere]";
    switch (type) {
      case "input":
        return `text-cyan-300 font-semibold ${wrap}`;
      case "system":
        return `text-emerald-400 font-medium ${wrap}`;
      case "error":
        return `text-red-400 font-medium ${wrap}`;
      case "header":
        return `text-cyan-400 font-bold tracking-wide pt-1 ${wrap}`;
      case "accent":
        return `text-[#e5987d] font-medium pl-2 ${wrap}`;
      case "meta":
        return `text-zinc-400 pl-2 ${wrap}`;
      case "diff-add":
        return `text-emerald-300 bg-emerald-500/10 border-l-2 border-emerald-400 pl-2.5 py-0.5 ${wrap}`;
      case "diff-del":
        return `text-rose-300 bg-rose-500/10 border-l-2 border-rose-400 pl-2.5 py-0.5 ${wrap}`;
      case "output":
      default:
        return `text-zinc-300 leading-relaxed pl-2 ${wrap}`;
    }
  };

  return (
    <section
      id="consola"
      className="py-20 sm:py-24 px-4 sm:px-8 relative z-10 bg-[#0f0f1c] text-white border-y border-white/10 w-full max-w-full min-w-0 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 w-full min-w-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 bg-white/5 text-[#bc7155] font-mono text-[10px] sm:text-xs tracking-wider uppercase mb-4 max-w-full">
            <Terminal className="w-3.5 h-3.5 text-[#bc7155] shrink-0" />
            <span className="truncate">
              INTERACTIVE TELEMETRY TERMINAL // KERNEL v3.2
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 break-words">
            Consola Operacional de Comandos.
          </h2>
          <p className="font-body-editorial text-zinc-400 max-w-xl text-sm sm:text-base break-words">
            Interactúa en tiempo real con el runtime para auditar experiencia, inspeccionar la telemetría verificada de Harness² y del adaptador Telecom/Datacenter SLA, y descargar el CV oficial.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-none border border-white/15 bg-[#151623] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm w-full max-w-full min-w-0">
          {/* Terminal Window Header Bar with Operator Live Feed */}
          <div className="px-4 py-2.5 bg-[#080e1e] border-b border-cyan-500/20 flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 pl-2 border-l border-zinc-800 min-w-0">
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
                <span className="text-xs text-zinc-300 font-mono font-medium hidden sm:inline truncate">
                  OPERATOR: ABRAHAN RONDON
                </span>
                <span className="text-[10px] text-cyan-400 font-mono sm:hidden truncate">
                  OPERATOR ACTIVE
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400/80 shrink-0">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-cyan-400/60 shadow-sm shadow-cyan-400/30 shrink-0 bg-black">
                <Image
                  src="/brand/rondontech-emblem-circle.webp"
                  alt="RondonTech Emblem"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">
                RONDONTECH KERNEL v3.2 // PORT 22
              </span>
              <span className="sm:hidden">ONLINE</span>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 min-h-[300px] max-h-[460px] overflow-y-auto overflow-x-hidden space-y-2 cursor-text w-full max-w-full min-w-0"
          >
            {history.map((line) => (
              <div key={line.id} className={renderLineClass(line.type)}>
                {line.text}
              </div>
            ))}
          </div>

          {/* Interactive Input Line */}
          <div className="px-3 sm:px-6 py-3 bg-[#060b18] border-t border-cyan-500/20 flex items-center gap-2 w-full max-w-full min-w-0">
            <span className="text-cyan-400 font-bold whitespace-nowrap shrink-0 text-[11px] sm:text-sm">
              visitor@rondontech:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe 'adapter', 'harness', 'trace' o 'library'..."
              aria-label="Comando de consola RondonTech"
              className="flex-1 min-w-0 bg-transparent text-white focus:outline-none placeholder:text-zinc-600 font-mono text-xs sm:text-sm"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              aria-label="Ejecutar comando"
              className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <CornerDownLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Ejecutar</span>
            </button>
          </div>

          {/* Suggested Quick Chips */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#040813] border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto w-full max-w-full min-w-0 text-[11px]">
            <span className="text-zinc-500 whitespace-nowrap shrink-0">
              Comandos rápidos:
            </span>
            {COMMAND_CHIPS.map((chip) => {
              const isHarnessChip =
                chip === "adapter" ||
                chip === "harness" ||
                chip === "trace" ||
                chip === "library";
              return (
                <button
                  type="button"
                  key={chip}
                  onClick={() => executeCommand(chip)}
                  className={
                    isHarnessChip
                      ? "px-2.5 py-1 rounded-md bg-[#bc7155]/15 border border-[#bc7155]/45 text-[#f0aa90] hover:bg-[#bc7155]/25 hover:border-[#bc7155]/75 transition-all whitespace-nowrap cursor-pointer active:scale-95 shrink-0"
                      : "px-2.5 py-1 rounded-md bg-zinc-900 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-950/60 hover:border-cyan-400/50 transition-all whitespace-nowrap cursor-pointer active:scale-95 shrink-0"
                  }
                >
                  ${chip}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
