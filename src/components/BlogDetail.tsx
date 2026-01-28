import { useBlog } from "@/hooks/useBlog"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle, Calendar, Loader } from "lucide-react"

interface BlogDetailProps {
  blogId: number | null
  onBack: () => void
}

export function BlogDetail({ blogId, onBack }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId || 0)

  // Show placeholder when no blog is selected
  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div>
          <p className="text-lg text-muted-foreground"> Select a blog to read</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-sm text-muted-foreground">Failed to load blog details</p>
      </div>
    )
  }

  // Show loading state while fetching blog data
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="h-8 w-8 text-primary mb-2 animate-spin" />
        <p className="text-muted-foreground">Loading blog...</p>
      </div>
    )
  }

  // Fallback for missing blog
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Blog not found</p>
      </div>
    )
  }

  // Main blog display
  return (
    <div className="animate-fade-in-up space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="pl-0">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to list
      </Button>

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-lg shadow-md"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
        }}
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {blog.category.map((cat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(blog.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
          {blog.content}
        </p>
      </div>
    </div>
  )
}
