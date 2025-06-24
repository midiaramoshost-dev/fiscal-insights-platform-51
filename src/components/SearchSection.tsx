
import { Search, Filter, Calendar, Building, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import CadastroAcessoForm from "./forms/CadastroAcessoForm";

const SearchSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  const handleProtectedSearch = () => {
    setFormOpen(true);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Search className="w-5 h-5 text-blue-600" />
            <span>Busca Avançada de Atos e Legislação</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Tipo de Ato
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lei">Lei</SelectItem>
                  <SelectItem value="decreto">Decreto</SelectItem>
                  <SelectItem value="portaria">Portaria</SelectItem>
                  <SelectItem value="instrucao-normativa">Instrução Normativa</SelectItem>
                  <SelectItem value="resolucao">Resolução</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Número</label>
              <Input placeholder="Ex: 123/2024" className="border-slate-300" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Ano
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Building className="w-4 h-4 mr-1" />
                Órgão Emissor
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Órgão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita-federal">Receita Federal</SelectItem>
                  <SelectItem value="fazenda-sp">Fazenda - SP</SelectItem>
                  <SelectItem value="fazenda-rj">Fazenda - RJ</SelectItem>
                  <SelectItem value="ministerio-trabalho">Min. do Trabalho</SelectItem>
                  <SelectItem value="banco-central">Banco Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Palavra-chave</label>
            <div className="flex space-x-2">
              <Input 
                placeholder="Digite palavras-chave para buscar..." 
                className="flex-1 border-slate-300"
              />
              <Button 
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                onClick={handleProtectedSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar 🔐
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleProtectedSearch}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados 🔐
            </Button>
            <span className="text-sm text-slate-600">
              Mais de 50.000 documentos catalogados
            </span>
          </div>
        </CardContent>
      </Card>

      <CadastroAcessoForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        menuTitle="Busca Avançada de Atos e Legislação"
      />
    </>
  );
};

export default SearchSection;
