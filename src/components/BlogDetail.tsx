import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogById } from "@/hooks/useBlogs";
import { formatDate } from "@/utils/dateFormatter";

interface BlogDetailProps {
  blogId: string;
}

export const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const { data: blog, isLoading, error } = useGetBlogById(blogId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Error loading blog: {(error as Error).message}
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg bg-muted">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-50">
            <p className="text-gray-400">No image available</p>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
          {blog.category.map((cat, index) => (
            <Badge key={index} variant="secondary">
              {cat}
            </Badge>
          ))}
          <span className="text-sm text-muted-foreground">
            {formatDate(blog.date)}
          </span>
        </div>

        <p className="text-lg text-muted-foreground">{blog.description}</p>

        <div className="prose prose-sm md:prose-base max-w-none pt-4">
          <div className="whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};
