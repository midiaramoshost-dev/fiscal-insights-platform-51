import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Artigo, Autor, Bloco, FAQ } from "@/data/artigos";

export interface CmsArtigoRow {
  id: string;
  slug: string;
  categoria: string;
  titulo: string;
  subtitulo: string;
  resumo: string;
  conteudo: string;
  tags: string[];
  autor_nome: string;
  autor_cargo: string;
  autor_bio: string;
  autor_iniciais: string;
  autor_avatar: string;
  tempo_leitura_min: number;
  faq: FAQ[] | unknown;
  publicado: boolean;
  data_publicacao: string;
  data_atualizacao: string;
}

// Converte markdown simples (#, ##, ###, listas, parágrafos) em blocos do Artigo
export const conteudoParaBlocos = (md: string): Bloco[] => {
  const linhas = md.replace(/\r/g, "").split("\n");
  const blocos: Bloco[] = [];
  let buffer: string[] = [];
  let lista: { ord: boolean; itens: string[] } | null = null;

  const flushP = () => {
    if (buffer.length) {
      blocos.push({ tipo: "p", texto: buffer.join(" ").trim() });
      buffer = [];
    }
  };
  const flushLista = () => {
    if (lista) {
      blocos.push(lista.ord ? { tipo: "ol", itens: lista.itens } : { tipo: "ul", itens: lista.itens });
      lista = null;
    }
  };

  for (const raw of linhas) {
    const l = raw.trim();
    if (!l) { flushP(); flushLista(); continue; }
    if (l.startsWith("### ")) { flushP(); flushLista(); blocos.push({ tipo: "h3", texto: l.slice(4) }); continue; }
    if (l.startsWith("## ")) { flushP(); flushLista(); blocos.push({ tipo: "h2", texto: l.slice(3) }); continue; }
    if (l.startsWith("# ")) { flushP(); flushLista(); blocos.push({ tipo: "h2", texto: l.slice(2) }); continue; }
    const ol = l.match(/^\d+\.\s+(.*)/);
    if (ol) { flushP(); if (!lista || !lista.ord) { flushLista(); lista = { ord: true, itens: [] }; } lista.itens.push(ol[1]); continue; }
    if (l.startsWith("- ") || l.startsWith("* ")) {
      flushP();
      if (!lista || lista.ord) { flushLista(); lista = { ord: false, itens: [] }; }
      lista.itens.push(l.slice(2));
      continue;
    }
    buffer.push(l);
  }
  flushP(); flushLista();
  return blocos;
};

export const rowToArtigo = (r: CmsArtigoRow): Artigo => {
  const autor: Autor = {
    nome: r.autor_nome,
    cargo: r.autor_cargo,
    bio: r.autor_bio,
    iniciais: r.autor_iniciais || r.autor_nome.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase(),
    avatar: r.autor_avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(r.autor_nome)}&backgroundColor=1d4ed8&textColor=ffffff`,
  };
  return {
    slug: r.slug,
    categoria: r.categoria as Artigo["categoria"],
    titulo: r.titulo,
    subtitulo: r.subtitulo,
    resumo: r.resumo,
    dataPublicacao: r.data_publicacao,
    dataAtualizacao: r.data_atualizacao,
    autor,
    tags: r.tags || [],
    tempoLeituraMin: r.tempo_leitura_min,
    blocos: conteudoParaBlocos(r.conteudo),
    faq: Array.isArray(r.faq) ? (r.faq as FAQ[]) : [],
  };
};

export const useCmsArtigosPublicados = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
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
        console.error("cms_artigos fetch", error);
        setArtigos([]);
      } else {
        setArtigos((data as CmsArtigoRow[]).map(rowToArtigo));
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  return { artigos, loading };
};

export const useCmsArtigosAdmin = () => {
  const [rows, setRows] = useState<CmsArtigoRow[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cms_artigos")
      .select("*")
      .order("data_publicacao", { ascending: false });
    if (error) console.error(error);
    setRows((data as CmsArtigoRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  return { rows, loading, reload };
};
