import BlogCard from "./BlogCard";
import { useBlogs } from "@/hooks/useBlogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog";
import { Loader2 } from "lucide-react";

interface BlogListProps {
  onSelectBlog: (id: number) => void;
  selectedBlogId?: number | null;
  categoryFilter?: string;
}

export default function BlogList({ onSelectBlog, selectedBlogId, categoryFilter }: BlogListProps) {
  const { data: allBlogs, isLoading, isError } = useBlogs();

  const data = categoryFilter
    ? allBlogs?.filter(blog => blog.category.includes(categoryFilter))
    : allBlogs;

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 animate-spin text-blue-600" size={40} />
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p className="font-semibold">Failed to load blogs</p>
          <p className="text-sm mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No blogs found</p>
          <p className="text-gray-400 text-sm mt-2">Start by creating your first blog post</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      {data?.map((blog: Blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClick={() => onSelectBlog(blog.id)}
          isSelected={selectedBlogId === blog.id}
        />
      ))}
    </div>
  );
}
