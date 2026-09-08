"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  Unlock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { playUiSound } from "@/lib/soundEngine";

interface ModuleCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
  moduleNumber: number;
  xpGained: number;
  nextModuleSlug?: string;
  nextModuleTitle?: string;
}

export function ModuleCelebrationModal({
  isOpen,
  onClose,
  moduleTitle,
  moduleNumber,
  xpGained,
  nextModuleSlug,
  nextModuleTitle,
}: ModuleCelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      playUiSound("levelUp");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop escuro com blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal de Celebração */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-3xl bg-surface border-2 border-atlas-orange/40 p-6 sm:p-8 text-center shadow-[0_25px_70px_rgba(255,86,24,0.35)] z-10 overflow-hidden select-none"
        >
          {/* Efeitos de Iluminação de Fundo */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-atlas-orange/25 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-[60px] pointer-events-none" />

          {/* Troféu com Animação */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-atlas-orange via-[#e04509] to-amber-500 flex items-center justify-center text-white shadow-[0_10px_25px_rgba(255,86,24,0.4)]"
          >
            <Trophy size={40} />
          </motion.div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/30 mb-3">
            <Sparkles size={13} /> Módulo {String(moduleNumber).padStart(2, "0")} Validado
          </span>

          <h3 className="text-2xl sm:text-3xl font-black font-display text-foreground leading-tight">
            Missão Concluída! 🎉
          </h3>

          <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
            Você dominou o conteúdo de <strong>{moduleTitle}</strong> e validou sua tomada de decisão tática no simulador.
          </p>

          {/* Card de Recompensa de XP */}
          <div className="my-5 p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-atlas-orange/15 flex items-center justify-center text-atlas-orange">
                <Zap size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider block">
                  Recompensa Conquistada
                </span>
                <span className="text-base font-black font-display text-foreground">
                  Pontos de Experiência
                </span>
              </div>
            </div>

            <span className="font-display font-black text-2xl text-atlas-orange">
              +{xpGained} XP
            </span>
          </div>

          {/* Notificação de Desbloqueio da Próxima Missão */}
          {nextModuleTitle && (
            <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Unlock size={18} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block font-mono">
                  🔓 Nova Missão Liberada na Trilha!
                </span>
                <p className="text-xs font-bold text-foreground line-clamp-1">
                  {nextModuleTitle}
                </p>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="space-y-2.5">
            {nextModuleSlug ? (
              <Link
                href={`/trilha/${nextModuleSlug}`}
                onClick={() => {
                  playUiSound("click");
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-atlas-orange via-[#ff6a33] to-[#e04509] text-white font-extrabold text-sm transition-all shadow-[0_10px_25px_rgba(255,86,24,0.4)] hover:scale-102 active:scale-98 border border-white/20"
              >
                <span>Avançar para o Próximo Treinamento</span>
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href="/certificado"
                onClick={() => {
                  playUiSound("click");
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-atlas-orange via-[#ff6a33] to-[#e04509] text-white font-extrabold text-sm transition-all shadow-[0_10px_25px_rgba(255,86,24,0.4)]"
              >
                <span>Emitir Certificado Oficial</span>
                <Award size={16} />
              </Link>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-muted hover:text-foreground transition-colors"
            >
              Permanecer neste módulo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
