
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculadoraINSSFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculadoraINSSForm = ({ isOpen, onClose }: CalculadoraINSSFormProps) => {
  const [salario, setSalario] = useState('');
  const [resultado, setResultado] = useState<{
    salario: number;
    contribuicao: number;
    salarioLiquido: number;
    aliquota: number;
  } | null>(null);

  const { toast } = useToast();

  const calcularINSS = () => {
    const valor = parseFloat(salario.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (!valor || valor <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor válido.",
        variant: "destructive"
      });
      return;
    }

    // Tabela INSS 2024 (valores aproximados)
    let contribuicao = 0;
    let aliquota = 0;

    if (valor <= 1412) {
      contribuicao = valor * 0.075;
      aliquota = 7.5;
    } else if (valor <= 2666.68) {
      contribuicao = (1412 * 0.075) + ((valor - 1412) * 0.09);
      aliquota = 9.0;
    } else if (valor <= 4000.03) {
      contribuicao = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((valor - 2666.68) * 0.12);
      aliquota = 12.0;
    } else if (valor <= 7786.02) {
      contribuicao = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((valor - 4000.03) * 0.14);
      aliquota = 14.0;
    } else {
      contribuicao = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((7786.02 - 4000.03) * 0.14);
      aliquota = 14.0;
    }

    setResultado({
      salario: valor,
      contribuicao: contribuicao,
      salarioLiquido: valor - contribuicao,
      aliquota: aliquota
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2).replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setSalario('R$ ' + value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-500" />
            <span>Calculadora de INSS</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados para Cálculo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="salario">Salário Bruto</Label>
                <Input
                  id="salario"
                  value={salario}
                  onChange={handleSalarioChange}
                  placeholder="R$ 0,00"
                />
              </div>
              
              <Button 
                onClick={calcularINSS}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
              >
                Calcular INSS
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader>
                <CardTitle>Resultado do Cálculo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Salário Bruto</p>
                    <p className="text-lg font-bold text-blue-800">{formatCurrency(resultado.salario)}</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Contribuição INSS</p>
                    <p className="text-lg font-bold text-red-800">{formatCurrency(resultado.contribuicao)}</p>
                    <p className="text-xs text-red-600">Alíquota: {resultado.aliquota}%</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg col-span-2">
                    <p className="text-sm text-green-600 font-medium">Salário Líquido (após INSS)</p>
                    <p className="text-xl font-bold text-green-800">{formatCurrency(resultado.salarioLiquido)}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-600">
                    * Cálculo baseado na tabela INSS 2024. Este é apenas um cálculo aproximado para referência.
                    Para cálculos oficiais, consulte sempre a tabela atualizada da Receita Federal.
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

export default CalculadoraINSSForm;
