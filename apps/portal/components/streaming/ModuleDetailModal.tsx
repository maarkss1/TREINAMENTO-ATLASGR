"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Plus,
  Check,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
} from "lucide-react";
import type { ModuleMeta } from "@/lib/types";
import { getModuleContent } from "@/content/modules";
import { useOnboardingStore } from "@/lib/store";
import { playUiSound } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

interface ModuleDetailModalProps {
  meta: ModuleMeta | null;
  onClose: () => void;
}

export function ModuleDetailModal({ meta, onClose }: ModuleDetailModalProps) {
  const progress = useOnboardingStore((s) => (meta ? s.progress[meta.slug] : undefined));
  const myList = useOnboardingStore((s) => s.myList || []);
  const toggleMyList = useOnboardingStore((s) => s.toggleMyList);

  const isInMyList = meta ? myList.includes(meta.slug) : false;
  const isPassed = Boolean(progress?.passed);
  const content = meta ? getModuleContent(meta.slug) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (meta) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [meta, onClose]);

  if (!meta) return null;

  const handleToggleList = () => {
    playUiSound("click");
    toggleMyList(meta.slug);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop escuro com blur cinematográfico */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container (Estilo Netflix Drawer / Apple Showcase) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-surface border border-border rounded-none sm:rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-foreground dark:bg-[#111216] dark:border-white/10 dark:text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-surface-2/80 hover:bg-surface-2 text-foreground border border-border dark:bg-black/60 dark:hover:bg-black/90 dark:text-white/80 dark:hover:text-white dark:border-white/15 backdrop-blur-md transition-all shadow-sm"
            aria-label="Fechar detalhes"
          >
            <X size={20} />
          </button>

          {/* Hero Banner do Modal */}
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full bg-surface-2 dark:bg-black overflow-hidden flex items-end p-6 sm:p-8">
            {/* Ambient Lighting & Gradients */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-85 hidden dark:block"
              style={{
                backgroundImage: "radial-gradient(circle at 60% 30%, rgba(255, 86, 24, 0.35) 0%, rgba(18, 19, 26, 0.95) 75%, #111216 100%)",
              }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-85 block dark:hidden"
              style={{
                backgroundImage: "radial-gradient(circle at 60% 30%, rgba(255, 86, 24, 0.18) 0%, rgba(240, 243, 250, 0.95) 75%, #ffffff 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent dark:from-[#111216] dark:via-[#111216]/60 dark:to-transparent" />

            {/* Info no Banner */}
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-atlas-orange/15 dark:bg-atlas-orange/20 text-atlas-orange border border-atlas-orange/30">
                  Módulo {String(meta.number).padStart(2, "0")} • {meta.category}
                </span>
                {isPassed && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Validado
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground dark:text-white leading-tight font-display drop-shadow-sm dark:drop-shadow-md">
                {meta.title}
              </h2>

              <div className="flex items-center gap-3 mt-4">
                <Link
                  href={`/trilha/${meta.slug}`}
                  onClick={() => playUiSound("click")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-extrabold text-sm transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <Play size={16} className="fill-current" />
                  {isPassed ? "Rever Módulo" : "Assistir Agora"}
                </Link>

                <button
                  onClick={handleToggleList}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-xs font-semibold",
                    isInMyList
                      ? "bg-atlas-orange/20 border-atlas-orange text-atlas-orange"
                      : "bg-surface-2 hover:bg-zinc-200 border-border text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                  )}
                >
                  {isInMyList ? <Check size={16} /> : <Plus size={16} />}
                  {isInMyList ? "Na Minha Lista" : "Minha Lista"}
                </button>
              </div>
            </div>
          </div>

          {/* Modal Body: Apple Spec Sheet & Content Breakdown */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
            {/* Overview & Apple-style Spec Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-atlas-orange">
                  Sinopse & Contexto Estratégico
                </h3>
                <p className="text-sm sm:text-base text-muted dark:text-zinc-300 font-medium leading-relaxed">
                  {meta.shortDescription}
                </p>

                {content?.scenario && (
                  <div className="p-4 rounded-xl bg-surface-2/70 border border-border dark:bg-white/5 dark:border-white/10 mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted dark:text-zinc-400 mb-1">
                      Cenário de Estudo
                    </p>
                    <p className="text-xs sm:text-sm text-foreground/90 dark:text-zinc-200 italic leading-relaxed">
                      &ldquo;{content.scenario}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Bento Spec Column (Apple / Samsung Style) */}
              <div className="p-5 rounded-xl bg-surface-2 border border-border dark:bg-[#16181f] dark:border-white/10 space-y-3 shadow-xs">
                <p className="text-[11px] font-black uppercase tracking-widest text-muted dark:text-zinc-400 mb-3">
                  Especificações Técnicas
                </p>

                <div className="flex items-center justify-between py-1.5 border-b border-border/80 dark:border-white/5 text-xs">
                  <span className="text-muted dark:text-zinc-400 flex items-center gap-1.5">
                    <Clock size={13} /> Carga Horária
                  </span>
                  <span className="font-mono font-bold text-foreground dark:text-white">{meta.durationMinutes} min</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-border/80 dark:border-white/5 text-xs">
                  <span className="text-muted dark:text-zinc-400 flex items-center gap-1.5">
                    <Award size={13} /> Recompensa
                  </span>
                  <span className="font-mono font-bold text-atlas-orange">+150 XP</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-border/80 dark:border-white/5 text-xs">
                  <span className="text-muted dark:text-zinc-400 flex items-center gap-1.5">
                    <Cpu size={13} /> Formato
                  </span>
                  <span className="font-bold text-foreground dark:text-white">4K + Prática</span>
                </div>

                <div className="flex items-center justify-between py-1.5 text-xs">
                  <span className="text-muted dark:text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck size={13} /> Avaliação
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Simulador 70%+</span>
                </div>
              </div>
            </div>

            {/* Programmatic Chapters / Sections (Episódios estilo Netflix) */}
            {content?.sections && content.sections.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-black text-foreground dark:text-white font-display flex items-center gap-2">
                    <Layers size={18} className="text-atlas-orange" />
                    Capítulos & Lições Interativas
                  </h3>
                  <span className="text-xs text-muted dark:text-zinc-400 font-mono">
                    {content.sections.length} LIÇÕES DISPONÍVEIS
                  </span>
                </div>

                <div className="space-y-3">
                  {content.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface hover:bg-surface-2 border border-border hover:border-atlas-orange/40 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] dark:border-white/5 dark:hover:border-white/15 transition-all flex items-start justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-surface-2 border border-border dark:border-transparent dark:bg-white/10 font-mono text-xs font-bold text-foreground dark:text-zinc-300">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-foreground dark:text-white leading-snug">
                            {sec.title}
                          </h4>
                          <p className="text-xs text-muted dark:text-zinc-400 mt-1 line-clamp-1">
                            Exploração aprofundada com validação prática de tomada de decisão.
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-xs font-mono text-muted dark:text-zinc-500 font-medium">
                        {Math.max(5, Math.round(meta.durationMinutes / content.sections.length))} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Objetivos de Aprendizado (Apple Chips) */}
            {content?.objectives && content.objectives.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted dark:text-zinc-400 mb-3">
                  Competências Desenvolvidas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {content.objectives.map((obj, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-2 border border-border dark:bg-black/40 dark:border-white/5 text-xs text-foreground/90 dark:text-zinc-300"
                    >
                      <CheckCircle2 size={15} className="text-atlas-orange shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
