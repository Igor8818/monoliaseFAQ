import type { SuspectStep } from '../types/guide';

export const SUSPECT_PROTOCOL_STEPS: SuspectStep[] = [
  {
    stepNumber: 1,
    title: 'Observe o Fruto',
    subtitle: 'Olhe com atenção, mas NÃO toque. Mantenha distância mínima de 30 cm.',
    iconKey: 'eye',
    attentionPoints: [
      'Há manchas escuras ou úmidas na casca?',
      'O fruto está com cor diferente do normal?',
      'Há massa esbranquiçada ou pulverulenta?',
      'O fruto parece mole ou murcho fora do padrão?',
    ],
    alertVariant: 'red',
    alertText: 'Nunca toque o fruto sem luvas. Não se aproxime se houver vento forte.',
  },
  {
    stepNumber: 2,
    title: 'Compare os Sinais',
    subtitle: 'Compare o fruto suspeito com os sintomas descritos neste guia.',
    iconKey: 'search',
    attentionPoints: [
      'Consulte a seção "Como Reconhecer" do aplicativo',
      'Compare com as fotos de sintomas iniciais, intermediários e avançados',
      'Verifique se frutos próximos apresentam sinais semelhantes',
      'Anote o que você observou para comunicar ao técnico',
    ],
    alertVariant: 'yellow',
    alertText:
      'Este aplicativo NÃO faz diagnóstico. As imagens são apenas para orientação comparativa.',
    hasQuickCompare: true,
  },
  {
    stepNumber: 3,
    title: 'Isole e Sinalize o Local',
    subtitle: 'Marque a árvore ou fileira de forma visível e afaste pessoas e animais.',
    iconKey: 'shield-alert',
    attentionPoints: [
      'Amarre uma fita colorida ou coloque uma estaca na árvore vizinha sem balançar o cacaueiro suspeito',
      'Suspenda temporariamente a colheita, poda ou roçagem naquela quadra',
      'Afaste trabalhadores e animais para evitar contato com o fruto',
      'Não jogue água nem aplique produtos sobre o fruto para não espalhar esporos',
    ],
    alertVariant: 'red',
    alertText:
      'Sacudir o galho ou golpear o fruto pode liberar uma nuvem invisível de milhões de esporos pelo ar.',
  },
  {
    stepNumber: 4,
    title: 'NÃO Colha nem Transporte',
    subtitle:
      'Deixe o fruto exatamente onde está e registre apenas informações e fotos à distância.',
    iconKey: 'ban',
    attentionPoints: [
      'NUNCA arranque o fruto para levar até vizinhos, cooperativas ou escritórios na cidade',
      'Se fotografar, mantenha distância mínima de 30 cm sem encostar o celular no fruto',
      'Anote o nome da fazenda, quadra/roça e um ponto de referência fácil de achar',
      'Se puder, capture a localização GPS aproximada abaixo (funciona mesmo sem internet)',
    ],
    alertVariant: 'red',
    alertText:
      'O transporte humano de frutos suspeitos é a principal forma de espalhar a Monilíase para novas regiões.',
    hasOfflineGps: true,
  },
  {
    stepNumber: 5,
    title: 'Higienize-se ao Sair da Área',
    subtitle: 'Descontamine calçados, mãos, celular e roupas antes de ir para outras roças.',
    iconKey: 'droplets',
    attentionPoints: [
      'Saia da quadra pelo caminho mais curto, evitando esbarrar em outras plantas',
      'Lave a lama das botas e desinfete no pedilúvio com solução de água sanitária',
      'Higienize mãos, braços e capa do celular com álcool 70% ou água e sabão',
      'Troque a roupa e lave-a separadamente antes de entrar em qualquer outra lavoura',
    ],
    alertVariant: 'yellow',
    alertText:
      'Esporos microscópicos aderem facilmente a tecidos, solados de bota, pneus e ferramentas.',
  },
  {
    stepNumber: 6,
    title: 'Notifique a Defesa Oficial',
    subtitle:
      'Apenas técnicos habilitados da CEPLAC ou Defesa Agropecuária devem coletar amostras.',
    iconKey: 'phone',
    attentionPoints: [
      'Ligue ou envie mensagem imediatamente para a CEPLAC ou Agência Estadual de Defesa Agropecuária',
      'Informe os sinais observados, a data e o ponto exato da propriedade',
      'Aguarde a visita técnica oficial para coleta segura e análise laboratorial',
      'Gere abaixo a Ficha Preliminar em PDF ou WhatsApp para agilizar o atendimento',
    ],
    alertVariant: 'green',
    alertText:
      'Avisar cedo protege a sua lavoura, a dos vizinhos e toda a cacauicultura brasileira. Não há punição por notificar suspeita!',
    isFinalNotification: true,
  },
];
