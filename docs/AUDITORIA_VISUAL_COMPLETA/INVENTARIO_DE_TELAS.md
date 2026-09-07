# INVENTÁRIO DE TELAS E SHOWCASES — ATLASGR

Este inventário cataloga individualmente as 11 telas principais e os 4 showcases de produtos da plataforma **AtlasGR**, acompanhados das especificações funcionais e links diretos para as evidências visuais capturadas.

---

## 1. Landing Page / Apresentação (`/`)

- **URL Canonical:** `/`
- **Arquivo de Código:** `apps/portal/app/page.tsx`
- **Objetivo:** Apresentar a AtlasGR, os pilares de gerenciamento de risco e os CTAs de acesso ao portal e onboarding.
- **Componentes Principais:** `SiteHeader`, `TerminalWindow`, `ArchitectureFlow`, `ValueMetricsCards`, `SiteFooter`.
- **Interações Principais:** Botão "Iniciar Treinamento" (Abre Modal de Registro), Navegação Header, Transição de abas e rolagem interativa.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/home/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/home/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/home/01-mobile-view.png`
  - Vídeo da Jornada: `videos/01-home-ate-dashboard.webm`

---

## 2. Dashboard do Aluno (`/dashboard`)

- **URL Canonical:** `/dashboard`
- **Arquivo de Código:** `apps/portal/app/dashboard/page.tsx`
- **Objetivo:** Cockpit central do aluno com progresso geral, métricas de XP, próximo módulo recomendado e atalhos de navegação.
- **Componentes Principais:** `LevelProgressBar`, `GamificationHeader`, `ModuleCardGrid`, `QuickActionsBar`.
- **Interações Principais:** Seleção de módulos, verificação de badges, atalho para prova final e certificado.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/dashboard/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/dashboard/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/dashboard/01-mobile-view.png`
  - Vídeo da Jornada: `videos/01-home-ate-dashboard.webm`

---

## 3. Trilha de Conhecimento (`/trilha`)

- **URL Canonical:** `/trilha`
- **Arquivo de Código:** `apps/portal/app/trilha/page.tsx`
- **Objetivo:** Apresentar a jornada estruturada dos 15 módulos dividida por categorias temáticas.
- **Componentes Principais:** `CategoryFilterTabs`, `TrailModuleCard`, `TrailProgressBar`.
- **Interações Principais:** Filtragem por Fundamentos, Negócios, Operação e Tecnologia; Clique no módulo para iniciar estudo.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/trilha/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/trilha/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/trilha/01-mobile-view.png`
  - Vídeo da Jornada: `videos/02-navegacao-trilha.webm`

---

## 4. Showcase de Produtos (`/produtos`)

- **URL Canonical:** `/produtos`
- **Arquivo de Código:** `apps/portal/app/produtos/page.tsx`
- **Objetivo:** Hub de apresentação dos 4 produtos tecnológicos de gerenciamento de risco da AtlasGR.
- **Componentes Principais:** `ProductHeroGrid`, `ProductFeatureCard`, `CTASection`.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/produtos/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/produtos/02-full-page.png`
  - Vídeo da Jornada: `videos/07-produtos.webm`

---

## 5. Showcase Atlas Profile (`/produtos/profile`)

- **URL Canonical:** `/produtos/profile`
- **Arquivo de Código:** `apps/portal/app/produtos/[slug]/page.tsx`
- **Objetivo:** Demonstrar a inteligência de risco securitário e varredura de perfil profissional com IA e biometria.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/produtos/profile/01-inicio.png`
  - Screenshot Full Page: `imagens/produtos/profile/02-full-page.png`

---

## 6. Showcase Atlas Connect (`/produtos/connect`)

- **URL Canonical:** `/produtos/connect`
- **Arquivo de Código:** `apps/portal/app/produtos/[slug]/page.tsx`
- **Objetivo:** Apresentar a Torre de Controle NewConnect, Fila de Alertas Tática (P1 a P7) e parametrização do PGR no Portal Atlas Core.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/produtos/connect/01-inicio.png`
  - Screenshot Full Page: `imagens/produtos/connect/02-full-page.png`

---

## 7. Showcase Gerenciamento de Risco (`/produtos/gr`)

- **URL Canonical:** `/produtos/gr`
- **Arquivo de Código:** `apps/portal/app/produtos/[slug]/page.tsx`
- **Objetivo:** Explicar a arquitetura de mitigação de sinistros, regras de viagem e atuadores de segurança.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/produtos/gr/01-inicio.png`
  - Screenshot Full Page: `imagens/produtos/gr/02-full-page.png`

---

## 8. Showcase Analytics & B.I. (`/produtos/analytics`)

- **URL Canonical:** `/produtos/analytics`
- **Arquivo de Código:** `apps/portal/app/produtos/[slug]/page.tsx`
- **Objetivo:** Cockpit executivo para análise de rotas de risco, ofensores de safety e SLA de permanência em alvos.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/produtos/analytics/01-inicio.png`
  - Screenshot Full Page: `imagens/produtos/analytics/02-full-page.png`

---

## 9. Pílulas em Vídeo / Shorts (`/shorts`)

- **URL Canonical:** `/shorts`
- **Arquivo de Código:** `apps/portal/app/shorts/page.tsx`
- **Objetivo:** Feed vertical de vídeos curtos orientativos para fixação rápida de conceitos operacionais.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/shorts/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/shorts/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/shorts/01-mobile-view.png`
  - Vídeo da Jornada: `videos/08-shorts-e-glossario.webm`

---

## 10. Prova Final (`/prova-final`)

- **URL Canonical:** `/prova-final`
- **Arquivo de Código:** `apps/portal/app/prova-final/page.tsx`
- **Objetivo:** Avaliação conclusiva composta por 10 questões integradas para homologação de conhecimentos.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/prova-final/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/prova-final/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/prova-final/01-mobile-view.png`
  - Vídeo da Jornada: `videos/04-prova-final.webm`

---

## 11. Certificado Digital (`/certificado`)

- **URL Canonical:** `/certificado`
- **Arquivo de Código:** `apps/portal/app/certificado/page.tsx`
- **Objetivo:** Emissão do documento oficial de capacitação com autenticação via QR Code e exportação em PDF.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/certificado/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/certificado/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/certificado/01-mobile-view.png`
  - Vídeo da Jornada: `videos/05-certificado.webm`

---

## 12. Ranking Global (`/ranking`)

- **URL Canonical:** `/ranking`
- **Arquivo de Código:** `apps/portal/app/ranking/page.tsx`
- **Objetivo:** Tabela de classificação gamificada dos alunos ordenada por pontuação XP e badges.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/ranking/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/ranking/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/ranking/01-mobile-view.png`

---

## 13. Perfil do Usuário (`/profile`)

- **URL Canonical:** `/profile`
- **Arquivo de Código:** `apps/portal/app/profile/page.tsx`
- **Objetivo:** Exibir os dados cadastrais do aluno, histórico de notas e certificados obtidos.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/profile/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/profile/02-full-page.png`

---

## 14. Glossário Técnico (`/glossario`)

- **URL Canonical:** `/glossario`
- **Arquivo de Código:** `apps/portal/app/glossario/page.tsx`
- **Objetivo:** Dicionário interativo com busca instantânea A-Z para consulta de termos logísticos e GR.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/glossario/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/glossario/02-full-page.png`

---

## 15. Painel de Administração (`/admin`)

- **URL Canonical:** `/admin`
- **Arquivo de Código:** `apps/portal/app/admin/page.tsx`
- **Objetivo:** Painel de governança para instrutores e gestores acompanharem o desempenho da turma e métricas de adesão.
- **Evidências Visuais:**
  - Screenshot Inicial: `imagens/telas/admin/01-inicio.png`
  - Screenshot Full Page: `imagens/telas/admin/02-full-page.png`
  - Visualização Mobile: `imagens/mobile/admin/01-mobile-view.png`
  - Vídeo da Jornada: `videos/06-admin.webm`
