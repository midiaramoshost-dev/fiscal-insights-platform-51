import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Calendar, RefreshCw, Share2, ChevronRight, Tag } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import BlogSidebar from "@/components/BlogSidebar";
import { getArtigoBySlug, getArtigosRelacionados, autoLinkParagrafo, type Bloco } from "@/data/artigos";


const BASE = "https://fiscal-insights-platform-51.lovable.app";

const RenderBloco = ({ b, excludeSlug }: { b: Bloco; excludeSlug?: string }) => {
  switch (b.tipo) {
    case "p": {
      const frags = autoLinkParagrafo(b.texto, excludeSlug);
      return (
        <p className="text-slate-700 leading-relaxed mb-4">
          {frags.map((f, i) =>
            f.href ? (
              <Link
                key={i}
                to={f.href}
                title={f.titulo}
                className="text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
              >
                {f.texto}
              </Link>
            ) : (
              <span key={i}>{f.texto}</span>
            )
          )}
        </p>
      );
    }
    case "h2":
      return <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3 scroll-mt-20">{b.texto}</h2>;
    case "h3":
      return <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">{b.texto}</h3>;
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-1 text-slate-700 mb-4">
          {b.itens.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 space-y-1 text-slate-700 mb-4">
          {b.itens.map((i, idx) => <li key={idx}>{i}</li>)}
        </ol>
      );
    case "callout": {
      const styles = {
        info: "bg-blue-50 border-blue-200 text-blue-900",
        warning: "bg-amber-50 border-amber-200 text-amber-900",
        success: "bg-emerald-50 border-emerald-200 text-emerald-900",
      };
      const v = b.variant || "info";
      return (
        <div className={`my-5 border-l-4 p-4 rounded-r ${styles[v]}`}>
          {b.titulo && <p className="font-semibold mb-1">{b.titulo}</p>}
          <p className="text-sm leading-relaxed">{b.texto}</p>
        </div>
      );
    }
    case "tabela":
      return (
        <div className="my-5 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                {b.cabecalho.map((c, i) => (
                  <th key={i} className="text-left p-2 border border-slate-200 font-semibold text-slate-700">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.linhas.map((row, i) => (
                <tr key={i} className="even:bg-slate-50">
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border border-slate-200 text-slate-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

const Artigo = () => {
  const { slug = "" } = useParams();
  const artigo = getArtigoBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!artigo) return <Navigate to="/blog" replace />;

  const relacionados = getArtigosRelacionados(slug);
  const url = `${BASE}/artigo/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.resumo,
    datePublished: artigo.dataPublicacao,
    dateModified: artigo.dataAtualizacao,
    author: {
      "@type": "Person",
      name: artigo.autor.nome,
      jobTitle: artigo.autor.cargo,
      description: artigo.autor.bio,
    },
    publisher: {
      "@type": "Organization",
      name: "Conecta Fisco",
      url: BASE,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: artigo.categoria,
    keywords: artigo.tags.join(", "),
    inLanguage: "pt-BR",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: artigo.faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({ title: artigo.titulo, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{artigo.titulo} | Conecta Fisco</title>
        <meta name="description" content={artigo.resumo} />
        <meta name="author" content={artigo.autor.nome} />
        <meta name="keywords" content={artigo.tags.join(", ")} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={artigo.titulo} />
        <meta property="og:description" content={artigo.resumo} />
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={artigo.dataPublicacao} />
        <meta property="article:modified_time" content={artigo.dataAtualizacao} />
        <meta property="article:author" content={artigo.autor.nome} />
        <meta property="article:section" content={artigo.categoria} />
        {artigo.tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />
      <SubHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: artigo.categoria, href: `/blog?cat=${encodeURIComponent(artigo.categoria)}` },
            { label: artigo.titulo },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Article */}
          <article className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-10">
            <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">{artigo.categoria}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
              {artigo.titulo}
            </h1>
            <p className="text-lg text-slate-600 mb-6">{artigo.subtitulo}</p>

            {/* Author + meta */}
            <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={artigo.autor.avatar} alt={`Foto de ${artigo.autor.nome}`} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-semibold">
                    {artigo.autor.iniciais}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{artigo.autor.nome}</p>
                  <p className="text-xs text-slate-500">{artigo.autor.cargo}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Publicado em {new Date(artigo.dataPublicacao).toLocaleDateString("pt-BR")}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Atualizado em {new Date(artigo.dataAtualizacao).toLocaleDateString("pt-BR")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {artigo.tempoLeituraMin} min de leitura
                </span>
              </div>
              <Button size="sm" variant="outline" onClick={compartilhar} className="ml-auto">
                <Share2 className="w-3 h-3 mr-1" /> Compartilhar
              </Button>
            </div>

            {/* Update notice */}
            <div className="mb-6 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-3 py-2 flex items-center gap-2">
              <RefreshCw className="w-3 h-3" />
              Conteúdo revisado pela equipe editorial conforme legislação vigente.
            </div>

            {/* AD top */}
            <AdSlot slot="1122334455" format="horizontal" />

            {/* Body — split em duas metades para inserir ad no meio */}
            <div className="prose-content">
              {artigo.blocos.slice(0, Math.ceil(artigo.blocos.length / 2)).map((b, i) => (
                <RenderBloco key={i} b={b} excludeSlug={slug} />
              ))}
            </div>

            <AdSlot slot="5566778899" format="auto" label="Publicidade" />

            <div className="prose-content">
              {artigo.blocos.slice(Math.ceil(artigo.blocos.length / 2)).map((b, i) => (
                <RenderBloco key={i} b={b} excludeSlug={slug} />
              ))}
            </div>

            {/* FAQ */}
            {artigo.faq.length > 0 && (
              <section className="mt-10 border-t pt-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Perguntas frequentes</h2>
                <Accordion type="single" collapsible className="w-full">
                  {artigo.faq.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left font-semibold text-slate-800">
                        {f.pergunta}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed">
                        {f.resposta}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* Sobre o autor (E-E-A-T) */}
            <section className="mt-10 border-t pt-6">
              <h2 className="text-base font-semibold text-slate-700 mb-3 uppercase tracking-wide">Sobre o autor</h2>
              <div className="flex gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <Avatar className="w-16 h-16 shrink-0">
                  <AvatarImage src={artigo.autor.avatar} alt={`Foto de ${artigo.autor.nome}`} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-semibold">
                    {artigo.autor.iniciais}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{artigo.autor.nome}</p>
                  <p className="text-xs text-slate-500 mb-1">{artigo.autor.cargo}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{artigo.autor.bio}</p>
                  {artigo.autor.credenciais && (
                    <p className="text-xs text-emerald-700 mt-2 font-medium">✓ {artigo.autor.credenciais}</p>
                  )}
                </div>
              </div>
            </section>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {artigo.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-slate-500 mt-6 border-t pt-4">
              Aviso: este conteúdo tem caráter informativo e educacional, baseado na legislação
              vigente na data da publicação. Não substitui consultoria contábil ou jurídica
              personalizada. Consulte sempre um profissional habilitado para o seu caso concreto.
            </p>

            {/* AD footer */}
            <AdSlot slot="6677889900" format="horizontal" />

            {/* Related */}
            {relacionados.length > 0 && (
              <section className="mt-10 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Artigos relacionados</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relacionados.map((r) => (
                    <Link key={r.slug} to={`/artigo/${r.slug}`}>
                      <Card className="hover:shadow-md transition-shadow h-full">
                        <CardContent className="p-4 space-y-2">
                          <Badge variant="outline" className="text-[10px]">{r.categoria}</Badge>
                          <h3 className="text-sm font-semibold text-slate-800 line-clamp-3">
                            {r.titulo}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2">{r.resumo}</p>
                          <span className="text-xs text-blue-600 flex items-center gap-1">
                            Ler artigo <ChevronRight className="w-3 h-3" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <BlogSidebar excludeSlug={slug} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Artigo;
