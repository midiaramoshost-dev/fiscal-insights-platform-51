const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BCBData {
  data: string;
  valor: string;
}

async function fetchBCBSeries(seriesCode: number, lastN: number = 1): Promise<BCBData[]> {
  try {
    const res = await fetch(
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${seriesCode}/dados/ultimos/${lastN}?formato=json`
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchRSSFeed(url: string): Promise<any[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const text = await res.text();
    
    const items: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(text)) !== null && items.length < 10) {
      const itemXml = match[1];
      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/)?.[1] || itemXml.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]>|<description>(.*?)<\/description>/)?.[1] || 
                          itemXml.match(/<description>(.*?)<\/description>/)?.[1] || '';
      
      items.push({
        title: title.replace(/<[^>]*>/g, '').trim(),
        link: link.trim(),
        pubDate,
        description: description.replace(/<[^>]*>/g, '').trim().substring(0, 200),
      });
    }
    return items;
  } catch {
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type } = await req.json();

    if (type === 'indices') {
      // Fetch economic indices from BCB (Banco Central do Brasil)
      const [selic, ipca, cdi, usd, inpc, igpm] = await Promise.all([
        fetchBCBSeries(432, 2),  // SELIC
        fetchBCBSeries(433, 2),  // IPCA
        fetchBCBSeries(4389, 2), // CDI
        fetchBCBSeries(1, 2),    // USD/BRL
        fetchBCBSeries(188, 2),  // INPC
        fetchBCBSeries(189, 2),  // IGP-M
      ]);

      const formatIndex = (name: string, data: BCBData[], suffix: string = '%') => {
        if (!data || data.length === 0) return null;
        const current = data[data.length - 1];
        const previous = data.length > 1 ? data[data.length - 2] : null;
        const currentVal = parseFloat(current.valor);
        const previousVal = previous ? parseFloat(previous.valor) : currentVal;
        const variation = currentVal - previousVal;
        
        return {
          nome: name,
          valor: `${currentVal.toFixed(2)}${suffix}`,
          variacao: `${variation >= 0 ? '+' : ''}${variation.toFixed(2)}${suffix}`,
          tipo: variation > 0 ? 'alta' : variation < 0 ? 'baixa' : 'estavel',
          ultimaAtualizacao: current.data,
        };
      };

      const indices = [
        formatIndex('SELIC', selic),
        formatIndex('IPCA', ipca),
        formatIndex('CDI', cdi),
        formatIndex('Dólar (USD)', usd, ''),
        formatIndex('INPC', inpc),
        formatIndex('IGP-M', igpm),
      ].filter(Boolean);

      return new Response(JSON.stringify({ success: true, data: indices }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (type === 'news') {
      // Fetch fiscal/tax news from multiple RSS sources
      const feeds = await Promise.all([
        fetchRSSFeed('https://www.gov.br/receitafederal/pt-br/assuntos/noticias/RSS'),
        fetchRSSFeed('https://www.in.gov.br/rss/home/-/journal/id/2'),
        fetchRSSFeed('https://cfc.org.br/feed/'),
      ]);

      const allNews = feeds.flat()
        .filter(item => item.title)
        .sort((a, b) => {
          const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
          const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 15)
        .map((item, index) => ({
          id: index + 1,
          title: item.title,
          link: item.link,
          date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          resumo: item.description || 'Clique para ler a matéria completa.',
          tipo: item.link?.includes('gov.br') ? 'Federal' : 'Geral',
          destaque: index < 3,
        }));

      return new Response(JSON.stringify({ success: true, data: allNews }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (type === 'legislacao') {
      // Fetch legislation from DOU (Diário Oficial da União)
      const items = await fetchRSSFeed('https://www.in.gov.br/rss/home/-/journal/id/2');
      
      const legislacoes = items
        .filter(item => item.title)
        .slice(0, 8)
        .map((item, index) => ({
          id: index + 1,
          title: item.title,
          link: item.link,
          date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          orgao: 'Diário Oficial da União',
          resumo: item.description || 'Publicação do Diário Oficial.',
          type: 'Federal',
          categoria: 'Legislação',
        }));

      return new Response(JSON.stringify({ success: true, data: legislacoes }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid type. Use: indices, news, or legislacao' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching live data:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});