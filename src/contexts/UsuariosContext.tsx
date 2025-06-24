
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '@/types/admin';

interface UsuariosContextType {
  usuarios: Usuario[];
  setUsuarios: (usuarios: Usuario[]) => void;
  adicionarUsuario: (usuario: Omit<Usuario, 'id'>) => void;
  atualizarUsuario: (id: string, dados: Partial<Usuario>) => void;
  removerUsuario: (id: string) => void;
}

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined);

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error('useUsuarios deve ser usado dentro de UsuariosProvider');
  }
  return context;
};

export const UsuariosProvider = ({ children }: { children: ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: '1', nome: 'João Silva', email: 'joao@email.com', plano: 'Premium', status: 'Ativo', dataRegistro: '2024-01-01', ultimoAcesso: '2024-01-15' },
    { id: '2', nome: 'Maria Santos', email: 'maria@email.com', plano: 'Básico', status: 'Ativo', dataRegistro: '2024-01-02', ultimoAcesso: '2024-01-14' },
    { id: '3', nome: 'Pedro Costa', email: 'pedro@email.com', plano: 'Premium', status: 'Pendente', dataRegistro: '2024-01-03', ultimoAcesso: '2024-01-13' },
    { id: '4', nome: 'Ana Oliveira', email: 'ana@email.com', plano: 'Corporativo', status: 'Ativo', dataRegistro: '2024-01-04', ultimoAcesso: '2024-01-16' }
  ]);

  const adicionarUsuario = (usuario: Omit<Usuario, 'id'>) => {
    const novoUsuario: Usuario = {
      ...usuario,
      id: Date.now().toString()
    };
    setUsuarios(prev => [...prev, novoUsuario]);
  };

  const atualizarUsuario = (id: string, dados: Partial<Usuario>) => {
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, ...dados } : usuario
    ));
  };

  const removerUsuario = (id: string) => {
    setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
  };

  const value: UsuariosContextType = {
    usuarios,
    setUsuarios,
    adicionarUsuario,
    atualizarUsuario,
    removerUsuario
  };

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
};
