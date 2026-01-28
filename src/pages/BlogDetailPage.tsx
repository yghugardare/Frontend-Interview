import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
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

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Blog List */}
        <div className="lg:col-span-1 h-screen lg:h-[calc(100vh-120px)] sticky top-20 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">All Blogs</h3>
          <div className="space-y-4 pr-2">
            {blogsLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <SmallBlogCardSkeleton key={index} />
              ))}

            {blogs &&
              blogs.map((blogItem) => (
                <SmallBlogCard
                  key={blogItem.id}
                  blog={blogItem}
                  onClick={() => handleBlogClick(blogItem.id)}
                />
              ))}
          </div>
        </div>

        {/* Right Panel - Blog Detail */}
        <div className="lg:col-span-2">
          {blogLoading && (
            <div className="space-y-6">
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
            <article className="space-y-6">
              {/* Cover Image */}
              <div className="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>

              {/* Category and Date */}
              <div className="flex flex-wrap items-center gap-3">
                {blog.category.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800"
                  >
                    {cat}
                  </span>
                ))}
                <span className="text-gray-500">|</span>
                <span className="text-sm text-gray-600">
                  {formatDate(blog.date)}
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
                    {blog.category.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
