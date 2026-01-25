import { Blog } from "@/types/blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { AlertCircle } from "lucide-react";

interface BlogListProps {
  blogs: Blog[] | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

const BlogList = ({ blogs, isLoading, isError, selectedBlogId, onSelectBlog }: BlogListProps) => {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-3 h-10 w-10 text-destructive" />
        <p className="text-sm font-medium text-destructive">Failed to load blogs</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Make sure the JSON server is running on port 3001
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground">No blogs found</p>
        <p className="mt-1 text-xs text-muted-foreground">Create your first blog post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isActive={blog.id === selectedBlogId}
          onClick={() => onSelectBlog(blog.id)}
        />
      ))}
    </div>
  );
};

export default BlogList;
