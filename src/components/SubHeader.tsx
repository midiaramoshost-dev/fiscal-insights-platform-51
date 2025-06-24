
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import AssinaturaPremiumForm from "./forms/AssinaturaPremiumForm";

const SubHeader = () => {
  const [premiumFormOpen, setPremiumFormOpen] = useState(false);

  const handleMenuClick = () => {
    setPremiumFormOpen(true);
  };

  const menuItems = [
    {
      title: "SIMPLES",
      items: ["Optantes", "Desenquadramento", "Sublimites", "Anexos", "Cálculo"]
    },
    {
      title: "IR",
      items: ["Pessoa Física", "Pessoa Jurídica", "Lucro Real", "Lucro Presumido", "Declarações"]
    },
    {
      title: "PIS/COFINS",
      items: ["Cumulativo", "Não Cumulativo", "Substituição Tributária", "Créditos", "Retenções"]
    },
    {
      title: "ICMS/ISS/IPI",
      items: ["ICMS Estadual", "ISS Municipal", "IPI Federal", "Substituição Tributária", "Benefícios"]
    },
    {
      title: "Trabalho e Previdência",
      items: ["eSocial", "FGTS", "Contribuições", "Folha de Pagamento", "Benefícios"]
    },
    {
      title: "Comercial",
      items: ["Notas Fiscais", "Contratos", "Documentos", "Importação/Exportação"]
    },
    {
      title: "SPED",
      items: ["ECD", "ECF", "EFD-Contribuições", "EFD-ICMS/IPI", "Reinf"]
    },
    {
      title: "Declarações",
      items: ["DARF", "GFIP", "DIRF", "DME", "Outras Declarações"]
    },
    {
      title: "Contabilidade",
      items: ["Balanço", "DRE", "Plano de Contas", "Conciliações", "Auditoria"]
    },
    {
      title: "Reforma da Previdência",
      items: ["Novas Regras", "Transição", "Cálculos", "Impactos", "Orientações"]
    }
  ];

  const menusComPremium = ["IR", "PIS/COFINS", "ICMS/ISS/IPI", "Trabalho e Previdência", "SPED", "Contabilidade", "Reforma da Previdência"];

  return (
    <>
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
                    <DropdownMenuItem
                      key={itemIndex}
                      className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                      onClick={() => {
                        if (menusComPremium.includes(menu.title)) {
                          handleMenuClick();
                        }
                      }}
                    >
                      {item}
                      {menusComPremium.includes(menu.title) && (
                        <span className="ml-auto text-xs text-blue-600">👑</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>
      </div>

      <AssinaturaPremiumForm
        isOpen={premiumFormOpen}
        onClose={() => setPremiumFormOpen(false)}
      />
    </>
  );
};

export default SubHeader;
