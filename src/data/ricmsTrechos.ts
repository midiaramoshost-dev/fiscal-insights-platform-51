// Base de trechos do RICMS para busca por artigo, inciso e anexo.
// Conteúdo curado com resumos didáticos. Para o texto integral oficial,
// o usuário é direcionado ao site da SEFAZ correspondente via "linkOficial".

export interface TrechoRICMS {
  uf: string;
  estado: string;
  tipo: "artigo" | "inciso" | "anexo" | "paragrafo";
  referencia: string; // ex: "Art. 2º", "Inciso III do art. 2º", "Anexo IV"
  titulo: string;
  resumo: string;
  tags: string[];
  linkOficial: string; // link para a SEFAZ/legislação do estado
}

export const trechosRICMS: TrechoRICMS[] = [
  // SP
  { uf: "SP", estado: "São Paulo", tipo: "artigo", referencia: "Art. 1º do RICMS/SP", titulo: "Incidência do ICMS",
    resumo: "Define as hipóteses de incidência do ICMS em SP: operações relativas à circulação de mercadorias, prestações de serviço de transporte interestadual/intermunicipal e de comunicação, e entrada de bens importados.",
    tags: ["incidência", "fato gerador", "importação"], linkOficial: "https://legislacao.fazenda.sp.gov.br/Paginas/RC0000.aspx" },
  { uf: "SP", estado: "São Paulo", tipo: "artigo", referencia: "Art. 52 do RICMS/SP", titulo: "Alíquotas internas",
    resumo: "Estabelece a alíquota interna de 18% como regra geral em SP, com alíquotas específicas para energia, combustíveis, comunicação, supérfluos e produtos da cesta básica.",
    tags: ["alíquota", "18%", "interna"], linkOficial: "https://legislacao.fazenda.sp.gov.br/Paginas/art52.aspx" },
  { uf: "SP", estado: "São Paulo", tipo: "anexo", referencia: "Anexo I do RICMS/SP", titulo: "Isenções",
    resumo: "Lista das mercadorias e operações isentas do ICMS em SP, incluindo medicamentos da Farmácia Popular, equipamentos para portadores de deficiência, produtos hortifrutigranjeiros e doações a entidades.",
    tags: ["isenção", "anexo I", "benefício"], linkOficial: "https://legislacao.fazenda.sp.gov.br/Paginas/RANEXO01.aspx" },
  { uf: "SP", estado: "São Paulo", tipo: "anexo", referencia: "Anexo II do RICMS/SP", titulo: "Reduções de Base de Cálculo",
    resumo: "Relaciona as hipóteses de redução de base de cálculo do ICMS em SP, como operações com produtos da cesta básica, máquinas industriais e veículos.",
    tags: ["redução", "base de cálculo", "anexo II"], linkOficial: "https://legislacao.fazenda.sp.gov.br/Paginas/RANEXO02.aspx" },

  // RJ
  { uf: "RJ", estado: "Rio de Janeiro", tipo: "artigo", referencia: "Art. 14 do Livro I do RICMS/RJ", titulo: "Alíquotas",
    resumo: "Define a alíquota interna do ICMS no RJ em 20% (18% + 2% FECP), com adicional de 2% do FOT (Fundo Orçamentário Temporário), totalizando 22% na maioria das operações.",
    tags: ["alíquota", "FECP", "FOT", "22%"], linkOficial: "https://portal.fazenda.rj.gov.br/legislacao-tributaria/" },
  { uf: "RJ", estado: "Rio de Janeiro", tipo: "anexo", referencia: "Livro II do RICMS/RJ", titulo: "Substituição Tributária",
    resumo: "Disciplina a substituição tributária no RJ, listando produtos sujeitos à ST, MVA aplicáveis e procedimentos de cálculo do ICMS-ST e ressarcimento.",
    tags: ["substituição tributária", "ST", "MVA"], linkOficial: "https://portal.fazenda.rj.gov.br/legislacao-tributaria/" },

  // MG
  { uf: "MG", estado: "Minas Gerais", tipo: "artigo", referencia: "Art. 42 do RICMS/MG", titulo: "Alíquotas internas",
    resumo: "Fixa as alíquotas internas em MG, sendo 18% a alíquota geral, com adicional de 2% do FEM sobre supérfluos (cigarros, bebidas alcoólicas, armas, etc.).",
    tags: ["alíquota", "FEM", "supérfluos"], linkOficial: "https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/" },
  { uf: "MG", estado: "Minas Gerais", tipo: "anexo", referencia: "Anexo IV do RICMS/MG", titulo: "Crédito Presumido",
    resumo: "Lista as hipóteses de crédito presumido em MG, como saídas de produtos da indústria de informática, leite, café, carnes e prestações de transporte.",
    tags: ["crédito presumido", "anexo IV", "benefício"], linkOficial: "https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/" },

  // RS
  { uf: "RS", estado: "Rio Grande do Sul", tipo: "artigo", referencia: "Art. 27 do Livro I do RICMS/RS", titulo: "Alíquotas",
    resumo: "Estabelece a alíquota interna geral de 17% no RS, com alíquotas específicas para combustíveis, energia, comunicação e itens supérfluos via AMPARA/RS.",
    tags: ["alíquota", "17%", "AMPARA"], linkOficial: "https://www.legislacao.sefaz.rs.gov.br/" },
  { uf: "RS", estado: "Rio Grande do Sul", tipo: "anexo", referencia: "Livro III do RICMS/RS", titulo: "Substituição Tributária",
    resumo: "Disciplina o regime de ST no RS, com lista de mercadorias, MVA-ST, protocolos CONFAZ e regras de ressarcimento e complementação.",
    tags: ["ST", "substituição tributária", "MVA"], linkOficial: "https://www.legislacao.sefaz.rs.gov.br/" },

  // SC
  { uf: "SC", estado: "Santa Catarina", tipo: "anexo", referencia: "Anexo 3 do RICMS/SC", titulo: "Diferimento",
    resumo: "Lista das hipóteses de diferimento em SC, incluindo operações com matéria-prima para indústria, leite in natura, peixes, suínos e operações internas entre indústrias.",
    tags: ["diferimento", "anexo 3", "indústria"], linkOficial: "https://legislacao.sef.sc.gov.br/" },
  { uf: "SC", estado: "Santa Catarina", tipo: "artigo", referencia: "TTD 409/410/411 — RICMS/SC", titulo: "Tratamento Tributário Diferenciado para importação",
    resumo: "Concede crédito presumido para empresas importadoras estabelecidas em SC, reduzindo a carga efetiva do ICMS na importação por conta própria, encomenda ou ordem.",
    tags: ["TTD", "importação", "crédito presumido"], linkOficial: "https://legislacao.sef.sc.gov.br/" },

  // PR
  { uf: "PR", estado: "Paraná", tipo: "artigo", referencia: "Art. 14 do RICMS/PR", titulo: "Alíquotas internas",
    resumo: "Fixa a alíquota interna geral em 19,5% no PR (incluindo 1,5% de FECOP em itens específicos), com alíquotas próprias para combustíveis, energia e comunicação.",
    tags: ["alíquota", "FECOP", "19,5%"], linkOficial: "https://www.fazenda.pr.gov.br/" },
  { uf: "PR", estado: "Paraná", tipo: "anexo", referencia: "Anexo VII do RICMS/PR", titulo: "Crédito Presumido",
    resumo: "Lista as hipóteses de crédito presumido no PR, como saídas de carne, leite, transporte e setores incentivados pelo Paraná Competitivo.",
    tags: ["crédito presumido", "anexo VII"], linkOficial: "https://www.fazenda.pr.gov.br/" },

  // BA
  { uf: "BA", estado: "Bahia", tipo: "artigo", referencia: "Art. 16 do RICMS/BA", titulo: "Alíquotas internas",
    resumo: "Estabelece alíquota interna de 20,5% na BA (18,5% base + 2% FCBA), com alíquotas específicas para combustíveis, energia e telecomunicações.",
    tags: ["alíquota", "FCBA", "20,5%"], linkOficial: "https://www.sefaz.ba.gov.br/" },

  // CE
  { uf: "CE", estado: "Ceará", tipo: "artigo", referencia: "Art. 55 do RICMS/CE", titulo: "Alíquotas internas",
    resumo: "Define alíquotas internas no CE: 20% como regra geral (18% + 2% FECOP), com alíquotas próprias para combustíveis, energia, comunicação e supérfluos.",
    tags: ["alíquota", "FECOP", "20%"], linkOficial: "https://www.sefaz.ce.gov.br/legislacao/" },

  // GO
  { uf: "GO", estado: "Goiás", tipo: "artigo", referencia: "Art. 27 do RCTE/GO", titulo: "Alíquotas internas",
    resumo: "Estabelece a alíquota interna geral de 19% em GO (17% + 2% PROTEGE em produtos específicos), com tratamento especial para FOMENTAR/PRODUZIR.",
    tags: ["alíquota", "PROTEGE", "FOMENTAR"], linkOficial: "https://www.economia.go.gov.br/" },

  // PE
  { uf: "PE", estado: "Pernambuco", tipo: "artigo", referencia: "Art. 16 do RICMS/PE", titulo: "Alíquotas internas",
    resumo: "Define alíquota interna em 20,5% em PE (18,5% + 2% FECEP), com alíquotas específicas para itens essenciais e supérfluos.",
    tags: ["alíquota", "FECEP", "20,5%"], linkOficial: "https://www.sefaz.pe.gov.br/legislacao/" },

  // DF
  { uf: "DF", estado: "Distrito Federal", tipo: "artigo", referencia: "Art. 46 do RICMS/DF", titulo: "Alíquotas internas",
    resumo: "Fixa alíquotas internas no DF em 20% (18% + 2% FCDF), com regimes especiais para o Simples Nacional e adicionais para supérfluos.",
    tags: ["alíquota", "FCDF", "20%"], linkOficial: "https://www.fazenda.df.gov.br/" },

  // ES
  { uf: "ES", estado: "Espírito Santo", tipo: "artigo", referencia: "Art. 71 do RICMS/ES", titulo: "Alíquotas internas",
    resumo: "Mantém alíquota interna de 17% no ES, com regimes especiais como INVEST-ES e FUNDAP para incentivar importação e indústria local.",
    tags: ["alíquota", "17%", "INVEST-ES", "FUNDAP"], linkOficial: "https://internet.sefaz.es.gov.br/legislacao/" },

  // AM (ZFM)
  { uf: "AM", estado: "Amazonas", tipo: "artigo", referencia: "Lei nº 2.826/2003 c/c RICMS/AM", titulo: "Crédito Estímulo da ZFM",
    resumo: "Concede crédito estímulo de ICMS para indústrias incentivadas instaladas na Zona Franca de Manaus, podendo chegar a 100% do imposto incidente sobre saídas de produtos industrializados.",
    tags: ["ZFM", "crédito estímulo", "Zona Franca", "incentivo"], linkOficial: "https://online.sefaz.am.gov.br/legisla/" },

  // Geral - DIFAL
  { uf: "BR", estado: "Nacional", tipo: "artigo", referencia: "LC 190/2022 — DIFAL", titulo: "Diferencial de Alíquotas",
    resumo: "Regulamenta o DIFAL nas operações interestaduais destinadas a consumidor final não contribuinte do ICMS, com partilha integralmente para o estado de destino desde 2019.",
    tags: ["DIFAL", "interestadual", "consumidor final"], linkOficial: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp190.htm" },
  { uf: "BR", estado: "Nacional", tipo: "artigo", referencia: "Resolução SF nº 13/2012", titulo: "Alíquota de 4% para importados",
    resumo: "Fixa em 4% a alíquota interestadual nas operações com bens e mercadorias importados do exterior ou com Conteúdo de Importação superior a 40%.",
    tags: ["importado", "4%", "interestadual", "conteúdo de importação"], linkOficial: "https://www25.senado.leg.br/web/atividade/materias/-/materia/106693" },
];
