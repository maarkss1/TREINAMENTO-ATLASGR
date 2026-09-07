# MAPA DE JORNADAS CANÔNICAS DO USUÁRIO — ATLASGR

Este documento descreve as **8 Jornadas de Usuário Fim a Fim** implementadas e testadas no **Portal AtlasGR**, acompanhadas das evidências em vídeo geradas pela automação via Playwright.

---

## Jornada 01: Onboarding e Registro Inicial do Aluno

- **Caminho das Telas:** `/` -> Modal de Registro Inicial -> `/dashboard`
- **Ações Realizadas:**
  1. Acesso à Landing Page inicial com visualização dos pilares da AtlasGR.
  2. Clique no CTA "Iniciar Treinamento".
  3. Abertura do Modal de Identificação e preenchimento dos dados (Nome, E-mail, Cargo, Empresa).
  4. Redirecionamento automático para o Dashboard Personalizado com estado persistido no `localStorage`.
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/01-home-ate-dashboard.webm`

---

## Jornada 02: Navegação na Trilha e Escolha de Módulo

- **Caminho das Telas:** `/dashboard` -> `/trilha` -> `/trilha/01-bem-vindo-atlasgr`
- **Ações Realizadas:**
  1. No Dashboard, clique no card "Explorar Trilha".
  2. Visualização das 4 categorias de capacitação (Fundamentos, Negócios, Operação, Tecnologia).
  3. Aplicação do filtro de categoria e seleção do Módulo 01 ("Bem-Vindo à AtlasGR").
  4. Carregamento da página rica do Módulo com barra de progresso e índice lateral.
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/02-navegacao-trilha.webm`

---

## Jornada 03: Estudo de Módulo, Leitura Técnica e Quiz

- **Caminho das Telas:** `/trilha/01-bem-vindo-atlasgr` -> Resolução do Quiz -> `/trilha/02-mercado-logistica`
- **Ações Realizadas:**
  1. Rolagem completa pelos capítulos teóricos (Contexto, Desafio, Solução Atlas).
  2. Interação com os componentes ilustrativos e diagramas de fluxo.
  3. Clique em "Iniciar Quiz do Módulo".
  4. Resolução interativa das 10 questões do banco de teste com feedback imediato de resposta.
  5. Obtenção da nota 100%, liberação de XP e desbloqueio do Módulo 02.
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/03-modulo-completo.webm`

---

## Jornada 04: Realização da Avaliação Geral (Prova Final)

- **Caminho das Telas:** `/trilha` -> `/prova-final`
- **Ações Realizadas:**
  1. Acesso à página da Prova Final após a conclusão dos 15 módulos da trilha.
  2. Leitura das instruções gerais de avaliação e regras de aprovação (mínimo 70%).
  3. Navegação pelas 10 questões randômicas integradas.
  4. Seleção das alternativas e submissão formal da prova.
  5. Exibição do resultado imediato: "Aprovado com 100% de Aproveitamento".
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/04-prova-final.webm`

---

## Jornada 05: Emissão e Validação do Certificado Digital

- **Caminho das Telas:** `/prova-final` -> `/certificado`
- **Ações Realizadas:**
  1. Redirecionamento para a página de Certificação do Aluno.
  2. Renderização em alta definição do Certificado Oficial com nome, data e código hash único.
  3. Geração dinâmica do QR Code de verificação de autenticidade.
  4. Clique no botão de exportação e download do PDF gerado via `pdf-lib`.
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/05-certificado.webm`

---

## Jornada 06: Imersão nos Showcases de Produtos

- **Caminho das Telas:** `/produtos` -> `/produtos/profile` -> `/produtos/connect` -> `/produtos/analytics`
- **Ações Realizadas:**
  1. Acesso ao Hub Principal de Produtos da AtlasGR.
  2. Navegação para o produto **Atlas Profile** (Análise Securitária de Risco via IA e Terminal Real).
  3. Navegação para o produto **Atlas Connect** (Torre de Controle, Fila de Alertas e PGR).
  4. Navegação para o produto **Atlas Analytics** (Cockpit Executivo B.I., Mapa do Crime e Alvos).
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/07-produtos.webm`

---

## Jornada 07: Consumo de Pílulas de Conhecimento (Shorts)

- **Caminho das Telas:** `/shorts`
- **Ações Realizadas:**
  1. Acesso à página de Pílulas em Vídeo.
  2. Navegação pelo feed vertical de vídeos curtos orientados a rotinas operacionais.
  3. Interação com os botões de Play, Pause, Mute/Unmute e transição entre vídeos.
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/08-shorts-e-glossario.webm`

---

## Jornada 08: Governança, Ranking e Gestão Administrativa

- **Caminho das Telas:** `/ranking` -> `/profile` -> `/glossario` -> `/admin`
- **Ações Realizadas:**
  1. Consulta ao Ranking Global de Alunos e classificação por XP.
  2. Visualização do Perfil do Usuário com histórico de conquistas e badges.
  3. Pesquisa e filtro por termos técnicos no Glossário da Logística e GR.
  4. Acesso ao Painel do Administrador com métricas de engajamento da turma e controle de conteúdo.
- **Vídeo de Evidência:** `docs/AUDITORIA_VISUAL_COMPLETA/videos/06-admin.webm`
