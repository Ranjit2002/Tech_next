"use client";

import React, { useEffect } from "react";
import { X, Layers, HeartHandshake, ShieldAlert, Cpu, CheckCircle2 } from "lucide-react";
import { TechChapterData } from "@/lib/techData";
import { soundEngine } from "@/lib/audio";

interface ModalDrawerProps {
  chapter: TechChapterData | null;
  onClose: () => void;
}

export default function ModalDrawer({ chapter, onClose }: ModalDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundEngine.playClick();
        onClose();
      }
    };
    if (chapter) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chapter, onClose]);

  if (!chapter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto select-none">
      {/* Backdrop */}
      <div
        onClick={() => {
          soundEngine.playClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/20 shadow-2xl z-10 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-zinc-600 hover:text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-zinc-300 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: `${chapter.accentColor}25`, color: chapter.accentColor }}
            >
              CHAPTER {chapter.number}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-wider uppercase">
              DEEP ARCHITECTURAL REPORT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {chapter.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 italic">{chapter.tagline}</p>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm">
          {/* Architecture Specification */}
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5 dark:bg-white/[0.03] dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold uppercase">
              <Layers className="w-4 h-4" />
              <span>Core Architecture & Physics</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{chapter.deepDive.architecture}</p>
          </div>

          {/* Societal & Planetary Impact */}
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5 dark:bg-white/[0.03] dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>Humanitarian & Planetary Transformation</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{chapter.deepDive.humanImpact}</p>
          </div>

          {/* Ethical & Regulatory Frontier */}
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5 dark:bg-white/[0.03] dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Ethical Governance & Critical Guardrails</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{chapter.deepDive.ethicalFrontier}</p>
          </div>

          {/* Enabling Breakthrough Technologies */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold uppercase">
              <Cpu className="w-4 h-4" />
              <span>Foundational Enablers</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {chapter.deepDive.keyTechnologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-black/[0.02] border border-black/5 dark:bg-white/[0.02] dark:border-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            TRANSMISSION ID: // 2050-{chapter.number}-ARCH
          </span>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-semibold text-xs transition-colors shadow-lg cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
