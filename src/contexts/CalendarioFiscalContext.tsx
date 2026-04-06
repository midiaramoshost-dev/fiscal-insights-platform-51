import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { EventoFiscal } from '@/types/admin';

interface CalendarioFiscalContextType {
  eventos: EventoFiscal[];
  setEventos: (eventos: EventoFiscal[]) => void;
  adicionarEvento: (evento: Omit<EventoFiscal, 'id'>) => void;
  atualizarEvento: (id: string, dados: Partial<EventoFiscal>) => void;
  removerEvento: (id: string) => void;
  eventosDoMes: (mes: number) => EventoFiscal[];
  proximosEventos: EventoFiscal[];
}

const CalendarioFiscalContext = createContext<CalendarioFiscalContextType | undefined>(undefined);

export const useCalendarioFiscal = () => {
  const ctx = useContext(CalendarioFiscalContext);
  if (!ctx) throw new Error('useCalendarioFiscal deve ser usado dentro de CalendarioFiscalProvider');
  return ctx;
};

const eventosIniciais: EventoFiscal[] = [
  { id: '1', dia: 7, mes: null, evento: 'FGTS', tipo: 'Trabalhista', descricao: 'Recolhimento do FGTS', recorrente: true, ativo: true },
  { id: '2', dia: 15, mes: null, evento: 'DARF PJ - IRPJ/CSLL', tipo: 'Federal', descricao: 'DARF Pessoa Jurídica', recorrente: true, ativo: true },
  { id: '3', dia: 20, mes: null, evento: 'DARF - IRRF/PIS/COFINS', tipo: 'Federal', descricao: 'Recolhimento de tributos retidos na fonte', recorrente: true, ativo: true },
  { id: '4', dia: 20, mes: null, evento: 'INSS', tipo: 'Trabalhista', descricao: 'GPS - Guia da Previdência Social', recorrente: true, ativo: true },
  { id: '5', dia: 20, mes: null, evento: 'Simples Nacional', tipo: 'Federal', descricao: 'DAS - Documento de Arrecadação do Simples', recorrente: true, ativo: true },
  { id: '6', dia: 25, mes: null, evento: 'ICMS', tipo: 'Estadual', descricao: 'Imposto sobre circulação de mercadorias', recorrente: true, ativo: true },
  { id: '7', dia: 25, mes: null, evento: 'PIS/COFINS', tipo: 'Federal', descricao: 'Contribuições PIS e COFINS', recorrente: true, ativo: true },
  { id: '8', dia: 10, mes: null, evento: 'ISS', tipo: 'Municipal', descricao: 'Imposto Sobre Serviços', recorrente: true, ativo: true },
  { id: '9', dia: 28, mes: 2, evento: 'DIRF', tipo: 'Federal', descricao: 'Declaração do Imposto de Renda Retido na Fonte', recorrente: true, ativo: true },
  { id: '10', dia: 31, mes: 3, evento: 'DEFIS', tipo: 'Federal', descricao: 'Declaração de Informações Socioeconômicas e Fiscais', recorrente: true, ativo: true },
  { id: '11', dia: 31, mes: 5, evento: 'IRPF', tipo: 'Federal', descricao: 'Declaração de Imposto de Renda Pessoa Física', recorrente: true, ativo: true },
  { id: '12', dia: 31, mes: 7, evento: 'ECD', tipo: 'Federal', descricao: 'Escrituração Contábil Digital', recorrente: true, ativo: true },
  { id: '13', dia: 31, mes: 7, evento: 'ECF', tipo: 'Federal', descricao: 'Escrituração Contábil Fiscal', recorrente: true, ativo: true },
];

export const CalendarioFiscalProvider = ({ children }: { children: ReactNode }) => {
  const [eventos, setEventos] = useState<EventoFiscal[]>(() => {
    try {
      const saved = localStorage.getItem('conectafisco-calendario');
      return saved ? JSON.parse(saved) : eventosIniciais;
    } catch { return eventosIniciais; }
  });

  const salvar = (novos: EventoFiscal[]) => {
    setEventos(novos);
    localStorage.setItem('conectafisco-calendario', JSON.stringify(novos));
  };

  const adicionarEvento = (evento: Omit<EventoFiscal, 'id'>) => {
    salvar([...eventos, { ...evento, id: Date.now().toString() }]);
  };

  const atualizarEvento = (id: string, dados: Partial<EventoFiscal>) => {
    salvar(eventos.map(e => e.id === id ? { ...e, ...dados } : e));
  };

  const removerEvento = (id: string) => {
    salvar(eventos.filter(e => e.id !== id));
  };

  const eventosDoMes = (mes: number) =>
    eventos.filter(e => e.ativo && (e.mes === null || e.mes === mes))
      .sort((a, b) => a.dia - b.dia);

  const proximosEventos = useMemo(() => {
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;

    return eventos
      .filter(e => e.ativo && (e.mes === null || e.mes === mesAtual))
      .filter(e => e.dia >= diaAtual)
      .sort((a, b) => a.dia - b.dia)
      .slice(0, 6);
  }, [eventos]);

  return (
    <CalendarioFiscalContext.Provider value={{
      eventos, setEventos, adicionarEvento, atualizarEvento, removerEvento, eventosDoMes, proximosEventos
    }}>
      {children}
    </CalendarioFiscalContext.Provider>
  );
};
