import TerminalWindow from "@/components/showcase/TerminalWindow";
import ArchitectureFlow from "@/components/showcase/ArchitectureFlow";
import ValueMetricsCards from "@/components/showcase/ValueMetricsCards";
import MapaDoCrime from "@/components/charts/MapaDoCrime";
import RankingOfensores from "@/components/charts/RankingOfensores";
import RepresentatividadeEventos from "@/components/charts/RepresentatividadeEventos";
import TempoEmAlvosTable from "@/components/charts/TempoEmAlvosTable";
import GlossaryTooltip from "@/components/ui/GlossaryTooltip";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BASE_PATH } from "@/lib/basePath";
import type { Metadata } from "next";

const PRODUCT_SLUGS = ["profile", "connect", "gr", "analytics"];
const PRODUCT_NAMES: Record<string, string> = {
  profile: "Atlas Profile",
  connect: "Atlas Connect",
  gr: "Atlas GR",
  analytics: "Atlas Analytics",
};

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${PRODUCT_NAMES[slug] || slug} — Portal ATLASGR` };
}

// This is a dynamic route. In a real app, data would be fetched based on slug.
export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Render different content based on slug, or a generic layout
  const isProfile = slug === "profile";
  const isConnectOrGR = slug === "connect" || slug === "gr";
  const isAnalytics = slug === "analytics";

  if (!isProfile && !isConnectOrGR && !isAnalytics) {
    // Basic fallback for now
    return (
      <div className="min-h-screen bg-atlas-dark text-white">
        <SiteHeader />
        <main className="flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 capitalize">Módulo {slug}</h1>
          <p className="text-gray-400 max-w-2xl text-center">
            Este módulo não possui um showcase específico ainda. Navegue para /produtos/profile, /produtos/connect ou /produtos/gr.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atlas-dark text-white font-sans">
      <SiteHeader />
      <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 flex flex-col items-center text-center">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-atlas-orange/10 rounded-full blur-[120px] pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-bold font-secondary mb-6 relative z-10">
          Atlas <span className="text-atlas-orange capitalize">{slug}</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-12 relative z-10">
          {isProfile && "Inteligência Artificial que analisa o risco de contratação em menos de 5 minutos, garantindo a conformidade da sua operação."}
          {isConnectOrGR && "A Torre de Controle definitiva. Transforme eventos brutos em gestão por exceção e acione a Célula de Inteligência Atlas (C.I.A) automaticamente."}
          {slug === "analytics" && "O Cockpit Executivo para visualização de dados logísticos e operacionais em tempo real."}
        </p>
      </section>

      {/* Showcase Content */}
      <section className="py-16 px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {isProfile && (
            <div className="w-full flex flex-col lg:flex-row items-center gap-16 justify-between">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">O Custo Invisível da Contratação</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Um erro na contratação pode custar milhões. O Atlas Profile utiliza IA para cruzar dados criminais, biometria facial e histórico profissional instantaneamente.
                </p>
                <GlossaryTooltip>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-atlas-orange" />
                      Resumo automático de processos judiciais
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-atlas-orange" />
                      Validação por FaceID
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-atlas-orange" />
                      SLA de retorno em menos de 5 minutos
                    </li>
                  </ul>
                </GlossaryTooltip>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <TerminalWindow />
              </div>

              {/* Visão Real da Plataforma */}
              <div className="w-full mt-16 flex flex-col items-center">
                <div className="text-center max-w-3xl mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-atlas-orange bg-atlas-orange/10 px-3 py-1 rounded-full border border-atlas-orange/20">
                    Visão Real da Plataforma
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-3 mb-2">Tela de Registros Recentes (recentRecords)</h3>
                  <p className="text-gray-400 text-sm">
                    Ambiente operacional do Atlas Profile: varredura em 40+ tribunais e órgãos oficiais, biometria FaceID e status de risco com anonimização em conformidade com a LGPD.
                  </p>
                </div>
                <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-zinc-950/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}/brand/screenshots/perfil-securitario.png`}
                    alt="Tela de Registros Recentes do Atlas Profile"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {isConnectOrGR && (
            <div className="w-full flex flex-col items-center">
              <div className="text-center max-w-3xl mb-16">
                <h2 className="text-3xl font-bold mb-4">Arquitetura de Resposta Rápida</h2>
                <GlossaryTooltip>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Não dependa do WhatsApp para salvar sua carga. O Atlas Connect integra-se ao seu rastreador e escala automaticamente eventos críticos para a Torre de Controle e a C.I.A.
                  </p>
                </GlossaryTooltip>
              </div>
              <ArchitectureFlow />

              {/* Visão Real das Plataformas NewConnect & Portal Atlas */}
              <div className="w-full mt-20 flex flex-col items-center">
                <div className="text-center max-w-3xl mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-atlas-orange bg-atlas-orange/10 px-3 py-1 rounded-full border border-atlas-orange/20">
                    Visão Real das Plataformas
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-3 mb-2">NewConnect & Portal Atlas em Operação</h3>
                  <p className="text-gray-400 text-sm">
                    O ecossistema dual da AtlasGR: a Torre de Controle moderna do NewConnect com Fila de Alertas prioritária IA (P1 a P7) e o Portal Atlas Core para parametrização de SM, rastreadores e regras do PGR.
                  </p>
                </div>
                <div className="w-full max-w-5xl space-y-8">
                  <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-zinc-950/60">
                    <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">Atlas NewConnect — Torre de Controle & Fila de Alertas Tática</span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">● Online em Tempo Real</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE_PATH}/brand/screenshots/newconnect-dashboard.png`}
                      alt="Atlas NewConnect Dashboard"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-zinc-950/60">
                    <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">Portal Atlas Core — Emissão de SM, Tecnologias de Rastreamento & PGR</span>
                      <span className="text-[11px] font-mono text-amber-400 font-bold">● Motor Paramétrico</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE_PATH}/brand/screenshots/portalatlas-sm.png`}
                      alt="Portal Atlas Core SM"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isAnalytics && (
            <div className="w-full">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4">Cockpit Executivo em Tempo Real</h2>
                <GlossaryTooltip>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    As mesmas visões de Power BI usadas pela gestão da Atlas: risco por rodovia, ofensores de safety e SLA de permanência em alvos.
                  </p>
                </GlossaryTooltip>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MapaDoCrime />
                <RankingOfensores />
                <RepresentatividadeEventos />
                <TempoEmAlvosTable />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Value Metrics Section */}
      <section className="py-24 px-8 bg-black/50 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">Impacto Real em Operações Complexas</h2>
          <ValueMetricsCards />
        </div>
      </section>
      </main>
    </div>
  );
}
