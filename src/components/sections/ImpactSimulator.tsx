"use client";

import React, { useState } from "react";
import { Sliders, Sparkles, Zap, HeartPulse, Cpu, Globe, RefreshCcw, TrendingUp, Award } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import TiltCard from "../ui/TiltCard";

export default function ImpactSimulator() {
  const [aiInvestment, setAiInvestment] = useState<number>(75);
  const [quantumScale, setQuantumScale] = useState<number>(60);
  const [fusionEnergy, setFusionEnergy] = useState<number>(85);
  const [biotechFocus, setBiotechFocus] = useState<number>(70);

  // Dynamic calculations based on slider values
  const averageLifespan = Math.round(78 + (biotechFocus * 0.42) + (aiInvestment * 0.15));
  const carbonDeficit = Math.min(99.5, (fusionEnergy * 0.75 + aiInvestment * 0.25)).toFixed(1);
  const cleanEnergyMultiplier = (1.0 + (fusionEnergy / 100) * 14.5 + (quantumScale / 100) * 2.5).toFixed(1);
  const discoverySpeed = Math.round((aiInvestment * 1200) + (quantumScale * 900) + 100);
  const spacePopulation = Math.round((fusionEnergy * 800) + (aiInvestment * 550) + 1500);

  const applyPreset = (ai: number, q: number, fusion: number, bio: number) => {
    soundEngine.playModeSwitch();
    setAiInvestment(ai);
    setQuantumScale(q);
    setFusionEnergy(fusion);
    setBiotechFocus(bio);
  };

  const handleSliderChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    val: number
  ) => {
    setter(val);
    soundEngine.playSliderTick(val / 100);
  };

  return (
    <section id="simulator" className="relative py-28 sm:py-36 px-6 max-w-7xl mx-auto z-10 select-none">
      {/* Glow Mesh */}
      <div className="glow-mesh left-1/3 top-1/4 w-[600px] h-[600px] bg-cyan-500/10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Sliders className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>Interactive Planetary Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          The 2050 <span className="gradient-text-rainbow">Impact Simulator</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          Adjust the technological investment vectors below to simulate civilization outcomes across energy, longevity, ecology, and off-world expansion.
        </p>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => applyPreset(30, 25, 35, 30)}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-3 py-1.5 rounded-full text-xs font-mono glass-pill text-zinc-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors"
          >
            Baseline Trajectory
          </button>
          <button
            onClick={() => applyPreset(75, 65, 85, 70)}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-3 py-1.5 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors font-semibold"
          >
            Accelerated Renaissance
          </button>
          <button
            onClick={() => applyPreset(100, 100, 100, 100)}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-3 py-1.5 rounded-full text-xs font-mono bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-purple-900 dark:text-white border border-purple-400/40 hover:scale-105 transition-all font-bold shadow-lg"
          >
            Post-Scarcity Singularity (Max)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Console: Left 6 columns */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              Technology Vector Allocation
            </span>
            <button
              onClick={() => applyPreset(50, 50, 50, 50)}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white flex items-center gap-1 font-mono transition-colors"
            >
              <RefreshCcw className="w-3 h-3" />
              Reset (50%)
            </button>
          </div>

          {/* Slider 1: AI */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                Artificial Superintelligence & Autonomous Labs
              </span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{aiInvestment}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={aiInvestment}
              onChange={(e) => handleSliderChange(setAiInvestment, Number(e.target.value))}
              className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Basic Automation</span>
              <span>Autonomous Planetary Discovery</span>
            </div>
          </div>

          {/* Slider 2: Quantum */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                Quantum Computing & Topological Qubits
              </span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{quantumScale}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={quantumScale}
              onChange={(e) => handleSliderChange(setQuantumScale, Number(e.target.value))}
              className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Noisy Intermediate (NISQ)</span>
              <span>Fault-Tolerant Million Qubits</span>
            </div>
          </div>

          {/* Slider 3: Fusion */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                Commercial Fusion & Clean Baseload Grid
              </span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{fusionEnergy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={fusionEnergy}
              onChange={(e) => handleSliderChange(setFusionEnergy, Number(e.target.value))}
              className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Fossil Dependence</span>
              <span>100% Zero-Carbon Fusion Baseload</span>
            </div>
          </div>

          {/* Slider 4: Biotech */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                Epigenetic Reversal & Synthetic Genomics
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{biotechFocus}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={biotechFocus}
              onChange={(e) => handleSliderChange(setBiotechFocus, Number(e.target.value))}
              className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Reactive Symptom Care</span>
              <span>Universal Epigenetic Rejuvenation</span>
            </div>
          </div>
        </div>

        {/* Projected Planetary Metrics: Right 6 columns */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1 */}
            <TiltCard glowColor="rgba(16, 185, 129, 0.3)" className="p-5">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                <span>HEALTHSPAN HORIZON</span>
                <HeartPulse className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono mt-2">
                {averageLifespan} <span className="text-lg font-normal text-zinc-500 dark:text-zinc-400">Yrs</span>
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                +{averageLifespan - 78} Years disease-free life
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-2">
                Eradication of dementia, cardiovascular decay & cellular senescence.
              </p>
            </TiltCard>

            {/* Metric 2 */}
            <TiltCard glowColor="rgba(245, 158, 11, 0.3)" className="p-5">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                <span>NET CARBON REVERSAL</span>
                <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono mt-2">
                -{carbonDeficit}%
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-1">
                Atmospheric CO₂ to 280 ppm
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-2">
                Powered by infinite fusion electricity driving gigaton direct air scrubbers.
              </p>
            </TiltCard>

            {/* Metric 3 */}
            <TiltCard glowColor="rgba(0, 242, 254, 0.3)" className="p-5">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                <span>SCIENTIFIC VELOCITY</span>
                <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono mt-2">
                {discoverySpeed.toLocaleString()}x
              </div>
              <div className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-1">
                Faster than human baseline
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-2">
                Autonomous AI labs testing millions of chemical hypotheses every hour.
              </p>
            </TiltCard>

            {/* Metric 4 */}
            <TiltCard glowColor="rgba(56, 189, 248, 0.3)" className="p-5">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                <span>OFF-WORLD POPULATION</span>
                <Globe className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono mt-2">
                {spacePopulation.toLocaleString()}
              </div>
              <div className="text-xs text-sky-600 dark:text-sky-400 font-mono mt-1">
                Permanent residents (Mars & Moon)
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-2">
                Self-sustaining biosphere domes and orbital manufacturing factories.
              </p>
            </TiltCard>
          </div>

          {/* Energy Surplus Summary Card */}
          <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">
                Planetary Clean Energy Index
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{cleanEnergyMultiplier}x Current Total Earth Consumption</span>
              </div>
              <div className="text-xs text-cyan-600 dark:text-cyan-300 font-mono">
                Enables universal water desalination & planetary greening
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
