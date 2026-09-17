"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import ChapterNav from "@/components/ui/ChapterNav";
import HeroSection from "@/components/sections/HeroSection";
import TechChapter from "@/components/sections/TechChapter";
import ImpactSimulator from "@/components/sections/ImpactSimulator";
import ComparisonGrid from "@/components/sections/ComparisonGrid";
import BackToTop from "@/components/ui/BackToTop";
import InspectorOverlay from "@/components/3d/InspectorOverlay";
import ModalDrawer from "@/components/ui/ModalDrawer";
import { TECH_CHAPTERS, TechChapterData } from "@/lib/techData";
import { ShaderMode } from "@/components/3d/TechCanvas";
import { useTheme } from "@/lib/theme";

// Dynamically import Three.js TechCanvas with SSR disabled
const TechCanvas = dynamic(() => import("@/components/3d/TechCanvas"), {
  ssr: false,
});

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isInspecting, setIsInspecting] = useState(false);
  const [shaderMode, setShaderMode] = useState<ShaderMode>("neon");
  const [activeModalChapter, setActiveModalChapter] = useState<TechChapterData | null>(null);

  return (
    <main className="relative min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#030712] dark:text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-500">
      {/* 3D WebGL Canvas fixed in background */}
      <TechCanvas
        isInspecting={isInspecting}
        shaderMode={shaderMode}
        theme={theme}
      />

      {/* Grid Pattern and Vignette Overlays */}
      <div className="fixed inset-0 bg-tech-grid opacity-30 pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none z-[1]" />

      {/* Floating UI Elements */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ChapterNav />
      
      <InspectorOverlay
        isInspecting={isInspecting}
        setIsInspecting={setIsInspecting}
        shaderMode={shaderMode}
        setShaderMode={setShaderMode}
      />

      {/* Main Scroll Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection onInspectClick={() => setIsInspecting((prev) => !prev)} />

        {/* The 5 Tech Revolutions */}
        <div className="space-y-12 sm:space-y-24">
          {TECH_CHAPTERS.map((chapter, idx) => (
            <TechChapter
              key={chapter.id}
              chapter={chapter}
              index={idx}
              onOpenModal={(c) => setActiveModalChapter(c)}
            />
          ))}
        </div>

        {/* Interactive Future Impact Simulator */}
        <ImpactSimulator />

        {/* Comparative Historical Evolution Matrix */}
        <ComparisonGrid />

        {/* Minimal Closing End */}
        <div className="py-12 border-t border-white/5 text-center text-[11px] font-mono text-zinc-500 tracking-widest select-none">
          SYNTHESIS // 2050 CIVILIZATIONAL MATRIX
        </div>
      </div>

      {/* Dynamic Back To Top Button with Scroll Animation */}
      <BackToTop />

      {/* Deep-dive Architecture Modal */}
      <ModalDrawer
        chapter={activeModalChapter}
        onClose={() => setActiveModalChapter(null)}
      />
    </main>
  );
}
