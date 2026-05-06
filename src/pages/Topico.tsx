import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Percent, Info, Calendar, Scale, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import { topicoBySlug, topicos } from "@/data/topicos";
import NotFound from "./NotFound";

const Topico = () => {
  const { slug } = useParams<{ slug: string }>();
  const topico = slug ? topicoBySlug(slug) : undefined;

  if (!topico) return <NotFound />;

  const relacionados = topicos.filter(t => t.categoria === topico.categoria && t.slug !== topico.slug).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{topico.titulo} | Conecta Fisco</title>
        <meta name="description" content={topico.resumo} />
      </Helmet>
      <Header />
      <SubHeader />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" />Voltar</Link>
        </Button>

        <div className="mb-6">
          <Badge variant="outline" className="mb-2">{topico.categoria}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{topico.titulo}</h1>
          <p className="text-slate-600 mt-2 text-lg">{topico.resumo}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
                  <FileText className="w-5 h-5 text-blue-600" /> Obrigação
                </CardTitle>
              </CardHeader>
              <CardContent><p className="text-slate-700 leading-relaxed">{topico.obrigacao}</p></CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
                  <Percent className="w-5 h-5 text-emerald-600" /> Alíquota / Percentual
                </CardTitle>
              </CardHeader>
              <CardContent><p className="text-slate-700 leading-relaxed">{topico.aliquota}</p></CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
                  <Info className="w-5 h-5 text-purple-600" /> Forma de Aplicação
                </CardTitle>
              </CardHeader>
              <CardContent><p className="text-slate-700 leading-relaxed">{topico.formaAplicacao}</p></CardContent>
            </Card>

            {topico.observacoes && topico.observacoes.length > 0 && (
              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg">Observações</CardTitle></CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {topico.observacoes.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="space-y-4">
            {topico.prazo && (
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-amber-800 text-base">
                    <Calendar className="w-4 h-4" /> Prazo
                  </CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-amber-900">{topico.prazo}</p></CardContent>
              </Card>
            )}
            {topico.baseLegal && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-800 text-base">
                    <Scale className="w-4 h-4" /> Base Legal
                  </CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-blue-900">{topico.baseLegal}</p></CardContent>
              </Card>
            )}
            {relacionados.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BookOpen className="w-4 h-4" /> Tópicos relacionados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {relacionados.map(r => (
                    <Link key={r.slug} to={`/topico/${r.slug}`} className="block text-sm text-blue-700 hover:underline">
                      {r.titulo}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Topico;
