"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Plus, Check, Info, Clock, CheckCircle2, Sparkles } from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { useOnboardingStore } from "@/lib/store";
import { playUiSound } from "@/lib/soundEngine";
import { moduleIcons } from "@/lib/moduleIcons";
import { BASE_PATH } from "@/lib/basePath";
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
      {/* Card Poster Redondo com Fundo Laranja AtlasGR */}
      <div
        className={cn(
          "relative w-full aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out",
          "border-2 border-atlas-orange/30 bg-gradient-to-br from-[#FF5618] via-[#e04509] to-[#992800] shadow-md",
          "hover:border-white/80 hover:shadow-[0_20px_45px_rgba(255,86,24,0.45),0_0_30px_rgba(255,86,24,0.35)] hover:-translate-y-1.5 hover:scale-[1.03] hover:z-30"
        )}
        onClick={() => onOpenDetails(meta)}
      >
        {/* Imagem Real de Fundo com Fusão no Gradiente Laranja */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff5618]/90 via-[#c93e08]/90 to-[#6b1c00]/95">
          {meta.imageUrl ? (
            <img
              src={meta.imageUrl.startsWith("http") ? meta.imageUrl : `${BASE_PATH}${meta.imageUrl}`}
              alt={meta.title}
              className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 group-hover:opacity-65 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : null}

          {/* Iluminação Interna, Brilho Superior e Gradiente Tático */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/20 blur-2xl pointer-events-none group-hover:bg-white/30 transition-all duration-500"
          />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Top Header: Badge do Módulo + Status */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            Módulo {String(meta.number).padStart(2, "0")}
          </span>

          {isPassed ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md border border-emerald-300/40 shadow-sm">
              <CheckCircle2 size={12} /> Validado
            </span>
          ) : isStarted ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-atlas-orange backdrop-blur-md shadow-sm">
              Em curso
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/20">
              <Clock size={11} /> {meta.durationMinutes}m
            </span>
          )}
        </div>

        {/* Ícone de Marca D'Água Translúcido no Card */}
        {Icon && (
          <div className="absolute right-4 bottom-10 text-white/15 pointer-events-none select-none transition-transform group-hover:scale-115 duration-500">
            <Icon width={76} height={76} />
          </div>
        )}

        {/* Informações Centrais e Título do Módulo */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
          <span className="inline-block text-[10px] font-black uppercase tracking-widest mb-1 font-mono px-2 py-0.5 rounded-md bg-black/30 backdrop-blur-sm text-amber-200 border border-white/10">
            {theme.tag}
          </span>
          <h3 className="text-base sm:text-lg font-black text-white leading-snug font-display drop-shadow-lg line-clamp-1 group-hover:text-amber-200 transition-colors">
            {meta.title}
          </h3>

          <p className="text-xs text-white/85 line-clamp-1 mt-0.5 font-medium drop-shadow-sm">
            {meta.shortDescription}
          </p>

          {/* Barra de Progresso Em Andamento */}
          {(isStarted || isPassed) && (
            <div className="mt-3 w-full h-1.5 bg-black/30 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                style={{ width: isPassed ? "100%" : "55%" }}
              />
            </div>
          )}
        </div>

        {/* Quick Action Overlay no Hover com Cantos Redondos */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col justify-between p-5 transition-all duration-300 rounded-3xl backdrop-blur-xl",
            "bg-gradient-to-br from-[#FF5618]/95 via-[#d43f05]/95 to-[#802000]/95 text-white border-2 border-white/40 shadow-2xl",
            isHovered ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/25 text-white border border-white/40 shadow-xs">
              AtlasGR Academy
            </span>

            <button
              onClick={handleInfoClick}
              className="p-2 rounded-full bg-white/20 hover:bg-white/35 text-white border border-white/30 transition-all hover:scale-110 active:scale-95 shadow-sm"
              title="Ver detalhes completos"
              aria-label="Ver detalhes do módulo"
            >
              <Info size={16} />
            </button>
          </div>

          <div className="my-auto">
            <span className="text-[10px] font-mono text-amber-200 uppercase tracking-widest block mb-1 font-bold">
              Módulo {String(meta.number).padStart(2, "0")} • {meta.durationMinutes} min
            </span>
            <h4 className="text-base sm:text-lg font-black text-white line-clamp-1 font-display mb-1.5 drop-shadow-md">
              {meta.title}
            </h4>
            <p className="text-xs text-white/90 line-clamp-2 leading-relaxed">
              {meta.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/25">
            <div className="flex items-center gap-2.5">
              <Link
                href={`/trilha/${meta.slug}`}
                onClick={() => playUiSound("click")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-100 text-zinc-950 font-black text-xs transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Play size={13} className="fill-current" />
                {isPassed ? "Rever" : isStarted ? "Continuar" : "Assistir"}
              </Link>

              <button
                onClick={handleToggleList}
                className={cn(
                  "p-2.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 shadow-sm",
                  isInMyList
                    ? "bg-white text-atlas-orange border-white"
                    : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                )}
                title={isInMyList ? "Remover da Minha Lista" : "Adicionar à Minha Lista"}
                aria-label="Favoritar módulo"
              >
                {isInMyList ? <Check size={14} /> : <Plus size={14} />}
              </button>
            </div>

            <span className="text-[10px] font-mono font-black text-amber-200">
              4K ULTRA HD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

