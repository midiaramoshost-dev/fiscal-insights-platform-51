
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const SubHeader = () => {
  const menuItems = [
    {
      title: "SIMPLES",
      items: ["Optantes", "Desenquadramento", "Sublimites", "Anexos", "Cálculo"],
      link: "/ferramentas"
    },
    {
      title: "IR",
      items: ["Pessoa Física", "Pessoa Jurídica", "Lucro Real", "Lucro Presumido", "Declarações"],
      link: "/ferramentas"
    },
    {
      title: "PIS/COFINS",
      items: ["Cumulativo", "Não Cumulativo", "Substituição Tributária", "Créditos", "Retenções"],
      link: "/ferramentas"
    },
    {
      title: "ICMS/ISS/IPI",
      items: ["ICMS Estadual", "ISS Municipal", "IPI Federal", "Substituição Tributária", "Benefícios"],
      link: "/icms"
    },
    {
      title: "Trabalho e Previdência",
      items: ["CLT Comentada", "eSocial", "FGTS", "Contribuições", "Folha de Pagamento", "Benefícios"],
      link: "/clt-comentada"
    },
    {
      title: "Comercial",
      items: ["Notas Fiscais", "Contratos", "Documentos", "Importação/Exportação"],
      link: "/consultoria"
    },
    {
      title: "SPED",
      items: ["ECD", "ECF", "EFD-Contribuições", "EFD-ICMS/IPI", "Reinf"],
      link: "/ferramentas"
    },
    {
      title: "Declarações",
      items: ["DARF", "GFIP", "DIRF", "DME", "Outras Declarações"],
      link: "/ferramentas"
    },
    {
      title: "Contabilidade",
      items: ["Balanço", "DRE", "Plano de Contas", "Conciliações", "Auditoria"],
      link: "/consultoria"
    },
    {
      title: "Reforma da Previdência",
      items: ["Novas Regras", "Transição", "Cálculos", "Impactos", "Orientações"],
      link: "/clt-comentada"
    }
  ];

  return (
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-1 overflow-x-auto py-3">
            {menuItems.map((menu, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-slate-600 hover:text-white whitespace-nowrap text-sm font-medium flex items-center space-x-1 px-3 py-2"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg border border-slate-200">
                  {menu.items.map((item, itemIndex) => (
                    <DropdownMenuItem asChild
                      key={itemIndex}
                      className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                    >
                      <Link to={menu.link} className="w-full">
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>
      </div>
  );
};

export default SubHeader;
