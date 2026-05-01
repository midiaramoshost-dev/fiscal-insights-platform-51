import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";

const SobreAnuncios = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sobre os Anúncios | Conecta Fisco</title>
        <meta name="description" content="Por que exibimos anúncios na Conecta Fisco e como eles ajudam a manter o conteúdo gratuito e atualizado." />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/sobre-anuncios" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-slate-800">Sobre os Anúncios</h1>
          <p>A Conecta Fisco oferece todo o conteúdo de forma gratuita. Para sustentar a manutenção da plataforma, atualização da legislação e produção de novos conteúdos, exibimos anúncios fornecidos pelo Google AdSense e parceiros.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-3">Como funcionam</h2>
          <p>Os anúncios são selecionados automaticamente com base nos seus interesses e no contexto da página. Não temos controle direto sobre cada anúncio exibido.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-3">Reportar um anúncio</h2>
          <p>Se um anúncio parecer inadequado, envie-nos: contato@conectafisco.com</p>
        </article>
      </main>
    </div>
  );
};

export default SobreAnuncios;
