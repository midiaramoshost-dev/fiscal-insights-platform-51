import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileCheck, ShieldCheck, BookOpen, Users } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Breadcrumbs from "@/components/Breadcrumbs";

const PoliticaEditorial = () => (
  <div className="min-h-screen bg-slate-50">
    <Helmet>
      <title>Política Editorial | Conecta Fisco</title>
      <meta name="description" content="Conheça os princípios editoriais do Conecta Fisco: independência, fontes oficiais, revisão técnica e correções transparentes." />
      <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/politica-editorial" />
    </Helmet>
    <Header />
    <SubHeader />
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={[{ label: "Política Editorial" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Política Editorial</h1>
      <p className="text-slate-600 mb-6">
        O Conecta Fisco é um portal editorial independente dedicado a informação fiscal, tributária e trabalhista de utilidade pública. Esta política define como produzimos, revisamos e atualizamos nosso conteúdo.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Independência</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">A redação não recebe pagamento para favorecer empresas, escritórios ou produtos. Conteúdo patrocinado, quando houver, será claramente identificado.</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileCheck className="w-4 h-4 text-blue-600" /> Fontes oficiais</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Todo conteúdo tributário cita legislação vigente (Receita Federal, SEFAZ, CONFAZ, CGSN, PGFN, TST) e remete o leitor ao texto oficial.</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Users className="w-4 h-4 text-purple-600" /> Especialistas</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Artigos são produzidos e revisados por contadores (CRC), advogados (OAB) e jornalistas com formação na área tributária e mais de 10 anos de experiência.</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><BookOpen className="w-4 h-4 text-orange-600" /> Atualização</CardTitle></CardHeader><CardContent className="text-sm text-slate-600">Conteúdo de impacto fiscal (alíquotas, prazos, IRPF, DAS) é revisado a cada alteração normativa e exibe data de publicação e de última atualização.</CardContent></Card>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-3 mt-8">Processo editorial</h2>
      <ol className="space-y-2 text-slate-700 list-decimal pl-6 mb-8">
        <li>Pauta baseada em demanda real do leitor (busca, dúvidas frequentes, mudanças normativas).</li>
        <li>Pesquisa em fontes oficiais e cruzamento com doutrina e jurisprudência aplicáveis.</li>
        <li>Produção do texto por redator especializado.</li>
        <li>Revisão técnica por contador ou advogado.</li>
        <li>Revisão gramatical e adequação SEO.</li>
        <li>Publicação com identificação de autor, data e tags.</li>
        <li>Monitoramento de mudanças e atualização sempre que necessário.</li>
      </ol>

      <h2 className="text-2xl font-bold text-slate-900 mb-3">Correções e direito de resposta</h2>
      <p className="text-slate-700 mb-3">Identificamos erros com transparência. Encontrou alguma inconsistência? Escreva para <a href="mailto:editorial@conectafisco.com" className="text-blue-700 hover:underline">editorial@conectafisco.com</a>. Toda correção relevante é registrada no rodapé do artigo, com data.</p>

      <h2 className="text-2xl font-bold text-slate-900 mb-3 mt-6">Limites do nosso conteúdo</h2>
      <p className="text-slate-700">O Conecta Fisco produz conteúdo educacional. As informações <strong>não substituem</strong> consultoria contábil ou jurídica para casos concretos. Antes de tomar decisões tributárias, consulte um profissional habilitado.</p>

      <div className="mt-8 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-3">
        <CheckCircle2 className="w-4 h-4" /> Última revisão desta política: 15/05/2026.
      </div>
    </main>
  </div>
);

export default PoliticaEditorial;
