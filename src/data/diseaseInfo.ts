import type { DiseaseCyclePhase } from '../types/guide';

export const DISEASE_OVERVIEW = {
  title: 'O que é a Monilíase',
  scientificName: 'Moniliophthora roreri',
  subtitle: 'Entenda o agente causador, o ciclo oculto nos frutos e por que a prevenção é decisiva.',
  summaryCards: [
    {
      id: 'about-enemy',
      title: 'O que é e por que preocupa tanto?',
      body: 'A Monilíase é uma doença fúngica causada por Moniliophthora roreri, considerada uma das pragas mais destrutivas da cacauicultura mundial. Sem controle rigoroso, pode causar perdas de 50% a 100% da produção de frutos de uma lavoura.',
    },
    {
      id: 'about-hosts',
      title: 'Quais plantas são atacadas?',
      body: 'Ataca exclusivamente os FRUTOS (em qualquer idade) de espécies dos gêneros Theobroma e Herrania — principalmente o Cacaueiro (Theobroma cacao) e o Cupuaçuzeiro (Theobroma grandiflorum). Diferente da vassoura-de-bruxa, não infecta folhas, flores nem ramos.',
    },
  ],
  cyclePhases: [
    {
      phase: 1,
      timeframe: 'Dia 0',
      title: 'Chegada e penetração do esporo',
      description:
        'Com água livre sobre a casca (chuva ou orvalho intenso), o esporo germina e penetra diretamente na epiderme do fruto, especialmente em frutos jovens.',
    },
    {
      phase: 2,
      timeframe: 'Semanas 3 a 8',
      title: 'Incubação invisível (Período Crítico!)',
      description:
        'O fungo cresce por dentro do fruto destruindo polpa e sementes enquanto o fruto ainda parece sadio por fora. Por isso, NUNCA transporte frutos aparentemente normais de áreas sob risco.',
      isHiddenStage: true,
    },
    {
      phase: 3,
      timeframe: 'Semanas 6 a 10',
      title: 'Sintomas externos iniciais e intermediários',
      description:
        'Surgem deformações (gibas) em frutos novos, manchas aquosas, descoloração irregular e manchas marrom-chocolate que crescem e escurecem.',
    },
    {
      phase: 4,
      timeframe: '+7 a 10 dias após a mancha',
      title: 'Explosão de esporos (Pó branco/creme)',
      description:
        'Sobre a mancha marrom forma-se uma camada espessa e pulverulenta com bilhões de esporos secos, levados facilmente pelo vento, chuva, insetos e roupas.',
    },
    {
      phase: 5,
      timeframe: 'Meses seguintes',
      title: 'Mumificação e sobrevivência',
      description:
        'O fruto seca, encolhe e endurece virando uma "múmia" preta presa à árvore, mantendo esporos vivos por vários meses para reiniciar o ciclo na safra seguinte.',
    },
  ] as DiseaseCyclePhase[],
  dispersionComparison: {
    shortDistance: [
      'Vento carregando esporos secos por centenas de metros ou alguns quilômetros',
      'Respingos de chuva dentro da copa e entre cacaueiros vizinhos',
      'Contato de insetos, aves e animais silvestres com frutos esporulados',
    ],
    longDistance: [
      'Ser humano transportando frutos de cacau ou cupuaçu contaminados (principal causa!)',
      'Sementes frescas, cascas e mudas clandestinas sem certificação fitossanitária',
      'Roupas, botas com lama, ferramentas e carrocerias de veículos sem desinfecção',
    ],
  },
  institutionalRole:
    'A CEPLAC (Comissão Executiva do Plano da Lavoura Cacaueira) e o laboratório FITOMOL (Fitopatologia Molecular) atuam em conjunto com o MAPA e as agências estaduais no monitoramento, diagnóstico molecular de precisão, capacitação de produtores e pesquisa para resistência genética.',
};
