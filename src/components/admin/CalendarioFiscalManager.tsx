import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit2, Trash2, Save, X, Calendar } from "lucide-react";
import { useCalendarioFiscal } from "@/contexts/CalendarioFiscalContext";
import { EventoFiscal } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

const meses = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const CalendarioFiscalManager = () => {
  const { eventos, adicionarEvento, atualizarEvento, removerEvento } = useCalendarioFiscal();
  const { toast } = useToast();
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novo, setNovo] = useState({ dia: 1, mes: '' as string, evento: '', tipo: 'Federal' as EventoFiscal['tipo'], descricao: '', recorrente: true });

  const handleAdicionar = () => {
    if (!novo.evento) {
      toast({ title: "Erro", description: "Nome do evento é obrigatório", variant: "destructive" });
      return;
    }
    adicionarEvento({
      dia: novo.dia,
      mes: novo.mes ? parseInt(novo.mes) : null,
      evento: novo.evento,
      tipo: novo.tipo,
      descricao: novo.descricao,
      recorrente: novo.recorrente,
      ativo: true,
    });
    setNovo({ dia: 1, mes: '', evento: '', tipo: 'Federal', descricao: '', recorrente: true });
    toast({ title: "Sucesso", description: "Evento fiscal adicionado!" });
  };

  const EditRow = ({ ev }: { ev: EventoFiscal }) => {
    const [ed, setEd] = useState(ev);
    return (
      <TableRow>
        <TableCell><Input type="number" min={1} max={31} value={ed.dia} onChange={e => setEd({ ...ed, dia: parseInt(e.target.value) || 1 })} className="w-16" /></TableCell>
        <TableCell>
          <select value={ed.mes ?? ''} onChange={e => setEd({ ...ed, mes: e.target.value ? parseInt(e.target.value) : null })} className="border rounded px-2 py-1 text-sm">
            <option value="">Mensal</option>
            {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{meses[i + 1]}</option>)}
          </select>
        </TableCell>
        <TableCell><Input value={ed.evento} onChange={e => setEd({ ...ed, evento: e.target.value })} /></TableCell>
        <TableCell>
          <select value={ed.tipo} onChange={e => setEd({ ...ed, tipo: e.target.value as EventoFiscal['tipo'] })} className="border rounded px-2 py-1 text-sm">
            <option value="Federal">Federal</option>
            <option value="Estadual">Estadual</option>
            <option value="Municipal">Municipal</option>
            <option value="Trabalhista">Trabalhista</option>
          </select>
        </TableCell>
        <TableCell><Input value={ed.descricao || ''} onChange={e => setEd({ ...ed, descricao: e.target.value })} /></TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => { atualizarEvento(ed.id, ed); setEditandoId(null); toast({ title: "Atualizado!" }); }} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4" /></Button>
            <Button size="sm" variant="outline" onClick={() => setEditandoId(null)}><X className="w-4 h-4" /></Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Calendário Fiscal</h2>
        <Badge variant="outline">{eventos.filter(e => e.ativo).length} eventos ativos</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center"><Plus className="w-5 h-5 mr-2" />Adicionar Evento</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            <div>
              <Label>Dia</Label>
              <Input type="number" min={1} max={31} value={novo.dia} onChange={e => setNovo({ ...novo, dia: parseInt(e.target.value) || 1 })} />
            </div>
            <div>
              <Label>Mês</Label>
              <select value={novo.mes} onChange={e => setNovo({ ...novo, mes: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                <option value="">Mensal (recorrente)</option>
                {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{meses[i + 1]}</option>)}
              </select>
            </div>
            <div>
              <Label>Evento</Label>
              <Input value={novo.evento} onChange={e => setNovo({ ...novo, evento: e.target.value })} placeholder="Ex: DARF PJ" />
            </div>
            <div>
              <Label>Tipo</Label>
              <select value={novo.tipo} onChange={e => setNovo({ ...novo, tipo: e.target.value as EventoFiscal['tipo'] })} className="w-full border rounded px-3 py-2 text-sm">
                <option value="Federal">Federal</option>
                <option value="Estadual">Estadual</option>
                <option value="Municipal">Municipal</option>
                <option value="Trabalhista">Trabalhista</option>
              </select>
            </div>
            <div className="col-span-2">
              <Label>Descrição</Label>
              <Input value={novo.descricao} onChange={e => setNovo({ ...novo, descricao: e.target.value })} placeholder="Descrição breve" />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAdicionar} className="w-full">Adicionar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Dia</TableHead>
                <TableHead className="w-20">Mês</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead className="w-24">Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-32">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map(ev =>
                editandoId === ev.id ? <EditRow key={ev.id} ev={ev} /> : (
                  <TableRow key={ev.id} className={!ev.ativo ? 'opacity-50' : ''}>
                    <TableCell className="font-medium">{ev.dia}</TableCell>
                    <TableCell>{ev.mes ? meses[ev.mes] : <Badge variant="outline" className="text-xs">Mensal</Badge>}</TableCell>
                    <TableCell>{ev.evento}</TableCell>
                    <TableCell>
                      <Badge variant={ev.tipo === 'Federal' ? 'default' : ev.tipo === 'Trabalhista' ? 'destructive' : 'secondary'}>
                        {ev.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{ev.descricao}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Switch checked={ev.ativo} onCheckedChange={v => atualizarEvento(ev.id, { ativo: v })} />
                        <Button size="sm" variant="outline" onClick={() => setEditandoId(ev.id)}><Edit2 className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" className="text-red-600" onClick={() => { if (confirm('Remover?')) { removerEvento(ev.id); toast({ title: "Removido" }); } }}><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarioFiscalManager;
