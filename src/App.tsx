
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
