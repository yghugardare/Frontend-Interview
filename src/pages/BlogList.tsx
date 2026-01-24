import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/api';
import { BlogCard } from '@/components/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogList() {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-destructive">
                <h2 className="text-xl font-bold">Error loading blogs</h2>
                <p>Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Latest Blogs</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
