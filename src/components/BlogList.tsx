import { useBlogList } from "@/hooks/useBlog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, AlertCircle, Loader } from "lucide-react"

interface BlogListProps {
  onSelectBlog: (id: number) => void
  selectedBlogId: number | null
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, error } = useBlogList()

  // Handle API errors
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-sm text-muted-foreground">
          Failed to load blogs. Make sure JSON Server is running on http://localhost:3001
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Loader className="h-8 w-8 text-primary mb-2 animate-spin" />
        <p className="text-sm text-muted-foreground">Loading blogs...</p>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">No blogs available. Create one to get started!</p>
      </div>
    )
  }

  // Render the list of blogs
  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedBlogId === blog.id ? "border-primary border-2 bg-primary/5" : ""
          }`}
          onClick={() => onSelectBlog(blog.id)}
        >
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-base line-clamp-2">{blog.title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{blog.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-wrap gap-2 mb-2">
              {blog.category.map((cat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(blog.date).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
