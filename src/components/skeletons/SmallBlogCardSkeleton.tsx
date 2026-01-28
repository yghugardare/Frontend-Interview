import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SmallBlogCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-4/5" />
        
        <Skeleton className="h-3 w-24 mt-2" />
      </CardHeader>
      
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
