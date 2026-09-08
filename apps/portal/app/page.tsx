"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Trophy,
  Compass,
  Play,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowRight,
  Tv,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NetflixHeroBillboard } from "@/components/streaming/NetflixHeroBillboard";
import { NetflixContentRail } from "@/components/streaming/NetflixContentRail";
import { NetflixModuleCard } from "@/components/streaming/NetflixModuleCard";
import { ModuleDetailModal } from "@/components/streaming/ModuleDetailModal";
import { AppleBentoShowcase } from "@/components/streaming/AppleBentoShowcase";
import { GamificationBar } from "@/components/gamification/GamificationBar";
import { moduleMetas } from "@/content/modules";
import { useOnboardingStore } from "@/lib/store";
import type { ModuleMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
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

  // Módulos agrupados por trilhas táticas da AtlasGR
  const trilhaIntegracao = useMemo(
    () => moduleMetas.filter((m) => [1, 2].includes(m.number)),
    []
  );
  const trilhaRisco = useMemo(
    () => moduleMetas.filter((m) => [3, 12].includes(m.number)),
    []
  );
  const trilhaSistemas = useMemo(
    () => moduleMetas.filter((m) => [4, 5, 6, 7].includes(m.number)),
    []
  );
  const trilhaOperacao = useMemo(
    () => moduleMetas.filter((m) => [10, 11, 13, 14].includes(m.number)),
    []
  );
  const trilhaComercial = useMemo(
    () => moduleMetas.filter((m) => [8, 9].includes(m.number)),
    []
  );
  const trilhaCertificacao = useMemo(
    () => moduleMetas.filter((m) => [15].includes(m.number)),
    []
  );

  // Filtro de categorias
  const filteredModules = useMemo(() => {
    if (selectedFilter === "all") return moduleMetas;
    if (selectedFilter === "mylist") return moduleMetas.filter((m) => myList.includes(m.slug));
    if (selectedFilter === "integracao") return trilhaIntegracao;
    if (selectedFilter === "risco") return trilhaRisco;
    if (selectedFilter === "sistemas") return trilhaSistemas;
    if (selectedFilter === "operacao") return trilhaOperacao;
    if (selectedFilter === "comercial") return trilhaComercial;
    return moduleMetas;
  }, [selectedFilter, myList, trilhaIntegracao, trilhaRisco, trilhaSistemas, trilhaOperacao, trilhaComercial]);

  const filterTabs = [
    { id: "all", label: "Todos os Módulos" },
    { id: "mylist", label: `Minha Lista (${myList.length})` },
    { id: "integracao", label: "Integração & Cultura" },
    { id: "risco", label: "PGR & Risco" },
    { id: "sistemas", label: "Connect & Sistemas" },
    { id: "operacao", label: "Torre 24h & Alertas" },
    { id: "comercial", label: "Comercial & Clientes" },
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
      <div className="sticky top-16 z-30 bg-background/95 dark:bg-[#08080a]/95 backdrop-blur-xl border-b border-border dark:border-white/10 py-3 px-6 sm:px-10 lg:px-14 shadow-xs">
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

      {/* Barra de Progresso & Gamificação */}
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14 pt-6">
        <GamificationBar variant="full" />
      </div>

      {/* Conteúdo em Trilhos (Netflix Rails) ou Filtrado */}
      <main className="space-y-6 pt-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
                {filteredModules.map((module) => (
                  <NetflixModuleCard
                    key={module.slug}
                    meta={module}
                    progress={progress[module.slug]}
                    onOpenDetails={(mod) => setSelectedModule(mod)}
                  />
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

            {/* Trilho 1: Integração & Cultura */}
            <NetflixContentRail
              title="Formação Inicial & Cultura AtlasGR"
              subtitle="Propósito, história, valores inegociáveis e introdução à cadeia de suprimentos"
              badge="Onboarding"
              modules={trilhaIntegracao}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho 2: Gerenciamento de Risco, PGR & Apólices */}
            <NetflixContentRail
              title="Gerenciamento de Risco, PGR & Compliance"
              subtitle="Normas securitárias, apólices RCF-DC, compliance LGPD e camadas de proteção"
              badge="Segurança"
              modules={trilhaRisco}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho 3: Sistemas & Softwares */}
            <NetflixContentRail
              title="Sistemas Atlas: Connect, Profile & Integrações"
              subtitle="Portal Atlas Connect, cadastro de SM, Atlas Profile e comunicação com TMS/rastreadores"
              badge="Sistemas"
              modules={trilhaSistemas}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho 4: Torre de Controle 24h & Tratativa de Alertas */}
            <NetflixContentRail
              title="Torre de Controle 24h: Alertas, SLAs & Casos Reais"
              subtitle="SLA de tratativa (10 min / 45 min), alertas 5 e 6, desvio de rota, perda de sinal e malícia"
              badge="Operação Crítica"
              modules={trilhaOperacao}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho 5: Inteligência Comercial & Clientes */}
            <NetflixContentRail
              title="Inteligência Comercial & Gestão de Clientes"
              subtitle="Perfis de embarcadores e transportadoras, ICP, persona e diferenciais competitivos"
              badge="Comercial"
              modules={trilhaComercial}
              progress={progress}
              onOpenDetails={(mod) => setSelectedModule(mod)}
            />

            {/* Trilho 6: Certificação Oficial */}
            <NetflixContentRail
              title="Certificação Oficial & Homologação Operacional"
              subtitle="Revisão geral de conteúdo consolidado e validação final de domínio técnico"
              badge="Conclusão"
              modules={trilhaCertificacao}
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
