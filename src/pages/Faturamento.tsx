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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Download,
  Filter
} from "lucide-react"

const monthlyData = [
  { mes: "Jul", faturamento: 85000, meta: 90000 },
  { mes: "Ago", faturamento: 92000, meta: 95000 },
  { mes: "Set", faturamento: 110000, meta: 100000 },
  { mes: "Out", faturamento: 105000, meta: 110000 },
  { mes: "Nov", faturamento: 125000, meta: 120000 },
  { mes: "Dez", faturamento: 135000, meta: 130000 },
  { mes: "Jan", faturamento: 127350, meta: 125000 }
]

const categoryData = [
  { nome: "Produtos", valor: 85000, cor: "#8B5CF6" },
  { nome: "Serviços", valor: 42350, cor: "#A78BFA" }
]

const dailyData = [
  { dia: 1, valor: 4200 },
  { dia: 5, valor: 5800 },
  { dia: 10, valor: 3900 },
  { dia: 15, valor: 6200 },
  { dia: 20, valor: 5100 },
  { dia: 25, valor: 7300 },
  { dia: 30, valor: 4800 }
]

const Faturamento = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Faturamento</h1>
          <p className="text-muted-foreground">Análise detalhada do faturamento da empresa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Faturamento Total"
          value="R$ 127.350"
          subtitle="Janeiro 2024"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="Meta do Mês"
          value="R$ 125.000"
          subtitle="101.8% atingido"
          icon={TrendingUp}
          status="success"
        />
        <DashboardCard
          title="Ticket Médio"
          value="R$ 285"
          subtitle="Por transação"
          icon={ShoppingCart}
          trend={{ value: 5.2, isPositive: true }}
        />
        <DashboardCard
          title="Dias Restantes"
          value="10"
          subtitle="Para fechamento"
          icon={Calendar}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Faturamento Mensal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              Faturamento vs Meta - Últimos 7 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
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
                <Bar dataKey="faturamento" fill="hsl(var(--primary))" name="Faturamento" />
                <Bar dataKey="meta" fill="hsl(var(--muted))" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="valor"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Faturamento']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.cor }}
                    />
                    <span className="text-sm">{item.nome}</span>
                  </div>
                  <Badge variant="secondary">
                    R$ {item.valor.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evolução Diária */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Evolução Diária - Janeiro 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
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
                dataKey="valor" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Faturamento