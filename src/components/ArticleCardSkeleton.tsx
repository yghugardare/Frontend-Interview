import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ArticleCardSkeleton = () => {
  return (
    <Card className="p-3 rounded-lg">
      <CardContent className="flex flex-col gap-2 p-0">
        
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        <Skeleton className="h-3 w-16" />
      </CardContent>
    </Card>
  )
}

export default ArticleCardSkeleton;
