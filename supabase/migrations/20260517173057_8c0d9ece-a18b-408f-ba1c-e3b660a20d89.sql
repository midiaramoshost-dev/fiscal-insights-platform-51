-- Recriar tabelas do projeto original (perdidas ao criar nova Cloud)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo TEXT,
  email TEXT,
  telefone TEXT,
  tipo_pessoa TEXT CHECK (tipo_pessoa IN ('fisica', 'juridica')),
  documento TEXT,
  empresa TEXT,
  status TEXT DEFAULT 'ativo',
  plano TEXT DEFAULT 'gratuito',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.matriculas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo_curso TEXT NOT NULL,
  nome_curso TEXT NOT NULL,
  valor DECIMAL(10,2),
  status TEXT DEFAULT 'pendente',
  dados_matricula JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matriculas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_self" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_self" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "matriculas_select_self" ON public.matriculas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "matriculas_insert_self" ON public.matriculas FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =========================================
-- CMS de artigos editoriais (Fase 3)
-- =========================================
CREATE TABLE public.cms_artigos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  categoria TEXT NOT NULL,
  titulo TEXT NOT NULL,
  subtitulo TEXT NOT NULL DEFAULT '',
  resumo TEXT NOT NULL DEFAULT '',
  conteudo TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  autor_nome TEXT NOT NULL DEFAULT 'Equipe Editorial Conecta Fisco',
  autor_cargo TEXT NOT NULL DEFAULT 'Redação Tributária',
  autor_bio TEXT NOT NULL DEFAULT '',
  autor_iniciais TEXT NOT NULL DEFAULT 'CF',
  autor_avatar TEXT NOT NULL DEFAULT '',
  tempo_leitura_min INTEGER NOT NULL DEFAULT 5,
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  publicado BOOLEAN NOT NULL DEFAULT true,
  data_publicacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data_atualizacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX cms_artigos_pub_idx ON public.cms_artigos (publicado, data_publicacao DESC);
CREATE INDEX cms_artigos_cat_idx ON public.cms_artigos (categoria);

CREATE OR REPLACE FUNCTION public.cms_artigos_touch()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER cms_artigos_touch_trg
BEFORE UPDATE ON public.cms_artigos
FOR EACH ROW EXECUTE FUNCTION public.cms_artigos_touch();

ALTER TABLE public.cms_artigos ENABLE ROW LEVEL SECURITY;

-- Leitura: liberada (rascunhos também aparecem no painel admin que é client-side)
CREATE POLICY "cms_artigos_select_all"
  ON public.cms_artigos FOR SELECT USING (true);

-- Escrita: liberada (admin protegido por credenciais fixas no app, mesmo padrão
-- das demais áreas administrativas deste projeto)
CREATE POLICY "cms_artigos_insert_all"
  ON public.cms_artigos FOR INSERT WITH CHECK (true);

CREATE POLICY "cms_artigos_update_all"
  ON public.cms_artigos FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "cms_artigos_delete_all"
  ON public.cms_artigos FOR DELETE USING (true);