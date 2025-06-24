
import { MapPin, Calendar, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useState } from "react";

const Presencial = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cursosPresenciais = [
    {
      titulo: "Workshop SPED Fiscal",
      descricao: "Intensivo prático sobre SPED Fiscal",
      duracao: "8h",
      data: "25/03/2024",
      horario: "08:00 às 17:00",
      local: "São Paulo - SP",
      vagas: "15 vagas",
      preco: "R$ 450,00",
      instrutor: "Carlos Silva",
      nivel: "Intermediário"
    },
    {
      titulo: "Simples Nacional - Casos Práticos",
      descricao: "Resolução de casos reais do Simples Nacional",
      duracao: "16h",
      data: "08/04/2024",
      horario: "08:00 às 17:00",
      local: "Rio de Janeiro - RJ",
      vagas: "20 vagas",
      preco: "R$ 650,00",
      instrutor: "Ana Santos",
      nivel: "Básico"
    },
    {
      titulo: "Planejamento Tributário Avançado",
      descricao: "Estratégias avançadas de planejamento",
      duracao: "24h",
      data: "15/04/2024",
      horario: "08:00 às 17:00",
      local: "Belo Horizonte - MG",
      vagas: "12 vagas",
      preco: "R$ 850,00",
      instrutor: "Roberto Lima",
      nivel: "Avançado"
    },
    {
      titulo: "eSocial na Prática",
      descricao: "Implementação e operação do eSocial",
      duracao: "12h",
      data: "22/04/2024",
      horario: "08:00 às 17:00",
      local: "Porto Alegre - RS",
      vagas: "18 vagas",
      preco: "R$ 550,00",
      instrutor: "Mariana Costa",
      nivel: "Intermediário"
    }
  ];

  const cidades = [
    { nome: "São Paulo", cursos: 12 },
    { nome: "Rio de Janeiro", cursos: 8 },
    { nome: "Belo Horizonte", cursos: 6 },
    { nome: "Porto Alegre", cursos: 5 },
    { nome: "Salvador", cursos: 4 },
    { nome: "Brasília", cursos: 7 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Cursos Presenciais
            </h1>
            <p className="text-xl text-slate-600">
              Interação direta com instrutores especialistas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">Vantagens dos Cursos Presenciais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Users className="w-5 h-5 mr-3 text-green-500 mt-0.5" />
                    <span className="text-slate-600">Interação direta com instrutor e colegas</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-green-500 mt-0.5" />
                    <span className="text-slate-600">Networking com profissionais da área</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-green-500 mt-0.5" />
                    <span className="text-slate-600">Cronograma estruturado de aprendizagem</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 text-green-500 mt-0.5" />
                    <span className="text-slate-600">Exercícios práticos em grupo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-700">Cidades Atendidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {cidades.map((cidade, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="font-medium text-slate-700">{cidade.nome}</span>
                      <Badge variant="secondary">{cidade.cursos} cursos</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Próximos Cursos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cursosPresenciais.map((curso, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-slate-800">{curso.titulo}</CardTitle>
                      <Badge variant="outline">{curso.nivel}</Badge>
                    </div>
                    <p className="text-slate-600">{curso.descricao}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {curso.data} • {curso.horario}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {curso.local}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {curso.duracao} • {curso.vagas}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Users className="w-4 h-4 mr-2" />
                        Instrutor: {curso.instrutor}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">{curso.preco}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                        Inscrever-se
                      </Button>
                      <Button variant="outline" className="w-full">
                        Mais Informações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-center text-slate-800">
                Não encontrou um curso na sua cidade?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6">
                Entre em contato conosco! Podemos organizar um curso presencial na sua região com um grupo mínimo de participantes.
              </p>
              <div className="space-x-4">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  Solicitar Curso na Minha Cidade
                </Button>
                <Button variant="outline">
                  Ver Cursos EAD
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Presencial;
