"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Shield,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/store";
import { levelProgress, BADGES } from "@/lib/gamification";
import { moduleMetas } from "@/content/modules";
import { playUiSound } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

interface GamificationBarProps {
  className?: string;
  variant?: "full" | "compact";
}

export function GamificationBar({ className, variant = "full" }: GamificationBarProps) {
  const { xp, badges, progress, registration, streakDays = [] } = useOnboardingStore();
  const streak = streakDays.length;
  const { current, next, pct: levelPct } = levelProgress(xp);

  const readyModules = moduleMetas.filter((m) => m.status === "ready");
  const completedCount = readyModules.filter((m) => progress[m.slug]?.passed).length;
  const totalCount = readyModules.length;
  const coursePct = Math.round((completedCount / totalCount) * 100);

  // Próximo marco de XP
  const xpRemaining = next ? Math.max(0, next.minXp - xp) : 0;

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3 bg-surface border border-border px-3.5 py-2 rounded-2xl shadow-xs", className)}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-atlas-orange/15 border border-atlas-orange/30 flex items-center justify-center text-atlas-orange font-mono font-bold text-xs">
            {current.level}
          </div>
          <div className="leading-tight">
            <span className="text-[10px] block font-mono text-muted uppercase tracking-wider">{current.title}</span>
            <span className="text-xs font-black text-foreground font-display">{xp} XP</span>
          </div>
        </div>

        <div className="h-6 w-px bg-border mx-1" />

        {/* Mini progress bar */}
        <div className="flex-1 min-w-[100px] max-w-[160px]">
          <div className="flex justify-between text-[10px] font-mono text-muted mb-1">
            <span>Curso</span>
            <span className="font-bold text-atlas-orange">{coursePct}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden border border-border/50">
            <div
              className="h-full bg-atlas-orange rounded-full shadow-[0_0_8px_#FF5618]"
              style={{ width: `${coursePct}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className={cn(
        "rounded-3xl border-2 border-atlas-orange/20 bg-surface/90 dark:bg-[#111218]/90 p-5 sm:p-6 shadow-md transition-all select-none backdrop-blur-xl hover:border-atlas-orange/40",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Bloco 1: Nível e Avatar Tático */}
        <div className="lg:col-span-4 flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-atlas-orange/15 border-2 border-atlas-orange/40 flex items-center justify-center text-atlas-orange font-display font-black text-xl shadow-glow">
              {current.level}
            </div>
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-white dark:text-black font-mono text-[9px] font-black border border-border shadow-xs">
              NVL
            </span>
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-atlas-orange">
                Status Operacional
              </span>
              {streak > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Flame size={11} className="fill-amber-500" /> {streak}d
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black font-display text-foreground dark:text-white truncate mt-0.5">
              {current.title}
            </h3>

            <p className="text-xs text-muted dark:text-zinc-400 font-mono mt-0.5">
              <strong className="text-foreground dark:text-white">{xp} XP</strong> acumulados
              {next && (
                <span className="text-[11px] text-muted-foreground dark:text-zinc-400 font-medium"> • Falta {xpRemaining} XP p/ Nv.{next.level}</span>
              )}
            </p>
          </div>
        </div>

        {/* Bloco 2: Barra de Progresso Global do Curso (15 Módulos) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold font-display text-foreground dark:text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-atlas-orange" />
              Progresso Geral da Formação
            </span>
            <span className="font-mono font-black text-atlas-orange">
              {completedCount}/{totalCount} validados ({coursePct}%)
            </span>
          </div>

          {/* Barra de Progresso com Glow */}
          <div className="h-2.5 w-full bg-surface-2 dark:bg-black/50 rounded-full overflow-hidden border border-border/80 dark:border-white/10 p-0.5 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-atlas-orange via-atlas-orange to-amber-400 rounded-full shadow-[0_0_12px_#FF5618]"
              initial={{ width: 0 }}
              animate={{ width: `${coursePct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-muted dark:text-zinc-400">
            <span>Módulo 01: Boas-vindas</span>
            <span>Certificação Oficial Homologada</span>
          </div>
        </div>

        {/* Bloco 3: Conquistas & Atalho para o Cockpit */}
        <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-border dark:border-white/10">
          <div className="text-left lg:text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted dark:text-zinc-400 block">
              Conquistas
            </span>
            <span className="text-sm font-black text-foreground dark:text-white font-display">
              {badges.length} de {BADGES.length} Badges
            </span>
          </div>

          <Link
            href="/dashboard"
            onClick={() => playUiSound("click")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-2 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-foreground dark:text-white text-xs font-bold border border-border dark:border-white/10 transition-all hover:scale-105 active:scale-95 shadow-xs shrink-0"
          >
            <Trophy size={14} className="text-atlas-orange" />
            <span>Cockpit</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
