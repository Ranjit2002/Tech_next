"use client";

import React from "react";
import { ArrowRight, History, Zap, Sparkles } from "lucide-react";
import { COMPARISON_MATRIX } from "@/lib/techData";
import TiltCard from "../ui/TiltCard";

export default function ComparisonGrid() {
  return (
    <section className="relative py-28 sm:py-36 px-6 max-w-7xl mx-auto z-10 select-none">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono uppercase tracking-widest">
          <History className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
          <span>Macro-Historical Evolution</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          The Great <span className="gradient-text-purple">Pivots of Humanity</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          How foundational technological capabilities have evolved across the three defining chapters of civilization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {COMPARISON_MATRIX.map((item) => (
          <TiltCard
            key={item.domain}
            glowColor="rgba(168, 85, 247, 0.25)"
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold mb-4 pb-2 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <span>{item.domain}</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400/80" />
              </div>

              {/* Past */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                  Past (Pre-Digital)
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-through decoration-zinc-400">
                  {item.past}
                </p>
              </div>

              {/* Present */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-300 block font-medium">
                  Present (Silicon Era)
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                  {item.present}
                </p>
              </div>
            </div>

            {/* Future */}
            <div className="pt-3 border-t border-cyan-500/20 bg-cyan-500/[0.04] -mx-5 -mb-5 p-4 rounded-b-2xl space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-300 font-semibold flex items-center gap-1">
                <span>Future (Synthesis Era)</span>
                <ArrowRight className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
              </span>
              <p className="text-xs text-slate-900 dark:text-white font-semibold leading-snug">
                {item.future}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
