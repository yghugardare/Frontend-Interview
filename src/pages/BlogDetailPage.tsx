import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import SmallBlogCard from "../components/SmallBlogCard";
import SmallBlogCardSkeleton from "../components/SmallBlogCardSkeleton";
import { Skeleton } from "../components/ui/skeleton";
import type { Blog } from "../types/blog";

async function fetchBlogs(): Promise<Blog[]> {
       // artificial delay
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

async function fetchBlogById(id: string): Promise<Blog> {
    // artificial delay
    await new Promise((resolve)=>{
        setTimeout(() => {
            resolve(true);
        }, 1000);
    })
  const response = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const primaryColor = "rgb(80, 71, 228)";

  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const {
    data: blog,
    isLoading: blogLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string): number => {
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-1 h-screen lg:h-[calc(100vh-120px)] sticky top-20 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
            <h3 className="text-lg font-bold text-gray-900 mb-4">All Blogs</h3>
            <div className="space-y-3 pr-2">
              {blogsLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <SmallBlogCardSkeleton key={index} />
                ))}

              {blogs &&
                blogs.map((blogItem) => (
                  <div
                    key={blogItem.id}
                    onClick={() => handleBlogClick(blogItem.id)}
                    style={{
                      borderLeft: blogItem.id === id ? `4px solid ${primaryColor}` : "4px solid #f3f4f6",
                    }}
                    className="bg-white rounded-lg transition-all"
                  >
                    <SmallBlogCard
                      blog={blogItem}
                      onClick={() => handleBlogClick(blogItem.id)}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Right Panel - Blog Detail */}
          <div className="lg:col-span-2">
            {blogLoading && (
              <div className="space-y-6 bg-white rounded-lg p-8">
                {/* Cover Image Skeleton */}
                <Skeleton className="w-full aspect-video rounded-lg" />

              {/* Title Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-10 w-1/2" />
              </div>

              {/* Category and Date Skeleton */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Content Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 font-medium">Error loading blog</p>
              <p className="text-red-600 text-sm mt-2">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
            </div>
          )}

          {blog && (
            <article className="bg-white rounded-lg  space-y-6 overflow-hidden">
              {/* Cover Image */}
              <div className="w-full aspect-video overflow-hidden bg-gray-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            <div className="p-8 space-y-6">
              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>

              {/* Category, Date, and Reading Time */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  {blog.category.map((cat, index) => (
                    <span
                      key={cat}
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide bg-gradient-to-r from-brand/10 to-brand/20 text-brand border border-brand/20 transition-all duration-300 hover:shadow-md hover:scale-105"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                    </span>
                  ))}
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400 flex items-center gap-1">
                  <Calendar height={14} />
                </span>
                <span className="text-gray-600">
                  {formatDate(blog.date)}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">
                  {getReadingTime(blog.content)} min read
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                {blog.description}
              </p>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </p>
              </div>

              {/* Tags */}
              {blog.category && blog.category.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.category.map((tag, index) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 hover:border-gray-300"
                        style={{
                          animationDelay: `${index * 60}ms`,
                          backgroundColor: primaryColor + "15",
                          color: primaryColor
                        }}
                      >
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
            </article>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
