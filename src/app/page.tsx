import React from "react";
import { CyberBackground } from "@/components/ui/CyberBackground";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { BentoSection } from "@/components/bento/BentoSection";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { TimelineSection } from "@/components/experience/TimelineSection";
import { SkillsMatrixSection } from "@/components/skills/SkillsMatrixSection";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { AvatarHUDWidget } from "@/components/avatar/AvatarHUDWidget";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-zinc-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Cyber animated background */}
      <CyberBackground />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Hero section with telemetry badge and dynamic switcher */}
      <HeroSection />

      {/* Bento grid with the 3 core pillars */}
      <BentoSection />

      {/* Interactive terminal console */}
      <InteractiveTerminal />

      {/* Experience and career telemetry timeline */}
      <TimelineSection />

      {/* Skills matrix & Academic credentials */}
      <SkillsMatrixSection />

      {/* Contact CTAs & Footer */}
      <ContactFooter />

      {/* Reactive Multi-Pose Holographic HUD Assistant */}
      <AvatarHUDWidget />
    </main>
  );
}
