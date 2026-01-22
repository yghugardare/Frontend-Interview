import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { useBlog } from "../hooks/useBlog";
import { AppShell } from "../components/layout/AppShell";
import { BlogList } from "../components/blogs/BlogList";
import { BlogDetail } from "../components/blogs/BlogDetail";

export function BlogsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isBlogsError,
    error: blogsError,
    refetch: refetchBlogs,
  } = useBlogs();

  const selectedBlogId = id || null;

  const {
    data: selectedBlog,
    isLoading: isLoadingBlog,
    isError: isBlogError,
    error: blogError,
    refetch: refetchBlog,
  } = useBlog(selectedBlogId);

  // Auto-select first blog on desktop if no blog is selected
  useEffect(() => {
    if (!id && blogs && blogs.length > 0 && window.innerWidth >= 1024) {
      navigate(`/blogs/${blogs[0].id}`, { replace: true });
    }
  }, [blogs, id, navigate]);

  const handleSelectBlog = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleBlogCreated = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleBackToList = () => {
    navigate("/blogs");
  };

  // Show detail view when ID is present
  const showDetailView = Boolean(id);

  return (
    <AppShell onBlogCreated={handleBlogCreated}>
      {/* Show Blog Detail Page */}
      {showDetailView ? (
        <div className="min-h-[calc(100vh-80px)]">
          <BlogDetail
            blog={selectedBlog}
            isLoading={isLoadingBlog && Boolean(selectedBlogId)}
            isError={isBlogError}
            error={blogError}
            onBack={handleBackToList}
            onRetry={() => refetchBlog()}
            showBackButton={true}
          />
        </div>
      ) : (
        /* Show Blog List Page */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <span className="text-gray-600">Home</span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-blue-600 font-medium">Blogs & Insights</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Expert Insights That Drives Innovation And Progress
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Discover expert perspectives to spark ideas and strengthen your expertise.
            </p>
          </div>

          {/* Blog Grid */}
          <BlogList
            blogs={blogs}
            isLoading={isLoadingBlogs}
            isError={isBlogsError}
            error={blogsError}
            selectedBlogId={selectedBlogId}
            onSelectBlog={handleSelectBlog}
            onRetry={() => refetchBlogs()}
          />
        </div>
      )}
    </AppShell>
  );
}
