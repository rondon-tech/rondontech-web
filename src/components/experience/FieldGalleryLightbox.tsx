"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export interface FieldGalleryItem {
  src: string;
  alt: string;
  label: string;
  badgeClassName?: string;
}

export interface FieldGalleryLightboxProps {
  items: FieldGalleryItem[];
  title?: string;
  accent?: "ember" | "telemetry";
  className?: string;
}

export function FieldGalleryLightbox({
  items,
  title,
  accent = "telemetry",
  className = "",
}: FieldGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenedIndexRef = useRef<number | null>(null);

  const isOpen = activeIndex !== null && items.length > 0;
  const currentItem =
    activeIndex !== null && items[activeIndex] ? items[activeIndex] : null;

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    const returnIndex = lastOpenedIndexRef.current;
    if (returnIndex !== null) {
      requestAnimationFrame(() => {
        triggerRefs.current[returnIndex]?.focus();
      });
    }
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || items.length === 0) return null;
      return (prev - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || items.length === 0) return null;
      return (prev + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeLightbox, showPrev, showNext]);

  if (items.length === 0) {
    return null;
  }

  const counterText =
    activeIndex !== null
      ? `${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`
      : "";

  const dotClass =
    accent === "ember" ? "bg-[#bc7155]" : "bg-[#0284c7]";

  return (
    <div className={`space-y-3 min-w-0 ${className}`}>
      {title && (
        <div className="font-mono text-[11px] font-semibold text-[#000d10] uppercase tracking-wider flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
          <span>{title}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <button
            key={item.src}
            ref={(el) => {
              triggerRefs.current[idx] = el;
            }}
            type="button"
            onClick={() => {
              lastOpenedIndexRef.current = idx;
              setActiveIndex(idx);
            }}
            aria-label={`Ampliar imagen: ${item.alt}`}
            className="group/thumb relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#d5d3d4] bg-[#0f0f1c] text-left cursor-pointer transition-[border-color,box-shadow] duration-200 hover:border-[#000d10]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] focus-visible:ring-offset-2"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
              className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000d10]/90 via-[#000d10]/25 to-transparent" />

            <span
              aria-hidden="true"
              className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#000d10]/70 border border-white/20 text-white opacity-85 group-hover/thumb:opacity-100 group-hover/thumb:bg-[#000d10]/90 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </span>

            <div className="absolute inset-x-0 bottom-0 p-2.5 flex items-end justify-between gap-2">
              <span
                className={`font-mono text-[10px] font-bold tracking-wide uppercase truncate ${
                  item.badgeClassName ?? "text-white"
                }`}
              >
                {item.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {isOpen &&
        currentItem &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.alt}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#000d10]/88 backdrop-blur-sm p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-2xl bg-[#0f0f1c] border border-white/15 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#151623]">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 font-mono text-xs font-bold text-white tabular-nums shrink-0">
                    {counterText}
                  </span>
                  <span
                    className={`font-mono text-xs font-semibold uppercase tracking-wider truncate ${
                      currentItem.badgeClassName ?? "text-sky-300"
                    }`}
                  >
                    {currentItem.label}
                  </span>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Cerrar visor"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative w-full aspect-[16/9] max-h-[72vh] bg-[#000d10]">
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt}
                  fill
                  sizes="90vw"
                  className="object-contain p-2 sm:p-4"
                  priority
                />

                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#000d10]/80 hover:bg-[#000d10] text-white border border-white/20 shadow-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Siguiente imagen"
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#000d10]/80 hover:bg-[#000d10] text-white border border-white/20 shadow-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-[#151623] flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {currentItem.alt}
                </p>
                <span className="font-mono text-[11px] text-zinc-400">
                  ESC cerrar · ← → navegar
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
