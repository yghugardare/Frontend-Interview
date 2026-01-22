import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogListSkeleton from '@/components/skeletons/BlogListSkeleton';
import { formatDistanceToNow } from 'date-fns';

async function fetchBlogs() {
  const response = await fetch("http://localhost:3001/blogs");
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
}

export default function HomePage() {
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <BlogListSkeleton />;
  if (isError) return <div className="text-center py-8">Error: {error.message}</div>;

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Stay updated with the latest trends in
          <span className="text-blue-600"> finance, accounting, and career growth.</span>
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Expert insights for Chartered Accountants and finance professionals
        </p>
      </div>

      {/* Latest Articles Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <div className="w-24 h-1 bg-blue-600"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      {blog.category.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDistanceToNow(new Date(blog.date), { addSuffix: true })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 min read</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Article */}
      {blogs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-600 text-white">
                  FEATURED
                </span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(blogs[0].date), { addSuffix: true })}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{blogs[0].title}</h2>
              <p className="text-gray-600 mb-6 text-lg">{blogs[0].description}</p>
              <Link to={`/blog/${blogs[0].id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Read Full Article
                </Button>
              </Link>
            </div>
            <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden">
              <img
                src={blogs[0].coverImage}
                alt={blogs[0].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-gray-600 mb-6">
            Get weekly updates on finance trends, career tips, and exclusive content
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}