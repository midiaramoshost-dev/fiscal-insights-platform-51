
export interface IndiceEconomico {
  id: string;
  nome: string;
  valor: string;
  variacao: string;
  tipo: 'alta' | 'baixa' | 'neutro';
  ultimaAtualizacao: string;
  fonte?: string;
}

export interface Artigo {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  autor: string;
  status: 'publicado' | 'rascunho' | 'revisao';
  dataPublicacao: string;
  tags: string[];
  secaoTematica?: string;
}

export interface LinkExterno {
  id: string;
  titulo: string;
  url: string;
  categoria: string;
  descricao?: string;
  ativo: boolean;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  plano: 'gratuito' | 'Básico' | 'Premium' | 'Corporativo';
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  dataRegistro: string;
  ultimoAcesso: string;
  telefone?: string;
  tipo_pessoa?: 'fisica' | 'juridica';
  documento?: string;
  empresa?: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  instrutor: string;
  duracao: number;
  preco: number;
  status: 'ativo' | 'inativo' | 'rascunho';
  dataLancamento: string;
  alunos: number;
  avaliacoes: number;
}

export interface Venda {
  id: string;
  produto: string;
  cliente: string;
  email: string;
  valor: number;
  status: 'concluida' | 'pendente' | 'cancelada';
  dataVenda: string;
  tipoProduto: 'curso' | 'consultoria' | 'software' | 'material';
}

export interface MenuItem {
  id: string;
  titulo: string;
  items: string[];
  ordem: number;
  ativo: boolean;
}

export interface SecaoTematica {
  id: string;
  nome: string;
  titulo: string;
  descricao: string;
  conteudos: Artigo[];
  ativa: boolean;
}

export interface ConfiguracaoSistema {
  id: string;
  chave: string;
  valor: string;
  tipo: 'texto' | 'numero' | 'boolean' | 'email';
  categoria: string;
  descricao: string;
}

export interface Matricula {
  id: string;
  user_id: string;
  tipo_curso: 'ead' | 'presencial' | 'incompany';
  nome_curso: string;
  valor?: number;
  status: 'pendente' | 'confirmada' | 'cancelada';
  dados_matricula: any;
  created_at: string;
}

export interface EventoFiscal {
  id: string;
  dia: number;
  mes: number | null; // null = todo mês
  evento: string;
  tipo: 'Federal' | 'Estadual' | 'Municipal' | 'Trabalhista';
  descricao?: string;
  recorrente: boolean;
  ativo: boolean;
}
