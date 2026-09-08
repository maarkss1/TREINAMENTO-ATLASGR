"use client";

import { useState } from "react";
import { CheckCircle2, Lock, BookOpen, Play, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ModuleMeta } from "@/lib/types";
import { moduleIcons } from "@/lib/moduleIcons";
import { playUiSound } from "@/lib/soundEngine";

interface ModuleCardProps {
  meta: ModuleMeta;
  index: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  isCurrent?: boolean;
  onLockClick?: () => void;
}

export function ModuleCard({
  meta,
  index,
  isCompleted,
  isLocked = false,
  isCurrent = false,
  onLockClick,
}: ModuleCardProps) {
  const [shake, setShake] = useState(false);
  const isReady = meta.status === "ready";
  const Icon = moduleIcons[meta.slug] || BookOpen;

  if (!isReady) {
    return (
      <div className="flex flex-col h-full bg-surface-2 border border-border dark:bg-[#111216] dark:border-white/5 rounded-3xl p-6 opacity-60 grayscale select-none">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border dark:bg-white/5 text-zinc-400 dark:text-zinc-500 dark:border-white/5">
            <Lock size={18} />
          </div>
          <span className="text-[10px] font-mono font-bold text-muted dark:text-zinc-600 uppercase tracking-widest">
            Em breve
          </span>
        </div>
        <h3 className="font-display font-bold text-base text-foreground dark:text-zinc-300 mb-2">{meta.title}</h3>
        <p className="text-xs text-muted dark:text-zinc-500 leading-relaxed">Em preparação na grade corporativa.</p>
      </div>
    );
  }

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playUiSound("lock");
    setShake(true);
    setTimeout(() => setShake(false), 500);
    onLockClick?.();
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      playUiSound("hover");
    }
  };

  // Se bloqueado, renderiza container interativo que avisa e toca som de trava
  if (isLocked) {
    return (
      <motion.div
        animate={shake ? { x: [-6, 6, -5, 5, -2, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
        onClick={handleLockedClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "group relative flex flex-col h-full rounded-3xl p-6 select-none overflow-hidden cursor-not-allowed transition-all duration-300",
          "bg-gradient-to-br from-zinc-800/90 via-zinc-900/95 to-black/95 text-white/80 border-2 border-white/10 opacity-80 shadow-md",
          "hover:border-amber-500/40 hover:opacity-95"
        )}
      >
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-amber-300 shadow-sm">
            <Lock size={20} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black text-white/70 uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/50 border border-white/10">
              #{String(meta.number).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-black/60 border border-amber-500/30 px-2.5 py-1 rounded-full">
              <Lock size={10} /> Bloqueado
            </span>
          </div>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 font-mono mb-1.5 relative z-10">
          {meta.category}
        </p>

        <h3 className="font-display font-black text-lg text-white/90 leading-snug mb-2 relative z-10 drop-shadow-sm">
          {meta.title}
        </h3>

        <p className="text-xs text-amber-200/80 leading-relaxed line-clamp-3 mb-6 relative z-10 font-medium">
          🔒 Conclua o Módulo {String(meta.number - 1).padStart(2, "0")} para desbloquear este treinamento.
        </p>

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 relative z-10">
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500">
            <Clock size={12} />
            {meta.durationMinutes} min
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-amber-300/80 text-xs font-bold border border-white/10">
            <Lock size={11} /> Bloqueado
          </span>
        </div>
      </motion.div>
    );
  }

  // Card Desbloqueado com Laranja Oficial AtlasGR
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter}
      className="h-full"
    >
      <Link
        href={`/trilha/${meta.slug}`}
        onClick={() => playUiSound("click")}
        className={cn(
          "group relative flex flex-col h-full rounded-3xl p-6 transition-all duration-300 select-none overflow-hidden",
          "bg-gradient-to-br from-[#FF5618] via-[#df4308] to-[#992800] text-white border-2 border-white/20 shadow-md",
          "hover:border-white/80 hover:shadow-[0_20px_45px_rgba(255,86,24,0.45),0_0_30px_rgba(255,86,24,0.3)]",
          isCompleted && "border-emerald-300/80 shadow-[0_12px_30px_rgba(16,185,129,0.3)]",
          isCurrent && "border-amber-300 ring-2 ring-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.45)]"
        )}
      >
        {/* Glow highlight e iluminação superior */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/30 transition-all" />

        {/* Top Header */}
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-2xl border transition-all shadow-sm",
              isCompleted
                ? "bg-white text-emerald-600 border-white"
                : isCurrent
                ? "bg-amber-400 text-zinc-950 border-amber-300 shadow-md"
                : "bg-white/20 text-white border-white/30 group-hover:bg-white group-hover:text-atlas-orange"
            )}
          >
            {/* @ts-expect-error Icon might be a lucide icon (takes size) or custom SVG (takes w/h) */}
            <Icon size={22} width={22} height={22} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/30 border border-white/20 shadow-xs">
              #{String(meta.number).padStart(2, "0")}
            </span>
            {isCompleted ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-500/90 border border-emerald-300/40 px-2.5 py-1 rounded-full shadow-xs">
                <CheckCircle2 size={11} /> Validado
              </span>
            ) : isCurrent ? (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-950 bg-amber-400 border border-amber-200 px-2.5 py-1 rounded-full shadow-xs animate-pulse">
                <Sparkles size={11} className="fill-current" /> Fazendo Agora
              </span>
            ) : null}
          </div>
        </div>

        {/* Category Tag */}
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-200 font-mono mb-1.5 relative z-10">
          {meta.category}
        </p>

        {/* Title */}
        <h3 className="font-display font-black text-lg text-white leading-snug mb-2 group-hover:text-amber-200 transition-colors relative z-10 drop-shadow-sm">
          {meta.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-white/85 leading-relaxed line-clamp-3 mb-6 relative z-10 font-medium">
          {meta.shortDescription}
        </p>

        {/* Footer Specs */}
        <div className="mt-auto pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/90 relative z-10">
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-200">
            <Clock size={12} />
            {meta.durationMinutes} min
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 group-hover:bg-white group-hover:text-zinc-950 text-xs font-black transition-all shadow-xs">
            {isCurrent ? "Continuar" : "Acessar"} <Play size={11} className="fill-current" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
