# MATRIZ DE COBERTURA DA AUDITORIA VISUAL E FUNCIONAL

Esta matriz consolida a verificação exaustiva de todas as rotas, telas, produtos e módulos de treinamento do **Portal AtlasGR**.

---

## Legenda de Status

- `✅ COBERTO`: Auditado em navegador real, rolado integralmente, evidência estática e/ou dinâmica gerada e indexada.
- `🟡 COBERTO PARCIALMENTE`: Auditado com limitação de interação secundária.
- `🔴 NÃO COBERTO`: Não auditado.
- `⚫ NÃO ACESSÍVEL`: Rota ou recurso bloqueado/inexistente.

---

## 1. Telas Principais do Sistema

| ID | Área | URL Canonical | Tela | Scroll Completo | Interações | Viewport Desktop | Viewport Mobile | Screenshots | Vídeo | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| `SCR-01` | Landing Page | `/` | Home / Apresentação | Sim | Botões, Modais, CTAs | 1440x900 | 390x844 | 5 imagens | `01-home-ate-dashboard.webm` | `✅ COBERTO` |
| `SCR-02` | Dashboard | `/dashboard` | Dashboard do Aluno | Sim | Progressos, Atalhos, Cards | 1440x900 | 390x844 | 4 imagens | `01-home-ate-dashboard.webm` | `✅ COBERTO` |
| `SCR-03` | Trilha | `/trilha` | Trilha de Conhecimento | Sim | Filtros Categoria, Cards | 1440x900 | 390x844 | 4 imagens | `02-navegacao-trilha.webm` | `✅ COBERTO` |
| `SCR-04` | Produtos | `/produtos` | Hub de Produtos | Sim | Navegação de Cards | 1440x900 | 390x844 | 4 imagens | `07-produtos.webm` | `✅ COBERTO` |
| `SCR-05` | Shorts | `/shorts` | Feed Vertical de Vídeos | Sim | Controles Vídeo, Scroll | 1440x900 | 390x844 | 4 imagens | `08-shorts-e-glossario.webm` | `✅ COBERTO` |
| `SCR-06` | Prova Final | `/prova-final` | Avaliação Geral LMS | Sim | Questões, Submissão, Timer | 1440x900 | 390x844 | 4 imagens | `04-prova-final.webm` | `✅ COBERTO` |
| `SCR-07` | Certificado | `/certificado` | Emissão de Certificado | Sim | Download PDF, QR Code | 1440x900 | 390x844 | 4 imagens | `05-certificado.webm` | `✅ COBERTO` |
| `SCR-08` | Ranking | `/ranking` | Tabela de Classificação | Sim | Ordenação, Posições | 1440x900 | 390x844 | 4 imagens | `08-shorts-e-glossario.webm` | `✅ COBERTO` |
| `SCR-09` | Perfil | `/profile` | Perfil e Histórico | Sim | Estatísticas, Conquistas | 1440x900 | 390x844 | 4 imagens | `08-shorts-e-glossario.webm` | `✅ COBERTO` |
| `SCR-10` | Glossário | `/glossario` | Dicionário de Termos | Sim | Busca A-Z, Expansão | 1440x900 | 390x844 | 4 imagens | `08-shorts-e-glossario.webm` | `✅ COBERTO` |
| `SCR-11` | Admin | `/admin` | Painel de Gestão | Sim | Tabelas, Filtros, Form | 1440x900 | 390x844 | 4 imagens | `06-admin.webm` | `✅ COBERTO` |

---

## 2. Showcases de Produtos (`/produtos/[slug]`)

| ID | Produto | URL Canonical | Scroll Completo | Interações | Viewport Desktop | Viewport Mobile | Screenshots | Status |
|---|---|---|---|---|---|---|---|---|
| `PRD-01` | Atlas Profile | `/produtos/profile` | Sim | Terminal, Screenshots Reais | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `PRD-02` | Atlas Connect | `/produtos/connect` | Sim | Architecture Flow, Screenshots | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `PRD-03` | Gerenciamento de Risco | `/produtos/gr` | Sim | Diagramas de Risco, Alertas | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `PRD-04` | Analytics & B.I. | `/produtos/analytics` | Sim | Tabelas e Gráficos de B.I. | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |

---

## 3. Módulos de Treinamento (`/trilha/[slug]`)

| ID | Módulo | Slug Canonical | Scroll | Interações / Quiz | Desktop | Mobile | Screenshots | Status |
|---|---|---|---|---|---|---|---|---|
| `MOD-01` | Módulo 01 | `01-bem-vindo-atlasgr` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 5 imagens | `✅ COBERTO` |
| `MOD-02` | Módulo 02 | `02-mercado-logistica` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-03` | Módulo 03 | `03-gerenciamento-risco` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-04` | Módulo 04 | `04-produtos-atlasgr` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-05` | Módulo 05 | `05-software-logistico` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-06` | Módulo 06 | `06-atlas-profile` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-07` | Módulo 07 | `07-integracoes` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-08` | Módulo 08 | `08-clientes` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-09` | Módulo 09 | `09-processo-comercial` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-10` | Módulo 10 | `10-termos-tecnicos` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-11` | Módulo 11 | `11-operacao` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-12` | Módulo 12 | `12-compliance` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-13` | Módulo 13 | `13-tecnologia` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-14` | Módulo 14 | `14-casos-reais` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
| `MOD-15` | Módulo 15 | `15-preparacao-final` | Sim | Leitura, Quiz (10 Q) | 1440x900 | 390x844 | 4 imagens | `✅ COBERTO` |
