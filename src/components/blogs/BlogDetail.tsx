import React from 'react';
import type { Blog } from '../../types/blog';
import { Card } from '../ui/Card';

interface BlogDetailProps {
  blog: Blog | null;
  isLoading: boolean;
  error: Error | null;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({
  blog,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Card className="h-full">
        <div className="space-y-4">
          <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full bg-red-50 border-red-200">
        <p className="text-red-700 font-semibold">Error loading blog</p>
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      </Card>
    );
  }

  if (!blog) {
    return (
      <Card className="h-full flex items-center justify-center">
        <p className="text-gray-500">Select a blog to view details</p>
      </Card>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="h-full overflow-y-auto">
      <div className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-3 flex-wrap">
            {blog.category.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-500 mb-4">{formatDate(blog.date)}</p>

          <p className="text-gray-700 text-lg font-semibold mb-4">
            {blog.description}
          </p>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
