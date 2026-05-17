import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, DollarSign, Users, Mail } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Breadcrumbs from "@/components/Breadcrumbs";

const Transparencia = () => (
  <div className="min-h-screen bg-slate-50">
    <Helmet>
      <title>Transparência | Conecta Fisco</title>
      <meta name="description" content="Página de transparência do Conecta Fisco: modelo de negócio, financiamento por publicidade, equipe e canais de contato." />
      <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/transparencia" />
    </Helmet>
    <Header />
    <SubHeader />
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={[{ label: "Transparência" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Transparência</h1>
      <p className="text-slate-600 mb-6">Como o Conecta Fisco se sustenta, quem está por trás do portal e como você pode nos contatar.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card><CardContent className="p-5 space-y-2"><Eye className="w-5 h-5 text-blue-600" /><h2 className="font-semibold text-slate-800">Quem somos</h2><p className="text-sm text-slate-600">Equipe de contadores, advogados tributaristas e jornalistas com sede em Sorocaba/SP, CNPJ 14.752.276/0001-30.</p></CardContent></Card>
        <Card><CardContent className="p-5 space-y-2"><DollarSign className="w-5 h-5 text-emerald-600" /><h2 className="font-semibold text-slate-800">Como nos sustentamos</h2><p className="text-sm text-slate-600">100% gratuito ao leitor. Financiamento por publicidade programática (Google AdSense) e parcerias institucionais identificadas.</p></CardContent></Card>
        <Card><CardContent className="p-5 space-y-2"><Users className="w-5 h-5 text-purple-600" /><h2 className="font-semibold text-slate-800">Equipe editorial</h2><p className="text-sm text-slate-600">Autores identificados em cada artigo, com cargo e biografia profissional. Currículos disponíveis sob solicitação.</p></CardContent></Card>
        <Card><CardContent className="p-5 space-y-2"><Mail className="w-5 h-5 text-orange-600" /><h2 className="font-semibold text-slate-800">Contato direto</h2><p className="text-sm text-slate-600">Redação: <a href="mailto:editorial@conectafisco.com" className="text-blue-700 hover:underline">editorial@conectafisco.com</a><br/>Comercial: <a href="mailto:contato@conectafisco.com" className="text-blue-700 hover:underline">contato@conectafisco.com</a></p></CardContent></Card>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-3">Publicidade e separação de conteúdo</h2>
      <p className="text-slate-700 mb-3">Anúncios são fornecidos por redes programáticas (Google AdSense) e ficam sempre identificados com o rótulo <em>"Publicidade"</em>. A redação não tem qualquer influência sobre os anúncios exibidos, e os anunciantes não influenciam o conteúdo editorial.</p>
      <p className="text-slate-700 mb-3">Eventuais conteúdos patrocinados ou em parceria comercial serão sinalizados com etiqueta <em>"Conteúdo Patrocinado"</em> ou <em>"Parceria"</em>.</p>

      <h2 className="text-2xl font-bold text-slate-900 mb-3 mt-6">Dados e privacidade</h2>
      <p className="text-slate-700">Tratamos dados pessoais conforme nossa <a href="/politica-privacidade" className="text-blue-700 hover:underline">Política de Privacidade</a> e <a href="/politica-cookies" className="text-blue-700 hover:underline">Política de Cookies</a>, em conformidade com a LGPD (Lei 13.709/2018).</p>
    </main>
  </div>
);

export default Transparencia;
