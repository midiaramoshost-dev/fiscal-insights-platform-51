
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
import NotFound from "./pages/NotFound";
import AdminPanel from "./components/AdminPanel";
import QuemSomos from "./pages/QuemSomos";
import Softwares from "./pages/Softwares";
import Consultoria from "./pages/Consultoria";
import Ferramentas from "./pages/Ferramentas";
import Cursos from "./pages/Cursos";
import EAD from "./pages/EAD";
import Presencial from "./pages/Presencial";
import InCompany from "./pages/InCompany";
import Contato from "./pages/Contato";
import Newsletter from "./pages/Newsletter";
import Suporte from "./pages/Suporte";
import ICMSEstados from "./pages/ICMSEstados";
import ICMSRegulamentos from "./pages/ICMSRegulamentos";
import CLTComentada from "./pages/CLTComentada";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import PoliticaCookies from "./pages/PoliticaCookies";
import SobreAnuncios from "./pages/SobreAnuncios";
import Topico from "./pages/Topico";

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
