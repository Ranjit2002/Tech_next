"use client";

import React from "react";
import { ArrowDown, Sparkles, ChevronDown, Activity, Orbit } from "lucide-react";
import { HERO_STATS } from "@/lib/techData";
import { soundEngine } from "@/lib/audio";
import TiltCard from "../ui/TiltCard";

interface HeroSectionProps {
  onInspectClick: () => void;
}

export default function HeroSection({ onInspectClick }: HeroSectionProps) {
  const scrollToFirstChapter = () => {
    soundEngine.playClick();
    const firstChapter = document.getElementById("chapter-ai");
    if (firstChapter) {
      firstChapter.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 select-none">
      {/* Glow backgrounds */}
      <div className="glow-mesh -top-24 left-1/4 w-[500px] h-[500px] bg-cyan-500/20" />
      <div className="glow-mesh top-1/3 -right-20 w-[450px] h-[450px] bg-purple-500/15" />

      {/* Top Banner Tag */}
      <div className="flex flex-col items-center text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-lg shadow-cyan-500/10 animate-float">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>The 2025–2050 Civilizational Epoch</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping"></span>
        </div>

        {/* Main Epic Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.08] text-slate-900 dark:text-white">
          How <span className="gradient-text-rainbow">Technology</span> Is Rewriting The Human Story.
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl font-light leading-relaxed">
          We stand at the precipice of an exponential intelligence renaissance. Scroll to journey through the 5 foundational breakthroughs transforming energy, medicine, consciousness, and our place in the cosmos.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={scrollToFirstChapter}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
          >
            <span>Begin Exploration</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onInspectClick();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2.5 px-6 py-4 rounded-full glass-pill text-zinc-800 dark:text-white text-sm font-medium hover:border-cyan-400/50 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            <Orbit className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>Enter 3D Orbit Mode</span>
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Stats Cards */}
      <div className="pt-16 sm:pt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {HERO_STATS.map((stat, i) => (
            <TiltCard
              key={stat.label}
              glowColor="rgba(0, 242, 254, 0.25)"
              className="p-4 sm:p-5"
            >
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-[11px] font-mono mb-1">
                <span>METRIC 0{i + 1}</span>
                <Activity className="w-3 h-3 text-cyan-500 dark:text-cyan-400/70" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 mt-1">{stat.label}</div>
              <div className="text-[11px] text-cyan-600 dark:text-cyan-400/90 font-mono mt-0.5">{stat.sub}</div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex flex-col items-center justify-center pt-10 text-zinc-500 dark:text-zinc-400 text-xs font-mono tracking-widest">
        <button
          onClick={scrollToFirstChapter}
          onMouseEnter={() => soundEngine.playHover()}
          className="flex flex-col items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <span className="uppercase text-[10px] tracking-widest text-zinc-500 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            Scroll to Navigate 3D Dimensions
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-black/20 dark:border-white/20 flex justify-center p-1 group-hover:border-cyan-500/50 transition-colors">
            <div className="w-1 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 animate-pulse text-cyan-500 dark:text-cyan-400" />
        </button>
      </div>
    </section>
  );
}
