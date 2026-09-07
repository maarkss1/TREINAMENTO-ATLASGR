"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Award, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import type { QuizQuestionClient } from "@/lib/types";
import { readyModuleSlugs, moduleMetas } from "@/content/modules";
import { useOnboardingStore } from "@/lib/store";
import { useRequireRegistration } from "@/lib/useRequireRegistration";

const FINAL_EXAM_PASS_SCORE = 80;
const FINAL_EXAM_SECONDS = 45 * 60;

export default function ProvaFinalPage() {
  const { ready, registration } = useRequireRegistration();
  const progress = useOnboardingStore((state) => state.progress);
  const examResult = useOnboardingStore((state) => state.examResult);
  const setExamResult = useOnboardingStore((state) => state.setExamResult);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestionClient[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/quiz/final-exam')
      .then(res => res.json())
      .then(setQuestions)
      .catch(console.error);
  }, []);

  if (!ready || !registration) return null;

  const allDone = readyModuleSlugs.every((slug) => progress[slug]?.passed);
  const pendingModules = moduleMetas.filter(
    (courseModule) => readyModuleSlugs.includes(courseModule.slug) && !progress[courseModule.slug]?.passed,
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-atlas-orange selection:text-white pb-20">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link href="/trilha" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-atlas-orange">
          <ArrowLeft size={14} aria-hidden="true" /> Voltar para a Academia
        </Link>

        <header className="mb-8 flex flex-col gap-5 border-b border-border/50 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="orange" className="mb-2">Avaliação de domínio</Badge>
            <h1 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">Prova Final da Academia ATLASGR</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Uma prova equilibrada com <strong className="text-foreground">2 questões de cada um dos 15 módulos</strong>. São {questions?.length ?? 30} itens no total e aproveitamento mínimo de <strong className="text-foreground">{FINAL_EXAM_PASS_SCORE}%</strong>.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-surface-2 p-4">
            <Clock className="h-8 w-8 text-atlas-orange" aria-hidden="true" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">Tempo limite</span>
              <span className="block text-sm font-bold text-foreground">45 minutos</span>
            </div>
          </div>
        </header>

        {!allDone && (
          <Card variant="elevated" className="border-amber-500/40 bg-amber-500/10 p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
              <div>
                <h2 className="font-display text-base font-bold text-amber-700 dark:text-amber-300">Ainda faltam módulos para validar</h2>
                <p className="mt-1 text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                  A prova final só é liberada depois que todos os simuladores de módulo atingirem o mínimo de aprovação. Isso evita transformar a prova em atalho para pular a formação.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pendingModules.map((courseModule) => (
                    <Link key={courseModule.slug} href={`/trilha/${courseModule.slug}`}>
                      <Badge variant="muted" className="transition-colors hover:border-atlas-orange">{courseModule.title}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {allDone && !started && !examResult && (
          <Card variant="elevated" className="bg-surface p-8 text-center shadow-xl border-border/60">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-atlas-orange/20 bg-atlas-orange/10 text-atlas-orange">
              <ShieldCheck size={32} aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Pronto para integrar tudo o que aprendeu?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
              A seleção é balanceada por módulo e muda a cada nova prova. O objetivo é verificar julgamento aplicado, não decorar a posição de respostas.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="xl" variant="primary" onClick={() => setStarted(true)} leftIcon={<Sparkles size={20} />} disabled={!questions}>
                {questions ? `Iniciar prova (${questions.length} questões)` : "Carregando prova..."}
              </Button>
            </div>
          </Card>
        )}

        {examResult && !started && (
          <Card variant="elevated" className="bg-surface p-8 text-center shadow-2xl border-border/60">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-atlas-orange/30 bg-atlas-orange/10">
              <Award size={40} className={examResult.passed ? "text-atlas-orange" : "text-muted"} aria-hidden="true" />
            </div>
            <Badge variant={examResult.passed ? "success" : "orange"} className="mb-3 px-3 py-1 text-xs font-bold uppercase">
              {examResult.passed ? "Domínio final validado" : "Revisão recomendada"}
            </Badge>
            <h2 className="font-display text-4xl font-black text-foreground">{examResult.score}% de aproveitamento</h2>
            <p className="mt-2 text-sm font-medium text-muted">
              {examResult.correct} acertos em {examResult.totalQuestions} questões.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {examResult.passed ? (
                <Link href="/certificado">
                  <Button size="lg" variant="primary" leftIcon={<Award size={18} />}>Acessar certificado da Academia</Button>
                </Link>
              ) : (
                <>
                  <Link href="/ranking"><Button size="lg" variant="outline">Revisar mapa de domínio</Button></Link>
                  <Button size="lg" variant="primary" onClick={() => setStarted(true)}>Refazer prova</Button>
                </>
              )}
            </div>
          </Card>
        )}

        {started && questions && (
          <div className="mt-6">
            <QuizRunner
              questions={questions}
              title="Prova Final — Academia ATLASGR"
              timeLimitSeconds={FINAL_EXAM_SECONDS}
              passThreshold={FINAL_EXAM_PASS_SCORE}
              onSubmit={async (answers) => {
                const userId = ((registration as unknown as Record<string, unknown>)?.userId || (registration as unknown as Record<string, unknown>)?.id) as string | undefined;
                const res = await fetch(`http://localhost:3001/quiz/final-exam/submit`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId, answers })
                });
                const data = await res.json();
                setExamResult({ score: data.score, correct: data.correctCount, totalQuestions: data.total, passed: data.passed, date: new Date().toISOString() });
                setStarted(false);
                return data;
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
