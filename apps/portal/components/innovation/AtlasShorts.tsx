"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Clock3, Play, Target, Lock, Sparkles, Zap } from "lucide-react";
import { moduleMetas } from "@/content/modules";
import { useOnboardingStore } from "@/lib/store";
import { isModuleUnlocked } from "@/lib/progression";
import { playUiSound } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

const SHORT_MODULES = [
  "01-bem-vindo-atlasgr",
  "03-gerenciamento-risco",
  "05-software-logistico",
  "09-processo-comercial",
  "11-operacao",
  "13-tecnologia",
];

export function AtlasShorts() {
  const progress = useOnboardingStore((s) => s.progress);
  const [shakingSlug, setShakingSlug] = useState<string | null>(null);

  const shorts = SHORT_MODULES
    .map((slug) => moduleMetas.find((courseModule) => courseModule.slug === slug))
    .filter((courseModule): courseModule is NonNullable<typeof courseModule> => Boolean(courseModule));

  const handleLockedClick = (slug: string) => {
    playUiSound("lock");
    setShakingSlug(slug);
    setTimeout(() => setShakingSlug(null), 500);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 select-none" aria-labelledby="shorts-title">
      <div className="mb-8 max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-atlas-orange/25 bg-atlas-orange/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-atlas-orange">
          <Play size={14} fill="currentColor" aria-hidden="true" /> Microlearning Gamificado
        </div>
        <h1 id="shorts-title" className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Pílulas de Aprendizagem & Prática Rápida
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-muted sm:text-base">
          Revisões de 2 minutos para fixar competências críticas da Central ATLASGR. Conclua os módulos sequenciais para liberar novas pílulas operacionais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shorts.map((courseModule) => {
          const isUnlocked = isModuleUnlocked(courseModule, progress, moduleMetas);
          const isPassed = Boolean(progress[courseModule.slug]?.passed);
          const isShaking = shakingSlug === courseModule.slug;

          if (!isUnlocked) {
            return (
              <motion.div
                key={courseModule.slug}
                animate={isShaking ? { x: [-6, 6, -5, 5, -2, 2, 0] } : {}}
                transition={{ duration: 0.4 }}
                onClick={() => handleLockedClick(courseModule.slug)}
                className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 opacity-75 grayscale-[35%] cursor-not-allowed shadow-md hover:border-amber-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-500/30">
                    <Lock size={11} /> Bloqueado
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    Módulo {String(courseModule.number).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="font-display text-xl font-black text-white/80 leading-tight mb-2">
                  {courseModule.title}
                </h2>
                <p className="text-xs text-amber-200/80 leading-relaxed font-medium">
                  🔒 Conclua o Módulo {String(courseModule.number - 1).padStart(2, "0")} na Trilha para liberar esta revisão rápida.
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Clock3 size={13} /> 2 min
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-300/80">
                    <Lock size={12} /> Bloqueado
                  </span>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={courseModule.slug}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/trilha/${courseModule.slug}`}
                onClick={() => playUiSound("click")}
                className={cn(
                  "group relative flex flex-col h-full overflow-hidden rounded-3xl p-6 transition-all duration-300 shadow-md",
                  "bg-gradient-to-br from-[#FF5618] via-[#e04509] to-[#992800] text-white border-2 border-white/25",
                  "hover:border-white/80 hover:shadow-[0_20px_45px_rgba(255,86,24,0.45),0_0_30px_rgba(255,86,24,0.3)]",
                  isPassed && "border-emerald-300/70 shadow-[0_10px_25px_rgba(16,185,129,0.3)]"
                )}
              >
                {/* Glow de Iluminação */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:bg-white/30 transition-all" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/30 text-amber-200 border border-white/20">
                    <Target size={12} /> {courseModule.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-white bg-white/20 px-2.5 py-0.5 rounded-full">
                    <Clock3 size={11} /> 2 MIN
                  </span>
                </div>

                <h2 className="font-display text-xl font-black leading-tight text-white group-hover:text-amber-200 transition-colors drop-shadow-sm relative z-10 mb-2">
                  {courseModule.title}
                </h2>

                <p className="line-clamp-3 text-xs text-white/90 font-medium leading-relaxed mb-6 relative z-10">
                  {courseModule.shortDescription}
                </p>

                <div className="mt-auto pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold relative z-10">
                  <span className="inline-flex items-center gap-1 text-amber-200 font-mono">
                    <Zap size={13} className="fill-current" /> +20 XP
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 group-hover:bg-white group-hover:text-zinc-950 transition-all text-xs font-black">
                    Abrir Microaula <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
