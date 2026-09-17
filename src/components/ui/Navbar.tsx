"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Compass,
  Cpu,
  Dna,
  Zap,
  Atom,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import { soundEngine } from "@/lib/audio";
import { Theme } from "@/lib/theme";

interface NavbarProps {
  theme?: Theme;
  toggleTheme?: () => void;
}

export default function Navbar({ theme = "dark", toggleTheme }: NavbarProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const isPlaying = soundEngine.toggleAmbient();
    setIsPlayingAudio(isPlaying);
    soundEngine.playClick();
  };

  const navItems = [
    { label: "AI & Neural", href: "#chapter-ai", icon: <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" /> },
    { label: "Quantum", href: "#chapter-quantum", icon: <Atom className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" /> },
    { label: "Fusion Energy", href: "#chapter-fusion", icon: <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> },
    { label: "Biotech", href: "#chapter-biotech", icon: <Dna className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> },
    { label: "Space", href: "#chapter-space", icon: <Globe className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 py-3 shadow-lg shadow-black/5 dark:shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo with Custom Synthesis Nexus Mark */}
        <a
          href="#"
          onMouseEnter={() => soundEngine.playHover()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-amber-500/30 p-[1px] shadow-lg shadow-cyan-500/10 transition-all duration-300 group-hover:shadow-cyan-500/30 group-hover:scale-105 border border-black/10 dark:border-white/10">
            <div className="w-full h-full bg-white dark:bg-[#030712] rounded-[11px] flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-700 ease-out group-hover:rotate-180"
              >
                <defs>
                  <linearGradient id="navSynthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2fe" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <radialGradient id="navCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Outer Hex Convergence Perimeter */}
                <path
                  d="M18 3.5 L29.5 10.2 L29.5 23.8 L18 30.5 L6.5 23.8 L6.5 10.2 Z"
                  stroke="url(#navSynthGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 2"
                  className="opacity-80"
                />

                {/* 3 Converging Pillars of Synthesis */}
                <path
                  d="M18 3.5 L18 17 M29.5 23.8 L18 17 M6.5 23.8 L18 17"
                  stroke="url(#navSynthGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* Quantum Orbit Ring */}
                <circle
                  cx="18"
                  cy="17"
                  r="7"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                  strokeDasharray="2 2"
                />

                {/* Core Singularity */}
                <circle cx="18" cy="17" r="4" fill="currentColor" className="text-white dark:text-[#030712]" stroke="#00f2fe" strokeWidth="1.2" />
                <circle cx="18" cy="17" r="2" fill="url(#navSynthGrad)" />
                <circle cx="18" cy="17" r="5" fill="url(#navCoreGlow)" className="animate-pulse opacity-75" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-sm">
              <span className="text-slate-900 dark:text-white">SYNTHESIS</span>
              <span className="text-cyan-600 dark:text-cyan-400 text-xs font-mono">// 2050</span>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-widest hidden sm:inline">
              HOW TECH SHAPES CIVILIZATION
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
          <a
            href="#simulator"
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full transition-all duration-200"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>Simulator</span>
          </a>
        </nav>

        {/* Right Controls: Theme Toggle, Audio Toggle, Live Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              toggleTheme?.();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono glass-pill text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-300 cursor-pointer border border-black/10 dark:border-white/10 shadow-sm"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
                <span className="hidden sm:inline text-[10px] font-bold">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline text-[10px] font-bold">DARK</span>
              </>
            )}
          </button>

          {/* Procedural Audio Button */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
              isPlayingAudio
                ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                : "glass-pill text-zinc-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20"
            }`}
            title="Toggle procedural ambient soundscape"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline text-[10px]">AUDIO ON</span>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-cyan-500 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-0.5 h-2 bg-cyan-500 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-0.5 h-2.5 bg-cyan-500 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Telemetry Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 glass-pill rounded-full border border-black/10 dark:border-white/10 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
            <span className="text-zinc-700 dark:text-zinc-300">CORE ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
