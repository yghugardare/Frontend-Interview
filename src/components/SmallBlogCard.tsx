import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { Blog } from "@/types/blog";

interface SmallBlogCardProps {
  blog: Blog;
  onClick?: () => void;
}

export default function SmallBlogCard({ blog, onClick }: SmallBlogCardProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="cursor-pointer rounded-lg bg-white gap-3 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-white to-gray-50/30 relative"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2">
          {blog.category.map((cat, index) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold tracking-wide bg-gradient-to-r from-brand/10 to-brand/20 text-brand border border-brand/20 transition-all duration-300 hover:shadow-md hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
            </span>
          ))}
        </div>
        <CardTitle className="line-clamp-2 text-base">{blog.title}</CardTitle>
        <CardDescription className="text-[12px] font-medium text-gray-500 flex gap-1 items-center mt-1">
          <Calendar height={14} /> <p>{formatDate(blog.date)}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 line-clamp-2">{blog.description}</p>
      </CardContent>
    </Card>
  );
}
