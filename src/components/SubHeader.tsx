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
    { title: "SIMPLES", items: [
      { label: "Optantes", slug: "simples-optantes" },
      { label: "Desenquadramento", slug: "simples-desenquadramento" },
      { label: "Sublimites", slug: "simples-sublimites" },
      { label: "Anexos", slug: "simples-anexos" },
      { label: "Cálculo", slug: "simples-calculo" },
    ]},
    { title: "IR", items: [
      { label: "Pessoa Física", slug: "ir-pessoa-fisica" },
      { label: "Pessoa Jurídica", slug: "ir-pessoa-juridica" },
      { label: "Lucro Real", slug: "ir-lucro-real" },
      { label: "Lucro Presumido", slug: "ir-lucro-presumido" },
      { label: "Declarações", slug: "ir-declaracoes" },
    ]},
    { title: "PIS/COFINS", items: [
      { label: "Cumulativo", slug: "pis-cofins-cumulativo" },
      { label: "Não Cumulativo", slug: "pis-cofins-nao-cumulativo" },
      { label: "Substituição Tributária", slug: "pis-cofins-st" },
      { label: "Créditos", slug: "pis-cofins-creditos" },
      { label: "Retenções", slug: "pis-cofins-retencoes" },
    ]},
    { title: "ICMS/ISS/IPI", items: [
      { label: "ICMS Estadual", slug: "icms-estadual" },
      { label: "ISS Municipal", slug: "iss-municipal" },
      { label: "IPI Federal", slug: "ipi-federal" },
      { label: "Substituição Tributária", slug: "icms-st" },
      { label: "Benefícios", slug: "icms-beneficios" },
    ]},
    { title: "Trabalho e Previdência", items: [
      { label: "CLT Comentada", slug: "clt-comentada" },
      { label: "eSocial", slug: "esocial" },
      { label: "FGTS", slug: "fgts" },
      { label: "Contribuições", slug: "contribuicoes-previdenciarias" },
      { label: "Folha de Pagamento", slug: "folha-pagamento" },
      { label: "Benefícios", slug: "beneficios-trabalhistas" },
    ]},
    { title: "Comercial", items: [
      { label: "Notas Fiscais", slug: "notas-fiscais" },
      { label: "Contratos", slug: "contratos" },
      { label: "Documentos", slug: "documentos-comerciais" },
      { label: "Importação/Exportação", slug: "importacao-exportacao" },
    ]},
    { title: "SPED", items: [
      { label: "ECD", slug: "ecd" },
      { label: "ECF", slug: "ecf" },
      { label: "EFD-Contribuições", slug: "efd-contribuicoes" },
      { label: "EFD-ICMS/IPI", slug: "efd-icms-ipi" },
      { label: "Reinf", slug: "reinf" },
    ]},
    { title: "Declarações", items: [
      { label: "DARF", slug: "darf" },
      { label: "GFIP", slug: "gfip" },
      { label: "DIRF", slug: "dirf" },
      { label: "DME", slug: "dme" },
      { label: "Outras Declarações", slug: "outras-declaracoes" },
    ]},
    { title: "Contabilidade", items: [
      { label: "Balanço", slug: "balanco" },
      { label: "DRE", slug: "dre" },
      { label: "Plano de Contas", slug: "plano-contas" },
      { label: "Conciliações", slug: "conciliacoes" },
      { label: "Auditoria", slug: "auditoria" },
    ]},
    { title: "Reforma da Previdência", items: [
      { label: "Novas Regras", slug: "previdencia-novas-regras" },
      { label: "Transição", slug: "previdencia-transicao" },
      { label: "Cálculos", slug: "previdencia-calculos" },
      { label: "Impactos", slug: "previdencia-impactos" },
      { label: "Orientações", slug: "previdencia-orientacoes" },
    ]},
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
                  <DropdownMenuItem asChild key={itemIndex} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                    <Link to={`/topico/${item.slug}`} className="w-full">{item.label}</Link>
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
