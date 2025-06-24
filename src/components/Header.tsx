
import { Search, User, ShoppingCart, Menu, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b border-blue-100">
      {/* Top Bar */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center space-x-4">
              <span>📞 (11) 3000-0000</span>
              <span>✉️ contato@conectafisco.com.br</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-100" asChild>
                <Link to="/newsletter">Newsletter</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-100" asChild>
                <Link to="/quem-somos">Quem Somos</Link>
              </Button>
            </div>
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Conecta Fisco
              </h1>
              <p className="text-sm text-slate-600">Conectando você ao universo fiscal</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar legislação, normas, cursos..."
                className="pl-10 pr-4 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* User Area */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                    3
                  </Badge>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">Minha Conta</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Meus Cursos</DropdownMenuItem>
                    <DropdownMenuItem>Assinatura</DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Painel Admin
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                >
                  Cadastre-se
                </Button>
              </div>
            )}
            
            <Button variant="ghost" size="sm">
              <ShoppingCart className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 hidden md:block">
          <div className="flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium hover:text-blue-600">
                  Produtos
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/softwares">Softwares Fiscais</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/consultoria">Consultoria Especializada</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ferramentas">Ferramentas Online</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium hover:text-blue-600">
                  Cursos
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/cursos/ead">Cursos EAD</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cursos/presencial">Cursos Presenciais</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cursos/incompany">Treinamentos In Company</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="font-medium hover:text-blue-600" asChild>
              <Link to="/suporte">Suporte</Link>
            </Button>
            
            <Button variant="ghost" className="font-medium hover:text-blue-600" asChild>
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
