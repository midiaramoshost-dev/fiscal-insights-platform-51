
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlanSelectionProps {
  selectedPlan: string;
  onPlanChange: (plan: string) => void;
}

const PlanSelection = ({ selectedPlan, onPlanChange }: PlanSelectionProps) => {
  const planos = [
    { value: 'mensal', label: 'Mensal', preco: 'R$ 97,90/mês', desconto: '' },
    { value: 'trimestral', label: 'Trimestral', preco: 'R$ 79,90/mês', desconto: '18% OFF' },
    { value: 'anual', label: 'Anual', preco: 'R$ 59,90/mês', desconto: '39% OFF - MAIS POPULAR' }
  ];

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-purple-800">Escolha seu Plano</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {planos.map((plano) => (
          <div key={plano.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white/50 cursor-pointer">
            <input
              type="radio"
              name="plano"
              value={plano.value}
              checked={selectedPlan === plano.value}
              onChange={(e) => onPlanChange(e.target.value)}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{plano.label}</span>
                <div className="text-right">
                  <span className="font-bold text-lg">{plano.preco}</span>
                  {plano.desconto && (
                    <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500">
                      {plano.desconto}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlanSelection;
