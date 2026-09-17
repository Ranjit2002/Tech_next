"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { soundEngine } from "@/lib/audio";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Only show if user has scrolled down into the page
      if (scrollY > 200) {
        setIsVisible(true);

        // Reset timeout when scrolling occurs
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // When user stops scrolling, hide button with animation after 1.2s
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 1200);
      } else {
        // At the very top, keep hidden
        setIsVisible(false);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => soundEngine.playHover()}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2 rounded-full glass-pill border border-cyan-500/40 text-cyan-600 dark:text-cyan-300 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400 hover:text-cyan-700 dark:hover:text-white hover:bg-cyan-500/15 dark:hover:bg-cyan-500/25 active:scale-95 transition-all duration-500 ease-out cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      } p-3 sm:px-4 sm:py-2.5 text-xs font-mono font-semibold tracking-wider`}
    >
      {/* Upward arrow icon: shown on mobile and desktop */}
      <ArrowUp className="w-5 h-5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
      <span className="hidden sm:inline">Back to top</span>
    </button>
  );
}
