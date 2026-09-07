import type { ModuleContentFull } from "@/lib/types";
import { getModuleMeta } from "./meta";

const meta = getModuleMeta("04-produtos-atlasgr")!;

export const module04: ModuleContentFull = {
  ...meta,
  sources: [
    "Outline consolidado (content/modules/meta.ts)",
    "Showcases de produto do portal",
    "Material Comercial Corporativo AtlasGR",
  ],
  objectives: [
    "Mapear e interconectar arquiteturalmente os 4 pilares tecnológicos do ecossistema AtlasGR.",
    "Evidenciar o ROI (Return on Investment) e a proposição de valor inquestionável do Atlas Profile.",
    "Descrever a orquestração algorítmica e operacional em tempo real conduzida pelo Atlas Connect e GR.",
    "Demonstrar o poder preditivo e analítico do Atlas Analytics em painéis de nível diretivo.",
    "Contrastar agressivamente a suíte corporativa AtlasGR frente a soluções comoditizadas de 'rastreamento simples'.",
      "Dominar a tríade metodológica da AtlasGR (Contexto, Problema, Solução) para resolução de problemas complexos.",
      "Incorporar a visão de longo prazo e as exigências corporativas de nível Enterprise em todas as tratativas."
],
  sections: [
    {
      id: "introducao",
      title: "Introdução: O Ecossistema Tecnológico de Ponta a Ponta",
      blocks: [
        {
          type: "image",
          url: "/brand/screenshots/newconnect-dashboard.png",
          caption: "Cockpit Operacional Atlas NewConnect: Painel em tempo real da Torre de Controle, Fila de Alertas prioritária IA e Grade de Viagens."
        },
        {
          type: "text",
          heading: "Transcendendo o Software: A Entrega de Inteligência Aplicada",
          paragraphs: [
            [
              "A imensa maioria das ofertas do mercado foca na venda de licenciamento de software que meramente localiza ativos, empurrando o ônus do tratamento da crise para o colo do cliente. A AtlasGR escolheu arquitetar uma barreira impenetrável muito mais complexa e formidável.",
            ],
            [
              "Nosso portfólio não é uma coleção de features; é um ecossistema projetado para blindar corporações de maneira holística. Nós auditamos o vetor de risco antes do motor ligar, orquestramos o trânsito com precisão de milissegundos, agimos taticamente durante intercorrências e alavancamos big data para lapidar os processos do futuro.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "success",
          title: "O Ponto de Inflexão Comercial",
          text: [
            "O domínio conceitual profundo deste módulo separa o amador que tenta vender 'pontos que se movem no mapa' do especialista em segurança que implementa 'Governança Operacional e Econômica' para Fortune 500s.",
          ],
        },
      ],
    },
    {
      id: "capitulo-1-profile",
      title: "Capítulo 1: Atlas Profile (O Filtro de Segurança Primário)",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "As perdas mais devastadoras frequentemente prescindem de violência armada. Elas se infiltram no pátio logístico usando uniformes falsos e identidades sintéticas.",
            ],
            [
              "O Atlas Profile orquestra um 'Background Check' robusto ou ",
              { term: "perfil-securitario" },
              ". Cruzando instantaneamente bases de dados criminais, órgãos de trânsito e litígios, além de utilizar a avançada tecnologia de validação biométrica (",
              { term: "faceid" },
              "), ele neutraliza cirurgicamente a Falsidade Ideológica, certificando que o condutor real bate perfeitamente com a documentação fornecida.",
            ],
          ],
        },
        {
          type: "image",
          url: "/brand/screenshots/perfil-securitario.png",
          caption: "Tela de Registros Recentes (recentRecords) do Atlas Profile: Varredura em 40+ tribunais, validação FaceID com liveness e proteção integral à LGPD."
        },
        {
          type: "checklist",
          title: "Dimensões Auditadas pelo Profile",
          items: [
            "Regularidade de CNH, compatibilidade de categoria e pontuação.",
            "Varredura de antecedentes criminais, pendências penais e mandados expedidos.",
            "Check-up do veículo tracionador e rebocado junto aos órgãos regulares.",
            "Prevenção Ativa a Fraudes via Liveness Detection (Antispoofing biométrico).",
          ],
        },
      ],
    },
    {
      id: "capitulo-2-connect-gr",
      title: "Capítulo 2: Atlas Connect & Atlas GR (A Máquina e a Execução)",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "Com o vetor mitigado preventivamente, a operação entra em fase tática. Este é o domínio dos nossos 'Gêmeos de Performance': O ",
              { term: "connect" },
              " (Cérebro Tecnológico) e o ",
              { term: "gr" },
              " (Fator Tático Humano).",
            ],
          ],
        },
        {
          type: "image",
          url: "/brand/screenshots/portalatlas-sm.png",
          caption: "Portal Atlas Core (Atlas_Principal.php): Gestão paramétrica de SM, regras de PGR, vínculo de tecnologias de rastreamento e contingência operacional."
        },
        {
          type: "comparison",
          title: "Sinergia de Operações",
          left: {
            label: "Atlas Connect (Inteligência Sintética)",
            points: [
              "Plataforma Web Cloud de altíssima disponibilidade.",
              "Ingestão e normalização de milhões de pacotes telemáticos em tempo real.",
              "Motor de Regras Complexo (Rules Engine) para triagem autônoma de alertas críticos.",
            ],
          },
          right: {
            label: "Atlas GR e CIA (Intervenção Humana)",
            points: [
              "Operadores de elite interpretando e agindo sobre exceções triadas pelo Connect.",
              "Execução implacável e processualística dos mandamentos do PGR.",
              "Gatilho rápido para acionamento de forças públicas e Pronta Resposta armada.",
            ],
          },
        },
      ],
    },
    {
      id: "capitulo-3-analytics",
      title: "Capítulo 3: Atlas Analytics (O Dash de Governança)",
      blocks: [
        {
          type: "stat",
          items: [
            { value: "40%", label: "Redução em falsos alarmes otimizados anualmente pelos insights do Analytics." }
          ]
        },
        {
          type: "text",
          paragraphs: [
            [
              "Antever e modelar o futuro através do retrospecto preciso. Enquanto a Torre resolve a crise imediata, o Analytics minera Big Data para explicar a correlação sistêmica por trás de anomalias repetitivas.",
            ],
            [
              "Condensamos volumes massivos de trilhas de GPS, gatilhos de sensores e telemetria avançada em dashboards executivos de altíssima clareza visual, armando C-Levels com dados empíricos para otimizar frotas, negociar apólices menores e descredenciar fornecedores nocivos.",
            ],
          ],
        },
      ],
    },
    {
      id: "estudo-de-caso",
      title: "Case de Alta Performance: O Ciclo Completo Salvando R$ 12 Milhões",
      blocks: [
        {
          type: "case",
          title: "Operação Shield (Indústria de Bebidas)",
          text: "Diagnóstico: Um player multinacional sangrava margem por apropriação indébita (evasão interna via fraude). A AtlasGR injetou a suíte completa. 1. O Profile filtrou e bloqueou 12% dos contratados logo no primeiro ciclo via FaceID. 2. O Connect eliminou a fricção transacional integrando 100% da frota. 3. O GR abortou 5 tentativas de evasão sofisticada, recuperando o ativo integralmente. 4. O Analytics forneceu a materialidade provando que 90% dos sinistros correlacionavam-se com 2 transportadoras específicas, baseando o encerramento dos contratos de forma jurídica incontestável. Resultado Auditado: Savings diretos de R$ 12 Milhões ao semestre.",
          source: "Repositório de Inteligência de Mercado AtlasGR"
        },
      ],
    },
    {
      id: "capitulo-4-diferenciacao-e-limites",
      title: "Capítulo 4: Posicionamento Estratégico e as Fronteiras do Escopo",
      blocks: [
        {
          type: "text",
          heading: "Destruindo a Comparação por Preço",
          paragraphs: [
            [
              "A falácia mais perigosa do mercado é o 'nós também temos o mapa'. É vital usar essa objeção como trampolim: o rastreador comum documenta o roubo; a AtlasGR atua para impedir e, se ocorrer, lidera a recuperação.",
            ],
            [
              "Entretanto, a maturidade profissional exige conhecer onde a lâmina corta e onde ela não se aplica. O overpromise (prometer além da ferramenta) gera churn e degrada a marca. Saiba exatamente os contornos das capacidades do portfólio.",
            ],
          ],
        },
        {
          type: "faq",
          items: [
            {
              q: "Por que não podemos equiparar a capacidade do Connect a um rastreador de prateleira?",
              a: "O mapa é mera feature. A disrupção real é o Motor de Regras: um rastreador apita um desvio em silêncio. O Connect classifica, prioriza algoritmicamente e dispara um alerta vermelho obrigando uma tratativa humana em SLA agressivo.",
            },
            {
              q: "Por que uma transportadora que possui TI interna e TMS próprio necessitaria da AtlasGR?",
              a: "Ter uma tela não equivale a ter uma Torre de Guerra operando 24/7 com inteligência forense e capacidade de despachar escolta armada na Dutra às 3h da manhã. Vendemos a execução infalível do PGR.",
            },
            {
              q: "O Atlas Profile deve ser ofertado como solução geral de RH?",
              a: "Não. A solução é hiper-focada na mitigação de risco da cadeia logística e operacional; a arquitetura de dados e queries são construídas em torno de crimes patrimoniais e regulamentações de transporte.",
            },
            {
              q: "A aquisição isolada do Analytics faz sentido técnico?",
              a: "Excepcionalíssimo. O Analytics é uma lente potente; mas precisa de dados primários confiáveis (Connect e GR) para extrair valor acionável. Dados vazios geram painéis estéreis.",
            },
          ],
        },
        {
          type: "comparison",
          title: "Comoditização vs. Valor Premium (AtlasGR)",
          left: {
            label: "Soluções de Mercado (Genéricas)",
            points: [
              "Funcionalidade reativa de ping no mapa.",
              "Alertas jogam a responsabilidade de interpretar e agir para o cliente final.",
              "Output: Planilhas infindáveis sem inteligência de negócio.",
              "Descolamento completo da regulação e responsabilização pelo desfecho.",
            ],
          },
          right: {
            label: "Suíte Avançada AtlasGR",
            points: [
              "Bloqueio profilático no embarque (Profile).",
              "Curadoria algorítmica + Elite humana 24/7 (Connect + GR/CIA).",
              "Diagnóstico preditivo em tempo real (Analytics).",
              "Compromisso intrínseco com a liquidação securitária final do cliente.",
            ],
          },
        },
        {
          type: "checklist",
          title: "Sinalizações de Overpromise (O que NÃO Prometer)",
          items: [
            "O Profile não substitui avaliações psicológicas legais ou laudos toxicológicos oficiais; ele certifica a higidez documental e biométrica.",
            "O Connect não substitui o julgamento humano na tipificação da crise; o algoritmo empodera o analista da Torre, não o substitui.",
            "O GR atua em conformidade com o PGR, mas quem detém o poder da apólice e do repasse financeiro (LMI) sempre será a Seguradora.",
            "O Analytics revela verdades ocultas baseadas unicamente na massa de dados ingerida; lixo na entrada, lixo na saída.",
          ],
        },
      ],
    },
      {
            id: "analise-arquitetura-solucao",
            title: "Arquitetura da Solução: A Tríade de Alta Performance",
            blocks: [
              {
                type: "text",
                heading: "Metodologia Aplicada AtlasGR",
                paragraphs: [
                  [
                    "Para compreendermos a magnitude da nossa operação, aplicamos a estrutura de raciocínio lógico que guia o desenvolvimento de nossos produtos e processos. Esta é a visão corporativa exigida de todos os especialistas da AtlasGR."
                  ]
                ]
              },
              {
                type: "comparison",
                title: "Desconstrução Estratégica (Contexto vs. Solução)",
                left: {
                  label: "O Cenário e a Ameaça",
                  points: [
                    "**Contexto Operacional:** Diferentes perfis de clientes exigem abordagens de segurança e visibilidade distintas.",
                    "**O Problema (Dor do Cliente):** Soluções fragmentadas deixam pontos cegos na operação, da contratação do motorista à entrega final."
                  ]
                },
                right: {
                  label: "A Resposta AtlasGR",
                  points: [
                    "**A Solução Tecnológica/Processual:** A suíte completa (Profile, Connect, GR, Analytics) oferece uma barreira 360º unificada e de altíssima performance.",
                    "**Impacto Gerado:** Redução drástica de perdas, garantia de SLA e proteção absoluta do ecossistema logístico."
                  ]
                }
              },
              {
                type: "faq",
                items: [
                  { q: "Como essa metodologia se aplica na minha rotina?", a: "Toda decisão que você tomar deve ser guiada por esta lógica: entender o contexto da viagem, identificar rapidamente o problema (anomalia) e aplicar a solução (protocolo) com precisão milimétrica." },
                  { q: "O que acontece se pularmos a etapa do problema e formos direto à solução?", a: "Agir sem entender a real 'dor' ou causa raiz gera falsos positivos e atrito com o cliente. A análise pericial é inegociável." }
                ]
              }
            ]
          },
    {
      id: "materiais-complementares",
      title: "Certificação e Fechamento",
      blocks: [
        {
          type: "checklist",
          title: "Próximas Missões",
          items: [
            "Estructure seu pitch diferenciando a entrega de Governança vs Software de prateleira.",
            "Conclua a verificação técnica rigorosa nos quizes de fechamento.",
            "Transite para o Módulo 05: Imersão profunda na Interface do Connect.",
          ],
        },
      ],
    },
  ],
  summary: [
    "O Profile age antes da crise nascer (Filtro Documental e FaceID).",
    "O Connect fornece orquestração algorítmica real-time.",
    "O Atlas GR entrega força tática treinada em ambiente de guerra logística.",
    "O Analytics consolida insights estratégicos para C-Levels otimizarem operações.",
    "A unificação completa destes quatro vértices coroa a AtlasGR como provedor Enterprise de ponta a ponta.",
      "A metodologia de Contexto-Problema-Solução assegura que a tecnologia atue como um facilitador estratégico.",
      "Nossos padrões seguem frameworks rigorosos de governança Enterprise, onde falhas processuais não têm espaço."
],
  finalChecklist: [
    "Aptidão plena para decompor técnica e comercialmente os 4 produtos.",
    "Entendimento crítico sobre o bloqueio de Falsidade Ideológica via FaceID.",
    "Capacidade retórica de defender o ROI do ecossistema frente a commodites do mercado.",
  ],
  mindMap: {
    root: "Ecossistema AtlasGR",
    branches: [
      { label: "Profile", items: ["Compliance Documental", "FaceID", "Barreira Proativa"] },
      { label: "Connect", items: ["Rules Engine", "APIs Core", "Diferenciação Crítica"] },
      { label: "GR / CIA", items: ["Elite Operacional", "Ação Tática", "Intervenção Física"] },
      { label: "Analytics", items: ["Dashboards Executivos", "Previsibilidade", "Otimização Financeira"] },
    ],
  },
  scenario:
    "Cenário Prático: Um CEO logístico questiona frontalmente: 'Por que o custo da licença do Analytics se eu tenho times puxando dados do ERP para o PowerBI de graça?'. Como você constrói a defesa baseada na ingestão direta e imutável de telemetria complexa que o ERP dele ignora?",
  diagram: {
    title: "Orquestração Estratégica dos Produtos",
    chart: "graph LR\n  A[Profile: Clearance] -->|Liberação Segura| B[Connect: Triagem]\n  B -->|Escalonamento| C[GR/CIA: Ação]\n  B -->|Telemetria| D[Analytics: Estratégia]\n  C -->|Feedback Tático| D",
  },
};
