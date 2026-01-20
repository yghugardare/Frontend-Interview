import { Blog } from "@/types/blog";
import { BlogCard } from "./BlogCard";
import { BlogCardSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";

interface BlogListProps {
  blogs: Blog[] | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedId?: string;
  onSelect: (blog: Blog) => void;
  onRetry: () => void;
}

export function BlogList({
  blogs,
  isLoading,
  isError,
  selectedId,
  onSelect,
  onRetry,
}: BlogListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorState message="Failed to load blogs" onRetry={onRetry} />;
  }

  if (!blogs?.length) {
    return <EmptyState type="no-blogs" />;
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isSelected={blog.id === selectedId}
          onClick={() => onSelect(blog)}
        />
      ))}
    </div>
  );
}
