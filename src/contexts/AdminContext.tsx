
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { IndicesProvider, useIndices } from './IndicesContext';
import { ConteudoProvider, useConteudo } from './ConteudoContext';
import { CalendarioFiscalProvider, useCalendarioFiscal } from './CalendarioFiscalContext';
import { UsuariosProvider, useUsuarios } from './UsuariosContext';
import { CursosVendasProvider, useCursosVendas } from './CursosVendasContext';
import { ConfiguracoesProvider, useConfiguracoes } from './ConfiguracoesContext';

// Re-export all types for backward compatibility
export * from '@/types/admin';

interface AdminContextType {
  // All the combined context types from individual providers
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Main hook that combines all individual hooks
export const useAdmin = () => {
  const indices = useIndices();
  const conteudo = useConteudo();
  const usuarios = useUsuarios();
  const cursosVendas = useCursosVendas();
  const configuracoes = useConfiguracoes();
  const calendario = useCalendarioFiscal();

  return {
    ...indices,
    ...conteudo,
    ...usuarios,
    ...cursosVendas,
    ...configuracoes,
    ...calendario
  };
};

// Combined provider that wraps all individual providers
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // Load and save data to localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('conectafisco-admin-data');
    if (dadosSalvos) {
      try {
        const dados = JSON.parse(dadosSalvos);
        // Individual providers will handle their own localStorage loading
        console.log('Dados carregados:', dados);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, []);

  return (
    <IndicesProvider>
      <ConteudoProvider>
        <UsuariosProvider>
          <CursosVendasProvider>
            <ConfiguracoesProvider>
              <AdminContext.Provider value={{}}>
                {children}
              </AdminContext.Provider>
            </ConfiguracoesProvider>
          </CursosVendasProvider>
        </UsuariosProvider>
      </ConteudoProvider>
    </IndicesProvider>
  );
};
