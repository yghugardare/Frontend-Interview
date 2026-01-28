import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "@/hooks/useBlogs";
import FullArticlePage from "@/components/ArticleDisplay";

export default function LatestBlogPage() {
  const { data: blogs, isLoading, error } = useBlogs();
  const navigate = useNavigate();

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      // Navigate to the latest blog (first one in the list)
      const latestBlogId = blogs[0].id;
      navigate(`/blog/${latestBlogId}`, { replace: true });
    }
  }, [blogs, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-2">Error</h2>
          <p className="text-red-700">Failed to load blogs. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-2">No Blogs</h2>
          <p className="text-blue-700">There are no blogs available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <FullArticlePage id={blogs[0].id} />
    </div>
  );
}
