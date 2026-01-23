import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "../../api/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Calendar, User } from "lucide-react";

interface BlogDetailProps {
  blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => blogsApi.getById(blogId!),
    enabled: !!blogId,
  });

  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <h3 className="text-2xl font-semibold mb-2">Select a blog to read</h3>
          <p>Choose a blog from the list to view its details</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load blog details. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!blog) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden bg-muted">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/800x400?text=Blog+Cover";
          }}
        />
      </div>

      {/* Blog Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.category.map((cat) => (
              <Badge key={cat} variant="default">
                {cat}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-3xl md:text-4xl">{blog.title}</CardTitle>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              {blog.description}
            </p>
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {blog.content}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
