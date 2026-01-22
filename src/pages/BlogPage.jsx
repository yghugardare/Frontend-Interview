import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2, Bookmark, ChevronLeft } from 'lucide-react';
import BlogContentSkeleton from '@/components/skeletons/BlogContentSkeleton';
import ErrorBoundary from '@/components/ErrorBoundary';

async function fetchBlog(id) {
  const response = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
}

export default function BlogPage() {
  const { id } = useParams();
  
  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlog(id),
    enabled: !!id,
  });

  if (isLoading) return <BlogContentSkeleton />;
  if (isError) return <div className="text-center py-8">Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.category.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(blog.date), 'MMM dd, yyyy')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                5 min read
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <Card className="mb-8 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </Card>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{blog.description}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Article Content</h2>
            <div className="space-y-6 text-gray-800 leading-relaxed">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Quote Section */}
          <Card className="p-6 border-l-4 border-blue-600 bg-blue-50 mb-8">
            <blockquote className="text-xl italic text-gray-700">
              "The accountant of the future will be a data scientist, a storyteller, and a strategic partner, all rolled into one."
            </blockquote>
          </Card>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.category.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Author Info */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-600"></div>
              <div>
                <h4 className="font-semibold">Written by Arjun Mehta</h4>
                <p className="text-gray-600">Senior Financial Analyst</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
}