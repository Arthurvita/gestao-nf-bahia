import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"

interface AlertCardProps {
  title: string
  description: string
  type: "urgent" | "warning" | "info" | "success"
  dueDate?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function AlertCard({ 
  title, 
  description, 
  type, 
  dueDate, 
  actionLabel, 
  onAction,
  className 
}: AlertCardProps) {
  const getTypeConfig = () => {
    switch (type) {
      case "urgent":
        return {
          icon: XCircle,
          bgColor: "bg-destructive/5 border-destructive/20",
          textColor: "text-destructive",
          badgeVariant: "destructive" as const
        }
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-warning/5 border-warning/20",
          textColor: "text-warning",
          badgeVariant: "secondary" as const
        }
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-success/5 border-success/20",
          textColor: "text-success",
          badgeVariant: "default" as const
        }
      default:
        return {
          icon: Clock,
          bgColor: "bg-primary/5 border-primary/20",
          textColor: "text-primary",
          badgeVariant: "secondary" as const
        }
    }
  }

  const config = getTypeConfig()
  const Icon = config.icon

  return (
    <Card className={cn("relative", config.bgColor, className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", config.textColor)} />
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          <Badge variant={config.badgeVariant} className="text-xs">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between">
          {dueDate && (
            <span className="text-xs text-muted-foreground">
              Vencimento: {dueDate}
            </span>
          )}
          {actionLabel && onAction && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onAction}
              className="ml-auto"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}