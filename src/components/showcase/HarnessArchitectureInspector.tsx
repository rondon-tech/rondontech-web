"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  GitBranch,
  BookOpen,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ArrowRight,
  X,
  Sparkles,
  Database,
  Radio,
  FlaskConical,
} from "lucide-react";
import {
  HARNESS_TELEMETRY,
  RONDONTECH_ADAPTER_TELEMETRY,
  type DemoRunTelemetry,
  type HarnessComponentItem,
} from "@/data/harnessTelemetry";

type TelemetryDatasetKey = "rondontech" | "demo";
type InspectorTab = "surface" | "trace" | "library";
type ScopeFilter = "ALL" | HarnessComponentItem["contextScope"];
type TraceMode = "agg" | "seq";
type DiffViewMode = "unified" | "split";

interface HarnessArchitectureInspectorProps {
  onClose?: () => void;
}

const DATASETS: Record<
  TelemetryDatasetKey,
  {
    key: TelemetryDatasetKey;
    shortLabel: string;
    title: string;
    subtitle: string;
    data: DemoRunTelemetry;
  }
> = {
  rondontech: {
    key: "rondontech",
    shortLabel: "RondonTech Adapter (5G & DC SLA)",
    title: "RondonTech Engineering Adapter",
    subtitle: "Telecom 5G RF & Datacenter -48V DC SLA",
    data: RONDONTECH_ADAPTER_TELEMETRY,
  },
  demo: {
    key: "demo",
    shortLabel: "Google Research Demo (Accounting)",
    title: "Google Research Upstream Demo",
    subtitle: "Deterministic Accounting Ledger",
    data: HARNESS_TELEMETRY,
  },
};

const SCOPE_STYLES: Record<
  HarnessComponentItem["contextScope"],
  { badge: string; label: string }
> = {
  ALWAYS_ON: {
    badge: "bg-[#bc7155]/20 text-[#f3b59d] border-[#bc7155]/45",
    label: "ALWAYS_ON",
  },
  ON_DEMAND: {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-400/35",
    label: "ON_DEMAND",
  },
  TOOL_LOOP: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/35",
    label: "TOOL_LOOP",
  },
};

const STATUS_LABELS: Record<
  HarnessComponentItem["demoStatus"],
  { label: string; dot: string }
> = {
  modified: { label: "MODIFIED", dot: "bg-emerald-400" },
  active: { label: "ACTIVE", dot: "bg-cyan-400" },
  empty_always_on: { label: "0B EMPTY", dot: "bg-zinc-500" },
  stub: { label: "STUB", dot: "bg-zinc-600" },
};

export function HarnessArchitectureInspector({
  onClose,
}: HarnessArchitectureInspectorProps) {
  const [datasetKey, setDatasetKey] =
    useState<TelemetryDatasetKey>("rondontech");
  const [activeTab, setActiveTab] = useState<InspectorTab>("surface");
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("ALL");
  const [selectedComponentId, setSelectedComponentId] =
    useState<HarnessComponentItem["id"]>("c7");
  const [traceMode, setTraceMode] = useState<TraceMode>("agg");
  const [diffViewMode, setDiffViewMode] = useState<DiffViewMode>("unified");
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  const activeDataset = DATASETS[datasetKey];
  const telemetry = activeDataset.data;

  const handleDatasetChange = (nextKey: TelemetryDatasetKey) => {
    setDatasetKey(nextKey);
    setSelectedLessonIndex(0);
  };

  const filteredComponents =
    scopeFilter === "ALL"
      ? telemetry.components
      : telemetry.components.filter(
          (item) => item.contextScope === scopeFilter
        );

  const selectedComponent =
    telemetry.components.find((c) => c.id === selectedComponentId) ??
    telemetry.components[0];

  const traceSteps = telemetry.recursionTrace.filter(
    (step) => step.mode === traceMode
  );

  const activeLesson =
    telemetry.experienceLessons[selectedLessonIndex] ??
    telemetry.experienceLessons[0];

  const alwaysOnRatioPct = (
    (telemetry.adoptedAlwaysOnChars / telemetry.alwaysOnMaxChars) *
    100
  ).toFixed(2);

  const aggLabels = telemetry.taskComparisons
    .map((t) => t.adoptedAggLabel)
    .join("/");
  const seqLabels = telemetry.taskComparisons
    .map((t) => t.adoptedSeqLabel)
    .join("/");

  return (
    <div className="w-full max-w-full min-w-0 border-t border-white/15 bg-[#0f0f1c] text-white">
      {/* Aerospace Telemetry Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-white/10 bg-[#151623] min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 min-w-0">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 font-semibold">
                <Cpu className="w-3 h-3 shrink-0" />
                HARNESS² RECURSIVE ENGINE
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 font-semibold">
                EXIT {telemetry.exitCode} · VERIFIED RUN
              </span>
              <span className="font-mono text-[10px] text-zinc-400 break-words">
                {telemetry.packageName} v{telemetry.packageVersion} ·{" "}
                {telemetry.paperRef} · {telemetry.license}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-mono text-zinc-300 min-w-0">
              <span className="inline-flex items-start gap-1.5 text-cyan-300 break-all min-w-0">
                <Terminal className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>$ {telemetry.command}</span>
              </span>
              <span className="text-zinc-500 hidden sm:inline">|</span>
              <span className="text-zinc-400">
                {telemetry.pythonRuntime} · {telemetry.packageManager}
              </span>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar Inspector Harness²"
              className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cerrar Inspector</span>
            </button>
          )}
        </div>

        {/* Dataset Run Switcher: RondonTech Adapter vs Upstream Demo */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-w-0">
          <div className="space-y-0.5 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Telemetry Run Source
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white break-words">
              {activeDataset.title}{" "}
              <span className="text-zinc-400 font-normal">
                — {activeDataset.subtitle}
              </span>
            </div>
          </div>

          <div
            role="group"
            aria-label="Seleccionar ejecución de telemetría Harness²"
            className="grid grid-cols-1 sm:inline-flex rounded-2xl sm:rounded-full bg-[#000d10]/80 p-1 border border-white/15 gap-1 shrink-0"
          >
            <button
              type="button"
              onClick={() => handleDatasetChange("rondontech")}
              aria-pressed={datasetKey === "rondontech"}
              className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                datasetKey === "rondontech"
                  ? "bg-[#bc7155] text-white shadow-sm shadow-[#bc7155]/40"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Radio className="w-3.5 h-3.5 shrink-0" />
              <span>{DATASETS.rondontech.shortLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => handleDatasetChange("demo")}
              aria-pressed={datasetKey === "demo"}
              className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                datasetKey === "demo"
                  ? "bg-cyan-400 text-[#000d10] shadow-sm shadow-cyan-400/40"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 shrink-0" />
              <span>{DATASETS.demo.shortLabel}</span>
            </button>
          </div>
        </div>

        {/* 4 Grounded Telemetry KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-4 min-w-0">
          <div className="rounded-xl bg-[#000d10]/70 border border-white/10 p-3 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Budget &amp; Domain
            </div>
            <div className="font-mono text-xs sm:text-base font-bold text-white mt-0.5 break-words">
              k = {telemetry.kBudget} · {telemetry.tasksCompleted}/
              {telemetry.tasksCompleted + telemetry.tasksFailed} OK
            </div>
            <div className="font-mono text-[11px] text-cyan-300 break-words">
              domain: {telemetry.domain}
            </div>
          </div>

          <div className="rounded-xl bg-[#000d10]/70 border border-white/10 p-3 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Rollouts &amp; Edits
            </div>
            <div className="font-mono text-xs sm:text-base font-bold text-white mt-0.5 break-words">
              {telemetry.totalExecutions} execs · {telemetry.totalEditorCalls}{" "}
              edits
            </div>
            <div className="font-mono text-[11px] text-zinc-400 break-words">
              {telemetry.rolloutsPerModeTask} rollouts /{" "}
              {telemetry.stagesPerModeTask} stages
            </div>
          </div>

          <div className="rounded-xl bg-[#000d10]/70 border border-white/10 p-3 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Always-On Context
            </div>
            <div className="font-mono text-xs sm:text-base font-bold text-emerald-300 mt-0.5 break-words">
              {telemetry.adoptedAlwaysOnChars} /{" "}
              {telemetry.alwaysOnMaxChars.toLocaleString()} ch
            </div>
            <div className="font-mono text-[11px] text-zinc-400 break-words">
              {alwaysOnRatioPct}% of max budget
            </div>
          </div>

          <div className="rounded-xl bg-[#000d10]/70 border border-white/10 p-3 min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Target Fix &amp; Cost
            </div>
            <div className="font-mono text-xs sm:text-base font-bold text-[#f3b59d] mt-0.5 break-all">
              {telemetry.editedComponentPath}
            </div>
            <div className="font-mono text-[11px] text-zinc-400 break-words">
              {telemetry.baseScriptBytes}B → {telemetry.adoptedScriptBytes}B · $
              {telemetry.totalUsdCost.toFixed(2)} USD
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5 border-b border-white/10 flex flex-wrap items-center gap-2 bg-[#0f0f1c]">
        <button
          type="button"
          onClick={() => setActiveTab("surface")}
          aria-pressed={activeTab === "surface"}
          className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "surface"
              ? "bg-cyan-400 text-[#000d10] shadow-sm shadow-cyan-400/30"
              : "bg-white/5 text-zinc-300 border border-white/10 hover:border-cyan-400/50 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span>01 // Superficie c1–c8</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("trace")}
          aria-pressed={activeTab === "trace"}
          className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "trace"
              ? "bg-emerald-400 text-[#000d10] shadow-sm shadow-emerald-400/30"
              : "bg-white/5 text-zinc-300 border border-white/10 hover:border-emerald-400/50 hover:text-white"
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 shrink-0" />
          <span>02 // Traza Propose–Probe–Compose &amp; Diff</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("library")}
          aria-pressed={activeTab === "library"}
          className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "library"
              ? "bg-[#bc7155] text-white shadow-sm shadow-[#bc7155]/30"
              : "bg-white/5 text-zinc-300 border border-white/10 hover:border-[#bc7155]/60 hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>03 // Memoria EXPERIENCE.md</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-4 sm:p-6 lg:p-8 min-w-0">
        <AnimatePresence mode="wait">
          {activeTab === "surface" && (
            <motion.div
              key={`surface-${datasetKey}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 min-w-0"
            >
              {/* Scope Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-w-0">
                <p className="text-xs sm:text-sm text-zinc-300 break-words">
                  Superficie editable del meta-agente{" "}
                  <span className="font-mono text-cyan-300">c1..c8</span> en{" "}
                  <span className="font-mono text-[#f3b59d]">
                    {telemetry.domain}
                  </span>
                  : separa contexto siempre activo de scripts y skills bajo
                  demanda.
                </p>
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  {(
                    [
                      "ALL",
                      "ALWAYS_ON",
                      "ON_DEMAND",
                      "TOOL_LOOP",
                    ] as ScopeFilter[]
                  ).map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setScopeFilter(scope)}
                      aria-pressed={scopeFilter === scope}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold border transition-colors cursor-pointer ${
                        scopeFilter === scope
                          ? "bg-white text-[#000d10] border-white"
                          : "bg-white/5 text-zinc-300 border-white/15 hover:border-white/40"
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>

              {/* 8-Component Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 min-w-0">
                {filteredComponents.map((comp) => {
                  const isSelected = comp.id === selectedComponent.id;
                  const scopeStyle = SCOPE_STYLES[comp.contextScope];
                  const statusMeta = STATUS_LABELS[comp.demoStatus];
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setSelectedComponentId(comp.id)}
                      aria-pressed={isSelected}
                      className={`text-left rounded-xl p-3.5 border transition-all cursor-pointer min-w-0 flex flex-col justify-between gap-2.5 ${
                        isSelected
                          ? "bg-[#151623] border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10"
                          : "bg-[#000d10]/60 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="space-y-2 min-w-0 w-full">
                        <div className="flex items-start justify-between gap-2 min-w-0">
                          <span className="font-mono text-xs font-bold text-cyan-300 uppercase break-words">
                            {comp.id} · {comp.name}
                          </span>
                          <span
                            className={`font-mono text-[9px] px-1.5 py-0.5 rounded border shrink-0 ${scopeStyle.badge}`}
                          >
                            {scopeStyle.label}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-zinc-300 break-all">
                          {comp.opencodePath}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 font-mono text-[10px] w-full">
                        <span className="inline-flex items-center gap-1.5 text-zinc-300">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusMeta.dot}`}
                          />
                          {statusMeta.label}
                        </span>
                        <span className="text-zinc-400 shrink-0">
                          {comp.demoBytes !== null ? `${comp.demoBytes} B` : "—"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Component Inspector Readout */}
              <div className="rounded-xl bg-[#000d10]/80 border border-cyan-400/30 p-4 space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase">
                      {selectedComponent.id}: {selectedComponent.name}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/15">
                      {selectedComponent.runtimeRole}
                    </span>
                  </div>
                  {selectedComponent.id === "c7" && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("trace")}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-300 hover:text-emerald-200 underline underline-offset-4 cursor-pointer"
                    >
                      <span>Ver diff real en {telemetry.editedComponentPath}</span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed break-words">
                  {selectedComponent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px] min-w-0">
                  <div className="rounded-lg bg-white/5 px-3 py-2 border border-white/10 min-w-0">
                    <span className="text-zinc-400 block text-[10px] uppercase">
                      OpenCode Surface Path
                    </span>
                    <span className="text-cyan-300 break-all">
                      {selectedComponent.opencodePath}
                    </span>
                  </div>
                  <div className="rounded-lg bg-white/5 px-3 py-2 border border-white/10 min-w-0">
                    <span className="text-zinc-400 block text-[10px] uppercase">
                      Codex Surface Path
                    </span>
                    <span className="text-emerald-300 break-all">
                      {selectedComponent.codexPath}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "trace" && (
            <motion.div
              key={`trace-${datasetKey}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 min-w-0"
            >
              {/* Task Contrasts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0">
                {telemetry.taskComparisons.map((task) => (
                  <div
                    key={task.taskId}
                    className="rounded-xl bg-[#000d10]/80 border border-white/10 p-3.5 sm:p-4 space-y-2.5 min-w-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
                      <span className="font-mono text-xs font-bold text-white uppercase break-all">
                        {task.taskId}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-zinc-300 shrink-0">
                        fp: {task.harnessFingerprint}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-cyan-300 break-all">
                      {task.sourceFile}
                    </div>

                    <div className="flex flex-wrap gap-1.5 min-w-0">
                      {task.amounts.map((sample, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] text-zinc-300 bg-white/5 border border-white/10 rounded px-2 py-0.5 break-words max-w-full"
                        >
                          {sample}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 min-w-0">
                      <div className="rounded-lg bg-amber-500/10 border border-amber-400/25 px-3 py-2 min-w-0">
                        <div className="font-mono text-[10px] uppercase text-amber-300 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          Base Rollout
                        </div>
                        <div className="font-mono text-xs font-bold text-white mt-0.5 break-words">
                          {task.baseOutput}
                        </div>
                      </div>
                      <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2 min-w-0">
                        <div className="font-mono text-[10px] uppercase text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          Adopted ({task.adoptedAggLabel} /{" "}
                          {task.adoptedSeqLabel})
                        </div>
                        <div className="font-mono text-xs font-bold text-emerald-200 mt-0.5 break-words">
                          {task.adoptedOutput}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recursion Trace Header + Mode Switcher */}
              <div className="space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                  <div className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold break-words">
                    Traza Propose–Probe–Compose ({telemetry.domain})
                  </div>
                  <div className="inline-flex flex-wrap rounded-full bg-white/5 p-0.5 border border-white/15 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setTraceMode("agg")}
                      aria-pressed={traceMode === "agg"}
                      className={`px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-colors cursor-pointer ${
                        traceMode === "agg"
                          ? "bg-emerald-400 text-[#000d10]"
                          : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      mode: agg ({aggLabels})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTraceMode("seq")}
                      aria-pressed={traceMode === "seq"}
                      className={`px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-colors cursor-pointer ${
                        traceMode === "seq"
                          ? "bg-cyan-400 text-[#000d10]"
                          : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      mode: seq ({seqLabels})
                    </button>
                  </div>
                </div>

                {/* Trace Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 min-w-0">
                  {traceSteps.map((step) => {
                    const isBaseFix =
                      step.phase !== "BASE" &&
                      !step.keptBase &&
                      !step.executionFailed;
                    return (
                      <div
                        key={`${step.mode}-${step.label}`}
                        className={`rounded-xl p-3 border space-y-1.5 min-w-0 ${
                          step.phase === "BASE"
                            ? "bg-amber-500/10 border-amber-400/30"
                            : isBaseFix
                            ? "bg-emerald-500/10 border-emerald-400/30"
                            : "bg-[#000d10]/60 border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] min-w-0">
                          <span className="font-bold text-white">
                            {step.label}{" "}
                            <span className="text-zinc-400 font-normal">
                              · {step.dim}
                            </span>
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-200 shrink-0">
                            {step.phase}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] sm:text-xs font-semibold text-cyan-300 break-words">
                          {step.outputPreview}
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-snug break-words">
                          {step.notes}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px] text-zinc-400">
                          <span>att: {step.attempts}</span>
                          <span>${step.usd.toFixed(2)}</span>
                          <span>keptBase: {String(step.keptBase)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real Diff Viewer for c7 */}
              <div className="rounded-xl bg-[#000d10] border border-white/15 overflow-hidden min-w-0 max-w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 border-b border-white/10 bg-[#151623] min-w-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-white min-w-0">
                    <FileCode2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="break-all">
                      c7 // {telemetry.editedComponentPath} (
                      {telemetry.baseScriptBytes}B →{" "}
                      {telemetry.adoptedScriptBytes}B)
                    </span>
                  </div>
                  <div className="inline-flex rounded-full bg-white/5 p-0.5 border border-white/15 shrink-0">
                    <button
                      type="button"
                      onClick={() => setDiffViewMode("unified")}
                      aria-pressed={diffViewMode === "unified"}
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold cursor-pointer ${
                        diffViewMode === "unified"
                          ? "bg-white text-[#000d10]"
                          : "text-zinc-300"
                      }`}
                    >
                      Unified Diff
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiffViewMode("split")}
                      aria-pressed={diffViewMode === "split"}
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold cursor-pointer ${
                        diffViewMode === "split"
                          ? "bg-white text-[#000d10]"
                          : "text-zinc-300"
                      }`}
                    >
                      Base vs Adopted
                    </button>
                  </div>
                </div>

                {diffViewMode === "unified" ? (
                  <pre className="p-3.5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto max-w-full text-zinc-200">
                    {telemetry.unifiedDiff.split("\n").map((line, i) => {
                      const lineClass =
                        line.startsWith("-") && !line.startsWith("---")
                          ? "text-rose-300 bg-rose-500/15 block px-1.5 -mx-1.5 rounded"
                          : line.startsWith("+") && !line.startsWith("+++")
                          ? "text-emerald-300 bg-emerald-500/15 block px-1.5 -mx-1.5 rounded"
                          : line.startsWith("@@")
                          ? "text-cyan-300 block"
                          : "block";
                      return (
                        <span key={i} className={lineClass}>
                          {line}
                        </span>
                      );
                    })}
                  </pre>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-w-0">
                    <div className="p-3.5 min-w-0">
                      <div className="font-mono text-[10px] uppercase text-rose-300 mb-2">
                        Base ({telemetry.baseScriptBytes}B)
                      </div>
                      <pre className="font-mono text-[11px] leading-relaxed overflow-x-auto max-w-full text-zinc-300">
                        {telemetry.baseScriptContent}
                      </pre>
                    </div>
                    <div className="p-3.5 min-w-0">
                      <div className="font-mono text-[10px] uppercase text-emerald-300 mb-2">
                        Adopted ({telemetry.adoptedScriptBytes}B)
                      </div>
                      <pre className="font-mono text-[11px] leading-relaxed overflow-x-auto max-w-full text-emerald-200">
                        {telemetry.adoptedScriptContent}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "library" && (
            <motion.div
              key={`library-${datasetKey}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 min-w-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-w-0">
                <p className="text-xs sm:text-sm text-zinc-300 break-words">
                  Lecciones aprendidas a nivel de harness persistidas en{" "}
                  <span className="font-mono text-[#f3b59d]">EXPERIENCE.md</span>{" "}
                  e indexadas en{" "}
                  <span className="font-mono text-cyan-300">INDEX.md</span>.
                </p>
                <div className="flex flex-wrap gap-1.5 min-w-0">
                  {telemetry.experienceLessons.map((entry, idx) => (
                    <button
                      key={entry.adoptedRunId}
                      type="button"
                      onClick={() => setSelectedLessonIndex(idx)}
                      aria-pressed={idx === selectedLessonIndex}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold border transition-colors cursor-pointer break-all text-left ${
                        idx === selectedLessonIndex
                          ? "bg-[#bc7155] text-white border-[#bc7155]"
                          : "bg-white/5 text-zinc-300 border-white/15 hover:border-white/40"
                      }`}
                    >
                      {entry.taskId} · {entry.adoptedLabel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#000d10]/85 border border-[#bc7155]/40 p-4 sm:p-5 space-y-4 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs min-w-0">
                    <Sparkles className="w-4 h-4 text-[#f3b59d] shrink-0" />
                    <span className="font-bold text-white break-all">
                      {activeLesson.adoptedRunId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[10px] uppercase font-semibold shrink-0">
                      verdict: {activeLesson.verdict}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 break-words">
                    <Database className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                    <span>
                      libraryEntriesBefore: {activeLesson.libraryEntriesBefore}{" "}
                      · {activeLesson.componentsSummary}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-1 min-w-0">
                    <div className="font-mono text-[10px] uppercase text-cyan-300">
                      Cue (Disparador)
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium break-words">
                      {activeLesson.cue}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-1 min-w-0">
                    <div className="font-mono text-[10px] uppercase text-emerald-300">
                      Lesson (Regla Transferible)
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium break-words">
                      {activeLesson.lesson}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-zinc-300 min-w-0">
                  <div className="break-words">
                    <span className="font-mono text-[10px] uppercase text-zinc-400 mr-2">
                      Why Chosen:
                    </span>
                    <span>{activeLesson.whyChosen}</span>
                  </div>
                  <div className="break-words">
                    <span className="font-mono text-[10px] uppercase text-zinc-400 mr-2">
                      Observed Contrast:
                    </span>
                    <span>{activeLesson.observedContrast}</span>
                  </div>
                  <div className="break-words">
                    <span className="font-mono text-[10px] uppercase text-zinc-400 mr-2">
                      Evidence:
                    </span>
                    <span className="text-zinc-200">
                      {activeLesson.evidence}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 font-mono text-[10px] text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 break-all">
                    component: {activeLesson.componentEdited}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 break-words">
                    candidate: {activeLesson.candidateRef}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 break-words">
                    confidence: {activeLesson.confidence}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    fp: {activeLesson.harnessFingerprint}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
