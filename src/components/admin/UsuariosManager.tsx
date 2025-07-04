
import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useUsuarios } from "@/contexts/UsuariosContext";
import { Usuario } from "@/types/admin";
import { toast } from "@/hooks/use-toast";
import UsuarioForm from "./usuario/UsuarioForm";
import UsuarioFilters from "./usuario/UsuarioFilters";
import UsuarioTable from "./usuario/UsuarioTable";

const UsuariosManager = () => {
  const { usuarios, adicionarUsuario, atualizarUsuario, removerUsuario } = useUsuarios();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlano, setFilterPlano] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    plano: "gratuito" as Usuario['plano'],
    status: "Ativo" as Usuario['status']
  });

  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPlano === "todos" || usuario.plano === filterPlano;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      atualizarUsuario(editingUser.id, formData);
      toast({ title: "Usuário atualizado com sucesso!" });
    } else {
      adicionarUsuario({
        ...formData,
        dataRegistro: new Date().toISOString(),
        ultimoAcesso: new Date().toISOString()
      });
      toast({ title: "Usuário adicionado com sucesso!" });
    }
    
    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData({ nome: "", email: "", plano: "gratuito", status: "Ativo" });
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      plano: usuario.plano,
      status: usuario.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este usuário?")) {
      removerUsuario(id);
      toast({ title: "Usuário removido com sucesso!" });
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({ nome: "", email: "", plano: "gratuito", status: "Ativo" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Gestão de Usuários</span>
        </h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <UsuarioForm
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            editingUser={editingUser}
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleSubmit}
          />
        </Dialog>
      </div>

      <UsuarioFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterPlano={filterPlano}
        onFilterChange={setFilterPlano}
      />

      <UsuarioTable
        usuarios={usuariosFiltrados}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsuariosManager;
