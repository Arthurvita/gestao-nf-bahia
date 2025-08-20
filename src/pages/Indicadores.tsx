import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/DashboardCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
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
  Line,
  RadialBarChart,
  RadialBar
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Target,
  BarChart3,
  Download,
  Calendar
} from "lucide-react"

const performanceData = [
  { mes: "Jul", receita: 85000, lucro: 15300, margem: 18.0 },
  { mes: "Ago", receita: 92000, lucro: 18400, margem: 20.0 },
  { mes: "Set", receita: 110000, lucro: 24200, margem: 22.0 },
  { mes: "Out", receita: 105000, lucro: 21000, margem: 20.0 },
  { mes: "Nov", receita: 125000, lucro: 28750, margem: 23.0 },
  { mes: "Dez", receita: 135000, lucro: 32400, margem: 24.0 },
  { mes: "Jan", receita: 127350, lucro: 41603, margem: 32.7 }
]

const kpisData = [
  { indicador: "Margem Bruta", valor: 32.7, meta: 30, cor: "#10B981" },
  { indicador: "Margem Líquida", valor: 28.5, meta: 25, cor: "#8B5CF6" },
  { indicador: "Giro Estoque", valor: 4.2, meta: 4.0, cor: "#F59E0B" }
]

const comparativoData = [
  { categoria: "Mesmo Setor", valor: 18.5, tipo: "benchmark" },
  { categoria: "Nossa Empresa", valor: 32.7, tipo: "atual" },
  { categoria: "Meta 2024", valor: 30.0, tipo: "meta" }
]

const tendenciaData = [
  { periodo: "Jan 23", valor: 15.2 },
  { periodo: "Abr 23", valor: 18.5 },
  { periodo: "Jul 23", valor: 20.1 },
  { periodo: "Out 23", valor: 22.8 },
  { periodo: "Jan 24", valor: 32.7 }
]

const distribuicaoVendas = [
  { segmento: "Produto A", valor: 45, cor: "#8B5CF6" },
  { segmento: "Produto B", valor: 30, cor: "#A78BFA" },
  { segmento: "Produto C", valor: 15, cor: "#C4B5FD" },
  { segmento: "Outros", valor: 10, cor: "#DDD6FE" }
]

const Indicadores = () => {
  const margemAtual = 32.7
  const crescimentoMargem = 8.7
  const ticketMedio = 285
  const crescimentoTicket = 12.5

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Indicadores</h1>
          <p className="text-muted-foreground">KPIs e análise de performance da empresa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Período
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Cards de KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Margem Bruta"
          value={`${margemAtual}%`}
          subtitle="Meta: 30%"
          icon={Percent}
          trend={{ value: crescimentoMargem, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="Ticket Médio"
          value={`R$ ${ticketMedio}`}
          subtitle="Por transação"
          icon={DollarSign}
          trend={{ value: crescimentoTicket, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="ROI"
          value="185%"
          subtitle="Retorno investimento"
          icon={TrendingUp}
          trend={{ value: 22.3, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="Produtividade"
          value="142%"
          subtitle="Acima da meta"
          icon={Target}
          status="success"
        />
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AreaChart className="w-5 h-5 text-primary" />
              Performance Financeira - Últimos 7 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
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
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  name="Receita"
                />
                <Area 
                  type="monotone" 
                  dataKey="lucro" 
                  stackId="2"
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success))"
                  fillOpacity={0.5}
                  name="Lucro"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* KPIs em Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              KPIs vs Meta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={kpisData}>
                <RadialBar dataKey="valor" cornerRadius={10} fill="hsl(var(--primary))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {kpisData.map((kpi, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{kpi.indicador}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={kpi.valor > kpi.meta ? "default" : "secondary"}>
                      {kpi.valor}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">Meta: {kpi.meta}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparativo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Benchmark Margem Bruta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparativoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="categoria" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="valor">
                  {comparativoData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.tipo === 'atual' ? "hsl(var(--primary))" :
                        entry.tipo === 'meta' ? "hsl(var(--success))" :
                        "hsl(var(--muted))"
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Mix de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distribuicaoVendas}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="valor"
                >
                  {distribuicaoVendas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {distribuicaoVendas.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.cor }}
                    />
                    <span className="text-sm">{item.segmento}</span>
                  </div>
                  <span className="font-medium">{item.valor}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tendência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Tendência Margem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tendenciaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="periodo" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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

      {/* Resumo Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <h4 className="font-semibold text-success">Pontos Fortes</h4>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Margem bruta 9% acima da meta</li>
                <li>• Crescimento consistente há 7 meses</li>
                <li>• ROI muito superior ao setor</li>
                <li>• Ticket médio em alta</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-warning" />
                <h4 className="font-semibold text-warning">Oportunidades</h4>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Diversificar mix de produtos</li>
                <li>• Expandir linha Produto A (45%)</li>
                <li>• Otimizar giro de estoque</li>
                <li>• Aumentar frequência de compra</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-primary">Próximos Passos</h4>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Manter tendência de crescimento</li>
                <li>• Investir em produtos de maior margem</li>
                <li>• Acompanhar indicadores semanalmente</li>
                <li>• Revisar metas para Q2 2024</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Indicadores