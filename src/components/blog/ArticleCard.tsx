import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

type ArticleCardProps = {
  icon: LucideIcon
  category: string
  timeAgo: string
  title: string
  description?: string
  tag?: string
  featured?: boolean
  onClick?: () => void
}

export function ArticleCard({
  icon: Icon,
  category,
  timeAgo,
  title,
  description,
  tag,
  featured = false,
  onClick,
}: ArticleCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        featured && "border-l-4 border-l-purple-600"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("mt-1", featured ? "text-purple-600" : "text-muted-foreground")}>
            <Icon className="size-5" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-bold uppercase", featured && "text-purple-600")}>
                {category}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}
            {tag && (
              <div className="pt-1">
                <Badge
                  variant={featured ? "default" : "soft"}
                  className={cn(featured && "bg-purple-600 text-white")}
                >
                  {tag}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
