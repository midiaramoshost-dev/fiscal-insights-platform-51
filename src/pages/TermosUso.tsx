import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Termos de Uso | Conecta Fisco</title>
        <meta name="description" content="Termos e Condições de Uso da plataforma Conecta Fisco. Leia antes de utilizar nossos serviços fiscais e tributários." />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/termos-uso" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-slate-800">Termos de Uso</h1>
          <p className="text-sm text-muted-foreground mb-8">Última atualização: 01 de maio de 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar a Conecta Fisco, você concorda com estes Termos de Uso. Caso não concorde, por favor não utilize a plataforma.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">2. Natureza do Serviço</h2>
            <p>A Conecta Fisco oferece conteúdo informativo, ferramentas, cursos e consultoria nas áreas fiscal, tributária, contábil e trabalhista. As informações são de caráter educacional e não substituem consulta profissional individualizada.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">3. Propriedade Intelectual</h2>
            <p>Todo o conteúdo (textos, comentários da CLT, análises, marca, layout) é protegido por direitos autorais. É proibida a reprodução sem autorização prévia.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">4. Conduta do Usuário</h2>
            <p>O usuário concorda em não utilizar a plataforma para fins ilícitos, não tentar acessar áreas restritas e não publicar conteúdo ofensivo.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">5. Limitação de Responsabilidade</h2>
            <p>A Conecta Fisco se esforça para manter as informações atualizadas, mas não se responsabiliza por decisões tomadas exclusivamente com base no conteúdo do site. Recomendamos consultoria profissional.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">6. Publicidade</h2>
            <p>O site exibe anúncios de terceiros (Google AdSense e parceiros) para sustentar o acesso gratuito ao conteúdo.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">7. Alterações</h2>
            <p>Estes termos podem ser atualizados a qualquer momento. Recomendamos verificação periódica.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">8. Foro</h2>
            <p>Fica eleito o foro da comarca de Sorocaba/SP para dirimir quaisquer questões decorrentes destes Termos.</p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default TermosUso;
