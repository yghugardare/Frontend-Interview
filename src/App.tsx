import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import BigBlogCard from "./components/BigBlogCard";
import BigBlogCardSkeleton from "./components/BigBlogCardSkeleton";
import type { Blog } from "./types/blog";

async function fetchBlogs(): Promise<Blog[]> {
  // artificial delay for ux
  await new Promise((resolve)=>{
    setTimeout(() => {
      resolve(true);
    }, 1000);
  })
  const response = await fetch("http://localhost:3001/blogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

function App() {
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Blogs</h2>
          <p className="text-gray-600">Explore our latest articles and insights</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <BigBlogCardSkeleton key={index} />
            ))}
          </div>
        )}

        {isLoading && (
          <p className="text-gray-600">Loading blogs...</p>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">Error loading blogs</p>
            <p className="text-red-600 text-sm mt-2">{error.message}</p>
          </div>
        )}

        {blogs && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BigBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {blogs && blogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">No blogs found</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App