import React from 'react';
import type { Blog } from '../../types/blog';
import { Card } from '../ui/Card';

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none"
      >
        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>

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

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {blog.description}
        </p>

        <p className="text-xs text-gray-400">{formatDate(blog.date)}</p>
      </button>
    </Card>
  );
};
