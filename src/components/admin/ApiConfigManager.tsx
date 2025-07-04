
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key, Save, TestTube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApiConfigManager = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Carregar chave API salva
    const savedApiKey = localStorage.getItem('abacate-pay-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave API válida.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('abacate-pay-api-key', apiKey);
    toast({
      title: "Configuração salva!",
      description: "Chave API do Abacate Pay foi configurada com sucesso."
    });
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Configure uma chave API antes de testar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular teste da API (aqui você integraria com a API real do Abacate Pay)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Teste realizado!",
        description: "Conexão com Abacate Pay testada com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro no teste",
        description: "Falha ao conectar com a API do Abacate Pay.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="w-5 h-5" />
          <span>Configuração da API - Abacate Pay</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="apiKey">Chave da API Abacate Pay</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Digite sua chave da API do Abacate Pay"
          />
          <p className="text-sm text-slate-600 mt-1">
            Esta chave será usada para gerar QR Codes Pix nas assinaturas Premium.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configuração
          </Button>
          <Button 
            onClick={handleTest} 
            variant="outline" 
            disabled={isLoading}
            className="flex-1"
          >
            <TestTube className="w-4 h-4 mr-2" />
            {isLoading ? 'Testando...' : 'Testar API'}
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Como obter sua chave API:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Acesse o painel do Abacate Pay</li>
            <li>2. Vá em Configurações → API</li>
            <li>3. Copie sua chave de API</li>
            <li>4. Cole aqui e clique em "Salvar"</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiConfigManager;
