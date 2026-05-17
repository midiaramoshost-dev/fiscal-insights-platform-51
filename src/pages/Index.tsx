import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, TrendingUp, ChevronRight, Newspaper, Flame, BookOpen, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import BlogSidebar from "@/components/BlogSidebar";
import AdSlot from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { categorias } from "@/data/artigos";
import { useAllArtigos } from "@/hooks/useAllArtigos";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

const Index = () => {
  const { artigos } = useAllArtigos();
  // Ordena por data desc
  const ordenados = [...artigos].sort(
    (a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
  );

  const principal = ordenados[0];
  const secundarios = ordenados.slice(1, 3);
  const maisLidos = ordenados.slice(0, 5);
  const recentes = ordenados.slice(3, 9);
  const atualizados = [...artigos]
    .sort((a, b) => +new Date(b.dataAtualizacao) - +new Date(a.dataAtualizacao))
    .slice(0, 4);

  // Agrupa por categoria para faixas editoriais
  const porCategoria = categorias
    .map((c) => ({ cat: c, lista: ordenados.filter((a) => a.categoria === c).slice(0, 3) }))
    .filter((g) => g.lista.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Conecta Fisco — Portal de Notícias Fiscais, MEI, IRPF e Receita Federal</title>
        <meta
          name="description"
          content="Portal editorial de conteúdo tributário: guias atualizados sobre MEI, Imposto de Renda, Receita Federal, Simples Nacional, parcelamentos e regularização de CPF."
        />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/" />
      </Helmet>

      <Header />
      <SubHeader />

      {/* Faixa "Manchetes do dia" */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 py-2 flex items-center gap-3 overflow-x-auto text-xs">
          <span className="flex items-center gap-1 font-semibold text-amber-400 shrink-0">
            <Flame className="w-3.5 h-3.5" /> EM ALTA
          </span>
          {ordenados.slice(0, 4).map((a) => (
            <Link
              key={a.slug}
              to={`/artigo/${a.slug}`}
              className="shrink-0 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              • {a.titulo.length > 70 ? a.titulo.slice(0, 70) + "…" : a.titulo}
            </Link>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* HERO EDITORIAL */}
        <section className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Manchete principal */}
          {principal && (
            <Link to={`/artigo/${principal.slug}`} className="lg:col-span-2 group block">
              <article className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="h-64 md:h-80 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge className="bg-amber-500 hover:bg-amber-500 text-slate-900 font-semibold mb-3">
                      MANCHETE · {principal.categoria}
                    </Badge>
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                      {principal.titulo}
                    </h1>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-700 text-base leading-relaxed mb-3">{principal.resumo}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(principal.dataPublicacao)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {principal.tempoLeituraMin} min de leitura
                    </span>
                    <span>por {principal.autor.nome}</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Secundários */}
          <div className="space-y-4">
            {secundarios.map((a) => (
              <Link key={a.slug} to={`/artigo/${a.slug}`} className="block group">
                <article className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <Badge variant="outline" className="text-[10px] mb-2 border-blue-200 text-blue-700">
                    {a.categoria}
                  </Badge>
                  <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 mb-2">
                    {a.titulo}
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-2">{a.resumo}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" /> {a.tempoLeituraMin} min
                    <span>·</span>
                    <span>{formatDate(a.dataPublicacao)}</span>
                  </div>
                </article>
              </Link>
            ))}

            <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1 text-sm">
                  <Newspaper className="w-4 h-4" /> Newsletter Fiscal
                </div>
                <p className="text-xs text-slate-700 mb-3">
                  Receba o resumo semanal de mudanças tributárias direto no seu e-mail.
                </p>
                <Link
                  to="/newsletter"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                >
                  Assinar grátis <ChevronRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdSlot slot="1122334455" format="horizontal" />

        {/* Conteúdo + Sidebar */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-8">
          <div className="space-y-10">
            {/* Mais Recentes */}
            <section>
              <header className="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Mais Recentes
                </h2>
                <Link to="/blog" className="text-xs font-semibold text-blue-600 hover:underline">
                  Ver todos →
                </Link>
              </header>
              <div className="grid sm:grid-cols-2 gap-4">
                {recentes.map((a) => (
                  <Link key={a.slug} to={`/artigo/${a.slug}`} className="group block">
                    <article className="flex gap-3 bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow h-full">
                      <div className="shrink-0 w-20 h-20 rounded bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-xs px-2 text-center">
                        {a.categoria}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug mb-1">
                          {a.titulo}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Clock className="w-3 h-3" /> {a.tempoLeituraMin} min
                          <span>·</span>
                          <span>{formatDate(a.dataPublicacao)}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* Atualizado recentemente */}
            <section>
              <header className="flex items-center justify-between border-b-2 border-emerald-600 pb-2 mb-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-emerald-600" /> Atualizado recentemente
                </h2>
                <span className="text-xs text-slate-500">Conteúdo revisado conforme legislação vigente</span>
              </header>
              <div className="grid sm:grid-cols-2 gap-4">
                {atualizados.map((a) => (
                  <Link key={a.slug} to={`/artigo/${a.slug}`} className="group block">
                    <article className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow h-full">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px] border-emerald-200 text-emerald-700">
                          {a.categoria}
                        </Badge>
                        <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                          <RefreshCw className="w-3 h-3" /> Atualizado {formatDate(a.dataAtualizacao)}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 leading-snug mb-1 line-clamp-2">
                        {a.titulo}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{a.resumo}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            {/* Faixas por categoria */}
            {porCategoria.map((grupo, idx) => (
              <section key={grupo.cat}>
                <header className="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-5">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" /> {grupo.cat}
                  </h2>
                  <Link
                    to={`/blog?cat=${encodeURIComponent(grupo.cat)}`}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Ver categoria →
                  </Link>
                </header>
                <div className="grid md:grid-cols-3 gap-4">
                  {grupo.lista.map((a) => (
                    <Link key={a.slug} to={`/artigo/${a.slug}`} className="group block">
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <Badge variant="outline" className="text-[10px] mb-2">
                            {a.categoria}
                          </Badge>
                          <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 line-clamp-3 leading-snug mb-2">
                            {a.titulo}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2 mb-3">{a.resumo}</p>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {a.tempoLeituraMin} min
                            </span>
                            <span className="text-blue-600 flex items-center gap-1 font-semibold">
                              Ler <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                {idx === 1 && <div className="mt-6"><AdSlot slot="9988776655" format="horizontal" /></div>}
              </section>
            ))}

            {/* Mais lidos em lista numerada */}
            <section>
              <header className="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" /> Mais Lidos da Semana
                </h2>
              </header>
              <ol className="space-y-3">
                {maisLidos.map((a, i) => (
                  <li key={a.slug}>
                    <Link
                      to={`/artigo/${a.slug}`}
                      className="flex items-start gap-4 bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow group"
                    >
                      <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 leading-none w-10 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="text-[10px] mb-1">
                          {a.categoria}
                        </Badge>
                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 leading-snug">
                          {a.titulo}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="hidden lg:block">
            <BlogSidebar />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
