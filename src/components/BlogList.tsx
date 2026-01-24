import { BlogCard } from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBlogs } from "@/hooks/useBlogs";
import type { Blog } from "@/types/blog";

interface BlogListProps {
  onSelectBlog: (blog: Blog) => void;
  selectedBlogId?: string;
}

export const BlogList = ({ onSelectBlog, selectedBlogId }: BlogListProps) => {
  const { data: blogs, isLoading, error } = useGetAllBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-red-500 mb-2">Error!</div>
        <p className="text-sm text-gray-600">
          {(error as Error).message}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Check if the server is running on port 3001
        </p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-600">No blogs yet</p>
        <p className="text-xs text-gray-500 mt-1">Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClick={() => onSelectBlog(blog)}
          isSelected={selectedBlogId === blog.id}
        />
      ))}
    </div>
  );
};
