
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Artigo from "./pages/Artigo";
import NotFound from "./pages/NotFound";

// Code-splitting: rotas secundárias carregadas sob demanda para reduzir o bundle inicial
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const Softwares = lazy(() => import("./pages/Softwares"));
const Consultoria = lazy(() => import("./pages/Consultoria"));
const Ferramentas = lazy(() => import("./pages/Ferramentas"));
const Cursos = lazy(() => import("./pages/Cursos"));
const EAD = lazy(() => import("./pages/EAD"));
const Presencial = lazy(() => import("./pages/Presencial"));
const InCompany = lazy(() => import("./pages/InCompany"));
const Contato = lazy(() => import("./pages/Contato"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Suporte = lazy(() => import("./pages/Suporte"));
const ICMSEstados = lazy(() => import("./pages/ICMSEstados"));
const ICMSRegulamentos = lazy(() => import("./pages/ICMSRegulamentos"));
const CLTComentada = lazy(() => import("./pages/CLTComentada"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosUso = lazy(() => import("./pages/TermosUso"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));
const SobreAnuncios = lazy(() => import("./pages/SobreAnuncios"));
const Topico = lazy(() => import("./pages/Topico"));
const PoliticaEditorial = lazy(() => import("./pages/PoliticaEditorial"));
const Transparencia = lazy(() => import("./pages/Transparencia"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
    Carregando…
  </div>
);

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/softwares" element={<Softwares />} />
        <Route path="/consultoria" element={<Consultoria />} />
        <Route path="/ferramentas" element={<Ferramentas />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/ead" element={<EAD />} />
        <Route path="/cursos/presencial" element={<Presencial />} />
        <Route path="/cursos/incompany" element={<InCompany />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/icms" element={<ICMSEstados />} />
        <Route path="/icms-regulamentos" element={<ICMSRegulamentos />} />
        <Route path="/clt-comentada" element={<CLTComentada />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/termos-uso" element={<TermosUso />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/sobre-anuncios" element={<SobreAnuncios />} />
        <Route path="/topico/:slug" element={<Topico />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/artigo/:slug" element={<Artigo />} />
        <Route path="/politica-editorial" element={<PoliticaEditorial />} />
        <Route path="/transparencia" element={<Transparencia />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
      <CookieConsent />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AdminProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
