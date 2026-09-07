# RELATÓRIO DE VERIFICAÇÃO RESPONSIVA MOBILE — ATLASGR

As principais telas e jornadas do **Portal AtlasGR** foram testadas na resolução mobile canônica de **390x844** (iPhone 12/13/14 viewport equivalente).

---

## 1. Mapeamento das Telas Testadas em Mobile

| Rota | Viewport | Comportamento do Layout | Adaptabilidade de Grid | Evidência Gerada |
|---|---|---|---|---|
| `/` | 390x844 | Menu colapsável mobile, empilhamento dos cards do Hero | Flutuante de 12 para 1 coluna | `imagens/mobile/home/` |
| `/dashboard` | 390x844 | Cards de métrica empilhados, barra de progresso responsiva | Adaptação perfeita | `imagens/mobile/dashboard/` |
| `/trilha` | 390x844 | Filtros em rolagem horizontal com snap touch | Grade de módulos em coluna única | `imagens/mobile/trilha/` |
| `/trilha/01-bem-vindo-atlasgr` | 390x844 | Leitura fluida, imagens redimensionadas, quiz adaptado | Coluna única com padding lateral | `imagens/mobile/modulo-01/` |
| `/produtos/profile` | 390x844 | Screenshots reais redimensionadas, terminal responsivo | Ajuste automático | `imagens/mobile/produto-profile/` |
| `/shorts` | 390x844 | Feed vertical estilo Reels/TikTok ocupando 100% da viewport | Tela cheia responsiva | `imagens/mobile/shorts/` |
| `/prova-final` | 390x844 | Botões de opção ampliações com área de toque touch (> 44px) | Acessível para toque | `imagens/mobile/prova-final/` |
| `/certificado` | 390x844 | Certificado com scroll interno e QR Code visível | Exibição limpa | `imagens/mobile/certificado/` |
| `/ranking` | 390x844 | Tabela de posições compactada sem quebra | Adaptado | `imagens/mobile/ranking/` |
| `/admin` | 390x844 | Tabelas administrativas com barra de rolagem dedicada | Ajuste funcional | `imagens/mobile/admin/` |
