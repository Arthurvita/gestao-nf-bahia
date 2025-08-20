import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  status?: "success" | "warning" | "danger"
  className?: string
}

export function DashboardCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  status,
  className 
}: DashboardCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-success"
      case "warning":
        return "text-warning"
      case "danger":
        return "text-destructive"
      default:
        return "text-primary"
    }
  }

  const getStatusBg = () => {
    switch (status) {
      case "success":
        return "bg-success/10"
      case "warning":
        return "bg-warning/10"
      case "danger":
        return "bg-destructive/10"
      default:
        return "bg-primary/10"
    }
  }

  return (
    <Card className={cn("relative overflow-hidden group hover:shadow-lg transition-all duration-300", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/5" />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", getStatusBg())}>
          <Icon className={cn("h-4 w-4", getStatusColor())} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {trend && (
            <Badge variant={trend.isPositive ? "default" : "destructive"} className="text-xs">
              {trend.isPositive ? "+" : ""}{trend.value}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}