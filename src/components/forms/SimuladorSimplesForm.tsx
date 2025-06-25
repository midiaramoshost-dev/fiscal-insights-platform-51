
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimuladorSimplesFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimuladorSimplesForm = ({ isOpen, onClose }: SimuladorSimplesFormProps) => {
  const [faturamento, setFaturamento] = useState('');
  const [atividade, setAtividade] = useState('');
  const [resultado, setResultado] = useState<{
    faturamento: number;
    aliquota: number;
    impostos: number;
    anexo: string;
  } | null>(null);

  const { toast } = useToast();

  const calcularSimples = () => {
    const valor = parseFloat(faturamento.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (!valor || valor <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor válido.",
        variant: "destructive"
      });
      return;
    }

    if (!atividade) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma atividade.",
        variant: "destructive"
      });
      return;
    }

    // Tabelas simplificadas do Simples Nacional 2024
    let aliquota = 0;
    let anexo = '';

    const faturamentoAnual = valor * 12; // Estimativa anual

    switch (atividade) {
      case 'comercio':
        anexo = 'Anexo I - Comércio';
        if (faturamentoAnual <= 180000) aliquota = 4.0;
        else if (faturamentoAnual <= 360000) aliquota = 7.3;
        else if (faturamentoAnual <= 720000) aliquota = 9.5;
        else if (faturamentoAnual <= 1800000) aliquota = 10.7;
        else if (faturamentoAnual <= 3600000) aliquota = 14.3;
        else aliquota = 19.0;
        break;
      
      case 'industria':
        anexo = 'Anexo II - Indústria';
        if (faturamentoAnual <= 180000) aliquota = 4.5;
        else if (faturamentoAnual <= 360000) aliquota = 7.8;
        else if (faturamentoAnual <= 720000) aliquota = 10.0;
        else if (faturamentoAnual <= 1800000) aliquota = 11.2;
        else if (faturamentoAnual <= 3600000) aliquota = 14.7;
        else aliquota = 30.0;
        break;
      
      case 'servicos':
        anexo = 'Anexo III - Serviços';
        if (faturamentoAnual <= 180000) aliquota = 6.0;
        else if (faturamentoAnual <= 360000) aliquota = 11.2;
        else if (faturamentoAnual <= 720000) aliquota = 13.5;
        else if (faturamentoAnual <= 1800000) aliquota = 16.0;
        else if (faturamentoAnual <= 3600000) aliquota = 21.0;
        else aliquota = 33.0;
        break;
      
      default:
        aliquota = 6.0;
        anexo = 'Anexo III - Serviços';
    }

    const impostos = valor * (aliquota / 100);

    setResultado({
      faturamento: valor,
      aliquota,
      impostos,
      anexo
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleFaturamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2).replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setFaturamento('R$ ' + value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Percent className="w-5 h-5 text-blue-500" />
            <span>Simulador Simples Nacional</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados para Simulação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="faturamento">Faturamento Mensal</Label>
                <Input
                  id="faturamento"
                  value={faturamento}
                  onChange={handleFaturamentoChange}
                  placeholder="R$ 0,00"
                />
              </div>
              
              <div>
                <Label htmlFor="atividade">Tipo de Atividade</Label>
                <Select value={atividade} onValueChange={setAtividade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calcularSimples}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
              >
                Simular Tributos
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader>
                <CardTitle>Resultado da Simulação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Enquadramento</p>
                  <p className="text-lg font-bold text-blue-800">{resultado.anexo}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Faturamento Mensal</p>
                    <p className="text-lg font-bold text-green-800">{formatCurrency(resultado.faturamento)}</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600 font-medium">Alíquota</p>
                    <p className="text-lg font-bold text-orange-800">{resultado.aliquota}%</p>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Impostos a Pagar (Mensal)</p>
                  <p className="text-xl font-bold text-red-800">{formatCurrency(resultado.impostos)}</p>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-600">
                    * Simulação baseada nas tabelas do Simples Nacional 2024. Este é apenas um cálculo aproximado para referência.
                    Para cálculos oficiais, consulte sempre o portal do Simples Nacional.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

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

export default SimuladorSimplesForm;
