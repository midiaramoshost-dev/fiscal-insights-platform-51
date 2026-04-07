
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Phone, Mail, User, Menu } from "lucide-react";
import { useState } from "react";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>(15) 30137302</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-3 h-3" />
              <span>contato@conectafisco.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300 text-xs">Acesso livre a todo conteúdo</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Conecta Fisco</h1>
              <p className="text-sm text-slate-600">Soluções Fiscais Completas</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/quem-somos" className="text-slate-700 hover:text-blue-600 transition-colors">
              Quem Somos
            </Link>
            
            <div className="relative group">
              <button className="text-slate-700 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <span>Produtos</span>
              </button>
              <div className="absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <Link to="/softwares" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    Softwares
                  </Link>
                  <Link to="/consultoria" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    Consultoria
                  </Link>
                  <Link to="/ferramentas" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    Ferramentas
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-slate-700 hover:text-blue-600 transition-colors flex items-center space-x-1">
                <span>Cursos</span>
              </button>
              <div className="absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <Link to="/cursos/ead" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    EAD
                  </Link>
                  <Link to="/cursos/presencial" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    Presencial
                  </Link>
                  <Link to="/cursos/incompany" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    In Company
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/contato" className="text-slate-700 hover:text-blue-600 transition-colors">
              Contato
            </Link>
            <Link to="/newsletter" className="text-slate-700 hover:text-blue-600 transition-colors">
              Newsletter
            </Link>
            <Link to="/suporte" className="text-slate-700 hover:text-blue-600 transition-colors">
              Suporte
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={toggleMenu}
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-slate-200 space-y-2">
            <Link 
              to="/quem-somos" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </Link>
            <Link 
              to="/softwares" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Softwares
            </Link>
            <Link 
              to="/consultoria" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Consultoria
            </Link>
            <Link 
              to="/ferramentas" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ferramentas
            </Link>
            <Link 
              to="/cursos/ead" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cursos EAD
            </Link>
            <Link 
              to="/cursos/presencial" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cursos Presenciais
            </Link>
            <Link 
              to="/cursos/incompany" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              In Company
            </Link>
            <Link 
              to="/contato" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link 
              to="/newsletter" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Newsletter
            </Link>
            <Link 
              to="/suporte" 
              className="block py-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Suporte
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
