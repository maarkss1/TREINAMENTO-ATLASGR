# RELATÓRIO DE BUGS E INCONSISTÊNCIAS TÉCNICAS E VISUAIS — ATLASGR

Durante a auditoria visual e funcional exaustiva, foram registrados os comportamentos anômalos e oportunidades de melhoria descritos abaixo.

---

## Classificação de Severidade

- **CRÍTICO:** Impede o uso de funcionalidade principal ou gera erro fatal/bloqueio de navegação.
- **ALTO:** Prejudica significativamente a experiência do usuário, embora haja contorno.
- **MÉDIO:** Inconsistência visual ou erro de console não bloqueante.
- **BAIXO:** Ajuste fino de layout, espaçamento ou acessibilidade secundária.

---

## Tabela de Inconsistências Catalogadas

| ID | Área / Rota | Descrição do Problema | Severidade | Impacto | Origem / Causa | Sugestão de Correção |
|---|---|---|---|---|---|---|
| `BUG-01` | Global / Axe Core | Ausência de atributo `alt` nas imagens do widget externo VLibras | `MÉDIO` | Violado padrão WCAG 2.2 AA no teste automatizado | Script externo de acessibilidade `vlibras.gov.br` | Adicionar atributos de acessibilidade no wrapper do widget |
| `BUG-02` | `/dashboard` | Discrepância inicial de hidratação client-side no local-storage | `BAIXO` | Aviso secundário de hidratação no React DevTools | Leitura do `localStorage` antes da montagem no cliente | Encapsular leitura do estado dentro de um efeito `useEffect` |
| `BUG-03` | `/shorts` | Dificuldade de rolagem fluida em viewports mobile (< 360px) | `MÉDIO` | Exige toque duplo para avançar o vídeo | Evento `touchmove` concorrente com o scroll padrão do container | Ajustar `touch-action: pan-y` no container do player |
| `BUG-04` | `/produtos/analytics` | Tabela de permanência de alvos exige scroll horizontal em telas < 1280px | `BAIXO` | Mínimo corte de colunas secundárias | Container da tabela sem largura fluida flexível | Adicionar `overflow-x-auto` com indicação visual de rolagem |
| `BUG-05` | Typography / Assets | Fonte 'Mont' primária utiliza fallback sans-serif padrão | `BAIXO` | Variação sutil do peso tipográfico | Arquivos de fonte local `.woff2` ausentes da pasta do projeto | Incluir arquivos oficiais da fonte 'Mont' ou mapear via Google Fonts |
