import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EconomicIndex {
  nome: string;
  valor: string;
  variacao: string;
  tipo: 'alta' | 'baixa' | 'estavel';
  ultimaAtualizacao: string;
}

interface NewsItem {
  id: number;
  title: string;
  link: string;
  date: string;
  resumo: string;
  tipo: string;
  destaque: boolean;
}

interface LegislacaoItem {
  id: number;
  title: string;
  link: string;
  date: string;
  orgao: string;
  resumo: string;
  type: string;
  categoria: string;
}

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function getCached<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(`live-data-${key}`);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`live-data-${key}`);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`live-data-${key}`, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // ignore storage errors
  }
}

export function useEconomicIndices() {
  const [indices, setIndices] = useState<EconomicIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const cached = getCached<EconomicIndex[]>('indices');
    if (cached) {
      setIndices(cached);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-live-data', {
        body: { type: 'indices' },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.success && data.data) {
        setIndices(data.data);
        setCache('indices', data.data);
      }
    } catch (err) {
      console.error('Error fetching indices:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar índices');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { indices, loading, error, refresh: fetchData };
}

export function useFiscalNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const cached = getCached<NewsItem[]>('news');
    if (cached) {
      setNews(cached);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-live-data', {
        body: { type: 'news' },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.success && data.data) {
        setNews(data.data);
        setCache('news', data.data);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar notícias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { news, loading, error, refresh: fetchData };
}

export function useLegislacao() {
  const [legislacoes, setLegislacoes] = useState<LegislacaoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const cached = getCached<LegislacaoItem[]>('legislacao');
    if (cached) {
      setLegislacoes(cached);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-live-data', {
        body: { type: 'legislacao' },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.success && data.data) {
        setLegislacoes(data.data);
        setCache('legislacao', data.data);
      }
    } catch (err) {
      console.error('Error fetching legislacao:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar legislações');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { legislacoes, loading, error, refresh: fetchData };
}