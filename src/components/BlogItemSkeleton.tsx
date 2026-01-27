import { Card, CardContent, CardHeader } from "@/shadcn/components/ui/card";
import { Skeleton } from "@/shadcn/components/ui/skeleton";

export default function BlogItemSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="h-4 w-3/4" />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </CardContent>
    </Card>
  );
}
