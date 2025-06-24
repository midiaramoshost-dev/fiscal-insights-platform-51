
import { Play, Clock, Users, Award, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useState } from "react";

const EAD = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cursosEAD = [
    {
      titulo: "SPED Fiscal Completo",
      descricao: "Domine todas as obrigações do SPED Fiscal",
      duracao: "40h",
      aulas: "32 aulas",
      nivel: "Intermediário",
      preco: "R$ 297,00",
      promocao: "R$ 197,00",
      categoria: "SPED",
      destaque: true
    },
    {
      titulo: "Simples Nacional na Prática",
      descricao: "Tudo sobre o regimento tributário mais usado no Brasil",
      duracao: "24h",
      aulas: "18 aulas",
      nivel: "Básico",
      preco: "R$ 197,00",
      promocao: null,
      categoria: "Tributário",
      destaque: false
    },
    {
      titulo: "Planejamento Tributário Avançado",
      descricao: "Estratégias avançadas para otimização fiscal",
      duracao: "60h",
      aulas: "48 aulas",
      nivel: "Avançado",
      preco: "R$ 497,00",
      promocao: "R$ 397,00",
      categoria: "Planejamento",
      destaque: true
    },
    {
      titulo: "eSocial Completo",
      descricao: "Implementação e operação do eSocial",
      duracao: "35h",
      aulas: "28 aulas",
      nivel: "Intermediário",
      preco: "R$ 297,00",
      promocao: null,
      categoria: "Trabalhista",
      destaque: false
    },
    {
      titulo: "Contabilidade Gerencial",
      descricao: "Análise de demonstrações e indicadores",
      duracao: "30h",
      aulas: "24 aulas",
      nivel: "Intermediário",
      preco: "R$ 247,00",
      promocao: null,
      categoria: "Contabilidade",
      destaque: false
    },
    {
      titulo: "Recuperação de Créditos Tributários",
      descricao: "Como recuperar créditos de PIS, COFINS e outros",
      duracao: "28h",
      aulas: "22 aulas",
      nivel: "Avançado",
      preco: "R$ 397,00",
      promocao: "R$ 297,00",
      categoria: "Recuperação",
      destaque: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Cursos EAD
            </h1>
            <p className="text-xl text-slate-600">
              Aprenda no seu ritmo, onde e quando quiser
            </p>
          </div>

          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Play className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-slate-800">Acesso Vitalício</h3>
                  <p className="text-sm text-slate-600">Assista quantas vezes quiser</p>
                </div>
                <div className="flex flex-col items-center">
                  <BookOpen className="w-8 h-8 text-emerald-600 mb-2" />
                  <h3 className="font-semibold text-slate-800">Material Incluso</h3>
                  <p className="text-sm text-slate-600">PDFs e planilhas de apoio</p>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-slate-800">Certificado</h3>
                  <p className="text-sm text-slate-600">Válido em todo território nacional</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-8 h-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-slate-800">Suporte</h3>
                  <p className="text-sm text-slate-600">Tire dúvidas com os instrutores</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursosEAD.map((curso, index) => (
              <Card key={index} className={`bg-white shadow-lg hover:shadow-xl transition-shadow ${curso.destaque ? 'ring-2 ring-blue-200' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-slate-800 mb-2">{curso.titulo}</CardTitle>
                      <p className="text-slate-600 text-sm mb-3">{curso.descricao}</p>
                    </div>
                    {curso.destaque && (
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-400">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{curso.categoria}</Badge>
                    <Badge variant="outline">{curso.nivel}</Badge>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {curso.duracao} • {curso.aulas}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {curso.promocao ? (
                        <div>
                          <span className="text-lg line-through text-slate-400">{curso.preco}</span>
                          <span className="text-2xl font-bold text-green-600 ml-2">{curso.promocao}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">{curso.preco}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                      Matricular-se Agora
                    </Button>
                    <Button variant="outline" className="w-full">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-center text-slate-800">
                Ainda tem dúvidas sobre nossos cursos EAD?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6">
                Entre em contato conosco e tire todas as suas dúvidas. Nossa equipe está pronta para ajudar!
              </p>
              <div className="space-x-4">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  Falar com Consultor
                </Button>
                <Button variant="outline">
                  Ver Planos de Assinatura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EAD;
