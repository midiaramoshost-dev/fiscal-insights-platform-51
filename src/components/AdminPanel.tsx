
import { Users, FileText, Settings, BarChart3, Calendar, Book, ShoppingCart, MessageSquare, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const stats = [
    { label: "Usuários Ativos", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Artigos Publicados", value: "1,234", change: "+8%", icon: FileText, color: "text-emerald-600" },
    { label: "Cursos Ativos", value: "47", change: "+3%", icon: Book, color: "text-purple-600" },
    { label: "Vendas do Mês", value: "R$ 45.2k", change: "+18%", icon: ShoppingCart, color: "text-orange-600" }
  ];

  const recentUsers = [
    { nome: "João Silva", email: "joao@email.com", plano: "Premium", status: "Ativo" },
    { nome: "Maria Santos", email: "maria@email.com", plano: "Básico", status: "Ativo" },
    { nome: "Pedro Costa", email: "pedro@email.com", plano: "Premium", status: "Pendente" },
    { nome: "Ana Oliveira", email: "ana@email.com", plano: "Corporativo", status: "Ativo" }
  ];

  const recentContent = [
    { titulo: "IN RFB nº 2.201/2024", tipo: "Legislação", autor: "Admin", status: "Publicado" },
    { titulo: "Curso eSocial Avançado", tipo: "Curso", autor: "Prof. Silva", status: "Rascunho" },
    { titulo: "Manual SPED Fiscal", tipo: "Publicação", autor: "Equipe", status: "Revisão" },
    { titulo: "Calculadora INSS", tipo: "Ferramenta", autor: "Dev Team", status: "Publicado" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao Site</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="text-lg font-semibold text-slate-800">Conecta Fisco</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Painel Administrativo</h1>
            <p className="text-slate-600 mt-1">Gerencie sua plataforma fiscal</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} vs mês anterior
                      </p>
                    </div>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="usuarios" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="usuarios" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="conteudo" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger value="cursos" className="flex items-center space-x-2">
              <Book className="w-4 h-4" />
              <span>Cursos</span>
            </TabsTrigger>
            <TabsTrigger value="vendas" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Vendas</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="configuracoes" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Config</span>
            </TabsTrigger>
          </TabsList>

          {/* Gestão de Usuários */}
          <TabsContent value="usuarios" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Gestão de Usuários</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Exportar</Button>
                <Button>Novo Usuário</Button>
              </div>
            </div>
            
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{user.nome}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.plano === "Premium" ? "default" : "secondary"}>
                            {user.plano}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm">Bloquear</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestão de Conteúdo */}
          <TabsContent value="conteudo" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Gestão de Conteúdo</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Importar</Button>
                <Button>Novo Artigo</Button>
              </div>
            </div>
            
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentContent.map((content, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{content.titulo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{content.tipo}</Badge>
                        </TableCell>
                        <TableCell>{content.autor}</TableCell>
                        <TableCell>
                          <Badge variant={content.status === "Publicado" ? "default" : "secondary"}>
                            {content.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm">Publicar</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outras abas com conteúdo placeholder */}
          <TabsContent value="cursos">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Cursos</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Interface para gerenciar cursos, módulos e matrículas.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendas">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Dashboard de vendas e análise de receita.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Avançado</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Métricas detalhadas de acesso e engajamento.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Configurações gerais da plataforma e integrações.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
