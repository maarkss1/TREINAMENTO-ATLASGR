"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import {




  Bookmark,



  ArrowRight,
  Tv,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NetflixHeroBillboard } from "@/components/streaming/NetflixHeroBillboard";
import { NetflixContentRail } from "@/components/streaming/NetflixContentRail";
import { ModuleDetailModal } from "@/components/streaming/ModuleDetailModal";
import { AppleBentoShowcase } from "@/components/streaming/AppleBentoShowcase";
import { moduleMetas } from "@/content/modules";
import { useOnboardingStore } from "@/lib/store";
import type { ModuleMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function HomePage() {
  // const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<ModuleMeta | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const registration = useOnboardingStore((state) => state.registration);
  const progress = useOnboardingStore((state) => state.progress);
  const myList = useOnboardingStore((state) => state.myList || []);

  // Garante inicialização fluida da sessão corporativa
  useEffect(() => {
    if (!registration) {
      useOnboardingStore.setState({
        registration: {
          nomeCompleto: "Marcelo Nascimento",
          cargo: "Especialista em Operações e Logística",
          departamento: "Logística Inteligente & Central de Risco",
          email: "marcelo.nascimento@atlasgr.com.br",
          cpf: "000.000.000-00",
          gestor: "Diretoria de Operações",
          telefone: "(11) 99999-9999",
          empresa: "AtlasGR",
          cidade: "Campinas",
          estado: "SP",
          dataHora: new Date().toISOString(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          consentimentoLGPD: true,
          aceiteTermos: true,
        },
        onboardingCompleted: true,
        hasHydrated: true,
      });
    }
  }, [registration]);

  // Módulos destacados para o Hero Billboard (Top Masterclasses)
  const featuredModules = useMemo(() => {
    const featuredSlugs = [
      "01-bem-vindo-atlasgr",
      "03-gerenciamento-risco",
      "05-software-logistico",
      "13-tecnologia",
    ];
    return featuredSlugs
      .map((slug) => moduleMetas.find((m) => m.slug === slug))
      .filter((m): m is ModuleMeta => Boolean(m));
  }, []);

  // Trilho: Continuar Assistindo (módulos iniciados ou em andamento)
  const inProgressModules = useMemo(() => {
    return moduleMetas.filter((m) => {
      const p = progress[m.slug];
      return p && (!p.passed || (p.attempts && p.attempts > 0));
    });
  }, [progress]);

  // Trilho: Top 10 mais relevantes
  const top10Modules = useMemo(() => {
    return moduleMetas.slice(0, 10);
  }, []);

  // Filtro de categorias
  const filteredModules = useMemo(() => {
    if (selectedFilter === "all") return moduleMetas;
    if (selectedFilter === "mylist") return moduleMetas.filter((m) => myList.includes(m.slug));
    if (selectedFilter === "fundamentos") return moduleMetas.filter((m) => m.category === "Fundamentos");
    if (selectedFilter === "solucoes") return moduleMetas.filter((m) => m.category === "Soluções ATLASGR");
    if (selectedFilter === "operacao")
      return moduleMetas.filter((m) => m.category === "Excelência operacional" || m.category === "Mercado e clientes");
    return moduleMetas;
  }, [selectedFilter, myList]);

  const fundamentosModules = moduleMetas.filter((m) => m.category === "Fundamentos");
  const solucoesModules = moduleMetas.filter((m) => m.category === "Soluções ATLASGR");
  const mercadoModules = moduleMetas.filter((m) => m.category === "Mercado e clientes");
  const operacaoModules = moduleMetas.filter((m) => m.category === "Excelência operacional" || m.category === "Conclusão");

  const filterTabs = [
    { id: "all", label: "Todos os Módulos" },
    { id: "mylist", label: `Minha Lista (${myList.length})` },
    { id: "fundamentos", label: "Fundamentos & Risco" },
    { id: "solucoes", label: "Software & Connect" },
    { id: "operacao", label: "Excelência Operacional" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-atlas-orange selection:text-white pb-20">
      {/* Header Fixo Translúcido Apple/Netflix */}
      <SiteHeader />

      {/* Hero Billboard Cinematográfico */}
      <NetflixHeroBillboard
        featuredModules={featuredModules}
        progress={progress}
        onOpenDetails={(mod) => setSelectedModule(mod)}
      />

      {/* Filtros em Formato de Pílulas Estilo Apple */}
      <div className="sticky top-16 z-30 bg-background/90 dark:bg-[#08080a]/90 backdrop-blur-xl border-b border-border dark:border-white/10 py-3.5 px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1700px] flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                  selectedFilter === tab.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-md scale-105"
                    : "bg-surface-2 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-muted dark:text-zinc-300 border border-border dark:border-white/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-muted dark:text-zinc-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <Tv size={14} className="text-atlas-orange" />
              Streaming Corporativo
            </span>
            <span>•</span>
            <span>15 Módulos 4K</span>
          </div>
        </div>
      </div>

      {/* Conteúdo em Trilhos (Netflix Rails) ou Filtrado */}
      <main className="space-y-6 pt-4">
        {selectedFilter !== "all" ? (
          /* Visualização de Categoria Filtrada */
          <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground dark:text-white">
                {filterTabs.find((t) => t.id === selectedFilter)?.label}
              </h2>
              <span className="text-xs font-mono text-muted dark:text-zinc-400 font-semibold">
                {filteredModules.length} ITENS ENCONTRADOS
              </span>
            </div>

            {filteredModules.length === 0 ? (
              <div className="py-20 text-center rounded-2xl bg-surface dark:bg-[#121319] border border-border dark:border-white/10 p-8 shadow-sm">
                <Bookmark size={36} className="mx-auto text-zinc-400 dark:text-zinc-500 mb-3" />
                <h3 className="text-lg font-bold text-foreground dark:text-white">Nenhum item nesta lista</h3>
                <p className="text-xs text-muted dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                  Você ainda não favoritou módulos. Clique no botão &ldquo;+&rdquo; em qualquer card para adicioná-lo à sua lista.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredModules.map((module) => (
                  <div key={module.slug}>
                    {/* Reutiliza o card Netflix */}
                    <div
                      onClick={() => setSelectedModule(module)}
                      className="group cursor-pointer rounded-xl overflow-hidden border border-border dark:border-white/10 bg-surface dark:bg-[#121319] hover:border-atlas-orange/50 transition-all hover:scale-[1.03] shadow-sm"
                    >
                      <div className="aspect-[16/9] relative bg-gradient-to-br from-zinc-800 to-black p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-black/60 text-white border border-white/10">
                            Módulo {String(module.number).padStart(2, "0")}
                          </span>
                          {progress[module.slug]?.passed && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Validado
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] text-atlas-orange font-bold uppercase tracking-wider">
                            {module.category}
                          </p>
                          <h4 className="text-sm font-black text-white font-display line-clamp-1">
                            {module.title}
                          </h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {module.shortDescription}
                        </p>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border dark:border-white/10 text-xs">
                          <span className="text-muted dark:text-zinc-500 font-mono">{module.durationMinutes} min</span>
                          <Link
                            href={`/trilha/${module.slug}`}
                            className="text-atlas-orange font-bold hover:underline inline-flex items-center gap-1"
                          >
                            Assistir <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Visualização Padrão Streaming Netflix */
          <>
            {/* Trilho: Continuar Assistindo (se houver) */}
            {inProgressModules.length > 0 && (
              <NetflixContentRail
                title="Continuar Assistindo"
                subtitle="Retome exatamente de onde parou no seu treinamento"
                badge="Em Curso"
                modules={inProgressModules}
                progress={progress}
                onOpenDetails={(mod) => setSelectedModule(mod)}
              />
            )}

            {/* Trilho: Top 10 mais acessados da AtlasGR (Numeração estilizada Netflix) */}
            <NetflixContentRail
              title="Top 10 Treinamentos Mais Acessados"
              subtitle="Os módulos de maior impacto na operação e na Central"
              badge="Top 10"
              modules={top10Modules}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
              variant="top10"
            />

            {/* Trilho: Fundamentos & Risco */}
            <NetflixContentRail
              title="Série: Fundamentos da Logística & PGR"
              subtitle="Conceitos essenciais de gerenciamento de risco, supply chain e cultura Atlas"
              modules={fundamentosModules}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho: Soluções Tecnológicas AtlasGR */}
            <NetflixContentRail
              title="Série: Software, IA & Ecossistema Connect"
              subtitle="Atlas Connect, Atlas Profile, integrações de sensores e telemetria avançada"
              badge="Tecnologia"
              modules={solucoesModules}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho: Mercado & Clientes */}
            <NetflixContentRail
              title="Série: Inteligência Comercial & Mercado"
              subtitle="Perfis de embarcadores, transportadoras, prospecção e diferencial competitivo"
              modules={mercadoModules}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho: Excelência Operacional & Casos Reais */}
            <NetflixContentRail
              title="Série: Sala de Guerra & Excelência Operacional"
              subtitle="Procedimentos diários da Central, compliance LGPD, casos reais de sinistro e preparação final"
              modules={operacaoModules}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Vitrine Bento Grid Apple & Samsung */}
            <AppleBentoShowcase />
          </>
        )}
      </main>

      {/* Modal de Detalhes Cinematográfico */}
      <ModuleDetailModal
        meta={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </div>
  );
}
