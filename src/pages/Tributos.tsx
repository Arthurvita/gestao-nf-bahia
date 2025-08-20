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
  Calculator,
  FileText,
  AlertTriangle,
  TrendingDown,
  Download,
  Calendar
} from "lucide-react"

const tributosData = [
  { tributo: "ICMS", valor: 3420, percentual: 2.68, cor: "#8B5CF6" },
  { tributo: "ISS", valor: 1850, percentual: 1.45, cor: "#A78BFA" },
  { tributo: "PIS", valor: 1275, percentual: 1.00, cor: "#C4B5FD" },
  { tributo: "COFINS", valor: 875, percentual: 0.69, cor: "#DDD6FE" }
]

const evolutionData = [
  { mes: "Jul", total: 6200 },
  { mes: "Ago", total: 6800 },
  { mes: "Set", total: 7500 },
  { mes: "Out", total: 7100 },
  { mes: "Nov", total: 8200 },
  { mes: "Dez", total: 8800 },
  { mes: "Jan", total: 7420 }
]

const dasData = [
  { mes: "Ago/23", valor: 8500, pago: true },
  { mes: "Set/23", valor: 9200, pago: true },
  { mes: "Out/23", valor: 8800, pago: true },
  { mes: "Nov/23", valor: 9500, pago: true },
  { mes: "Dez/23", valor: 10200, pago: false },
  { mes: "Jan/24", valor: 7420, pago: false }
]

const Tributos = () => {
  const totalTributos = tributosData.reduce((acc, tributo) => acc + tributo.valor, 0)
  const cargaTributaria = ((totalTributos / 127350) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tributos</h1>
          <p className="text-muted-foreground">Gestão e acompanhamento dos tributos devidos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Calendário Fiscal
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            DAS
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total a Recolher"
          value={`R$ ${totalTributos.toLocaleString()}`}
          subtitle="Janeiro 2024"
          icon={Calculator}
          status="warning"
        />
        <DashboardCard
          title="Carga Tributária"
          value={`${cargaTributaria}%`}
          subtitle="Do faturamento"
          icon={TrendingDown}
          trend={{ value: -0.5, isPositive: false }}
        />
        <DashboardCard
          title="DAS Pendente"
          value="R$ 10.200"
          subtitle="Venc: 20/01/2024"
          icon={AlertTriangle}
          status="danger"
        />
        <DashboardCard
          title="Próximo Vencimento"
          value="5 dias"
          subtitle="DAS Janeiro"
          icon={FileText}
          status="warning"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição dos Tributos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Distribuição por Tributo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tributosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="valor"
                >
                  {tributosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Valor']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {tributosData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.cor }}
                    />
                    <span className="text-sm font-medium">{item.tributo}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">R$ {item.valor.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{item.percentual}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evolução dos Tributos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              Evolução dos Tributos - Últimos 7 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolutionData}>
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
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Histórico DAS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-primary" />
            Histórico DAS - Simples Nacional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dasData}>
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
              <Bar dataKey="valor" name="Valor DAS">
                {dasData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.pago ? "hsl(var(--success))" : "hsl(var(--warning))"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm">Pago</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm">Pendente</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Tributos