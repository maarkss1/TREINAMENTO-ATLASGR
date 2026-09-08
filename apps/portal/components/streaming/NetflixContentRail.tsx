"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Lock } from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { NetflixModuleCard } from "./NetflixModuleCard";
import {
  getHighestUnlockedModuleNumber,
  getCurrentActiveModule,
  isModuleUnlocked,
} from "@/lib/progression";
import { moduleMetas as defaultAllModules } from "@/content/modules";
import { cn } from "@/lib/utils";

interface NetflixContentRailProps {
  title: string;
  subtitle?: string;
  badge?: string;
  modules: ModuleMeta[];
  progress: Record<string, ModuleProgress>;
  onOpenDetails: (meta: ModuleMeta) => void;
  variant?: "standard" | "top10" | "compact";
  focusMode?: boolean;
  allModules?: ModuleMeta[];
  onLockClick?: (meta: ModuleMeta) => void;
}

export function NetflixContentRail({
  title,
  subtitle,
  badge,
  modules,
  progress,
  onOpenDetails,
  variant = "standard",
  focusMode = false,
  allModules = defaultAllModules,
  onLockClick,
}: NetflixContentRailProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const highestUnlocked = useMemo(
    () => getHighestUnlockedModuleNumber(progress, allModules),
    [progress, allModules]
  );

  const activeModule = useMemo(
    () => getCurrentActiveModule(progress, allModules),
    [progress, allModules]
  );

  // Se o modo foco estiver ativo, exibimos os módulos liberados e no máximo o próximo imediato (teaser)
  const displayModules = useMemo(() => {
    if (!focusMode) return modules;
    return modules.filter(
      (m) => isModuleUnlocked(m, progress, allModules) || m.number === highestUnlocked + 1
    );
  }, [modules, focusMode, progress, allModules, highestUnlocked]);

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
  }, [displayModules]);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  if (!displayModules || displayModules.length === 0) {
    // Se o trilho estiver totalmente bloqueado no modo foco, exibe um placeholder informativo compacto
    if (focusMode && modules.length > 0) {
      return (
        <section className="py-3 px-6 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1700px] p-5 rounded-2xl border border-dashed border-border dark:border-white/10 bg-surface/50 dark:bg-white/[0.02] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-2 dark:bg-white/5 flex items-center justify-center text-muted dark:text-zinc-500 border border-border dark:border-white/10">
                <Lock size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-muted dark:text-zinc-400 font-display">
                  {title}
                </h3>
                <p className="text-xs text-muted dark:text-zinc-500">
                  Bloqueado: avance nos módulos anteriores para liberar esta série ({modules.length} módulos).
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted dark:text-zinc-600 bg-surface-2 dark:bg-white/5 px-2.5 py-1 rounded-full border border-border dark:border-white/10">
              Próxima Fase
            </span>
          </div>
        </section>
      );
    }
    return null;
  }

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
          <span>{displayModules.length} DISPONÍVEIS</span>
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
          {displayModules.map((module, index) => {
            const isLocked = !isModuleUnlocked(module, progress, allModules);
            const isCurrent = module.slug === activeModule.slug;

            return (
              <NetflixModuleCard
                key={module.slug}
                meta={module}
                progress={progress[module.slug]}
                rankIndex={variant === "top10" ? index : undefined}
                onOpenDetails={onOpenDetails}
                variant={variant}
                isLocked={isLocked}
                isCurrent={isCurrent}
                onLockClick={() => onLockClick?.(module)}
              />
            );
          })}
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
