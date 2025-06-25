
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FerramentaPersonalizadaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FerramentaPersonalizadaForm = ({ isOpen, onClose }: FerramentaPersonalizadaFormProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    nomeFerramenenta: '',
    descricao: '',
    prazoDesejado: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica dos campos obrigatórios
    const camposObrigatorios = ['nome', 'email', 'nomeFerramenenta', 'descricao'];
    const camposFaltando = camposObrigatorios.filter(campo => !formData[campo as keyof typeof formData]);
    
    if (camposFaltando.length > 0) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Solicitação Enviada!",
      description: "Entraremos em contato em breve para discutir sua ferramenta personalizada.",
    });

    // Reset form and close
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      nomeFerramenenta: '',
      descricao: '',
      prazoDesejado: ''
    });
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-blue-500" />
            <span>Solicitar Ferramenta Personalizada</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                placeholder="(15) 99999-9999"
              />
            </div>
            
            <div>
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                value={formData.empresa}
                onChange={(e) => handleInputChange('empresa', e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="nomeFerramenenta">Nome da Ferramenta *</Label>
            <Input
              id="nomeFerramenenta"
              value={formData.nomeFerramenenta}
              onChange={(e) => handleInputChange('nomeFerramenenta', e.target.value)}
              placeholder="Ex: Calculadora de ISS Personalizada"
              required
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição Detalhada *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva detalhadamente como a ferramenta deve funcionar, quais cálculos deve realizar, que dados deve processar, etc."
              className="min-h-[120px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="prazoDesejado">Prazo Desejado</Label>
            <Input
              id="prazoDesejado"
              value={formData.prazoDesejado}
              onChange={(e) => handleInputChange('prazoDesejado', e.target.value)}
              placeholder="Ex: 30 dias, 2 meses, etc."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Solicitação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FerramentaPersonalizadaForm;
