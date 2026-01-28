import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function BigBlogCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton - matches aspect-video */}
      <Skeleton className="aspect-video w-full" />
      
      <CardHeader>
        {/* Category badges skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
        
        {/* Title skeleton - matches text-2xl */}
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-8 w-3/4" />
        
        {/* Date skeleton - matches text-sm */}
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      
      <CardContent>
        {/* Description skeleton - 3 lines to match line-clamp-3 */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}
