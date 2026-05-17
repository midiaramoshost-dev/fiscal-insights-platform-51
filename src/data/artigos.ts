// Base de artigos âncora do portal. Conteúdo editorial original com FAQ,
// passo a passo e tabela para forte SEO + compliance Google AdSense.

export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "ul"; itens: string[] }
  | { tipo: "ol"; itens: string[] }
  | { tipo: "callout"; variant?: "info" | "warning" | "success"; titulo?: string; texto: string }
  | { tipo: "tabela"; cabecalho: string[]; linhas: string[][] };

export interface FAQ {
  pergunta: string;
  resposta: string;
}

export interface Autor {
  nome: string;
  cargo: string;
  bio: string;
  iniciais: string;
  avatar: string;
  credenciais?: string;
}

export interface Artigo {
  slug: string;
  categoria: "MEI" | "Imposto de Renda" | "Receita Federal" | "CPF" | "Simples Nacional" | "Parcelamentos" | "Guias Tributários";
  titulo: string;
  subtitulo: string;
  resumo: string;
  dataPublicacao: string; // ISO
  dataAtualizacao: string;
  autor: Autor;
  tags: string[];
  tempoLeituraMin: number;
  blocos: Bloco[];
  faq: FAQ[];
}

const avatarUrl = (seed: string, bg: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}&textColor=ffffff&fontWeight=700`;

const AUTOR_PRINCIPAL: Autor = {
  nome: "Equipe Editorial Conecta Fisco",
  cargo: "Redação Tributária",
  bio: "Time de contadores, advogados tributaristas e jornalistas especializados em legislação fiscal brasileira, com mais de 12 anos de experiência em Receita Federal, ICMS, Simples Nacional e direito do trabalho.",
  iniciais: "CF",
  avatar: avatarUrl("Conecta Fisco", "1d4ed8"),
  credenciais: "Redação verificada · Revisão técnica por contadores (CRC) e advogados (OAB)",
};

const AUTOR_MEI: Autor = {
  nome: "Renata Ribeiro",
  cargo: "Especialista em MEI e Simples Nacional",
  bio: "Contadora (CRC-SP), pós-graduada em Direito Tributário, atua há 10 anos com regularização de microempreendedores e parcelamentos junto à Receita Federal.",
  iniciais: "RR",
  avatar: avatarUrl("Renata Ribeiro", "059669"),
  credenciais: "CRC-SP · Pós em Direito Tributário (FGV)",
};

const AUTOR_IR: Autor = {
  nome: "Carlos Menezes",
  cargo: "Especialista em IRPF e e-CAC",
  bio: "Auditor fiscal aposentado, consultor em Imposto de Renda Pessoa Física há 15 anos, autor de materiais didáticos sobre malha fina e restituição.",
  iniciais: "CM",
  avatar: avatarUrl("Carlos Menezes", "0f172a"),
  credenciais: "Ex-auditor fiscal · 15 anos de consultoria em IRPF",
};

export const artigos: Artigo[] = [
  // 1 — DAS MEI
  {
    slug: "como-emitir-das-mei",
    categoria: "MEI",
    titulo: "Como emitir o DAS MEI 2026: passo a passo atualizado",
    subtitulo: "Guia completo para emitir, pagar e regularizar o boleto mensal do Microempreendedor Individual.",
    resumo:
      "Aprenda a emitir o DAS MEI pelo PGMEI, conferir valores atualizados, pagar em atraso com juros e evitar o cancelamento do CNPJ. Inclui FAQ e tabela 2026.",
    dataPublicacao: "2026-01-15",
    dataAtualizacao: "2026-05-10",
    autor: AUTOR_MEI,
    tags: ["MEI", "DAS", "PGMEI", "Simples Nacional"],
    tempoLeituraMin: 8,
    blocos: [
      { tipo: "p", texto: "O DAS MEI (Documento de Arrecadação do Simples Nacional) é o boleto mensal obrigatório que todo Microempreendedor Individual precisa emitir e pagar para manter o CNPJ ativo e ter direito aos benefícios previdenciários do INSS. O valor é fixo, calculado sobre o salário mínimo vigente, e o vencimento sempre ocorre no dia 20 de cada mês." },
      { tipo: "p", texto: "Neste guia, você vai aprender o passo a passo completo para emitir o DAS pelo Portal do Empreendedor, conferir os valores atualizados para 2026, pagar guias em atraso com cálculo automático de juros e multa e, principalmente, evitar a exclusão do Simples Nacional por inadimplência." },
      { tipo: "h2", texto: "O que é o DAS MEI e por que pagar em dia?" },
      { tipo: "p", texto: "O DAS unifica em uma única guia três tributos: a contribuição previdenciária de 5% sobre o salário mínimo (INSS), o ICMS estadual (R$ 1,00) para comércio e indústria, e o ISS municipal (R$ 5,00) para prestadores de serviço. O pagamento em dia garante o direito a aposentadoria por idade, auxílio-doença, salário-maternidade e pensão por morte." },
      { tipo: "callout", variant: "warning", titulo: "Atenção", texto: "MEI com 12 boletos em atraso pode ter o CNPJ cancelado de ofício pela Receita Federal, perder o tempo de contribuição ao INSS e ser inscrito na Dívida Ativa da União." },
      { tipo: "h2", texto: "Valores do DAS MEI em 2026" },
      { tipo: "tabela", cabecalho: ["Atividade", "INSS (5%)", "ICMS", "ISS", "Total mensal"], linhas: [
        ["Comércio ou Indústria", "R$ 75,90", "R$ 1,00", "—", "R$ 76,90"],
        ["Prestação de Serviço", "R$ 75,90", "—", "R$ 5,00", "R$ 80,90"],
        ["Comércio e Serviço", "R$ 75,90", "R$ 1,00", "R$ 5,00", "R$ 81,90"],
        ["MEI Caminhoneiro (12%)", "R$ 182,16", "R$ 1,00", "R$ 5,00", "até R$ 188,16"],
      ]},
      { tipo: "p", texto: "Os valores são reajustados todo mês de janeiro com base no salário mínimo. Para 2026 considera-se o salário mínimo de R$ 1.518,00. Confira sempre o valor exato no momento da emissão, pois pode haver ajustes." },
      { tipo: "h2", texto: "Passo a passo: como emitir o DAS MEI" },
      { tipo: "ol", itens: [
        "Acesse o Portal do Empreendedor em gov.br/empresas-e-negocios/pt-br/empreendedor.",
        "Clique em 'Já sou MEI' e depois em 'Pagamento de contribuição mensal e parcelamentos'.",
        "Você será redirecionado ao PGMEI (Programa Gerador do DAS para o MEI).",
        "Informe o CNPJ do MEI e a chave de acesso (CPF, código de acesso ou login gov.br nível prata/ouro).",
        "Escolha 'Emitir guia de pagamento (DAS)' e selecione o ano-calendário desejado.",
        "Marque os meses que deseja gerar — pode emitir um mês ou todos os pendentes de uma vez.",
        "Clique em 'Apurar/Gerar DAS'. O sistema calcula automaticamente juros e multa se houver atraso.",
        "Baixe o PDF, copie o código de barras e pague em qualquer banco, app, internet banking ou PIX.",
      ]},
      { tipo: "callout", variant: "success", titulo: "Dica", texto: "Você pode programar débito automático no PGMEI, evitando esquecer o vencimento mensal." },
      { tipo: "h2", texto: "Como pagar DAS MEI em atraso" },
      { tipo: "p", texto: "Boletos vencidos são reemitidos pelo próprio PGMEI com a inclusão automática de multa de 0,33% ao dia (limitada a 20%) e juros Selic acumulada. Não é preciso solicitar nada à Receita: basta marcar o mês em atraso no momento da emissão e o sistema atualiza o valor para a data do pagamento." },
      { tipo: "h3", texto: "Tenho muitos meses em atraso. E agora?" },
      { tipo: "p", texto: "Se a dívida for alta, o MEI pode parcelar em até 60 vezes pelo próprio PGMEI, com parcela mínima de R$ 50,00. O parcelamento regulariza a situação cadastral e mantém o CNPJ ativo enquanto as parcelas forem pagas em dia." },
      { tipo: "h2", texto: "O que acontece se eu não pagar o DAS?" },
      { tipo: "ul", itens: [
        "Perda do tempo de contribuição ao INSS daquele período.",
        "Inscrição da dívida em Dívida Ativa da União, com acréscimo de 20% de encargos legais.",
        "Bloqueio para emissão de Certidão Negativa de Débitos (CND).",
        "Risco de exclusão de ofício do Simples Nacional após 12 meses sem pagamento.",
        "Cancelamento do CNPJ pela Receita Federal em caso de omissão prolongada.",
      ]},
      { tipo: "h2", texto: "Como conferir se o pagamento foi compensado" },
      { tipo: "p", texto: "Após 2 dias úteis do pagamento, acesse novamente o PGMEI e clique em 'Consulta Extrato/Pendências'. Lá você vê todos os DAS pagos, em aberto e em parcelamento. Recomenda-se também emitir, ao final de cada ano, a DASN-SIMEI (Declaração Anual do MEI), obrigação acessória até 31 de maio." },
    ],
    faq: [
      { pergunta: "Qual o valor do DAS MEI em 2026?", resposta: "Em 2026 o DAS MEI varia de R$ 76,90 (comércio/indústria) a R$ 81,90 (comércio e serviço), considerando o salário mínimo de R$ 1.518,00. MEI Caminhoneiro paga 12% sobre o salário mínimo, totalizando até R$ 188,16." },
      { pergunta: "Qual o dia de vencimento do DAS?", resposta: "O DAS MEI vence sempre no dia 20 de cada mês. Quando cai em fim de semana ou feriado, é prorrogado para o próximo dia útil." },
      { pergunta: "Posso pagar o DAS via PIX?", resposta: "Sim. O boleto DAS emitido pelo PGMEI traz QR Code PIX e código de barras, permitindo pagamento em qualquer banco." },
      { pergunta: "O que acontece se eu não pagar o DAS por 12 meses?", resposta: "O MEI pode ser excluído do Simples Nacional, ter o CNPJ cancelado e perder o tempo de contribuição ao INSS daquele período. Para evitar, regularize via parcelamento no PGMEI." },
      { pergunta: "Preciso emitir DAS mesmo sem faturamento?", resposta: "Sim. A contribuição é obrigatória mesmo nos meses sem faturamento, pois garante a cobertura previdenciária do INSS." },
    ],
  },

  // 2 — Regularizar CPF
  {
    slug: "como-regularizar-cpf",
    categoria: "CPF",
    titulo: "Como regularizar o CPF online em 2026: pendências, suspensão e cancelamento",
    subtitulo: "Veja como consultar sua situação cadastral na Receita Federal e regularizar CPF suspenso ou pendente sem sair de casa.",
    resumo: "Tutorial completo para consultar e regularizar CPF online: situações 'pendente', 'suspenso' e 'cancelado', documentos exigidos e prazos.",
    dataPublicacao: "2026-02-02",
    dataAtualizacao: "2026-05-12",
    autor: AUTOR_PRINCIPAL,
    tags: ["CPF", "Receita Federal", "Regularização"],
    tempoLeituraMin: 9,
    blocos: [
      { tipo: "p", texto: "Ter o CPF irregular impede a abertura de contas bancárias, emissão de passaporte, financiamentos, matrícula em concursos, contratação de planos de saúde e até o recebimento de benefícios como Bolsa Família e seguro-desemprego. A boa notícia: em 2026 a regularização é quase toda online, gratuita e rápida pelo portal da Receita Federal." },
      { tipo: "h2", texto: "As 5 situações possíveis do seu CPF" },
      { tipo: "tabela", cabecalho: ["Situação", "O que significa", "Pode usar?"], linhas: [
        ["Regular", "Cadastro em ordem, sem pendências.", "Sim"],
        ["Pendente de Regularização", "Falta entregar Declaração de IR ou atualizar dados.", "Restrito"],
        ["Suspenso", "Inconsistência cadastral (nome, mãe, data de nascimento).", "Restrito"],
        ["Cancelado", "Cancelado por decisão judicial, multiplicidade ou óbito.", "Não"],
        ["Nula", "Fraude ou inscrição indevida.", "Não"],
      ]},
      { tipo: "h2", texto: "Como consultar a situação do seu CPF" },
      { tipo: "ol", itens: [
        "Acesse servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp.",
        "Informe o número do CPF e a data de nascimento.",
        "Marque o reCAPTCHA e clique em 'Consultar'.",
        "Verifique a situação cadastral exibida na tela.",
      ]},
      { tipo: "callout", variant: "info", texto: "Você também pode consultar pelo app gov.br ou Carteira de Documentos Digital, fazendo login com sua conta gov.br nível prata ou ouro." },
      { tipo: "h2", texto: "Como regularizar CPF pendente" },
      { tipo: "p", texto: "A pendência mais comum decorre da não entrega da Declaração do Imposto de Renda nos últimos 5 anos. Para resolver:" },
      { tipo: "ol", itens: [
        "Verifique no e-CAC se há declarações de IRPF em aberto.",
        "Baixe o programa IRPF do ano correspondente no site da Receita.",
        "Entregue a declaração em atraso (haverá multa mínima de R$ 165,74).",
        "Aguarde até 48h para a situação 'Regular' aparecer.",
      ]},
      { tipo: "h2", texto: "Como regularizar CPF suspenso" },
      { tipo: "p", texto: "A suspensão decorre de divergência entre os dados do CPF e os de outras bases (Título de Eleitor, Cartório, Detran). A regularização é feita pelo portal gov.br/receitafederal:" },
      { tipo: "ol", itens: [
        "Acesse o portal e clique em 'Alterar Dados do CPF'.",
        "Faça login com a conta gov.br.",
        "Preencha o formulário com os dados corretos (nome completo, nome da mãe, data de nascimento).",
        "Confirme com selfie de validação facial.",
        "Em até 24h a situação muda para 'Regular' sem custo.",
      ]},
      { tipo: "callout", variant: "warning", titulo: "Não tenho conta gov.br", texto: "Sem conta nível prata ou ouro, é preciso ir presencialmente a uma agência da Receita Federal, Banco do Brasil, Caixa Econômica ou Correios com RG, comprovante de residência e título de eleitor." },
      { tipo: "h2", texto: "CPF cancelado: o que fazer" },
      { tipo: "p", texto: "Quando o CPF aparece como 'Cancelado', a regularização presencial é obrigatória, com apresentação de RG e certidão de nascimento ou casamento. Em casos de cancelamento por óbito indevido, é preciso levar também a certidão negativa de óbito do cartório." },
      { tipo: "h2", texto: "CPF de menor de idade ou recém-nascido" },
      { tipo: "p", texto: "Hoje o CPF é gerado automaticamente no momento do registro civil. Para crianças sem CPF, basta o responsável solicitar gratuitamente pelo portal Meu CPF, anexando certidão de nascimento digitalizada." },
    ],
    faq: [
      { pergunta: "Qual o custo para regularizar o CPF?", resposta: "A regularização online pelo portal gov.br/receitafederal é gratuita. Apenas há cobrança de R$ 7,00 quando feita presencialmente em conveniados (Correios, Caixa, BB)." },
      { pergunta: "Em quanto tempo o CPF é regularizado?", resposta: "Online a atualização ocorre em até 24 a 48 horas. Presencialmente, em até 5 dias úteis." },
      { pergunta: "Posso regularizar o CPF de outra pessoa?", resposta: "Apenas com procuração eletrônica registrada no e-CAC ou procuração pública autenticada para atendimento presencial." },
      { pergunta: "Por que meu CPF aparece como pendente se nunca declarei IR?", resposta: "Se você se enquadrou como obrigado a declarar (renda acima do limite, posse de bens etc.) em algum ano e não entregou, o CPF fica pendente. Entregue a declaração em atraso para regularizar." },
      { pergunta: "É verdade que dá para regularizar pelo WhatsApp?", resposta: "Não. A Receita Federal não atende por WhatsApp. Cuidado com golpes — use sempre os canais oficiais gov.br." },
    ],
  },

  // 3 — Restituição IR
  {
    slug: "como-consultar-restituicao-ir",
    categoria: "Imposto de Renda",
    titulo: "Como consultar restituição do Imposto de Renda 2026",
    subtitulo: "Calendário, lotes, valores e como saber se você caiu na malha fina.",
    resumo: "Veja o calendário oficial dos lotes da restituição do IRPF 2026, como consultar pelo e-CAC e o que fazer se cair na malha fina.",
    dataPublicacao: "2026-04-01",
    dataAtualizacao: "2026-05-15",
    autor: AUTOR_IR,
    tags: ["IRPF", "Restituição", "Malha Fina", "e-CAC"],
    tempoLeituraMin: 9,
    blocos: [
      { tipo: "p", texto: "A restituição do Imposto de Renda é o valor que a Receita Federal devolve ao contribuinte que pagou imposto a mais ao longo do ano. Em 2026, o pagamento ocorre em cinco lotes mensais entre maio e setembro, sempre no último dia útil de cada mês. Para receber, é essencial declarar dentro do prazo e atualizar a conta bancária ou chave PIX (apenas CPF) no programa." },
      { tipo: "h2", texto: "Calendário oficial dos lotes 2026" },
      { tipo: "tabela", cabecalho: ["Lote", "Data prevista", "Prioridade"], linhas: [
        ["1º Lote", "30/05/2026", "Idosos 80+, contribuintes com deficiência, professores e quem usou pré-preenchida ou PIX"],
        ["2º Lote", "30/06/2026", "Demais idosos 60+ e deficientes"],
        ["3º Lote", "31/07/2026", "Professores e usuários da pré-preenchida"],
        ["4º Lote", "29/08/2026", "Demais contribuintes"],
        ["5º Lote", "30/09/2026", "Últimas declarações entregues no prazo"],
      ]},
      { tipo: "h2", texto: "Como consultar se a sua restituição saiu" },
      { tipo: "ol", itens: [
        "Acesse www.gov.br/receitafederal e clique em 'Restituição IRPF'.",
        "Informe CPF, data de nascimento e ano da declaração.",
        "Marque o reCAPTCHA e clique em 'Consultar'.",
        "O sistema mostra: lote previsto, valor com juros Selic e situação (pago, agendado, em processamento, malha).",
      ]},
      { tipo: "callout", variant: "success", titulo: "Atalho", texto: "Pelo app 'Meu Imposto de Renda' você consulta com biometria gov.br e recebe notificação automática quando o pagamento for liberado." },
      { tipo: "h2", texto: "Como antecipar a restituição (prioridades)" },
      { tipo: "ul", itens: [
        "Declarar usando a Declaração Pré-Preenchida.",
        "Optar por receber via chave PIX (somente CPF).",
        "Entregar nos primeiros dias do prazo (março).",
        "Não ter pendências cadastrais nem inconsistências.",
      ]},
      { tipo: "h2", texto: "Caí na malha fina. E agora?" },
      { tipo: "p", texto: "Estar em malha fiscal significa que a Receita identificou divergências entre o que você declarou e os dados de terceiros (fontes pagadoras, planos de saúde, imóveis). Para verificar:" },
      { tipo: "ol", itens: [
        "Acesse o e-CAC com conta gov.br nível prata/ouro.",
        "Clique em 'Meu Imposto de Renda' → 'Extrato do Processamento'.",
        "Leia o motivo da retenção (Quadro 'Pendências').",
        "Se houver erro, faça a Declaração Retificadora pelo próprio programa IRPF.",
        "Se a Receita tiver razão, aguarde a intimação ou pague o complemento via DARF.",
      ]},
      { tipo: "callout", variant: "warning", titulo: "Prazo", texto: "Você pode retificar a declaração por até 5 anos após a entrega, mas se houver intimação fiscal o prazo é o do edital — geralmente 20 dias." },
      { tipo: "h2", texto: "Recebi menos do que esperava. Por quê?" },
      { tipo: "p", texto: "A Receita pode reter parte da restituição para compensar débitos com a União, como IPVA federal, dívidas no CADIN ou parcelamentos em atraso. O extrato mostra esse abatimento em 'Compensação de débitos'." },
      { tipo: "h2", texto: "O que fazer se a restituição não cair" },
      { tipo: "p", texto: "Se a data prevista passou e o valor não entrou, possíveis motivos são: dados bancários incorretos, conta encerrada ou conta conjunta na qualidade de não titular. Nestes casos, o valor fica disponível por até 1 ano para reagendamento pelo portal BB Restituição IR." },
    ],
    faq: [
      { pergunta: "Quando começa o pagamento da restituição em 2026?", resposta: "O primeiro lote é pago em 30 de maio de 2026, contemplando prioridades legais e usuários da declaração pré-preenchida com PIX." },
      { pergunta: "Restituição via PIX é mais rápida?", resposta: "Sim. Quem informa a chave PIX (CPF) recebe nos primeiros lotes e tem menor risco de erro bancário." },
      { pergunta: "É possível receber restituição mesmo com dívida na União?", resposta: "Sim, mas a Receita pode reter parte para compensar débitos federais inscritos no CADIN ou Dívida Ativa." },
      { pergunta: "Quem caiu na malha precisa esperar a Receita chamar?", resposta: "Não. Você pode entrar no e-CAC, identificar a pendência e retificar a declaração sem aguardar intimação." },
      { pergunta: "Por quanto tempo posso resgatar a restituição não recebida?", resposta: "Por 1 ano, pelo site bb.com.br/irpf, com login bancário. Após esse prazo, é preciso solicitar pelo e-CAC." },
    ],
  },

  // 4 — Emitir DARF
  {
    slug: "como-emitir-darf",
    categoria: "Receita Federal",
    titulo: "Como emitir DARF atualizado: guia passo a passo no Sicalc 2026",
    subtitulo: "Aprenda a gerar DARF online com cálculo automático de juros e multa, pagar e regularizar tributos federais.",
    resumo: "Tutorial completo para emitir DARF (Documento de Arrecadação de Receitas Federais) pelo Sicalc Web, incluindo códigos de receita mais usados e exemplos práticos.",
    dataPublicacao: "2026-01-22",
    dataAtualizacao: "2026-05-08",
    autor: AUTOR_PRINCIPAL,
    tags: ["DARF", "Receita Federal", "Sicalc", "Tributos"],
    tempoLeituraMin: 8,
    blocos: [
      { tipo: "p", texto: "O DARF (Documento de Arrecadação de Receitas Federais) é a guia usada para pagar tributos administrados pela Receita Federal: IRPF, IRPJ, IOF, PIS, COFINS, contribuições previdenciárias, multas e parcelamentos. Desde 2022, todas as emissões ocorrem pelo Sicalc Web, ferramenta online gratuita que calcula automaticamente juros, multa e atualiza valores em atraso." },
      { tipo: "h2", texto: "Quando você precisa emitir um DARF" },
      { tipo: "ul", itens: [
        "Pagamento do IRPF apurado ('imposto a pagar') na declaração anual.",
        "Carnê-leão de aluguéis, autônomos e profissionais liberais.",
        "Ganho de capital na venda de imóveis, ações ou criptoativos.",
        "Recolhimento de IRRF retido na fonte por empresas.",
        "Multas isoladas, parcelamentos e tributos diversos.",
      ]},
      { tipo: "h2", texto: "Passo a passo no Sicalc Web" },
      { tipo: "ol", itens: [
        "Acesse sicalc.receita.economia.gov.br/sicalc/principal.",
        "Clique em 'Calcular e emitir DARF'.",
        "Informe o período de apuração (mês/ano de referência).",
        "Selecione o tipo de contribuinte: Pessoa Física ou Jurídica.",
        "Digite o código da receita (ex.: 0211 para IRPF, 4600 para Carnê-leão, 4600 para Ganho de Capital).",
        "Informe o CPF/CNPJ e o valor do principal.",
        "Defina a data de pagamento desejada — o sistema calcula juros Selic e multa de 0,33% ao dia (limitada a 20%).",
        "Clique em 'Gerar DARF', baixe o PDF ou copie o código de barras.",
        "Pague em qualquer banco, app ou via PIX no QR Code do boleto.",
      ]},
      { tipo: "h2", texto: "Códigos de receita mais usados" },
      { tipo: "tabela", cabecalho: ["Código", "Descrição", "Periodicidade"], linhas: [
        ["0190", "IRPJ - Lucro Real", "Trimestral / Mensal"],
        ["0211", "IRPF - Quotas / Carnê", "Mensal"],
        ["4600", "Carnê-leão e ganho capital PF", "Mensal"],
        ["1708", "IRRF - Trabalho assalariado", "Mensal"],
        ["8109", "PIS/Pasep - Faturamento", "Mensal"],
        ["2172", "COFINS - Faturamento", "Mensal"],
        ["1138", "CSLL - Lucro Real", "Trimestral"],
        ["5952", "Multa Isolada", "Eventual"],
      ]},
      { tipo: "callout", variant: "info", texto: "O código da receita é o item mais importante do DARF: pagar com código errado equivale a não pagar e gera autuação. Em caso de dúvida, consulte o contador ou a tabela completa no site da Receita." },
      { tipo: "h2", texto: "Como pagar DARF em atraso" },
      { tipo: "p", texto: "O Sicalc atualiza o DARF para qualquer data futura: basta alterar a data de pagamento no momento da emissão. O cálculo segue a fórmula: principal + multa de mora (0,33% por dia, limitada a 20%) + juros Selic acumulada desde o vencimento até o pagamento." },
      { tipo: "h2", texto: "Posso pagar DARF via PIX?" },
      { tipo: "p", texto: "Sim. Desde 2023, todo DARF emitido pelo Sicalc traz QR Code PIX já com cálculo atualizado, eliminando atraso de compensação bancária. O pagamento é reconhecido pela Receita Federal no mesmo dia útil." },
      { tipo: "h2", texto: "DARF Simples (DAS): diferenças" },
      { tipo: "p", texto: "O DAS (Documento de Arrecadação do Simples Nacional) é diferente do DARF: o DAS é emitido pelo PGDAS-D (para optantes do Simples Nacional) e unifica tributos federais, estaduais e municipais em uma única guia. Já o DARF é exclusivo para tributos federais isolados." },
    ],
    faq: [
      { pergunta: "Como emito DARF para pagar o IRPF?", resposta: "Após gerar a declaração no programa IRPF, o próprio sistema disponibiliza o DARF da 1ª quota ou quota única. Para quotas seguintes, use o Sicalc Web com código 0211." },
      { pergunta: "É possível parcelar DARF?", resposta: "DARFs vencidos podem ser parcelados pelo e-CAC, em até 60 meses, com parcela mínima de R$ 200,00." },
      { pergunta: "Errei o código de receita. O que fazer?", resposta: "Solicite a Redarf (Retificação de DARF) pelo e-CAC, em até 5 anos do pagamento, anexando documento que comprove o erro." },
      { pergunta: "DARF perdido pode ser reemitido?", resposta: "Sim. Acesse o Sicalc com os mesmos dados ou recupere comprovantes no e-CAC em 'Pagamentos e Parcelamentos'." },
      { pergunta: "Existe valor mínimo para emitir DARF?", resposta: "O valor mínimo de DARF é de R$ 10,00. Valores menores devem ser somados ao tributo do mês seguinte." },
    ],
  },

  // 5 — e-CAC
  {
    slug: "como-acessar-e-cac",
    categoria: "Receita Federal",
    titulo: "Como acessar o e-CAC: guia completo do Centro Virtual da Receita Federal",
    subtitulo: "Tudo que você pode fazer no e-CAC: extrato, malha fina, parcelamentos, certidões e procuração eletrônica.",
    resumo: "Aprenda a criar conta gov.br, acessar o e-CAC e utilizar os principais serviços fiscais online da Receita Federal sem sair de casa.",
    dataPublicacao: "2026-02-12",
    dataAtualizacao: "2026-05-09",
    autor: AUTOR_PRINCIPAL,
    tags: ["e-CAC", "gov.br", "Receita Federal", "Serviços Online"],
    tempoLeituraMin: 9,
    blocos: [
      { tipo: "p", texto: "O e-CAC (Centro Virtual de Atendimento da Receita Federal) é o portal que reúne mais de 100 serviços fiscais para pessoas físicas e jurídicas. Por meio dele, você consulta extrato do IRPF, situação no Simples Nacional, débitos pendentes, parcela tributos, emite certidões e até cadastra procurações eletrônicas — tudo sem precisar ir a uma agência." },
      { tipo: "h2", texto: "Quem pode acessar o e-CAC" },
      { tipo: "p", texto: "Qualquer pessoa física com CPF regular ou jurídica com CNPJ ativo pode acessar. O acesso é gratuito e exige um dos seguintes métodos:" },
      { tipo: "ul", itens: [
        "Conta gov.br nível prata ou ouro (mais usada).",
        "Certificado Digital e-CPF ou e-CNPJ.",
        "Código de acesso gerado no próprio e-CAC (para pessoa física com Título de Eleitor e dois últimos IRPF).",
      ]},
      { tipo: "h2", texto: "Como criar conta gov.br nível prata ou ouro" },
      { tipo: "ol", itens: [
        "Baixe o aplicativo gov.br na App Store ou Google Play.",
        "Cadastre-se com CPF e crie uma senha forte.",
        "Faça o reconhecimento facial no app para subir ao nível prata.",
        "Para o nível ouro, valide pela biometria do Denatran (CNH) ou pela rede bancária conveniada (Banco do Brasil, Caixa, Banrisul etc.)." ,
      ]},
      { tipo: "callout", variant: "info", texto: "Apenas as contas gov.br nível prata ou ouro permitem acessar os serviços completos do e-CAC. A conta bronze (apenas CPF e senha) tem acesso restrito." },
      { tipo: "h2", texto: "Passo a passo: como entrar no e-CAC" },
      { tipo: "ol", itens: [
        "Acesse cav.receita.fazenda.gov.br.",
        "Clique em 'Entrar com gov.br'.",
        "Informe o CPF e a senha gov.br.",
        "Confirme o login via push notification no app gov.br.",
        "Você será redirecionado ao painel principal do e-CAC.",
      ]},
      { tipo: "h2", texto: "Principais serviços do e-CAC" },
      { tipo: "tabela", cabecalho: ["Serviço", "Para que serve"], linhas: [
        ["Meu Imposto de Renda", "Consultar declarações, malha fina, restituição"],
        ["Pagamentos e Parcelamentos", "Emitir DARF, parcelar dívidas, consultar pagamentos"],
        ["Caixa Postal", "Receber comunicados e intimações fiscais"],
        ["Cadastros CPF / CNPJ", "Atualizar dados cadastrais"],
        ["Certidões", "Emitir CND, CPEN, Comprovantes de Inscrição"],
        ["Procurações Eletrônicas", "Outorgar acesso a contadores"],
        ["Simples Nacional / MEI", "Apurar PGDAS-D, emitir DAS, consultar parcelamentos"],
      ]},
      { tipo: "h2", texto: "Como conceder procuração eletrônica ao contador" },
      { tipo: "ol", itens: [
        "No e-CAC, acesse 'Procurações Eletrônicas'.",
        "Clique em 'Cadastrar Procuração'.",
        "Informe o CPF/CNPJ do procurador.",
        "Selecione os serviços a outorgar (ex.: 'Caixa Postal', 'DCTFWeb').",
        "Defina a validade (até 5 anos).",
        "Confirme com gov.br ou certificado digital.",
      ]},
      { tipo: "h2", texto: "Caixa Postal: a comunicação oficial da Receita" },
      { tipo: "p", texto: "Todas as intimações, notificações e cobranças passam a ser entregues digitalmente na Caixa Postal do e-CAC, com prazo de leitura de 10 dias. Após esse prazo, a mensagem é considerada lida automaticamente. É indispensável conferir a caixa pelo menos uma vez por semana." },
      { tipo: "callout", variant: "warning", titulo: "Ignorar intimação pode custar caro", texto: "Não responder a notificações do e-CAC pode resultar em lavratura de auto de infração, inscrição em Dívida Ativa e protesto da CDA em cartório." },
    ],
    faq: [
      { pergunta: "É preciso pagar para usar o e-CAC?", resposta: "Não. Todos os serviços do e-CAC são gratuitos, incluindo a emissão de certidões e o cadastro de procurações." },
      { pergunta: "Posso acessar o e-CAC pelo celular?", resposta: "Sim, o portal é responsivo. Há também os apps 'Meu Imposto de Renda' e 'gov.br' que integram funcionalidades." },
      { pergunta: "Esqueci a senha gov.br. Como recupero?", resposta: "Acesse sso.acesso.gov.br, clique em 'Esqueci minha senha' e siga o processo via e-mail, SMS ou validação bancária." },
      { pergunta: "Minha empresa pode acessar com e-CNPJ?", resposta: "Sim. O e-CNPJ permite acesso pleno ao e-CAC, incluindo serviços exclusivos de pessoa jurídica como DCTFWeb e EFD-Reinf." },
      { pergunta: "Por que o e-CAC pede selfie?", resposta: "Para garantir a segurança e validar contas gov.br nível prata pela biometria facial, exigida em serviços sensíveis." },
    ],
  },

  // 6 — Parcelar dívida Receita
  {
    slug: "como-parcelar-divida-receita-federal",
    categoria: "Parcelamentos",
    titulo: "Como parcelar dívida com a Receita Federal em 2026",
    subtitulo: "Modalidades, prazos, descontos e passo a passo dos parcelamentos ordinários e Transação Tributária.",
    resumo: "Conheça as modalidades de parcelamento da Receita Federal e PGFN em 2026 — incluindo Transação Tributária com até 65% de desconto — e veja como aderir online.",
    dataPublicacao: "2026-03-02",
    dataAtualizacao: "2026-05-13",
    autor: AUTOR_PRINCIPAL,
    tags: ["Parcelamento", "PGFN", "Receita Federal", "Transação Tributária"],
    tempoLeituraMin: 10,
    blocos: [
      { tipo: "p", texto: "Quem deve tributos federais (IRPF, IRPJ, PIS, COFINS, CSLL, INSS) tem hoje várias modalidades de parcelamento, dependendo da situação da dívida (em cobrança administrativa pela Receita Federal ou inscrita em Dívida Ativa pela PGFN). Conhecer cada uma evita pagar mais caro e permite obter descontos relevantes em multas e juros." },
      { tipo: "h2", texto: "1) Parcelamento Ordinário (Receita Federal)" },
      { tipo: "ul", itens: [
        "Prazo: até 60 meses.",
        "Parcela mínima: R$ 200,00 (PJ) e R$ 100,00 (PF).",
        "Sem desconto, com juros Selic.",
        "Adesão: e-CAC → 'Pagamentos e Parcelamentos' → 'Parcelamento - Solicitar'.",
      ]},
      { tipo: "h2", texto: "2) Parcelamento Simplificado" },
      { tipo: "p", texto: "Indicado para débitos até R$ 5.000.000,00. Aprovação automática pelo e-CAC, sem necessidade de garantia. Também em até 60 meses, com juros Selic." },
      { tipo: "h2", texto: "3) Transação Tributária PGFN (descontos até 65%)" },
      { tipo: "p", texto: "Para dívidas já inscritas em Dívida Ativa da União. O Edital PGFN vigente em 2026 prevê descontos progressivos sobre multas e juros conforme a capacidade de pagamento do contribuinte, calculada pelo sistema:" },
      { tipo: "tabela", cabecalho: ["Capacidade", "Desconto", "Prazo"], linhas: [
        ["A (alta)", "Até 30%", "Até 60 meses"],
        ["B (média)", "Até 50%", "Até 84 meses"],
        ["C (baixa)", "Até 65%", "Até 120 meses"],
        ["D (irrecuperável)", "Até 65%", "Até 145 meses"],
      ]},
      { tipo: "callout", variant: "success", titulo: "Importante", texto: "A entrada pode ser parcelada em até 12 vezes, sem necessidade de garantia para dívidas até R$ 50 milhões." },
      { tipo: "h2", texto: "4) Transação para débitos de pequeno valor" },
      { tipo: "p", texto: "Para débitos consolidados de até 60 salários mínimos. Permite entrada de 1% em até 5 parcelas e saldo em até 55 meses, com desconto de até 50%." },
      { tipo: "h2", texto: "5) Refis e Programas Especiais" },
      { tipo: "p", texto: "De tempos em tempos a União edita programas especiais (PERSE, Litígio Zero, PRT) com condições mais vantajosas. Acompanhe o site da PGFN (gov.br/pgfn) para editais abertos." },
      { tipo: "h2", texto: "Passo a passo: como aderir pelo Regularize (PGFN)" },
      { tipo: "ol", itens: [
        "Acesse www.regularize.pgfn.gov.br.",
        "Faça login com conta gov.br nível prata/ouro.",
        "Clique em 'Negociar Dívida' → 'Adesão'.",
        "Selecione a modalidade compatível (Transação por adesão, parcelamento simplificado etc.).",
        "Aceite os termos e selecione as inscrições em Dívida Ativa a serem negociadas.",
        "Defina a quantidade de parcelas dentro do limite legal.",
        "Emita a primeira parcela (DARF) e pague no vencimento — sem isso a adesão é cancelada.",
      ]},
      { tipo: "h2", texto: "Cuidados após aderir" },
      { tipo: "ul", itens: [
        "Pague as parcelas em dia. 3 parcelas atrasadas = rescisão automática.",
        "Mantenha as obrigações acessórias em dia (DCTF, EFD).",
        "Não atrase tributos correntes.",
        "Guarde os comprovantes por 5 anos.",
      ]},
      { tipo: "callout", variant: "warning", titulo: "Atenção", texto: "A rescisão do parcelamento restabelece a dívida com todos os encargos e impede nova adesão pelo mesmo programa por 2 anos." },
    ],
    faq: [
      { pergunta: "Qual a diferença entre Receita Federal e PGFN?", resposta: "A Receita Federal cobra na fase administrativa (até a inscrição em Dívida Ativa). Após inscrita, a PGFN passa a ser a credora e cuida da cobrança judicial e das transações." },
      { pergunta: "Quem tem CNPJ baixado pode parcelar?", resposta: "Sim. A baixa do CNPJ não extingue a dívida, e o sócio pode parcelar pelo seu CPF no Regularize." },
      { pergunta: "É possível usar precatório para quitar a dívida?", resposta: "Sim, dentro da Transação Tributária PGFN, é possível usar precatórios federais para amortizar o débito." },
      { pergunta: "Posso renegociar parcelamento ativo?", resposta: "Sim, com a Transação por Adesão, é possível migrar de parcelamento ordinário para condições mais vantajosas, se houver edital aberto." },
      { pergunta: "Parcelamento gera certidão positiva ou negativa?", resposta: "Gera CPEN (Certidão Positiva com Efeitos de Negativa), válida para participar de licitações e obter financiamentos." },
    ],
  },

  // 7 — Abrir MEI
  {
    slug: "como-abrir-mei",
    categoria: "MEI",
    titulo: "Como abrir MEI em 2026: passo a passo gratuito e online",
    subtitulo: "Tudo que você precisa para formalizar seu CNPJ MEI: atividades permitidas, custos, obrigações e benefícios.",
    resumo: "Guia completo para abrir MEI em 2026: requisitos, lista de atividades, passo a passo no Portal do Empreendedor e obrigações após a formalização.",
    dataPublicacao: "2026-01-08",
    dataAtualizacao: "2026-05-11",
    autor: AUTOR_MEI,
    tags: ["MEI", "Abrir empresa", "Portal do Empreendedor"],
    tempoLeituraMin: 9,
    blocos: [
      { tipo: "p", texto: "O Microempreendedor Individual (MEI) é a categoria empresarial mais simples e barata do Brasil, ideal para autônomos que faturam até R$ 81.000,00 por ano. A abertura é 100% online, gratuita e leva menos de 15 minutos, gerando CNPJ na hora e permitindo emitir nota fiscal, contratar 1 funcionário e contribuir para o INSS." },
      { tipo: "h2", texto: "Requisitos para ser MEI em 2026" },
      { tipo: "ul", itens: [
        "Faturamento anual de até R$ 81.000,00 (proporcional no ano de abertura).",
        "Não ser sócio, titular ou administrador de outra empresa.",
        "Não ser servidor público federal em atividade.",
        "Ter no máximo 1 funcionário recebendo salário mínimo ou piso da categoria.",
        "Exercer atividade permitida (lista oficial do Portal do Empreendedor).",
      ]},
      { tipo: "callout", variant: "info", titulo: "Faturamento maior?", texto: "Quem fatura entre R$ 81.000,01 e R$ 360.000,00 deve migrar para Microempresa (ME) no Simples Nacional." },
      { tipo: "h2", texto: "Atividades permitidas (CNAEs)" },
      { tipo: "p", texto: "O MEI é permitido apenas para atividades constantes da Resolução CGSN nº 140/2018 (atualizada anualmente). Estão excluídas atividades regulamentadas como médico, advogado, engenheiro civil e arquiteto. Antes de abrir, confira a lista oficial em portaldoempreendedor.gov.br/atividades-permitidas." },
      { tipo: "h2", texto: "Passo a passo: como abrir o MEI" },
      { tipo: "ol", itens: [
        "Crie conta gov.br nível prata ou ouro (gratuita).",
        "Acesse gov.br/empresas-e-negocios/pt-br/empreendedor e clique em 'Quero ser MEI' → 'Formalize-se'.",
        "Faça login com gov.br.",
        "Preencha os dados pessoais e o endereço (residencial ou comercial).",
        "Escolha a atividade principal e até 15 secundárias.",
        "Defina nome fantasia, forma de atuação (estabelecimento fixo, internet, em local fixo fora) e capital social.",
        "Confirme o aceite das declarações.",
        "Imprima o CCMEI (Certificado de Condição de MEI) com CNPJ ativo.",
      ]},
      { tipo: "h2", texto: "Quanto custa abrir MEI?" },
      { tipo: "p", texto: "A abertura é totalmente gratuita. Cuidado com sites e escritórios que cobram taxas — todos são intermediadores não oficiais. O único custo do MEI é o DAS mensal (R$ 76,90 a R$ 81,90 em 2026)." },
      { tipo: "h2", texto: "Obrigações após formalizar" },
      { tipo: "tabela", cabecalho: ["Obrigação", "Quando", "Onde"], linhas: [
        ["Pagar DAS mensal", "Todo dia 20", "PGMEI"],
        ["Emitir nota fiscal (para PJ)", "Em cada venda", "Prefeitura ou SEFAZ"],
        ["Entregar DASN-SIMEI", "Até 31/05 de cada ano", "PGMEI"],
        ["Relatório mensal de receitas", "Manter na empresa", "Modelo do Portal do Empreendedor"],
      ]},
      { tipo: "h2", texto: "Benefícios do MEI" },
      { tipo: "ul", itens: [
        "Aposentadoria por idade, auxílio-doença, salário-maternidade e pensão por morte.",
        "Acesso a crédito empresarial com taxas menores.",
        "Possibilidade de vender para o governo (licitações).",
        "Emissão de nota fiscal eletrônica.",
        "Direito a alvará provisório por 180 dias.",
      ]},
    ],
    faq: [
      { pergunta: "Posso abrir MEI sem sair de casa?", resposta: "Sim. Todo o processo é online, gratuito e leva 15 minutos pelo Portal do Empreendedor com login gov.br." },
      { pergunta: "Servidor público pode ser MEI?", resposta: "Servidor federal não pode. Estaduais e municipais devem consultar a legislação do próprio estatuto, pois há restrições específicas." },
      { pergunta: "Posso usar meu endereço residencial?", resposta: "Sim, desde que a atividade não exija alvará especial ou autorização sanitária incompatível com uso residencial." },
      { pergunta: "Posso ter MEI estando desempregado e recebendo seguro?", resposta: "Não. Abrir CNPJ encerra o direito ao seguro-desemprego, pois caracteriza renda própria." },
      { pergunta: "Como cancelar o MEI se não der certo?", resposta: "Pelo Portal do Empreendedor, opção 'Baixa de MEI', com login gov.br. Lembre-se de pagar débitos pendentes antes." },
    ],
  },

  // 8 — Declarar IR
  {
    slug: "como-declarar-imposto-de-renda",
    categoria: "Imposto de Renda",
    titulo: "Como declarar Imposto de Renda 2026: guia completo para iniciantes",
    subtitulo: "Quem é obrigado, prazos, documentos, deduções e como evitar a malha fina.",
    resumo: "Aprenda quem deve declarar IR em 2026, prazos, deduções permitidas, escolha entre modelo simplificado e completo e o passo a passo para entregar sem cair na malha.",
    dataPublicacao: "2026-03-01",
    dataAtualizacao: "2026-05-14",
    autor: AUTOR_IR,
    tags: ["IRPF", "Imposto de Renda", "Declaração", "Malha Fina"],
    tempoLeituraMin: 11,
    blocos: [
      { tipo: "p", texto: "A Declaração do Imposto de Renda Pessoa Física (IRPF) é a prestação anual de contas que o contribuinte faz à Receita Federal sobre rendimentos, bens e dívidas. Em 2026, o prazo vai de 17 de março a 30 de maio. Quem perder o prazo paga multa mínima de R$ 165,74 e pode ter o CPF colocado em situação 'Pendente'." },
      { tipo: "h2", texto: "Quem é obrigado a declarar IR em 2026" },
      { tipo: "p", texto: "É obrigado a declarar quem se enquadrou em pelo menos uma das condições abaixo durante 2025:" },
      { tipo: "ul", itens: [
        "Recebeu rendimentos tributáveis acima de R$ 33.888,00 (ex-R$ 30.639,90).",
        "Recebeu rendimentos isentos ou exclusivos na fonte acima de R$ 200.000,00.",
        "Obteve receita bruta rural superior a R$ 169.440,00.",
        "Tinha bens e direitos acima de R$ 800.000,00 em 31/12/2025.",
        "Vendeu bens com ganho de capital tributável.",
        "Operou em bolsa de valores acima de R$ 40.000,00 ou com lucro.",
        "Passou à condição de residente no Brasil em 2025.",
      ]},
      { tipo: "h2", texto: "Documentos para reunir antes" },
      { tipo: "ul", itens: [
        "Informe de rendimentos de empresas, INSS e bancos.",
        "Comprovantes de pagamentos médicos, odontológicos e escolares.",
        "Recibos de aluguéis recebidos ou pagos.",
        "Declaração de IR do ano anterior (para importar dados).",
        "Documentos de compra e venda de imóveis e veículos.",
        "Informes de aplicações financeiras e criptoativos.",
      ]},
      { tipo: "h2", texto: "Simplificado x Completo: qual escolher" },
      { tipo: "tabela", cabecalho: ["Modelo", "Quando vale a pena", "Desconto"], linhas: [
        ["Simplificado", "Sem grandes deduções (dependentes, médico, escola)", "20% sobre rendimentos tributáveis, limitado a R$ 16.754,34"],
        ["Completo", "Com despesas dedutíveis acima de 20% dos rendimentos", "Dedução pelas despesas reais"],
      ]},
      { tipo: "callout", variant: "info", titulo: "Como decidir", texto: "O próprio programa IRPF calcula automaticamente os dois modelos e indica qual gera menor imposto ou maior restituição. Use sempre a recomendação." },
      { tipo: "h2", texto: "Passo a passo: como declarar" },
      { tipo: "ol", itens: [
        "Baixe o programa IRPF 2026 em gov.br/receitafederal.",
        "Importe a Declaração Pré-Preenchida (login gov.br prata/ouro).",
        "Confira e complete: rendimentos, dependentes, bens, dívidas, deduções.",
        "Informe a fonte pagadora e o valor de cada rendimento.",
        "Verifique se há imposto a pagar ou a restituir.",
        "Escolha receber a restituição via PIX (apenas CPF) — entra em lotes prioritários.",
        "Salve e transmita pela opção 'Entregar Declaração'.",
        "Guarde o recibo de entrega por 5 anos.",
      ]},
      { tipo: "h2", texto: "Principais deduções permitidas" },
      { tipo: "ul", itens: [
        "Despesas médicas (sem limite).",
        "Educação (até R$ 3.561,50 por dependente/ano).",
        "Previdência oficial e privada (PGBL, até 12% dos rendimentos tributáveis).",
        "Dependentes (R$ 2.275,08 por dependente).",
        "Pensão alimentícia judicial.",
        "Livro Caixa (autônomos).",
      ]},
      { tipo: "h2", texto: "Como evitar a malha fina" },
      { tipo: "ol", itens: [
        "Use sempre a Declaração Pré-Preenchida.",
        "Confira se valores informados batem com o Informe de Rendimentos.",
        "Inclua todos os dependentes na mesma declaração (não duplicar).",
        "Anexe comprovantes para despesas médicas e pensão alimentícia.",
        "Declare ganhos de capital e operações em bolsa.",
      ]},
      { tipo: "callout", variant: "success", titulo: "Caiu na malha?", texto: "Veja nosso guia 'Como consultar restituição do IR' para entender como identificar pendências e retificar a declaração sem aguardar a Receita." },
    ],
    faq: [
      { pergunta: "Quem ganha até 2 salários mínimos precisa declarar?", resposta: "Não, salvo se tiver bens acima de R$ 800.000,00 ou se enquadrar em outra obrigatoriedade. O limite de obrigatoriedade em 2026 é R$ 33.888,00 anuais." },
      { pergunta: "Posso declarar IR pelo celular?", resposta: "Sim, pelo app 'Meu Imposto de Renda', exclusivo para declarações simples com login gov.br nível prata/ouro." },
      { pergunta: "Atrasei a entrega. E agora?", resposta: "Entregue imediatamente e pague a multa de 1% ao mês sobre o imposto devido, mínimo R$ 165,74. O CPF fica pendente até a regularização." },
      { pergunta: "Cônjuge precisa declarar separado?", resposta: "Não obrigatoriamente. O casal escolhe entre declaração conjunta ou separada, optando pela mais vantajosa." },
      { pergunta: "Posso retificar a declaração?", resposta: "Sim, em até 5 anos. Basta abrir a declaração no programa IRPF, marcar 'Retificadora' e transmitir novamente." },
    ],
  },

  // 9 — Consultar pendências CPF
  {
    slug: "como-consultar-pendencias-cpf",
    categoria: "CPF",
    titulo: "Como consultar pendências no CPF e Score na Receita Federal",
    subtitulo: "Saiba quais débitos federais e cadastrais estão associados ao seu CPF e como limpar seu nome.",
    resumo: "Aprenda a consultar pendências fiscais, restrições no CPF e situações que afetam seu crédito, sem pagar nada por consultas pagas.",
    dataPublicacao: "2026-02-20",
    dataAtualizacao: "2026-05-15",
    autor: AUTOR_PRINCIPAL,
    tags: ["CPF", "Pendências", "Receita Federal", "Dívida Ativa"],
    tempoLeituraMin: 8,
    blocos: [
      { tipo: "p", texto: "Pendências no CPF podem causar negativa de crédito, bloqueio de financiamentos, impedimento para tirar passaporte e até restrição em concursos públicos. Antes de pagar consultas particulares, saiba que todas as pendências federais podem ser consultadas gratuitamente nos portais oficiais da Receita Federal, PGFN e Serasa Limpa Nome." },
      { tipo: "h2", texto: "Tipos de pendência que afetam o CPF" },
      { tipo: "tabela", cabecalho: ["Origem", "O que verifica", "Onde consultar"], linhas: [
        ["Receita Federal", "IRPF não declarado, débitos federais", "e-CAC e Consulta Situação CPF"],
        ["PGFN / Dívida Ativa", "Tributos inscritos para cobrança", "Regularize.pgfn.gov.br"],
        ["Justiça do Trabalho", "Débitos trabalhistas", "CNDT (cndt.tst.jus.br)"],
        ["Bancos e empresas", "Inadimplência comercial", "Serasa, SPC, Boa Vista"],
        ["Cartórios de protesto", "Títulos protestados", "CRA Nacional (crapr.com.br)"],
      ]},
      { tipo: "h2", texto: "Consulta na Receita Federal (gratuita)" },
      { tipo: "ol", itens: [
        "Acesse cav.receita.fazenda.gov.br com conta gov.br.",
        "Vá em 'Pagamentos e Parcelamentos' → 'Consulta Pendências - Situação Fiscal'.",
        "O relatório mostra: débitos exigíveis, declarações em aberto, inscrições em Dívida Ativa.",
        "Você pode emitir DARF ou aderir a parcelamento direto da tela." ,
      ]},
      { tipo: "h2", texto: "Consulta na PGFN (Dívida Ativa)" },
      { tipo: "ol", itens: [
        "Acesse www.regularize.pgfn.gov.br.",
        "Login gov.br e clique em 'Consultar Pendências'.",
        "Visualize cada inscrição com valor atualizado, número do processo e status.",
        "Avalie a Transação Tributária para descontos de até 65%.",
      ]},
      { tipo: "h2", texto: "Como limpar o nome no Serasa pelo CPF" },
      { tipo: "ol", itens: [
        "Acesse serasa.com.br/limpa-nome.",
        "Crie conta com CPF, e-mail e senha.",
        "Visualize todas as dívidas reportadas por bancos, varejistas e operadoras.",
        "Negocie com desconto direto pelo portal (parcelamento via PIX ou boleto).",
        "Após pagamento, o nome é retirado em até 5 dias úteis.",
      ]},
      { tipo: "callout", variant: "warning", titulo: "Cuidado com golpes", texto: "Nunca pague taxas antecipadas para 'limpar nome'. A consulta no Serasa é gratuita; só a renegociação envolve pagamento direto ao credor." },
      { tipo: "h2", texto: "Pendência cadastral x pendência financeira" },
      { tipo: "p", texto: "É importante distinguir as duas. A pendência cadastral (CPF Pendente) decorre de IR não declarado ou dados desatualizados — e impede a emissão de certidões. Já a pendência financeira é a dívida em si: tributo, boleto, parcela em aberto. Cada uma é resolvida por um canal diferente." },
      { tipo: "h2", texto: "Como obter Certidão Negativa (CND)" },
      { tipo: "p", texto: "Após resolver todas as pendências federais, emita gratuitamente a CND no portal www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/certidoes-e-situacao-fiscal. A CND tem validade de 180 dias e prova regularidade para licitações, financiamentos e contratos." },
    ],
    faq: [
      { pergunta: "Consultar pendências afeta meu score?", resposta: "Não. A consulta é gratuita e não interfere na pontuação Serasa Score ou similares." },
      { pergunta: "Por quanto tempo a dívida fica no meu CPF?", resposta: "A dívida prescreve para fins de negativação em 5 anos, mas pode continuar sendo cobrada judicialmente conforme o caso." },
      { pergunta: "Quitei a dívida e ainda apareço negativado. O que fazer?", resposta: "O credor tem 5 dias úteis após o pagamento para retirar a negativação. Se não fizer, registre reclamação no Procon e pode pedir indenização por dano moral." },
      { pergunta: "Tem como consultar pendências de outra pessoa?", resposta: "Não. A consulta é estritamente pessoal e exige login próprio com gov.br ou certificado digital." },
      { pergunta: "Score baixo me impede de emitir CPF regular?", resposta: "Não. Score é avaliação de bureaux privados (Serasa, SPC) e não afeta a situação cadastral do CPF na Receita Federal." },
    ],
  },
];

export const categorias = [
  "MEI",
  "Imposto de Renda",
  "Receita Federal",
  "CPF",
  "Simples Nacional",
  "Parcelamentos",
  "Guias Tributários",
] as const;

export const getArtigoBySlug = (slug: string) => artigos.find((a) => a.slug === slug);

export const getArtigosByCategoria = (categoria: string) =>
  artigos.filter((a) => a.categoria === categoria);

export const getArtigosRelacionados = (slug: string, limit = 3) => {
  const atual = getArtigoBySlug(slug);
  if (!atual) return [];
  return artigos
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const sameCatA = a.categoria === atual.categoria ? 2 : 0;
      const sameCatB = b.categoria === atual.categoria ? 2 : 0;
      const tagsA = a.tags.filter((t) => atual.tags.includes(t)).length;
      const tagsB = b.tags.filter((t) => atual.tags.includes(t)).length;
      return sameCatB + tagsB - (sameCatA + tagsA);
    })
    .slice(0, limit);
};
