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
        "group relative flex flex-col h-full rounded-3xl p-6 transition-all duration-300 select-none overflow-hidden",
        "bg-gradient-to-br from-[#FF5618] via-[#df4308] to-[#992800] text-white border-2 border-white/20 shadow-md",
        "hover:border-white/80 hover:shadow-[0_20px_45px_rgba(255,86,24,0.45),0_0_30px_rgba(255,86,24,0.3)] hover:-translate-y-1.5 hover:scale-[1.02]",
        isCompleted && "border-emerald-300/80 shadow-[0_12px_30px_rgba(16,185,129,0.3)]"
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
          {isCompleted && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-500/90 border border-emerald-300/40 px-2.5 py-1 rounded-full shadow-xs">
              <CheckCircle2 size={11} /> Validado
            </span>
          )}
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
          Acessar <Play size={11} className="fill-current" />
        </span>
      </div>
    </Link>
  );
}
