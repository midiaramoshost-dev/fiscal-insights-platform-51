import { Calendar, ExternalLink, TrendingUp, FileText, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCalendarioFiscal } from "@/contexts/CalendarioFiscalContext";
import AssinaturaPremiumForm from "./forms/AssinaturaPremiumForm";

const LeftSidebar = () => {
  const [premiumFormOpen, setPremiumFormOpen] = useState(false);
  const { proximosEventos } = useCalendarioFiscal();

  const handleProtectedClick = () => {
    setPremiumFormOpen(true);
  };

  const mesAtual = new Date().getMonth() + 1;
  const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const tipoCor = (tipo: string) => {
    switch (tipo) {
      case 'Federal': return 'border-blue-400';
      case 'Estadual': return 'border-emerald-400';
      case 'Municipal': return 'border-purple-400';
      case 'Trabalhista': return 'border-orange-400';
      default: return 'border-slate-400';
    }
  };

  const linksRapidos = [
    { nome: "Receita Federal", url: "https://www.gov.br/receitafederal", categoria: "Governo" },
    { nome: "Banco Central", url: "https://www.bcb.gov.br", categoria: "Governo" },
    { nome: "Portal eSocial", url: "https://www.gov.br/esocial", categoria: "Governo" },
    { nome: "SPED", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/sped", categoria: "SPED" },
    { nome: "Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional", categoria: "Governo" },
    { nome: "CFC - Conselho Federal", url: "https://cfc.org.br", categoria: "Conselho" }
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Calendário Fiscal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Calendar className="w-5 h-5" />
              <span>Calendário Fiscal</span>
            </CardTitle>
            <p className="text-xs text-slate-500">{meses[mesAtual]} - Próximos vencimentos</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {proximosEventos.length > 0 ? (
              proximosEventos.map((item) => (
                <div key={item.id} className={`flex items-center justify-between border-l-4 ${tipoCor(item.tipo)} pl-3 py-2`}>
                  <div>
                    <span className="font-medium text-slate-800">
                      {String(item.dia).padStart(2, '0')}/{String(mesAtual).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-slate-600">{item.evento}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {item.tipo}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-2">Nenhum vencimento próximo neste mês</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleProtectedClick}
            >
              Ver Calendário Completo 👑
            </Button>
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
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start hover:bg-blue-50 hover:text-blue-700"
                asChild
              >
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

      <AssinaturaPremiumForm
        isOpen={premiumFormOpen}
        onClose={() => setPremiumFormOpen(false)}
      />
    </>
  );
};

export default LeftSidebar;
