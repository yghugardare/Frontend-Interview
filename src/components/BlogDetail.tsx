import { useBlog } from "../hooks/useBlogs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface BlogDetailProps {
  blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-12">
            Select a blog from the list to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-64 w-full mb-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive font-semibold mb-2">Error loading blog.</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Please make sure the JSON server is running on port 3001."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
            >
              {cat}
            </span>
          ))}
          <span className="text-sm text-muted-foreground">
            | {new Date(blog.date).toLocaleDateString()}
          </span>
        </div>
        <CardTitle className="text-3xl mb-4">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{blog.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Content</h3>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex gap-2 flex-wrap">
            {blog.category.map((cat) => (
              <span
                key={cat}
                className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
