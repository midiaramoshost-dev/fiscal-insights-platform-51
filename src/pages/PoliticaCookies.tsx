import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";

const PoliticaCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Política de Cookies | Conecta Fisco</title>
        <meta name="description" content="Entenda como a Conecta Fisco usa cookies para melhorar sua experiência de navegação e exibir publicidade relevante." />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/politica-cookies" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-slate-800">Política de Cookies</h1>
          <p className="text-sm text-muted-foreground mb-8">Última atualização: 01 de maio de 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">O que são cookies?</h2>
            <p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam a lembrar suas preferências e melhorar a experiência.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Tipos de cookies que utilizamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essenciais:</strong> necessários para o funcionamento do site (login, sessão).</li>
              <li><strong>Analíticos:</strong> Google Analytics — entender como o site é usado.</li>
              <li><strong>Publicidade:</strong> Google AdSense e parceiros — exibir anúncios relevantes.</li>
              <li><strong>Preferências:</strong> lembrar suas escolhas (idioma, tema).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Cookies de terceiros</h2>
            <p>Trabalhamos com Google AdSense. Saiba mais em <a href="https://policies.google.com/technologies/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">políticas de publicidade do Google</a>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Como gerenciar cookies</h2>
            <p>Você pode configurar seu navegador para recusar cookies. Isso pode afetar funcionalidades do site.</p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default PoliticaCookies;
