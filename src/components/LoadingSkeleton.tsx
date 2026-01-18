import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const BlogListSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-16" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export const BlogDetailSkeleton = () => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    );
};
