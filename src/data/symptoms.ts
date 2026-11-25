import type { DiseaseComparison, SymptomItem } from '../types/guide';

export const SYMPTOMS_CATALOG: SymptomItem[] = [
  // INICIAIS (os 2 primeiros literais do protótipo + 2 complementares técnicos)
  {
    id: 'sym-manchas-aquosas',
    stage: 'iniciais',
    stageLabel: 'Inicial',
    title: 'Manchas Aquosas',
    shortDesc: 'Lesões escuras e úmidas na casca do fruto',
    image: './images/symptoms/manchas-aquosas.svg',
    detailedObservation:
      'Nas fases iniciais em frutos em crescimento, surgem pequenas manchas translúcidas, oleosas ou escuras na casca, com aspecto encharcado/úmido. Ao observar de perto (sem tocar), a superfície parece levemente afundada ou brilhante. Internamente, a polpa começa a amolecer antes mesmo de a mancha crescer muito por fora.',
    fieldChecklist: [
      'Manchas com aspecto molhado ou oleoso na casca do fruto.',
      'Contorno irregular, diferente de batida mecânica seca.',
      'Frequente em frutos de meia-idade após períodos chuvosos e quentes.',
    ],
  },
  {
    id: 'sym-descoloracao-inicial',
    stage: 'iniciais',
    stageLabel: 'Inicial',
    title: 'Descoloração Inicial',
    shortDesc: 'Mudança de cor atípica em fruto jovem',
    image: './images/symptoms/descoloracao-inicial.svg',
    detailedObservation:
      'Frutos ainda verdes e imaturos passam a apresentar pontos ou faixas amareladas, alaranjadas ou pálidas fora da época natural de maturação. Essa perda de uniformidade na cor costuma indicar infecção interna ocorrida semanas antes.',
    fieldChecklist: [
      'Fruto jovem com manchas amarelas antes do ponto de colheita.',
      'Perda do brilho natural da casca verde ou roxa.',
      'Coloração desigual concentrada em um dos lados do fruto.',
    ],
  },
  {
    id: 'sym-deformacoes-bossas',
    stage: 'iniciais',
    stageLabel: 'Inicial',
    title: 'Deformações e Bossas (Gibas)',
    shortDesc: 'Inchaços e calombos brilhantes em frutos novos',
    image: './images/symptoms/deformacoes-bossas.svg',
    detailedObservation:
      'Quando o fungo infecta bilros e frutos muito jovens (primeiras semanas após a fecundação), o crescimento do tecido fica desordenado. Surgem inchaços assimétricos, protuberâncias e calombos brilhantes chamados de gibas ou bossas.',
    fieldChecklist: [
      'Calombos ou caroços assimétricos na casca de frutos jovens.',
      'Fruto torto ou inchado em apenas uma lateral.',
      'Superfície da bossa frequentemente mais lisa e brilhante.',
    ],
  },
  {
    id: 'sym-amadurecimento-precoce',
    stage: 'iniciais',
    stageLabel: 'Inicial',
    title: 'Amadurecimento Precoce Irregular',
    shortDesc: 'Fruto verde amarela em manchas antes do tempo',
    image: './images/symptoms/descoloracao-inicial.svg',
    detailedObservation:
      'O fruto aparenta estar amadurecendo muito antes dos demais frutos da mesma florada, porém com ilhas ou placas amareladas que contrastam com regiões ainda verdes e duras. Esse falso amadurecimento precede o escurecimento rápido da casca.',
    fieldChecklist: [
      'Amarelamento prematuro fora do padrão do clone.',
      'Presença de ilhas verdes cercadas por áreas amareladas.',
      'Ausência de sintomas semelhantes em ramos ou folhas próximas.',
    ],
  },

  // INTERMEDIÁRIOS
  {
    id: 'sym-manchas-marrons',
    stage: 'intermediarios',
    stageLabel: 'Intermediário',
    title: 'Manchas Marrons Coalescentes',
    shortDesc: 'Lesões cor de chocolate que crescem e se unem',
    image: './images/symptoms/manchas-marrons.svg',
    detailedObservation:
      'As pequenas manchas iniciais expandem-se rapidamente com tonalidade marrom-chocolate a castanho-escura e bordas irregulares, fundindo-se (coalescendo) até cobrir grande parte do fruto. Diferente da podridão-parda, as lesões podem iniciar em qualquer ponto da casca.',
    fieldChecklist: [
      'Manchas marrom-chocolate de formato irregular (não apenas na ponta).',
      'Fusão de várias manchas formando grande placa escura.',
      'Fruto permanece preso firmemente ao tronco ou galho.',
    ],
  },
  {
    id: 'sym-aumento-peso',
    stage: 'intermediarios',
    stageLabel: 'Intermediário',
    title: 'Aumento Anormal de Peso',
    shortDesc: 'Fruto visivelmente mais pesado que frutos sadios',
    image: './images/symptoms/manchas-marrons.svg',
    detailedObservation:
      'Devido à transformação da polpa e mucilagem em massa úmida compacta pela ação do fungo, o fruto doente torna-se mais pesado e denso do que um fruto sadio de mesmo tamanho, antes mesmo de esporular externamente.',
    fieldChecklist: [
      'Apenas observe visualmente — não arranque nem transporte o fruto.',
      'Pedúnculo tensionado pelo peso excessivo do fruto lesionado.',
      'Sintoma frequentemente acompanhado de manchas marrons irregulares.',
    ],
  },
  {
    id: 'sym-podridao-interna',
    stage: 'intermediarios',
    stageLabel: 'Intermediário',
    title: 'Podridão Interna das Amêndoas',
    shortDesc: 'Amêndoas necrosadas e grudadas por dentro',
    image: './images/symptoms/podridao-interna.svg',
    detailedObservation:
      'Mesmo quando a casca externa ainda mostra pouca lesão, o interior do fruto já pode estar completamente comprometido: a polpa fica escura e aquosa e as amêndoas ficam grudadas entre si, escurecidas e sem valor comercial.',
    fieldChecklist: [
      'Amêndoas escuras, coladas e sem mucilagem branca sadia.',
      'Perda total da qualidade comercial mesmo com casca parcialmente verde.',
      'Atenção: não quebre frutos suspeitos em campo aberto para evitar dispersão.',
    ],
    criticalWarning:
      'Não abra nem manipule frutos suspeitos no meio da lavoura; deixe a coleta para a equipe oficial da Defesa Agropecuária / CEPLAC.',
  },

  // AVANÇADOS
  {
    id: 'sym-massa-pulverulenta',
    stage: 'avancados',
    stageLabel: 'Avançado',
    title: 'Massa Pulverulenta (Pó Branco/Creme)',
    shortDesc: 'Camada densa de pó branco-creme solta esporos ao vento',
    image: './images/symptoms/massa-pulverulenta.svg',
    detailedObservation:
      'Entre 7 e 10 dias após o aparecimento da mancha marrom, forma-se sobre a lesão uma crosta densa, aveludada e pulverulenta de cor branca que logo evolui para creme ou acinzentada. Essa massa parece talco ou farinha e contém bilhões de esporos prontos para voar com o menor sopro de vento.',
    fieldChecklist: [
      'Cobertura espessa semelhante a talco ou farinha branca/creme.',
      'Desprende poeira visível se o fruto for tocado ou balançado.',
      'Altíssimo risco de contaminação de toda a quadra pelo vento.',
    ],
    criticalWarning:
      'PERIGO MÁXIMO DE DISSEMINAÇÃO: Nunca toque, sacuda, sopre ou se aproxime em dias de vento forte.',
  },
  {
    id: 'sym-halo-amarelado',
    stage: 'avancados',
    stageLabel: 'Avançado',
    title: 'Halo Amarelado de Transição',
    shortDesc: 'Faixa amarelada contornando a mancha com pó branco',
    image: './images/symptoms/massa-pulverulenta.svg',
    detailedObservation:
      'À medida que a massa pulverulenta branca/creme avança sobre o tecido escuro do fruto, forma-se uma faixa amarelada nítida separando a área marrom necrosada da casca ainda verde.',
    fieldChecklist: [
      'Três zonas visíveis: pó branco/creme no centro, borda marrom e halo amarelo.',
      'Expansão rápida em clima quente e úmido.',
      'Sinal característico de esporulação ativa em frutos desenvolvidos.',
    ],
  },
  {
    id: 'sym-fruto-mumificado',
    stage: 'avancados',
    stageLabel: 'Avançado',
    title: 'Fruto Mumificado ("Múmia")',
    shortDesc: 'Fruto seco, preto e petrificado preso ao cacaueiro',
    image: './images/symptoms/fruto-mumificado.svg',
    detailedObservation:
      'Na etapa final, o fruto perde quase toda a umidade, encolhe, endurece e fica completamente preto e enrugado ("múmia"), permanecendo preso à árvore ou caído no solo. Essas múmias mantêm esporos viáveis por muitos meses entre safras.',
    fieldChecklist: [
      'Fruto totalmente seco, duro, encolhido e enegrecido.',
      'Permanece aderido ao tronco mesmo após a colheita.',
      'Reservatório persistente de esporos para a safra seguinte.',
    ],
    criticalWarning:
      'Em áreas sob suspeita de Monilíase, sinalize a árvore e acione a Defesa Agropecuária antes de remover.',
  },
];

export const DISEASE_COMPARISONS: DiseaseComparison[] = [
  {
    id: 'moniliase',
    name: 'Monilíase',
    scientificName: 'Moniliophthora roreri',
    image: './images/symptoms/massa-pulverulenta.svg',
    badgeColor: 'orange',
    quarantineStatus: 'Praga Quarentenária sob Controle Oficial',
    affectedOrgans: 'EXCLUSIVAMENTE frutos (cacau e cupuaçu) de qualquer idade.',
    lesionAspect:
      'Deformações (gibas) em frutos novos; manchas marrons irregulares que podem surgir em qualquer lado do fruto.',
    sporulation:
      'Camada DENSA de pó branco a creme/acinzentado (aspecto de talco), liberando nuvem de esporos ao vento.',
    fruitInterior:
      'Polpa aquosa e amêndoas podres e grudadas mesmo com pouca lesão externa.',
    progressionSpeed:
      'Incubação longa e oculta (3 a 8 semanas sem sintomas) antes de aparecer a mancha externa.',
    quickSignals: [
      'po-branco-denso',
      'so-no-fruto',
      'gibas-fruto-jovem',
      'amendoas-grudadas',
    ],
  },
  {
    id: 'podridao-parda',
    name: 'Podridão-Parda',
    scientificName: 'Phytophthora spp.',
    image: './images/symptoms/podridao-parda-ref.svg',
    badgeColor: 'brown',
    quarantineStatus: 'Endêmica comum nas regiões produtoras',
    affectedOrgans: 'Frutos, tronco (cancro), folhas e mudas.',
    lesionAspect:
      'Mancha marrom uniforme de contorno bem definido que quase sempre começa na ponta ou junto ao pedúnculo.',
    sporulation:
      'Micélio branco RALO e úmido (não forma pó solto denso como talco); odor característico de peixe/fermentado.',
    fruitInterior:
      'Podridão avança de fora para dentro acompanhando a mancha da casca; amêndoas soltas no início.',
    progressionSpeed:
      'Muito rápida: toma todo o fruto em cerca de 5 a 10 dias em época chuvosa.',
    quickSignals: ['mancha-uniforme-ponta', 'micelio-ralo'],
  },
  {
    id: 'vassoura-bruxa',
    name: 'Vassoura-de-Bruxa',
    scientificName: 'Moniliophthora perniciosa',
    image: './images/symptoms/vassoura-bruxa-ref.svg',
    badgeColor: 'purple',
    quarantineStatus: 'Endêmica (presente na Amazônia e Bahia)',
    affectedOrgans: 'Ramos vegetativos (lançamentos), almofadas florais E frutos.',
    lesionAspect:
      'Forma brotos grossos agrupados tipo "vassoura" nos ramos e frutos em formato de morango ou cenoura (murchos/petrificados).',
    sporulation:
      'NÃO produz pó branco espesso no fruto; produz pequenos cogumelos rosados após meses em vassouras secas.',
    fruitInterior:
      'Fruto endurecido (chumbinho/petrificado) sem produção de mucilagem normal.',
    progressionSpeed:
      'Brotações levam semanas para secar e meses para produzir cogumelos na época das chuvas.',
    quickSignals: ['ramos-em-vassoura', 'gibas-fruto-jovem'],
  },
];

export const COMPARATOR_SIGNAL_CHIPS = [
  { id: 'po-branco-denso', label: 'Pó branco denso tipo talco' },
  { id: 'so-no-fruto', label: 'Ataca só o fruto (ramos normais)' },
  { id: 'gibas-fruto-jovem', label: 'Calombos / gibas em fruto novo' },
  { id: 'mancha-uniforme-ponta', label: 'Mancha marrom uniforme na ponta' },
  { id: 'ramos-em-vassoura', label: 'Ramos secos em "vassoura"' },
] as const;
