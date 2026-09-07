"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, Star } from "lucide-react";
import { getLevel, type LevelInfo } from "@/lib/gamification";
import { useOnboardingStore } from "@/lib/store";

/**
 * Componente global que observa mudanças de XP e dispara:
 *  1. Toast flutuante de "+XP" a cada ganho de XP
 *  2. Animação de tela cheia (Level Up) quando o nível muda
 */
export function XPNotifier() {
  const xp = useOnboardingStore((s) => s.xp);
  const prevXpRef = useRef(xp);
  const prevLevelRef = useRef<LevelInfo>(getLevel(xp));

  const [xpDelta, setXpDelta] = useState<number | null>(null);
  const [levelUp, setLevelUp] = useState<LevelInfo | null>(null);

  useEffect(() => {
    const prev = prevXpRef.current;
    const delta = xp - prev;
    if (delta <= 0) {
      prevXpRef.current = xp;
      return;
    }

    // Show XP toast
    setXpDelta(delta);
    const toastTimer = setTimeout(() => setXpDelta(null), 2400);

    // Check level up
    const newLevel = getLevel(xp);
    if (newLevel.level > prevLevelRef.current.level) {
      setLevelUp(newLevel);
      const levelTimer = setTimeout(() => setLevelUp(null), 4500);
      prevLevelRef.current = newLevel;
      prevXpRef.current = xp;
      return () => {
        clearTimeout(toastTimer);
        clearTimeout(levelTimer);
      };
    }

    prevXpRef.current = xp;
    return () => clearTimeout(toastTimer);
  }, [xp]);

  return (
    <>
      {/* XP Gain Toast */}
      <AnimatePresence>
        {xpDelta !== null && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 pointer-events-none"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-atlas-orange/30 bg-atlas-graphite/95 px-6 py-3 shadow-2xl backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-atlas-orange/20">
                <Star className="h-5 w-5 text-atlas-orange" fill="currentColor" />
              </div>
              <div>
                <p className="text-lg font-black text-atlas-orange tabular-nums">+{xpDelta} XP</p>
                <p className="text-[11px] font-semibold text-zinc-400">Progresso registrado</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Full Screen Celebration */}
      <AnimatePresence>
        {levelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setLevelUp(null)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative flex flex-col items-center gap-6 rounded-[2rem] border-2 border-atlas-orange/40 bg-gradient-to-b from-atlas-graphite to-zinc-900 px-12 py-14 text-center shadow-[0_0_120px_rgba(255,86,24,0.3)]"
              style={{ perspective: "1000px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effects */}
              <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-atlas-orange/20 blur-[80px]" />

              {/* Confetti-style particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="pointer-events-none absolute h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: ["#FF5618", "#FFD700", "#C0C0C0", "#b9f2ff"][i % 4],
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, (i - 6) * 25],
                    y: [0, (i % 2 === 0 ? -1 : 1) * 100],
                    opacity: [1, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{ duration: 1.5, delay: i * 0.08, ease: "easeOut" }}
                />
              ))}

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Trophy className="h-20 w-20 text-atlas-orange drop-shadow-[0_0_30px_rgba(255,86,24,0.6)]" />
              </motion.div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-atlas-orange"
                >
                  <Sparkles size={16} /> Subiu de Nível <Sparkles size={16} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, type: "spring" }}
                  className="mt-3 font-display text-5xl font-black tracking-tight text-white"
                >
                  Nível {levelUp.level}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-xl font-bold text-zinc-300"
                >
                  {levelUp.title}
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setLevelUp(null)}
                className="mt-4 rounded-xl bg-atlas-orange px-8 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
              >
                Continuar Missão
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
