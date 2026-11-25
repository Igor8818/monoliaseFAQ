import type { BiosecurityCategory } from '../types/guide';

export const BIOSECURITY_CATEGORIES: BiosecurityCategory[] = [
  {
    id: 'bio-pessoas',
    title: 'Pessoas',
    shortSummary: 'Rotina e fluxo seguro dos trabalhadores na roça',
    accentTheme: 'green',
    riskLevel: 'Crítico',
    whyCritical:
      'Quem caminha entre os cacaueiros pode carregar esporos nas mãos, braços, cabelos e roupas de uma quadra suspeita para áreas totalmente sadias.',
    entrySteps: [
      'Planeje o percurso diário sempre das áreas mais novas e sadias para as áreas mais antigas ou suspeitas.',
      'Lave mãos e antebraços com água e sabão (ou álcool 70%) antes de iniciar os trabalhos na quadra.',
      'Capacite toda a equipe para reconhecer sinais suspeitos e NUNCA colher nem carregar frutos estranhos.',
    ],
    exitSteps: [
      'Higienize mãos, braços e celular com álcool 70% ou água e sabão ao encerrar a jornada.',
      'Se alguém identificar um fruto suspeito, essa pessoa não deve entrar em outras quadras no mesmo dia sem troca de roupa e banho.',
    ],
    recommendedDisinfectants: ['Água e sabão neutro', 'Álcool 70% em gel ou líquido'],
  },
  {
    id: 'bio-visitantes',
    title: 'Visitantes',
    shortSummary: 'Controle de acesso para técnicos e compradores',
    accentTheme: 'green',
    riskLevel: 'Crítico',
    whyCritical:
      'Visitantes, compradores de amêndoa e prestadores de serviço frequentemente visitam várias propriedades no mesmo dia, multiplicando o risco de transporte de esporos.',
    entrySteps: [
      'Mantenha registro simples de entrada (nome, data, origem e telefone).',
      'Peça que veículos de visitantes permaneçam estacionados fora da área de plantio.',
      'Forneça botas limpas da própria fazenda ou propés descartáveis e jaleco/avental quando necessário.',
    ],
    exitSteps: [
      'Recolha botas emprestadas para lavagem e desinfecção imediata com hipoclorito.',
      'Descarte propés em saco fechado na área de recepção — nunca dentro da roça.',
    ],
    recommendedDisinfectants: [
      'Pedilúvio com hipoclorito de sódio (solução 1% a 2%)',
      'Álcool 70% para mãos e equipamentos portáteis',
    ],
  },
  {
    id: 'bio-roupas',
    title: 'Roupas',
    shortSummary: 'Vestuário exclusivo e lavagem separada',
    accentTheme: 'brown',
    riskLevel: 'Alto',
    whyCritical:
      'Tecidos de algodão, bonés e mochilas acumulam facilmente esporos pulverulentos carregados pelo vento ou contato acidental com folhas e troncos.',
    entrySteps: [
      'Utilize roupas de trabalho exclusivas da propriedade (camisa de manga longa, calça e boné limpos).',
      'Evite entrar na lavoura com a mesma roupa usada em outra fazenda de cacau ou cupuaçu.',
    ],
    exitSteps: [
      'Retire e guarde roupas de campo em saco fechado até a lavagem, caso tenha passado próximo a área suspeita.',
      'Lave separadamente com água e sabão/detergente e seque ao sol pleno.',
    ],
    recommendedDisinfectants: [
      'Água e sabão/detergente comum em lavagem completa',
      'Secagem direta ao sol',
    ],
  },
  {
    id: 'bio-calcados',
    title: 'Calçados',
    shortSummary: 'Botas laváveis e uso de pedilúvio na entrada',
    accentTheme: 'brown',
    riskLevel: 'Crítico',
    whyCritical:
      'O solado das botas retém barro úmido e restos vegetais onde os esporos sobrevivem e são espalhados passo a passo pela plantação.',
    entrySteps: [
      'Dê preferência absoluta a botas de borracha lisas (fáceis de lavar, sem cadarços de tecido).',
      'Escove e lave toda a terra/barro do solado ANTES de pisar no pedilúvio (matéria orgânica inativa o cloro).',
      'Mergulhe as solas no pedilúvio por pelo menos 1 minuto.',
    ],
    exitSteps: [
      'Repita a lavagem e desinfecção dos calçados na saída da quadra.',
      'Renove a solução do pedilúvio diariamente ou sempre que ficar suja de lama.',
    ],
    recommendedDisinfectants: [
      'Hipoclorito de sódio (água sanitária diluída — use a Calculadora Sanitária)',
      'Amônio quaternário conforme bula agrícola',
    ],
  },
  {
    id: 'bio-ferramentas',
    title: 'Ferramentas',
    shortSummary: 'Desinfecção de facões, podões e tesouras',
    accentTheme: 'green',
    riskLevel: 'Crítico',
    whyCritical:
      'Lâminas de colheita e poda cortam pedúnculos e ramos continuamente, podendo transferir seiva contaminada e esporos de uma árvore para dezenas de outras.',
    entrySteps: [
      'Garanta que facões, podões e tesouras estejam limpos e desinfectados antes de começar na quadra.',
      'Leve borrifador com álcool 70% no cinto ou bainha durante a ronda.',
    ],
    exitSteps: [
      'Limpe resíduos de seiva/casca com pano e borrife álcool 70% entre cada cacaueiro ou ao mudar de linha.',
      'Se usar solução clorada ao fim do dia, enxágue e aplique fina camada de óleo mineral para evitar ferrugem.',
    ],
    recommendedDisinfectants: [
      'Álcool 70% (rápido e não oxida lâminas no uso contínuo)',
      'Solução de hipoclorito de sódio seguida de enxágue',
    ],
  },
  {
    id: 'bio-equipamentos',
    title: 'Equipamentos',
    shortSummary: 'Caixas, baldes, lonas de quebra e roçadeiras',
    accentTheme: 'green',
    riskLevel: 'Alto',
    whyCritical:
      'Caixas colhedoras, lonas usadas na quebra do cacau e sacarias circulando entre roças diferentes são pontos frequentes de contaminação cruzada.',
    entrySteps: [
      'Utilize caixas plásticas laváveis próprias da propriedade em vez de sacos de juta reutilizados.',
      'Inspecione e limpe roçadeiras e pulverizadores antes de entrarem na lavoura.',
    ],
    exitSteps: [
      'Lave caixas, baldes e lonas com água e sabão e aplique desinfetante ao término da colheita.',
      'Nunca empreste sacaria usada para transportar cacau fresco de outras propriedades.',
    ],
    recommendedDisinfectants: [
      'Água + detergente neutro para remoção de mucilagem',
      'Solução de hipoclorito de sódio ou amônio quaternário',
    ],
  },
  {
    id: 'bio-veiculos',
    title: 'Veículos',
    shortSummary: 'Estacionamento externo, pneus e carroceria',
    accentTheme: 'green',
    riskLevel: 'Alto',
    whyCritical:
      'Caminhonetes, tratores, carretas e motos transportam grandes quantidades de poeira, folhas secas e lama aderidas a pneus e caixas de roda por longas distâncias.',
    entrySteps: [
      'Defina uma área de embarque/estacionamento na entrada da fazenda, afastada das quadras.',
      'Veículos de fora só devem entrar se passarem por lavagem de pneus e pulverização desinfetante (ou rodolúvio).',
    ],
    exitSteps: [
      'Varra restos de folhas, cascas e terra da carroceria em local isolado e higienize com solução sanitária.',
      'Lave pneus e tapetes antes de visitar outra propriedade rural.',
    ],
    recommendedDisinfectants: [
      'Jato de água sob pressão (remoção prévia de barro)',
      'Solução de amônio quaternário ou hipoclorito de sódio',
    ],
  },
  {
    id: 'bio-material-vegetal',
    title: 'Material Vegetal',
    shortSummary: 'Mudas, garfos, frutos e cupuaçuzeiros',
    accentTheme: 'green',
    riskLevel: 'Crítico',
    whyCritical:
      'Frutos, sementes frescas, cascas e mudas de cacau e cupuaçu (Theobroma grandiflorum) são o meio direto de sobrevivência e multiplicação da Monilíase.',
    entrySteps: [
      'Só introduza mudas e hastes com certificação sanitária oficial, origem conhecida e PTV/CFO válidos.',
      'Mantenha lotes novos em observação separada antes do plantio definitivo.',
    ],
    exitSteps: [
      'NUNCA retire nem envie frutos inteiros, cascas ou sementes frescas para fora de áreas sob restrição sanitária.',
      'Lembre-se: cupuaçu e cacauí hospedam o mesmo fungo e exigem exatamente o mesmo rigor!',
    ],
    recommendedDisinfectants: [
      'Documentação obrigatória: RENASEM + Permissão de Trânsito de Vegetais (PTV)',
      'Compostagem/destruição controlada apenas sob orientação oficial',
    ],
  },
];
