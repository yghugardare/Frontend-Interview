import type { Blog } from "../../types/blog";
import { BlogDetailSkeleton } from "./BlogDetailSkeleton";
import { EmptyState } from "./EmptyState";
import { formatDate } from "../../lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, AlertCircle, RefreshCw } from "lucide-react";

interface BlogDetailProps {
  blog: Blog | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onBack?: () => void;
  onRetry?: () => void;
  showBackButton?: boolean;
}

export function BlogDetail({
  blog,
  isLoading,
  isError,
  error,
  onBack,
  onRetry,
  showBackButton = false,
}: BlogDetailProps) {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogDetailSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="rounded-full bg-red-50 p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Blog not found
        </h3>
        <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">
          {error?.message || "The blog you're looking for doesn't exist or has been removed."}
        </p>
        <div className="flex gap-3">
          {onBack && (
            <Button onClick={onBack} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Button>
          )}
          {onRetry && (
            <Button onClick={onRetry} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <EmptyState
          title="Select a blog"
          description="Choose a blog from the list to read its content."
        />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm flex items-center gap-2">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <span className="text-gray-600">Home</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-blue-600 font-medium">Blogs & Insights</span>
        </div>

        {/* Main Content Grid - Title left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left - Title & Description */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              {blog.description}
            </p>
            {/* Author & Date */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">CA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">CA Monk Team</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Last Updated: {formatDate(blog.date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Cover Image */}
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg";
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Section with Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents - Left Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2 text-sm">
                {blog.content.split("\n\n").slice(0, 5).map((_, index) => (
                  <a
                    key={index}
                    href={`#section-${index}`}
                    className="block text-gray-600 hover:text-gray-900 py-1"
                  >
                    Section {index + 1}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            <div className="prose prose-gray max-w-none">
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  id={`section-${index}`}
                  className="text-gray-700 leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </main>

          {/* CTA Sidebar - Right */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 text-lg mb-2">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest insights delivered to your inbox.
              </p>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                Subscribe
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
