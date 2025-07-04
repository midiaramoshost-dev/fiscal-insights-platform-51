
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Crown, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlanSelection from './PlanSelection';
import PersonalDataForm from './PersonalDataForm';
import AddressForm from './AddressForm';
import ProfessionalDataForm from './ProfessionalDataForm';
import PremiumPaymentModal from './PremiumPaymentModal';

interface AssinaturaPremiumFormProps {
  isOpen: boolean;
  onClose: () => void;
  menuTitle?: string;
}

const AssinaturaPremiumForm = ({ isOpen, onClose, menuTitle }: AssinaturaPremiumFormProps) => {
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    
    // Endereço
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Dados Profissionais
    empresa: '',
    cargo: '',
    crc: '',
    
    // Plano
    plano: 'anual',
    aceiteTermos: false
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceiteTermos) {
      toast({
        title: "Erro",
        description: "É necessário aceitar os termos de uso.",
        variant: "destructive"
      });
      return;
    }

    // Validação básica dos campos obrigatórios
    const camposObrigatorios = ['nome', 'cpf', 'email', 'telefone', 'cep', 'endereco', 'cidade', 'estado'];
    const camposFaltando = camposObrigatorios.filter(campo => !formData[campo as keyof typeof formData]);
    
    if (camposFaltando.length > 0) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se a API está configurada
    const apiKey = localStorage.getItem('abacate-pay-api-key');
    if (!apiKey) {
      toast({
        title: "Configuração necessária",
        description: "A integração de pagamento ainda não foi configurada. Entre em contato com o administrador.",
        variant: "destructive"
      });
      return;
    }

    // Abrir modal de pagamento
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    onClose();
    toast({
      title: "Assinatura Premium ativada!",
      description: "Bem-vindo ao plano Premium do Fiscal Insights Platform!"
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span>Assinatura Premium</span>
              {menuTitle && <span className="text-sm text-gray-500">- {menuTitle}</span>}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <PlanSelection 
              selectedPlan={formData.plano}
              onPlanChange={(plan) => handleInputChange('plano', plan)}
            />

            <PersonalDataForm 
              formData={{
                nome: formData.nome,
                cpf: formData.cpf,
                rg: formData.rg,
                dataNascimento: formData.dataNascimento,
                telefone: formData.telefone,
                email: formData.email
              }}
              onFieldChange={handleInputChange}
            />

            <AddressForm 
              formData={{
                cep: formData.cep,
                endereco: formData.endereco,
                numero: formData.numero,
                complemento: formData.complemento,
                bairro: formData.bairro,
                cidade: formData.cidade,
                estado: formData.estado
              }}
              onFieldChange={handleInputChange}
            />

            <ProfessionalDataForm 
              formData={{
                empresa: formData.empresa,
                cargo: formData.cargo,
                crc: formData.crc
              }}
              onFieldChange={handleInputChange}
            />

            {/* Termos */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="aceiteTermos"
                checked={formData.aceiteTermos}
                onCheckedChange={(checked) => handleInputChange('aceiteTermos', checked)}
              />
              <Label htmlFor="aceiteTermos" className="text-sm">
                Aceito os <span className="text-blue-600 underline cursor-pointer">termos de uso</span> e 
                <span className="text-blue-600 underline cursor-pointer"> política de privacidade</span> *
              </Label>
            </div>

            {/* Botões */}
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
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Assinar Premium
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <PremiumPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        userData={{
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          plano: formData.plano
        }}
      />
    </>
  );
};

export default AssinaturaPremiumForm;
