
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UsuarioFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterPlano: string;
  onFilterChange: (value: string) => void;
}

const UsuarioFilters = ({
  searchTerm,
  onSearchChange,
  filterPlano,
  onFilterChange
}: UsuarioFiltersProps) => {
  return (
    <div className="flex space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={filterPlano} onValueChange={onFilterChange}>
        <SelectTrigger className="w-48">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Planos</SelectItem>
          <SelectItem value="gratuito">Gratuito</SelectItem>
          <SelectItem value="Básico">Básico</SelectItem>
          <SelectItem value="Premium">Premium</SelectItem>
          <SelectItem value="Corporativo">Corporativo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UsuarioFilters;
