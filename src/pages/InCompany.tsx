
import { Building, Users, Target, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useState } from "react";

const InCompany = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const vantagens = [
    "Treinamento customizado para sua empresa",
    "Instrutores especializados na sua área",
    "Flexibilidade de horários e datas",
    "Material didático personalizado",
    "Economia com deslocamento da equipe",
    "Maior interação entre colaboradores"
  ];

  const modalidades = [
    {
      titulo: "Presencial",
      descricao: "Instrutor na sua empresa",
      detalhes: ["Mínimo: 8 participantes", "Duração: Conforme necessidade", "Material incluso"]
    },
    {
      titulo: "Online ao Vivo",
      descricao: "Treinamento via videoconferência",
      detalhes: ["Mínimo: 5 participantes", "Plataforma própria", "Gravação disponível"]
    },
    {
      titulo: "Híbrido",
      descricao: "Combinação presencial e online",
      detalhes: ["Flexibilidade máxima", "Adaptado à sua realidade", "Acompanhamento contínuo"]
    }
  ];

  const temasSugeridos = [
    "SPED Fiscal e Contábil",
    "Simples Nacional",
    "Planejamento Tributário",
    "eSocial",
    "Auditoria Fiscal",
    "Contabilidade Gerencial",
    "Recuperação de Créditos",
    "Compliance Fiscal"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Treinamentos In Company
            </h1>
            <p className="text-xl text-slate-600">
              Capacitação personalizada para sua equipe
            </p>
          </div>

          <Card className="mb-12 bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800 justify-center">
                <Target className="w-6 h-6 mr-3" />
                Por que escolher Treinamento In Company?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vantagens.map((vantagem, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    <span className="text-slate-600">{vantagem}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Modalidades Disponíveis</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {modalidades.map((modalidade, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-slate-800">{modalidade.titulo}</CardTitle>
                    <p className="text-slate-600">{modalidade.descricao}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {modalidade.detalhes.map((detalhe, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {detalhe}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-800">
                  <Building className="w-6 h-6 mr-3" />
                  Temas Mais Solicitados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {temasSugeridos.map((tema, index) => (
                    <div key={index} className="p-2 bg-slate-50 rounded-lg text-sm text-slate-700">
                      {tema}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Users className="w-6 h-6 mr-3" />
                  Como Funciona
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Diagnóstico</h4>
                      <p className="text-sm text-slate-600">Identificamos as necessidades da sua equipe</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Customização</h4>
                      <p className="text-sm text-slate-600">Desenvolvemos conteúdo específico</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Execução</h4>
                      <p className="text-sm text-slate-600">Realizamos o treinamento na sua empresa</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center text-slate-800">
                Interessado em um Treinamento In Company?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 mb-6">
                Entre em contato conosco para uma proposta personalizada. Faremos um diagnóstico gratuito das necessidades da sua equipe.
              </p>
              <div className="space-x-4">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                  Solicitar Proposta
                </Button>
                <Button variant="outline">
                  Agendar Reunião
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InCompany;
