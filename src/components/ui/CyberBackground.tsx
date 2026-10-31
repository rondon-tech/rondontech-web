"use client";

import React, { useEffect, useState } from "react";

export function CyberBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Cyber Grid with fading mask */}
      <div
        className="absolute inset-0 bg-cyber-grid opacity-35 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_60%,transparent_100%)]"
      />

      {/* Interactive mouse spotlight glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(0,102,255,0.2) 50%, transparent 80%)",
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />

      {/* Ambient top light rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px]" />

      {/* Cyber vertical light beams */}
      <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
    </div>
  );
}
