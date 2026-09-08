"use client";

import Link from "next/link";
import { Award, BarChart3, BookOpen, ChevronRight, Clock, Compass, Target, Trophy, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ModuleCard } from "@/components/trail/ModuleCard";
import { useOnboardingStore } from "@/lib/store";
import { useRequireRegistration } from "@/lib/useRequireRegistration";
import { moduleMetas, readyModuleSlugs } from "@/content/modules";
import { levelProgress } from "@/lib/gamification";
import {
  getCurrentActiveModule,
  getHighestUnlockedModuleNumber,
  isModuleUnlocked,
} from "@/lib/progression";
import { playUiSound } from "@/lib/soundEngine";

export default function DashboardPage() {
  const { ready, registration } = useRequireRegistration();
  const progress = useOnboardingStore((state) => state.progress);
  const xp = useOnboardingStore((state) => state.xp);

  if (!ready || !registration) return null;

  const { current, next, pct } = levelProgress(xp);
  const completedReady = readyModuleSlugs.filter((slug) => progress[slug]?.passed).length;
  const highestUnlocked = getHighestUnlockedModuleNumber(progress, moduleMetas);
  const activeModule = getCurrentActiveModule(progress, moduleMetas);
  const allCompleted = completedReady === readyModuleSlugs.length;
  const nextModule = !allCompleted ? activeModule : null;
  const evaluated = readyModuleSlugs.filter((slug) => typeof progress[slug]?.bestScore === "number");
  const averageScore = evaluated.length
    ? Math.round(evaluated.reduce((sum, slug) => sum + (progress[slug]?.bestScore ?? 0), 0) / evaluated.length)
    : 0;

  const studiedMinutes = readyModuleSlugs
    .filter((slug) => progress[slug]?.passed)
    .reduce((sum, slug) => sum + (moduleMetas.find((courseModule) => courseModule.slug === slug)?.durationMinutes ?? 0), 0);
  const studiedHours = (studiedMinutes / 60).toFixed(1);

  const categoryMastery = Array.from(new Set(moduleMetas.map((courseModule) => courseModule.category || "Outros"))).map((category) => {
    const modules = moduleMetas.filter((courseModule) => (courseModule.category || "Outros") === category && courseModule.status === "ready");
    const scores = modules
      .map((courseModule) => progress[courseModule.slug]?.bestScore)
      .filter((score): score is number => typeof score === "number");
    const score = scores.length ? Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) : 0;
    const passed = modules.filter((courseModule) => progress[courseModule.slug]?.passed).length;
    return { category, score, passed, total: modules.length };
  });

  const strongest = [...categoryMastery].filter((item) => item.score > 0).sort((a, b) => b.score - a.score)[0];
  const needsReview = [...categoryMastery].filter((item) => item.score > 0).sort((a, b) => a.score - b.score)[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-atlas-orange selection:text-white">
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-atlas-orange/25 bg-atlas-orange/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-atlas-orange">
              <Compass size={14} aria-hidden="true" /> Painel de aprendizagem
            </div>
            <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Olá, {registration.nomeCompleto.split(" ")[0]}.</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-muted sm:text-base">
              Este painel usa somente seu progresso real no navegador. Nada de heatmap aleatório ou ranking com colaboradores fictícios.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">Nível de aprendizagem</p>
            <div className="mt-1 flex items-center gap-3"><Trophy size={20} className="text-atlas-orange" aria-hidden="true" /><span className="font-display text-lg font-black">{current.title}</span><span className="text-xs font-bold text-muted">{xp} XP</span></div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores pessoais de aprendizagem">
          <PremiumCard className="p-5"><Target className="h-6 w-6 text-atlas-orange" aria-hidden="true" /><p className="mt-4 font-display text-3xl font-black">{completedReady}/{readyModuleSlugs.length}</p><p className="mt-1 text-xs font-black uppercase tracking-wider text-muted">módulos validados</p></PremiumCard>
          <PremiumCard className="p-5"><Award className="h-6 w-6 text-atlas-orange" aria-hidden="true" /><p className="mt-4 font-display text-3xl font-black">{averageScore || "–"}{averageScore ? "%" : ""}</p><p className="mt-1 text-xs font-black uppercase tracking-wider text-muted">média avaliada</p></PremiumCard>
          <PremiumCard className="p-5"><Clock className="h-6 w-6 text-atlas-orange" aria-hidden="true" /><p className="mt-4 font-display text-3xl font-black">{studiedHours}h</p><p className="mt-1 text-xs font-black uppercase tracking-wider text-muted">carga validada</p></PremiumCard>
          <PremiumCard className="p-5"><BarChart3 className="h-6 w-6 text-atlas-orange" aria-hidden="true" /><p className="mt-4 font-display text-3xl font-black">{evaluated.length}</p><p className="mt-1 text-xs font-black uppercase tracking-wider text-muted">módulos avaliados</p></PremiumCard>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <PremiumCard className="p-6 sm:p-8" withGlow>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-atlas-orange">Próxima melhor ação</p>
                {nextModule ? (
                  <>
                    <h2 className="mt-2 font-display text-3xl font-black">{nextModule.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-muted">{nextModule.shortDescription}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-muted"><span className="rounded-full border border-border bg-background px-3 py-1.5">{nextModule.category}</span><span className="rounded-full border border-border bg-background px-3 py-1.5">{nextModule.durationMinutes} min</span><span className="rounded-full border border-border bg-background px-3 py-1.5">microaula + prática + quiz</span></div>
                    <Link href={`/trilha/${nextModule.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-atlas-orange px-5 py-3 text-sm font-black text-white">Continuar formação <ChevronRight size={16} aria-hidden="true" /></Link>
                  </>
                ) : (
                  <>
                    <h2 className="mt-2 font-display text-3xl font-black">Currículo concluído</h2>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-muted">Todos os 15 módulos foram validados. A próxima etapa é integrar os conhecimentos na prova final.</p>
                    <Link href="/prova-final" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-atlas-orange px-5 py-3 text-sm font-black text-white">Ir para a prova final <ChevronRight size={16} aria-hidden="true" /></Link>
                  </>
                )}
              </div>
              <BookOpen className="hidden h-10 w-10 shrink-0 text-atlas-orange sm:block" aria-hidden="true" />
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="mb-2 flex justify-between text-xs font-bold text-muted"><span>Progressão de XP</span><span>{Math.round(pct)}%</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-atlas-orange" style={{ width: `${pct}%` }} /></div>
              <p className="mt-2 text-xs font-semibold text-muted">{next ? `${next.minXp - xp} XP até ${next.title}` : "Maior nível de XP alcançado"}</p>
            </div>
          </PremiumCard>

          <PremiumCard className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-widest text-atlas-orange">Leitura rápida</p>
            <h2 className="mt-2 font-display text-2xl font-black">Onde consolidar conhecimento</h2>
            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface-2/30 px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-atlas-orange/10 text-atlas-orange">
                <Compass size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-black text-foreground">Sua jornada começa aqui</h3>
              <p className="mt-2 max-w-sm text-sm font-medium text-muted">Navegue até a trilha e complete seu primeiro módulo para gerar novos indicadores e validar suas competências!</p>
            </div>

            {(strongest || needsReview) && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {strongest && <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Mais consistente</p><p className="mt-1 text-sm font-black">{strongest.category}</p><p className="mt-1 text-xs font-semibold text-muted">{strongest.score}%</p></div>}
                {needsReview && <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Revisar primeiro</p><p className="mt-1 text-sm font-black text-foreground">{needsReview.category}</p><p className="mt-1 text-xs font-semibold text-muted">{needsReview.score}%</p></div>}
              </div>
            )}

            <Link href="/ranking" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-atlas-orange hover:underline">Ver quadro completo de domínio <ChevronRight size={15} aria-hidden="true" /></Link>
          </PremiumCard>
        </div>

        {/* Seção de Módulos da Sua Formação (Cards Redondos AtlasGR) */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/25 mb-2">
                <Sparkles size={11} /> Progressão Sequencial
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground">
                Sua Trilha Ativa
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Conclua os simuladores para desbloquear gradualmente os próximos módulos
              </p>
            </div>
            <Link
              href="/trilha"
              onClick={() => playUiSound("click")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-atlas-orange hover:underline"
            >
              Abrir Trilha Completa <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {moduleMetas
              .filter((m) => isModuleUnlocked(m, progress, moduleMetas) || m.number === highestUnlocked + 1)
              .map((module) => {
                const isLocked = !isModuleUnlocked(module, progress, moduleMetas);
                const isCurrent = module.slug === activeModule.slug;
                return (
                  <ModuleCard
                    key={module.slug}
                    meta={module}
                    index={moduleMetas.findIndex((meta) => meta.slug === module.slug)}
                    isCompleted={Boolean(progress[module.slug]?.passed)}
                    isLocked={isLocked}
                    isCurrent={isCurrent}
                  />
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
}
