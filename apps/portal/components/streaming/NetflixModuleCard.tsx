"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Plus, Check, Info, Clock, CheckCircle2 } from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { useOnboardingStore } from "@/lib/store";
import { playUiSound } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

interface NetflixModuleCardProps {
  meta: ModuleMeta;
  progress?: ModuleProgress;
  rankIndex?: number;
  onOpenDetails: (meta: ModuleMeta) => void;
  variant?: "standard" | "top10" | "compact";
}

// Map each module to high-tech cinematic color theme and icon concept
const MODULE_THEMES: Record<number, { gradient: string; accent: string; tag: string }> = {
  1: { gradient: "from-[#FF5618]/25 via-[#1a1412] to-[#0d0d11]", accent: "#FF5618", tag: "Cultura & Missão" },
  2: { gradient: "from-[#0284c7]/25 via-[#0e1724] to-[#0d0d11]", accent: "#38bdf8", tag: "Supply Chain" },
  3: { gradient: "from-[#dc2626]/25 via-[#221013] to-[#0d0d11]", accent: "#f87171", tag: "PGR & Segurança" },
  4: { gradient: "from-[#ea580c]/25 via-[#1e130f] to-[#0d0d11]", accent: "#fb923c", tag: "Portfólio 360°" },
  5: { gradient: "from-[#2563eb]/25 via-[#0f172a] to-[#0d0d11]", accent: "#60a5fa", tag: "Software Connect" },
  6: { gradient: "from-[#7c3aed]/25 via-[#181126] to-[#0d0d11]", accent: "#c084fc", tag: "Atlas Profile & IA" },
  7: { gradient: "from-[#059669]/25 via-[#0d1f19] to-[#0d0d11]", accent: "#34d399", tag: "APIs & Telemetria" },
  8: { gradient: "from-[#d97706]/25 via-[#1f190f] to-[#0d0d11]", accent: "#fbbf24", tag: "Contas Estratégicas" },
  9: { gradient: "from-[#e11d48]/25 via-[#221017] to-[#0d0d11]", accent: "#fb7185", tag: "Comercial de Alta Performance" },
  10: { gradient: "from-[#4f46e5]/25 via-[#131428] to-[#0d0d11]", accent: "#818cf8", tag: "Vocabulário Operacional" },
  11: { gradient: "from-[#0891b2]/25 via-[#0f1c22] to-[#0d0d11]", accent: "#22d3ee", tag: "Central de Operações" },
  12: { gradient: "from-[#16a34a]/25 via-[#102016] to-[#0d0d11]", accent: "#4ade80", tag: "Compliance & LGPD" },
  13: { gradient: "from-[#9333ea]/25 via-[#1b1029] to-[#0d0d11]", accent: "#e879f9", tag: "IA Preditiva & Sensores" },
  14: { gradient: "from-[#f59e0b]/25 via-[#211a10] to-[#0d0d11]", accent: "#fcd34d", tag: "Casos Reais & Gestão" },
  15: { gradient: "from-[#FF5618]/30 via-[#26130d] to-[#0d0d11]", accent: "#FF7033", tag: "Síntese Final & Prova" },
};

export function NetflixModuleCard({
  meta,
  progress,
  rankIndex,
  onOpenDetails,
  variant = "standard",
}: NetflixModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const myList = useOnboardingStore((s) => s.myList || []);
  const toggleMyList = useOnboardingStore((s) => s.toggleMyList);

  const isInMyList = myList.includes(meta.slug);
  const isPassed = Boolean(progress?.passed);
  const isStarted = !isPassed && Boolean(progress?.completed || (progress?.attempts && progress.attempts > 0));
  const theme = MODULE_THEMES[meta.number] || {
    gradient: "from-[#FF5618]/25 via-[#1a1412] to-[#0d0d11]",
    accent: "#FF5618",
    tag: meta.category || "Geral",
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playUiSound("click");
    toggleMyList(meta.slug);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playUiSound("pop");
    onOpenDetails(meta);
  };

  return (
    <div
      className={cn(
        "group relative select-none transition-all duration-300",
        variant === "top10" ? "flex items-center gap-2 min-w-[280px] sm:min-w-[340px]" : "min-w-[240px] sm:min-w-[280px] lg:min-w-[310px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Estilização Top 10 Numerada estilo Netflix */}
      {variant === "top10" && rankIndex !== undefined && (
        <div className="relative shrink-0 flex items-center justify-center select-none w-16 sm:w-20">
          <span
            className="font-black text-6xl sm:text-8xl italic tracking-tighter leading-none font-display drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-900 dark:from-[#555562] dark:to-[#1c1c24]"
            style={{
              WebkitTextStroke: "2px currentColor",
            }}
          >
            {rankIndex + 1}
          </span>
        </div>
      )}

      {/* Card Poster Cinematográfico 16:9 */}
      <div
        className={cn(
          "relative w-full aspect-[16/9] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out",
          "border border-border/80 bg-surface dark:border-white/10 dark:bg-[#121318] shadow-sm",
          "hover:border-atlas-orange/50 hover:shadow-[0_16px_35px_rgba(0,0,0,0.1),0_0_20px_rgba(255,86,24,0.2)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(255,86,24,0.3)] hover:scale-[1.04] hover:z-30"
        )}
        onClick={() => onOpenDetails(meta)}
      >
        {/* Background Visual High-Tech Cinematográfico */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />

        {/* Linhas de grade sutis e brilho holográfico */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Gradiente escuro inferior para contraste perfeito de texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
            Módulo {String(meta.number).padStart(2, "0")}
          </span>

          {isPassed ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={12} /> Validado
            </span>
          ) : isStarted ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-atlas-orange/20 backdrop-blur-md text-atlas-orange border border-atlas-orange/30">
              Em curso
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/50 backdrop-blur-md text-zinc-400 border border-white/5">
              <Clock size={11} /> {meta.durationMinutes}m
            </span>
          )}
        </div>

        {/* Informações Centrais e Título do Módulo */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: theme.accent }}>
            {theme.tag}
          </p>
          <h3 className="text-sm sm:text-base font-black text-white leading-tight font-display drop-shadow-md line-clamp-1 group-hover:text-atlas-orange transition-colors">
            {meta.title}
          </h3>

          <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5 hidden sm:block font-medium drop-shadow-sm">
            {meta.shortDescription}
          </p>

          {/* Barra de Progresso Em Andamento (estilo Netflix) */}
          {(isStarted || isPassed) && (
            <div className="mt-2.5 w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-atlas-orange rounded-full shadow-[0_0_8px_#FF5618]"
                style={{ width: isPassed ? "100%" : "55%" }}
              />
            </div>
          )}
        </div>

        {/* Quick Action Overlay no Hover (Netflix Overlay Adaptado para Light/Dark) */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col justify-between p-3.5 transition-opacity duration-200 backdrop-blur-md",
            "bg-white/95 text-zinc-900 border border-zinc-200/90 shadow-xl dark:bg-black/90 dark:text-white dark:border-white/10",
            isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/30">
              Original AtlasGR
            </span>

            <button
              onClick={handleInfoClick}
              className="p-1.5 rounded-full bg-surface-2 hover:bg-zinc-200 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white transition-colors"
              title="Ver detalhes completos"
              aria-label="Ver detalhes do módulo"
            >
              <Info size={15} />
            </button>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-black text-foreground dark:text-white line-clamp-1 font-display mb-1">
              {meta.title}
            </h4>
            <p className="text-[10px] text-muted dark:text-zinc-300 line-clamp-2 leading-relaxed">
              {meta.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-border dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/trilha/${meta.slug}`}
                onClick={() => playUiSound("click")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-extrabold text-xs transition-colors shadow-sm"
              >
                <Play size={13} className="fill-current" />
                {isPassed ? "Rever" : isStarted ? "Continuar" : "Assistir"}
              </Link>

              <button
                onClick={handleToggleList}
                className={cn(
                  "p-1.5 rounded-lg border transition-colors",
                  isInMyList
                    ? "bg-atlas-orange text-white border-atlas-orange"
                    : "bg-surface-2 hover:bg-zinc-200 text-foreground border-border dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/15"
                )}
                title={isInMyList ? "Remover da Minha Lista" : "Adicionar à Minha Lista"}
                aria-label="Favoritar módulo"
              >
                {isInMyList ? <Check size={14} /> : <Plus size={14} />}
              </button>
            </div>

            <span className="text-[10px] font-mono text-muted dark:text-zinc-400 font-semibold">
              {meta.durationMinutes} MIN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
