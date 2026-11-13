"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  durationMs?: number;
  delayMs?: number;
  triggerOnHover?: boolean;
}

const GLYPHS = "!<>[0123456789]—=+*^?#%&XYZ$@~";

export function ScrambleText({
  text,
  className = "",
  durationMs = 900,
  delayMs = 0,
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef<boolean>(false);

  const startScramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const startTime = performance.now();
    const totalChars = text.length;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Number of characters resolved so far
      const resolvedCount = Math.floor(progress * totalChars);

      let scrambled = "";
      for (let i = 0; i < totalChars; i++) {
        if (text[i] === " " || text[i] === "\n") {
          scrambled += text[i];
        } else if (i < resolvedCount) {
          scrambled += text[i];
        } else {
          const randomIndex = Math.floor(Math.random() * GLYPHS.length);
          scrambled += GLYPHS[randomIndex];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(frame);
  }, [durationMs, text]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            timeoutId = setTimeout(() => {
              startScramble();
            }, delayMs);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasAnimated, delayMs, startScramble]);

  return (
    <span
      ref={elementRef}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      style={{ willChange: "contents" }}
    >
      {displayText}
    </span>
  );
}
