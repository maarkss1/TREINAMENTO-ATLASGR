"use client";

import { CheckCircle2, Lock, BookOpen, Play, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ModuleMeta } from "@/lib/types";
import { moduleIcons } from "@/lib/moduleIcons";
import { playUiSound } from "@/lib/soundEngine";

interface ModuleCardProps {
  meta: ModuleMeta;
  index: number;
  isCompleted?: boolean;
}

export function ModuleCard({ meta, index, isCompleted }: ModuleCardProps) {
  const isReady = meta.status === "ready";
  const Icon = moduleIcons[meta.slug] || BookOpen;

  if (!isReady) {
    return (
      <div className="flex flex-col h-full bg-surface-2 border border-border dark:bg-[#111216] dark:border-white/5 rounded-2xl p-6 opacity-60 grayscale select-none">
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

  return (
    <Link
      href={`/trilha/${meta.slug}`}
      onClick={() => playUiSound("click")}
      className={cn(
        "group relative flex flex-col h-full rounded-2xl p-6 transition-all duration-300 select-none overflow-hidden",
        "bg-surface border border-border shadow-xs dark:bg-gradient-to-b dark:from-[#161720] dark:to-[#0f1016] dark:border-white/10",
        "hover:border-atlas-orange/50 hover:shadow-lg dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(255,86,24,0.2)] hover:-translate-y-1",
        isCompleted && "border-emerald-500/30 hover:border-emerald-500/60"
      )}
    >
      {/* Glow highlight no topo do card (Apple Keynote spec) */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-atlas-orange/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-atlas-orange/20 transition-all" />

      {/* Top Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className={cn(
            "w-11 h-11 flex items-center justify-center rounded-xl border transition-colors",
            isCompleted
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "bg-atlas-orange/15 text-atlas-orange border-atlas-orange/30 group-hover:bg-atlas-orange group-hover:text-white"
          )}
        >
          {/* @ts-expect-error Icon might be a lucide icon (takes size) or custom SVG (takes w/h) */}
          <Icon size={20} width={20} height={20} />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-muted dark:text-zinc-400 uppercase tracking-widest px-2 py-0.5 rounded bg-surface-2 border border-border dark:bg-white/5 dark:border-white/10">
            #{String(meta.number).padStart(2, "0")}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={11} /> Validado
            </span>
          )}
        </div>
      </div>

      {/* Category Tag */}
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-atlas-orange font-mono mb-1.5 relative z-10">
        {meta.category}
      </p>

      {/* Title */}
      <h3 className="font-display font-black text-lg text-foreground dark:text-white leading-snug mb-2 group-hover:text-atlas-orange transition-colors relative z-10">
        {meta.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-muted dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6 relative z-10 font-medium">
        {meta.shortDescription}
      </p>

      {/* Footer Specs */}
      <div className="mt-auto pt-4 border-t border-border dark:border-white/5 flex items-center justify-between text-xs text-muted dark:text-zinc-400 relative z-10">
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <Clock size={12} className="text-muted dark:text-zinc-500" />
          {meta.durationMinutes} min
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground dark:text-white group-hover:text-atlas-orange transition-colors">
          Acessar <Play size={11} className="fill-current" />
        </span>
      </div>
    </Link>
  );
}
