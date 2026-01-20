import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BlogList } from "@/components/blog/BlogList";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { useBlogs } from "@/hooks/queries/useBlogs";
import { Blog } from "@/types/blog";

export function BlogListPage() {
  const navigate = useNavigate();
  const { data: blogs, isLoading, isError, refetch } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleSelectBlog = (blog: Blog) => {
    // On mobile, navigate to detail page
    if (window.innerWidth < 768) {
      navigate(`/blogs/${blog.id}`);
    } else {
      setSelectedBlog(blog);
    }
  };

  return (
    <PageContainer className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Blog List Panel */}
        <div className="w-full md:w-2/5 lg:w-1/3 overflow-y-auto scrollbar-thin pr-2">
          <h1 className="text-2xl font-bold mb-6">All Blogs</h1>
          <BlogList
            blogs={blogs}
            isLoading={isLoading}
            isError={isError}
            selectedId={selectedBlog?.id}
            onSelect={handleSelectBlog}
            onRetry={refetch}
          />
        </div>

        {/* Preview Panel - Hidden on mobile */}
        <div className="hidden md:block md:w-3/5 lg:w-2/3 overflow-y-auto scrollbar-thin">
          <BlogPreview blog={selectedBlog} />
        </div>
      </div>
    </PageContainer>
  );
}
