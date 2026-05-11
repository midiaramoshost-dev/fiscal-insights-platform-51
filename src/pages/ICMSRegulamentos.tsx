import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Scale, Lightbulb, AlertTriangle, CheckCircle2, ExternalLink, FileText, GraduationCap, SearchCode } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { trechosRICMS } from "@/data/ricmsTrechos";

interface RegulamentoEstado {
  uf: string;
  estado: string;
  nomeRegulamento: string;
  decreto: string;
  ano: string;
  link: string;
  destaques: string[];
}

const regulamentos: RegulamentoEstado[] = [
  { uf: "AC", estado: "Acre", nomeRegulamento: "RICMS/AC", decreto: "Decreto nº 008/1998", ano: "1998", link: "https://sefaz.ac.gov.br/wps/portal/sefaz/sefaz/legislacao", destaques: ["Substituição tributária ampla", "Convênios CONFAZ", "ICMS-Difal regulamentado"] },
  { uf: "AL", estado: "Alagoas", nomeRegulamento: "RICMS/AL", decreto: "Decreto nº 35.245/1991", ano: "1991", link: "https://gcs.sefaz.al.gov.br/sfz_gcs/", destaques: ["FECOEP de 2%", "Regime de ST por convênios", "Crédito presumido setorial"] },
  { uf: "AM", estado: "Amazonas", nomeRegulamento: "RICMS/AM", decreto: "Decreto nº 20.686/1999", ano: "1999", link: "https://online.sefaz.am.gov.br/legisla/", destaques: ["Zona Franca de Manaus", "Crédito Estímulo (Lei 2.826/03)", "Isenções para produtos da ZFM"] },
  { uf: "AP", estado: "Amapá", nomeRegulamento: "RICMS/AP", decreto: "Decreto nº 2.269/1998", ano: "1998", link: "https://www.sefaz.ap.gov.br/", destaques: ["Área de Livre Comércio", "Diferimento setorial", "Convênios ICMS"] },
  { uf: "BA", estado: "Bahia", nomeRegulamento: "RICMS/BA", decreto: "Decreto nº 13.780/2012", ano: "2012", link: "https://www.sefaz.ba.gov.br/", destaques: ["FCBA - Fundo Combate à Pobreza", "ST de combustíveis e bebidas", "Desenvolve Bahia"] },
  { uf: "CE", estado: "Ceará", nomeRegulamento: "RICMS/CE", decreto: "Decreto nº 33.327/2019", ano: "2019", link: "https://www.sefaz.ce.gov.br/legislacao/", destaques: ["FECOP de 2%", "FDI - Fundo de Desenvolvimento Industrial", "Substituição tributária"] },
  { uf: "DF", estado: "Distrito Federal", nomeRegulamento: "RICMS/DF", decreto: "Decreto nº 18.955/1997", ano: "1997", link: "https://www.fazenda.df.gov.br/", destaques: ["FCDF de 2%", "Tratamento diferenciado SIMPLES", "Convênios CONFAZ"] },
  { uf: "ES", estado: "Espírito Santo", nomeRegulamento: "RICMS/ES", decreto: "Decreto nº 1.090-R/2002", ano: "2002", link: "https://internet.sefaz.es.gov.br/legislacao/", destaques: ["INVEST-ES", "FUNDAP - importação", "Diferimento industrial"] },
  { uf: "GO", estado: "Goiás", nomeRegulamento: "RICMS/GO", decreto: "Decreto nº 4.852/1997", ano: "1997", link: "https://www.economia.go.gov.br/", destaques: ["PROTEGE Goiás 2%", "FOMENTAR/PRODUZIR", "ST com MVA ajustada"] },
  { uf: "MA", estado: "Maranhão", nomeRegulamento: "RICMS/MA", decreto: "Decreto nº 19.714/2003", ano: "2003", link: "https://portal.sefaz.ma.gov.br/", destaques: ["FUMACOP de 2%", "ST ampla", "Mais Empresas - benefícios"] },
  { uf: "MG", estado: "Minas Gerais", nomeRegulamento: "RICMS/MG", decreto: "Decreto nº 48.589/2023", ano: "2023", link: "https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/", destaques: ["FEM 2% sobre supérfluos", "Crédito presumido (Anexo IV)", "TTD - Tratamento Tributário Diferenciado"] },
  { uf: "MS", estado: "Mato Grosso do Sul", nomeRegulamento: "RICMS/MS", decreto: "Decreto nº 9.203/1998", ano: "1998", link: "https://www.sefaz.ms.gov.br/", destaques: ["MS-Empreendedor", "Diferimento setorial", "ST nacional"] },
  { uf: "MT", estado: "Mato Grosso", nomeRegulamento: "RICMS/MT", decreto: "Decreto nº 2.212/2014", ano: "2014", link: "https://www.sefaz.mt.gov.br/", destaques: ["FETHAB - commodities", "PRODEIC", "ICMS Garantido Integral"] },
  { uf: "PA", estado: "Pará", nomeRegulamento: "RICMS/PA", decreto: "Decreto nº 4.676/2001", ano: "2001", link: "https://www.sefa.pa.gov.br/", destaques: ["Política de incentivos industriais", "Diferimento agronegócio", "ST ampla"] },
  { uf: "PB", estado: "Paraíba", nomeRegulamento: "RICMS/PB", decreto: "Decreto nº 18.930/1997", ano: "1997", link: "https://www.sefaz.pb.gov.br/", destaques: ["FUNCEP de 2%", "FAIN - Fundo de Apoio ao Desenvolvimento Industrial", "ST CONFAZ"] },
  { uf: "PE", estado: "Pernambuco", nomeRegulamento: "RICMS/PE", decreto: "Decreto nº 44.650/2017", ano: "2017", link: "https://www.sefaz.pe.gov.br/legislacao/", destaques: ["FECEP de 2%", "PRODEPE - desenvolvimento", "Sistemática de ST"] },
  { uf: "PI", estado: "Piauí", nomeRegulamento: "RICMS/PI", decreto: "Decreto nº 13.500/2008", ano: "2008", link: "https://webas.sefaz.pi.gov.br/", destaques: ["FECOMB de 2%", "Pró-Piauí", "Diferimento setorial"] },
  { uf: "PR", estado: "Paraná", nomeRegulamento: "RICMS/PR", decreto: "Decreto nº 7.871/2017", ano: "2017", link: "https://www.fazenda.pr.gov.br/", destaques: ["FECOP 1,5%", "Paraná Competitivo", "Crédito presumido (Anexo VII)"] },
  { uf: "RJ", estado: "Rio de Janeiro", nomeRegulamento: "RICMS/RJ", decreto: "Decreto nº 27.427/2000", ano: "2000", link: "https://portal.fazenda.rj.gov.br/legislacao-tributaria/", destaques: ["FECP 2% + FOT 2%", "ST setorial ampla", "Lei nº 4.531/05 - logística"] },
  { uf: "RN", estado: "Rio Grande do Norte", nomeRegulamento: "RICMS/RN", decreto: "Decreto nº 13.640/1997", ano: "1997", link: "https://www.set.rn.gov.br/", destaques: ["FECOP 2%", "PROADI - desenvolvimento", "ST CONFAZ"] },
  { uf: "RO", estado: "Rondônia", nomeRegulamento: "RICMS/RO", decreto: "Decreto nº 22.721/2018", ano: "2018", link: "https://www.sefin.ro.gov.br/", destaques: ["FUMIPEQ", "Regimes especiais", "ST e diferimento"] },
  { uf: "RR", estado: "Roraima", nomeRegulamento: "RICMS/RR", decreto: "Decreto nº 4.335-E/2001", ano: "2001", link: "https://www.sefaz.rr.gov.br/", destaques: ["Área de Livre Comércio Boa Vista", "Diferimento", "Convênios"] },
  { uf: "RS", estado: "Rio Grande do Sul", nomeRegulamento: "RICMS/RS", decreto: "Decreto nº 37.699/1997", ano: "1997", link: "https://www.legislacao.sefaz.rs.gov.br/", destaques: ["AMPARA/RS", "FUNDOPEM-RS", "Crédito presumido (Livro I, art. 32)"] },
  { uf: "SC", estado: "Santa Catarina", nomeRegulamento: "RICMS/SC", decreto: "Decreto nº 2.870/2001", ano: "2001", link: "https://legislacao.sef.sc.gov.br/", destaques: ["TTD 409/410/411 - importação", "PRODEC", "Diferimento Anexo 3"] },
  { uf: "SE", estado: "Sergipe", nomeRegulamento: "RICMS/SE", decreto: "Decreto nº 21.400/2002", ano: "2002", link: "https://www.sefaz.se.gov.br/", destaques: ["FECOEP", "PSDI", "ST Convênios CONFAZ"] },
  { uf: "SP", estado: "São Paulo", nomeRegulamento: "RICMS/SP", decreto: "Decreto nº 45.490/2000", ano: "2000", link: "https://legislacao.fazenda.sp.gov.br/", destaques: ["Maior arrecadação ICMS do país", "ST ampla (Portaria CAT)", "Pro-ação e regimes especiais"] },
  { uf: "TO", estado: "Tocantins", nomeRegulamento: "RICMS/TO", decreto: "Decreto nº 2.912/2006", ano: "2006", link: "https://www.sefaz.to.gov.br/", destaques: ["PROINDÚSTRIA", "Diferimento agro", "Crédito presumido"] },
];

const ICMSRegulamentos = () => {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(
    () =>
      regulamentos.filter(
        (r) =>
          !busca ||
          r.estado.toLowerCase().includes(busca.toLowerCase()) ||
          r.uf.toLowerCase().includes(busca.toLowerCase()) ||
          r.decreto.toLowerCase().includes(busca.toLowerCase())
      ),
    [busca]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Regulamentos do ICMS — Guia Completo por Estado | Conecta Fisco</title>
        <meta
          name="description"
          content="Guia orientador dos Regulamentos do ICMS (RICMS) de todos os estados: estrutura, como consultar, aplicar incidência, base de cálculo, ST, DIFAL, créditos e benefícios fiscais."
        />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/icms-regulamentos" />
      </Helmet>
      <Header />
      <SubHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">Guia Orientador</Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Regulamentos do ICMS
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Conheça, consulte e aplique corretamente o RICMS de cada estado. Aprenda passo a passo
            como interpretar a legislação, calcular o imposto, usar benefícios fiscais e cumprir
            obrigações acessórias.
          </p>
        </div>

        <Tabs defaultValue="guia" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="guia"><GraduationCap className="w-4 h-4 mr-1" />Guia Prático</TabsTrigger>
            <TabsTrigger value="estrutura"><BookOpen className="w-4 h-4 mr-1" />Estrutura</TabsTrigger>
            <TabsTrigger value="aplicacao"><Lightbulb className="w-4 h-4 mr-1" />Como Aplicar</TabsTrigger>
            <TabsTrigger value="estados"><Scale className="w-4 h-4 mr-1" />Por Estado</TabsTrigger>
            <TabsTrigger value="erros"><AlertTriangle className="w-4 h-4 mr-1" />Erros Comuns</TabsTrigger>
          </TabsList>

          {/* GUIA PRÁTICO */}
          <TabsContent value="guia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">📘 O que é o RICMS?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-700 leading-relaxed">
                <p>
                  O <strong>Regulamento do ICMS (RICMS)</strong> é o decreto estadual que consolida e
                  detalha todas as regras do imposto, baseando-se na Lei Complementar nº 87/1996
                  (Lei Kandir), na Constituição Federal (art. 155, II) e nos Convênios CONFAZ.
                </p>
                <p>
                  Cada estado possui seu próprio RICMS, com numeração, anexos e estrutura próprios,
                  mas todos seguem a mesma lógica: <strong>incidência → base de cálculo → alíquota →
                  apuração → recolhimento → obrigações acessórias</strong>.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700"><CheckCircle2 className="w-5 h-5" />Para quem é este guia</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-700 space-y-2">
                  <p>✔ Contadores e auxiliares fiscais</p>
                  <p>✔ Empresários e gestores tributários</p>
                  <p>✔ Estudantes de Ciências Contábeis e Direito</p>
                  <p>✔ Concurseiros das áreas fiscais (SEFAZ, RFB)</p>
                  <p>✔ Profissionais que emitem e escrituram NF-e</p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700"><Lightbulb className="w-5 h-5" />O que você vai aprender</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-700 space-y-2">
                  <p>→ Como consultar o RICMS de cada estado</p>
                  <p>→ Como interpretar artigos, anexos e CSTs</p>
                  <p>→ Quando aplicar substituição tributária e DIFAL</p>
                  <p>→ Como aproveitar créditos e benefícios fiscais</p>
                  <p>→ Como evitar autuações e multas</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">🎯 Roteiro de estudo recomendado</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li><strong>Fundamentos constitucionais:</strong> art. 155 da CF/88 e LC 87/96.</li>
                  <li><strong>Estrutura do RICMS do seu estado:</strong> identifique livro, título e anexos.</li>
                  <li><strong>Fato gerador e hipóteses de incidência:</strong> circulação, importação, prestação de serviço.</li>
                  <li><strong>Base de cálculo e alíquotas:</strong> internas, interestaduais (12%/7%/4%) e DIFAL.</li>
                  <li><strong>Não cumulatividade:</strong> apuração de débitos e créditos.</li>
                  <li><strong>Substituição tributária:</strong> MVA, IVA-ST e protocolos CONFAZ.</li>
                  <li><strong>Obrigações acessórias:</strong> NF-e, SPED Fiscal, GIA, EFD-ICMS/IPI.</li>
                  <li><strong>Benefícios fiscais e regimes especiais</strong> aplicáveis ao seu setor.</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ESTRUTURA */}
          <TabsContent value="estrutura" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>📚 Estrutura típica de um RICMS</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="i1">
                    <AccordionTrigger>Livro I — Disposições Gerais</AccordionTrigger>
                    <AccordionContent className="text-slate-700 space-y-2">
                      <p>Define <strong>fato gerador, contribuinte, responsável, base de cálculo, alíquotas, não cumulatividade e local da operação</strong>.</p>
                      <p>📌 Onde aprender o que é "saída de mercadoria", momento da incidência e quem deve recolher o imposto.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="i2">
                    <AccordionTrigger>Livro II — Obrigações Acessórias</AccordionTrigger>
                    <AccordionContent className="text-slate-700 space-y-2">
                      <p>Regras sobre <strong>cadastro de contribuinte, emissão de documentos fiscais (NF-e, NFC-e, CT-e), livros fiscais, EFD/SPED e GIA</strong>.</p>
                      <p>📌 Consulte aqui antes de configurar emissor de NF-e ou parametrizar ERP.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="i3">
                    <AccordionTrigger>Livro III / Anexos — Substituição Tributária</AccordionTrigger>
                    <AccordionContent className="text-slate-700 space-y-2">
                      <p>Lista de produtos sujeitos à ST, MVA/IVA-ST, CEST, protocolos e convênios.</p>
                      <p>📌 Sempre verifique se a operação é alcançada por ST <em>antes</em> de aplicar a alíquota interna normal.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="i4">
                    <AccordionTrigger>Anexos de Benefícios — Isenção, Redução, Diferimento e Crédito Presumido</AccordionTrigger>
                    <AccordionContent className="text-slate-700 space-y-2">
                      <p>Cada estado relaciona em anexo as situações de <strong>isenção, redução de base, diferimento e crédito presumido</strong>, normalmente vinculadas a convênios CONFAZ.</p>
                      <p>📌 Use estes anexos para identificar oportunidades legais de redução de carga tributária.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="i5">
                    <AccordionTrigger>Anexos de CFOP, CST e Códigos</AccordionTrigger>
                    <AccordionContent className="text-slate-700">
                      <p>Tabelas de CFOP (Código Fiscal de Operações), CST/CSOSN, CEST e códigos de ajuste do SPED. Indispensáveis para correta escrituração.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMO APLICAR */}
          <TabsContent value="aplicacao" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🧮 Passo a passo: como aplicar o ICMS na prática</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 text-slate-700">
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <div><strong>Identifique a operação:</strong> venda interna, interestadual, importação, transferência, devolução ou consumo final?</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <div><strong>Classifique a mercadoria (NCM/CEST):</strong> a NCM determina possível ST e benefícios. O CEST é obrigatório para itens com ST.</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <div><strong>Verifique a alíquota aplicável:</strong> interna (do estado de destino para consumidor final, do estado de origem para revenda) ou interestadual (12%, 7% ou 4% para importados).</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <div><strong>Calcule a base:</strong> valor da mercadoria + frete + seguro + outras despesas + IPI (quando aplicável). ICMS é "por dentro".</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">5</span>
                    <div><strong>Aplique benefícios:</strong> redução de base, isenção, diferimento ou crédito presumido — sempre com base no anexo do RICMS.</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">6</span>
                    <div><strong>Avalie ST e DIFAL:</strong> se houver ST, calcule o ICMS-ST com MVA. Se for venda interestadual a consumidor final, recolha o DIFAL ao destino.</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">7</span>
                    <div><strong>Apure o saldo:</strong> some débitos (saídas) e subtraia créditos (entradas). Recolha via DARE/DAE estadual no prazo.</div>
                  </li>
                  <li className="flex gap-3"><span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold flex-shrink-0">8</span>
                    <div><strong>Cumpra obrigações acessórias:</strong> emita NF-e/CT-e, escriture EFD-ICMS/IPI e entregue GIA ou equivalente.</div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader><CardTitle className="text-emerald-800">💡 Exemplo prático</CardTitle></CardHeader>
              <CardContent className="text-slate-700 space-y-2">
                <p><strong>Operação:</strong> Indústria em SP vende R$ 10.000 em mercadorias para revendedor em MG.</p>
                <p><strong>Alíquota interestadual:</strong> 12% (SP → MG, ambos Sudeste)</p>
                <p><strong>ICMS destacado:</strong> R$ 10.000 × 12% = <strong>R$ 1.200</strong></p>
                <p><strong>Crédito para o comprador em MG:</strong> R$ 1.200 (não cumulatividade — art. 155 §2º, I, CF).</p>
                <p className="text-sm text-emerald-700">⚠ Se o destinatário fosse consumidor final não contribuinte, haveria DIFAL recolhido para MG.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ESTADOS */}
          <TabsContent value="estados" className="space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar estado, UF ou decreto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtrados.map((r) => (
                <Card key={r.uf} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-bold text-base">{r.uf}</Badge>
                      <Badge variant="secondary" className="text-xs">{r.ano}</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{r.estado}</CardTitle>
                    <p className="text-sm text-slate-500">{r.nomeRegulamento} — {r.decreto}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-600 mb-1">Destaques:</p>
                      <ul className="text-xs text-slate-600 space-y-0.5">
                        {r.destaques.map((d, i) => <li key={i}>• {d}</li>)}
                      </ul>
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <a href={r.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" /> Acessar SEFAZ {r.uf}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 flex gap-3 items-start">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Consulte sempre o site oficial da SEFAZ do seu estado para a versão consolidada e
                  atualizada do RICMS. As legislações são alteradas frequentemente por decretos e
                  convênios CONFAZ.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ERROS COMUNS */}
          <TabsContent value="erros" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="w-5 h-5" /> Os 10 erros mais comuns na aplicação do ICMS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {[
                    ["1. Usar alíquota interna em operação interestadual", "A alíquota interestadual (12%, 7% ou 4%) só se aplica entre contribuintes. Para consumidor final não contribuinte, recolhe-se a interna do destino + DIFAL."],
                    ["2. Esquecer o DIFAL nas vendas a consumidor final", "Desde a EC 87/15 e LC 190/22, vendas a não contribuintes geram DIFAL ao estado de destino. Não destacar gera autuação."],
                    ["3. Ignorar a substituição tributária", "Antes de calcular o ICMS, verifique se o produto está no rol de ST do estado de destino — protocolos e convênios CONFAZ definem isso."],
                    ["4. Aplicar MVA original em operação interestadual", "É preciso usar MVA ajustada quando há diferença entre as alíquotas interna e interestadual."],
                    ["5. Não aproveitar créditos legítimos", "Energia elétrica industrial, ativo imobilizado (1/48), insumos e combustível usado no processo produtivo geram crédito."],
                    ["6. Errar a base de cálculo do ICMS-ST", "A base ST é (valor da mercadoria + frete + seguro + IPI + outras despesas) × (1 + MVA)."],
                    ["7. CFOP incorreto no XML da NF-e", "CFOP errado distorce a apuração e a EFD-ICMS, gerando divergências e malha fiscal."],
                    ["8. Ignorar o adicional FCP", "Vários estados cobram 1% a 4% de FCP/FECP/FECOP sobre itens específicos. Some à alíquota e destaque separado."],
                    ["9. Confundir CST (Lucro Real/Presumido) com CSOSN (Simples)", "Optantes do Simples usam CSOSN; demais usam CST. Trocar gera rejeição da NF-e."],
                    ["10. Não conferir convênios e protocolos CONFAZ", "Muitos benefícios e regras de ST são definidos em convênios. Consulte sempre o site do CONFAZ."],
                  ].map(([titulo, texto], i) => (
                    <AccordionItem key={i} value={`e${i}`}>
                      <AccordionTrigger className="text-left">{titulo}</AccordionTrigger>
                      <AccordionContent className="text-slate-700">{texto}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Quer ver a tabela de alíquotas por estado?</h3>
                <p className="mb-4 text-blue-50">Acesse nossa tabela completa com alíquotas internas, interestaduais, FECOP e DIFAL.</p>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/icms">Ver Tabela ICMS por Estado</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ICMSRegulamentos;
