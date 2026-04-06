import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MapPin, FileText, Info } from "lucide-react";
import Header from "@/components/Header";

interface ICMSEstado {
  uf: string;
  estado: string;
  aliquotaInterna: string;
  aliquotaInterestadualSul: string;
  aliquotaInterestadualOutros: string;
  fundamentoLegal: string;
  observacoes: string;
}

const icmsEstados: ICMSEstado[] = [
  // Região Norte
  { uf: 'AC', estado: 'Acre', aliquotaInterna: '19%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei Complementar nº 422/2022 - Alíquota modal majorada conforme reforma tributária estadual', observacoes: 'Alíquota interna majorada de 17% para 19% a partir de 2023' },
  { uf: 'AM', estado: 'Amazonas', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei Complementar nº 242/2023 - Alteração da alíquota modal do ICMS', observacoes: 'Zona Franca de Manaus possui incentivos fiscais especiais (DL 288/67)' },
  { uf: 'AP', estado: 'Amapá', aliquotaInterna: '18%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 400/1997 e alterações - Código Tributário do Amapá', observacoes: 'Área de Livre Comércio de Macapá e Santana com benefícios específicos' },
  { uf: 'PA', estado: 'Pará', aliquotaInterna: '19%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 8.315/2022 - Majoração da alíquota modal do ICMS no Pará', observacoes: 'Alíquota majorada de 17% para 19% a partir de abril/2023' },
  { uf: 'RO', estado: 'Rondônia', aliquotaInterna: '19,5%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 5.629/2023 - Alteração da alíquota modal de ICMS', observacoes: 'Alíquota interna majorada para 19,5% incluindo adicional FUMIPEQ' },
  { uf: 'RR', estado: 'Roraima', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 1.767/2023 - Nova alíquota modal do ICMS em Roraima', observacoes: 'Área de Livre Comércio de Boa Vista com incentivos fiscais' },
  { uf: 'TO', estado: 'Tocantins', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 4.141/2023 - Alíquota modal do ICMS do Tocantins', observacoes: 'Alíquota majorada de 18% para 20% a partir de 2023' },
  
  // Região Nordeste
  { uf: 'AL', estado: 'Alagoas', aliquotaInterna: '19%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 8.779/2022 - Alteração da alíquota modal do ICMS/AL', observacoes: 'Alíquota majorada de 17% para 19% a partir de abril/2023' },
  { uf: 'BA', estado: 'Bahia', aliquotaInterna: '20,5%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 14.629/2023 - Nova alíquota modal incluindo FCBA', observacoes: 'Inclui 2% de adicional FCBA (Fundo de Combate à Pobreza). Alíquota base: 18,5%' },
  { uf: 'CE', estado: 'Ceará', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 18.305/2023 - Majoração da alíquota modal do ICMS/CE', observacoes: 'Inclui 2% FECOP. Alíquota base: 18%' },
  { uf: 'MA', estado: 'Maranhão', aliquotaInterna: '22%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 11.867/2022 - Alíquota modal do ICMS do Maranhão', observacoes: 'Inclui 2% FUMACOP. Uma das maiores alíquotas do país' },
  { uf: 'PB', estado: 'Paraíba', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 12.788/2023 - Nova alíquota modal do ICMS/PB', observacoes: 'Inclui 2% FUNCEP. Alíquota base: 18%' },
  { uf: 'PE', estado: 'Pernambuco', aliquotaInterna: '20,5%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 18.305/2023 - Alíquota modal do ICMS de Pernambuco', observacoes: 'Inclui 2% FECEP. Alíquota base: 18,5%' },
  { uf: 'PI', estado: 'Piauí', aliquotaInterna: '21%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 7.706/2022 - Majoração da alíquota modal ICMS/PI', observacoes: 'Inclui 2% FECOMB. Alíquota base: 19%' },
  { uf: 'RN', estado: 'Rio Grande do Norte', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 11.314/2022 - Alíquota modal do ICMS/RN', observacoes: 'Inclui 2% FECOP. Alíquota base: 18%' },
  { uf: 'SE', estado: 'Sergipe', aliquotaInterna: '19%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 9.120/2022 - Nova alíquota modal do ICMS/SE', observacoes: 'Alíquota majorada de 18% para 19% a partir de 2023' },
  
  // Região Centro-Oeste
  { uf: 'DF', estado: 'Distrito Federal', aliquotaInterna: '20%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 7.326/2023 - Alíquota modal do ICMS do DF', observacoes: 'Inclui 2% FCDF. Alíquota base: 18%' },
  { uf: 'GO', estado: 'Goiás', aliquotaInterna: '19%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 22.460/2023 - Majoração da alíquota modal ICMS/GO', observacoes: 'Inclui 2% PROTEGE Goiás em determinados produtos. Alíquota base: 17%' },
  { uf: 'MT', estado: 'Mato Grosso', aliquotaInterna: '17%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 7.098/1998 e alterações - Código Tributário de MT', observacoes: 'Manteve alíquota modal de 17%. Possui FETHAB sobre commodities agrícolas' },
  { uf: 'MS', estado: 'Mato Grosso do Sul', aliquotaInterna: '17%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 1.810/1997 e alterações - ICMS de Mato Grosso do Sul', observacoes: 'Manteve alíquota modal de 17%' },
  
  // Região Sudeste
  { uf: 'ES', estado: 'Espírito Santo', aliquotaInterna: '17%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 7.000/2001 e alterações - ICMS do Espírito Santo', observacoes: 'Manteve alíquota modal de 17%. INVEST-ES com incentivos para indústrias' },
  { uf: 'MG', estado: 'Minas Gerais', aliquotaInterna: '18%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 6.763/1975 e alterações - ICMS de Minas Gerais', observacoes: 'Adicional de 2% FEM sobre supérfluos. Alíquota base: 18%' },
  { uf: 'RJ', estado: 'Rio de Janeiro', aliquotaInterna: '22%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '12%', fundamentoLegal: 'Lei nº 2.657/1996 e Lei nº 10.253/2023 - Alíquota modal RJ', observacoes: 'Inclui 2% FECP + 2% FOT. Uma das maiores alíquotas do Brasil' },
  { uf: 'SP', estado: 'São Paulo', aliquotaInterna: '18%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '7%', fundamentoLegal: 'Lei nº 6.374/1989 e alterações - ICMS de São Paulo', observacoes: 'SP aplica 7% nas operações interestaduais para N/NE/CO/ES (CF art. 155, §2º, IV)' },
  
  // Região Sul
  { uf: 'PR', estado: 'Paraná', aliquotaInterna: '19,5%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '7%', fundamentoLegal: 'Lei nº 11.580/1996 e Lei nº 21.850/2023 - Alíquota modal ICMS/PR', observacoes: 'Inclui 1,5% FECOP sobre itens específicos. Alíquota base: 19%' },
  { uf: 'RS', estado: 'Rio Grande do Sul', aliquotaInterna: '17%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '7%', fundamentoLegal: 'Lei nº 8.820/1989 e alterações - ICMS do Rio Grande do Sul', observacoes: 'Manteve alíquota modal de 17%. AMPARA/RS sobre itens específicos' },
  { uf: 'SC', estado: 'Santa Catarina', aliquotaInterna: '17%', aliquotaInterestadualSul: '12%', aliquotaInterestadualOutros: '7%', fundamentoLegal: 'Lei nº 10.297/1996 e alterações - ICMS de Santa Catarina', observacoes: 'Manteve alíquota modal de 17%. TTD com benefícios fiscais setoriais' },
];

const ICMSEstados = () => {
  const [busca, setBusca] = useState('');
  const [regiaoFiltro, setRegiaoFiltro] = useState<string>('todas');

  const regioes: Record<string, string[]> = {
    'Norte': ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
    'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
    'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
    'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
    'Sul': ['PR', 'RS', 'SC'],
  };

  const estadosFiltrados = icmsEstados.filter(e => {
    const matchBusca = !busca || e.estado.toLowerCase().includes(busca.toLowerCase()) || e.uf.toLowerCase().includes(busca.toLowerCase());
    const matchRegiao = regiaoFiltro === 'todas' || regioes[regiaoFiltro]?.includes(e.uf);
    return matchBusca && matchRegiao;
  });

  const getRegiao = (uf: string) => {
    for (const [regiao, ufs] of Object.entries(regioes)) {
      if (ufs.includes(uf)) return regiao;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              ICMS por Estado
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Tabela completa de alíquotas de ICMS dos 26 estados e Distrito Federal, 
              com fundamentação legal e observações atualizadas conforme a legislação vigente.
            </p>
          </div>

          {/* Aviso legal */}
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <strong>Nota:</strong> As alíquotas apresentadas referem-se à alíquota modal (padrão) de cada estado. 
                Produtos específicos podem ter alíquotas diferenciadas (energia, combustíveis, telecomunicações, supérfluos, etc.). 
                Os adicionais de Fundos de Combate à Pobreza (FECOP/FECP) estão indicados quando aplicáveis. 
                Alíquotas interestaduais seguem a CF/88, art. 155, §2º, IV e Resolução do Senado nº 22/89.
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por estado ou UF..."
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={regiaoFiltro === 'todas' ? 'default' : 'outline'} size="sm" onClick={() => setRegiaoFiltro('todas')}>Todas</Button>
              {Object.keys(regioes).map(r => (
                <Button key={r} variant={regiaoFiltro === r ? 'default' : 'outline'} size="sm" onClick={() => setRegiaoFiltro(r)}>{r}</Button>
              ))}
            </div>
          </div>

          {/* Tabela */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">UF</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-center">Região</TableHead>
                      <TableHead className="text-center">Alíq. Interna</TableHead>
                      <TableHead className="text-center">Interestadual S/SE</TableHead>
                      <TableHead className="text-center">Interestadual N/NE/CO</TableHead>
                      <TableHead className="min-w-[300px]">Fundamentação Legal</TableHead>
                      <TableHead className="min-w-[250px]">Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estadosFiltrados.map(e => (
                      <TableRow key={e.uf}>
                        <TableCell>
                          <Badge variant="outline" className="font-bold">{e.uf}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{e.estado}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="text-xs">{getRegiao(e.uf)}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-bold text-lg text-blue-700">{e.aliquotaInterna}</span>
                        </TableCell>
                        <TableCell className="text-center font-medium">{e.aliquotaInterestadualSul}</TableCell>
                        <TableCell className="text-center font-medium">{e.aliquotaInterestadualOutros}</TableCell>
                        <TableCell>
                          <div className="flex items-start space-x-1">
                            <FileText className="w-3 h-3 text-slate-400 mt-1 flex-shrink-0" />
                            <span className="text-xs text-slate-600">{e.fundamentoLegal}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-500">{e.observacoes}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Resumo por região */}
          <div className="grid md:grid-cols-5 gap-4 mt-8">
            {Object.entries(regioes).map(([regiao, ufs]) => {
              const estados = icmsEstados.filter(e => ufs.includes(e.uf));
              const aliquotas = estados.map(e => parseFloat(e.aliquotaInterna));
              const media = (aliquotas.reduce((a, b) => a + b, 0) / aliquotas.length).toFixed(1);
              const max = Math.max(...aliquotas).toFixed(1);
              const min = Math.min(...aliquotas).toFixed(1);
              return (
                <Card key={regiao}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{regiao}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <p>Média: <strong>{media}%</strong></p>
                    <p>Menor: <strong>{min}%</strong></p>
                    <p>Maior: <strong>{max}%</strong></p>
                    <p className="text-slate-400">{ufs.length} estados</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Referências legais */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Base Legal - Alíquotas Interestaduais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-2">
              <p><strong>Constituição Federal, art. 155, §2º, IV:</strong> Define que as alíquotas interestaduais são fixadas por Resolução do Senado Federal.</p>
              <p><strong>Resolução do Senado Federal nº 22/1989:</strong> Fixa em 12% a alíquota interestadual para operações entre estados das regiões Sul e Sudeste, e 7% nas operações dessas regiões para estados do Norte, Nordeste, Centro-Oeste e Espírito Santo.</p>
              <p><strong>Resolução do Senado Federal nº 13/2012:</strong> Fixa em 4% a alíquota interestadual para produtos importados ou com conteúdo de importação superior a 40%.</p>
              <p><strong>LC 190/2022 (DIFAL):</strong> Regulamenta a cobrança do diferencial de alíquotas nas operações interestaduais destinadas a consumidor final não contribuinte.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ICMSEstados;
