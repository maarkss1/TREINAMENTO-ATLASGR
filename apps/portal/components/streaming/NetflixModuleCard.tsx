"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Plus, Check, Info, Clock, CheckCircle2, Sparkles } from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { useOnboardingStore } from "@/lib/store";
import { playUiSound } from "@/lib/soundEngine";
import { moduleIcons } from "@/lib/moduleIcons";
import { cn } from "@/lib/utils";

interface NetflixModuleCardProps {
  meta: ModuleMeta;
  progress?: ModuleProgress;
  rankIndex?: number;
  onOpenDetails: (meta: ModuleMeta) => void;
  variant?: "standard" | "top10" | "compact";
}

// Configuração visual padronizada por módulo (Alta definição + Paleta AtlasGR)
const MODULE_THEMES: Record<number, { accent: string; tag: string }> = {
  1: { accent: "#FF5618", tag: "Cultura & Missão" },
  2: { accent: "#0284c7", tag: "Supply Chain" },
  3: { accent: "#dc2626", tag: "PGR & Segurança" },
  4: { accent: "#ea580c", tag: "Portfólio 360°" },
  5: { accent: "#2563eb", tag: "Software Connect" },
  6: { accent: "#7c3aed", tag: "Atlas Profile & IA" },
  7: { accent: "#059669", tag: "APIs & Telemetria" },
  8: { accent: "#d97706", tag: "Contas Estratégicas" },
  9: { accent: "#e11d48", tag: "Comercial de Alta Performance" },
  10: { accent: "#4f46e5", tag: "Vocabulário Operacional" },
  11: { accent: "#0891b2", tag: "Central de Operações" },
  12: { accent: "#16a34a", tag: "Compliance & LGPD" },
  13: { accent: "#9333ea", tag: "IA Preditiva & Sensores" },
  14: { accent: "#f59e0b", tag: "Casos Reais & Gestão" },
  15: { accent: "#FF5618", tag: "Síntese Final & Prova" },
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
    accent: "#FF5618",
    tag: meta.category || "Geral",
  };

  const Icon = moduleIcons[meta.slug];

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
        "group relative select-none shrink-0 transition-all duration-300",
        "w-[260px] sm:w-[290px] lg:w-[320px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Poster Estilo Netflix / Apple TV */}
      <div
        className={cn(
          "relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out",
          "border border-border/80 bg-surface dark:border-white/10 dark:bg-[#111218] shadow-sm",
          "hover:border-atlas-orange/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_0_24px_rgba(255,86,24,0.22)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(255,86,24,0.3)] hover:-translate-y-1 hover:scale-[1.02] hover:z-30"
        )}
        onClick={() => onOpenDetails(meta)}
      >
        {/* Imagem Real de Fundo com Fallback Cinematográfico Padronizado */}
        <div className="absolute inset-0 bg-[#0d0e14]">
          {meta.imageUrl ? (
            <img
              src={meta.imageUrl}
              alt={meta.title}
              className="w-full h-full object-cover opacity-60 dark:opacity-40 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
              onError={(e) => {
                // Em caso de falha de carregamento, oculta a tag e deixa o gradiente vetorial
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : null}

          {/* Gradiente Tático e Grid Holográfico */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"
            style={{
              boxShadow: `inset 0 0 80px rgba(0,0,0,0.8)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Top Header: Badge do Módulo + Status */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/75 backdrop-blur-md text-white border border-white/15 shadow-sm">
            <span className="w-2 h-2 rounded-full shadow-[0_0_6px_currentColor]" style={{ backgroundColor: theme.accent, color: theme.accent }} />
            Módulo {String(meta.number).padStart(2, "0")}
          </span>

          {isPassed ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/25 backdrop-blur-md text-emerald-300 border border-emerald-500/40">
              <CheckCircle2 size={12} /> Validado
            </span>
          ) : isStarted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-atlas-orange/25 backdrop-blur-md text-atlas-orange border border-atlas-orange/40">
              Em curso
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md border border-white/10">
              <Clock size={11} /> {meta.durationMinutes}m
            </span>
          )}
        </div>

        {/* Ícone de Marca D'Água Translúcido no Card */}
        {Icon && (
          <div className="absolute right-3 bottom-12 text-white/[0.08] dark:text-white/[0.05] pointer-events-none select-none transition-transform group-hover:scale-110 duration-500">
            <Icon width={68} height={68} />
          </div>
        )}

        {/* Informações Centrais e Título do Módulo */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono" style={{ color: theme.accent }}>
            {theme.tag}
          </p>
          <h3 className="text-sm sm:text-base font-black text-white leading-snug font-display drop-shadow-md line-clamp-1 group-hover:text-atlas-orange transition-colors">
            {meta.title}
          </h3>

          <p className="text-[11px] text-zinc-300/90 line-clamp-1 mt-0.5 font-medium drop-shadow-sm">
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
            "absolute inset-0 z-20 flex flex-col justify-between p-4 transition-all duration-200 backdrop-blur-xl",
            "bg-white/95 text-zinc-900 border border-zinc-200/90 shadow-2xl dark:bg-black/92 dark:text-white dark:border-white/15",
            isHovered ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-98"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/30">
              Original AtlasGR
            </span>

            <button
              onClick={handleInfoClick}
              className="p-1.5 rounded-full bg-surface-2 hover:bg-zinc-200 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white transition-colors"
              title="Ver detalhes completos"
              aria-label="Ver detalhes do módulo"
            >
              <Info size={16} />
            </button>
          </div>

          <div>
            <span className="text-[10px] font-mono text-muted dark:text-zinc-400 uppercase tracking-widest block mb-0.5">
              Módulo {String(meta.number).padStart(2, "0")} • {meta.durationMinutes} min
            </span>
            <h4 className="text-sm sm:text-base font-black text-foreground dark:text-white line-clamp-1 font-display mb-1.5">
              {meta.title}
            </h4>
            <p className="text-xs text-muted dark:text-zinc-300 line-clamp-2 leading-relaxed">
              {meta.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border dark:border-white/10">
            <div className="flex items-center gap-2">
              <Link
                href={`/trilha/${meta.slug}`}
                onClick={() => playUiSound("click")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-black text-xs transition-transform active:scale-95 shadow-sm"
              >
                <Play size={13} className="fill-current" />
                {isPassed ? "Rever" : isStarted ? "Continuar" : "Assistir"}
              </Link>

              <button
                onClick={handleToggleList}
                className={cn(
                  "p-2 rounded-xl border transition-colors",
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

            <span className="text-[10px] font-mono font-bold text-atlas-orange">
              4K ULTRA HD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

