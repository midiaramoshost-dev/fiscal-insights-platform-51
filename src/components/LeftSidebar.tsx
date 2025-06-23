
import { Calendar, Link, Star, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const obrigacoes = [
    { data: "2024-01-20", titulo: "DARF - IRPJ/CSLL", tipo: "Federal", urgencia: "alta" },
    { data: "2024-01-25", titulo: "EFD-Contribuições", tipo: "Federal", urgencia: "media" },
    { data: "2024-01-31", titulo: "SPED Fiscal", tipo: "Estadual", urgencia: "alta" },
    { data: "2024-02-07", titulo: "eSocial - Eventos", tipo: "Federal", urgencia: "baixa" },
    { data: "2024-02-15", titulo: "DIRF 2024", tipo: "Federal", urgencia: "alta" }
  ];

  const topicos = [
    { titulo: "Reforma Tributária 2024", visualizacoes: 1250, novo: true },
    { titulo: "eSocial - Novidades", visualizacoes: 980, novo: false },
    { titulo: "ICMS-ST Combustíveis", visualizacoes: 850, novo: true },
    { titulo: "PIX e Tributação", visualizacoes: 720, novo: false }
  ];

  const linksRapidos = [
    "Calculadora de Impostos",
    "Tabela de Alíquotas",
    "Códigos de Receita",
    "Simulador Simples Nacional",
    "Calendário Completo"
  ];

  return (
    <div className="space-y-6">
      {/* Calendário de Obrigações */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Calendar className="w-5 h-5" />
            <span>Próximas Obrigações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {obrigacoes.slice(0, 4).map((obrigacao, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-600">
                  {new Date(obrigacao.data).toLocaleDateString('pt-BR')}
                </span>
                <Badge 
                  variant={obrigacao.urgencia === 'alta' ? 'destructive' : 
                           obrigacao.urgencia === 'media' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {obrigacao.urgencia === 'alta' ? 'Urgente' : 
                   obrigacao.urgencia === 'media' ? 'Médio' : 'Baixo'}
                </Badge>
              </div>
              <h4 className="font-medium text-sm text-slate-800">{obrigacao.titulo}</h4>
              <span className="text-xs text-slate-600">{obrigacao.tipo}</span>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-3">
            Ver Calendário Completo
          </Button>
        </CardContent>
      </Card>

      {/* Links Rápidos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Link className="w-5 h-5" />
            <span>Links Rápidos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {linksRapidos.map((link, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-700"
            >
              {link}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Tópicos em Destaque */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Tópicos em Destaque</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topicos.map((topico, index) => (
            <div key={index} className="hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm text-slate-800">{topico.titulo}</h4>
                {topico.novo && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Novo
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-slate-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                {topico.visualizacoes} visualizações
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSidebar;
