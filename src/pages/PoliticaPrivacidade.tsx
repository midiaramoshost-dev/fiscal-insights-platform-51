import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Política de Privacidade | Conecta Fisco</title>
        <meta name="description" content="Política de Privacidade da Conecta Fisco - Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD." />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/politica-privacidade" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-slate-800">Política de Privacidade</h1>
          <p className="text-sm text-muted-foreground mb-8">Última atualização: 01 de maio de 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">1. Introdução</h2>
            <p>A Conecta Fisco respeita sua privacidade e está comprometida em proteger seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">2. Dados que Coletamos</h2>
            <p>Coletamos informações como nome, e-mail, telefone e dados de navegação (cookies, IP, páginas visitadas) para melhorar sua experiência.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">3. Uso de Cookies e Publicidade</h2>
            <p>Utilizamos cookies próprios e de terceiros, incluindo Google AdSense, para personalizar conteúdo e anúncios. O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios em nosso site. O uso do cookie DART permite que o Google exiba anúncios para os usuários com base em visitas a este site e a outros sites na Internet.</p>
            <p className="mt-2">Os usuários podem desativar o uso do cookie DART acessando a <a href="https://policies.google.com/technologies/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">página de políticas de anúncios e da rede de conteúdo do Google</a>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">4. Compartilhamento de Dados</h2>
            <p>Não vendemos seus dados. Podemos compartilhar com parceiros de tecnologia (Google Analytics, AdSense) e quando exigido por lei.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">5. Seus Direitos (LGPD)</h2>
            <p>Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados a qualquer momento pelo e-mail contato@conectafisco.com.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">6. Segurança</h2>
            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">7. Contato</h2>
            <p>Dúvidas sobre esta política: contato@conectafisco.com | (15) 3013-7302</p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default PoliticaPrivacidade;
