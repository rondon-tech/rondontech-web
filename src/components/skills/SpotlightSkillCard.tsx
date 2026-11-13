"use client";

import React, { useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Cpu,
  Radio,
  ShieldCheck,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface SpotlightSkillCardProps {
  /** Zero-based card index (rendered as editorial 01..06). */
  index: number;
  title: string;
  category: string;
  description: string;
  tags: ReadonlyArray<string>;
  searchQuery?: string;
  className?: string;
}

interface CategoryVisualMeta {
  icon: LucideIcon;
  label: string;
}

const CATEGORY_META: Record<string, CategoryVisualMeta> = {
  telecom: { icon: Radio, label: "Telecom & RF" },
  iot: { icon: ShieldCheck, label: "IoT & Domótica" },
  energy: { icon: Zap, label: "Energía & O&M" },
  ai: { icon: Cpu, label: "IA & Software" },
  tools: { icon: Terminal, label: "Herramientas O&M" },
};

const FALLBACK_CATEGORY_META: CategoryVisualMeta = {
  icon: Terminal,
  label: "Ingeniería",
};

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

/**
 * Editorial skill domain card with pointer-tracking Clay Ember & sky spotlight.
 * Automatically disables pointer spotlight on coarse pointers and reduced-motion preferences.
 */
export function SpotlightSkillCard({
  index,
  title,
  category,
  description,
  tags,
  searchQuery = "",
  className = "",
}: SpotlightSkillCardProps) {
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

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const spotlightBackground = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(188, 113, 85, 0.13), rgba(2, 132, 199, 0.05) 45%, transparent 75%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!canSpotlight || e.pointerType !== "mouse") {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const categoryMeta =
    CATEGORY_META[category.toLowerCase()] ?? FALLBACK_CATEGORY_META;
  const CategoryIcon = categoryMeta.icon;
  const formattedIndex = String(index + 1).padStart(2, "0");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return (
    <article
      onPointerMove={handlePointerMove}
      className={`group/card relative rounded-2xl bg-[#ffffff] border border-[#d5d3d4] hover:border-[#bc7155]/50 shadow-[0_2px_10px_-6px_rgba(0,13,16,0.06)] hover:shadow-[0_14px_34px_-18px_rgba(0,13,16,0.12)] transition-[border-color,box-shadow] duration-200 overflow-hidden min-w-0 p-6 flex flex-col justify-between ${className}`}
    >
      {canSpotlight && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: spotlightBackground }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between h-full gap-5 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 mb-4 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-[#fbfbfd] border border-[#d5d3d4] flex items-center justify-center text-[#000d10] group-hover/card:border-[#bc7155]/45 group-hover/card:text-[#bc7155] transition-colors shrink-0">
                <CategoryIcon className="w-4 h-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-mono text-[11px] leading-none">
                  <span className="font-bold tracking-wider text-[#bc7155]">
                    {formattedIndex}
                  </span>
                  <span className="text-[#d5d3d4]" aria-hidden="true">
                    /
                  </span>
                  <span className="uppercase tracking-wider text-zinc-600 truncate">
                    {categoryMeta.label}
                  </span>
                </div>
              </div>
            </div>

            <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#fbfbfd] border border-[#d5d3d4] font-mono text-[11px] font-medium text-[#000d10]">
              {tags.length} {tags.length === 1 ? "capacidad" : "capacidades"}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#000d10] group-hover/card:text-[#9a4e33] transition-colors break-words mb-2">
            {title}
          </h3>

          <p className="text-sm text-zinc-700 leading-relaxed break-words">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#d5d3d4]/80 min-w-0">
          {tags.map((tag) => {
            const isHighlighted =
              normalizedQuery.length > 0 &&
              tag.toLowerCase().includes(normalizedQuery);

            return (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] font-medium transition-colors duration-150 break-words max-w-full ${
                  isHighlighted
                    ? "bg-[#bc7155] text-white border-[#bc7155]"
                    : "bg-[#f4f4f6] text-[#000d10] border-[#e4e4e7]"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
