import { Card, CardContent, CardHeader } from "@/shadcn/components/ui/card";
import { Skeleton } from "@/shadcn/components/ui/skeleton";

export default function BlogDetailSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      <Card>
        <div className="w-full h-48 sm:h-64 md:h-80 bg-muted animate-pulse rounded-t-lg" />
        <CardHeader className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    </div>
  );
}
