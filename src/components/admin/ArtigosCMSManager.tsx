import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCmsArtigosAdmin, type CmsArtigoRow } from "@/hooks/useCmsArtigos";
import { categorias } from "@/data/artigos";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FormState {
  id?: string;
  slug: string;
  categoria: string;
  titulo: string;
  subtitulo: string;
  resumo: string;
  conteudo: string;
  tags: string;
  autor_nome: string;
  autor_cargo: string;
  autor_bio: string;
  autor_iniciais: string;
  tempo_leitura_min: number;
  faq: string;
  publicado: boolean;
}

const emptyForm: FormState = {
  slug: "",
  categoria: "Guias Tributários",
  titulo: "",
  subtitulo: "",
  resumo: "",
  conteudo: "",
  tags: "",
  autor_nome: "Equipe Editorial Conecta Fisco",
  autor_cargo: "Redação Tributária",
  autor_bio: "",
  autor_iniciais: "CF",
  tempo_leitura_min: 5,
  faq: "[]",
  publicado: true,
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ArtigosCMSManager = () => {
  const { rows, loading, reload } = useCmsArtigosAdmin();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const novo = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const editar = (r: CmsArtigoRow) => {
    setForm({
      id: r.id,
      slug: r.slug,
      categoria: r.categoria,
      titulo: r.titulo,
      subtitulo: r.subtitulo,
      resumo: r.resumo,
      conteudo: r.conteudo,
      tags: (r.tags || []).join(", "),
      autor_nome: r.autor_nome,
      autor_cargo: r.autor_cargo,
      autor_bio: r.autor_bio,
      autor_iniciais: r.autor_iniciais,
      tempo_leitura_min: r.tempo_leitura_min,
      faq: JSON.stringify(r.faq || [], null, 2),
      publicado: r.publicado,
    });
    setOpen(true);
  };

  const salvar = async () => {
    if (!form.titulo.trim() || !form.conteudo.trim()) {
      toast.error("Título e conteúdo são obrigatórios.");
      return;
    }
    let faqParsed: unknown = [];
    try {
      faqParsed = form.faq.trim() ? JSON.parse(form.faq) : [];
      if (!Array.isArray(faqParsed)) throw new Error();
    } catch {
      toast.error("FAQ inválido: precisa ser um JSON do tipo [{pergunta, resposta}].");
      return;
    }
    const slug = form.slug.trim() || slugify(form.titulo);
    const payload = {
      slug,
      categoria: form.categoria,
      titulo: form.titulo.trim(),
      subtitulo: form.subtitulo.trim(),
      resumo: form.resumo.trim(),
      conteudo: form.conteudo,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      autor_nome: form.autor_nome.trim(),
      autor_cargo: form.autor_cargo.trim(),
      autor_bio: form.autor_bio.trim(),
      autor_iniciais: form.autor_iniciais.trim().toUpperCase().slice(0, 4),
      autor_avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(form.autor_nome)}&backgroundColor=1d4ed8&textColor=ffffff`,
      tempo_leitura_min: Number(form.tempo_leitura_min) || 5,
      faq: faqParsed as never,
      publicado: form.publicado,
    };
    setSaving(true);
    const { error } = form.id
      ? await supabase.from("cms_artigos").update(payload).eq("id", form.id)
      : await supabase.from("cms_artigos").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(`Erro ao salvar: ${error.message}`);
      return;
    }
    toast.success(form.id ? "Artigo atualizado." : "Artigo publicado.");
    setOpen(false);
    reload();
  };

  const togglePublicado = async (r: CmsArtigoRow) => {
    const { error } = await supabase
      .from("cms_artigos")
      .update({ publicado: !r.publicado })
      .eq("id", r.id);
    if (error) toast.error(error.message);
    else { toast.success(!r.publicado ? "Publicado." : "Despublicado."); reload(); }
  };

  const excluir = async (r: CmsArtigoRow) => {
    if (!confirm(`Excluir "${r.titulo}"?`)) return;
    const { error } = await supabase.from("cms_artigos").delete().eq("id", r.id);
    if (error) toast.error(error.message);
    else { toast.success("Excluído."); reload(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">CMS de Artigos</h2>
          <p className="text-sm text-slate-500">
            Artigos publicados aqui aparecem automaticamente no Blog, na home e nas categorias.
          </p>
        </div>
        <Button onClick={novo} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-1" /> Novo artigo
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Artigos do banco</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {loading && <div className="flex items-center gap-2 text-slate-500 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Carregando…</div>}
          {!loading && rows.length === 0 && (
            <p className="text-sm text-slate-500">Nenhum artigo no banco ainda. Clique em "Novo artigo".</p>
          )}
          {rows.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-3 border border-slate-200 rounded p-3">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px]">{r.categoria}</Badge>
                  {!r.publicado && <Badge variant="secondary" className="text-[10px]">Rascunho</Badge>}
                  <span className="text-xs text-slate-400">{new Date(r.data_publicacao).toLocaleDateString("pt-BR")}</span>
                </div>
                <p className="font-medium text-slate-800 mt-1">{r.titulo}</p>
                <p className="text-xs text-slate-500">/{r.slug} · {r.autor_nome}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/artigo/${r.slug}`} target="_blank"><ExternalLink className="w-4 h-4" /></Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => togglePublicado(r)} title={r.publicado ? "Despublicar" : "Publicar"}>
                  {r.publicado ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => editar(r)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => excluir(r)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Editar artigo" : "Novo artigo"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Título *</Label>
                <Input
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value, slug: form.slug || slugify(e.target.value) })}
                  placeholder="Como emitir DAS MEI em 2026"
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={form.categoria} onValueChange={(v) => setForm({ ...form, categoria: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categorias.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} placeholder="como-emitir-das-mei" />
              </div>
              <div>
                <Label>Tempo de leitura (min)</Label>
                <Input type="number" min={1} value={form.tempo_leitura_min} onChange={(e) => setForm({ ...form, tempo_leitura_min: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Input value={form.subtitulo} onChange={(e) => setForm({ ...form, subtitulo: e.target.value })} />
            </div>
            <div>
              <Label>Resumo (meta description)</Label>
              <Textarea rows={2} value={form.resumo} onChange={(e) => setForm({ ...form, resumo: e.target.value })} />
            </div>
            <div>
              <Label>Conteúdo (use # H2, ## H3, listas com - ou 1.)</Label>
              <Textarea rows={14} value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                placeholder={"# Introdução\n\nParágrafo de abertura...\n\n## Passo a passo\n\n1. Acesse o portal...\n2. Informe seu CNPJ...\n\n## Dúvidas comuns\n\n- Item 1\n- Item 2"} />
            </div>
            <div>
              <Label>Tags (separadas por vírgula)</Label>
              <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="MEI, DAS, PGMEI" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <Label>Autor</Label>
                <Input value={form.autor_nome} onChange={(e) => setForm({ ...form, autor_nome: e.target.value })} />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input value={form.autor_cargo} onChange={(e) => setForm({ ...form, autor_cargo: e.target.value })} />
              </div>
              <div>
                <Label>Iniciais</Label>
                <Input value={form.autor_iniciais} onChange={(e) => setForm({ ...form, autor_iniciais: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Bio do autor</Label>
              <Textarea rows={2} value={form.autor_bio} onChange={(e) => setForm({ ...form, autor_bio: e.target.value })} />
            </div>
            <div>
              <Label>FAQ (JSON)</Label>
              <Textarea rows={5} className="font-mono text-xs" value={form.faq} onChange={(e) => setForm({ ...form, faq: e.target.value })}
                placeholder='[{"pergunta":"O que é DAS?","resposta":"..."}]' />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.publicado} onCheckedChange={(v) => setForm({ ...form, publicado: v })} />
              <Label>Publicado (aparece no site)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={salvar} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving && <Loader2 className="w-4 h-4 mr-1 animate-spin" />} Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtigosCMSManager;
