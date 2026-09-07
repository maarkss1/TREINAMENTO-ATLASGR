import type { ContentBlock, ModuleContentFull } from "@/lib/types";
import { getModuleMeta } from "@/content/modules/meta";

export interface ChapterInput {
  id: string;
  title: string;
  heading: string;
  paragraphs: string[];
  whyItMatters: string;
  checklist?: string[];
  comparison?: {
    title: string;
    left: { label: string; points: string[] };
    right: { label: string; points: string[] };
  };
  faq?: { q: string; a: string }[];
  caseStudy?: { title: string; text: string; source: string };
}

export interface MediaInput {
  youtubeId: string;
  title: string;
  caption: string;
  transcript: string[];
  source: string;
}

export interface ModuleV2Input {
  slug: string;
  sources: string[];
  objectives: string[];
  scenario: string;
  introHeading: string;
  intro: string[];
  chapters: ChapterInput[];
  summary: string[];
  finalChecklist: string[];
  mindMap: { root: string; branches: { label: string; items: string[] }[] };
  diagram: { title: string; chart: string };
  media?: MediaInput;
}

function paragraph(text: string): string[] {
  return [text];
}

function escapeSvgText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// 15 Ilustrações Técnicas e Vetoriais dedicadas a cada domínio de Gerenciamento de Risco e Logística AtlasGR
function getModuleVisualArtifact(moduleNum: number, accent: string): string {
  switch (moduleNum) {
    case 1:
      // Torre de Controle & Propósito Institucional
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <circle cx="190" cy="150" r="110" fill="none" stroke="${accent}" stroke-opacity="0.15" stroke-dasharray="6 6"/>
          <circle cx="190" cy="150" r="70" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="2"/>
          <circle cx="190" cy="150" r="28" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="3"/>
          <path d="M190 40 L190 260 M80 150 L300 150" stroke="${accent}" stroke-opacity="0.3" stroke-width="1.5"/>
          <circle cx="235" cy="110" r="7" fill="#10B981"/>
          <circle cx="145" cy="190" r="7" fill="${accent}"/>
          <rect x="25" y="240" width="330" height="38" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="264" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#E2E8F0">TORRE DE OPERAÇÕES 24/7 • DESDE 2004</text>
        </g>
      `;
    case 2:
      // Supply Chain & Malha Rodoviária Logística
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <path d="M40 220 Q120 80 200 160 T340 100" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
          <circle cx="40" cy="220" r="14" fill="#0D0E15" stroke="${accent}" stroke-width="3"/>
          <circle cx="200" cy="160" r="14" fill="#0D0E15" stroke="#38BDF8" stroke-width="3"/>
          <circle cx="340" cy="100" r="14" fill="#0D0E15" stroke="#10B981" stroke-width="3"/>
          <text x="40" y="255" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#94A3B8">EMBARCADOR</text>
          <text x="200" y="195" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#94A3B8">ROTA / PGR</text>
          <text x="340" y="135" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#94A3B8">DESTINO</text>
          <rect x="25" y="20" width="330" height="42" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="46" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="700" fill="#38BDF8">FLUXO DE CARGA • RASTREABILIDADE TOTAL</text>
        </g>
      `;
    case 3:
      // PGR & Matriz de Gerenciamento de Risco
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <path d="M190 50 L290 90 L290 190 Q190 260 190 260 Q90 190 90 90 Z" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-width="3"/>
          <path d="M190 80 L260 110 L260 180 Q190 230 190 230 Q120 180 120 110 Z" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <circle cx="190" cy="150" r="24" fill="${accent}"/>
          <path d="M182 150 L188 156 L199 144" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <rect x="25" y="245" width="330" height="38" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="269" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#F87171">BLINDAGEM OPERACIONAL & MATRIZ PGR</text>
        </g>
      `;
    case 4:
      // 4 Pilares do Portfólio AtlasGR
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <g transform="translate(25 25)">
            <rect width="155" height="110" rx="14" fill="#161722" stroke="${accent}" stroke-opacity="0.4"/>
            <text x="77" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="800" fill="#FFFFFF">PROFILE</text>
            <text x="77" y="75" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94A3B8">Cadastro & Vetting</text>
          </g>
          <g transform="translate(200 25)">
            <rect width="155" height="110" rx="14" fill="#161722" stroke="#38BDF8" stroke-opacity="0.4"/>
            <text x="77" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="800" fill="#FFFFFF">CONNECT</text>
            <text x="77" y="75" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94A3B8">Software Logístico</text>
          </g>
          <g transform="translate(25 155)">
            <rect width="155" height="110" rx="14" fill="#161722" stroke="#EF4444" stroke-opacity="0.4"/>
            <text x="77" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="800" fill="#FFFFFF">ATLAS GR</text>
            <text x="77" y="75" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94A3B8">PGR & Prevenção</text>
          </g>
          <g transform="translate(200 155)">
            <rect width="155" height="110" rx="14" fill="#161722" stroke="#F59E0B" stroke-opacity="0.4"/>
            <text x="77" y="50" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="800" fill="#FFFFFF">ANALYTICS</text>
            <text x="77" y="75" text-anchor="middle" font-family="system-ui" font-size="11" fill="#94A3B8">BI & Inteligência</text>
          </g>
        </g>
      `;
    case 5:
      // Sistema Atlas Connect & Telemetria
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <rect x="25" y="25" width="330" height="180" rx="14" fill="#141824" stroke="#38BDF8" stroke-opacity="0.3"/>
          <circle cx="70" cy="65" r="22" fill="#38BDF8" fill-opacity="0.2" stroke="#38BDF8" stroke-width="2"/>
          <text x="70" y="70" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#38BDF8">-18°C</text>
          <text x="110" y="60" font-family="system-ui" font-size="13" font-weight="700" fill="#FFFFFF">SENSOR DE TEMPERATURA</text>
          <text x="110" y="78" font-family="system-ui" font-size="11" fill="#10B981">Faixa Operacional Conforme</text>
          <line x1="45" y1="110" x2="335" y2="110" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <rect x="45" y="130" width="120" height="55" rx="8" fill="#1E2333"/>
          <text x="55" y="150" font-family="system-ui" font-size="10" fill="#94A3B8">TEMPO EM ALVO</text>
          <text x="55" y="172" font-family="monospace" font-size="16" font-weight="800" fill="#FFFFFF">01h 42m</text>
          <rect x="185" y="130" width="150" height="55" rx="8" fill="#1E2333"/>
          <text x="195" y="150" font-family="system-ui" font-size="10" fill="#94A3B8">STATUS DA VIAGEM</text>
          <text x="195" y="172" font-family="system-ui" font-size="13" font-weight="800" fill="#10B981">EM ROTA MONITORADA</text>
          <rect x="25" y="225" width="330" height="50" rx="12" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="255" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#60A5FA">ATLAS CONNECT • VISIBILIDADE OPERACIONAL</text>
        </g>
      `;
    case 6:
      // Atlas Profile & Vetting de Motoristas
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <rect x="35" y="30" width="310" height="190" rx="16" fill="#16152B" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <circle cx="95" cy="95" r="38" fill="#252140" stroke="${accent}" stroke-width="2"/>
          <path d="M95 80 A14 14 0 1 0 95 108 A14 14 0 1 0 95 80" fill="${accent}"/>
          <rect x="155" y="65" width="165" height="12" rx="6" fill="#FFFFFF" fill-opacity="0.8"/>
          <rect x="155" y="88" width="120" height="10" rx="5" fill="#94A3B8" fill-opacity="0.5"/>
          <rect x="155" y="110" width="90" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
          <text x="200" y="125" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="800" fill="#34D399">APROVADO PGR</text>
          <rect x="25" y="240" width="330" height="40" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="265" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#C084FC">BIOMETRIA, COMPLIANCE E VETTING DE RISCO</text>
        </g>
      `;
    case 7:
      // Integrações & APIs
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <circle cx="190" cy="130" r="45" fill="#12251D" stroke="${accent}" stroke-width="3"/>
          <text x="190" y="135" text-anchor="middle" font-family="monospace" font-size="14" font-weight="800" fill="#34D399">API HUB</text>
          <circle cx="65" cy="70" r="28" fill="#161722" stroke="#94A3B8" stroke-width="2"/>
          <text x="65" y="75" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#E2E8F0">TMS</text>
          <circle cx="65" cy="190" r="28" fill="#161722" stroke="#94A3B8" stroke-width="2"/>
          <text x="65" y="195" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#E2E8F0">ERP</text>
          <circle cx="315" cy="70" r="28" fill="#161722" stroke="#94A3B8" stroke-width="2"/>
          <text x="315" y="75" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#E2E8F0">GPS</text>
          <circle cx="315" cy="190" r="28" fill="#161722" stroke="#94A3B8" stroke-width="2"/>
          <text x="315" y="195" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#E2E8F0">ISCAS</text>
          <line x1="93" y1="80" x2="148" y2="115" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="93" y1="180" x2="148" y2="145" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="287" y1="80" x2="232" y2="115" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4"/>
          <line x1="287" y1="180" x2="232" y2="145" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4"/>
          <rect x="25" y="245" width="330" height="38" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="269" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#34D399">ECOSSISTEMA MULTIMARCAS & WEBHOOKS</text>
        </g>
      `;
    case 11:
      // Operação & Central 24/7
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <rect x="30" y="30" width="320" height="185" rx="14" fill="#0F172A" stroke="#38BDF8" stroke-opacity="0.3"/>
          <g transform="translate(45 45)">
            <rect width="85" height="38" rx="8" fill="#EF4444" fill-opacity="0.2" stroke="#EF4444"/>
            <text x="42" y="24" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#EF4444">P1 CRÍTICO</text>
          </g>
          <g transform="translate(145 45)">
            <rect width="85" height="38" rx="8" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B"/>
            <text x="42" y="24" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#F59E0B">P2 ALERTA</text>
          </g>
          <g transform="translate(245 45)">
            <rect width="85" height="38" rx="8" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6"/>
            <text x="42" y="24" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#3B82F6">P3 INFO</text>
          </g>
          <rect x="45" y="105" width="285" height="42" rx="8" fill="#1E293B"/>
          <text x="60" y="125" font-family="system-ui" font-size="11" font-weight="700" fill="#FFFFFF">Desvio de Rota Não Autorizado</text>
          <text x="60" y="139" font-family="system-ui" font-size="10" fill="#94A3B8">Veículo ABC-1234 • Tratativa em andamento</text>
          <rect x="25" y="240" width="330" height="40" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="265" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#38BDF8">TORRE 24/7 • PROTOCOLO E SLA RIGOROSO</text>
        </g>
      `;
    case 13:
      // Tecnologia & IA Preditiva
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <g transform="translate(50 50)">
            <circle cx="40" cy="40" r="16" fill="#2E1065" stroke="${accent}" stroke-width="2"/>
            <circle cx="40" cy="140" r="16" fill="#2E1065" stroke="${accent}" stroke-width="2"/>
            <circle cx="140" cy="20" r="16" fill="#2E1065" stroke="${accent}" stroke-width="2"/>
            <circle cx="140" cy="90" r="16" fill="#2E1065" stroke="${accent}" stroke-width="2"/>
            <circle cx="140" cy="160" r="16" fill="#2E1065" stroke="${accent}" stroke-width="2"/>
            <circle cx="240" cy="90" r="22" fill="${accent}" stroke="#FFFFFF" stroke-width="3"/>
            <line x1="56" y1="40" x2="124" y2="20" stroke="${accent}" stroke-width="2" stroke-opacity="0.6"/>
            <line x1="56" y1="40" x2="124" y2="90" stroke="${accent}" stroke-width="2" stroke-opacity="0.6"/>
            <line x1="56" y1="140" x2="124" y2="90" stroke="${accent}" stroke-width="2" stroke-opacity="0.6"/>
            <line x1="56" y1="140" x2="124" y2="160" stroke="${accent}" stroke-width="2" stroke-opacity="0.6"/>
            <line x1="156" y1="20" x2="218" y2="90" stroke="${accent}" stroke-width="2.5"/>
            <line x1="156" y1="90" x2="218" y2="90" stroke="${accent}" stroke-width="2.5"/>
            <line x1="156" y1="160" x2="218" y2="90" stroke="${accent}" stroke-width="2.5"/>
            <text x="240" y="96" text-anchor="middle" font-family="monospace" font-size="12" font-weight="900" fill="#FFFFFF">IA</text>
          </g>
          <rect x="25" y="245" width="330" height="38" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="269" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#E879F9">MODELOS PREDITIVOS & DETECÇÃO DE ANOMALIAS</text>
        </g>
      `;
    default:
      // Layout Padrão de Alta Tecnologia para os demais módulos
      return `
        <g transform="translate(730 160)">
          <rect width="380" height="300" rx="24" fill="#0D0E15" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
          <circle cx="190" cy="135" r="75" fill="none" stroke="${accent}" stroke-width="3" stroke-opacity="0.3"/>
          <circle cx="190" cy="135" r="45" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="2"/>
          <rect x="175" y="105" width="30" height="60" rx="6" fill="${accent}"/>
          <rect x="155" y="125" width="70" height="20" rx="6" fill="${accent}"/>
          <rect x="25" y="240" width="330" height="40" rx="10" fill="#161722" stroke="#FFFFFF" stroke-opacity="0.1"/>
          <text x="190" y="265" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#E2E8F0">ACADEMIA CORPORATIVA ATLASGR • EXCELÊNCIA</text>
        </g>
      `;
  }
}

function academyIllustration(meta: { number: number; title: string; category?: string }): string {
  const title = escapeSvgText(meta.title);
  const category = escapeSvgText(meta.category || "Academia ATLASGR");
  const titleSize = meta.title.length > 38 ? 32 : meta.title.length > 28 ? 38 : 44;
  const accent = meta.number % 3 === 0 ? "#FFC500" : meta.number % 2 === 0 ? "#38BDF8" : "#FF5618";
  const moduleNumber = String(meta.number).padStart(2, "0");

  const visualArtifact = getModuleVisualArtifact(meta.number, accent);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc">
      <title id="title">Ilustração do módulo ${moduleNumber}: ${title}</title>
      <desc id="desc">Infográfico técnico da Academia ATLASGR para o módulo ${moduleNumber}.</desc>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#08090D"/>
          <stop offset="0.5" stop-color="#10121A"/>
          <stop offset="1" stop-color="#07080B"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.82" cy="0.3" r="0.65">
          <stop offset="0" stop-color="${accent}" stop-opacity="0.32"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="675" rx="34" fill="url(#bg)"/>
      <rect width="1200" height="675" rx="34" fill="url(#grid)"/>
      <rect width="1200" height="675" rx="34" fill="url(#glow)"/>

      <!-- Linhas de radar e telemetria sutil de fundo -->
      <g opacity="0.2" stroke="${accent}" stroke-width="1.5" fill="none">
        <circle cx="1000" cy="200" r="280" stroke-dasharray="8 8"/>
        <circle cx="1000" cy="200" r="160"/>
        <line x1="1000" y1="40" x2="1000" y2="360"/>
        <line x1="840" y1="200" x2="1160" y2="200"/>
      </g>

      <!-- Painel Textual Esquerdo -->
      <g transform="translate(80 110)">
        <rect width="130" height="38" rx="19" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.4"/>
        <text x="65" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="900" letter-spacing="1" fill="${accent}">MÓDULO ${moduleNumber}</text>
        <text x="0" y="85" font-family="monospace" font-size="14" font-weight="700" letter-spacing="4" fill="#94A3B8">ATLASGR ENTERPRISE LEARNING</text>
        <text x="0" y="160" font-family="system-ui, sans-serif" font-size="${titleSize}" font-weight="900" fill="#FFFFFF">${title}</text>
        <text x="0" y="210" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="${accent}">${category}</text>
      </g>

      <!-- Artefatos Gráficos e Diagramas Específicos do Módulo -->
      ${visualArtifact}

      <!-- Rodapé do Card -->
      <rect x="80" y="570" width="1040" height="1" fill="#FFFFFF" opacity="0.12"/>
      <text x="80" y="618" font-family="monospace" font-size="14" fill="#94A3B8">SEGURANÇA • INTELIGÊNCIA LOGÍSTICA • TELEMETRIA • PGR EM TEMPO REAL</text>
      <circle cx="1100" cy="612" r="8" fill="${accent}"/>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function chapterBlocks(chapter: ChapterInput): ContentBlock[] {
  // Roteiro narrado fluído para áudio executivo
  const cleanNarration = `${chapter.heading}. ${chapter.paragraphs.join(" ")} No dia a dia da operação AtlasGR: ${chapter.whyItMatters}`;

  const blocks: ContentBlock[] = [
    {
      type: "text",
      heading: chapter.heading,
      paragraphs: chapter.paragraphs.map(paragraph),
    },
    {
      type: "audio",
      title: `Atlas Podcast • ${chapter.title}`,
      caption: "Briefing executivo narrado com os pontos críticos operacionais e tomada de decisão.",
      text: cleanNarration,
    },
    {
      type: "callout",
      variant: "info",
      title: "Aplicação Prática na Central e em Campo",
      text: paragraph(chapter.whyItMatters),
    },
  ];

  if (chapter.checklist?.length) {
    blocks.push({ type: "checklist", title: "Protocolo Operacional de Aplicação", items: chapter.checklist });
  }
  if (chapter.comparison) {
    blocks.push({ type: "comparison", ...chapter.comparison });
  }
  if (chapter.caseStudy) {
    blocks.push({ type: "case", ...chapter.caseStudy });
  }
  if (chapter.faq?.length) {
    blocks.push({ type: "faq", items: chapter.faq });
  }

  return blocks;
}

export function buildModuleV2(input: ModuleV2Input): ModuleContentFull {
  const meta = getModuleMeta(input.slug);
  if (!meta) throw new Error(`Module meta not found: ${input.slug}`);

  const introBlocks: ContentBlock[] = [];
  if (meta.imageUrl) {
    const imageUrl = meta.imageUrl.startsWith("/brand/modules/") ? academyIllustration(meta) : meta.imageUrl;
    introBlocks.push({
      type: "image",
      url: imageUrl,
      alt: `Infográfico técnico do módulo: ${meta.title}`,
      caption: meta.imageCaption || `Visão geral e arquitetura de ${meta.title}`,
      credit: "AtlasGR Inteligência Logística • Acervo Oficial",
    });
  }

  introBlocks.push({
    type: "text",
    heading: input.introHeading,
    paragraphs: input.intro.map(paragraph),
  });

  introBlocks.push({
    type: "audio",
    title: `Resumo em Áudio • ${meta.title}`,
    caption: "Visão estratégica narrada dos conceitos e fluxos centrais deste treinamento.",
    text: input.intro.join(" "),
  });

  if (input.media) {
    introBlocks.push({
      type: "video",
      youtubeId: input.media.youtubeId,
      title: input.media.title,
      caption: input.media.caption,
      transcript: input.media.transcript,
      source: input.media.source,
    });
  }

  return {
    ...meta,
    sources: input.sources,
    objectives: input.objectives,
    scenario: input.scenario,
    sections: [
      { id: "abertura", title: "Contexto Operacional", blocks: introBlocks },
      ...input.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        blocks: chapterBlocks(chapter),
      })),
    ],
    summary: input.summary,
    finalChecklist: input.finalChecklist,
    mindMap: input.mindMap,
    diagram: input.diagram,
  };
}
