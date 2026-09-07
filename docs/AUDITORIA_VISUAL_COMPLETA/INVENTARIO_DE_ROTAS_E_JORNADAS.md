# INVENTÁRIO DE ROTAS E JORNADAS — TREINAMENTO ATLASGR

Este documento apresenta a descoberta técnica exaustiva de todas as rotas estáticas, dinâmicas e sub-rotas presentes na aplicação `apps/portal` do ecossistema **AtlasGR**.

---

## 1. Mapeamento de Rotas

| ID Rota | URL / Caminho Canonical | Tipo | Parâmetros / Slugs Válidos | Arquivo Fonte (`page.tsx`) |
|---|---|---|---|---|
| `ROUTE-01` | `/` | Estática | N/A | `apps/portal/app/page.tsx` |
| `ROUTE-02` | `/dashboard` | Estática | N/A | `apps/portal/app/dashboard/page.tsx` |
| `ROUTE-03` | `/trilha` | Estática | N/A | `apps/portal/app/trilha/page.tsx` |
| `ROUTE-04` | `/trilha/[slug]` | Dinâmica (15) | Ver lista de 15 módulos abaixo | `apps/portal/app/trilha/[slug]/page.tsx` |
| `ROUTE-05` | `/produtos` | Estática | N/A | `apps/portal/app/produtos/page.tsx` |
| `ROUTE-06` | `/produtos/[slug]` | Dinâmica (4) | `profile`, `connect`, `gr`, `analytics` | `apps/portal/app/produtos/[slug]/page.tsx` |
| `ROUTE-07` | `/shorts` | Estática | N/A | `apps/portal/app/shorts/page.tsx` |
| `ROUTE-08` | `/prova-final` | Estática | N/A | `apps/portal/app/prova-final/page.tsx` |
| `ROUTE-09` | `/certificado` | Estática | N/A | `apps/portal/app/certificado/page.tsx` |
| `ROUTE-10` | `/ranking` | Estática | N/A | `apps/portal/app/ranking/page.tsx` |
| `ROUTE-11` | `/profile` | Estática | N/A | `apps/portal/app/profile/page.tsx` |
| `ROUTE-12` | `/glossario` | Estática | N/A | `apps/portal/app/glossario/page.tsx` |
| `ROUTE-13` | `/admin` | Estática | N/A | `apps/portal/app/admin/page.tsx` |

---

## 2. Slugs dos Módulos de Treinamento (`/trilha/[slug]`)

1. `01-bem-vindo-atlasgr`
2. `02-mercado-logistica`
3. `03-gerenciamento-risco`
4. `04-produtos-atlasgr`
5. `05-software-logistico`
6. `06-atlas-profile`
7. `07-integracoes`
8. `08-clientes`
9. `09-processo-comercial`
10. `10-termos-tecnicos`
11. `11-operacao`
12. `12-compliance`
13. `13-tecnologia`
14. `14-casos-reais`
15. `15-preparacao-final`

---

## 3. Slugs dos Produtos (`/produtos/[slug]`)

1. `profile` (Atlas Profile / Inteligência de Risco Securitário)
2. `connect` (Atlas Connect / Torre de Controle e Rastreamento)
3. `gr` (Gerenciamento de Risco / Parametrização PGR)
4. `analytics` (Cockpit Executivo & B.I. Logístico)

---

## 4. Mapeamento das 8 Jornadas Canônicas de Usuário

- **Jornada 01: Onboarding e Recepção Inicial** (`/` -> Modal de Identificação -> `/dashboard`)
- **Jornada 02: Navegação e Escolha da Trilha** (`/dashboard` -> `/trilha` -> Seleção de Módulo)
- **Jornada 03: Estudo Completo do Módulo e Quiz** (`/trilha/01-bem-vindo-atlasgr` -> Leitura/Vídeo -> Resolução de Quiz -> Conclusão)
- **Jornada 04: Avaliação Final do Treinamento** (`/trilha` -> `/prova-final` -> Resolução de 10 Questões -> Submissão)
- **Jornada 05: Emissão e Validação do Certificado** (`/prova-final` -> `/certificado` -> Validação do QR Code / Impressão PDF)
- **Jornada 06: Imersão nos Showcase de Produtos** (`/produtos` -> `/produtos/profile` -> `/produtos/connect` -> `/produtos/analytics`)
- **Jornada 07: Consumo de Pílulas de Conhecimento (Shorts)** (`/shorts` -> Navegação Feed Vertical -> Play/Pause/Mute)
- **Jornada 08: Governança, Ranking e Administração** (`/ranking` -> `/profile` -> `/glossario` -> `/admin`)
