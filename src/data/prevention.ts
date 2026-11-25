import type { PreventionAvoidItem, PreventionDoItem } from '../types/guide';

export const PREVENTION_DO_ITEMS: PreventionDoItem[] = [
  {
    id: 'prev-do-1',
    text: 'Monitorar regularmente as plantas e os frutos',
    howTo:
      'Realize inspeções visuais pelo menos a cada 15 dias em toda a roça, observando especialmente frutos novos e medianos no tronco e nos ramos mais baixos, sobretudo após períodos chuvosos.',
  },
  {
    id: 'prev-do-2',
    text: 'Remover e enterrar frutos infectados a pelo menos 30 cm',
    howTo:
      'Em rotinas de manejo sanitário orientadas por técnico em áreas onde já há protocolo de controle, os frutos doentes são recolhidos em sacos fechados e enterrados a no mínimo 30 cm de profundidade com cobertura de terra/cal.',
    quarantineNote:
      'ATENÇÃO QUARENTENÁRIA: Se sua região é livre de Monilíase ou este for o primeiro achado suspeito, NÃO toque nem remova o fruto por conta própria — isole a área e acione imediatamente a CEPLAC ou Defesa Agropecuária.',
  },
  {
    id: 'prev-do-3',
    text: 'Desinfectar ferramentas com álcool 70% entre cada planta',
    howTo:
      'Passe álcool 70% ou solução de hipoclorito de sódio (água sanitária diluída) na lâmina de facões, podões e tesouras antes de passar para o próximo cacaueiro ou quadra, removendo antes a seiva e o barro.',
    hasCalculatorShortcut: true,
  },
  {
    id: 'prev-do-4',
    text: 'Manter espaçamento adequado entre plantas para arejamento',
    howTo:
      'Evite adensamento excessivo que forme microclima abafado e úmido. O vento circulando entre as copas seca o orvalho rapidamente e dificulta a germinação dos esporos.',
  },
  {
    id: 'prev-do-5',
    text: 'Realizar podas sanitárias periódicas',
    howTo:
      'Execute podas de limpeza, abertura de copa e controle de sombreamento para garantir entrada de luz solar, redução de umidade interna e facilidade de visualização dos frutos.',
  },
  {
    id: 'prev-do-6',
    text: 'Usar mudas certificadas e de origem conhecida',
    howTo:
      'Adquira mudas e hastes propagativas apenas de viveiros registrados no RENASEM/MAPA, exigindo nota fiscal e Permissão de Trânsito de Vegetais (PTV) quando aplicável.',
  },
  {
    id: 'prev-do-7',
    text: 'Manter registros de ocorrências na propriedade',
    howTo:
      'Anote datas de monitoramento, podas, entrada de visitantes e qualquer fruto atípico observado por quadra. Esse histórico agiliza a ação da assistência técnica.',
  },
  {
    id: 'prev-do-8',
    text: 'Buscar assistência técnica ao menor sinal suspeito',
    howTo:
      'Qualquer mancha atípica, deformação em bilro ou pó branco-creme deve ser comunicada imediatamente ao escritório local da CEPLAC ou à Agência de Defesa Agropecuária do seu estado.',
  },
];

export const PREVENTION_AVOID_ITEMS: PreventionAvoidItem[] = [
  {
    id: 'prev-avoid-1',
    text: 'Transportar frutos, sementes frescas ou cascas de cacau e cupuaçu entre propriedades, municípios ou estados',
    whyAvoid:
      'A movimentação humana de material vegetal é o principal vetor de introdução da Monilíase em regiões produtoras ainda livres da doença.',
  },
  {
    id: 'prev-avoid-2',
    text: 'Levar frutos suspeitos na caminhonete, mochila ou bolso para mostrar na cidade ou cooperativa',
    whyAvoid:
      'Um único fruto com esporos espalha milhões de partículas pelo trajeto, contaminando estradas, veículos e outras lavouras.',
  },
  {
    id: 'prev-avoid-3',
    text: 'Permitir entrada de visitantes, compradores ou veículos dentro das quadras sem higienização prévia',
    whyAvoid:
      'Solados de calçados, roupas usadas em outras fazendas e pneus transportam esporos invisíveis aderidos à poeira e à lama.',
  },
  {
    id: 'prev-avoid-4',
    text: 'Compartilhar facões, podões, tesouras, caixas ou sacarias entre propriedades sem desinfecção',
    whyAvoid:
      'Equipamentos de colheita e sacos de juta reutilizados retêm esporos viáveis por semanas quando não higienizados.',
  },
  {
    id: 'prev-avoid-5',
    text: 'Deixar frutos mumificados ou podres pendurados no cacaueiro entre uma safra e outra',
    whyAvoid:
      'Frutos mumificados funcionam como reservatórios permanentes, liberando novos esporos a cada ciclo de chuva e vento.',
  },
  {
    id: 'prev-avoid-6',
    text: 'Adquirir mudas, borbulhas ou sementes clandestinas sem certificação sanitária',
    whyAvoid:
      'Mudas sem procedência oficial podem introduzir pragas quarentenárias junto com o solo, substrato ou restos vegetais.',
  },
  {
    id: 'prev-avoid-7',
    text: 'Manipular frutos com massa esbranquiçada (pó) ou transitar de áreas suspeitas para áreas sadias',
    whyAvoid:
      'O simples toque ou a passagem em dias de vento libera nuvens de esporos que se fixam nas roupas e alcançam árvores vizinhas.',
  },
];
