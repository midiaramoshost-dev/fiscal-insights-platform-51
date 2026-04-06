import { Clock, TrendingUp, FileText, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFiscalNews, useLegislacao } from "@/hooks/useLiveData";

const ContentFeeds = () => {
  const { news: liveNews, loading: newsLoading, refresh: refreshNews } = useFiscalNews();
  const { legislacoes: liveLegislacoes, loading: legLoading, refresh: refreshLeg } = useLegislacao();

  const fallbackLegislacoes = [
    { id: 1, title: "Carregando legislações...", date: new Date().toISOString().split('T')[0], type: "Federal", orgao: "...", resumo: "Buscando dados atualizados...", categoria: "Legislação", link: "#" },
  ];

  const fallbackNoticias = [
    { id: 1, title: "Carregando notícias...", date: new Date().toISOString().split('T')[0], tipo: "Federal", resumo: "Buscando dados atualizados...", destaque: false, link: "#" },
  ];

  const legislacoes = liveLegislacoes.length > 0 ? liveLegislacoes : fallbackLegislacoes;
  const noticias = liveNews.length > 0 ? liveNews : fallbackNoticias;

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
              <CardTitle className="text-lg">
                Legislações Recentes
                <Button variant="ghost" size="sm" className="ml-4" onClick={() => refreshLeg()} disabled={legLoading}>
                  {legLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {legLoading && liveLegislacoes.length === 0 && (
                <div className="text-center py-4 text-slate-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Buscando legislações atualizadas...
                </div>
              )}
              {legislacoes.map((item) => (
                <div key={item.id} className="border-b border-slate-200 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer">{item.title}</h3>
                    <Badge variant={item.type === "Federal" ? "default" : "secondary"} className="ml-2">{item.type}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                    {'orgao' in item && <span>{item.orgao}</span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{item.resumo}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if ('link' in item && item.link && item.link !== '#') {
                        window.open(item.link, '_blank');
                      }
                    }}
                  >
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
              <CardTitle className="text-lg">
                Notícias em Destaque
                <Button variant="ghost" size="sm" className="ml-4" onClick={() => refreshNews()} disabled={newsLoading}>
                  {newsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {newsLoading && liveNews.length === 0 && (
                <div className="text-center py-4 text-slate-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Buscando notícias atualizadas...
                </div>
              )}
              {noticias.map((item) => (
                <div key={item.id} className="border-b border-slate-200 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold hover:text-blue-600 cursor-pointer ${item.destaque ? 'text-blue-700' : 'text-slate-800'}`}>
                      {item.destaque && <span className="text-red-500 mr-2">🔥</span>}
                      {item.title}
                    </h3>
                    <Badge variant={item.tipo === "Federal" ? "default" : "secondary"} className="ml-2">{item.tipo}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{item.resumo}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if ('link' in item && item.link && item.link !== '#') {
                        window.open(item.link, '_blank');
                      }
                    }}
                  >
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
