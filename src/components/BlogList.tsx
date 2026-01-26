import { useBlogs } from "../hooks/useBlogs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Blog } from "../types/blog";

interface BlogListProps {
  onSelectBlog: (blog: Blog) => void;
  selectedBlogId: string | null;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive font-semibold mb-2">Error loading blogs.</p>
          <p className="text-sm text-muted-foreground mb-4">
            {error instanceof Error ? error.message : "Please make sure the JSON server is running on port 3001."}
          </p>
          <p className="text-xs text-muted-foreground">
            Run <code className="bg-muted px-1 py-0.5 rounded">npm run server</code> in a separate terminal.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card
            key={blog.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedBlogId === blog.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectBlog(blog)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2 flex-wrap">
                  {blog.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>
              <CardTitle className="text-lg">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">
                {blog.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No blogs found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
