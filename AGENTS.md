# AGENTS.md — Governança Multiagente da Academia ATLASGR

## Projeto
TREINAMENTO-ATLASGR

Monorepo Turborepo da Academia ATLASGR para onboarding, capacitação e validação de domínio. A arquitetura real inclui `apps/portal`, `apps/api`, `apps/admin`, `apps/worker` e pacotes compartilhados de LMS, auth, analytics, certificados, conteúdo, busca, banco, design system, gamificação, notificações, storage e tracking.

## Roster oficial
- 00 — Coordenador e Arquitetura de Aprendizagem
- 01 — Plataforma, API, Banco, Auth e Segurança
- 02 — Currículo, Conteúdo e Integridade Pedagógica
- 03 — Portal do Aluno, UX, Acessibilidade e Multimídia
- 04 — Admin, Autoria e Operação de Conteúdo
- 05 — Avaliações, Certificados e Gamificação
- 06 — Busca, Indexação, Glossário e Conhecimento
- 07 — Analytics, Tracking e Learning Intelligence
- 08 — Workers, Notificações, Storage e Jobs
- 09 — Design System, Marca e UI Compartilhada
- 10 — QA, Monorepo, E2E e Release

Prompts oficiais: `.agents/prompts/`.

## Princípios globais
1. A fonte de verdade do currículo V2 é `apps/portal/content/academy-v2/`, `quizzes-v2/`, `learning-blueprint.ts` e `glossary.ts`.
2. Conteúdo antigo não deve voltar ao runtime por acidente.
3. Não inventar afirmações institucionais, técnicas, regulatórias ou de produto. Conteúdo educacional deve preservar fonte e distinção entre conceito, evidência, regra, hipótese e decisão.
4. Acessibilidade é requisito de produto: transcrição, texto alternativo, teclado, foco, contraste, VLibras e fallback de serviços externos.
5. Mudanças em progresso, avaliação, domínio ou certificado exigem regras determinísticas e testes.
6. Dados de colaboradores e aprendizagem são dados pessoais; aplicar minimização, autorização e retenção adequada.
7. Respeitar boundaries de workspaces. Não importar internals de outro pacote quando existir API pública.
8. Antes de release: `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` quando o portal/jornada for afetado.
9. Nunca editar prompt de outro agente durante uma missão. Use handoff.
10. Nenhum agente pode declarar release isoladamente; 10 emite PASS/BLOCKED e 00 consolida.

## Propriedade principal
- 01: `apps/api`, `packages/database`, `packages/auth`, contratos de segurança e persistência.
- 02: currículo V2, quizzes, blueprints, fontes, conteúdo educacional e coerência pedagógica.
- 03: `apps/portal`, mídia, players, navegação, acessibilidade e experiência do aluno.
- 04: `apps/admin`, autoria, publicação, lifecycle editorial e operações de conteúdo.
- 05: `packages/lms`, `packages/certificates`, `packages/gamification`, avaliações e regras de domínio.
- 06: `packages/content-indexer`, `packages/search`, `packages/glossary` e recuperação de conhecimento.
- 07: `packages/analytics`, `packages/tracking`, métricas de aprendizagem e mapas de domínio.
- 08: `apps/worker`, `packages/notifications`, `packages/storage` e processamento assíncrono.
- 09: `packages/design-system`, `packages/ui`, tokens, marca e componentes compartilhados.
- 10: testes, CI, Turbo gates, E2E, regressão e release.

## Handoffs
Criar `.agents/handoffs/<de>-para-<para>-<slug>.md` com problema, evidência, arquivos, alteração necessária, teste esperado e prioridade.

## Concorrência
Trabalhos paralelos devem usar branches/worktrees separados. Arquivos de configuração raiz, lockfile e contratos compartilhados têm owner único por missão.