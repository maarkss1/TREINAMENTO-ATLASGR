import type { ModuleContentFull } from "@/lib/types";
import { getModuleMeta } from "./meta";

const meta = getModuleMeta("06-atlas-profile")!;

export const module06: ModuleContentFull = {
  ...meta,
  sources: [
    "Atlas Profile - Guia de Produto Avançado",
    "Cartilha de LGPD (Lei nº 13.709/2018) Corporativa",
  ],
  objectives: [
    "Explicar a lógica financeira da prevenção antecipada de fraudes com extrema precisão.",
    "Detalhar o funcionamento técnico do reconhecimento facial e checagem de dados em tempo real.",
    "Relacionar a prática do Profile às exigências de anonimização e privacidade da LGPD.",
    "Interpretar perfeitamente os status gerados pelo sistema, garantindo conformidade.",
    "Aplicar corretamente o processo de contestação quando o candidato questiona um antecedente.",
      "Dominar a tríade metodológica da AtlasGR (Contexto, Problema, Solução) para resolução de problemas complexos.",
      "Incorporar a visão de longo prazo e as exigências corporativas de nível Enterprise em todas as tratativas."
],
  sections: [
    {
      id: "introducao",
      title: "Introdução: O Portão de Entrada",
      blocks: [
        {
          type: "image",
          url: "/brand/screenshots/perfil-securitario.png",
          caption: "Tela de Registros Recentes (recentRecords) do Atlas Profile: Consulta de candidatos em 40+ tribunais, biometria FaceID com liveness e proteção LGPD."
        },
        {
          type: "quote",
          text: "A fraude mais letal não acontece na estrada; ela acontece na recepção da transportadora, quando um rosto falso é aprovado para conduzir R$ 5 milhões.",
          author: "Especialista em Prevenção AtlasGR"
        },
        {
          type: "text",
          heading: "A Fraude Começa Fora da Estrada",
          paragraphs: [
            [
              "Se você deixar um fraudador assumir a boleia do caminhão, o Atlas Connect e o Atlas GR terão que travar uma guerra cibernética e tática para parar o veículo. A lógica do Atlas Profile é fundamentalmente mais simples e financeiramente mais inteligente: nós não deixamos o inimigo entrar no caminhão.",
            ],
            [
              "O Profile atua no 'Background Check' (Pesquisa de Antecedentes e Validação Documental de Alta Performance), operando como um filtro implacável que varre o histórico da frota e do condutor instantes antes do frete ser aprovado, protegendo o pátio, a carga e a marca do nosso cliente.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Ponto Crítico de Compliance e Risco Jurídico",
          text: [
            "Por lidar intensamente com reconhecimento facial e bases de dados criminais, o Profile exige adesão religiosa à Lei Geral de Proteção de Dados (LGPD). O menor erro de exposição, ou a exibição indevida de uma ficha criminal a um operador, pode custar milhões em multas regulatórias, processos e incalculável dano moral.",
          ],
        },
      ],
    },
    {
      id: "capitulo-1-motor",
      title: "Capítulo 1: O Motor de Checagem Rápida e as APIs",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "Na era jurássica da logística, despachantes gastavam dias consultando, aba a aba, os sites dos tribunais de justiça. Hoje, o ecossistema do Atlas Profile realiza milhares de requisições paralelas via ",
              { term: "api" },
              ", trazendo uma resposta determinística em segundos.",
            ],
          ],
        },
        {
          type: "stat",
          items: [
            { value: "3s", label: "Tempo médio de resposta do motor do Profile para consultas básicas." },
            { value: "40+", label: "Bases governamentais consultadas instantaneamente." }
          ]
        },
        {
          type: "image",
          url: "/brand/screenshots/perfil_securitario_profile.png",
          caption: "Tela Real de Pesquisa Profile (/search/profile): Formulário de submissão com dados do condutor (CPF, Nome, Filiação), CNH e validação biométrica com anonimização LGPD."
        },
        {
          type: "checklist",
          title: "Bases Governamentais Varridas Automaticamente",
          items: [
            "Tribunais de Justiça Estaduais e Federais (identificando Mandados de Prisão, Histórico de Furto, Roubo de Cargas e Formação de Quadrilha).",
            "Detran e Senatran (Validade da CNH, Suspensões, Categoria incompatível, Multas Críticas).",
            "ANTT (RNTRC do veículo ativo e da transportadora).",
            "Receita Federal e Sintegra (Situação cadastral do CPF e CNPJ).",
          ],
        },
      ],
    },
    {
      id: "capitulo-2-faceid",
      title: "Capítulo 2: A Morte da Falsidade Ideológica (Liveness e FaceID)",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "Se um golpista profissional rouba uma CNH real (física) de uma pessoa com ficha limpa, a consulta puramente textual em banco de dados vai inevitavelmente aprovar o documento. É exatamente neste ponto cego do mercado que entra o trunfo tecnológico da AtlasGR: a biometria facial com prova de vida.",
            ],
          ],
        },
        {
          type: "timeline",
          title: "A Jornada do Motorista no Fluxo de Liveness",
          items: [
            { label: "1. Gatilho (SMS/WhatsApp)", text: "O Motorista recebe um link seguro no seu dispositivo móvel diretamente na portaria ou doca de carregamento." },
            { label: "2. Prova de Vida (Liveness)", text: "Ao clicar, o sistema exige acesso à câmera frontal, obrigando o condutor a realizar micro-movimentos (sorrir, piscar, virar o rosto) para impedir o uso de fotos impressas ou vídeos (spoofing)." },
            { label: "3. Cruzamento Biométrico", text: "O motor de Inteligência Artificial processa o mapa facial em 3D e compara milimetricamente com a foto oficial hospedada nas bases do Governo Federal." },
            { label: "4. Veredito Automático", text: "Se o nível de similaridade não for suficientemente alto, o sistema levanta um red flag e a operação do frete é sumariamente interrompida (Status: Não Recomendado)." },
          ],
        },
      ],
    },
    {
      id: "capitulo-3-pareceres",
      title: "Capítulo 3: Os Pareceres, a Ética de Dados e a LGPD",
      blocks: [
        {
          type: "text",
          paragraphs: [
            [
              "A regra magna da LGPD é o Princípio da Necessidade. O cliente contratante (Transportadora ou Embarcador) necessita apenas de uma informação: 'Este motorista está apto para transportar a carga?'. Qualquer detalhe sobre o passado do indivíduo que extrapole essa resposta é uma violação legal gravíssima.",
            ],
          ],
        },
        {
          type: "comparison",
          title: "Visibilidade: O Que Entregamos vs O Que Protegemos",
          left: {
            label: "O Que Aparece no Painel do Cliente (Lícito)",
            points: ["Aprovado (Verde)", "Não Recomendado (Vermelho)", "Requer Atenção (Amarelo - Ex: CNH vencendo em 48h)"],
          },
          right: {
            label: "O Que NUNCA Aparece ao Cliente (Crime Compartilhar)",
            points: ["A íntegra e os autos de um mandado de prisão.", "O nome da tipificação criminal ou detalhes do Boletim de Ocorrência.", "Dados biométricos brutos ou fotos pessoais para download livre."],
          },
        },
      ],
    },
    {
      id: "estudo-de-caso",
      title: "Estudo de Caso: A Prevenção do Assalto Interno",
      blocks: [
        {
          type: "case",
          title: "A Fraude de 5 Milhões Abortada",
          text: "Caso real e emblemático na história da Atlas (2024): Uma transportadora tentou embarcar R$ 5 Milhões em notebooks. A base de dados textual aprovou o CPF — o motorista era ficha limpa. Porém, no teste de FaceID, a engine acusou 0% de similaridade facial, barrando o carregamento. Investigação posterior da CIA confirmou: um integrante de facção encontrou a CNH original do motorista e se apresentou na portaria. Sem a camada de biometria, o caminhão teria saído direto para o desmanche. O custo da licença do Atlas Profile salvou o cliente da falência.",
          source: "Arquivo Confidencial de Prevenção a Fraudes AtlasGR",
        },
      ],
    },
    {
      id: "capitulo-4-limites-contestacao",
      title: "Capítulo 4: Contestação e Parâmetros Decisórios (LGPD)",
      blocks: [
        {
          type: "text",
          heading: "Critérios Cirúrgicos de Avaliação",
          paragraphs: [
            [
              "É proibido usar o Atlas Profile como ferramenta de retaliação social. A LGPD classifica dados criminais como sensíveis. O algoritmo da Atlas decide reprovar apenas sob a finalidade rigorosa da segurança viária e patrimonial da carga.",
            ],
          ],
        },
        {
          type: "comparison",
          title: "Parâmetros Lícitos vs Ilícitos na Decisão",
          left: {
            label: "Motiva 'Não Recomendado' (Padrão Atlas)",
            points: [
              "Mandado de prisão em aberto para crimes contra o patrimônio (roubo, receptação, furto, quadrilha).",
              "CNH suspensa, cassada, falsificada ou com documentação irregular perante o Denatran.",
              "Veículo com licenciamento travado ou restrição de roubo/furto no sistema RENAVAM.",
            ],
          },
          right: {
            label: "Totalmente Ignorado pelo Motor (Blindagem Legal)",
            points: [
              "Ações de pensão alimentícia, divórcios, ou protestos em cartório cível.",
              "Crimes já prescritos ou cujas penas já foram totalmente cumpridas, sem relação direta com furtos no transporte.",
              "Questões raciais, filiação política ou partidária, e históricos médicos.",
            ],
          },
        },
        {
          type: "faq",
          items: [
            {
              q: "O motorista pode contestar legalmente um status 'Não Recomendado'?",
              a: "Sim. A LGPD garante o direito à revisão de decisões automatizadas. O motorista pode abrir um chamado oficial na central, apresentando, por exemplo, um alvará de soltura recente que ainda não consta no tribunal online.",
            },
            {
              q: "Quem analisa essa contestação? O despachante do cliente?",
              a: "Jamais. O cliente continua cego ao motivo. Quem analisa os autos documentais enviados pelo motorista é exclusivamente a C.I.A (Célula de Inteligência Atlas), sob confidencialidade máxima.",
            },
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
                    "**Contexto Operacional:** A vulnerabilidade humana é a principal porta de entrada para fraudes no transporte de cargas.",
                    "**O Problema (Dor do Cliente):** Criminosos usam identidades falsas para assumir cargas milionárias diretamente na origem."
                  ]
                },
                right: {
                  label: "A Resposta AtlasGR",
                  points: [
                    "**A Solução Tecnológica/Processual:** O Atlas Profile aplica biometria facial, OCR e background check em segundos, neutralizando o risco antes do embarque.",
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
          }
],
  summary: [
    "Profile varre antecedentes criminais, documentação de trânsito e fraudes em milissegundos via integrações massivas.",
    "O FaceID (Prova de vida biométrica) é a única vacina definitiva contra quadrilhas especializadas em falsidade ideológica.",
    "O Atlas blinda o cliente e a si mesmo contra processos trabalhistas e de danos morais, fornecendo um sinal verde/vermelho ao invés de dados criminais brutos.",
    "Cada motorista fraudulento bloqueado representa milhões em passivo evitado para a seguradora e para o embarcador.",
      "A metodologia de Contexto-Problema-Solução assegura que a tecnologia atue como um facilitador estratégico.",
      "Nossos padrões seguem frameworks rigorosos de governança Enterprise, onde falhas processuais não têm espaço."
],
  finalChecklist: [
    "Compreendo o papel crítico do FaceID com Liveness contra a fraude documental.",
    "Domino a fronteira entre dado essencial (status) e dado sensível (ficha criminal) regida pela LGPD.",
    "Sei conduzir a explicação sobre os critérios objetivos de reprovação e os direitos do titular (contestação).",
  ],
  mindMap: {
    root: "Atlas Profile Avançado",
    branches: [
      { label: "Motores API", items: ["Judiciário", "Senatran/ANTT", "Receita Federal", "Consultas em Segundos"] },
      { label: "Defesa Biométrica", items: ["FaceID", "Liveness Detection", "Anti-Spoofing"] },
      { label: "Segurança Jurídica", items: ["Princípio da Necessidade (LGPD)", "Blindagem do Cliente", "Direito de Revisão (CIA)"] },
    ],
  },
  scenario:
    "Cenário Complexo: O gerente de operações da transportadora te liga e diz: 'Eu preciso muito contratar esse motorista para uma carga urgente de medicamentos, mas o Profile deu Não Recomendado. Me fala exatamente qual é o crime dele para eu avaliar o risco.' Qual é a sua postura baseada no Capítulo 3?",
  diagram: {
    title: "O Muro de Contenção de Risco (Profile)",
    chart: "graph TD\n  Inicia[Input CNH/Placa] --> Triagem[Bases Gov (Detran, TJ, RF)]\n  Triagem -- Restrição Severa --> Rep[Status: Não Recomendado]\n  Triagem -- Limpo --> Bio[Gatilho SMS - Liveness]\n  Bio -- Rosto Falso / Foto --> Rep\n  Bio -- Autenticado --> Aprov[Status: Recomendado - Viagem Liberada]",
  },
};
