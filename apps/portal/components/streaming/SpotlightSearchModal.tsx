"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Layers, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { moduleMetas } from "@/content/modules";
import { playUiSound } from "@/lib/soundEngine";
import type { ModuleMeta } from "@/lib/types";

interface SpotlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (module: ModuleMeta) => void;
}

export function SpotlightSearchModal({
  isOpen,
  onClose,
  onSelectModule,
}: SpotlightSearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const filteredModules = normalizedQuery
    ? moduleMetas.filter(
        (m) =>
          m.title.toLowerCase().includes(normalizedQuery) ||
          m.shortDescription.toLowerCase().includes(normalizedQuery) ||
          Boolean(m.category?.toLowerCase().includes(normalizedQuery))
      )
    : moduleMetas.slice(0, 5); // show top 5 recommendations initially

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden z-10 text-foreground dark:bg-[#121319] dark:border-white/15 dark:text-white"
        >
          {/* Input Row */}
          <div className="flex items-center px-4 py-3.5 border-b border-border dark:border-white/10">
            <Search size={20} className="text-muted dark:text-zinc-400 shrink-0 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por módulos, PGR, telemetria, Connect..."
              className="w-full bg-transparent text-foreground placeholder:text-muted dark:text-white dark:placeholder:text-zinc-500 text-base focus:outline-none font-medium"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded text-muted hover:text-foreground dark:text-zinc-400 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            ) : (
              <span className="text-[10px] font-mono text-muted dark:text-zinc-500 uppercase tracking-widest px-2 py-0.5 rounded border border-border dark:border-white/10">
                ESC
              </span>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted dark:text-zinc-400 font-mono">
              {normalizedQuery ? `Resultados (${filteredModules.length})` : "Módulos Recomendados"}
            </div>

            {filteredModules.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted dark:text-zinc-400">
                Nenhum módulo encontrado para &ldquo;{query}&rdquo;.
              </div>
            ) : (
              filteredModules.map((module) => (
                <div
                  key={module.slug}
                  onClick={() => {
                    playUiSound("click");
                    onSelectModule(module);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-2 dark:hover:bg-white/10 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-atlas-orange/15 border border-atlas-orange/30 flex items-center justify-center text-atlas-orange shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-atlas-orange dark:text-white transition-colors">
                        {module.title}
                      </h4>
                      <p className="text-xs text-muted dark:text-zinc-400 line-clamp-1">
                        {module.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted dark:text-zinc-500">
                    <span className="hidden sm:inline font-mono">{module.durationMinutes} min</span>
                    <ArrowRight size={16} className="text-muted group-hover:text-foreground dark:text-zinc-400 dark:group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-surface-2 dark:bg-black/40 border-t border-border dark:border-white/5 flex items-center justify-between text-[11px] text-muted dark:text-zinc-500 font-mono">
            <span>Pressione ENTER para selecionar</span>
            <span>Academia ATLASGR 4K</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
