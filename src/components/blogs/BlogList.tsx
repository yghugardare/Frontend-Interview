import type { Blog } from "../../types/blog";
import { BlogCard } from "./BlogCard";
import { BlogListSkeleton } from "./BlogListSkeleton";
import { EmptyState } from "./EmptyState";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface BlogListProps {
  blogs: Blog[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  selectedBlogId: string | null;
  onSelectBlog: (id: string) => void;
  onRetry: () => void;
}

export function BlogList({
  blogs,
  isLoading,
  isError,
  error,
  selectedBlogId,
  onSelectBlog,
  onRetry,
}: BlogListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <BlogListSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-red-50 p-4 mb-4">
          <AlertCircle className="h-7 w-7 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Failed to load blogs
        </h3>
        <p className="text-sm text-gray-600 mb-4 max-w-sm">
          {error?.message || "Something went wrong. Please try again."}
        </p>
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState
        title="No blogs yet"
        description="Create your first blog post to get started."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isSelected={String(blog.id) === selectedBlogId}
          onClick={() => onSelectBlog(String(blog.id))}
        />
      ))}
    </div>
  );
}
