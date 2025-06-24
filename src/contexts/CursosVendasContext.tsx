
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Curso, Venda } from '@/types/admin';

interface CursosVendasContextType {
  cursos: Curso[];
  setCursos: (cursos: Curso[]) => void;
  adicionarCurso: (curso: Omit<Curso, 'id'>) => void;
  atualizarCurso: (id: string, dados: Partial<Curso>) => void;
  removerCurso: (id: string) => void;
  
  vendas: Venda[];
  setVendas: (vendas: Venda[]) => void;
  adicionarVenda: (venda: Omit<Venda, 'id'>) => void;
  atualizarVenda: (id: string, dados: Partial<Venda>) => void;
}

const CursosVendasContext = createContext<CursosVendasContextType | undefined>(undefined);

export const useCursosVendas = () => {
  const context = useContext(CursosVendasContext);
  if (!context) {
    throw new Error('useCursosVendas deve ser usado dentro de CursosVendasProvider');
  }
  return context;
};

export const CursosVendasProvider = ({ children }: { children: ReactNode }) => {
  const [cursos, setCursos] = useState<Curso[]>([
    { id: '1', titulo: 'eSocial Completo 2024', descricao: 'Curso completo sobre eSocial', categoria: 'Trabalho', instrutor: 'Dr. Carlos Silva', duracao: 40, preco: 299.90, status: 'ativo', dataLancamento: '2024-01-01', alunos: 150, avaliacoes: 4.8 },
    { id: '2', titulo: 'SPED Fiscal Avançado', descricao: 'Curso avançado de SPED Fiscal', categoria: 'SPED', instrutor: 'Dra. Ana Costa', duracao: 30, preco: 199.90, status: 'ativo', dataLancamento: '2024-01-05', alunos: 89, avaliacoes: 4.9 }
  ]);

  const [vendas, setVendas] = useState<Venda[]>([
    { id: '1', produto: 'eSocial Completo 2024', cliente: 'João Silva', email: 'joao@email.com', valor: 299.90, status: 'concluida', dataVenda: '2024-01-15', tipoProduto: 'curso' },
    { id: '2', produto: 'Consultoria ICMS', cliente: 'Maria Santos', email: 'maria@email.com', valor: 1500.00, status: 'pendente', dataVenda: '2024-01-14', tipoProduto: 'consultoria' }
  ]);

  const adicionarCurso = (curso: Omit<Curso, 'id'>) => {
    const novoCurso: Curso = {
      ...curso,
      id: Date.now().toString()
    };
    setCursos(prev => [...prev, novoCurso]);
  };

  const atualizarCurso = (id: string, dados: Partial<Curso>) => {
    setCursos(prev => prev.map(curso => 
      curso.id === id ? { ...curso, ...dados } : curso
    ));
  };

  const removerCurso = (id: string) => {
    setCursos(prev => prev.filter(curso => curso.id !== id));
  };

  const adicionarVenda = (venda: Omit<Venda, 'id'>) => {
    const novaVenda: Venda = {
      ...venda,
      id: Date.now().toString()
    };
    setVendas(prev => [...prev, novaVenda]);
  };

  const atualizarVenda = (id: string, dados: Partial<Venda>) => {
    setVendas(prev => prev.map(venda => 
      venda.id === id ? { ...venda, ...dados } : venda
    ));
  };

  const value: CursosVendasContextType = {
    cursos,
    setCursos,
    adicionarCurso,
    atualizarCurso,
    removerCurso,
    vendas,
    setVendas,
    adicionarVenda,
    atualizarVenda
  };

  return (
    <CursosVendasContext.Provider value={value}>
      {children}
    </CursosVendasContext.Provider>
  );
};
