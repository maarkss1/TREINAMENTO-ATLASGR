"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { NetflixModuleCard } from "./NetflixModuleCard";
import { cn } from "@/lib/utils";

interface NetflixContentRailProps {
  title: string;
  subtitle?: string;
  badge?: string;
  modules: ModuleMeta[];
  progress: Record<string, ModuleProgress>;
  onOpenDetails: (meta: ModuleMeta) => void;
  variant?: "standard" | "top10" | "compact";
}

export function NetflixContentRail({
  title,
  subtitle,
  badge,
  modules,
  progress,
  onOpenDetails,
  variant = "standard",
}: NetflixContentRailProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [modules]);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  if (!modules || modules.length === 0) return null;

  return (
    <section className="relative py-4 sm:py-6 group/rail">
      {/* Rail Header */}
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 mb-3 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            {badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/25">
                <Sparkles size={11} /> {badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-foreground dark:text-white tracking-tight font-display">
              {title}
            </h2>
          </div>

          {subtitle && (
            <p className="text-xs sm:text-sm text-muted dark:text-zinc-400 mt-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action / Count */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted dark:text-zinc-400 font-semibold font-mono">
          <span>{modules.length} MÓDULOS</span>
        </div>
      </div>

      {/* Rail Scroll Area with Controls */}
      <div className="relative">
        {/* Left Scroll Chevron */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center justify-center w-12 h-20 rounded-lg bg-surface/90 hover:bg-surface text-foreground dark:bg-black/75 dark:hover:bg-black/95 dark:text-white backdrop-blur-md border border-border dark:border-white/10 shadow-lg dark:shadow-2xl transition-all"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Horizontal Container */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-10 lg:px-14 py-2"
        >
          {modules.map((module, index) => (
            <NetflixModuleCard
              key={module.slug}
              meta={module}
              progress={progress[module.slug]}
              rankIndex={variant === "top10" ? index : undefined}
              onOpenDetails={onOpenDetails}
              variant={variant}
            />
          ))}
        </div>

        {/* Right Scroll Chevron */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 hidden sm:flex items-center justify-center w-12 h-20 rounded-lg bg-surface/90 hover:bg-surface text-foreground dark:bg-black/75 dark:hover:bg-black/95 dark:text-white backdrop-blur-md border border-border dark:border-white/10 shadow-lg dark:shadow-2xl transition-all"
            aria-label="Rolar para a direita"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </section>
  );
}
