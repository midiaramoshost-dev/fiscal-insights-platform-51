
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Usuario } from "@/types/admin";

interface UsuarioFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser: Usuario | null;
  formData: {
    nome: string;
    email: string;
    plano: Usuario['plano'];
    status: Usuario['status'];
  };
  onFormDataChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UsuarioForm = ({
  isOpen,
  onOpenChange,
  editingUser,
  formData,
  onFormDataChange,
  onSubmit
}: UsuarioFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingUser ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => onFormDataChange({...formData, nome: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onFormDataChange({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="plano">Plano</Label>
            <Select
              value={formData.plano}
              onValueChange={(value: Usuario['plano']) => 
                onFormDataChange({...formData, plano: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gratuito">Gratuito</SelectItem>
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Corporativo">Corporativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Usuario['status']) => 
                onFormDataChange({...formData, status: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Bloqueado">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">
              {editingUser ? "Atualizar" : "Criar"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsuarioForm;
