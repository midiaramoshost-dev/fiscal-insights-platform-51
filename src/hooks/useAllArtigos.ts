import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { artigos as artigosEstaticos, getArtigoBySlug as getEstatico } from "@/data/artigos";
import type { Artigo } from "@/data/artigos";
import { rowToArtigo, type CmsArtigoRow } from "./useCmsArtigos";

// Une artigos estáticos do código + artigos publicados no CMS.
// Em caso de slug duplicado, o do CMS prevalece (permite editar via admin).
export const useAllArtigos = () => {
  const [todos, setTodos] = useState<Artigo[]>(artigosEstaticos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("cms_artigos")
        .select("*")
        .eq("publicado", true)
        .order("data_publicacao", { ascending: false });
      if (!alive) return;
      if (error) {
        console.error("useAllArtigos", error);
        setLoading(false);
        return;
      }
      const cms = (data as CmsArtigoRow[]).map(rowToArtigo);
      const slugsCms = new Set(cms.map((a) => a.slug));
      const merged = [...cms, ...artigosEstaticos.filter((a) => !slugsCms.has(a.slug))].sort(
        (a, b) => +new Date(b.dataPublicacao) - +new Date(a.dataPublicacao)
      );
      setTodos(merged);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  return { artigos: todos, loading };
};

export const useArtigoBySlug = (slug: string) => {
  const [artigo, setArtigo] = useState<Artigo | null | undefined>(() => getEstatico(slug) ?? undefined);
  const [loading, setLoading] = useState(!getEstatico(slug));

  useEffect(() => {
    let alive = true;
    const estatico = getEstatico(slug);
    if (estatico) {
      // Mesmo se existir estático, tenta versão do CMS para permitir override
      (async () => {
        const { data } = await supabase
          .from("cms_artigos")
          .select("*")
          .eq("slug", slug)
          .eq("publicado", true)
          .maybeSingle();
        if (!alive) return;
        if (data) setArtigo(rowToArtigo(data as CmsArtigoRow));
        else setArtigo(estatico);
        setLoading(false);
      })();
      return () => { alive = false; };
    }
    (async () => {
      const { data, error } = await supabase
        .from("cms_artigos")
        .select("*")
        .eq("slug", slug)
        .eq("publicado", true)
        .maybeSingle();
      if (!alive) return;
      if (error || !data) {
        setArtigo(null);
      } else {
        setArtigo(rowToArtigo(data as CmsArtigoRow));
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [slug]);

  return { artigo, loading };
};
