"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Plus, Check, Volume2, VolumeX, Sparkles, Shield, Cpu, Award } from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { useOnboardingStore } from "@/lib/store";
import { playUiSound } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

import { ModuleTitle } from "@/components/brand/ModuleTitle";

interface NetflixHeroBillboardProps {
  featuredModules: ModuleMeta[];
  progress: Record<string, ModuleProgress>;
  onOpenDetails: (meta: ModuleMeta) => void;
}

export function NetflixHeroBillboard({
  featuredModules,
  progress,
  onOpenDetails,
}: NetflixHeroBillboardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const myList = useOnboardingStore((s) => s.myList || []);
  const toggleMyList = useOnboardingStore((s) => s.toggleMyList);

  const activeModule = featuredModules[currentIndex] || featuredModules[0];
  const isInMyList = activeModule ? myList.includes(activeModule.slug) : false;
  const isPassed = activeModule ? Boolean(progress[activeModule.slug]?.passed) : false;

  // Auto-cycle every 9 seconds
  useEffect(() => {
    if (!featuredModules || featuredModules.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredModules.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [featuredModules]);

  if (!activeModule) return null;

  const handleToggleList = () => {
    playUiSound("click");
    toggleMyList(activeModule.slug);
  };

  const handleDetailsClick = () => {
    playUiSound("pop");
    onOpenDetails(activeModule);
  };

  return (
    <div className="relative w-full min-h-[560px] lg:min-h-[640px] flex items-end overflow-hidden bg-background dark:bg-black select-none text-foreground dark:text-white">
      {/* Background Visual High-Tech & Ambient Layers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Fundo do Hero: Dark Mode Netflix Cinema vs Light Mode Apple Keynote */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden dark:block"
            style={{
              backgroundImage: "radial-gradient(ellipse at 70% 30%, rgba(255, 86, 24, 0.28) 0%, rgba(14, 18, 30, 0.95) 60%, #08080a 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center block dark:hidden"
            style={{
              backgroundImage: "radial-gradient(ellipse at 70% 30%, rgba(255, 86, 24, 0.12) 0%, rgba(240, 243, 250, 0.85) 55%, #fcfcfc 100%)",
            }}
          />

          {/* Glowing Ambient Lights (Apple/Samsung Aesthetic) */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-atlas-orange/15 dark:bg-atlas-orange/20 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none" />

          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/brand/grid-pattern.svg')] opacity-5 dark:opacity-10 mix-blend-overlay" />

          {/* Vignette & Contrast Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent dark:from-black dark:via-black/80 dark:to-transparent w-full lg:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 dark:from-[#08080a] dark:via-transparent dark:to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-[1700px] w-full px-6 sm:px-10 lg:px-14 pt-20 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Top Brand Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-atlas-orange/15 dark:bg-atlas-orange/20 text-atlas-orange border border-atlas-orange/30 shadow-sm">
                <Sparkles size={13} /> Original AtlasGR
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-surface-2 text-foreground border border-border dark:bg-white/10 dark:text-white/90 dark:border-white/15 backdrop-blur-md">
                <Shield size={13} className="text-atlas-orange" /> {activeModule.category}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold font-mono bg-surface-2 text-muted border border-border dark:bg-black/60 dark:text-zinc-300 dark:border-white/10">
                4K HDR • {activeModule.durationMinutes} MIN
              </span>
            </div>

            {/* Giant Title (Apple & Samsung Keynote Style) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-atlas-orange tracking-tight leading-[1.08] font-display mb-4 drop-shadow-[0_4px_24px_rgba(255,86,24,0.25)]">
              <ModuleTitle title={activeModule.title} />
            </h1>

            {/* Synopsis */}
            <p className="text-base sm:text-lg text-muted dark:text-zinc-300 font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-sm dark:drop-shadow-md">
              {activeModule.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/trilha/${activeModule.slug}`}
                onClick={() => playUiSound("click")}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-black text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <Play size={18} className="fill-current" />
                {isPassed ? "Rever Treinamento" : "Assistir Agora"}
              </Link>

              <button
                onClick={handleDetailsClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-2 hover:bg-zinc-200 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white font-bold text-sm backdrop-blur-xl border border-border dark:border-white/15 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Info size={18} />
                Mais Detalhes
              </button>

              <button
                onClick={handleToggleList}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border backdrop-blur-xl transition-all hover:scale-105 active:scale-95 text-sm font-semibold",
                  isInMyList
                    ? "bg-atlas-orange/20 border-atlas-orange text-atlas-orange"
                    : "bg-surface-2 hover:bg-zinc-200 border-border text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                )}
                title={isInMyList ? "Remover da Minha Lista" : "Adicionar à Minha Lista"}
              >
                {isInMyList ? <Check size={18} /> : <Plus size={18} />}
                <span className="hidden sm:inline">{isInMyList ? "Na Lista" : "Minha Lista"}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right-side Volume Toggle & Slide Indicators */}
      <div className="absolute right-6 sm:right-10 lg:right-14 bottom-12 z-20 flex items-center gap-4">
        {/* Slide Selector Dots */}
        <div className="flex items-center gap-2">
          {featuredModules.map((mod, idx) => (
            <button
              key={mod.slug}
              onClick={() => {
                playUiSound("click");
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === currentIndex ? "w-8 bg-atlas-orange" : "w-2 bg-zinc-400/50 dark:bg-white/30 hover:bg-zinc-600 dark:hover:bg-white/60"
              )}
              aria-label={`Ver destaque ${idx + 1}`}
            />
          ))}
        </div>

        {/* Audio Ambient Toggle */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playUiSound("click");
          }}
          className="p-2.5 rounded-full bg-surface-2/80 hover:bg-surface-2 text-foreground dark:bg-black/60 dark:hover:bg-black/90 dark:text-white border border-border dark:border-white/15 backdrop-blur-md transition-colors shadow-sm"
          title={isMuted ? "Ativar som" : "Desativar som"}
          aria-label="Controle de áudio ambiente"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}
