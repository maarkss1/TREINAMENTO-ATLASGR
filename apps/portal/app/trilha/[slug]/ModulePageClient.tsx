"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  ClipboardList,
  Compass,
  Map as MapIcon,
  Maximize,
  Minimize,
  Sparkles,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Badge } from "@/components/ui/Badge";
import { ContentBlockView } from "@/components/module/ContentBlockView";
import { PracticeLab } from "@/components/module/PracticeLab";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { moduleMetas, getModuleMeta, getModuleContent } from "@/content/modules";
import { getPracticeLab } from "@/content/learning-blueprint";
import {  } from "@/content/quizzes-v2";
import { useOnboardingStore } from "@/lib/store";
import { useRequireRegistration } from "@/lib/useRequireRegistration";
import { ImmersiveStory } from "@/components/module/ImmersiveStory";
import { ImmersiveLessonStage } from "@/components/module/ImmersiveLessonStage";
import { MermaidViewer } from "@/components/diagrams/MermaidViewer";
import { ModuleRating } from "@/components/module/ModuleRating";
import { CertificateActions } from "@/components/module/CertificateActions";
import type { ContentBlock, ModuleContentFull, ModuleSection, ModuleMeta, QuizQuestionClient } from "@/lib/types";
import { AccessibilityToolbar } from "@/components/accessibility/AccessibilityToolbar";
import { ModuleTitle } from "@/components/brand/ModuleTitle";

type Screen =
  | { kind: "cover" }
  | { kind: "scenario" }
  | { kind: "objectives" }
  | { kind: "section"; section: ModuleSection; chapterIndex: number }
  | { kind: "practice" }
  | { kind: "diagram" }
  | { kind: "review" }
  | { kind: "quiz" };

function buildScreens(content: ModuleContentFull): Screen[] {
  return [
    { kind: "cover" },
    { kind: "scenario" },
    { kind: "objectives" },
    ...content.sections.map((section, chapterIndex) => ({ kind: "section" as const, section, chapterIndex })),
    { kind: "practice" },
    { kind: "diagram" },
    { kind: "review" },
    { kind: "quiz" },
  ];
}

function blockToSpeech(block: ContentBlock): string {
  switch (block.type) {
    case "text":
      return `${block.heading || ""}. ${block.paragraphs.flat().map((run) => typeof run === "string" ? run : run.term).join(" ")}`;
    case "callout":
      return `${block.title}. ${block.text.map((run) => typeof run === "string" ? run : run.term).join(" ")}`;
    case "checklist":
      return `${block.title}. ${block.items.join(". ")}`;
    case "comparison":
      return `${block.title}. ${block.left.label}: ${block.left.points.join(". ")}. ${block.right.label}: ${block.right.points.join(". ")}`;
    case "timeline":
      return `${block.title}. ${block.items.map((item) => `${item.label}: ${item.text}`).join(". ")}`;
    case "case":
      return `${block.title}. ${block.text}`;
    case "faq":
      return block.items.map((item) => `${item.q}. ${item.a}`).join(". ");
    case "stat":
      return block.items.map((item) => `${item.value}: ${item.label}`).join(". ");
    case "quote":
      return `${block.text}. ${block.author || ""}`;
    case "image":
      return block.caption || block.alt || "Imagem educacional";
    case "video":
      return `${block.title}. ${block.caption}. ${(block.transcript || []).join(" ")}`;
    case "audio":
      return `${block.title}. ${block.text}`;
    default:
      return "";
  }
}

function getScreenText(screen: Screen | undefined, meta: ModuleMeta, content: ModuleContentFull | undefined): string {
  if (!screen || !content) return meta.title;
  switch (screen.kind) {
    case "cover":
      return `${meta.title}. ${meta.shortDescription}`;
    case "scenario":
      return `Cenário de estudo: ${content.scenario}`;
    case "objectives":
      return `Objetivos do módulo: ${content.objectives.join(". ")}`;
    case "section":
      return `${screen.section.title}. ${screen.section.blocks.map(blockToSpeech).join(". ")}`;
    case "practice": {
      const lab = getPracticeLab(meta.slug);
      return lab ? `Laboratório prático. ${lab.mission}. Cenário: ${lab.scenario}. Entrega: ${lab.deliverable}.` : "Laboratório prático de aplicação.";
    }
    case "diagram":
      return `Fluxo operacional: ${content.diagram?.title || ""}`;
    case "review":
      return `Resumo do módulo: ${content.summary.join(". ")}. Checklist: ${content.finalChecklist.join(". ")}`;
    case "quiz":
      return "Simulador de decisão. Responda às questões para validar o domínio deste módulo.";
  }
}

export function ModulePageClient() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { ready, registration } = useRequireRegistration();
  const progress = useOnboardingStore((state) => state.progress);
  const completeModuleQuiz = useOnboardingStore((state) => state.completeModuleQuiz);
  const [showQuiz, setShowQuiz] = useState(false);
  const [screenIndex, setScreenIndex] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const meta = getModuleMeta(params.slug);
  const content = getModuleContent(params.slug);
  const practiceLab = getPracticeLab(params.slug);
  const modProgress = progress[params.slug];
  const moduleIndex = moduleMetas.findIndex((module) => module.slug === params.slug);
  const previousReady = moduleMetas.slice(0, moduleIndex).reverse().find((module) => module.status === "ready");
  const nextReady = moduleMetas.slice(moduleIndex + 1).find((module) => module.status === "ready");

  const [quiz, setQuiz] = useState<QuizQuestionClient[] | null>(null);
  
  useEffect(() => {
    if (!params.slug) return;
    fetch(`http://localhost:3001/quiz/${params.slug}`)
      .then(r => r.json())
      .then(setQuiz)
      .catch(console.error);
  }, [params.slug]);

  const screens = useMemo(() => (content ? buildScreens(content) : []), [content]);
  const totalScreens = screens.length;
  const screen = screens[Math.min(screenIndex, Math.max(totalScreens - 1, 0))];
  const isFirstScreen = screenIndex === 0;
  const isQuizScreen = screen?.kind === "quiz";

  useEffect(() => {
    queueMicrotask(() => {
      setScreenIndex(0);
      setShowQuiz(false);
    });
  }, [params.slug]);

  function scrollTop() {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goNext() {
    setScreenIndex((index) => Math.min(index + 1, totalScreens - 1));
    scrollTop();
  }

  function goPrev() {
    setScreenIndex((index) => Math.max(index - 1, 0));
    scrollTop();
  }

  if (!ready || !registration || !meta) return null;

  if (meta.status === "building" || !content || !screen) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main id="main-content" className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/trilha" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-atlas-orange">
            <ArrowLeft size={16} /> Voltar para a trilha
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <Badge variant="muted" className="gap-2 border-border bg-surface-2 px-3 py-1 text-foreground"><Wrench size={14} /> Em construção</Badge>
            <span className="text-sm font-semibold uppercase tracking-widest text-atlas-orange">Módulo {String(meta.number).padStart(2, "0")}</span>
          </div>
          <h1 className="mt-6 text-balance font-display text-4xl font-black tracking-[-0.035em] md:text-5xl">{meta.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{meta.shortDescription}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="atlas-module-content flex min-h-screen flex-col bg-background text-foreground selection:bg-atlas-orange selection:text-white">
      {!isFocusMode && <SiteHeader />}

      {!isFocusMode && (
        <div className="sticky top-0 z-40 md:top-14 border-b border-border/50 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/trilha" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-atlas-orange">
              <ArrowLeft size={14} /> <span className="hidden sm:inline">Academia ATLASGR</span>
            </Link>
            <div className="flex flex-1 items-center gap-1" aria-label={`Progresso do módulo: tela ${screenIndex + 1} de ${totalScreens}`}>
              {screens.map((_, index) => (
                <motion.span
                  key={index}
                  className="h-1 flex-1 rounded-full"
                  animate={{ scaleY: index === screenIndex ? 1.8 : 1, backgroundColor: index <= screenIndex ? "var(--atlas-orange)" : "var(--border)" }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </div>
            <span className="shrink-0 text-xs font-bold tabular-nums text-muted">{screenIndex + 1}/{totalScreens}</span>
          </div>
        </div>
      )}

      <div className="border-b border-border/40 bg-surface-2/40 py-2 print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-4 px-4 sm:px-6">
          <button
            onClick={() => setIsFocusMode((value) => !value)}
            className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-atlas-orange"
            title={isFocusMode ? "Sair do Modo Foco" : "Entrar no Modo Foco"}
          >
            {isFocusMode ? <Minimize size={14} /> : <Maximize size={14} />}
            <span className="hidden sm:inline">{isFocusMode ? "Sair do foco" : "Modo foco"}</span>
          </button>
        </div>
      </div>
      
      {/* Player Fixo Flutuante de Acessibilidade */}
      <div className="fixed bottom-24 right-4 z-40 print:hidden lg:right-10">
        <AccessibilityToolbar currentText={getScreenText(screen, meta, content)} />
      </div>

      <main id="main-content" className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          key={`${params.slug}-${screenIndex}`}
          initial={{ opacity: 0, y: 22, scale: 0.992 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {screen.kind === "cover" && (
            <motion.section
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 flex min-h-[62vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-atlas-orange/20 bg-gradient-to-b from-surface via-surface to-atlas-orange/5 px-6 pb-12 pt-16 text-center shadow-[0_35px_100px_-50px_rgba(255,86,24,0.5)]"
              style={{ perspective: "1500px" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[url('/brand/grid-pattern.svg')] opacity-[0.045]" />
              <motion.div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-atlas-orange/10 blur-[100px]" animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="pointer-events-none absolute -bottom-44 -left-36 h-[420px] w-[420px] rounded-full bg-amber-500/[0.08] blur-[110px]" animate={{ scale: [1.05, 0.95, 1.05], x: [0, 24, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="relative z-10 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-atlas-orange/45 bg-atlas-orange/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-atlas-orange">Módulo {String(meta.number).padStart(2, "0")}</span>
                <span className="rounded-full border border-border bg-surface-2 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-muted">{meta.durationMinutes} min</span>
                {modProgress?.passed && <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-500"><CheckCircle2 size={14} /> Validado</span>}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28, rotateX: 8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mt-8 max-w-4xl text-balance font-display text-5xl font-black leading-[0.98] tracking-[-0.05em] text-atlas-orange md:text-7xl drop-shadow-[0_4px_24px_rgba(255,86,24,0.3)]"
                style={{ transformOrigin: "50% 100%" }}
              >
                <ModuleTitle title={content.title} />
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="relative z-10 mx-auto mt-6 max-w-3xl text-balance text-lg font-medium leading-relaxed text-muted md:text-xl">{meta.shortDescription}</motion.p>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="relative z-10 mt-10 flex items-center gap-2.5 rounded-2xl border border-atlas-orange/20 bg-surface/80 px-5 py-3 text-xs font-bold text-foreground backdrop-blur-md">
                <Compass size={18} className="text-atlas-orange" />
                Contexto → microaulas multimídia → prática → revisão → simulador
              </motion.div>
            </motion.section>
          )}

          {screen.kind === "scenario" && <ImmersiveStory story={content.scenario} className="mt-2" />}

          {screen.kind === "objectives" && (
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative overflow-hidden rounded-[2rem] border border-atlas-orange/20 bg-surface p-5 shadow-[0_30px_90px_-48px_rgba(255,86,24,0.4)] sm:p-8">
              <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-atlas-orange/[0.08] blur-[80px]" />
              <div className="relative z-10 flex items-start gap-4 border-b border-border/60 pb-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas-orange to-amber-500 text-white shadow-lg"><Brain size={22} aria-hidden="true" /></span>
                <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-atlas-orange">Mapa deste módulo</p><h2 className="mt-1 text-balance font-display text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl">O que você vai dominar</h2></div>
              </div>
              <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } } }} className="relative z-10 mt-6 grid gap-4 md:grid-cols-2">
                {content.objectives.map((objective, index) => (
                  <motion.article
                    key={objective}
                    variants={{ hidden: { opacity: 0, y: 18, rotateX: 5 }, visible: { opacity: 1, y: 0, rotateX: 0 } }}
                    transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -5, rotateX: -1.5, rotateY: index % 2 === 0 ? 1.5 : -1.5 }}
                    className="group relative min-h-36 overflow-hidden rounded-2xl border border-border/80 bg-background/75 p-5 shadow-[0_18px_45px_-32px_rgba(0,0,0,0.38)] backdrop-blur-sm transition-colors hover:border-atlas-orange/35"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-atlas-orange/55 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-atlas-orange/10 px-2 text-xs font-black tracking-wider text-atlas-orange">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-4 text-pretty text-[15px] font-bold leading-relaxed tracking-[-0.01em] text-foreground sm:text-base">{objective}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.section>
          )}

          {screen.kind === "section" && (
            <ImmersiveLessonStage chapterIndex={screen.chapterIndex} totalChapters={content.sections.length} title={screen.section.title}>
              <div className="space-y-6">
                {screen.section.blocks.map((block, index) => (
                  <motion.div
                    key={`${screen.section.id}-${index}`}
                    initial={{ opacity: 0, y: 18, z: -16 }}
                    animate={{ opacity: 1, y: 0, z: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.055, 0.2), ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <ContentBlockView block={block} index={index} />
                  </motion.div>
                ))}
              </div>
            </ImmersiveLessonStage>
          )}

          {screen.kind === "practice" && practiceLab && <PracticeLab lab={practiceLab} moduleTitle={content.title} />}

          {screen.kind === "diagram" && (
            <section className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-atlas-orange/10 text-atlas-orange"><MapIcon size={24} aria-hidden="true" /></span>
                <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-atlas-orange">Integração visual</p><h2 className="mt-1 text-balance font-display text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl">Veja o processo como sistema</h2><p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-muted">Use o mapa para enxergar sequência, decisão, dependências e pontos de controle. Aumente o zoom quando precisar inspecionar um trecho.</p></div>
              </motion.div>
              <MermaidViewer title={content.diagram.title} chart={content.diagram.chart} />
            </section>
          )}

          {screen.kind === "review" && (
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
              <section className="atlas-summary-card">
                <div className="atlas-summary-heading">
                  <span><ClipboardList size={22} aria-hidden="true" /></span>
                  <div><p>Recuperação rápida</p><h2>O que precisa ficar</h2></div>
                </div>
                <ul>{content.summary.map((item) => <li key={item}><CheckCircle2 size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>
              </section>

              <section className="atlas-final-checklist">
                <p className="atlas-content-kicker">Antes da avaliação</p>
                <h2>Checklist de domínio</h2>
                {content.finalChecklist.map((item, index) => <p key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>)}
              </section>

              <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-widest text-atlas-orange">Fontes deste módulo</p>
                <h2 className="mt-2 text-balance font-display text-2xl font-black tracking-[-0.025em] text-foreground">De onde o conteúdo foi construído</h2>
                <ul className="mt-5 space-y-3">
                  {content.sources.map((source) => <li key={source} className="flex gap-3 text-sm font-medium leading-relaxed text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-atlas-orange" />{source}</li>)}
                </ul>
              </section>
            </motion.div>
          )}

          {screen.kind === "quiz" && (
            <motion.section initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55 }} className="atlas-content-card relative mx-auto max-w-3xl overflow-hidden border-2 border-atlas-orange/20 text-center shadow-2xl">
              <motion.div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-atlas-orange/10 blur-[80px]" animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
              <div className="relative z-10">
                <motion.span whileHover={{ rotateY: 15, rotateX: -8 }} className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas-orange to-amber-500 text-white shadow-lg" style={{ transformStyle: "preserve-3d" }}><CheckCircle2 size={32} /></motion.span>
                <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-atlas-orange"><Sparkles size={13} /> validação de domínio</p>
                <h2 className="text-balance font-display text-3xl font-black tracking-[-0.04em] text-gradient-title sm:text-4xl">Simulador de decisão</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-relaxed text-muted">As questões usam cenários do currículo novo. É necessário atingir 70% para validar o módulo.</p>
                {!showQuiz && (
                  <button onClick={() => setShowQuiz(true)} className="relative z-10 mt-8 rounded-xl bg-gradient-to-r from-atlas-orange to-amber-500 px-10 py-5 font-black uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-[1.02]">
                    {modProgress?.passed ? "Refazer simulação" : "Iniciar avaliação"}
                  </button>
                )}
                {showQuiz && (
                  <div className="relative z-10 mt-8 text-left">
                    {quiz ? (
                      <QuizRunner
                        questions={quiz}
                        title={`Simulador — ${content.title}`}
                        onSubmit={async (answers) => {
                          const userId = ((registration as unknown as Record<string, unknown>)?.userId || (registration as unknown as Record<string, unknown>)?.id) as string | undefined;
                          const res = await fetch(`http://localhost:3001/quiz/${params.slug}/submit`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId, answers })
                          });
                          const data = await res.json();
                          completeModuleQuiz(params.slug, data.score);
                          if (data.passed && nextReady) {
                            setTimeout(() => router.push(`/trilha/${nextReady.slug}`), 5000);
                          }
                          return data;
                        }}
                      />
                    ) : (
                      <div className="space-y-4 py-8">
                        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-border/50" />
                        <div className="h-4 w-full animate-pulse rounded-lg bg-border/30" />
                        <div className="h-4 w-5/6 animate-pulse rounded-lg bg-border/30" />
                        <div className="mt-8 grid gap-3">
                          <div className="h-14 w-full animate-pulse rounded-xl bg-surface-2" />
                          <div className="h-14 w-full animate-pulse rounded-xl bg-surface-2" />
                          <div className="h-14 w-full animate-pulse rounded-xl bg-surface-2" />
                        </div>
                        <div className="mt-6 flex justify-center">
                          <div className="h-4 w-32 animate-pulse rounded-full bg-atlas-orange/20" />
                        </div>
                      </div>
                    )}
                    {modProgress?.passed && <div className="mt-12 border-t border-border pt-8"><CertificateActions moduleTitle={content.title} moduleNumber={meta.number} /><ModuleRating /></div>}
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>

      {!isFocusMode && (
        <div className="sticky bottom-0 z-30 border-t border-border/50 bg-background/90 backdrop-blur-xl print:hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            {isFirstScreen ? (
              previousReady ? <Link href={`/trilha/${previousReady.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-atlas-orange"><ArrowLeft size={16} /> <span className="hidden sm:inline">{previousReady.title}</span></Link> : <span />
            ) : (
              <button onClick={goPrev} className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-foreground hover:border-atlas-orange/50"><ArrowLeft size={16} /> Anterior</button>
            )}

            {!isQuizScreen ? (
              <button onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-atlas-orange px-6 py-2.5 text-sm font-bold text-white shadow-glow hover:bg-atlas-orange-2">Continuar <ArrowRight size={16} /></button>
            ) : nextReady ? (
              <Link href={`/trilha/${nextReady.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-atlas-orange"><span className="hidden sm:inline">{nextReady.title}</span> <ArrowRight size={16} /></Link>
            ) : (
              <Link href="/prova-final" className="inline-flex items-center gap-2 text-sm font-semibold text-atlas-orange">Ir para a prova final <ArrowRight size={16} /></Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
