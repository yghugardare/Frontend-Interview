import { useBlogs } from '@/hooks/useBlogQueries';
import type { Blog } from '@/types/blog';
import { AlertCircle, Loader2 } from 'lucide-react';

interface BlogListProps {
  onSelectBlog: (blog: Blog) => void;
}

export function BlogList({ onSelectBlog }: BlogListProps) {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-600" />
          <p className="text-sm text-gray-500">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-900 text-sm">Error Loading Blogs</p>
            <p className="text-xs text-red-700 mt-1">
              {error instanceof Error ? error.message : 'Failed to load blogs.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-sm">No blogs available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          onClick={() => onSelectBlog(blog)}
          className="cursor-pointer p-4 rounded-lg border-l-4 border-l-purple-600 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Category with icon */}
              <div className="flex items-center gap-1 mb-2">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v10.5a2.25 2.25 0 002.25 2.25h8.5a2.25 2.25 0 002.25-2.25V10m-11-4h6m-6 3h6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <span className="text-xs font-semibold text-purple-600">
                  {blog.category[0] || 'UNCATEGORIZED'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                {blog.description}
              </p>

              {/* Badge */}
              {blog.category.includes('Featured') || blog.category[0] === 'FINANCE' && (
                <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
