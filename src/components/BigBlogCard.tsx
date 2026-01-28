import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { Blog } from "@/types/blog";

interface BigBlogCardProps {
  blog: Blog;
  onClick?: () => void;
}

export default function BigBlogCard({ blog, onClick }: BigBlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-xl"
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {cat}
            </span>
          ))}
        </div>
        <CardTitle className="text-2xl">{blog.title}</CardTitle>
        <CardDescription className="text-sm">
          {formatDate(blog.date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base text-gray-700 line-clamp-3">{blog.description}</p>
      </CardContent>
    </Card>
  );
}
