# TELA: Showcase Gerenciamento de Risco

## Identificação
- **ID da Tela:** `SCR-PRODUTOS-GR`
- **Rota Canonical:** `/produtos/gr`
- **Arquivo de Código Fonte:** `apps/portal/app/produtos/[slug]/page.tsx`
- **Ponto de Entrada:** Navegação via `SiteHeader` ou acesso direto via URL.

## Propósito Funcional
Esta tela integra o ecossistema corporativo **AtlasGR**, fornecendo interface para os colaboradores e clientes acompanharem o treinamento de gerenciamento de risco e capacitação operacional.

## Acesso e Requisitos
- **Pré-requisito:** Acesso livre no protótipo local com armazenamento de progresso no `localStorage`.
- **Autenticação:** Gerenciada por estado local e modal de registro.
- **Disponibilidade via URL Direta:** SIM.

## Estrutura Visual (Scroll Order)
1. **Cabeçalho (`SiteHeader`):** Logo AtlasGR, atalhos de navegação e status de progresso.
2. **Seção Hero / Principal:** Apresentação da tela, indicadores e ações primárias.
3. **Bloco Central de Conteúdo:** Cards de informação, gráficos ou formulários de interação.
4. **Rodapé (`SiteFooter`):** Informações de direitos autorais e links corporativos.

## Componentes Presentes
- `SiteHeader`, `SiteFooter`, `Button`, `Card`, `Badge`, `Progress`.

## Interações Testadas
- **Navegação de Links:** ✅ WORKING
- **Acionamento de CTAs / Botões:** ✅ WORKING
- **Scroll de Página:** ✅ WORKING

## Estados Observados
- **Estado Inicial / Populado:** Carregamento fluido sem travamentos.
- **Responsividade:** Verificada no viewport 1440x900 (Desktop) e 390x844 (Mobile).

## Cobertura de Scroll
- **Scroll Coverage:** COMPLETE (100% da extensão da página rolada e inspecionada).

## Evidências Visuais
- **Screenshot Inicial:** `../imagens/telas/gr/01-inicio.png`
- **Screenshot Full Page:** `../imagens/telas/gr/02-full-page.png`
- **Gravação de Vídeo:** `../videos/07-produtos.webm`

## Cobertura Final
- **Route visited:** YES
- **Full scroll:** YES
- **Desktop checked:** YES
- **Mobile checked:** YES
- **Final Status:** ✅ COBERTO
