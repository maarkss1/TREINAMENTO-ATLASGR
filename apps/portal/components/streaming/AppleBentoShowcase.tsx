"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  ShieldAlert,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Database,
  Radio,
  Clock,
  Trophy,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/store";
import { levelProgress } from "@/lib/gamification";

export function AppleBentoShowcase() {
  const { registration, progress, xp } = useOnboardingStore();
  const { current } = levelProgress(xp);

  const completedCount = Object.values(progress).filter((p) => p.passed).length;

  return (
    <section className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 py-16 text-foreground dark:text-white select-none">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/25 mb-3">
          <Zap size={13} /> Arquitetura & Ecossistema
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight text-foreground dark:text-white">
          Inteligência Logística de Nível Enterprise.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted dark:text-zinc-400 font-medium leading-relaxed">
          A plataforma ATLASGR combina sensores em tempo real, automação de ponta e modelos neurais de decisão. O conhecimento adquirido em cada módulo reflete diretamente a operação diária.
        </p>
      </div>

      {/* Apple Keynote / Samsung Galaxy Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* Bento Item 1: Neural Engine (Wide 2 columns) */}
        <div className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl bg-surface border border-border shadow-sm dark:bg-gradient-to-br dark:from-[#161720] dark:via-[#101117] dark:to-[#0a0a0e] p-8 dark:border-white/10 hover:border-atlas-orange/40 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-atlas-orange/10 dark:bg-atlas-orange/15 rounded-full blur-[90px] pointer-events-none group-hover:bg-atlas-orange/20 transition-all" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-atlas-orange/15 dark:bg-atlas-orange/20 border border-atlas-orange/30 flex items-center justify-center text-atlas-orange mb-6 shadow-glow">
                <Cpu size={24} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-atlas-orange font-mono">
                TECNOLOGIA EXCLUSIVA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-foreground dark:text-white mt-1 mb-3">
                Atlas Neural Core & PGR Dinâmico
              </h3>
              <p className="text-sm text-muted dark:text-zinc-300 leading-relaxed max-w-lg">
                Modelos preditivos que processam telemetria de frotas em milissegundos. Antecipe paradas não autorizadas, áreas de risco e anomalias de rota antes que se transformem em sinistros.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border dark:border-white/10 flex flex-wrap items-center gap-6 text-xs text-muted dark:text-zinc-400 font-mono">
              <div>
                <p className="text-foreground dark:text-white font-black text-lg">99.98%</p>
                <p>Taxa de Assertividade</p>
              </div>
              <div className="w-px h-8 bg-border dark:bg-white/10" />
              <div>
                <p className="text-atlas-orange font-black text-lg">&lt; 300ms</p>
                <p>Tempo de Resposta</p>
              </div>
              <div className="w-px h-8 bg-border dark:bg-white/10" />
              <div>
                <p className="text-foreground dark:text-white font-black text-lg">24/7/365</p>
                <p>Monitoramento Ativo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Item 2: Atlas Connect */}
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border shadow-sm dark:bg-gradient-to-br dark:from-[#12141d] dark:to-[#0c0d12] p-7 dark:border-white/10 hover:border-blue-500/40 transition-all duration-300 group">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[70px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-5">
                <Database size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 dark:text-blue-400 font-mono">
                HUB INTEGRADO
              </span>
              <h3 className="text-xl font-bold font-display text-foreground dark:text-white mt-1 mb-2">
                Sistema Atlas Connect
              </h3>
              <p className="text-xs text-muted dark:text-zinc-400 leading-relaxed">
                Integração nativa com ERPs, TMS e todas as principais tecnologias de rastreamento do mercado brasileiro.
              </p>
            </div>

            <Link
              href="/produtos/connect"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Explorar Connect <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bento Item 3: Atlas Profile & Compliance */}
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border shadow-sm dark:bg-gradient-to-br dark:from-[#18131d] dark:to-[#0d0a13] p-7 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 group">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-[70px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                <Radio size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 font-mono">
                CADASTRO & COMPLIANCE
              </span>
              <h3 className="text-xl font-bold font-display text-foreground dark:text-white mt-1 mb-2">
                Atlas Profile
              </h3>
              <p className="text-xs text-muted dark:text-zinc-400 leading-relaxed">
                Background check em tempo real, validação biométrica e conformidade rigorosa com a LGPD e normas securitárias.
              </p>
            </div>

            <Link
              href="/produtos/profile"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
            >
              Conhecer Profile <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bento Item 4: Colaborador Cockpit Stats */}
        <div className="md:col-span-3 lg:col-span-4 rounded-2xl bg-surface border border-border shadow-sm dark:bg-gradient-to-r dark:from-[#171822] dark:via-[#121319] dark:to-[#171822] p-6 sm:p-8 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-atlas-orange/15 border border-atlas-orange/30 flex items-center justify-center text-atlas-orange shrink-0">
              <Trophy size={28} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-atlas-orange font-mono">
                SEU DESEMPENHO NO ACADEMY
              </span>
              <h4 className="text-lg sm:text-xl font-black font-display text-foreground dark:text-white">
                {registration ? registration.nomeCompleto : "Colaborador Atlas"} • Nível {current.level} ({current.title})
              </h4>
              <p className="text-xs text-muted dark:text-zinc-400 mt-0.5">
                Você já validou <strong className="text-foreground dark:text-white">{completedCount} de 15</strong> módulos do currículo corporativo com {xp} XP acumulados.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-zinc-200 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white text-xs font-bold border border-border dark:border-white/15 backdrop-blur-md transition-all shadow-sm"
            >
              Abrir Cockpit Completo
            </Link>
            <Link
              href="/ranking"
              className="px-5 py-2.5 rounded-xl bg-atlas-orange hover:bg-atlas-orange/90 text-white text-xs font-bold transition-all shadow-glow"
            >
              Ver Ranking Global
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
