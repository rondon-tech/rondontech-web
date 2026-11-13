"use client";

import React from "react";
import { GraduationCap } from "lucide-react";

export interface AcademicCredentialItem {
  degree: string;
  institution: string;
  dates: string;
  details: string;
}

export interface AcademicCredentialsDeckProps {
  education: ReadonlyArray<AcademicCredentialItem>;
  className?: string;
}

/**
 * Midnight Hull academic credentials deck acting as a deliberate dark architectural bridge
 * between the light Skills section and the deep ink ContactFooter.
 */
export function AcademicCredentialsDeck({
  education,
  className = "",
}: AcademicCredentialsDeckProps) {
  return (
    <div
      className={`relative rounded-3xl bg-[#0f0f1c] border border-white/10 p-6 sm:p-8 lg:p-10 text-white overflow-hidden min-w-0 shadow-[0_24px_60px_-28px_rgba(0,13,16,0.45)] ${className}`}
    >
      {/* Subtle orbital ambient glow & hairline ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#bc7155]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sky-500/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full border border-white/[0.06]"
      />

      <div className="relative z-10 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-[#bc7155]/15 border border-[#bc7155]/35 flex items-center justify-center text-[#bc7155] shrink-0">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#bc7155] break-words">
              Formación Académica &amp; Titulaciones
            </span>
          </div>

          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            {String(education.length).padStart(2, "0")} Credenciales Oficiales
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 min-w-0">
          {education.map((edu) => (
            <article
              key={`${edu.degree}-${edu.dates}`}
              className="rounded-2xl bg-[#151623] border border-white/10 hover:border-[#bc7155]/45 transition-colors duration-200 p-5 sm:p-6 flex flex-col justify-between gap-4 min-w-0"
            >
              <div className="space-y-2.5 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#e6a48c]">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#bc7155] shrink-0"
                      aria-hidden="true"
                    />
                    {edu.dates}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                    TÍTULO OFICIAL
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug break-words">
                  {edu.degree}
                </h3>

                <div className="font-mono text-xs text-zinc-300 leading-relaxed break-words">
                  {edu.institution}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-3 border-t border-white/10 break-words">
                {edu.details}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
