import BlogForm from "@/components/create-blog/BlogForm";
import { ArrowLeft, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateBlogPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-12 transition-colors font-semibold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <PenTool size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Share Your <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Story</span>
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Create engaging content and inspire readers worldwide
              </p>
            </div>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-semibold text-blue-600 mb-1">✨ Easy Publishing</div>
              <p className="text-xs text-gray-600">Simple form to get your ideas online in minutes</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-semibold text-blue-600 mb-1">🌍 Global Reach</div>
              <p className="text-xs text-gray-600">Connect with thousands of readers worldwide</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-semibold text-blue-600 mb-1">📊 Analytics</div>
              <p className="text-xs text-gray-600">Track views and engagement on your posts</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <BlogForm />
      </div>
    </div>
  );
}
