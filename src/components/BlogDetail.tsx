import { useBlog } from '@/hooks/useBlogQueries';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogDetailProps {
  blogId: string;
  onBack: () => void;
}

export function BlogDetail({ blogId, onBack }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-purple-600" />
          <p className="text-gray-600">Loading blog details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900">Error Loading Blog</h3>
              <p className="text-sm text-red-700 mt-1">
                {error instanceof Error ? error.message : 'Failed to load blog details.'}
              </p>
              <Button onClick={onBack} variant="outline" className="mt-4 text-sm">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog not found</p>
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {blog.title}
      </h1>

      {/* Metadata */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="flex gap-3">
          {blog.category.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-sm font-semibold text-purple-600">{cat}</span>
              {idx < blog.category.length - 1 && (
                <span className="text-gray-400">•</span>
              )}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-auto">
          {new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      {/* Read Time and Share */}
      <div className="flex items-center gap-8 mb-8 pb-6 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Read time</p>
          <p className="text-sm font-medium text-gray-900">
            {Math.ceil(blog.content.split(' ').length / 200)} mins
          </p>
        </div>
        <Button className="ml-auto bg-purple-600 hover:bg-purple-700 text-white">
          Share Article
        </Button>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-lg text-gray-900 leading-relaxed font-medium">
          {blog.description}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-base max-w-none text-gray-700">
        <div className="whitespace-pre-wrap leading-relaxed space-y-4">
          {blog.content}
        </div>
      </div>

      {/* Author Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full"></div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Written by Author</p>
            <p className="text-xs text-gray-500">Senior Financial Analyst</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="text-gray-400 hover:text-purple-600">👍</button>
            <button className="text-gray-400 hover:text-purple-600">💬</button>
          </div>
        </div>
      </div>
    </div>
  );
}
