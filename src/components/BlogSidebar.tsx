import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, TrendingUp, Folder, Clock, ExternalLink } from "lucide-react";
import { artigos, categorias } from "@/data/artigos";
import AdSlot from "./AdSlot";

const BlogSidebar = ({ excludeSlug }: { excludeSlug?: string }) => {
  const populares = artigos
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, 4);

  const recentes = [...artigos]
    .sort((a, b) => +new Date(b.dataPublicacao) - +new Date(a.dataPublicacao))
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, 4);

  return (
    <aside className="space-y-6">
      {/* Newsletter */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-emerald-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-blue-800">
            <Mail className="w-4 h-4" /> Newsletter Fiscal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs text-slate-600">
            Receba toda semana as novidades de Receita Federal, MEI e IR.
          </p>
          <Input type="email" placeholder="seu@email.com" className="h-8 text-sm" />
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Assinar grátis</Button>
        </CardContent>
      </Card>

      {/* Ad sidebar */}
      <AdSlot slot="3344556677" format="rectangle" responsive={false} />

      {/* Populares */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-slate-800">
            <TrendingUp className="w-4 h-4 text-orange-500" /> Mais lidos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {populares.map((a, i) => (
            <Link
              key={a.slug}
              to={`/artigo/${a.slug}`}
              className="flex gap-2 group items-start"
            >
              <span className="text-xl font-bold text-slate-300 group-hover:text-blue-600 leading-none w-6">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700 line-clamp-2">
                  {a.titulo}
                </p>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {a.tempoLeituraMin} min
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Categorias */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-slate-800">
            <Folder className="w-4 h-4 text-blue-500" /> Categorias
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <Link key={c} to={`/blog?cat=${encodeURIComponent(c)}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-300">
                {c}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Recentes */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-slate-800">Posts recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentes.map((a) => (
            <Link
              key={a.slug}
              to={`/artigo/${a.slug}`}
              className="block text-sm text-slate-600 hover:text-blue-700 line-clamp-2 border-b border-slate-100 pb-2 last:border-0"
            >
              {a.titulo}
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* CTA discreto */}
      <Card className="border-slate-200">
        <CardContent className="p-4 text-center space-y-2">
          <p className="text-sm font-medium text-slate-700">Precisa de ajuda fiscal?</p>
          <p className="text-xs text-slate-500">Tire dúvidas com nossa equipe.</p>
          <Button asChild size="sm" variant="outline" className="w-full">
            <Link to="/contato">
              Fale conosco <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};

export default BlogSidebar;
