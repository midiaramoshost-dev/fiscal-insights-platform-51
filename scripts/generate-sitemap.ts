// Gera public/sitemap.xml com todas as rotas estáticas + artigos do CMS (Supabase) + artigos estáticos.
// Roda automaticamente em `predev` e `prebuild` (ver package.json).

import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { artigos as artigosEstaticos } from "../src/data/artigos";

const BASE_URL = "https://fiscal-insights-platform-51.lovable.app";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://zrydlutcaovfrcnhkvza.supabase.co";
const SUPABASE_ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyeWRsdXRjYW92ZnJjbmhrdnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMjMwOTksImV4cCI6MjA5NDU5OTA5OX0.Bb4QFxbQvFi2u_B9SIuzuL9cJqOTODjyf-t3cguYZ6o";

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

const staticEntries: Entry[] = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/blog", changefreq: "daily", priority: "0.95" },
  { loc: "/icms", changefreq: "weekly", priority: "0.9" },
  { loc: "/icms-regulamentos", changefreq: "weekly", priority: "0.9" },
  { loc: "/clt-comentada", changefreq: "weekly", priority: "0.9" },
  { loc: "/ferramentas", changefreq: "monthly", priority: "0.8" },
  { loc: "/cursos", changefreq: "monthly", priority: "0.8" },
  { loc: "/cursos/ead", priority: "0.7" },
  { loc: "/cursos/presencial", priority: "0.7" },
  { loc: "/cursos/incompany", priority: "0.7" },
  { loc: "/softwares", priority: "0.7" },
  { loc: "/consultoria", priority: "0.7" },
  { loc: "/quem-somos", priority: "0.7" },
  { loc: "/contato", priority: "0.6" },
  { loc: "/newsletter", priority: "0.6" },
  { loc: "/suporte", priority: "0.6" },
  { loc: "/politica-editorial", priority: "0.6" },
  { loc: "/transparencia", priority: "0.6" },
  { loc: "/politica-privacidade", priority: "0.5" },
  { loc: "/termos-uso", priority: "0.5" },
  { loc: "/politica-cookies", priority: "0.5" },
  { loc: "/sobre-anuncios", priority: "0.5" },
];

const categorias = [
  "MEI",
  "Imposto de Renda",
  "Receita Federal",
  "CPF",
  "Simples Nacional",
  "Parcelamentos",
  "Guias Tributários",
];

async function fetchCmsArticles(): Promise<Entry[]> {
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
    const { data, error } = await sb
      .from("cms_artigos")
      .select("slug, data_atualizacao")
      .eq("publicado", true)
      .order("data_publicacao", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => ({
      loc: `/artigo/${r.slug}`,
      lastmod: new Date(r.data_atualizacao).toISOString().slice(0, 10),
      changefreq: "weekly" as const,
      priority: "0.9",
    }));
  } catch (e) {
    console.warn("[sitemap] CMS unreachable, ignoring:", (e as Error).message);
    return [];
  }
}

function xml(entries: Entry[]) {
  const urls = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.loc}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

(async () => {
  const cms = await fetchCmsArticles();
  const cmsSlugs = new Set(cms.map((c) => c.loc));
  const staticArticles: Entry[] = artigosEstaticos
    .map((a) => ({
      loc: `/artigo/${a.slug}`,
      lastmod: new Date(a.dataAtualizacao).toISOString().slice(0, 10),
      changefreq: "weekly" as const,
      priority: "0.85",
    }))
    .filter((e) => !cmsSlugs.has(e.loc));
  const categoryEntries: Entry[] = categorias.map((c) => ({
    loc: `/blog?cat=${encodeURIComponent(c)}`,
    changefreq: "weekly",
    priority: "0.75",
  }));

  const all = [...staticEntries, ...categoryEntries, ...cms, ...staticArticles];
  writeFileSync(resolve("public/sitemap.xml"), xml(all));
  console.log(`[sitemap] ${all.length} URLs (CMS: ${cms.length}, estáticos: ${staticArticles.length})`);
})();
