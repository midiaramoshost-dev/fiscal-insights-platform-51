
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Crown, CreditCard, User, Mail, MapPin, FileText, Phone, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssinaturaPremiumFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssinaturaPremiumForm = ({ isOpen, onClose }: AssinaturaPremiumFormProps) => {
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

  const { toast } = useToast();

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const planos = [
    { value: 'mensal', label: 'Mensal', preco: 'R$ 97,90/mês', desconto: '' },
    { value: 'trimestral', label: 'Trimestral', preco: 'R$ 79,90/mês', desconto: '18% OFF' },
    { value: 'anual', label: 'Anual', preco: 'R$ 59,90/mês', desconto: '39% OFF - MAIS POPULAR' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
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

    toast({
      title: "Assinatura Premium!",
      description: "Redirecionando para pagamento...",
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
            <Crown className="w-5 h-5 text-yellow-500" />
            <span>Assinatura Premium</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Escolha do Plano */}
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
                    checked={formData.plano === plano.value}
                    onChange={(e) => handleInputChange('plano', e.target.value)}
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

          {/* Dados Pessoais */}
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
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
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
                  onChange={(e) => handleInputChange('rg', e.target.value)}
                  placeholder="00.000.000-0"
                />
              </div>
              
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
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
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
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
                  onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
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
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  placeholder="Rua, Avenida..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  value={formData.complemento}
                  onChange={(e) => handleInputChange('complemento', e.target.value)}
                  placeholder="Apt, Bloco..."
                />
              </div>
              
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  placeholder="Nome do bairro"
                />
              </div>
              
              <div>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  placeholder="Sua cidade"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="estado">Estado *</Label>
                <Select onValueChange={(value) => handleInputChange('estado', value)}>
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

          {/* Dados Profissionais */}
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
                  onChange={(e) => handleInputChange('empresa', e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => handleInputChange('cargo', e.target.value)}
                  placeholder="Seu cargo"
                />
              </div>
              
              <div>
                <Label htmlFor="crc">CRC</Label>
                <Input
                  id="crc"
                  value={formData.crc}
                  onChange={(e) => handleInputChange('crc', e.target.value)}
                  placeholder="Número do CRC"
                />
              </div>
            </CardContent>
          </Card>

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
  );
};

export default AssinaturaPremiumForm;
