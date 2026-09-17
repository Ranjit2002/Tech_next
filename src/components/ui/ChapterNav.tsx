"use client";

import React, { useEffect, useState } from "react";
import { soundEngine } from "@/lib/audio";
import { TECH_CHAPTERS } from "@/lib/techData";

export default function ChapterNav() {
  const [activeChapter, setActiveChapter] = useState<string>("hero");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage(Math.round((scrollPos / totalHeight) * 100));
      }

      if (scrollPos < 400) {
        setActiveChapter("hero");
        return;
      }

      // Check which section is in view
      for (let i = TECH_CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TECH_CHAPTERS[i].id);
        if (el && el.offsetTop - 300 <= scrollPos) {
          setActiveChapter(TECH_CHAPTERS[i].id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    { id: "hero", label: "Genesis Core", num: "00" },
    ...TECH_CHAPTERS.map((c) => ({ id: c.id, label: c.title, num: c.number })),
  ];

  return (
    <aside
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 select-none pointer-events-auto"
      aria-label="Chapter Progression"
    >
      {/* Scroll percentage HUD */}
      <div className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 mb-2 font-bold">
        {scrollPercentage}%
      </div>

      {/* Progress track line */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute top-2 bottom-2 w-[1px] bg-black/10 dark:bg-white/10" />
        
        {chapters.map((item) => {
          const isActive = activeChapter === item.id;
          return (
            <a
              key={item.id}
              href={item.id === "hero" ? "#" : `#${item.id}`}
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500 dark:bg-cyan-400 ring-4 ring-cyan-500/30 scale-125 shadow-lg shadow-cyan-400/50"
                    : "bg-slate-300 dark:bg-white/20 group-hover:bg-slate-400 dark:group-hover:bg-white/60 group-hover:scale-110"
                }`}
              />

              {/* Popout Tooltip on Hover / Active */}
              <div
                className={`absolute left-7 px-3 py-1.5 rounded-lg glass-panel text-xs whitespace-nowrap transition-all duration-300 pointer-events-none flex items-center gap-2 border border-black/10 dark:border-white/10 ${
                  isActive
                    ? "opacity-100 translate-x-0 font-medium text-slate-900 dark:text-white border-cyan-500/40"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">{item.num}</span>
                <span>{item.label}</span>
              </div>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
