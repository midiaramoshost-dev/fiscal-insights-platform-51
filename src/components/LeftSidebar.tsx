import { useState } from "react";
import { CalendarDays, ExternalLink, TrendingUp, AlertCircle, Percent, FileText, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCalendarioFiscal } from "@/contexts/CalendarioFiscalContext";
import { EventoFiscal } from "@/types/admin";

interface DetalheObrigacao {
  obrigacao: string;
  percentual: string;
  formaAplicacao: string;
  baseLegal?: string;
}

const detalhesObrigacoes: Record<string, DetalheObrigacao> = {
  'FGTS': {
    obrigacao: 'Fundo de Garantia do Tempo de Serviço - depósito mensal em conta vinculada do trabalhador.',
    percentual: '8% sobre a remuneração mensal (2% para contrato de aprendiz).',
    formaAplicacao: 'Recolhimento via GRF (Guia de Recolhimento do FGTS), gerada pelo SEFIP/eSocial, até o dia 7 do mês seguinte ao da competência. Se cair em dia não útil, antecipa-se para o dia útil anterior.',
    baseLegal: 'Lei nº 8.036/1990',
  },
  'DARF PJ - IRPJ/CSLL': {
    obrigacao: 'IRPJ (Imposto de Renda Pessoa Jurídica) e CSLL (Contribuição Social sobre Lucro Líquido).',
    percentual: 'IRPJ: 15% + adicional de 10% sobre o que exceder R$ 20.000/mês. CSLL: 9% (empresas em geral) ou 15% (instituições financeiras).',
    formaAplicacao: 'Apuração trimestral ou estimativa mensal pelo Lucro Real/Presumido. Recolhimento via DARF, código próprio (ex.: 2362 IRPJ Estimativa, 2484 CSLL Estimativa) até o último dia útil do mês subsequente.',
    baseLegal: 'Lei nº 9.430/1996',
  },
  'DARF - IRRF/PIS/COFINS': {
    obrigacao: 'Tributos federais retidos na fonte sobre pagamentos a pessoas físicas/jurídicas.',
    percentual: 'IRRF: tabela progressiva (0% a 27,5%) ou alíquotas específicas (1,5% serviços PJ). PIS/COFINS retido: 0,65% + 3% (total 3,65% ou 4,65% com CSLL).',
    formaAplicacao: 'Recolhimento via DARF até o último dia útil do 2º decêndio do mês subsequente ao fato gerador. Códigos: 0561 (IRRF salário), 5952 (PIS/COFINS/CSLL retidos).',
    baseLegal: 'Lei nº 10.833/2003 e RIR/2018',
  },
  'INSS': {
    obrigacao: 'Contribuição Previdenciária Patronal e dos Segurados (GPS).',
    percentual: 'Patronal: 20% sobre folha + RAT (1% a 3%) + Terceiros (até 5,8%). Empregado: 7,5% a 14% (tabela progressiva).',
    formaAplicacao: 'Recolhimento via DARF Web (eSocial) ou GPS até o dia 20 do mês seguinte. Se não houver expediente bancário, antecipa para o dia útil anterior.',
    baseLegal: 'Lei nº 8.212/1991',
  },
  'Simples Nacional': {
    obrigacao: 'DAS - Documento de Arrecadação do Simples Nacional (unifica IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS e CPP).',
    percentual: 'De 4% a 33% conforme Anexo (I a V) e faixa de receita bruta dos últimos 12 meses. Limite: R$ 4,8 milhões/ano.',
    formaAplicacao: 'Cálculo automático no portal do Simples Nacional (PGDAS-D). Geração e pagamento do DAS até o dia 20 do mês subsequente ao da apuração.',
    baseLegal: 'LC nº 123/2006',
  },
  'ICMS': {
    obrigacao: 'Imposto sobre Circulação de Mercadorias e Serviços de transporte e comunicação.',
    percentual: 'Varia por estado e produto: 4% (interestadual de importados), 7% ou 12% (interestadual), 17% a 20% (interno), até 35% (supérfluos).',
    formaAplicacao: 'Apuração mensal por confronto de débitos (saídas) e créditos (entradas). Recolhimento via GNRE ou guia estadual conforme prazo da SEFAZ de cada UF (geralmente entre dia 10 e 25).',
    baseLegal: 'LC nº 87/1996 (Lei Kandir)',
  },
  'PIS/COFINS': {
    obrigacao: 'Contribuição para o PIS/PASEP e COFINS sobre faturamento.',
    percentual: 'Cumulativo (Lucro Presumido): PIS 0,65% + COFINS 3% = 3,65%. Não-cumulativo (Lucro Real): PIS 1,65% + COFINS 7,6% = 9,25%.',
    formaAplicacao: 'Recolhimento via DARF até o dia 25 do mês subsequente. Códigos: 8109 (PIS), 2172 (COFINS) cumulativo; 6912 (PIS), 5856 (COFINS) não-cumulativo.',
    baseLegal: 'Leis nº 10.637/2002 e 10.833/2003',
  },
  'ISS': {
    obrigacao: 'Imposto Sobre Serviços de Qualquer Natureza, de competência municipal.',
    percentual: 'Mínimo 2% e máximo 5% sobre o preço do serviço, conforme legislação de cada município.',
    formaAplicacao: 'Emissão da NFS-e gera a guia de ISS. Recolhimento mensal conforme prazo da prefeitura (geralmente até dia 10 ou 15 do mês seguinte). Pode haver retenção pelo tomador.',
    baseLegal: 'LC nº 116/2003',
  },
  'DIRF': {
    obrigacao: 'Declaração do Imposto de Renda Retido na Fonte - informa rendimentos pagos e tributos retidos no ano-calendário.',
    percentual: 'Declaração informativa - sem percentual de tributo. Multa por atraso: 2% ao mês, mínimo R$ 200 (PF) ou R$ 500 (PJ).',
    formaAplicacao: 'Transmissão obrigatória via PGD DIRF (Receita Federal) até o último dia útil de fevereiro do ano subsequente ao ano-calendário.',
    baseLegal: 'IN RFB nº 1.990/2020',
  },
  'DEFIS': {
    obrigacao: 'Declaração de Informações Socioeconômicas e Fiscais - obrigação anual das ME/EPP optantes pelo Simples.',
    percentual: 'Declaração informativa - sem alíquota.',
    formaAplicacao: 'Preenchimento e envio via portal do Simples Nacional (PGDAS-D módulo DEFIS) até 31 de março do ano-calendário subsequente.',
    baseLegal: 'Resolução CGSN nº 140/2018',
  },
  'IRPF': {
    obrigacao: 'Declaração de Ajuste Anual do Imposto de Renda Pessoa Física.',
    percentual: 'Tabela progressiva: isento até R$ 2.259,20; 7,5%; 15%; 22,5%; 27,5% (acima de R$ 4.664,68/mês).',
    formaAplicacao: 'Transmissão via programa IRPF ou Meu Imposto de Renda (e-CAC/app), entre março e o último dia útil de maio. Pagamento em cota única ou até 8 quotas mensais.',
    baseLegal: 'Lei nº 9.250/1995',
  },
  'ECD': {
    obrigacao: 'Escrituração Contábil Digital - livros Diário, Razão e Balancetes em formato digital.',
    percentual: 'Obrigação acessória. Multa por atraso: 0,02% por dia sobre faturamento, limitado a 1%.',
    formaAplicacao: 'Geração via PVA SPED Contábil, assinada digitalmente e transmitida ao SPED até o último dia útil de junho do ano subsequente (prorrogado tradicionalmente para julho).',
    baseLegal: 'IN RFB nº 2.003/2021',
  },
  'ECF': {
    obrigacao: 'Escrituração Contábil Fiscal - apuração do IRPJ e CSLL com informações fiscais e econômicas da PJ.',
    percentual: 'Obrigação acessória. Multas: 0,25% sobre lucro líquido por mês de atraso, até 10%.',
    formaAplicacao: 'Geração no PVA ECF, assinatura digital e transmissão ao SPED até o último dia útil de julho do ano subsequente ao período de apuração.',
    baseLegal: 'IN RFB nº 2.004/2021',
  },
};

const detalhePadrao: DetalheObrigacao = {
  obrigacao: 'Obrigação fiscal cadastrada no calendário.',
  percentual: 'Consulte a legislação específica aplicável.',
  formaAplicacao: 'Verifique forma de recolhimento e prazos junto ao órgão competente (Receita Federal, SEFAZ ou Prefeitura).',
};

const LeftSidebar = () => {
  const { proximosEventos } = useCalendarioFiscal();
  const [eventoSelecionado, setEventoSelecionado] = useState<EventoFiscal | null>(null);
  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;
  const diaAtual = hoje.getDate();
  const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const mesesAbrev = ['', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

  const tipoStyle = (tipo: string) => {
    switch (tipo) {
      case 'Federal':      return { tile: 'bg-blue-600 text-white',     ring: 'ring-blue-200',     badge: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'Estadual':     return { tile: 'bg-emerald-600 text-white',  ring: 'ring-emerald-200',  badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'Municipal':    return { tile: 'bg-purple-600 text-white',   ring: 'ring-purple-200',   badge: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'Trabalhista':  return { tile: 'bg-orange-600 text-white',   ring: 'ring-orange-200',   badge: 'bg-orange-100 text-orange-800 border-orange-200' };
      default:             return { tile: 'bg-slate-600 text-white',    ring: 'ring-slate-200',    badge: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const linksRapidos = [
    { nome: "Receita Federal", url: "https://www.gov.br/receitafederal" },
    { nome: "Banco Central", url: "https://www.bcb.gov.br" },
    { nome: "Portal eSocial", url: "https://www.gov.br/esocial" },
    { nome: "SPED", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/sped" },
    { nome: "Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional" },
    { nome: "CFC - Conselho Federal", url: "https://cfc.org.br" }
  ];

  const detalheAtivo = eventoSelecionado
    ? (detalhesObrigacoes[eventoSelecionado.evento] || detalhePadrao)
    : null;
  const styleAtivo = eventoSelecionado ? tipoStyle(eventoSelecionado.tipo) : null;

  return (
    <div className="space-y-6">
      {/* Calendário Fiscal */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              <h3 className="font-semibold tracking-tight">Calendário Fiscal</h3>
            </div>
            <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">{meses[mesAtual]}</Badge>
          </div>
          <p className="text-xs text-blue-100 mt-1">Próximos vencimentos · clique para detalhes</p>
        </div>

        <CardContent className="p-3 space-y-2">
          {proximosEventos.length > 0 ? (
            proximosEventos.map((item) => {
              const style = tipoStyle(item.tipo);
              const diasRestantes = item.dia - diaAtual;
              const urgente = diasRestantes <= 3;
              return (
                <button
                  key={item.id}
                  onClick={() => setEventoSelecionado(item)}
                  className="group w-full text-left flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-2.5 transition-all hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className={`flex flex-col items-center justify-center rounded-md w-12 h-12 shrink-0 ring-2 ${style.ring} ${style.tile}`}>
                    <span className="text-lg font-bold leading-none">{String(item.dia).padStart(2, '0')}</span>
                    <span className="text-[10px] font-medium opacity-90 mt-0.5">{mesesAbrev[mesAtual]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm truncate group-hover:text-blue-700">{item.evento}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <Badge variant="outline" className={`text-[10px] py-0 px-1.5 ${style.badge}`}>{item.tipo}</Badge>
                      {urgente ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600">
                          <AlertCircle className="w-3 h-3" />
                          {diasRestantes <= 0 ? 'Hoje' : diasRestantes === 1 ? 'Amanhã' : `${diasRestantes} dias`}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">em {diasRestantes} dias</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-6">
              <CalendarDays className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Nenhum vencimento próximo</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalhes */}
      <Dialog open={!!eventoSelecionado} onOpenChange={(open) => !open && setEventoSelecionado(null)}>
        <DialogContent className="max-w-lg">
          {eventoSelecionado && detalheAtivo && styleAtivo && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`flex flex-col items-center justify-center rounded-md w-14 h-14 shrink-0 ring-2 ${styleAtivo.ring} ${styleAtivo.tile}`}>
                    <span className="text-xl font-bold leading-none">{String(eventoSelecionado.dia).padStart(2, '0')}</span>
                    <span className="text-[10px] font-medium opacity-90 mt-0.5">{mesesAbrev[eventoSelecionado.mes ?? mesAtual]}</span>
                  </div>
                  <div>
                    <DialogTitle className="text-left">{eventoSelecionado.evento}</DialogTitle>
                    <Badge variant="outline" className={`mt-1 ${styleAtivo.badge}`}>{eventoSelecionado.tipo}</Badge>
                  </div>
                </div>
                {eventoSelecionado.descricao && (
                  <DialogDescription className="text-left pt-2">{eventoSelecionado.descricao}</DialogDescription>
                )}
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <section>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <FileText className="w-4 h-4 text-blue-600" /> Obrigação
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{detalheAtivo.obrigacao}</p>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <Percent className="w-4 h-4 text-emerald-600" /> Percentual / Alíquota
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{detalheAtivo.percentual}</p>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <Info className="w-4 h-4 text-purple-600" /> Forma de Aplicação
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{detalheAtivo.formaAplicacao}</p>
                </section>

                {detalheAtivo.baseLegal && (
                  <div className="border-t pt-3">
                    <p className="text-xs text-slate-500"><strong>Base legal:</strong> {detalheAtivo.baseLegal}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Links Rápidos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <ExternalLink className="w-5 h-5" />
            <span>Links Rápidos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {linksRapidos.map((link, index) => (
            <Button key={index} variant="ghost" size="sm" className="w-full justify-start hover:bg-blue-50 hover:text-blue-700" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {link.nome}
              </a>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Tendências */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <TrendingUp className="w-5 h-5" />
            <span>Em Alta</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-orange-700">
            <p className="font-medium">• eSocial versão 2.5</p>
            <p className="font-medium">• PIX no SPED</p>
            <p className="font-medium">• Marco do Saneamento</p>
            <p className="font-medium">• LGPD Fiscal</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSidebar;
