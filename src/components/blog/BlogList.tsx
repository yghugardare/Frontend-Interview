import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "../../api/blogs";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Calendar } from "lucide-react";
import type { Blog } from "../../types/blog";

interface BlogListProps {
  onSelectBlog: (blogId: string) => void;
  selectedBlogId: string | null;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogsApi.getAll,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="cursor-pointer">
            <CardHeader>
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load blogs. Please make sure the JSON server is running on
          port 3001.
        </AlertDescription>
      </Alert>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <Alert>
        <AlertTitle>No blogs found</AlertTitle>
        <AlertDescription>
          There are no blogs to display. Create your first blog to get started!
        </AlertDescription>
      </Alert>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {blogs.map((blog: Blog) => (
        <Card
          key={blog.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedBlogId === blog.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelectBlog(blog.id)}
        >
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {blog.category.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-xl hover:text-primary transition-colors">
              {blog.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {blog.description}
            </CardDescription>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.date)}</span>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
