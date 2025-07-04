
export interface PixChargeData {
  valor: number;
  descricao: string;
  cliente: {
    nome: string;
    cpf: string;
    email: string;
  };
}

export interface PixChargeResponse {
  qrCode: string;
  qrCodeImage: string;
  cobrancaId: string;
  valor: number;
  status: string;
}

export class AbacatePayService {
  private static getApiKey(): string {
    const apiKey = localStorage.getItem('abacate-pay-api-key');
    if (!apiKey) {
      throw new Error('Chave API do Abacate Pay não configurada');
    }
    return apiKey;
  }

  static async createPixCharge(data: PixChargeData): Promise<PixChargeResponse> {
    const apiKey = this.getApiKey();
    
    try {
      // Simular chamada à API do Abacate Pay
      // Na implementação real, você faria uma chamada HTTP para a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados simulados de retorno
      const mockResponse: PixChargeResponse = {
        qrCode: "00020126580014br.gov.bcb.pix013665f4c2b1-2c4e-4b8e-9a1b-123456789012520400005303986540" + data.valor.toFixed(2) + "5802BR5925" + data.cliente.nome.substring(0, 25) + "6014Belo Horizonte61083030230062070503***6304ABCD",
        qrCodeImage: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`,
        cobrancaId: `CHARGE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        valor: data.valor,
        status: 'pending'
      };
      
      return mockResponse;
    } catch (error) {
      console.error('Erro ao criar cobrança Pix:', error);
      throw new Error('Falha ao gerar QR Code Pix. Verifique a configuração da API.');
    }
  }

  static async checkChargeStatus(cobrancaId: string): Promise<{ status: string }> {
    const apiKey = this.getApiKey();
    
    try {
      // Simular verificação de status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        status: Math.random() > 0.7 ? 'paid' : 'pending'
      };
    } catch (error) {
      console.error('Erro ao verificar status da cobrança:', error);
      throw new Error('Falha ao verificar status do pagamento.');
    }
  }
}
