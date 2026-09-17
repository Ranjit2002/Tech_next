"use client";

import React from "react";
import {
  Cpu,
  Sparkles,
  Network,
  Atom,
  ShieldAlert,
  Wifi,
  Zap,
  Wind,
  Droplets,
  HeartPulse,
  Dna,
  Activity,
  Orbit,
  Globe,
  Glasses,
  ArrowUpRight,
  Quote,
  CheckCircle,
  Clock,
  Radio,
} from "lucide-react";
import { TechChapterData } from "@/lib/techData";
import { soundEngine } from "@/lib/audio";
import TiltCard from "../ui/TiltCard";

interface TechChapterProps {
  chapter: TechChapterData;
  index: number;
  onOpenModal: (chapter: TechChapterData) => void;
}

export default function TechChapter({ chapter, index, onOpenModal }: TechChapterProps) {
  const isOdd = index % 2 === 1;

  // Icon mapping
  const renderIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case "Network": return <Network className="w-5 h-5 text-cyan-400" />;
      case "Atom": return <Atom className="w-5 h-5 text-purple-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-purple-400" />;
      case "Wifi": return <Wifi className="w-5 h-5 text-purple-400" />;
      case "Zap": return <Zap className="w-5 h-5 text-amber-400" />;
      case "Wind": return <Wind className="w-5 h-5 text-amber-400" />;
      case "Droplets": return <Droplets className="w-5 h-5 text-amber-400" />;
      case "HeartPulse": return <HeartPulse className="w-5 h-5 text-emerald-400" />;
      case "Dna": return <Dna className="w-5 h-5 text-emerald-400" />;
      case "Activity": return <Activity className="w-5 h-5 text-emerald-400" />;
      case "Orbit": return <Orbit className="w-5 h-5 text-sky-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-sky-400" />;
      case "Glasses": return <Glasses className="w-5 h-5 text-sky-400" />;
      default: return <Radio className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getGradientClass = (grad: TechChapterData["gradient"]) => {
    switch (grad) {
      case "cyan": return "gradient-text-cyan";
      case "purple": return "gradient-text-purple";
      case "amber": return "gradient-text-amber";
      case "emerald": return "gradient-text-emerald";
      default: return "gradient-text-rainbow";
    }
  };

  return (
    <section
      id={chapter.id}
      className="relative min-h-screen py-28 sm:py-36 px-6 max-w-7xl mx-auto z-10 flex items-center"
    >
      {/* Background glow halo tailored to chapter color */}
      <div
        className="glow-mesh w-[500px] h-[500px]"
        style={{
          backgroundColor: chapter.glowColor,
          left: isOdd ? "5%" : "60%",
          top: "20%",
        }}
      />

      {/* Main Content Column: Left or Right aligned to frame the 3D model */}
      <div
        className={`w-full lg:w-7/12 space-y-8 ${
          isOdd ? "lg:ml-auto lg:pl-8" : "lg:mr-auto lg:pr-8"
        }`}
      >
        {/* Chapter Header Badge */}
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold border tracking-wider"
            style={{
              backgroundColor: `${chapter.accentColor}18`,
              borderColor: `${chapter.accentColor}40`,
              color: chapter.accentColor,
            }}
          >
            CHAPTER {chapter.number}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-widest uppercase">
            {chapter.subtitle}
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${getGradientClass(chapter.gradient)}`}>
            {chapter.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium italic">
            "{chapter.tagline}"
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {chapter.description}
        </p>

        {/* Breakthrough Key Metric Banner */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-black/10 dark:border-white/10 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {chapter.statLabel}
            </div>
            <div
              className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight mt-0.5"
              style={{ color: chapter.accentColor }}
            >
              {chapter.statNumber}
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenModal(chapter);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-900 dark:text-white transition-all duration-200 border border-black/10 dark:border-white/10 cursor-pointer shadow-md hover:scale-105"
          >
            <span>Explore Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* The 3 Transformative Pillars */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            Foundational Breakthrough Pillars
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {chapter.pillars.map((pillar) => (
              <TiltCard
                key={pillar.title}
                glowColor={chapter.glowColor}
                className="p-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="p-2 w-fit rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    {renderIcon(pillar.icon)}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-snug">
                    {pillar.desc}
                  </p>
                </div>
                <div
                  className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 text-[11px] font-mono font-semibold"
                  style={{ color: chapter.accentColor }}
                >
                  {pillar.metric}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Milestone Timeline Progress */}
        <div className="p-5 rounded-2xl glass-card border border-black/10 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              Evolutionary Milestones
            </span>
            <span>2020 – 2045</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {chapter.timeline.map((item) => (
              <div
                key={item.year}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
              >
                <div className="mt-0.5">
                  {item.status === "achieved" ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  ) : item.status === "current" ? (
                    <span className="relative flex h-2.5 w-2.5 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 dark:bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-600 dark:bg-cyan-500"></span>
                    </span>
                  ) : (
                    <Radio className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold text-slate-900 dark:text-zinc-200">
                    {item.year}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">
                    {item.milestone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visionary Quote */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-r from-black/[0.03] dark:from-white/[0.04] to-transparent border-l-2 border-black/20 dark:border-white/30 space-y-2">
          <Quote className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          <p className="text-sm text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
            "{chapter.quote.text}"
          </p>
          <div className="pt-1 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white">{chapter.quote.author}</span>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs">— {chapter.quote.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
