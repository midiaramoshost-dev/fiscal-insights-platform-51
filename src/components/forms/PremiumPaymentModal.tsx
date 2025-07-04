
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Copy, CheckCircle, Clock, X } from "lucide-react";
import { AbacatePayService, PixChargeResponse } from "@/services/abacatePay";
import { toast } from "@/hooks/use-toast";

interface PremiumPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    nome: string;
    cpf: string;
    email: string;
    plano: string;
  };
}

const PremiumPaymentModal = ({ isOpen, onClose, userData }: PremiumPaymentModalProps) => {
  const [pixData, setPixData] = useState<PixChargeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'error'>('pending');
  const [statusCheckInterval, setStatusCheckInterval] = useState<NodeJS.Timeout | null>(null);

  const planoPrecos = {
    'mensal': 97.90,
    'trimestral': 79.90,
    'anual': 59.90
  };

  useEffect(() => {
    if (isOpen && userData.nome && userData.cpf && userData.email) {
      generatePixCode();
    }
    
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [isOpen, userData]);

  const generatePixCode = async () => {
    setIsLoading(true);
    
    try {
      const valor = planoPrecos[userData.plano as keyof typeof planoPrecos] || 97.90;
      
      const chargeData = {
        valor,
        descricao: `Assinatura Premium ${userData.plano} - Fiscal Insights Platform`,
        cliente: {
          nome: userData.nome,
          cpf: userData.cpf,
          email: userData.email
        }
      };

      const response = await AbacatePayService.createPixCharge(chargeData);
      setPixData(response);
      
      // Iniciar verificação de status
      startStatusCheck(response.cobrancaId);
      
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      toast({
        title: "Erro ao gerar QR Code",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const startStatusCheck = (cobrancaId: string) => {
    const interval = setInterval(async () => {
      try {
        const status = await AbacatePayService.checkChargeStatus(cobrancaId);
        if (status.status === 'paid') {
          setPaymentStatus('paid');
          clearInterval(interval);
          toast({
            title: "Pagamento confirmado!",
            description: "Sua assinatura Premium foi ativada com sucesso."
          });
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    }, 5000); // Verificar a cada 5 segundos
    
    setStatusCheckInterval(interval);
  };

  const copyPixCode = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast({
        title: "Código Pix copiado!",
        description: "Cole no seu app de banco para efetuar o pagamento."
      });
    }
  };

  const handleClose = () => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    setPixData(null);
    setPaymentStatus('pending');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-green-600" />
              <span>Pagamento via Pix</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p>Gerando QR Code Pix...</p>
            </div>
          )}

          {pixData && paymentStatus === 'pending' && (
            <>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="mb-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixData.qrCode)}`}
                      alt="QR Code Pix"
                      className="mx-auto border rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-semibold text-green-800">
                      Valor: R$ {pixData.valor.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-sm text-green-700">
                      Escaneie o QR Code ou copie o código Pix
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <p className="text-sm font-medium">Código Pix:</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={pixData.qrCode}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded text-xs bg-gray-50"
                  />
                  <Button onClick={copyPixCode} size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Aguardando pagamento...</span>
              </div>
            </>
          )}

          {paymentStatus === 'paid' && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-green-800 mb-2">Pagamento Confirmado!</h3>
                <p className="text-sm text-green-700">
                  Sua assinatura Premium foi ativada com sucesso.
                </p>
                <Button onClick={handleClose} className="mt-4 bg-green-600 hover:bg-green-700">
                  Continuar
                </Button>
              </CardContent>
            </Card>
          )}

          {paymentStatus === 'error' && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-red-800 mb-2">Erro no Pagamento</h3>
                <p className="text-sm text-red-700 mb-4">
                  Não foi possível gerar o QR Code Pix. Verifique a configuração da API.
                </p>
                <Button onClick={generatePixCode} variant="outline">
                  Tentar Novamente
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumPaymentModal;
