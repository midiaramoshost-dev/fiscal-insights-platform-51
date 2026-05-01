import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Conecta Fisco</h3>
            <p className="text-slate-300 text-sm mb-3">
              Plataforma completa de informações fiscais, tributárias, contábeis e trabalhistas para profissionais e empresas.
            </p>
            <div className="space-y-1 text-sm text-slate-300">
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> (15) 3013-7302</div>
              <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> contato@conectafisco.com</div>
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Sorocaba/SP</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Conteúdo</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/clt-comentada" className="hover:text-white">CLT Comentada</Link></li>
              <li><Link to="/icms" className="hover:text-white">ICMS por Estado</Link></li>
              <li><Link to="/ferramentas" className="hover:text-white">Ferramentas</Link></li>
              <li><Link to="/newsletter" className="hover:text-white">Newsletter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Institucional</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/quem-somos" className="hover:text-white">Quem Somos</Link></li>
              <li><Link to="/contato" className="hover:text-white">Contato</Link></li>
              <li><Link to="/suporte" className="hover:text-white">Suporte</Link></li>
              <li><Link to="/cursos" className="hover:text-white">Cursos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/politica-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
              <li><Link to="/termos-uso" className="hover:text-white">Termos de Uso</Link></li>
              <li><Link to="/politica-cookies" className="hover:text-white">Política de Cookies</Link></li>
              <li><Link to="/sobre-anuncios" className="hover:text-white">Sobre os Anúncios</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Conecta Fisco. Todos os direitos reservados.</p>
          <p className="mt-1 text-xs">CNPJ: XX.XXX.XXX/0001-XX | Conteúdo educacional - não substitui consultoria profissional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
