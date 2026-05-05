import { CalendarDays, ExternalLink, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCalendarioFiscal } from "@/contexts/CalendarioFiscalContext";

const LeftSidebar = () => {
  const { proximosEventos } = useCalendarioFiscal();
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
          <p className="text-xs text-blue-100 mt-1">Próximos vencimentos</p>
        </div>

        <CardContent className="p-3 space-y-2">
          {proximosEventos.length > 0 ? (
            proximosEventos.map((item) => {
              const style = tipoStyle(item.tipo);
              const diasRestantes = item.dia - diaAtual;
              const urgente = diasRestantes <= 3;
              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-2.5 transition-all hover:border-slate-200 hover:shadow-sm"
                >
                  <div className={`flex flex-col items-center justify-center rounded-md w-12 h-12 shrink-0 ring-2 ${style.ring} ${style.tile}`}>
                    <span className="text-lg font-bold leading-none">{String(item.dia).padStart(2, '0')}</span>
                    <span className="text-[10px] font-medium opacity-90 mt-0.5">{mesesAbrev[mesAtual]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm truncate">{item.evento}</p>
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
                </div>
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
