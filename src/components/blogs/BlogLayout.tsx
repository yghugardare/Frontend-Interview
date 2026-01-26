import React, { useState } from 'react';
import { useBlogs, useBlogById } from '../../hooks/useBlogs';
import { BlogCard } from './BlogCard';
import { BlogDetail } from './BlogDetail';
import { CreateBlogForm } from './CreateBlogForm';
import { Card } from '../ui/Card';

export const BlogLayout: React.FC = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const blogsQuery = useBlogs();
  const blogDetailQuery = useBlogById(selectedBlogId || '');

  const blogs = blogsQuery.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">CA Monk Blog</h1>
          <p className="text-gray-600 mt-2">
            Explore insightful articles on finance, technology, and more
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showCreateForm ? (
          <div className="mb-8">
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
            >
              ← Back to Blogs
            </button>
            <CreateBlogForm
              onSuccess={() => {
                setShowCreateForm(false);
                setSelectedBlogId(null);
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Blog List */}
            <div className="lg:col-span-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Blogs</h2>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  + New Blog
                </button>
              </div>

              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {blogsQuery.isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <div className="space-y-2">
                          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : blogsQuery.isError ? (
                  <Card className="bg-red-50 border-red-200">
                    <p className="text-red-700 font-semibold">
                      Error loading blogs
                    </p>
                    <p className="text-red-600 text-sm mt-2">
                      {blogsQuery.error?.message}
                    </p>
                  </Card>
                ) : blogs.length === 0 ? (
                  <Card>
                    <p className="text-gray-500 text-center py-8">
                      No blogs yet. Create one to get started!
                    </p>
                  </Card>
                ) : (
                  blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      onClick={() => setSelectedBlogId(blog.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right Panel - Blog Detail */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedBlogId ? 'Blog Details' : 'Select a Blog'}
              </h2>
              <BlogDetail
                blog={selectedBlogId ? blogDetailQuery.data || null : null}
                isLoading={selectedBlogId ? blogDetailQuery.isLoading : false}
                error={selectedBlogId ? blogDetailQuery.error : null}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
