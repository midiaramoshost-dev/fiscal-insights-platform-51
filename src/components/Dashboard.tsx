
import { Bell, BookOpen, Calendar, Download, TrendingUp, User, Settings, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const cursosProgresso = [
    { nome: "eSocial Avançado", progresso: 75, modulos: 12, concluidos: 9 },
    { nome: "SPED Fiscal", progresso: 40, modulos: 8, concluidos: 3 },
    { nome: "Reforma Tributária", progresso: 90, modulos: 6, concluidos: 5 }
  ];

  const alertas = [
    { tipo: "urgente", titulo: "DARF vence em 3 dias", data: "2024-01-20" },
    { tipo: "info", titulo: "Nova legislação ICMS-SP", data: "2024-01-18" },
    { tipo: "curso", titulo: "Novo módulo disponível", data: "2024-01-17" }
  ];

  const recentes = [
    { tipo: "artigo", titulo: "IN RFB nº 2.201/2024 - eSocial", tempo: "2 horas atrás" },
    { tipo: "ferramenta", titulo: "Calculadora de INSS", tempo: "1 dia atrás" },
    { tipo: "download", titulo: "Manual SPED Fiscal", tempo: "2 dias atrás" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="container mx-auto">
        {/* Header do Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-600 mt-1">Bem-vindo de volta, João Silva!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Cursos Ativos</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Downloads</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <Download className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Obrigações</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Alertas</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <Bell className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progresso dos Cursos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Meus Cursos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cursosProgresso.map((curso, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-800">{curso.nome}</h4>
                      <span className="text-sm text-slate-600">
                        {curso.concluidos}/{curso.modulos} módulos
                      </span>
                    </div>
                    <Progress value={curso.progresso} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{curso.progresso}% concluído</span>
                      <Button variant="outline" size="sm">
                        Continuar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentes.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      item.tipo === 'artigo' ? 'bg-blue-500' :
                      item.tipo === 'ferramenta' ? 'bg-emerald-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-slate-800">{item.titulo}</h4>
                      <p className="text-xs text-slate-600">{item.tempo}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.tipo}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Direita */}
          <div className="space-y-6">
            {/* Alertas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <span>Alertas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alertas.map((alerta, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    alerta.tipo === 'urgente' ? 'bg-red-50 border-red-500' :
                    alerta.tipo === 'info' ? 'bg-blue-50 border-blue-500' : 'bg-emerald-50 border-emerald-500'
                  }`}>
                    <h4 className="font-medium text-sm text-slate-800">{alerta.titulo}</h4>
                    <p className="text-xs text-slate-600 mt-1">{alerta.data}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Configurações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-slate-600" />
                  <span>Configurações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferências
                </Button>
              </CardContent>
            </Card>

            {/* Status da Assinatura */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Plano Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Renovação</span>
                    <span className="text-sm font-medium">15/02/2024</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    Gerenciar Assinatura
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
