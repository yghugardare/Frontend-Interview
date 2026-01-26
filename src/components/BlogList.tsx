import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard, BlogCardSkeleton } from "@/components/BlogCard";

interface BlogListProps {
    selectedBlogId: string | null;
    onSelectBlog: (id: string) => void;
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, isError, error } = useBlogs();

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <p className="text-destructive font-medium">Error loading blogs</p>
                <p className="text-sm text-muted-foreground mt-1">
                    {error instanceof Error ? error.message : "Something went wrong"}
                </p>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No blogs found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Create your first blog to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedBlogId === blog.id}
                    onClick={() => onSelectBlog(blog.id)}
                />
            ))}
        </div>
    );
}
