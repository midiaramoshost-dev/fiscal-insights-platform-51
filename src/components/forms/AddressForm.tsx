
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { formatCEP } from "@/utils/formFormatters";

interface AddressFormProps {
  formData: {
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

const AddressForm = ({ formData, onFieldChange }: AddressFormProps) => {
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Endereço
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cep">CEP *</Label>
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => onFieldChange('cep', formatCEP(e.target.value))}
            placeholder="00000-000"
            maxLength={9}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="numero">Número *</Label>
          <Input
            id="numero"
            value={formData.numero}
            onChange={(e) => onFieldChange('numero', e.target.value)}
            placeholder="123"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="endereco">Endereço *</Label>
          <Input
            id="endereco"
            value={formData.endereco}
            onChange={(e) => onFieldChange('endereco', e.target.value)}
            placeholder="Rua, Avenida..."
            required
          />
        </div>
        
        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            value={formData.complemento}
            onChange={(e) => onFieldChange('complemento', e.target.value)}
            placeholder="Apt, Bloco..."
          />
        </div>
        
        <div>
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            value={formData.bairro}
            onChange={(e) => onFieldChange('bairro', e.target.value)}
            placeholder="Nome do bairro"
          />
        </div>
        
        <div>
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            id="cidade"
            value={formData.cidade}
            onChange={(e) => onFieldChange('cidade', e.target.value)}
            placeholder="Sua cidade"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="estado">Estado *</Label>
          <Select onValueChange={(value) => onFieldChange('estado', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
