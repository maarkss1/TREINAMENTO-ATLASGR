"use client";

import Link from "next/link";
import { BarChart3, ChevronRight, Medal, Target, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { moduleMetas } from "@/content/modules";
import { useOnboardingStore } from "@/lib/store";
import { useRequireRegistration } from "@/lib/useRequireRegistration";

export default function RankingPage() {
  const { ready, registration } = useRequireRegistration();
  const progress = useOnboardingStore((state) => state.progress);

  if (!ready || !registration) return null;

  const rankedModules = moduleMetas
    .filter((courseModule) => courseModule.status === "ready")
    .map((courseModule) => ({
      ...courseModule,
      score: progress[courseModule.slug]?.bestScore ?? 0,
      passed: Boolean(progress[courseModule.slug]?.passed),
      attempts: progress[courseModule.slug]?.attempts ?? 0,
    }))
    .sort((a, b) => {
      if (a.passed !== b.passed) return a.passed ? -1 : 1;
      if (b.score !== a.score) return b.score - a.score;
      return a.number - b.number;
    });

  const evaluated = rankedModules.filter((courseModule) => courseModule.attempts > 0);
  const average = evaluated.length
    ? Math.round(evaluated.reduce((sum, courseModule) => sum + courseModule.score, 0) / evaluated.length)
    : 0;
  const validated = rankedModules.filter((courseModule) => courseModule.passed).length;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-atlas-orange selection:text-white">
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-atlas-orange/25 bg-atlas-orange/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-atlas-orange">
            <Trophy size={14} aria-hidden="true" /> Quadro de domínio
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Seu ranking de competências</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-muted sm:text-base">
            Em vez de comparar você com colegas fictícios, esta tela ordena suas próprias competências pelo melhor resultado validado e mostra onde o próximo esforço de revisão pode gerar mais valor.
          </p>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <PremiumCard className="p-5">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted">Módulos validados</p>
            <p className="mt-2 font-display text-3xl font-black text-foreground">{validated}/{rankedModules.length}</p>
          </PremiumCard>
          <PremiumCard className="p-5">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted">Média avaliada</p>
            <p className="mt-2 font-display text-3xl font-black text-atlas-orange">{average || "–"}{average ? "%" : ""}</p>
          </PremiumCard>
          <PremiumCard className="p-5">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted">Módulos avaliados</p>
            <p className="mt-2 font-display text-3xl font-black text-foreground">{evaluated.length}</p>
          </PremiumCard>
        </div>

        <PremiumCard className="overflow-hidden p-0">
          <div className="border-b border-border bg-surface-2 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-black text-foreground">
              <BarChart3 size={18} className="text-atlas-orange" aria-hidden="true" />
              Competências ordenadas por domínio
            </div>
          </div>

          <div className="divide-y divide-border">
            {rankedModules.map((courseModule, index) => (
              <Link
                key={courseModule.slug}
                href={`/trilha/${courseModule.slug}`}
                className="group grid gap-4 px-5 py-5 transition-colors hover:bg-surface-2 sm:grid-cols-[3rem_1fr_8rem_2rem] sm:items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background font-display text-sm font-black text-muted border border-border">
                  {index < 3 && courseModule.passed ? <Medal size={18} className="text-atlas-orange" aria-hidden="true" /> : `#${index + 1}`}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-base font-black text-foreground group-hover:text-atlas-orange">{courseModule.title}</p>
                    {courseModule.passed && <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">validado</span>}
                  </div>
                  <p className="mt-1 text-xs font-semibold text-muted">{courseModule.category} · {courseModule.attempts} tentativa{courseModule.attempts === 1 ? "" : "s"}</p>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-xs font-bold text-muted">
                    <span>Domínio</span>
                    <span>{courseModule.attempts ? `${courseModule.score}%` : "não avaliado"}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full bg-atlas-orange" style={{ width: `${courseModule.score}%` }} />
                  </div>
                </div>

                <ChevronRight size={18} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-atlas-orange block justify-self-end sm:justify-self-center" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </PremiumCard>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
          <Target size={19} className="mt-0.5 shrink-0 text-atlas-orange" aria-hidden="true" />
          <p className="text-xs font-semibold leading-relaxed text-muted">
            O quadro usa somente seus resultados registrados. Comparação entre colaboradores deve existir apenas quando houver backend, identidade corporativa e dados reais com governança apropriada.
          </p>
        </div>
      </main>
    </div>
  );
}
