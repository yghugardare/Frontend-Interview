import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogs";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./icons";

interface Props {
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

export function BlogList({ selectedBlogId, onSelectBlog }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Failed to load blogs</p>;

  return (
    <div className="space-y-4">
      {data?.map((blog) => (
        <div
          key={blog.id}
          onClick={() => onSelectBlog(blog.id)}
          className={cn(
            "p-5 rounded-lg border border-slate-200 cursor-pointer transition-all duration-200 relative overflow-hidden",
            "hover:shadow-md hover:border-slate-300 hover:-translate-y-1",
            "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-600 before:transition-transform before:duration-300",
            selectedBlogId === blog.id
              ? "bg-slate-50 before:scale-y-100"
              : "before:scale-y-0"
          )}
        >
          <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-2 font-semibold text-blue-600 uppercase">
              <CategoryIcon category={blog.category[0]} className="w-4 h-4" />
              <span>{blog.category.join(", ")}</span>
            </div>
            <time>2 days ago</time>
          </div>
          <h3 className="font-bold text-slate-800 mb-2 text-lg">{blog.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {blog.description}
          </p>
          {blog.id === 1 && (
            <span className="mt-3 inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
