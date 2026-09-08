"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Sparkles,
  Trophy,
  BookOpen,
  Clock,
  Target,
  GraduationCap,
  Tv,
  LayoutGrid,
  Bookmark,
  Shield,
  Layers,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ModuleCard } from "@/components/trail/ModuleCard";
import { MasteryOverview } from "@/components/trail/MasteryOverview";
import { NetflixContentRail } from "@/components/streaming/NetflixContentRail";
import { ModuleDetailModal } from "@/components/streaming/ModuleDetailModal";
import { moduleMetas, readyModuleSlugs } from "@/content/modules";
import {
  getHighestUnlockedModuleNumber,
  getCurrentActiveModule,
  isModuleUnlocked,
} from "@/lib/progression";
import { useOnboardingStore } from "@/lib/store";
import { useRequireRegistration } from "@/lib/useRequireRegistration";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { CourseMediaHero } from "@/components/media/CourseMediaHero";
import { GamificationBar } from "@/components/gamification/GamificationBar";
import type { ModuleMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

function TrilhaContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";

  const isRegistered = useRequireRegistration();
  const { registration, progress, myList = [] } = useOnboardingStore();
  const [viewMode, setViewMode] = useState<"rails" | "grid">("rails");
  const [selectedModule, setSelectedModule] = useState<ModuleMeta | null>(null);

  const highestUnlocked = useMemo(
    () => getHighestUnlockedModuleNumber(progress, moduleMetas),
    [progress]
  );
  const activeModule = useMemo(
    () => getCurrentActiveModule(progress, moduleMetas),
    [progress]
  );

  if (!isRegistered || !registration) return null;

  const completedReady = readyModuleSlugs.filter((slug) => progress[slug]?.passed).length;
  const pct = Math.round((completedReady / readyModuleSlugs.length) * 100);
  const allReadyDone = completedReady === readyModuleSlugs.length;
  const totalMinutes = moduleMetas.filter((m) => m.status === "ready").reduce((sum, module) => sum + module.durationMinutes, 0);

  const unfinishedModules = moduleMetas.filter((m) => readyModuleSlugs.includes(m.slug) && !progress[m.slug]?.passed);
  const nextModule = unfinishedModules.length > 0 ? unfinishedModules[0] : null;
  const categories = Array.from(new Set(moduleMetas.map((m) => m.category || "Outros")));

  const myListModules = moduleMetas.filter((m) => myList.includes(m.slug));
  const isMyListActive = initialFilter === "mylist";

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 selection:bg-atlas-orange selection:text-white">
      <SiteHeader />

      {/* Hero Header Estilo Apple Keynote */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-2 via-surface to-background dark:from-[#111218] dark:to-[#08080a] pt-12 pb-14 border-b border-border dark:border-white/10">
        <div className="absolute inset-0 bg-[url('/brand/grid-pattern.svg')] opacity-5 pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-atlas-orange/15 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-atlas-orange/15 text-atlas-orange border border-atlas-orange/30">
                Aluno: {registration.nomeCompleto.split(" ")[0]}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-muted dark:text-zinc-400 border border-border dark:border-white/10 bg-surface dark:bg-black/40">
                15 MÓDULOS • 4K ULTRA HD
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground dark:text-white mb-3">
              Currículo de Especialização & Operação
            </h1>
            <p className="max-w-3xl text-sm sm:text-base text-muted dark:text-zinc-400 font-medium leading-relaxed">
              Jornada completa de certificação combinando gestão de risco, inteligência artificial, conformidade e auditoria da Central ATLASGR.
            </p>
          </motion.div>

          {/* Banner de Status & Próximo Módulo (Apple Bento) */}
          <div className="rounded-2xl border border-border bg-surface dark:border-white/10 dark:bg-[#121319] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-sm dark:shadow-2xl">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-atlas-orange/30 bg-atlas-orange/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-atlas-orange mb-4">
                <Sparkles size={14} aria-hidden="true" />
                {allReadyDone ? "Formação concluída" : "Próximo treinamento recomendado"}
              </span>

              {allReadyDone ? (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground dark:text-white leading-tight mb-2">
                    Formação técnica concluída 🎓
                  </h2>
                  <p className="text-sm text-muted dark:text-zinc-400 leading-relaxed">
                    Todos os 15 módulos foram validados no simulador. Emita agora seu certificado oficial assinado.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground dark:text-white leading-tight mb-2">
                    {nextModule?.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted dark:text-zinc-400 mb-6 font-mono">
                    <span className="flex items-center gap-1.5 text-atlas-orange">
                      <BookOpen size={15} /> {nextModule?.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} /> {nextModule?.durationMinutes} min
                    </span>
                    <span className="flex items-center gap-1.5 text-foreground/80 dark:text-zinc-300">
                      <Target size={15} /> Conteúdo + prática + avaliação
                    </span>
                  </div>
                </>
              )}

              <div className="flex flex-wrap items-center gap-4">
                {allReadyDone ? (
                  <Link href="/certificado">
                    <Button size="lg" variant="primary" leftIcon={<Trophy size={18} />}>
                      Acessar Certificado Oficial
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/trilha/${nextModule?.slug}`}>
                    <Button size="lg" variant="primary" leftIcon={<PlayCircle size={18} />}>
                      Começar Módulo Agora
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Apple Progress Gauge */}
            <div className="w-full max-w-md shrink-0">
              <div className="rounded-2xl p-6 border border-border dark:border-white/10 bg-surface-2/60 dark:bg-black/40 backdrop-blur-md">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="font-bold text-foreground dark:text-white">Progresso da Formação</span>
                  <span className="font-display font-black text-2xl text-atlas-orange">{pct}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-border dark:bg-white/10 shadow-inner">
                  <motion.div
                    className="h-full rounded-full bg-atlas-orange shadow-[0_0_12px_#FF5618]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-surface border border-border dark:bg-[#161720] dark:border-white/5 p-3 text-center shadow-xs">
                    <p className="font-display text-xl font-black text-foreground dark:text-white">{completedReady}/{readyModuleSlugs.length}</p>
                    <p className="text-[10px] font-black uppercase tracking-wider text-muted dark:text-zinc-500 font-mono">validados</p>
                  </div>
                  <div className="rounded-xl bg-surface border border-border dark:bg-[#161720] dark:border-white/5 p-3 text-center shadow-xs">
                    <p className="font-display text-xl font-black text-foreground dark:text-white">{Math.round(totalMinutes / 60)}h</p>
                    <p className="text-[10px] font-black uppercase tracking-wider text-muted dark:text-zinc-500 font-mono">carga estimada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamificação & Progresso Geral da Trilha */}
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 pt-8">
        <GamificationBar variant="full" />
      </div>

      {/* Central de Mídia: Apresentação do Curso ("O que você vai aprender") + Vídeo Institucional AtlasGR */}
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 pt-8">
        <CourseMediaHero />
      </div>

      {/* Controles de Visualização: Modo Netflix Rails vs Modo Grade Bento Apple */}
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 pt-8 pb-4 flex flex-wrap items-center justify-between gap-4 border-b border-border dark:border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted dark:text-zinc-400 font-bold uppercase tracking-wider">
            Modo de Exibição:
          </span>
          <div className="flex items-center p-1 rounded-xl bg-surface-2 border border-border dark:bg-white/5 dark:border-white/10">
            <button
              onClick={() => setViewMode("rails")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === "rails"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-white dark:text-black"
                  : "text-muted hover:text-foreground dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              <Tv size={14} /> Carrosséis (Netflix)
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === "grid"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-white dark:text-black"
                  : "text-muted hover:text-foreground dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              <LayoutGrid size={14} /> Grade Curricular
            </button>
          </div>
        </div>

        {myList.length > 0 && (
          <div className="text-xs text-muted dark:text-zinc-400 font-medium">
            <strong className="text-atlas-orange">{myList.length}</strong> itens salvos na sua lista pessoal
          </div>
        )}
      </div>

      {/* Exibição condicional de Minha Lista ou Currículo */}
      {isMyListActive ? (
        <main className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground dark:text-white flex items-center gap-3">
              <Bookmark className="text-atlas-orange" /> Minha Lista de Treinamentos
            </h2>
            <Link
              href="/trilha"
              className="text-xs font-bold text-muted hover:text-foreground dark:text-zinc-400 dark:hover:text-white"
            >
              Ver todos os módulos
            </Link>
          </div>

          {myListModules.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-surface border border-border dark:bg-[#121319] dark:border-white/10 p-8 shadow-sm">
              <Bookmark size={36} className="mx-auto text-muted dark:text-zinc-500 mb-3" />
              <h3 className="text-lg font-bold text-foreground dark:text-white">Sua lista está vazia</h3>
              <p className="text-xs text-muted dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                Explore os módulos e marque o ícone de bookmark para assisti-los depois.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {myListModules.map((module) => (
                <ModuleCard
                  key={module.slug}
                  meta={module}
                  index={moduleMetas.findIndex((meta) => meta.slug === module.slug)}
                  isCompleted={Boolean(progress[module.slug]?.passed)}
                  isLocked={!isModuleUnlocked(module, progress, moduleMetas)}
                  isCurrent={module.slug === activeModule.slug}
                />
              ))}
            </div>
          )}
        </main>
      ) : viewMode === "rails" ? (
        /* MODO STREAMING NETFLIX: Trilhos Temáticos */
        <main className="space-y-6 pt-6">
          {categories.map((category) => {
            const modules = moduleMetas.filter((module) => (module.category || "Outros") === category);
            return (
              <NetflixContentRail
                key={category}
                title={category}
                subtitle={`${modules.length} módulos disponíveis`}
                modules={modules}
                progress={progress}
                onOpenDetails={(mod) => setSelectedModule(mod)}
                allModules={moduleMetas}
              />
            );
          })}
        </main>
      ) : (
        /* MODO GRADE CURRICULAR APPLE: Bento & Mastery */
        <>
          <MasteryOverview registration={registration} progress={progress} modules={moduleMetas} />

          <main className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 py-8">
            <div className="space-y-16">
              {categories.map((category) => {
                const modules = moduleMetas.filter((module) => (module.category || "Outros") === category);
                const completedInCategory = modules.filter((module) => progress[module.slug]?.passed).length;
                return (
                  <section key={category} id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}>
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-muted dark:text-zinc-500 font-mono">
                          {completedInCategory}/{modules.length} validados
                        </p>
                        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground dark:text-white">
                          {category}
                        </h3>
                      </div>
                      <div className="h-px bg-border dark:bg-white/10 flex-1 min-w-16" />
                    </div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {modules.map((module) => (
                        <ModuleCard
                          key={module.slug}
                          meta={module}
                          index={moduleMetas.findIndex((meta) => meta.slug === module.slug)}
                          isCompleted={Boolean(progress[module.slug]?.passed)}
                          isLocked={!isModuleUnlocked(module, progress, moduleMetas)}
                          isCurrent={module.slug === activeModule.slug}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </main>
        </>
      )}

      {/* Modal de Detalhes Cinematográfico */}
      <ModuleDetailModal
        meta={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </div>
  );
}

export default function TrilhaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <TrilhaContent />
    </Suspense>
  );
}

