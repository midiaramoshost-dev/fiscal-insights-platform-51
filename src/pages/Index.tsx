import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ContentFeeds from "@/components/ContentFeeds";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Helmet>
        <title>Conecta Fisco - Plataforma Fiscal, Tributária e Trabalhista</title>
        <meta name="description" content="Legislação atualizada, CLT comentada, ICMS por estado, calculadoras e cursos para contadores e empresas." />
        <link rel="canonical" href="https://fiscal-insights-platform-51.lovable.app/" />
      </Helmet>
      <Header />
      <SubHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <LeftSidebar />
          </div>
          
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <Hero />
            <SearchSection />
            <ContentFeeds />
          </div>
          
          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
