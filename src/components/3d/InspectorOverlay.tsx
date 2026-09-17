"use client";

import React from "react";
import { Eye, Rotate3d, Sparkles, Sliders, Shield, Zap } from "lucide-react";
import { ShaderMode } from "./TechCanvas";
import { soundEngine } from "@/lib/audio";

interface InspectorOverlayProps {
  isInspecting: boolean;
  setIsInspecting: (val: boolean) => void;
  shaderMode: ShaderMode;
  setShaderMode: (mode: ShaderMode) => void;
}

export default function InspectorOverlay({
  isInspecting,
  setIsInspecting,
  shaderMode,
  setShaderMode,
}: InspectorOverlayProps) {
  const modes: { id: ShaderMode; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "neon", label: "Cyber Neon", icon: <Sparkles className="w-3.5 h-3.5" />, color: "text-cyan-600 dark:text-cyan-400 border-cyan-500/40" },
    { id: "hologram", label: "Holo Matrix", icon: <Eye className="w-3.5 h-3.5" />, color: "text-emerald-600 dark:text-emerald-400 border-emerald-500/40" },
    { id: "plasma", label: "Solar Plasma", icon: <Zap className="w-3.5 h-3.5" />, color: "text-amber-600 dark:text-amber-400 border-amber-500/40" },
    { id: "obsidian", label: "Deep Obsidian", icon: <Shield className="w-3.5 h-3.5" />, color: "text-indigo-600 dark:text-indigo-400 border-indigo-500/40" },
  ];

  return (
    <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none">
      {/* Expanded Controls when Inspecting */}
      {isInspecting && (
        <div className="glass-panel p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-2xl border border-black/10 dark:border-white/15 animate-in fade-in slide-in-from-bottom-3 duration-300 w-64 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-1.5">
              <Rotate3d className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-spin text-xs" style={{ animationDuration: "6s" }} />
              3D Orbit Active
            </span>
            <span className="text-[10px] bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full font-mono border border-cyan-500/30 font-semibold">
              Drag to Rotate
            </span>
          </div>

          <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
            Click & drag to explore 3D geometry from any vantage angle.
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-mono tracking-wider">
              Visual Shader Mode
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    soundEngine.playModeSwitch();
                    setShaderMode(m.id);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    shaderMode === m.id
                      ? `bg-cyan-500/10 dark:bg-white/15 ${m.color} border shadow-lg font-semibold`
                      : "bg-black/5 dark:bg-black/30 text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsInspecting(!isInspecting);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
          isInspecting
            ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/40 border border-cyan-300 scale-105"
            : "glass-pill text-slate-800 dark:text-white/90 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
        }`}
      >
        <Rotate3d className={`w-4 h-4 text-cyan-600 dark:text-cyan-400 transition-transform duration-500 ${isInspecting ? "rotate-180 text-black" : "group-hover:rotate-45"}`} />
        <span>{isInspecting ? "Exit 3D Orbit" : "Inspect 3D Core"}</span>
        {!isInspecting && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
