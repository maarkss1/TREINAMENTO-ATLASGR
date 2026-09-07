# MAPA GERAL DO PRODUTO — ATLASGR

O **Portal de Onboarding e Treinamento AtlasGR** é uma plataforma corporativa de LMS e capacitação operacional em logística e gerenciamento de risco.

---

## 1. Árvore Funcional e Arquitetura de Informação

```text
Portal AtlasGR
├── Landing Page (Home - `/`)
│   ├── SiteHeader (Navegação, Branding, Status)
│   ├── HeroSection (Apresentação, CTAs Onboarding/Trilha)
│   ├── ValueMetrics (Indicadores de Impacto Operacional)
│   ├── TerminalWindow / ArchitectureFlow (Demonstração Tech)
│   └── SiteFooter (Links Corporativos, Copyright)
│
├── Dashboard do Aluno (`/dashboard`)
│   ├── Banner de Boas-Vindas & Gamificação (XP, Nível, Progresso Total)
│   ├── Card de Próximo Módulo Recomendado
│   ├── Ateliê de Desempenho e Métricas de Conclusão
│   ├── Grade Completa de 15 Módulos com Status (Concluído/Em Andamento/Bloqueado)
│   └── Atalhos Rápidos (Prova Final, Certificado, Ranking, Glossário)
│
├── Trilha de Aprendizado (`/trilha`)
│   ├── Filtros por Categoria (Fundamentos, Negócios, Operações, Tecnologia)
│   └── Grade Interativa de Módulos (`/trilha/[slug]`)
│       ├── Módulo 01: Bem-Vindo à AtlasGR (`/trilha/01-bem-vindo-atlasgr`)
│       ├── Módulo 02: O Mercado de Logística e GR (`/trilha/02-mercado-logistica`)
│       ├── Módulo 03: Fundamentos de Gerenciamento de Risco (`/trilha/03-gerenciamento-risco`)
│       ├── Módulo 04: Ecossistema de Produtos AtlasGR (`/trilha/04-produtos-atlasgr`)
│       ├── Módulo 05: Softwares e Tecnologias Logísticas (`/trilha/05-software-logistico`)
│       ├── Módulo 06: Atlas Profile & Análise Securitária (`/trilha/06-atlas-profile`)
│       ├── Módulo 07: Integrações e Espelhamento de Sinais (`/trilha/07-integracoes`)
│       ├── Módulo 08: Perfis de Clientes e Operações (`/trilha/08-clientes`)
│       ├── Módulo 09: Processo Comercial e Negociação (`/trilha/09-processo-comercial`)
│       ├── Módulo 10: Dicionário de Termos Técnicos (`/trilha/10-termos-tecnicos`)
│       ├── Módulo 11: Operação e Torre de Controle (C.I.A) (`/trilha/11-operacao`)
│       ├── Módulo 12: Compliance, Auditoria e LGPD (`/trilha/12-compliance`)
│       ├── Módulo 13: Arquitetura Tecnológica e IA (`/trilha/13-tecnologia`)
│       ├── Módulo 14: Estudo de Casos Reais de Sinistros (`/trilha/14-casos-reais`)
│       └── Módulo 15: Preparação para a Prova Final (`/trilha/15-preparacao-final`)
│
├── Showcases de Produtos (`/produtos`)
│   ├── Atlas Profile (`/produtos/profile`) — Inteligência e Risco Securitário
│   ├── Atlas Connect (`/produtos/connect`) — Torre de Controle e Rastreamento
│   ├── Gerenciamento de Risco (`/produtos/gr`) — Parametrização de PGR
│   └── B.I. & Analytics (`/produtos/analytics`) — Cockpit Executivo
│
├── Pílulas em Vídeo / Shorts (`/shorts`)
│   └── Feed Vertical Interativo de Vídeos Rápidos Operacionais
│
├── Avaliação e Certificação
│   ├── Prova Final (`/prova-final`) — Examina conhecimentos dos 15 módulos
│   └── Certificado Digital (`/certificado`) — Emissão com QR Code e PDF
│
├── Engajamento e Perfil
│   ├── Ranking Geral (`/ranking`) — Tabela de Classificação em Tempo Real
│   ├── Perfil do Usuário (`/profile`) — Histórico, Badges, Certificados
│   └── Glossário Técnico (`/glossario`) — Busca e Consulta A-Z
│
└── Painel de Administração (`/admin`)
    ├── Gestão de Usuários e Alunos
    ├── Monitoramento de Turmas e Métricas de Engajamento
    └── Governança de Conteúdo e Quizzes
```

---

## 2. Fluxo Geral de Dados e Experiência do Usuário

1. **Entrada sem Cadastro:** O usuário acessa a Home ou Dashboard e é apresentado ao Modal de Registro Inicial.
2. **Registro Local (Zustand + LocalStorage):** As informações de progresso, nome e notas dos quizzes são mantidas de forma persistente e reativa no estado da aplicação.
3. **Progressão na Trilha:** Cada módulo possui leitura técnica, diagrama visual, estórias de caso e um Quiz obrigatório de 10 perguntas. O avanço de módulo é liberado após a pontuação mínima no Quiz.
4. **Conclusão da Trilha:** Ao atingir 100% dos módulos concluídos, a Prova Final de 10 questões é liberada na rota `/prova-final`.
5. **Geração do Certificado:** A aprovação na Prova Final libera automaticamente a visualização e o download em PDF do Certificado Autêntico com QR Code em `/certificado`.
