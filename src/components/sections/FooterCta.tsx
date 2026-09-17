"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Sparkles, Send, CheckCircle2, Terminal, ShieldCheck, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/audio";

export default function FooterCta() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    soundEngine.playSuccess();
    setSubscribed(true);

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#00f2fe", "#a855f7", "#10b981", "#f59e0b"],
      });
    } catch {}
  };

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/90 backdrop-blur-2xl z-20 select-none">
      {/* Glow Mesh */}
      <div className="glow-mesh bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10" />

      {/* Manifesto & Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/15 relative overflow-hidden shadow-2xl mb-16">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 border border-cyan-500/30">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE MANIFESTO</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Technology is not our destiny. <br />
              <span className="gradient-text-rainbow">It is our lever.</span>
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              The tools we forge will define whether humanity transcends resource scarcity, disease, and planetary vulnerability, or fractures under the weight of exponential change. The choice belongs to those who build.
            </p>

            {/* Newsletter Dispatch */}
            <div className="pt-2">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Telemetry feed connected. You are subscribed to future technological transmissions.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to receive 2050 briefings..."
                    className="flex-1 px-5 py-3.5 rounded-2xl glass-pill text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-cyan-400 border border-white/10 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    onMouseEnter={() => soundEngine.playHover()}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/30 cursor-pointer"
                  >
                    <span>Transmitting</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-zinc-400">
          <div className="text-zinc-400 font-mono text-[11px]">
            Engineered for the exploration of human potential. © 2025–2050 Synthesis Initiative.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill hover:text-white hover:border-cyan-400 transition-colors cursor-pointer text-zinc-300"
          >
            <span>Top of Dimension</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
