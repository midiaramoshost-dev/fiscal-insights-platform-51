
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search } from "lucide-react";

interface ConsultaCodigosFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultaCodigosForm = ({ isOpen, onClose }: ConsultaCodigosFormProps) => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Array<{
    codigo: string;
    descricao: string;
    tipo: string;
  }>>([]);

  // Base de dados simulada de códigos de receita
  const codigosReceita = [
    { codigo: '0112', descricao: 'Imposto sobre a Renda Pessoa Física', tipo: 'IRPF' },
    { codigo: '0220', descricao: 'Imposto sobre a Renda Pessoa Jurídica', tipo: 'IRPJ' },
    { codigo: '0561', descricao: 'Contribuição Social sobre o Lucro Líquido', tipo: 'CSLL' },
    { codigo: '0588', descricao: 'PIS/PASEP', tipo: 'PIS' },
    { codigo: '0621', descricao: 'COFINS', tipo: 'COFINS' },
    { codigo: '0648', descricao: 'Contribuição Previdenciária sobre a Receita Bruta', tipo: 'CPP' },
    { codigo: '1007', descricao: 'Multa de Mora - IRPF', tipo: 'Multa' },
    { codigo: '1708', descricao: 'IOF - Operações de Crédito', tipo: 'IOF' },
    { codigo: '2172', descricao: 'Simples Nacional - DAS', tipo: 'Simples' },
    { codigo: '3280', descricao: 'ITR - Imposto Territorial Rural', tipo: 'ITR' }
  ];

  const buscarCodigos = () => {
    if (!busca.trim()) {
      setResultados([]);
      return;
    }

    const filtrados = codigosReceita.filter(codigo => 
      codigo.codigo.includes(busca) || 
      codigo.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      codigo.tipo.toLowerCase().includes(busca.toLowerCase())
    );

    setResultados(filtrados);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      buscarCodigos();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>Consulta de Códigos de Receita</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Código de Receita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="busca">Código, descrição ou tipo</Label>
                  <Input
                    id="busca"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ex: 0112, IRPF, Simples Nacional..."
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={buscarCodigos}
                    className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {resultados.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resultados da Consulta ({resultados.length} encontrado{resultados.length > 1 ? 's' : ''})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resultados.map((resultado, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-lg font-bold text-blue-600">{resultado.codigo}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {resultado.tipo}
                            </span>
                          </div>
                          <p className="text-slate-700">{resultado.descricao}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {busca && resultados.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-slate-600">Nenhum código encontrado para a busca "{busca}"</p>
                <p className="text-sm text-slate-500 mt-2">
                  Tente buscar por código numérico, descrição ou tipo de tributo
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="text-sm">Códigos Mais Consultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>• 0112 - IRPF</div>
                <div>• 0220 - IRPJ</div>
                <div>• 2172 - Simples Nacional</div>
                <div>• 0588 - PIS/PASEP</div>
                <div>• 0621 - COFINS</div>
                <div>• 0561 - CSLL</div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultaCodigosForm;
