import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { IndiceEconomico } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

interface IndicesContextType {
  indices: IndiceEconomico[];
  setIndices: (indices: IndiceEconomico[]) => void;
  atualizarIndice: (id: string, dados: Partial<IndiceEconomico>) => void;
  adicionarIndice: (indice: Omit<IndiceEconomico, 'id'>) => void;
  removerIndice: (id: string) => void;
  atualizarTodosIndices: () => Promise<void>;
  configuracoes: any;
  setConfiguracoes: (config: any) => void;
  carregando: boolean;
}

const IndicesContext = createContext<IndicesContextType | undefined>(undefined);

export const useIndices = () => {
  const context = useContext(IndicesContext);
  if (!context) {
    throw new Error('useIndices deve ser usado dentro de IndicesProvider');
  }
  return context;
};

const indicesPadrao: IndiceEconomico[] = [
  { id: '1', nome: 'SELIC', valor: '10.75%', variacao: '+0.25', tipo: 'alta', ultimaAtualizacao: new Date().toISOString(), fonte: 'Banco Central' },
  { id: '2', nome: 'IPCA', valor: '4.62%', variacao: '-0.15', tipo: 'baixa', ultimaAtualizacao: new Date().toISOString(), fonte: 'IBGE' },
  { id: '3', nome: 'IGP-M', valor: '3.18%', variacao: '+0.08', tipo: 'alta', ultimaAtualizacao: new Date().toISOString(), fonte: 'FGV' },
  { id: '4', nome: 'INPC', valor: '4.77%', variacao: '+0.12', tipo: 'alta', ultimaAtualizacao: new Date().toISOString(), fonte: 'IBGE' },
  { id: '5', nome: 'CDI', valor: '10.65%', variacao: '0.00', tipo: 'neutro', ultimaAtualizacao: new Date().toISOString(), fonte: 'CETIP' },
];

export const IndicesProvider = ({ children }: { children: ReactNode }) => {
  const [indices, setIndices] = useState<IndiceEconomico[]>(indicesPadrao);
  const [carregando, setCarregando] = useState(false);
  const [configuracoes, setConfiguracoes] = useState({
    autoUpdate: true,
    updateInterval: 6,
    lastAutoUpdate: new Date().toISOString()
  });

  const atualizarIndice = (id: string, dados: Partial<IndiceEconomico>) => {
    setIndices(prev => prev.map(indice =>
      indice.id === id
        ? { ...indice, ...dados, ultimaAtualizacao: new Date().toISOString() }
        : indice
    ));
  };

  const adicionarIndice = (indice: Omit<IndiceEconomico, 'id'>) => {
    setIndices(prev => [...prev, { ...indice, id: Date.now().toString(), ultimaAtualizacao: new Date().toISOString() }]);
  };

  const removerIndice = (id: string) => {
    setIndices(prev => prev.filter(indice => indice.id !== id));
  };

  const atualizarTodosIndices = useCallback(async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-live-data', {
        body: { type: 'indices' },
      });

      if (error) throw error;

      if (data?.success && data.data?.length > 0) {
        const novosIndices: IndiceEconomico[] = data.data.map((item: any, i: number) => ({
          id: (i + 1).toString(),
          nome: item.nome,
          valor: item.valor,
          variacao: item.variacao,
          tipo: item.tipo === 'alta' ? 'alta' : item.tipo === 'baixa' ? 'baixa' : 'neutro',
          ultimaAtualizacao: new Date().toISOString(),
          fonte: 'Banco Central do Brasil',
        }));
        setIndices(novosIndices);
        setConfiguracoes(prev => ({ ...prev, lastAutoUpdate: new Date().toISOString() }));
        console.log('Índices atualizados via BCB:', novosIndices.length);
      }
    } catch (err) {
      console.error('Erro ao buscar índices do BCB:', err);
      // Keep current data on error
    } finally {
      setCarregando(false);
    }
  }, []);

  // Auto-update
  useEffect(() => {
    // Fetch on mount
    atualizarTodosIndices();

    if (configuracoes.autoUpdate) {
      const intervalo = setInterval(atualizarTodosIndices, configuracoes.updateInterval * 60 * 60 * 1000);
      return () => clearInterval(intervalo);
    }
  }, [configuracoes.autoUpdate, configuracoes.updateInterval, atualizarTodosIndices]);

  return (
    <IndicesContext.Provider value={{
      indices, setIndices, atualizarIndice, adicionarIndice, removerIndice,
      atualizarTodosIndices, configuracoes, setConfiguracoes, carregando
    }}>
      {children}
    </IndicesContext.Provider>
  );
};
