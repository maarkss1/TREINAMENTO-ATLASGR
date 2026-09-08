"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
} from "lucide-react";
import type { ModuleMeta, ModuleProgress } from "@/lib/types";
import { moduleIcons } from "@/lib/moduleIcons";
import { playUiSound } from "@/lib/soundEngine";
import { BASE_PATH } from "@/lib/basePath";
import { cn } from "@/lib/utils";

interface CurrentMissionSpotlightProps {
  module: ModuleMeta;
  progress?: ModuleProgress;
  totalModules: number;
  onOpenDetails: (meta: ModuleMeta) => void;
  focusMode: boolean;
  onToggleFocusMode: (val: boolean) => void;
}

export function CurrentMissionSpotlight({
  module,
  progress,
  totalModules,
  onOpenDetails,
  focusMode,
  onToggleFocusMode,
}: CurrentMissionSpotlightProps) {
  const Icon = moduleIcons[module.slug];
  const isPassed = Boolean(progress?.passed);
  const isStarted = !isPassed && Boolean(progress?.completed || (progress?.attempts && progress.attempts > 0));

  const handleStartClick = () => {
    playUiSound("click");
  };

  const handleDetailsClick = () => {
    playUiSound("pop");
    onOpenDetails(module);
  };

  const handleToggleMode = (newMode: boolean) => {
    playUiSound("toggle");
    onToggleFocusMode(newMode);
  };

  return (
    <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 py-4">
      {/* Container Principal com Estilo Apple / Netflix Premium */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-atlas-orange/40 bg-gradient-to-br from-[#1c0c05] via-[#120a07] to-[#0a090d] shadow-2xl p-6 sm:p-8 lg:p-10">
        {/* Glow de Fundo e Luzes de Acento Laranja */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-atlas-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Control Bar: Status da Missão + Switcher de Modo Foco */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-atlas-orange text-white shadow-[0_0_20px_rgba(255,86,24,0.6)] animate-pulse">
              <Zap size={13} className="fill-current" /> Sua Missão Atual
            </span>
            <span className="text-xs font-mono font-bold text-zinc-400">
              Módulo {String(module.number).padStart(2, "0")} de {String(totalModules).padStart(2, "0")}
            </span>
          </div>

          {/* Toggle de Modo Foco (Para não ficar confuso) */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => handleToggleMode(true)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                focusMode
                  ? "bg-atlas-orange text-white shadow-md scale-102"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Sparkles size={12} />
              Trilha Focada (Passo a Passo)
            </button>
            <button
              onClick={() => handleToggleMode(false)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                !focusMode
                  ? "bg-white text-zinc-950 shadow-md scale-102"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Ver Grade Completa (15)
            </button>
          </div>
        </div>

        {/* Conteúdo Central: Card Destaque Interativo */}
        <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Coluna de Texto & Gamificação */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-300 font-mono px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                {module.category || "Operações AtlasGR"}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-zinc-300">
                <Clock size={12} className="text-atlas-orange" /> {module.durationMinutes} min de imersão
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight leading-tight">
              {module.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-2xl">
              {module.shortDescription}
            </p>

            {/* Badges de Recompensa Gamificada */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-amber-200">
                <Award size={15} className="text-amber-400" />
                <span>+150 XP de Habilitação</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-emerald-300">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>Simulador Prático Incluso</span>
              </div>
            </div>

            {/* Botões de Ação Imediata */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/trilha/${module.slug}`}
                onClick={handleStartClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-atlas-orange via-[#ff6a33] to-[#e04509] text-white font-black text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(255,86,24,0.45)] hover:shadow-[0_15px_40px_rgba(255,86,24,0.65)] hover:scale-105 active:scale-95 transition-all border border-white/30"
              >
                <Play size={18} className="fill-current" />
                {isPassed ? "Refazer Módulo" : isStarted ? "Continuar Missão" : "Iniciar Treinamento"}
              </Link>

              <button
                onClick={handleDetailsClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20 hover:scale-102 active:scale-98"
              >
                <Info size={16} /> Ver Ementa & Objetivos
              </button>
            </div>
          </div>

          {/* Coluna Visual do Card Interativo (Estilo Laranja Atlas) */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={handleDetailsClick}
              className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer border-2 border-white/30 bg-gradient-to-br from-[#FF5618] via-[#e04509] to-[#992800] shadow-[0_20px_50px_rgba(255,86,24,0.4)] group select-none"
            >
              {/* Imagem de Fundo com Fusão */}
              {module.imageUrl ? (
                <img
                  src={module.imageUrl.startsWith("http") ? module.imageUrl : `${BASE_PATH}${module.imageUrl}`}
                  alt={module.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-108 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : null}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/25 rounded-full blur-2xl pointer-events-none group-hover:bg-white/35 transition-all" />

              {/* Tag Superior */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/40 text-white backdrop-blur-md border border-white/20">
                  Módulo {String(module.number).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-zinc-950 shadow-md">
                  <Sparkles size={11} className="fill-current" /> Liberado
                </span>
              </div>

              {/* Marca d'Água Central */}
              {Icon && (
                <div className="absolute right-5 bottom-8 text-white/20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Icon width={88} height={88} />
                </div>
              )}

              {/* Informações no Card */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                <span className="text-[10px] font-mono text-amber-200 font-bold uppercase tracking-wider block mb-1">
                  Clique para inspecionar
                </span>
                <h3 className="text-lg font-black text-white font-display line-clamp-1 drop-shadow-md">
                  {module.title}
                </h3>
                <p className="text-xs text-white/90 font-medium line-clamp-1 mt-0.5">
                  Dominar as competências para liberar a etapa seguinte
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
