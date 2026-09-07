# INVENTÁRIO DE COMPONENTES E DESIGN SYSTEM — ATLASGR

Este inventário mapeia os componentes de interface do usuário organizados em `apps/portal/components` e no pacote compartilhado `packages/ui`.

---

## 1. Componentes de Layout e Navegação (`components/navigation`, `components/layout`)

- `SiteHeader`: Cabeçalho global fixo com logotipo AtlasGR, links de navegação rápida, status do aluno e acionador do modal de login/registro.
- `SiteFooter`: Rodapé institucional com links úteis, direitos autorais e versão do sistema.
- `CategoryFilterTabs`: Abas interativas de filtragem por categoria na Trilha e no Glossário.
- `BreadcrumbTrail`: Navegação em migalhas de pão para orientação no módulo.

---

## 2. Componentes Gamificados e Desempenho (`components/gamification`, `components/quiz`)

- `LevelProgressBar`: Barra de experiência (XP) com cálculo dinâmico de nível do aluno.
- `GamificationHeader`: Widget compacto de progresso, sequência de dias e ranking.
- `QuizModal` / `QuizEngine`: Motor interativo de avaliações com suporte a 10 questões de múltipla escolha e feedback imediato com justificativa técnica.
- `FinalExamEngine`: Interface da Prova Final com cronômetro, navegação entre questões e homologação da nota.

---

## 3. Componentes de Showcase e Demonstração Operacional (`components/showcase`, `components/diagrams`)

- `TerminalWindow`: Simulação de terminal de comando executando varreduras de inteligência securitária do Atlas Profile.
- `ArchitectureFlow`: Diagrama de fluxo vetorial demonstrando a escalada de eventos do rastreador para a Célula de Inteligência Atlas (C.I.A).
- `MapaDoCrime`, `RankingOfensores`, `RepresentatividadeEventos`, `TempoEmAlvosTable`: Widgets de visualização de dados de B.I. e métricas do Cockpit Executivo.

---

## 4. Componentes Base do Design System (Radix UI + Tailwind v4)

- `Button` (`cva` / Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`)
- `Card` / `CardHeader` / `CardContent` / `CardFooter`
- `Dialog` / `Modal` / `Drawer`
- `Tabs` / `Accordion`
- `Tooltip` / `Popover`
- `Badge` / `Progress`
