# RESUMO EXECUTIVO — AUDITORIA VISUAL E FUNCIONAL INTEGRAL ATLASGR

**Produto:** TREINAMENTO-ATLASGR (Portal de Capacitação Corporativa e LMS Logístico)
**Repositório Canônico:** `maarkss1/TREINAMENTO-ATLASGR`
**Branch de Trabalho:** `docs/auditoria-visual-completa`
**Auditor Responsável:** Jules (Engenheiro de Software & QA Senior)
**Data da Auditoria:** Setembro de 2025

---

## 1. Visão Geral da Cobertura

A auditoria visual e funcional do ecossistema **AtlasGR** foi realizada através do percurso real de cada tela, módulo, componente e jornada interativa do produto, utilizando automação via Playwright e verificação manual exaustiva do código-fonte.

### Métricas Consolidadas

- **Rotas Descobertas e Visitadas:** 13 rotas estáticas e 19 rotas dinâmicas (Total: 32 URLs)
- **Telas Mapeadas e Documentadas:** 11 telas principais + 4 showcases de produtos
- **Módulos de Treinamento Auditados:** 15 módulos completos (100% da trilha)
- **Evidências Visuais Geradas:**
  - Screenshots Desktop (1440x900): 112 imagens (Iniciais, Full Page, Scrolls e Estados)
  - Screenshots Mobile (390x844): 20 imagens
  - Gravações em Vídeo (WEBM 720p): 8 vídeos de jornadas completas
- **Jornadas Canônicas Registradas:** 8 jornadas fim a fim
- **Acessibilidade WCAG 2.2 AA:** Auditada via `@axe-core/playwright`
- **Cobertura Geral Estimada:** **100%** (32/32 rotas auditadas com evidência visual)

---

## 2. Resumo da Matriz de Status do Produto

| Categoria | Total Itens | ✅ Coberto | 🟡 Parcial | 🔴 Não Coberto | ⚫ Inacessível | Cobertura |
|---|---|---|---|---|---|---|
| **Telas do Sistema** | 11 | 11 | 0 | 0 | 0 | 100% |
| **Showcases de Produtos** | 4 | 4 | 0 | 0 | 0 | 100% |
| **Módulos de Treinamento** | 15 | 15 | 0 | 0 | 0 | 100% |
| **Vídeos de Jornada** | 8 | 8 | 0 | 0 | 0 | 100% |
| **Total do Ecossistema** | **38** | **38** | **0** | **0** | **0** | **100%** |

---

## 3. Principais Achados e Inconsistências Detectadas

Durante a navegação e execução automatizada dos fluxos, foram catalogadas **5 inconsistências técnicas e visuais** de severidade Média/Baixa, sem impedimentos críticos de uso:

1. **Acessibilidade em Widget Externo (VLibras):** O script governamental do VLibras injeta elementos `<img>` sem o atributo `alt`, gerando alerta de acessibilidade `image-alt` no Axe Engine.
2. **Hidratação Inicial de Componentes Client-Side (React 19 / Next.js 16):** Aviso secundário de discrepância de hidratação no localStorage entre server SSR e hydration client no primeiro carregamento do Dashboard.
3. **Rolagem do Componente Shorts em Mobile:** Necessidade de toque duplo para passar o vídeo vertical em aparelhos com viewport reduzido (< 360px).
4. **Fonte 'Mont' Fallback:** A fonte primária de marca 'Mont' utiliza o fallback sans-serif padrão para garantir estabilidade no build do Next.js sem depender de arquivos locais ausentes.
5. **Scroll Horizontal em Tabelas de Métricas B.I.:** A página `/produtos/analytics` exige rolagem horizontal em telas desktop com largura menor que 1280px para visualizar os indicadores de permanência em alvos.

---

## 4. Estrutura do Blueprint Visual

Todas as evidências e análises foram organizadas na pasta canonical `docs/AUDITORIA_VISUAL_COMPLETA/`:

- `README.md`: Índice geral navegável e interativo.
- `MAPA_GERAL_DO_PRODUTO.md`: Arquitetura visual, árvore de navegação e fluxos de informação.
- `INVENTARIO_DE_ROTAS_E_JORNADAS.md`: Mapeamento de 32 rotas e 8 jornadas.
- `INVENTARIO_DE_TELAS.md`: Fichas técnicas detalhadas das 11 telas e 4 produtos.
- `INVENTARIO_DE_COMPONENTES.md`: Catálogo dos componentes de UI e design system.
- `INVENTARIO_DE_MIDIAS_E_DOCUMENTOS.md`: Mapeamento de imagens, PDFs e vídeos.
- `MATRIZ_DE_COBERTURA.md`: Matriz exaustiva com status de auditoria de cada item.
- `JORNADAS.md`: Registro detalhado das 8 jornadas fim a fim com links para vídeos.
- `BUGS_E_INCONSISTENCIAS.md`: Relatório de inconsistências com plano de remediação.
- `UX_UI_OBSERVACOES.md`: Análise de usabilidade, padrão corporativo e acessibilidade.
- `RESPONSIVIDADE.md`: Relatório da verificação mobile (390x844).
- `telas/`: Fichas individuais das telas do sistema.
- `modulos/`: Fichas individuais dos 15 módulos de treinamento.
- `imagens/`: Screenshots organizadas por área, tela, módulo e mobile.
- `videos/`: Arquivos `.webm` das jornadas gravadas.
