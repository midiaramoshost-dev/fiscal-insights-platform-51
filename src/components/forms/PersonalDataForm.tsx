
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { formatCPF, formatPhone } from "@/utils/formFormatters";

interface PersonalDataFormProps {
  formData: {
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    telefone: string;
    email: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

const PersonalDataForm = ({ formData, onFieldChange }: PersonalDataFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Dados Pessoais
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => onFieldChange('nome', e.target.value)}
            placeholder="Digite seu nome completo"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => onFieldChange('cpf', formatCPF(e.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            value={formData.rg}
            onChange={(e) => onFieldChange('rg', e.target.value)}
            placeholder="00.000.000-0"
          />
        </div>
        
        <div>
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => onFieldChange('dataNascimento', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="telefone">Telefone *</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => onFieldChange('telefone', formatPhone(e.target.value))}
            placeholder="(11) 99999-9999"
            maxLength={15}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDataForm;
