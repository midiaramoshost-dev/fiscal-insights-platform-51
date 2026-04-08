import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen, Scale, Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Artigo {
  numero: string;
  titulo: string;
  textoLegal: string;
  comentario: string;
  analise: string;
  interpretacao: string;
  orientacao: string;
  palavrasChave: string[];
  atualizacao?: string;
}

const titulosData: { titulo: string; artigos: Artigo[] }[] = [
  {
    titulo: "Título I – Introdução (Arts. 1º a 12)",
    artigos: [
      {
        numero: "Art. 1º",
        titulo: "Âmbito de Aplicação da CLT",
        textoLegal: "Esta Consolidação estatui as normas que regulam as relações individuais e coletivas de trabalho, nela previstas.",
        comentario: "A CLT é a principal legislação trabalhista do Brasil, reunindo normas que regulam desde a contratação até a rescisão do contrato de trabalho. Foi criada pelo Decreto-Lei nº 5.452/1943.",
        analise: "A CLT aplica-se a todos os empregados e empregadores urbanos e rurais, com exceção dos servidores públicos estatutários e trabalhadores domésticos (que possuem legislação complementar própria – LC 150/2015).",
        interpretacao: "A jurisprudência do TST entende que a CLT deve ser interpretada de forma teleológica, buscando sempre a proteção do trabalhador (princípio da proteção), sem prejuízo da segurança jurídica.",
        orientacao: "Ao analisar uma situação trabalhista, verifique primeiro se a relação se enquadra no âmbito da CLT. Trabalhadores autônomos, estagiários e servidores estatutários possuem regulamentação específica.",
        palavrasChave: ["aplicação", "normas trabalhistas", "relações de trabalho"],
      },
      {
        numero: "Art. 2º",
        titulo: "Definição de Empregador",
        textoLegal: "Considera-se empregador a empresa, individual ou coletiva, que, assumindo os riscos da atividade econômica, admite, assalaria e dirige a prestação pessoal de serviço. § 1º Equiparam-se ao empregador, para os efeitos exclusivos da relação de emprego, os profissionais liberais, as instituições de beneficência, as associações recreativas ou outras instituições sem fins lucrativos, que admitirem trabalhadores como empregados.",
        comentario: "O conceito de empregador vai além da figura da empresa tradicional. Inclui também entidades sem fins lucrativos, profissionais liberais e qualquer pessoa física ou jurídica que contrate empregados.",
        analise: "O elemento central é a assunção do risco do negócio (alteridade). O empregador é quem arca com os riscos da atividade econômica, não podendo transferi-los ao empregado. A Reforma Trabalhista (Lei 13.467/2017) não alterou este artigo.",
        interpretacao: "O grupo econômico (§ 2º, alterado pela Reforma) agora exige demonstração de interesse integrado, efetiva comunhão de interesses e atuação conjunta para responsabilidade solidária.",
        orientacao: "Na prática, identifique quem efetivamente dirige o serviço e assume os riscos. Em casos de terceirização, analise se há subordinação direta ao tomador de serviços, o que pode configurar vínculo empregatício direto.",
        palavrasChave: ["empregador", "risco da atividade", "grupo econômico", "alteridade"],
      },
      {
        numero: "Art. 3º",
        titulo: "Definição de Empregado",
        textoLegal: "Considera-se empregado toda pessoa física que prestar serviços de natureza não eventual a empregador, sob a dependência deste e mediante salário. Parágrafo único. Não haverá distinções relativas à espécie de emprego e à condição de trabalhador, nem entre o trabalho intelectual, técnico e manual.",
        comentario: "Os cinco requisitos do vínculo empregatício são: (1) pessoa física, (2) pessoalidade, (3) não eventualidade (habitualidade), (4) subordinação (dependência) e (5) onerosidade (salário).",
        analise: "A subordinação é o principal elemento diferenciador entre empregado e trabalhador autônomo. Pode ser jurídica, estrutural ou algorítmica (no caso de plataformas digitais, tema em debate nos tribunais).",
        interpretacao: "O TST e o STF vêm debatendo intensamente a questão do vínculo em plataformas digitais (motoristas de app, entregadores). A tendência jurisprudencial ainda não está consolidada.",
        orientacao: "Para verificar se existe vínculo empregatício, analise todos os cinco requisitos cumulativamente. A ausência de qualquer um deles descaracteriza a relação de emprego. Documente todos os elementos da relação.",
        palavrasChave: ["empregado", "vínculo empregatício", "subordinação", "habitualidade", "onerosidade"],
      },
      {
        numero: "Art. 4º",
        titulo: "Tempo de Serviço Efetivo",
        textoLegal: "Considera-se como de serviço efetivo o período em que o empregado esteja à disposição do empregador, aguardando ou executando ordens, salvo disposição especial expressamente consignada. § 2º Por não se considerar tempo à disposição do empregador, não será computado como período extraordinário o que exceder a jornada normal, ainda que ultrapasse o limite de cinco minutos previsto no § 1º do art. 58, quando o empregado, por escolha própria, buscar proteção pessoal, em caso de insegurança nas vias públicas ou más condições climáticas, bem como adentrar ou permanecer nas dependências da empresa para exercer atividades particulares.",
        comentario: "A Reforma Trabalhista acrescentou o § 2º, que exclui do tempo à disposição do empregador situações como permanência para atividades particulares (estudo, alimentação, higiene pessoal, troca de uniforme).",
        analise: "Esta alteração foi significativa pois reduziu situações que antes eram consideradas tempo à disposição. Antes da Reforma, a permanência nas dependências da empresa por qualquer motivo poderia ser considerada jornada.",
        interpretacao: "A interpretação deve ser restritiva quanto às exclusões do § 2º. Se a permanência no local for por imposição do empregador (ex: obrigatoriedade de troca de uniforme na empresa), continua sendo tempo à disposição.",
        orientacao: "Empregadores devem ter políticas claras sobre uso das instalações fora do horário de trabalho. Empregados devem registrar corretamente seus horários e documentar quando a permanência é por exigência patronal.",
        palavrasChave: ["tempo de serviço", "jornada", "tempo à disposição", "reforma trabalhista"],
      },
    ],
  },
  {
    titulo: "Título II – Normas Gerais de Tutela do Trabalho (Arts. 13 a 223-G)",
    artigos: [
      {
        numero: "Art. 58",
        titulo: "Jornada Normal de Trabalho",
        textoLegal: "A duração normal do trabalho, para os empregados em qualquer atividade privada, não excederá de 8 (oito) horas diárias, desde que não seja fixado expressamente outro limite. § 1º Não serão descontadas nem computadas como jornada extraordinária as variações de horário no registro de ponto não excedentes de cinco minutos, observado o limite máximo de dez minutos diários.",
        comentario: "A jornada padrão é de 8 horas diárias e 44 horas semanais (art. 7º, XIII, CF/88). A Reforma Trabalhista manteve esses limites mas flexibilizou a compensação.",
        analise: "O limite de tolerância de 5 minutos (com máximo de 10 min diários) é importante na prática. Qualquer minuto excedente a esses limites deve ser pago como hora extra com adicional mínimo de 50%.",
        interpretacao: "A Súmula 366 do TST reforça que ultrapassado o limite de 5/10 minutos, todo o período excedente é considerado como hora extra, e não apenas o que ultrapassar os limites.",
        orientacao: "Monitore rigorosamente o registro de ponto. Implante sistema eletrônico confiável. Estabeleça política clara sobre chegadas antecipadas e saídas tardias para evitar passivos trabalhistas.",
        palavrasChave: ["jornada de trabalho", "8 horas", "hora extra", "registro de ponto", "tolerância"],
      },
      {
        numero: "Art. 59",
        titulo: "Horas Extraordinárias e Banco de Horas",
        textoLegal: "A duração diária do trabalho poderá ser acrescida de horas extras, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho. § 2º Poderá ser dispensado o acréscimo de salário se, por força de acordo ou convenção coletiva de trabalho, o excesso de horas em um dia for compensado pela correspondente diminuição em outro dia. § 5º O banco de horas de que trata o § 2º poderá ser pactuado por acordo individual escrito, desde que a compensação ocorra no período máximo de seis meses. § 6º É lícito o regime de compensação de jornada estabelecido por acordo individual, tácito ou escrito, para a compensação no mesmo mês.",
        comentario: "A Reforma Trabalhista trouxe flexibilização significativa do banco de horas. Antes, era necessário acordo coletivo; agora, pode ser pactuado individualmente com compensação em até 6 meses (§ 5º) ou no mesmo mês (§ 6º).",
        analise: "Existem agora três modalidades: (1) banco de horas por acordo coletivo – compensação em até 1 ano; (2) banco de horas individual – compensação em até 6 meses; (3) compensação simples – dentro do mesmo mês.",
        interpretacao: "A jurisprudência ainda debate a validade de bancos de horas individuais quando há prestação habitual de horas extras, o que pode descaracterizar o regime compensatório.",
        orientacao: "Escolha o modelo mais adequado à sua operação. Documente sempre por escrito. Controle rigorosamente o saldo de horas. Não permita acúmulo excessivo. Em caso de rescisão, horas não compensadas devem ser pagas como extras.",
        palavrasChave: ["horas extras", "banco de horas", "compensação", "acordo individual", "jornada"],
      },
      {
        numero: "Art. 59-A",
        titulo: "Jornada 12x36",
        textoLegal: "Em exceção ao disposto no art. 59 e em leis específicas, é facultado às partes, por meio de convenção coletiva ou acordo coletivo de trabalho, estabelecer horário de trabalho de doze horas seguidas por trinta e seis horas ininterruptas de descanso, observados ou indenizados os intervalos para repouso e alimentação. Parágrafo único. A remuneração mensal pactuada pelo horário previsto neste artigo abrange os pagamentos devidos pelo descanso semanal remunerado e pelo descanso em feriados.",
        comentario: "A jornada 12x36 foi regulamentada pela Reforma Trabalhista. Antes, era permitida apenas para categorias específicas (saúde, segurança) por acordo coletivo. Agora pode ser pactuada por acordo individual escrito (conforme art. 59-A, na redação da MP 808/2017, que expirou).",
        analise: "A controvérsia persiste sobre se a jornada 12x36 pode ser instituída por acordo individual em todas as atividades. O STF validou a possibilidade por acordo individual para a área da saúde.",
        interpretacao: "Os intervalos podem ser \"indenizados\", ou seja, pagos como verba indenizatória quando não concedidos. A remuneração mensal já inclui DSR e feriados, não cabendo pagamento adicional.",
        orientacao: "Formalize sempre por escrito. Respeite as 36 horas de descanso integralmente. Atenção especial em atividades insalubres, que possuem regras adicionais. Verifique a convenção coletiva da categoria.",
        palavrasChave: ["jornada 12x36", "escala", "descanso", "acordo coletivo"],
      },
      {
        numero: "Art. 62",
        titulo: "Empregados Excluídos do Controle de Jornada",
        textoLegal: "Não são abrangidos pelo regime previsto neste capítulo: I - os empregados que exercem atividade externa incompatível com a fixação de horário de trabalho, devendo tal condição ser anotada na Carteira de Trabalho e Previdência Social e no registro de empregados; II - os gerentes, assim considerados os exercentes de cargos de gestão, aos quais se equiparam, para efeito do disposto neste artigo, os diretores e chefes de departamento ou filial; III - os empregados em regime de teletrabalho que prestam serviço por produção ou tarefa.",
        comentario: "O inciso III foi adicionado pela Lei 14.442/2022, incluindo os teletrabalhadores por produção/tarefa. Antes, havia dúvida sobre o controle de jornada no teletrabalho.",
        analise: "Para gerentes (inciso II), o padrão de remuneração deve ser superior a 40% do salário efetivo. Caso contrário, devem ter jornada controlada. Para externos (inciso I), é essencial que a atividade seja realmente incompatível com controle.",
        interpretacao: "A jurisprudência é rigorosa: se houver qualquer mecanismo de controle (GPS, login em sistema, relatórios), descaracteriza-se a exceção dos incisos I e III.",
        orientacao: "Documente claramente a impossibilidade de controle de jornada. Para gerentes, formalize o cargo de gestão e garanta o acréscimo salarial de 40%. Para teletrabalhadores, defina se a prestação é por jornada ou por produção/tarefa no contrato.",
        palavrasChave: ["controle de jornada", "gerente", "atividade externa", "teletrabalho", "cargo de gestão"],
      },
      {
        numero: "Art. 71",
        titulo: "Intervalo para Repouso e Alimentação",
        textoLegal: "Em qualquer trabalho contínuo, cuja duração exceda de 6 (seis) horas, é obrigatória a concessão de um intervalo para repouso ou alimentação, o qual será, no mínimo, de 1 (uma) hora e, salvo acordo escrito ou contrato coletivo em contrário, não poderá exceder de 2 (duas) horas. § 4º A não concessão ou a concessão parcial do intervalo intrajornada mínimo, para repouso e alimentação, a empregados urbanos e rurais, implica o pagamento, de natureza indenizatória, apenas do período suprimido, com acréscimo de 50% (cinquenta por cento) sobre o valor da remuneração da hora normal de trabalho.",
        comentario: "A Reforma Trabalhista alterou significativamente o § 4º. Antes, a supressão parcial gerava pagamento integral do intervalo como hora extra. Agora, paga-se apenas o período efetivamente suprimido, com natureza indenizatória.",
        analise: "A mudança da natureza jurídica (de salarial para indenizatória) impacta diretamente os reflexos: verbas indenizatórias não integram o salário para fins de 13º, férias, FGTS etc.",
        interpretacao: "Convenção coletiva pode reduzir o intervalo para no mínimo 30 minutos (art. 611-A, III). O acordo individual não pode reduzir o intervalo intrajornada abaixo de 1 hora.",
        orientacao: "Garanta a concessão integral do intervalo. Caso haja supressão, mesmo parcial, o pagamento é obrigatório. Implante controles eficazes para registro de intervalo. Consulte a CCT para possibilidade de redução.",
        palavrasChave: ["intervalo", "intrajornada", "repouso", "alimentação", "hora extra"],
      },
    ],
  },
  {
    titulo: "Título III – Normas Especiais de Tutela do Trabalho (Arts. 224 a 441)",
    artigos: [
      {
        numero: "Art. 443",
        titulo: "Formas de Contrato de Trabalho",
        textoLegal: "O contrato individual de trabalho poderá ser acordado tácita ou expressamente, verbalmente ou por escrito, por prazo determinado ou indeterminado, ou para prestação de trabalho intermitente. § 3º Considera-se como intermitente o contrato de trabalho no qual a prestação de serviços, com subordinação, não é contínua, ocorrendo com alternância de períodos de prestação de serviços e de inatividade, determinados em horas, dias ou meses, independentemente do tipo de atividade do empregado e do empregador, exceto para os aeronautas, regidos por legislação própria.",
        comentario: "A Reforma Trabalhista criou o contrato intermitente (§ 3º), uma nova modalidade que permite a contratação para trabalho não contínuo, com convocações conforme a demanda.",
        analise: "O contrato intermitente gerou muita controvérsia. O STF julgou constitucional a modalidade (ADIs 5826, 5829 e 6154), mas estabeleceu que o trabalhador pode recusar convocação sem penalidade.",
        interpretacao: "O período de inatividade não é considerado tempo à disposição. O trabalhador intermitente tem direito a férias, 13º, FGTS e previdência social proporcionais a cada período trabalhado.",
        orientacao: "O contrato deve ser formalizado por escrito com valor da hora ou do dia de trabalho. A convocação deve ser feita com pelo menos 3 dias de antecedência. Ao final de cada período, efetue o pagamento imediato das verbas proporcionais.",
        palavrasChave: ["contrato de trabalho", "intermitente", "prazo determinado", "prazo indeterminado"],
      },
      {
        numero: "Art. 457",
        titulo: "Composição da Remuneração",
        textoLegal: "Compreendem-se na remuneração do empregado, para todos os efeitos legais, além do salário devido e pago diretamente pelo empregador, como contraprestação do serviço, as gorjetas que receber. § 2º As importâncias, ainda que habituais, pagas a título de ajuda de custo, auxílio-alimentação, vedado seu pagamento em dinheiro, diárias para viagem, prêmios e abonos não integram a remuneração do empregado, não se incorporam ao contrato de trabalho e não constituem base de incidência de qualquer encargo trabalhista e previdenciário.",
        comentario: "A Reforma Trabalhista alterou profundamente este artigo, retirando a natureza salarial de diversas parcelas que antes integravam a remuneração quando habituais.",
        analise: "A desoneração de parcelas como prêmios, ajuda de custo e auxílio-alimentação (não pago em dinheiro) representa economia significativa para empregadores, mas reduz a base de cálculo de FGTS e contribuições previdenciárias dos trabalhadores.",
        interpretacao: "Prêmios são liberalidades concedidas pelo empregador em forma de bens, serviços ou valor em dinheiro, em razão de desempenho superior ao ordinariamente esperado. Pagamentos regulares disfarçados de prêmio podem ser descaracterizados.",
        orientacao: "Estruture o pacote remuneratório de forma estratégica, aproveitando as verbas de natureza indenizatória. Porém, tenha cuidado para não simular parcelas – a Justiça do Trabalho pode reconhecer fraude e determinar a integração ao salário.",
        palavrasChave: ["remuneração", "salário", "gorjetas", "prêmios", "ajuda de custo", "auxílio-alimentação"],
      },
      {
        numero: "Art. 467",
        titulo: "Verbas Incontroversas na Rescisão",
        textoLegal: "Em caso de rescisão de contrato de trabalho, havendo controvérsia sobre o montante das verbas rescisórias, o empregador é obrigado a pagar ao trabalhador, à data do comparecimento à Justiça do Trabalho, a parte incontroversa dessas verbas, sob pena de pagá-las acrescidas de cinquenta por cento.",
        comentario: "Este artigo busca proteger o trabalhador garantindo o recebimento imediato das verbas que não são objeto de discussão judicial.",
        analise: "A multa de 50% incide apenas sobre as verbas incontroversas não pagas na audiência. Essa penalidade incentiva o empregador a quitar pelo menos a parte incontroversa.",
        interpretacao: "A Súmula 69 do TST excepciona a aplicação deste artigo à massa falida e empresas em recuperação judicial.",
        orientacao: "Empregadores: sempre compareçam à audiência com os valores incontroversos para pagamento imediato. Empregados: solicitem a aplicação da multa caso o empregador não efetue o pagamento na audiência.",
        palavrasChave: ["rescisão", "verbas rescisórias", "incontroversa", "multa"],
      },
    ],
  },
  {
    titulo: "Título IV – Contrato Individual de Trabalho (Arts. 442 a 510)",
    artigos: [
      {
        numero: "Art. 477",
        titulo: "Rescisão do Contrato – Pagamento das Verbas",
        textoLegal: "Na extinção do contrato de trabalho, o empregador deverá proceder à anotação na Carteira de Trabalho e Previdência Social, comunicar a dispensa aos órgãos competentes e realizar o pagamento das verbas rescisórias no prazo estabelecido no § 6º. § 6º A entrega ao empregado de documentos que comprovem a comunicação da extinção contratual aos órgãos competentes bem como o pagamento dos valores constantes do instrumento de rescisão ou recibo de quitação deverão ser efetuados até dez dias contados a partir do término do contrato.",
        comentario: "A Reforma Trabalhista unificou o prazo para pagamento das verbas rescisórias em 10 dias corridos, independentemente do tipo de aviso prévio (trabalhado ou indenizado). Antes, havia dois prazos distintos.",
        analise: "O descumprimento do prazo gera multa em favor do empregado equivalente ao seu salário (§ 8º). A homologação sindical obrigatória para contratos com mais de 1 ano foi abolida pela Reforma.",
        interpretacao: "O prazo de 10 dias é contado em dias corridos, excluindo o dia do término e incluindo o dia do vencimento. Se cair em dia não útil, antecipa-se para o último dia útil anterior.",
        orientacao: "Organize o processo rescisório com antecedência. Prepare todos os documentos (TRCT, guias do FGTS, comunicação ao eSocial, chave de conectividade). O não pagamento no prazo gera multa automática. Considere a homologação sindical facultativa para maior segurança jurídica.",
        palavrasChave: ["rescisão", "verbas rescisórias", "prazo", "multa", "TRCT", "homologação"],
      },
      {
        numero: "Art. 482",
        titulo: "Justa Causa pelo Empregado",
        textoLegal: "Constituem justa causa para rescisão do contrato de trabalho pelo empregador: a) ato de improbidade; b) incontinência de conduta ou mau procedimento; c) negociação habitual por conta própria ou alheia sem permissão do empregador, e quando constituir ato de concorrência à empresa para a qual trabalha o empregado, ou for prejudicial ao serviço; d) condenação criminal do empregado, passada em julgado, caso não tenha havido suspensão da execução da pena; e) desídia no desempenho das respectivas funções; f) embriaguez habitual ou em serviço; g) violação de segredo da empresa; h) ato de indisciplina ou de insubordinação; i) abandono de emprego; j) ato lesivo da honra ou da boa fama praticado no serviço contra qualquer pessoa, ou ofensas físicas, nas mesmas condições, salvo em caso de legítima defesa, própria ou de outrem; k) ato lesivo da honra ou da boa fama ou ofensas físicas praticadas contra o empregador e superiores hierárquicos, salvo em caso de legítima defesa, própria ou de outrem; l) prática constante de jogos de azar; m) perda da habilitação ou dos requisitos estabelecidos em lei para o exercício da profissão, em decorrência de conduta dolosa do empregado.",
        comentario: "A justa causa é a penalidade máxima aplicada ao empregado. A alínea 'm' foi acrescentada pela Reforma Trabalhista, incluindo a perda de habilitação profissional por conduta dolosa (ex: motorista que perde a CNH por embriaguez).",
        analise: "A aplicação da justa causa requer: (1) tipicidade – a conduta deve se enquadrar em uma das alíneas; (2) gravidade – a falta deve ser grave o suficiente; (3) imediatidade – a punição deve ser aplicada logo após o conhecimento da falta; (4) proporcionalidade; (5) non bis in idem – não punir duas vezes pela mesma falta.",
        interpretacao: "A embriaguez (alínea 'f') vem sendo interpretada de forma mais humanizada pela jurisprudência, reconhecendo o alcoolismo como doença (CID F10). Nesses casos, recomenda-se encaminhamento para tratamento antes da dispensa.",
        orientacao: "Documente todas as faltas do empregado (advertências, suspensões). Aplique a gradação pedagógica das punições. A justa causa deve ser o último recurso. Consulte o jurídico antes de aplicar. O ônus da prova é do empregador.",
        palavrasChave: ["justa causa", "improbidade", "desídia", "abandono", "insubordinação", "rescisão"],
      },
      {
        numero: "Art. 483",
        titulo: "Rescisão Indireta (Justa Causa pelo Empregador)",
        textoLegal: "O empregado poderá considerar rescindido o contrato e pleitear a devida indenização quando: a) forem exigidos serviços superiores às suas forças, defesos por lei, contrários aos bons costumes, ou alheios ao contrato; b) for tratado pelo empregador ou por seus superiores hierárquicos com rigor excessivo; c) correr perigo manifesto de mal considerável; d) não cumprir o empregador as obrigações do contrato; e) praticar o empregador ou seus prepostos, contra ele ou pessoas de sua família, ato lesivo da honra e boa fama; f) o empregador ou seus prepostos ofenderem-no fisicamente, salvo em caso de legítima defesa, própria ou de outrem; g) o empregador reduzir o seu trabalho, sendo este por peça ou tarefa, de forma a afetar sensivelmente a importância dos salários.",
        comentario: "A rescisão indireta é o direito do empregado de encerrar o contrato quando o empregador comete falta grave. O empregado tem direito a todas as verbas como se fosse dispensado sem justa causa.",
        analise: "As hipóteses mais comuns na prática são: atraso reiterado de salários (alínea 'd'), assédio moral (alíneas 'b' e 'e'), não recolhimento do FGTS (alínea 'd') e desvio de função (alínea 'a').",
        interpretacao: "O trabalhador pode permanecer trabalhando enquanto aguarda a decisão judicial (§ 3º) ou pode cessar a prestação de serviços imediatamente. A estratégia depende da gravidade da situação.",
        orientacao: "Reúna provas robustas antes de ajuizar a ação (testemunhas, documentos, e-mails, mensagens). A rescisão indireta não reconhecida judicialmente pode ser convertida em pedido de demissão, com perda de direitos. Consulte advogado especializado.",
        palavrasChave: ["rescisão indireta", "falta do empregador", "assédio", "atraso salarial"],
      },
    ],
  },
  {
    titulo: "Título IV-A – Representação dos Empregados (Arts. 510-A a 510-D)",
    artigos: [
      {
        numero: "Art. 510-A",
        titulo: "Comissão de Representantes dos Empregados",
        textoLegal: "Nas empresas com mais de duzentos empregados, é assegurada a eleição de uma comissão para representá-los, com a finalidade de promover-lhes o entendimento direto com os empregadores.",
        comentario: "Artigo incluído pela Reforma Trabalhista, regulamentando o art. 11 da CF/88. A comissão é independente do sindicato e visa promover o diálogo direto entre empregados e empregador.",
        analise: "A composição varia: 3 membros (200-3000 empregados), 5 membros (3001-5000) ou 7 membros (acima de 5000). O mandato é de 1 ano. Os membros não podem ser candidatos a cargos sindicais durante o mandato e até 1 ano após.",
        interpretacao: "A comissão não substitui a atuação sindical. Sua função é complementar, focada no diálogo direto sobre condições de trabalho no âmbito da empresa.",
        orientacao: "Empresas com mais de 200 empregados devem facilitar a eleição da comissão. Estabeleça canal de comunicação formal. A comissão pode atuar na prevenção de conflitos e melhoria do ambiente de trabalho.",
        palavrasChave: ["comissão de representantes", "representação", "diálogo", "empresa"],
      },
    ],
  },
  {
    titulo: "Título V – Organização Sindical (Arts. 511 a 610)",
    artigos: [
      {
        numero: "Art. 611-A",
        titulo: "Prevalência do Negociado sobre o Legislado",
        textoLegal: "A convenção coletiva e o acordo coletivo de trabalho têm prevalência sobre a lei quando, entre outros, dispuserem sobre: I - pacto quanto à jornada de trabalho, observados os limites constitucionais; II - banco de horas anual; III - intervalo intrajornada, respeitado o limite mínimo de trinta minutos para jornadas superiores a seis horas; IV - adesão ao Programa Seguro-Emprego (PSE); V - plano de cargos, salários e funções; VI - regulamento empresarial; VII - representante dos trabalhadores no local de trabalho; VIII - teletrabalho, regime de sobreaviso, e trabalho intermitente; IX - remuneração por produtividade; X - modalidade de registro de jornada de trabalho; XI - troca do dia de feriado; XII - enquadramento do grau de insalubridade; XIII - prorrogação de jornada em ambientes insalubres, sem licença prévia do Ministério do Trabalho; XIV - prêmios de incentivo; XV - participação nos lucros ou resultados.",
        comentario: "Um dos artigos mais importantes e controversos da Reforma Trabalhista. Estabelece o princípio da prevalência do negociado sobre o legislado em matérias específicas.",
        analise: "O STF validou a constitucionalidade do dispositivo no Tema 1046 (ARE 1121633), estabelecendo que acordos e convenções coletivas podem limitar ou restringir direitos trabalhistas, desde que não suprimam direitos absolutamente indisponíveis.",
        interpretacao: "Direitos absolutamente indisponíveis (art. 611-B) não podem ser reduzidos: salário mínimo, 13º, seguro-desemprego, FGTS, normas de saúde e segurança do trabalho, entre outros.",
        orientacao: "Negocie com segurança jurídica, respeitando os limites do art. 611-B. Acordos coletivos devem trazer contrapartidas reais para os trabalhadores. Documente todo o processo de negociação. A assessoria jurídica especializada é essencial.",
        palavrasChave: ["negociado sobre legislado", "convenção coletiva", "acordo coletivo", "reforma trabalhista", "flexibilização"],
      },
    ],
  },
  {
    titulo: "Título VI – Convenções Coletivas (Arts. 611 a 625)",
    artigos: [
      {
        numero: "Art. 611-B",
        titulo: "Direitos que Não Podem Ser Suprimidos por Negociação",
        textoLegal: "Constituem objeto ilícito de convenção coletiva ou de acordo coletivo de trabalho, exclusivamente, a supressão ou a redução dos seguintes direitos: I - normas de identificação profissional; II - seguro-desemprego; III - valor dos depósitos mensais e da indenização rescisória do FGTS; IV - salário mínimo; V - valor nominal do décimo terceiro salário; VI - remuneração do trabalho noturno superior à do diurno; VII - proteção do salário na forma da lei; VIII - salário-família; (...) XXIV - direito de greve; XXV - definição legal sobre os serviços ou atividades essenciais; XXVI - tributos e outros créditos de terceiros; XXVII - proibição de trabalho noturno, perigoso ou insalubre a menores de dezoito anos e de qualquer trabalho a menores de dezesseis anos. Parágrafo único. Regras sobre duração do trabalho e intervalos não são consideradas como normas de saúde, higiene e segurança do trabalho para os fins do disposto neste artigo.",
        comentario: "Este artigo estabelece o piso de proteção que não pode ser flexibilizado por negociação coletiva. É o contraponto necessário ao art. 611-A.",
        analise: "O parágrafo único é especialmente controverso ao excluir normas sobre jornada e intervalos do conceito de saúde e segurança, permitindo sua flexibilização mesmo quando impactam a saúde do trabalhador.",
        interpretacao: "A lista é taxativa (\"exclusivamente\"), o que significa que qualquer direito não listado pode, em tese, ser objeto de negociação coletiva, desde que haja contrapartidas.",
        orientacao: "Ao negociar, consulte sempre este artigo para verificar se a matéria pode ser flexibilizada. Em caso de dúvida, opte pela interpretação mais protetiva ao trabalhador para evitar nulidade futura do instrumento coletivo.",
        palavrasChave: ["direitos indisponíveis", "negociação coletiva", "limites", "piso proteção"],
      },
    ],
  },
  {
    titulo: "Título VII – Processo de Multas Administrativas (Arts. 626 a 642)",
    artigos: [
      {
        numero: "Art. 634",
        titulo: "Valores das Multas Administrativas",
        textoLegal: "As multas previstas neste Título serão aplicadas pela autoridade de primeira instância no Distrito Federal, e pelas autoridades regionais do Ministério do Trabalho nos Estados.",
        comentario: "As multas administrativas trabalhistas são aplicadas pela Inspeção do Trabalho (antigo MTE, atual MTP) quando identificadas irregularidades nas relações de trabalho.",
        analise: "Os valores das multas são atualizados periodicamente. A fiscalização pode ocorrer por denúncia, programação ou força-tarefa. O empregador tem direito a recurso administrativo.",
        interpretacao: "A dupla visita é obrigatória para microempresas e empresas de pequeno porte (LC 123/2006), exceto em casos de falta de registro de empregados, fraude, resistência à fiscalização ou reincidência.",
        orientacao: "Mantenha toda a documentação trabalhista organizada e acessível. Em caso de fiscalização, colabore com o auditor-fiscal. Corrija irregularidades apontadas imediatamente. Consulte assessoria jurídica para avaliação de recurso administrativo.",
        palavrasChave: ["multa administrativa", "fiscalização", "inspeção do trabalho", "autuação"],
      },
    ],
  },
  {
    titulo: "Título VIII – Justiça do Trabalho (Arts. 643 a 910)",
    artigos: [
      {
        numero: "Art. 790-B",
        titulo: "Honorários Periciais",
        textoLegal: "A responsabilidade pelo pagamento dos honorários periciais é da parte sucumbente na pretensão objeto da perícia, ainda que beneficiária da justiça gratuita. § 4º Somente no caso em que o beneficiário da justiça gratuita não tenha obtido em juízo créditos capazes de suportar a despesa referida no caput, ainda que em outro processo, a União responderá pelo encargo.",
        comentario: "A Reforma Trabalhista alterou as regras de honorários periciais, impondo ao beneficiário de justiça gratuita o pagamento quando sucumbente, desde que tenha créditos em juízo.",
        analise: "O STF declarou inconstitucional parte desta regra na ADI 5766, determinando que o beneficiário de justiça gratuita não pode ser obrigado a pagar honorários periciais com créditos obtidos em juízo.",
        interpretacao: "Após a decisão do STF, a União é responsável pelos honorários periciais quando a parte sucumbente é beneficiária de justiça gratuita, independentemente de ter créditos em outros processos.",
        orientacao: "Avalie cuidadosamente a necessidade de perícia (insalubridade, periculosidade) antes de requerê-la. A sucumbência gera custos. Beneficiários de justiça gratuita estão protegidos pela decisão do STF na ADI 5766.",
        palavrasChave: ["honorários periciais", "justiça gratuita", "sucumbência", "perícia"],
      },
      {
        numero: "Art. 791-A",
        titulo: "Honorários Advocatícios de Sucumbência",
        textoLegal: "Ao advogado, ainda que atue em causa própria, serão devidos honorários de sucumbência, fixados entre o mínimo de 5% (cinco por cento) e o máximo de 15% (quinze por cento) sobre o valor que resultar da liquidação da sentença, do proveito econômico obtido ou, não sendo possível mensurá-lo, sobre o valor atualizado da causa. § 4º Vencido o beneficiário da justiça gratuita, desde que não tenha obtido em juízo, ainda que em outro processo, créditos capazes de suportar a despesa, as obrigações decorrentes de sua sucumbência ficarão sob condição suspensiva de exigibilidade.",
        comentario: "A Reforma Trabalhista introduziu os honorários de sucumbência na Justiça do Trabalho. Antes, honorários só eram devidos quando a parte estava assistida pelo sindicato (Súmula 219 do TST).",
        analise: "O STF também declarou inconstitucional a cobrança de honorários sucumbenciais de beneficiários de justiça gratuita com créditos em juízo (ADI 5766), mantendo a condição suspensiva por 2 anos.",
        interpretacao: "Os honorários são fixados por pedido (não por ação), o que pode gerar valores significativos quando há múltiplos pedidos julgados improcedentes.",
        orientacao: "Formule pedidos com cautela e fundamentação sólida. A sucumbência em cada pedido gera honorários. Faça uma análise realista das chances de êxito antes de incluir pedidos na petição inicial. O risco processual deve ser avaliado criteriosamente.",
        palavrasChave: ["honorários sucumbência", "advogado", "justiça gratuita", "processo trabalhista"],
      },
    ],
  },
];

const CLTComentada = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTitulo, setExpandedTitulo] = useState<string | null>(null);

  const filteredTitulos = titulosData.map((titulo) => ({
    ...titulo,
    artigos: titulo.artigos.filter(
      (artigo) =>
        artigo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.textoLegal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.palavrasChave.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  })).filter((t) => t.artigos.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scale className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                CLT Comentada
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Consolidação das Leis do Trabalho — comentada, analisada, interpretada e com orientações práticas para profissionais contábeis e jurídicos.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge variant="outline" className="border-blue-300 text-blue-700"><BookOpen className="w-3 h-3 mr-1" /> Comentários doutrinários</Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700"><Search className="w-3 h-3 mr-1" /> Análise aprofundada</Badge>
              <Badge variant="outline" className="border-purple-300 text-purple-700"><Lightbulb className="w-3 h-3 mr-1" /> Interpretação jurisprudencial</Badge>
              <Badge variant="outline" className="border-amber-300 text-amber-700"><CheckCircle className="w-3 h-3 mr-1" /> Orientação prática</Badge>
            </div>
          </div>

          {/* Busca */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar por artigo, tema ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>

          {/* Aviso */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Nota importante:</strong> Este conteúdo tem caráter informativo e educacional. Atualizado com base na Reforma Trabalhista (Lei 13.467/2017), Lei 14.442/2022 e decisões do STF e TST. Consulte sempre um advogado para casos específicos.
              </p>
            </CardContent>
          </Card>

          {/* Conteúdo */}
          {filteredTitulos.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhum resultado encontrado para "{searchTerm}"</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredTitulos.map((titulo, tIdx) => (
                <Card key={tIdx} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white cursor-pointer" onClick={() => setExpandedTitulo(expandedTitulo === titulo.titulo ? null : titulo.titulo)}>
                    <CardTitle className="text-lg text-white">{titulo.titulo}</CardTitle>
                    <p className="text-blue-100 text-sm">{titulo.artigos.length} artigo(s) disponível(is)</p>
                  </CardHeader>

                  {(expandedTitulo === titulo.titulo || searchTerm) && (
                    <CardContent className="p-0">
                      <Accordion type="multiple" className="w-full">
                        {titulo.artigos.map((artigo, aIdx) => (
                          <AccordionItem key={aIdx} value={`${tIdx}-${aIdx}`} className="border-b last:border-0">
                            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
                              <div className="flex items-center gap-3 text-left">
                                <Badge className="bg-blue-100 text-blue-800 shrink-0">{artigo.numero}</Badge>
                                <span className="font-medium text-slate-800">{artigo.titulo}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 space-y-4">
                              {/* Texto Legal */}
                              <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                  <Scale className="w-4 h-4" /> Texto Legal
                                </h4>
                                <p className="text-sm text-slate-700 italic leading-relaxed">{artigo.textoLegal}</p>
                              </div>

                              {/* Comentário */}
                              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                  <BookOpen className="w-4 h-4" /> Comentário
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">{artigo.comentario}</p>
                              </div>

                              {/* Análise */}
                              <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                                <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                                  <Search className="w-4 h-4" /> Análise
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">{artigo.analise}</p>
                              </div>

                              {/* Interpretação */}
                              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                                <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                                  <Lightbulb className="w-4 h-4" /> Interpretação Jurisprudencial
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">{artigo.interpretacao}</p>
                              </div>

                              {/* Orientação */}
                              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                                <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" /> Orientação Prática
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">{artigo.orientacao}</p>
                              </div>

                              {/* Palavras-chave */}
                              <div className="flex flex-wrap gap-2 pt-2">
                                {artigo.palavrasChave.map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs cursor-pointer" onClick={() => setSearchTerm(tag)}>
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Rodapé informativo */}
          <Card className="mt-8 bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong>Base legal:</strong> Decreto-Lei nº 5.452/1943, atualizado pela Lei 13.467/2017 (Reforma Trabalhista), Lei 14.442/2022 e legislação complementar.</p>
                  <p><strong>Jurisprudência:</strong> Súmulas e OJs do TST, decisões do STF (ADI 5766, Tema 1046).</p>
                  <p><strong>Última atualização:</strong> Abril de 2026.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CLTComentada;
