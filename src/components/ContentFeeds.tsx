
import { Clock, MapPin, TrendingUp, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentFeeds = () => {
  const legislacoes = [
    {
      id: 1,
      title: "IN RFB nº 2.201/2024 - Alterações no eSocial",
      date: "2024-01-15",
      type: "Federal",
      orgao: "Receita Federal",
      resumo: "Nova instrução normativa altera procedimentos do eSocial para eventos trabalhistas...",
      categoria: "Trabalho"
    },
    {
      id: 2,
      title: "Decreto SP nº 68.456/2024 - ICMS Combustíveis",
      date: "2024-01-14",
      type: "São Paulo",
      orgao: "Fazenda SP",
      resumo: "Regulamentação das alíquotas de ICMS sobre combustíveis líquidos...",
      categoria: "ICMS"
    },
    {
      id: 3,
      title: "Lei nº 14.789/2024 - Marco do PIX",
      date: "2024-01-12",
      type: "Federal",
      orgao: "Congresso Nacional",
      resumo: "Estabelece marco regulatório para o sistema de pagamentos instantâneos...",
      categoria: "Financeiro"
    }
  ];

  const noticias = [
    {
      id: 1,
      title: "Receita Federal prorroga prazo para entrega do ECD 2023",
      date: "2024-01-16",
      tipo: "Federal",
      resumo: "Empresas têm até 31 de março para entregar a Escrituração Contábil Digital...",
      destaque: true
    },
    {
      id: 2,
      title: "São Paulo lança novo sistema de consulta de débitos de ICMS",
      date: "2024-01-15",
      tipo: "São Paulo",
      resumo: "Portal permite consulta online de débitos tributários de forma simplificada...",
      destaque: false
    },
    {
      id: 3,
      title: "Novo calendário de obrigações acessórias para 2024",
      date: "2024-01-14",
      tipo: "Federal",
      resumo: "Confira os principais prazos e datas importantes para este ano...",
      destaque: true
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="legislacao" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="legislacao" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Últimas Legislações</span>
          </TabsTrigger>
          <TabsTrigger value="noticias" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Notícias Recentes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="legislacao" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Legislações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {legislacoes.map((item) => (
                <div key={item.id} className="border-b border-slate-200 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer">
                      {item.title}
                    </h3>
                    <Badge variant={item.type === "Federal" ? "default" : "secondary"} className="ml-2">
                      {item.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.orgao}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.categoria}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">
                    {item.resumo}
                  </p>
                  
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Ler Completo
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="noticias" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Notícias em Destaque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {noticias.map((item) => (
                <div key={item.id} className="border-b border-slate-200 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold hover:text-blue-600 cursor-pointer ${
                      item.destaque ? 'text-blue-700' : 'text-slate-800'
                    }`}>
                      {item.destaque && <span className="text-red-500 mr-2">🔥</span>}
                      {item.title}
                    </h3>
                    <Badge variant={item.tipo === "Federal" ? "default" : "secondary"} className="ml-2">
                      {item.tipo}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">
                    {item.resumo}
                  </p>
                  
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Ler Matéria
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentFeeds;
