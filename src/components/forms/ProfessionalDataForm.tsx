
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

interface ProfessionalDataFormProps {
  formData: {
    empresa: string;
    cargo: string;
    crc: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

const ProfessionalDataForm = ({ formData, onFieldChange }: ProfessionalDataFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Dados Profissionais (Opcional)
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            value={formData.empresa}
            onChange={(e) => onFieldChange('empresa', e.target.value)}
            placeholder="Nome da empresa"
          />
        </div>
        
        <div>
          <Label htmlFor="cargo">Cargo</Label>
          <Input
            id="cargo"
            value={formData.cargo}
            onChange={(e) => onFieldChange('cargo', e.target.value)}
            placeholder="Seu cargo"
          />
        </div>
        
        <div>
          <Label htmlFor="crc">CRC</Label>
          <Input
            id="crc"
            value={formData.crc}
            onChange={(e) => onFieldChange('crc', e.target.value)}
            placeholder="Número do CRC"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalDataForm;
