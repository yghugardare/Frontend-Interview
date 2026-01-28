import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { Blog } from "@/types/blog";
import { formatDate } from "@/utils/dateHelpers";

interface BigBlogCardProps {
  blog: Blog;
  onClick?: () => void;
}

export default function BigBlogCard({ blog, onClick }: BigBlogCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer pt-0 rounded-lg bg-white gap-3 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-white to-gray-50/30 relative"
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pt-3">
        <div className="flex flex-wrap gap-2">
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
        <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
        <CardDescription className="text-[12px] font-medium text-gray-500 flex gap-1 items-center">
          <Calendar height={14} /> <p>{formatDate(blog.date, "long")} </p> 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-2">{blog.description}</p>
      </CardContent>
    </Card>
  );
}
