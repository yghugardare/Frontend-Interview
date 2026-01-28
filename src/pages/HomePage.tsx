import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import BigBlogCard from "../components/BigBlogCard";
import BigBlogCardSkeleton from "../components/BigBlogCardSkeleton";
import type { Blog } from "../types/blog";

async function fetchBlogs(): Promise<Blog[]> {
  // artificial delay for ux
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  const response = await fetch("http://localhost:3001/blogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

export default function HomePage() {
  const navigate = useNavigate();
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="py-16 bg-linear-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">CA Monk Blog</h1>
          <p className="text-gray-600 text-lg">Explore our latest articles and insights</p>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="container mx-auto px-4 py-12">

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BigBlogCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">Error loading blogs</p>
          <p className="text-red-600 text-sm mt-2">{error.message}</p>
        </div>
      )}

      {blogs && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogs.map((blog) => (
            <BigBlogCard 
              key={blog.id} 
              blog={blog} 
              onClick={() => handleBlogClick(blog.id)}
            />
          ))}
        </div>
      )}
      </div>
    </main>
  );
}
