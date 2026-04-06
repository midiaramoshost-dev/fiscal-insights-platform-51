import { Calculator, Download, BookOpen, TrendingUp, DollarSign, Percent, RefreshCw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEconomicIndices } from "@/hooks/useLiveData";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { indices, loading: indicesLoading, refresh: refreshIndices } = useEconomicIndices();

  const ferramentas = [
    { nome: "Calculadora de INSS", icone: Calculator, popular: true, link: "/ferramentas" },
    { nome: "Simulador Simples Nacional", icone: Percent, popular: true, link: "/ferramentas" },
    { nome: "Custo de Funcionário", icone: DollarSign, popular: false, link: "/ferramentas" },
    { nome: "Alíquotas por Estado", icone: TrendingUp, popular: false, link: "/icms" },
    { nome: "Códigos de Receita", icone: BookOpen, popular: false, link: "/ferramentas" }
  ];

  const publicacoes = [
    { titulo: "Manual do eSocial 2024", tipo: "PDF", tamanho: "2.5MB" },
    { titulo: "Guia SPED Fiscal", tipo: "PDF", tamanho: "1.8MB" },
    { titulo: "Tabela de Códigos NCM", tipo: "Excel", tamanho: "3.2MB" },
    { titulo: "Modelos de DARF", tipo: "Word", tamanho: "0.5MB" }
  ];

  return (
    <div className="space-y-6">
      {/* Ferramentas Úteis */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-emerald-800">
            <Calculator className="w-5 h-5" />
            <span>Ferramentas Úteis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ferramentas.map((ferramenta, index) => {
            const IconComponent = ferramenta.icone;
            return (
              <Button key={index} variant="ghost" className="w-full justify-start bg-white/80 hover:bg-white hover:text-emerald-700 border border-emerald-200" asChild>
                <Link to={ferramenta.link}>
                  <IconComponent className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{ferramenta.nome}</span>
                  {ferramenta.popular && (
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">Popular</Badge>
                  )}
                </Link>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Publicações - acesso livre */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <BookOpen className="w-5 h-5" />
            <span>Publicações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {publicacoes.map((pub, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-slate-800">{pub.titulo}</h4>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{pub.tipo} • {pub.tamanho}</span>
                <Button size="sm" variant="outline" className="h-6 px-2">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Índices Econômicos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5" />
            <span>Índices Econômicos</span>
            <Button variant="ghost" size="sm" className="ml-auto p-1 h-6 w-6"
              onClick={() => { localStorage.removeItem('live-data-indices'); refreshIndices(); }}
              disabled={indicesLoading}
            >
              {indicesLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {indicesLoading && indices.length === 0 && (
            <div className="text-center py-4 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1" />
              <span className="text-xs">Buscando dados do BCB...</span>
            </div>
          )}
          {indices.map((indice, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm text-slate-800">{indice.nome}</h4>
                <span className="text-lg font-bold text-slate-900">{indice.valor}</span>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  indice.tipo === 'alta' ? 'text-red-600' :
                  indice.tipo === 'baixa' ? 'text-green-600' : 'text-slate-600'
                }`}>
                  {indice.tipo === 'alta' ? '↗' : indice.tipo === 'baixa' ? '↘' : '→'} {indice.variacao}
                </span>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-600">
              Fonte: Banco Central do Brasil
              {indices.length > 0 && ` • ${indices[0].ultimaAtualizacao}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
