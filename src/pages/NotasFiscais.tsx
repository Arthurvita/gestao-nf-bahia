import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/DashboardCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Filter
} from "lucide-react"

const notasData = [
  { mes: "Jul", emitidas: 185, recebidas: 42 },
  { mes: "Ago", emitidas: 198, recebidas: 38 },
  { mes: "Set", emitidas: 220, recebidas: 45 },
  { mes: "Out", emitidas: 195, recebidas: 41 },
  { mes: "Nov", emitidas: 235, recebidas: 52 },
  { mes: "Dez", emitidas: 248, recebidas: 48 },
  { mes: "Jan", emitidas: 247, recebidas: 44 }
]

const tiposData = [
  { tipo: "NFe Vendas", quantidade: 210, cor: "#8B5CF6" },
  { tipo: "NFe Devolução", quantidade: 12, cor: "#A78BFA" },
  { tipo: "NFSe Serviços", quantidade: 25, cor: "#C4B5FD" }
]

const statusData = [
  { status: "Autorizada", quantidade: 235, cor: "#10B981" },
  { status: "Cancelada", quantidade: 8, cor: "#EF4444" },
  { status: "Rejeitada", quantidade: 4, cor: "#F59E0B" }
]

const dailyUploads = [
  { dia: 1, uploads: 12 },
  { dia: 5, uploads: 18 },
  { dia: 10, uploads: 8 },
  { dia: 15, uploads: 22 },
  { dia: 20, uploads: 15 },
  { dia: 25, uploads: 28 },
  { dia: 30, uploads: 19 }
]

const NotasFiscais = () => {
  const totalEmitidas = 247
  const totalRecebidas = 44
  const taxaSucesso = ((235 / 247) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Notas Fiscais</h1>
          <p className="text-muted-foreground">Controle e análise das notas fiscais emitidas e recebidas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload XML
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Notas Emitidas"
          value={totalEmitidas}
          subtitle="Janeiro 2024"
          icon={FileText}
          trend={{ value: 8.3, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="Notas Recebidas"
          value={totalRecebidas}
          subtitle="Anexadas"
          icon={Upload}
          trend={{ value: 15.8, isPositive: true }}
        />
        <DashboardCard
          title="Taxa de Sucesso"
          value={`${taxaSucesso}%`}
          subtitle="Autorizadas"
          icon={CheckCircle}
          status="success"
        />
        <DashboardCard
          title="Pendências"
          value="12"
          subtitle="Requer atenção"
          icon={AlertCircle}
          status="warning"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              Evolução Mensal - Últimos 7 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={notasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="emitidas" fill="hsl(var(--primary))" name="Emitidas" />
                <Bar dataKey="recebidas" fill="hsl(var(--accent))" name="Recebidas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Por Tipo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Distribuição por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tiposData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="quantidade"
                >
                  {tiposData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {tiposData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.cor }}
                    />
                    <span className="text-sm">{item.tipo}</span>
                  </div>
                  <Badge variant="secondary">
                    {item.quantidade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status das Notas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Status das Notas Fiscais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="status" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="quantidade" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Uploads Diários */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              Uploads de XML - Janeiro 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyUploads}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="uploads" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Detalhado - Janeiro 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Notas Emitidas</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total de Notas:</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Valor Total:</span>
                  <span className="font-medium">R$ 127.350</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ticket Médio:</span>
                  <span className="font-medium">R$ 516</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">XMLs Anexados</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Anexados:</span>
                  <span className="font-medium">44</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Validados:</span>
                  <span className="font-medium text-success">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Com Erro:</span>
                  <span className="font-medium text-destructive">2</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Próximas Ações</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-sm">8 XMLs pendentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-sm">4 notas rejeitadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Backup em andamento</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotasFiscais