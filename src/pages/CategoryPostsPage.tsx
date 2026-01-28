import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "@/hooks/useBlogs";
import BlogDetail from "@/components/blog/BlogDetail";
import BlogList from "@/components/blog/BlogList";
import { ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";

export default function CategoryPostsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { data: blogs } = useBlogs();
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  if (!categoryName) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-2">Error</h2>
          <p className="text-red-700">Category not found.</p>
        </div>
      </div>
    );
  }

  const decodedCategory = decodeURIComponent(categoryName);

  // Filter blogs by category
  const categoryBlogs = blogs?.filter((blog) =>
    blog.category.includes(decodedCategory)
  ) || [];

  if (categoryBlogs.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/categories")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors font-semibold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Categories</span>
        </button>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-2">No posts found</h2>
          <p className="text-blue-700">There are no posts in the {decodedCategory} category yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/categories")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors font-semibold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Categories</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Tag size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
              {decodedCategory}
            </h1>
          </div>
          <p className="text-gray-600">
            {categoryBlogs.length} {categoryBlogs.length === 1 ? "post" : "posts"} in this category
          </p>
        </div>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-screen">
          {/* LEFT PANEL - Blog List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit lg:sticky lg:top-24 flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <h2 className="text-white font-bold text-base">
                  {decodedCategory} Posts
                </h2>
              </div>
              <div className="overflow-y-auto max-h-96 lg:max-h-[calc(100vh-200px)]">
                <BlogList 
                  onSelectBlog={setSelectedBlogId}
                  selectedBlogId={selectedBlogId}
                  categoryFilter={decodedCategory}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Blog Detail */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {selectedBlogId ? (
              <div className="overflow-y-auto h-auto lg:h-[calc(100vh-100px)]">
                <BlogDetail
                  id={selectedBlogId}
                  onBack={() => setSelectedBlogId(null)}
                  onSelectBlog={setSelectedBlogId}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center text-center p-12 h-96">
                <div>
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📖</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Select an Article
                  </h3>
                  <p className="text-gray-600 max-w-sm mx-auto text-sm">
                    Choose a post from the {decodedCategory} category to read
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
