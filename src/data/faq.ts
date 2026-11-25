import type { FaqItem } from '../types/guide';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-transportar-frutos',
    category: 'Transporte e Lei',
    question: 'Posso transportar frutos de cacau entre propriedades?',
    answer:
      'Não! O transporte de frutos frescos de cacau, cupuaçu, cascas ou sementes sem autorização sanitária oficial (PTV) é estritamente proibido nas áreas sob vigilância ou restrição quarentenária e deve ser evitado em qualquer região. Um fruto pode carregar o fungo incubado por semanas sem mostrar manchas por fora, levando a doença a dezenas de quilômetros de distância.',
    featuredOnHome: true,
    keyTakeaway: 'Nunca transporte frutos inteiros ou cascas entre roças e municípios.',
  },
  {
    id: 'faq-visitante-cuidado',
    category: 'Manejo e Visitas',
    question: 'O visitante deve tomar algum cuidado especial?',
    answer:
      'Sim. Todo visitante, comprador ou técnico deve estacionar o veículo fora das quadras produtivas, usar calçados limpos ou botas fornecidas pela propriedade após passagem no pedilúvio, higienizar mãos/equipamentos com álcool 70% e não entrar com roupas usadas recentemente em outra lavoura de cacau ou cupuaçu.',
    featuredOnHome: true,
    keyTakeaway: 'Estacionamento externo, botas higienizadas no pedilúvio e roupa limpa.',
  },
  {
    id: 'faq-diferenca-vassoura',
    category: 'Sintomas',
    question: 'A monilíase ataca folhas e ramos como a vassoura-de-bruxa?',
    answer:
      'Não. A Monilíase ataca exclusivamente os frutos (em qualquer idade). Já a vassoura-de-bruxa provoca brotações anormais secas nos ramos e almofadas florais ("vassouras"), além de poder deformar frutos sem formar aquela camada densa de pó branco-creme solto como talco.',
    featuredOnHome: true,
    keyTakeaway: 'Monilíase só infecta frutos; ramos e folhas ficam normais.',
  },
  {
    id: 'faq-quem-avisar',
    category: 'Notificação',
    question: 'Quem devo avisar se encontrar um fruto suspeito?',
    answer:
      'Avise imediatamente o escritório local da CEPLAC ou a Agência de Defesa Agropecuária do seu estado (ADAB na Bahia, ADEPARÁ no Pará, IDARON em Rondônia, ADAF no Amazonas, IDAF no Acre/ES) ou o MAPA. Use o guia "Fruto Suspeito" aqui do aplicativo para acessar os telefones diretos e gerar a ficha preliminar.',
    featuredOnHome: true,
    keyTakeaway: 'Acione CEPLAC ou a Defesa Agropecuária Estadual imediatamente.',
  },
  {
    id: 'faq-cupuacu',
    category: 'Sintomas',
    question: 'O cupuaçuzeiro do quintal também pega monilíase?',
    answer:
      'Sim! O cupuaçu (Theobroma grandiflorum) e espécies silvestres próximas (como cacauí) são hospedeiros diretos de Moniliophthora roreri. Os mesmos cuidados contra transporte de frutos e atenção aos sintomas valem integralmente para o cupuaçu.',
    keyTakeaway: 'Cupuaçu também é hospedeiro — aplique as mesmas regras sanitárias.',
  },
  {
    id: 'faq-amendoas-secas',
    category: 'Transporte e Lei',
    question: 'Amêndoas de cacau bem fermentadas e secas transmitem a doença?',
    answer:
      'O grande risco quarentenário está nos frutos inteiros, cascas, polpa fresca e sementes não processadas. Amêndoas devidamente fermentadas e secas (processadas conforme normas técnicas e livre de restos de casca/impurezas) têm risco drasticamente reduzido, mas devem sempre circular em sacaria limpa e dentro das exigências sanitárias vigentes do estado.',
    keyTakeaway: 'O risco crítico está no fruto inteiro, cascas e sementes frescas.',
  },
  {
    id: 'faq-punicao',
    category: 'Notificação',
    question: 'Serei multado ou perderei toda a fazenda se comunicar uma suspeita?',
    answer:
      'Não há punição por notificar uma suspeita de boa-fé! Pelo contrário: a notificação precoce permite que a equipe oficial confirme o diagnóstico rapidamente e aplique medidas focais de contenção, protegendo a sua propriedade e toda a região produtora. O risco grave está em esconder focos ou transportar frutos ilegalmente.',
    keyTakeaway: 'Notificar cedo protege sua produção e não gera punição ao produtor.',
  },
  {
    id: 'faq-fungicida-conta-propria',
    category: 'Manejo e Visitas',
    question: 'Posso aplicar fungicida ou derrubar o fruto suspeito por conta própria?',
    answer:
      'Ao encontrar um primeiro fruto suspeito em área livre da praga, NÃO derrube, NÃO queime e NÃO pulverize por conta própria antes da inspeção oficial. O jato de pulverizador e o manuseio amador podem soprar milhões de esporos para as árvores vizinhas e apagar evidências para a coleta técnica.',
    keyTakeaway: 'Não manipule nem pulverize antes da vistoria oficial da Defesa.',
  },
  {
    id: 'faq-diferenca-podridao-parda',
    category: 'Sintomas',
    question: 'Como diferenciar rapidamente Monilíase de Podridão-Parda?',
    answer:
      'Na Podridão-Parda, a mancha marrom é uniforme, de borda bem marcada, avança quase sempre a partir da ponta ou do cabo em poucos dias e cria apenas um mofo ralo e úmido. Na Monilíase, o fruto jovem costuma entortar com gibas/bossas, as manchas podem começar em qualquer lado do fruto e logo formam um pó branco/creme espesso que solta poeira ao vento.',
    keyTakeaway: 'Podridão-Parda: mancha uniforme da ponta. Monilíase: pó denso tipo talco.',
  },
  {
    id: 'faq-incubacao',
    category: 'Sintomas',
    question: 'Por que um fruto aparentemente sadio pode estar infectado?',
    answer:
      'Porque a Monilíase possui um período de incubação interna de 3 a 8 semanas. Durante todo esse tempo o fungo já está crescendo por dentro do fruto, mas a casca externa ainda continua verde e normal antes de surgir a primeira mancha.',
    keyTakeaway: 'O fungo pode ficar oculto por até 8 semanas dentro de frutos verdes.',
  },
  {
    id: 'faq-agua-sanitaria-medida',
    category: 'Manejo e Visitas',
    question: 'Qual a diluição correta de água sanitária para botas e ferramentas?',
    answer:
      'Para desinfecção sanitária no pedilúvio e lavagem de botas ou carrocerias, utiliza-se solução clorada (normalmente 1% a 2% de cloro ativo, conforme a água sanitária comercial tenha 2,0% ou 2,5% — lembre-se de lavar a lama antes). Use a Calculadora Sanitária integrada na aba Biossegurança para obter a medida exata em mL e copos de 200 mL.',
    keyTakeaway: 'Lave a sujeira antes; use a Calculadora Sanitária em Biossegurança.',
  },
  {
    id: 'faq-ferramenta-enferruja',
    category: 'Manejo e Visitas',
    question: 'O cloro estraga o facão e a tesoura de poda?',
    answer:
      'O hipoclorito de sódio oxida o aço se permanecer seco na lâmina. Por isso, durante a caminhada entre cacaueiros prefira borrifar álcool 70% nas ferramentas. Se usar solução clorada ao fim do dia, enxágue com água limpa, seque bem e passe uma camada fina de óleo protetor.',
    keyTakeaway: 'No campo entre plantas use álcool 70%; se usar cloro, enxágue e lubrifique.',
  },
  {
    id: 'faq-fruto-mumia',
    category: 'Sintomas',
    question: 'Fruto seco e preto ("múmia") na árvore ainda transmite a doença?',
    answer:
      'Sim! Os frutos mumificados abrigam esporos resistentes que podem permanecer viáveis por muitos meses presos à árvore ou no solo, sendo reativados pela umidade e dispersos pelo vento quando começa a nova estação chuvosa.',
    keyTakeaway: 'Múmias mantêm esporos viáveis por meses entre uma safra e outra.',
  },
  {
    id: 'faq-app-diagnostico',
    category: 'Notificação',
    question: 'Este aplicativo substitui a análise de laboratório da CEPLAC/FITOMOL?',
    answer:
      'Não. Este aplicativo é um guia educativo e de orientação comparativa em campo. Apenas exames laboratoriais realizados por técnicos oficiais credenciados pelo MAPA/CEPLAC confirmam ou descartam oficialmente a presença de Moniliophthora roreri.',
    keyTakeaway: 'Guia educativo e comparativo — diagnóstico oficial é somente laboratorial.',
  },
];
