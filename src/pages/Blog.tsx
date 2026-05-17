import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogSidebar from "@/components/BlogSidebar";
import AdSlot from "@/components/AdSlot";
import { categorias } from "@/data/artigos";
import { useAllArtigos } from "@/hooks/useAllArtigos";

const Blog = () => {
  const [params, setParams] = useSearchParams();
  const { artigos } = useAllArtigos();
  const cat = params.get("cat") || "";
  const q = params.get("q") || "";

  const filtrados = useMemo(() => {
    const termo = q.toLowerCase();
    return artigos.filter((a) => {
      if (cat && a.categoria !== cat) return false;
      if (!termo) return true;
      return (
        a.titulo.toLowerCase().includes(termo) ||
        a.resumo.toLowerCase().includes(termo) ||
        a.tags.some((t) => t.toLowerCase().includes(termo))
      );
    });
  }, [cat, q, artigos]);

  const PAGE_SIZE = 9;
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));
  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const startIdx = (pageSafe - 1) * PAGE_SIZE;
  const pageItems = filtrados.slice(startIdx, startIdx + PAGE_SIZE);
  const destaque = pageSafe === 1 ? pageItems[0] : undefined;
  const resto = pageSafe === 1 ? pageItems.slice(1) : pageItems;

  const goToPage = (p: number) => {
    const np = new URLSearchParams(params);
    if (p <= 1) np.delete("page");
    else np.set("page", String(p));
    setParams(np);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{cat ? `${cat} | Blog Conecta Fisco` : "Blog Fiscal — Notícias, Guias e Análises | Conecta Fisco"}</title>
        <meta
          name="description"
          content="Portal de conteúdo fiscal: guias de MEI, Imposto de Renda, Receita Federal, Simples Nacional, parcelamentos, regularização de CPF e legislação atualizada."
        />
        <link rel="canonical" href={`https://fiscal-insights-platform-51.lovable.app/blog${cat ? `?cat=${encodeURIComponent(cat)}` : ""}`} />
      </Helmet>

      <Header />
      <SubHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumbs items={cat ? [{ label: "Blog", href: "/blog" }, { label: cat }] : [{ label: "Blog" }]} />

        {/* Hero */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {cat ? `Categoria: ${cat}` : "Portal Conecta Fisco"}
          </h1>
          <p className="text-slate-600 max-w-3xl">
            {cat
              ? `Guias, notícias e análises da categoria ${cat}.`
              : "Conteúdo editorial sobre MEI, Imposto de Renda, Receita Federal, regularização de CPF, Simples Nacional e parcelamentos."}
          </p>
        </div>

        {/* Search + cats */}
        <div className="bg-white border rounded-lg p-4 mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar em artigos, guias e tags..."
              value={q}
              onChange={(e) => {
                const np = new URLSearchParams(params);
                if (e.target.value) np.set("q", e.target.value);
                else np.delete("q");
                setParams(np, { replace: true });
              }}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={!cat ? "default" : "outline"}
              onClick={() => {
                const np = new URLSearchParams(params);
                np.delete("cat");
                setParams(np);
              }}
            >
              Todas
            </Button>
            {categorias.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={cat === c ? "default" : "outline"}
                onClick={() => {
                  const np = new URLSearchParams(params);
                  np.set("cat", c);
                  setParams(np);
                }}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-6">
            {filtrados.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-slate-500">
                  Nenhum artigo encontrado. Tente outra categoria ou termo.
                </CardContent>
              </Card>
            )}

            {/* Destaque */}
            {destaque && (
              <Link to={`/artigo/${destaque.slug}`} className="block group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <CardContent className="p-6 space-y-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Destaque · {destaque.categoria}</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-700">
                      {destaque.titulo}
                    </h2>
                    <p className="text-slate-600">{destaque.resumo}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(destaque.dataPublicacao).toLocaleDateString("pt-BR")}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {destaque.tempoLeituraMin} min</span>
                      <span>por {destaque.autor.nome}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            <AdSlot slot="2233445566" format="horizontal" />

            {/* Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {resto.map((a) => (
                <Link key={a.slug} to={`/artigo/${a.slug}`} className="block group">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-5 space-y-2">
                      <Badge variant="outline" className="text-[10px]">{a.categoria}</Badge>
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2">
                        {a.titulo}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{a.resumo}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.tempoLeituraMin} min</span>
                        <span className="text-blue-600 flex items-center gap-1">Ler <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <nav aria-label="Paginação" className="flex items-center justify-center gap-2 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pageSafe === 1}
                  onClick={() => goToPage(pageSafe - 1)}
                >
                  ← Anterior
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === pageSafe ? "default" : "outline"}
                    onClick={() => goToPage(p)}
                    aria-current={p === pageSafe ? "page" : undefined}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pageSafe === totalPages}
                  onClick={() => goToPage(pageSafe + 1)}
                >
                  Próxima →
                </Button>
              </nav>
            )}
          </div>

          <div className="hidden lg:block">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
