import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroEditorial } from "@/components/hero/HeroEditorial";
import { ScrollMotionExperience } from "@/components/motion/ScrollMotionExperience";
import { DomainShowcaseAnimated } from "@/components/showcase/DomainShowcaseAnimated";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { TimelineSection } from "@/components/experience/TimelineSection";
import { SkillsMatrixSection } from "@/components/skills/SkillsMatrixSection";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { AvatarHUDWidget } from "@/components/avatar/AvatarHUDWidget";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#fbfbfd] text-[#000d10] block min-w-0 selection:bg-[#bc7155]/20 selection:text-[#bc7155]">
      {/* Floating Pill Navbar */}
      <Navbar />

      {/* Hyer Aviation Architectural Hero */}
      <HeroEditorial />

      {/* Cinematic Scroll-Motion Video Scrubbing Section */}
      <ScrollMotionExperience />

      {/* 4-Domain Kinetic Visual Showcase (2K Assets + Clay Ember Card) */}
      <DomainShowcaseAnimated />

      {/* High-Contrast Dark Console (Midnight Hull #0f0f1c) */}
      <div className="deferred-section">
        <InteractiveTerminal />
      </div>

      {/* Professional Experience & Telecom Field Timeline */}
      <div className="deferred-section">
        <TimelineSection />
      </div>

      {/* Skills Matrix & Technical Credentials */}
      <div className="deferred-section">
        <SkillsMatrixSection />
      </div>

      {/* Deep Ink Footer Terminal (#000d10) */}
      <div className="deferred-section">
        <ContactFooter />
      </div>

      {/* Reactive Multi-Pose Holographic HUD Assistant */}
      <AvatarHUDWidget />
    </main>
  );
}