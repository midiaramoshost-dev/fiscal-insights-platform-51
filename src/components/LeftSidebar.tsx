
import { Calendar, ExternalLink, TrendingUp, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import AssinaturaPremiumForm from "./forms/AssinaturaPremiumForm";

const LeftSidebar = () => {
  const [premiumFormOpen, setPremiumFormOpen] = useState(false);

  const handleProtectedClick = () => {
    setPremiumFormOpen(true);
  };

  const calendarioFiscal = [
    { data: "15/01", evento: "DARF - Pessoa Jurídica", tipo: "Federal" },
    { data: "20/01", evento: "FGTS", tipo: "Trabalhista" },
    { data: "25/01", evento: "Simples Nacional", tipo: "Federal" },
    { data: "31/01", evento: "DEFIS", tipo: "Federal" }
  ];

  const linksRapidos = [
    { nome: "Receita Federal", url: "https://www.gov.br/receitafederal", categoria: "Governo" },
    { nome: "Banco Central", url: "https://www.bcb.gov.br", categoria: "Governo" },
    { nome: "Portal eSocial", url: "https://www.gov.br/esocial", categoria: "Governo" },
    { nome: "SPED", url: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/sped", categoria: "SPED" },
    { nome: "Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional", categoria: "Governo" },
    { nome: "CFC - Conselho Federal", url: "https://cfc.org.br", categoria: "Conselho" }
  ];

  const legislacoesRecentes = [
    {
      titulo: "Lei nº 14.020/2024",
      descricao: "Nova regulamentação do eSocial",
      data: "10/01/2024",
      tipo: "Lei",
      premium: true
    },
    {
      titulo: "IN RFB nº 2.201/2024",
      descricao: "Alterações no SPED Fiscal",
      data: "08/01/2024",
      tipo: "IN",
      premium: false
    },
    {
      titulo: "Portaria ME nº 15/2024",
      descricao: "Novos códigos de receita",
      data: "05/01/2024",
      tipo: "Portaria",
      premium: true
    }
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
          </CardHeader>
          <CardContent className="space-y-3">
            {calendarioFiscal.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-l-4 border-blue-400 pl-3 py-2">
                <div>
                  <span className="font-medium text-slate-800">{item.data}</span>
                  <p className="text-sm text-slate-600">{item.evento}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {item.tipo}
                  </Badge>
                </div>
              </div>
            ))}
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

        {/* Legislações Recentes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <FileText className="w-5 h-5" />
              <span>Legislações Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {legislacoesRecentes.map((leg, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer"
                   onClick={() => leg.premium && handleProtectedClick()}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-slate-800">{leg.titulo}</h4>
                  {leg.premium && (
                    <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600 mb-2">{leg.descricao}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {leg.data}
                  </div>
                  <Badge variant="outline" className="text-xs">{leg.tipo}</Badge>
                </div>
                {leg.premium && (
                  <Button size="sm" className="w-full mt-2 h-6 text-xs" onClick={handleProtectedClick}>
                    Ler Completo 👑
                  </Button>
                )}
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleProtectedClick}
            >
              Legislações Recentes 👑
            </Button>
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
