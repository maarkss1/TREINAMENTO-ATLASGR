import type { ModuleContentFull } from "@/lib/types";
import { getModuleMeta } from "./meta";

const meta = getModuleMeta("05-software-logistico")!;

export const module05: ModuleContentFull = {
  ...meta,
  sources: [
    "Manuais de Operação Avançada Atlas Connect",
    "Torre de Controle - Manuais de Contingência",
  ],
  objectives: [
    "Navegar e dominar a arquitetura de dados e hierarquia visual avançada do cockpit do Atlas Connect.",
    "Dissecar o ciclo de vida estruturado (Criação, Rastreamento, Baixa) de uma SM (Solicitação de Monitoramento).",
    "Interiorizar a matriz de regras preditivas do Motor de Regras e seu critério inegociável de priorização.",
    "Dominar o modelo mental entre o Monitoramento Passivo na Grade e a Execução Ativa e Ágil na Fila de Alertas.",
    "Triar e diagnosticar complexidades técnicas, separando ruído de sinal (Jammer vs. Sombra) sem nunca negligenciar um risco fatal.",
      "Dominar a tríade metodológica da AtlasGR (Contexto, Problema, Solução) para resolução de problemas complexos.",
      "Incorporar a visão de longo prazo e as exigências corporativas de nível Enterprise em todas as tratativas."
],
  sections: [
    {
      id: "introducao",
      title: "Introdução: O Cockpit Operacional e o Motor de Guerra",
      blocks: [
        {
          type: "image",
          url: "/brand/screenshots/newconnect-dashboard.png",
          caption: "Cockpit Operacional Atlas NewConnect: Monitoramento em tempo real, KPIs de conectividade e Fila de Alertas prioritários (P1 a P7) com regras de IA."
        },
        {
          type: "text",
          heading: "A Interface que Separa a Ordem do Caos",
          paragraphs: [
            [
              "Bem-vindo ao Atlas Connect. Na analogia tática, se o PGR é a doutrina militar, o Connect é o sistema de radar, mísseis guiados e a sala de crise simultaneamente. Nesta tela fluem milhares de dados por segundo, enquanto nosso Motor de Regras IA distingue instantaneamente entre uma anomalia rotineira e uma tentativa coordenada de roubo.",
            ],
            [
              "Não buscamos meros apertadores de botão. Buscamos Analistas Táticos. Seu foco não deve ser decorar a interface atual, mas interiorizar o FLUXO DE DADOS VITAIS: a génese da viagem, o monitoramento contínuo, a análise heurística de alertas e o escalonamento rigoroso.",
            ],
          ],
        },
        {
          type: "quote",
          text: "Um operador reage à tela. Um Analista AtlasGR comanda a operação lendo a matriz por trás dos números.",
          author: "Gerência Técnica AtlasGR"
        },
        {
          type: "callout",
          variant: "info",
          title: "Princípio de Design Universal",
          text: [
            "A interface (UX) passará por atualizações estéticas contínuas, mas a ontologia do sistema (A Fila Ativa x A Grade Passiva) é imutável. Prenda-se à lógica processual.",
          ],
        },
      ],
    },
    {
      id: "capitulo-1-interface",
      title: "Capítulo 1: Dissecando a Arquitetura da Tela",
      blocks: [
        {
          type: "comparison",
          title: "O Cérebro Dividido: Grade x Fila",
          left: {
            label: "A Grade de Viagens (Modo Consulta Passiva)",
            points: [
              "O panorama completo e holístico de todos os ativos tracionados em rota viva.",
              "Utilizada para reports sob demanda, conferências de ETA para o cliente ou buscas forenses.",
              "Status verde e silencioso. Não exige interação crítica no fluxo normal de trabalho.",
            ],
          },
          right: {
            label: "A Fila de Alertas (Modo Execução Tática)",
            points: [
              "A artéria pulsante da operação. Exclusiva para EXCEÇÕES que quebram o SLA ou o PGR.",
              "Dinâmica, agressiva (alertas visuais e sonoros) e regida por métricas de SLA implacáveis.",
              "Rigorosamente ranqueada pelo Algoritmo (Prioridades 1 ao 7).",
            ],
          },
        },
      ],
    },
    {
      id: "capitulo-2-a-viagem",
      title: "Capítulo 2: O Ciclo de Operação de um SM",
      blocks: [
        {
          type: "image",
          url: "/brand/screenshots/portalatlas-sm.png",
          caption: "Portal Atlas Core (Atlas_Principal.php): Painel detalhado de Solicitação de Monitoramento (SM), conferência de atuadores e parametrização de apólice PGR."
        },
        {
          type: "timeline",
          title: "O Life Cycle da Solicitação de Monitoramento",
          items: [
            { label: "1. Criação (Gênese Automática)", text: "Ingestão via API do TMS. O sistema amarra parametricamente o ativo (caminhão), o humano pré-aprovado (Profile) e o conjunto de regras invioláveis (PGR) para criar uma entidade SM." },
            { label: "2. Ping Inicial e Ativação", text: "Handshake telemático. O Connect exige resposta do rastreador primário e secundário (isca). Ao confirmar a conectividade, o SM transiciona para status 'Em Trânsito'." },
            { label: "3. Rastreabilidade Extrema", text: "A cada milissegundo, a posição do GPS, desvios de rota (geofences) e telemetria bruta (macros/atuadores) são cruzados contra as regras de negócio." },
            { label: "4. Encerramento (Baixa Segura)", text: "Atingida a Geocerca de destino final com sucesso, a viagem é desfeita de forma autônoma ou baixada com supervisão humana, concluindo o ciclo de risco com integridade." },
          ],
        },
      ],
    },
    {
      id: "capitulo-3-motor",
      title: "Capítulo 3: Motor de Regras e a Hierarquia de Prioridades",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "Na Torre AtlasGR, o operador jamais sai à caça de problemas no mapa. É o Motor de Regras IA que peneira o caos, injetando alertas diretamente na veia do fluxo de trabalho. A hierarquia imposta pelo algoritmo não é sugestiva; ela é uma lei marcial.",
            ],
          ],
        },
        {
          type: "image",
          url: "/brand/screenshots/newconnect_tela_alerta.png",
          caption: "Tela Real de Alertas do NewConnect: Priorização por cores/níveis de risco (desengate fora de alvo, violação de carona, perda de sinal > 1h, desvio de rota) e tecnologias integradas (Autotrac, Sighra, Sascar, Onixsat, Omnilink) com dados protegidos (LGPD)."
        },
        {
          type: "checklist",
          title: "A Escala Algorítmica de Crise",
          items: [
            "Nível 1 (CRÍTICO ABSOLUTO): Botão de pânico, violação direta de cabine/painel ou Jammer em curso de carga milionária. (SLA de resposta de segundos. Escalonamento automático para a CIA).",
            "Nível 2 (ALTO RISCO): Perda de conectividade massiva (possível bloqueador) em zonas vermelhas ou desvio crítico de ativo de alta atratividade.",
            "Nível 4 (ATENÇÃO MODERADA): Pernoites não homologados, paradas injustificadas acima do limite do PGR.",
            "Nível 7 (INFORME OPERACIONAL): Alertas técnicos de hardware (Ex: Queda abrupta de tensão na bateria da isca).",
          ],
        },
      ],
    },
    {
      id: "estudo-de-caso",
      title: "Case Fatal: Subvertendo o Algoritmo",
      blocks: [
        {
          type: "case",
          title: "O Preço de 'Limpar a Tela Rápido'",
          text: "Um caso verídico de perda grave exposto em treinamentos: Sob alta demanda, um operador inexperiente tentou zerar sua Fila de Alertas começando pelos eventos mais simples. Ele ignorou um alerta rubro de Nível 1 (Acionamento de Pânico Silencioso) para solucionar antes um alerta amarelo de Nível 4 (Parada prolongada) com o qual já estava acostumado. Ao gastar míseros 4 minutos no telefone, quando retornou ao Nível 1, a carreta já se encontrava invisível aos satélites e em poder do crime organizado. A lição é cravada a sangue: O algoritmo de triagem detém maior capacidade heurística que qualquer humano; jamais inverta a priorização do sistema.",
          source: "Manual de Doutrina e Correções DHO"
        },
      ],
    },
    {
      id: "capitulo-4-troubleshooting",
      title: "Capítulo 4: Diagnóstico de Alertas Complexos (Falso Positivo vs Fato)",
      blocks: [
        {
          type: "text",
          heading: "A Linha Tênue da Falsa Normalidade",
          paragraphs: [
            [
              "A tecnologia é ruidosa. A diferença entre um novato e um Sênior reside na perspicácia de diagnosticar um falso positivo de hardware sem se dessensibilizar e acabar ignorando um gatilho autêntico.",
            ],
            [
              "Apresentamos abaixo os três principais ofensores algorítmicos que poluem a fila de alertas. Dominá-los otimiza seu SLA sem colocar bilhões em ativos sob risco letal.",
            ],
          ],
        },
        {
          type: "checklist",
          title: "Troubleshooting Rápido dos '3 Fantasmas'",
          items: [
            "GPS Cego (Zona de Sombra): Antes de declarar alerta de Jammer (Perda de Sinal provocada), valide a trilha histórica. O ativo submergiu em um túnel, região de garimpo ou serra profunda? Confirme o tempo de tolerância específico do PGR.",
            "Flood de Redundância (Eventos Duplicados): Operadoras de telefonia costumam reenviar o mesmo pacote em milissegundos, empilhando o alerta. Trate assertivamente o evento root e archive imediatamente as réplicas referenciando a ação matriz.",
            "Falso Positivo Cartográfico (Desvio Fake): Caminhões sofrem redirecionamentos contínuos por obras, quedas de barreiras ou blitze da PRF que o mapa desconhece. Triangular contato rápido com a cabine antes de escalar para Nível 2.",
          ],
        },
        {
          type: "faq",
          items: [
            {
              q: "Há perda de sinal e o canal primário de voz com a cabine está mudo. É Jammer?",
              a: "O pressuposto tático inicial deve sempre tender ao pior cenário. Se o prazo de contingência do PGR venceu, a escalada é imediata. A hesitação na esperança de ser uma 'sombra' custa a janela ouro de recuperação.",
            },
            {
              q: "Posso arquivar anomalias duplicadas sem justificar no log do sistema?",
              a: "Absolutamente não. A exclusão silenciosa envenena o rastro forense essencial para o time do Analytics e peritos securitários. Cada fechamento exige referenciamento.",
            },
            {
              q: "Na pressão da rotina, escalei um desvio por obra (falso positivo) diretamente para a CIA. Haverá retaliação?",
              a: "Nunca. O erro em excesso de zelo é amparado pela liderança e rapidamente resolvido. O erro omissivo (ignorar suspeita com medo de incomodar a CIA) é severamente repreendido.",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Princípio Operacional da Dúvida",
          text: [
            "Sob qualquer ambiguidade entre 'apenas um lag sistêmico' e 'risco real deflagrado', assuma o risco como FATO. Acionar indevidamente a CIA gera um desconforto temporário; subestimar um alerta rubro resulta em passivo cível e dano reputacional incomensurável.",
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
                    "**Contexto Operacional:** A gestão de milhares de viagens simultâneas exige tecnologia de ponta e interfaces intuitivas.",
                    "**O Problema (Dor do Cliente):** Sistemas lentos ou confusos atrasam a tomada de decisão em momentos onde cada segundo conta."
                  ]
                },
                right: {
                  label: "A Resposta AtlasGR",
                  points: [
                    "**A Solução Tecnológica/Processual:** O Atlas Connect entrega telemetria em tempo real, automação de comandos (macros) e priorização inteligente de alertas.",
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
      title: "Considerações Finais e Mentoria On-the-Job",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "Para uma visualização detalhada das novas telas do painel de controle, consulte a Base de Conhecimento na seção 'Interface Connect'.",
            ],
          ],
        },
        {
          type: "checklist",
          title: "As Próximas Fases",
          items: [
            "Você engatará em ciclos de 'Treinamento Shadow' (escuta e observação de operações reais ao vivo).",
            "O próximo estágio mergulha fundo na barreira profilática que blinda o Connect: O Atlas Profile.",
          ],
        },
      ],
    },
  ],
  summary: [
    "A orquestração telemática do Connect mapeia toda a janela de oportunidade de risco da viagem.",
    "O entendimento cristalino da dicotomia Grade (Visão Passiva) vs Fila de Alertas (Visão Ativa) previne gargalos.",
    "A estrutura do SM é a garantia algorítmica de que humano, máquina e regras viajam entrelaçados.",
    "A aderência cega ao Sistema de Níveis de Prioridade do Motor IA não é negociável.",
      "A metodologia de Contexto-Problema-Solução assegura que a tecnologia atue como um facilitador estratégico.",
      "Nossos padrões seguem frameworks rigorosos de governança Enterprise, onde falhas processuais não têm espaço."
],
  finalChecklist: [
    "Compreendo a arquitetura de prioridade da Fila de Alertas.",
    "Sei enumerar e descrever o lifecycle impecável de um SM.",
    "Aceito e entendo o risco fatal de tentar 'otimizar' a ordem de resolução estipulada pelo motor.",
  ],
  mindMap: {
    root: "Operação Connect",
    branches: [
      { label: "UX Operacional", items: ["Modo Grade", "Fila Prioritária", "Mapa Integrado"] },
      { label: "Flow da Viagem (SM)", items: ["Ingestão Automática", "Ping Validado", "Baixa Geolocalizada"] },
      { label: "Priorização IA", items: ["Nível 1 (Pânico Silencioso)", "Nível 7 (Aviso de Bateria)", "Ghost Alerts (Troubleshooting)"] },
    ],
  },
  scenario:
    "Cenário Prático: A central sofre um blackout temporário de telecom (link primário cai), restando apenas o link redundante e 70 alertas represados. Como você e o Motor de Regras interagem para reestabelecer o comando sem comprometer o SLA dos eventos Nível 1?",
  diagram: {
    title: "Triagem Algorítmica e Escalonamento",
    chart: "graph TD\n  Evento[Desvio ou Jammer no GPS] --> Motor[Motor de Regras IA]\n  Motor --> Classifica[Atribuição Crítica de SLA]\n  Classifica --> Fila[Injeção no Topo da Fila do Operador]\n  Fila --> Acao[Resposta Humana Imediata]",
  },
};
