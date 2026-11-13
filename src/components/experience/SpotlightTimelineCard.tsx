"use client";

import React, { useId, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";

export interface SpotlightTimelineCardProps {
  id: string;
  role: string;
  organization?: string;
  dates?: string;
  location?: string;
  context: string;
  bullets: string[];
  techStack?: string[];
  isCurrent?: boolean;
  featured?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getFinePointerSnapshot(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function SpotlightTimelineCard({
  id,
  role,
  organization,
  dates,
  location,
  context,
  bullets,
  techStack,
  isCurrent = false,
  featured = false,
  isExpanded,
  onToggle,
  children,
  className = "",
}: SpotlightTimelineCardProps) {
  const reactId = useId();
  const panelId = `timeline-panel-${id}-${reactId}`;

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );
  const hasFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot,
  );

  const canSpotlight = hasFinePointer && !prefersReducedMotion;
  const isAccentEmber = isCurrent || featured;

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const emberSpotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(188, 113, 85, 0.12), rgba(188, 113, 85, 0.03) 45%, transparent 75%)`;
  const telemetrySpotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(2, 132, 199, 0.09), rgba(0, 13, 16, 0.025) 45%, transparent 75%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canSpotlight || e.pointerType !== "mouse") {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={`group/card relative rounded-2xl bg-white border transition-[border-color,box-shadow] duration-200 overflow-hidden min-w-0 ${
        isAccentEmber
          ? isExpanded
            ? "border-[#bc7155]/55 shadow-[0_14px_34px_-18px_rgba(188,113,85,0.28)]"
            : "border-[#d5d3d4] hover:border-[#bc7155]/50 shadow-[0_2px_10px_-6px_rgba(0,13,16,0.08)]"
          : isExpanded
            ? "border-[#000d10]/30 shadow-[0_14px_34px_-18px_rgba(0,13,16,0.14)]"
            : "border-[#d5d3d4] hover:border-[#000d10]/30 shadow-[0_2px_10px_-6px_rgba(0,13,16,0.06)]"
      } ${className}`}
    >
      {canSpotlight && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background: isAccentEmber ? emberSpotlight : telemetrySpotlight,
          }}
        />
      )}

      <div className="relative z-10 p-5 sm:p-7 min-w-0">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="group/trigger w-full text-left flex items-start justify-between gap-4 rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] focus-visible:ring-offset-2"
        >
          <div className="min-w-0 flex-1 space-y-1.5">
            {(organization || isCurrent || featured) && (
              <div className="flex flex-wrap items-center gap-2">
                {organization && (
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-700 break-words">
                    {organization}
                  </span>
                )}
                {isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#bc7155] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    En curso
                  </span>
                )}
                {!isCurrent && featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#bc7155]/12 border border-[#bc7155]/35 text-[#8c4329] font-mono text-[10px] font-bold uppercase tracking-wider">
                    Destacado
                  </span>
                )}
              </div>
            )}

            <h3
              className={`text-lg sm:text-2xl font-bold tracking-tight text-[#000d10] transition-colors break-words ${
                isAccentEmber
                  ? "group-hover/trigger:text-[#9a4e33]"
                  : "group-hover/trigger:text-sky-700"
              }`}
            >
              {role}
            </h3>

            {(dates || location) && (
              <div className="lg:hidden flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-600">
                {dates && <span>{dates}</span>}
                {dates && location && <span aria-hidden="true">·</span>}
                {location && <span>{location}</span>}
              </div>
            )}
          </div>

          <span
            aria-hidden="true"
            className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
              isExpanded
                ? isAccentEmber
                  ? "bg-[#bc7155]/10 border-[#bc7155]/40 text-[#8c4329]"
                  : "bg-[#000d10] border-[#000d10] text-white"
                : "bg-[#fbfbfd] border-[#d5d3d4] text-[#000d10] group-hover/trigger:border-[#000d10]/40"
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        <p className="mt-3 text-sm sm:text-[15px] text-zinc-700 leading-relaxed break-words">
          {context}
        </p>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={panelId}
              key="expanded-content"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              animate={{ opacity: 1, height: "auto" }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0, height: 0 }
                  : { opacity: 0, height: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.26, ease: [0.16, 1, 0.3, 1] }
              }
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-[#d5d3d4]/80 space-y-5">
                <div className="space-y-2.5">
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-700">
                    {"// Actividades & Responsabilidades Clave"}
                  </div>
                  <ul className="space-y-2.5">
                    {bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isAccentEmber ? "text-[#bc7155]" : "text-[#0284c7]"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 break-words">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {children && (
                  <div className="pt-4 border-t border-[#d5d3d4]/70">
                    {children}
                  </div>
                )}

                {techStack && techStack.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md font-mono text-[11px] font-medium bg-[#fbfbfd] border border-[#d5d3d4] text-[#000d10]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
