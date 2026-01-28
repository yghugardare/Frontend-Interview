import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SmallBlogCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        {/* Category badges skeleton */}
        <div className="flex flex-wrap gap-2 mb-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        
        {/* Title skeleton - line-clamp-2 */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-4/5" />
        
        {/* Date skeleton - text-xs */}
        <Skeleton className="h-3 w-24 mt-2" />
      </CardHeader>
      
      <CardContent>
        {/* Description skeleton - text-sm, line-clamp-3 */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
