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
      className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {cat}
            </span>
          ))}
        </div>
        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
        <CardDescription className="text-xs text-gray-500">
          {formatDate(blog.date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>
      </CardContent>
    </Card>
  );
}
