import { DashboardCard } from "@/components/DashboardCard"
import { AlertCard } from "@/components/AlertCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Calculator,
  FileText,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download
} from "lucide-react"

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da gestão contábil</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importar XML
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Faturamento Mensal"
          value="R$ 127.350"
          subtitle="Mês atual"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="Tributos a Recolher"
          value="R$ 8.420"
          subtitle="Vencimento próximo"
          icon={Calculator}
          status="warning"
        />
        <DashboardCard
          title="Notas Fiscais"
          value="247"
          subtitle="Emitidas este mês"
          icon={FileText}
          trend={{ value: 8.3, isPositive: true }}
          status="success"
        />
        <DashboardCard
          title="Obrigações Pendentes"
          value="3"
          subtitle="Requer atenção"
          icon={AlertTriangle}
          status="danger"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alertas Importantes */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Alertas e Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AlertCard
                title="DAS Simples Nacional"
                description="Vencimento do DAS referente ao mês anterior se aproxima."
                type="urgent"
                dueDate="25/01/2024"
                actionLabel="Calcular"
              />
              <AlertCard
                title="Declaração DEFIS"
                description="Prazo para entrega da DEFIS 2023 está se aproximando."
                type="warning"
                dueDate="31/01/2024"
                actionLabel="Preparar"
              />
              <AlertCard
                title="Backup Realizado"
                description="Backup automático dos dados foi realizado com sucesso."
                type="success"
              />
            </CardContent>
          </Card>
        </div>

        {/* Resumo Fiscal */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Resumo Fiscal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">ICMS</span>
                <Badge variant="secondary">R$ 3.420</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">ISS</span>
                <Badge variant="secondary">R$ 1.850</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">PIS/COFINS</span>
                <Badge variant="secondary">R$ 2.150</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-sm font-medium text-primary">Total</span>
                <Badge>R$ 7.420</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Indicadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Margem Bruta</span>
                <span className="font-medium text-success">32.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Carga Tributária</span>
                <span className="font-medium">15.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ticket Médio</span>
                <span className="font-medium">R$ 285</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
