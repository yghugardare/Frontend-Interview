import { useBlogs } from "@/hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

export default function CategoriesPage() {
  const { data: blogs, isLoading } = useBlogs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Extract unique categories from blogs
  const categories = new Map<string, number>();
  blogs?.forEach((blog) => {
    blog.category.forEach((cat) => {
      categories.set(cat, (categories.get(cat) || 0) + 1);
    });
  });

  const categoryArray = Array.from(categories.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Tag size={24} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
        </div>
        <p className="text-lg text-gray-600">
          Explore our blog posts organized by category
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArray.map(({ name, count }) => (
          <div
            key={name}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <Badge variant="default" className="bg-blue-600 text-white">
                {count} {count === 1 ? "post" : "posts"}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize">
              {name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover all posts tagged with {name}
            </p>
            <Link
              to={`/category/${encodeURIComponent(name)}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              View Posts
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      {categoryArray.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No categories available yet.</p>
        </div>
      )}
    </div>
  );
}
