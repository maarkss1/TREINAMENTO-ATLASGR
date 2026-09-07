"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Shield,
  Cpu,
  Radio,
  Award,
  Tv,
  Video,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { playUiSound } from "@/lib/soundEngine";
import { BASE_PATH } from "@/lib/basePath";

// ID oficial do Vídeo Institucional da ATLASGR no YouTube
const YOUTUBE_INSTITUTIONAL_ID = "yALfdQPaPi4";

interface CourseChapter {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  icon: typeof Shield;
  image: string;
  badge: string;
  description: string;
  highlights: string[];
  audioNarrative: string;
}

const CHAPTERS: CourseChapter[] = [
  {
    id: 1,
    title: "Fundamentos, Cultura & PGR Dinâmico",
    subtitle: "Módulos 01 a 03 • A Base Estratégica",
    duration: "0:30",
    icon: Shield,
    image: `${BASE_PATH}/brand/screenshots/connect_plus_principal.png`,
    badge: "Fase 1 • Alicerce",
    description:
      "Você vai dominar a mentalidade preventiva do Gerenciamento de Riscos moderno. Entenda o fluxo das apólices de seguro, as regras de ouro do PGR e a responsabilidade jurídica e operacional no transporte de cargas de alto valor no Brasil.",
    highlights: [
      "Regras de Ouro do PGR e mitigação de sinistros",
      "Responsabilidade de embarcadores e transportadoras",
      "Cultura de segurança sem retrabalho operacional",
    ],
    audioNarrative:
      "Bem-vindo à Academia AtlasGR. Na primeira fase, você constrói a base essencial de gerenciamento de risco, entendendo como o PGR protege bilhões em mercadorias e salva vidas nas rodovias brasileiras.",
  },
  {
    id: 2,
    title: "Software Atlas Connect, Telemetria & IA",
    subtitle: "Módulos 04 a 07 • Tecnologia em Tempo Real",
    duration: "0:30",
    icon: Cpu,
    image: `${BASE_PATH}/brand/screenshots/newconnect_dashboard.png`,
    badge: "Fase 2 • Alta Tecnologia",
    description:
      "Mergulhe no ecossistema Atlas Connect. Aprenda a operar painéis de telemetria em tempo real integrados a mais de 35 tecnologias de rastreamento, motores de regras neurais e sensores de desvio de rota.",
    highlights: [
      "Operação do Atlas Connect e telemetria avançada",
      "Integração nativa com +35 tecnologias de rastreadores",
      "Análise de alertas preditivos gerados por inteligência artificial",
    ],
    audioNarrative:
      "Na segunda fase, você assume o controle das ferramentas tecnológicas: Atlas Connect, sensores IoT e telemetria avançada que processam milhões de dados por segundo para antecipar desvios.",
  },
  {
    id: 3,
    title: "Atlas Profile & Inteligência Comercial",
    subtitle: "Módulos 08 a 10 • Compliance & Mercado",
    duration: "0:30",
    icon: Radio,
    image: `${BASE_PATH}/brand/screenshots/perfil_securitario_profile.png`,
    badge: "Fase 3 • Inteligência",
    description:
      "Compreenda o processo de cadastro e validação com o Atlas Profile, conformidade rigorosa com a LGPD, background check de motoristas e a proposta de valor que torna a AtlasGR líder no mercado nacional.",
    highlights: [
      "Consulta e validação no Atlas Profile com biometria",
      "Adequação jurídica e conformidade integral à LGPD",
      "Posicionamento consultivo de alto impacto com clientes",
    ],
    audioNarrative:
      "A terceira fase ensina conformidade, inteligência securitária e cadastro no Atlas Profile, garantindo que cada viagem cumpra as normas legais e securitárias mais rigorosas do setor.",
  },
  {
    id: 4,
    title: "Sala de Guerra 24h & Tomada de Decisão",
    subtitle: "Módulos 11 a 15 • Excelência Operacional & Prática",
    duration: "0:30",
    icon: Award,
    image: `${BASE_PATH}/brand/screenshots/newconnect_tela_alerta.png`,
    badge: "Fase 4 • Operação Tática",
    description:
      "A etapa final prepara você para o ritmo da Central 24 horas. Simule casos reais de sinistro, execute procedimentos de contenção tática, passe pelos simuladores interativos e conquiste seu Certificado Oficial AtlasGR.",
    highlights: [
      "Procedimentos padrão em incidentes e suspeita de furto",
      "Comunicação tática com motoristas e forças de apoio",
      "Simulador prático de tomada de decisão com pontuação mínima de 70%",
    ],
    audioNarrative:
      "Por fim, você entra na Sala de Guerra 24 horas: protocolos de emergência, casos reais de sinistro e simuladores táticos para você obter a certificação profissional de especialista homologado.",
  },
];

export function CourseMediaHero() {
  const [activeTab, setActiveTab] = useState<"course-trailer" | "institutional-yt">("course-trailer");
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChapter = CHAPTERS[activeChapterIndex];

  // Narração com Web Speech API quando disponível
  const speakNarrative = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Ciclo automático de reprodução do trailer interativo
  useEffect(() => {
    if (isPlaying) {
      speakNarrative(currentChapter.audioNarrative);
      const intervalMs = 100;
      const totalChapterTimeMs = 8000; // 8 segundos por capítulo
      const step = (intervalMs / totalChapterTimeMs) * 100;

      timerRef.current = setInterval(() => {
        setProgressPct((prev) => {
          if (prev >= 100) {
            setActiveChapterIndex((idx) => {
              const next = (idx + 1) % CHAPTERS.length;
              return next;
            });
            return 0;
          }
          return prev + step;
        });
      }, intervalMs);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, activeChapterIndex, isMuted]);

  const handleTogglePlay = () => {
    playUiSound("pop");
    setIsPlaying(!isPlaying);
  };

  const handleSelectChapter = (index: number) => {
    playUiSound("click");
    setActiveChapterIndex(index);
    setProgressPct(0);
    if (isPlaying) {
      speakNarrative(CHAPTERS[index].audioNarrative);
    }
  };

  const handleTabChange = (tab: "course-trailer" | "institutional-yt") => {
    playUiSound("click");
    if (isPlaying) setIsPlaying(false);
    setActiveTab(tab);
  };

  return (
    <section className="relative rounded-3xl border border-border bg-surface shadow-xl overflow-hidden mb-12 select-none">
      {/* Top Header Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-border px-6 py-4 bg-surface-2/60 gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-atlas-orange animate-pulse" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] font-mono text-foreground">
            CineAtlas • Multimídia Educacional & Institucional
          </h2>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-surface border border-border">
          <button
            onClick={() => handleTabChange("course-trailer")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === "course-trailer"
                ? "bg-atlas-orange text-white shadow-sm scale-102"
                : "text-muted hover:text-foreground"
            )}
          >
            <Tv size={14} />
            Apresentação do Curso
          </button>
          <button
            onClick={() => handleTabChange("institutional-yt")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === "institutional-yt"
                ? "bg-atlas-orange text-white shadow-sm scale-102"
                : "text-muted hover:text-foreground"
            )}
          >
            <Video size={15} />
            Vídeo Institucional AtlasGR
          </button>
        </div>
      </div>

      {/* Conteúdo da Aba 1: Apresentação Interativa do Curso */}
      {activeTab === "course-trailer" && (
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Canvas Cinematográfico 16:9 */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-video bg-black border border-border shadow-2xl group">
              {/* Imagem do Capítulo Atual */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentChapter.id}
                  src={currentChapter.image}
                  alt={currentChapter.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Degradê de proteção de texto e iluminação */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-atlas-orange text-white shadow-md">
                  <Sparkles size={12} /> {currentChapter.badge}
                </span>
              </div>

              {/* Informações Sobrepostas no Vídeo */}
              <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-atlas-orange font-bold">
                  {currentChapter.subtitle}
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-display leading-tight drop-shadow-md">
                  {currentChapter.title}
                </h3>
              </div>

              {/* Controles de Reprodução Central */}
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <button
                  onClick={handleTogglePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-atlas-orange/90 hover:bg-atlas-orange text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,86,24,0.6)] hover:scale-110 active:scale-95 transition-all"
                  aria-label={isPlaying ? "Pausar apresentação" : "Reproduzir apresentação"}
                >
                  {isPlaying ? <Pause size={30} className="fill-white" /> : <Play size={30} className="fill-white translate-x-0.5" />}
                </button>
              </div>

              {/* Barra de Progresso do Capítulo */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-40">
                <div
                  className="h-full bg-atlas-orange transition-all ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Botão de Áudio Mute */}
              <div className="absolute top-4 right-4 z-40">
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (typeof window !== "undefined" && "speechSynthesis" in window && !isMuted) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-colors"
                  title={isMuted ? "Ativar áudio de narração" : "Desativar áudio"}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>

            {/* Coluna Lateral: Guia dos 4 Pilares da Formação */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-atlas-orange font-mono">
                  O que você vai aprender
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-foreground mt-1">
                  15 Módulos de Pura Especialização
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  {currentChapter.description}
                </p>

                {/* Lista de Competências Principais */}
                <div className="mt-4 space-y-2">
                  {currentChapter.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-foreground">
                      <CheckCircle2 size={15} className="text-atlas-orange shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seletor Rápido de Capítulos da Apresentação */}
              <div className="pt-4 border-t border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted font-mono mb-2.5">
                  Capítulos do Trailer (Clique para navegar):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CHAPTERS.map((chap, idx) => {
                    const isCurrent = idx === activeChapterIndex;
                    return (
                      <button
                        key={chap.id}
                        onClick={() => handleSelectChapter(idx)}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all flex items-center justify-between",
                          isCurrent
                            ? "bg-atlas-orange/10 border-atlas-orange text-atlas-orange font-bold shadow-xs"
                            : "bg-surface-2 hover:bg-surface border-border text-muted hover:text-foreground"
                        )}
                      >
                        <div className="truncate pr-2">
                          <span className="text-[10px] block font-mono">Fase {chap.id}</span>
                          <span className="text-xs truncate block">{chap.title.split(",")[0]}</span>
                        </div>
                        <ChevronRight size={14} className={isCurrent ? "text-atlas-orange" : "text-muted/50"} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: Vídeo Institucional YouTube */}
      {activeTab === "institutional-yt" && (
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Player Iframe 16:9 Oficial */}
            <div className="lg:col-span-8 relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_INSTITUTIONAL_ID}?autoplay=1&rel=0&hl=pt-BR`}
                title="Vídeo Institucional AtlasGR — Gerenciamento de Risco"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Detalhes Institucionais da Companhia */}
            <div className="lg:col-span-4 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-red-500/15 text-red-600 border border-red-500/30">
                <Video size={13} /> Oficial AtlasGR
              </span>

              <h3 className="text-xl sm:text-2xl font-black font-display text-foreground leading-tight">
                AtlasGR Gerenciamento de Risco
              </h3>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Assista ao vídeo institucional e conheça a estrutura que monitora cargas em todo o território nacional. Tecnologia própria, infraestrutura 24/7 e uma equipe altamente capacitada para proteger operações de transporte e logística.
              </p>

              <div className="pt-4 border-t border-border space-y-2.5 text-xs text-muted font-medium">
                <div className="flex items-center justify-between">
                  <span>Operação:</span>
                  <strong className="text-foreground">24 Horas / 365 Dias</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cobertura:</span>
                  <strong className="text-foreground">Nacional (Brasil)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tecnologias Integradas:</span>
                  <strong className="text-foreground">+35 Rastreadores</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
