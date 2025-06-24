
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, ConfiguracaoSistema } from '@/types/admin';

interface ConfiguracoesContextType {
  menus: MenuItem[];
  setMenus: (menus: MenuItem[]) => void;
  adicionarMenu: (menu: Omit<MenuItem, 'id'>) => void;
  atualizarMenu: (id: string, dados: Partial<MenuItem>) => void;
  removerMenu: (id: string) => void;
  
  configuracoesSistema: ConfiguracaoSistema[];
  setConfiguracoesSistema: (configs: ConfiguracaoSistema[]) => void;
  atualizarConfiguracao: (id: string, valor: string) => void;
  adicionarConfiguracao: (config: Omit<ConfiguracaoSistema, 'id'>) => void;
}

const ConfiguracoesContext = createContext<ConfiguracoesContextType | undefined>(undefined);

export const useConfiguracoes = () => {
  const context = useContext(ConfiguracoesContext);
  if (!context) {
    throw new Error('useConfiguracoes deve ser usado dentro de ConfiguracoesProvider');
  }
  return context;
};

export const ConfiguracoesProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<MenuItem[]>([
    { id: '1', titulo: 'SIMPLES', items: ['Optantes', 'Desenquadramento', 'Sublimites', 'Anexos', 'Cálculo'], ordem: 1, ativo: true },
    { id: '2', titulo: 'IR', items: ['Pessoa Física', 'Pessoa Jurídica', 'Lucro Real', 'Lucro Presumido', 'Declarações'], ordem: 2, ativo: true },
    { id: '3', titulo: 'PIS/COFINS', items: ['Cumulativo', 'Não Cumulativo', 'Substituição Tributária', 'Créditos', 'Retenções'], ordem: 3, ativo: true }
  ]);

  const [configuracoesSistema, setConfiguracoesSistema] = useState<ConfiguracaoSistema[]>([
    { id: '1', chave: 'nome_empresa', valor: 'Conecta Fisco', tipo: 'texto', categoria: 'Empresa', descricao: 'Nome da empresa' },
    { id: '2', chave: 'email_contato', valor: 'contato@conectafisco.com.br', tipo: 'email', categoria: 'Contato', descricao: 'Email de contato principal' },
    { id: '3', chave: 'telefone_contato', valor: '(11) 3000-0000', tipo: 'texto', categoria: 'Contato', descricao: 'Telefone de contato' }
  ]);

  const adicionarMenu = (menu: Omit<MenuItem, 'id'>) => {
    const novoMenu: MenuItem = {
      ...menu,
      id: Date.now().toString()
    };
    setMenus(prev => [...prev, novoMenu]);
  };

  const atualizarMenu = (id: string, dados: Partial<MenuItem>) => {
    setMenus(prev => prev.map(menu => 
      menu.id === id ? { ...menu, ...dados } : menu
    ));
  };

  const removerMenu = (id: string) => {
    setMenus(prev => prev.filter(menu => menu.id !== id));
  };

  const atualizarConfiguracao = (id: string, valor: string) => {
    setConfiguracoesSistema(prev => prev.map(config => 
      config.id === id ? { ...config, valor } : config
    ));
  };

  const adicionarConfiguracao = (config: Omit<ConfiguracaoSistema, 'id'>) => {
    const novaConfig: ConfiguracaoSistema = {
      ...config,
      id: Date.now().toString()
    };
    setConfiguracoesSistema(prev => [...prev, novaConfig]);
  };

  const value: ConfiguracoesContextType = {
    menus,
    setMenus,
    adicionarMenu,
    atualizarMenu,
    removerMenu,
    configuracoesSistema,
    setConfiguracoesSistema,
    atualizarConfiguracao,
    adicionarConfiguracao
  };

  return (
    <ConfiguracoesContext.Provider value={value}>
      {children}
    </ConfiguracoesContext.Provider>
  );
};
