import { ArticleCard } from "./ArticleCard"
import { useBlogs } from "@/hooks/useBlogs"
import { getCategoryIcon, getPrimaryCategory } from "@/lib/categoryIcons"
import { getTimeAgo } from "@/lib/utils"

type LatestArticlesProps = {
  selectedBlogId?: string
  onArticleClick?: (articleId: string) => void
}

export function LatestArticles({ selectedBlogId, onArticleClick }: LatestArticlesProps) {
  const { data: blogs, isLoading, error } = useBlogs()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Latest Articles</h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Latest Articles</h2>
        <p className="text-sm text-muted-foreground">Failed to load articles</p>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Latest Articles</h2>
        <p className="text-sm text-muted-foreground">No articles found</p>
      </div>
    )
  }

  // Sort by date (newest first) and take first 5
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const latestBlogs = sortedBlogs.slice(0, 5)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Latest Articles</h2>
      <div className="space-y-3">
        {latestBlogs.map((blog, index) => {
          const primaryCategory = getPrimaryCategory(blog.category)
          const icon = getCategoryIcon(primaryCategory)
          const isFeatured = index === 0
          const timeAgo = getTimeAgo(blog.date)

          return (
            <ArticleCard
              key={blog.id}
              icon={icon}
              category={primaryCategory}
              timeAgo={timeAgo}
              title={blog.title}
              description={blog.description}
              tag={isFeatured ? "Featured" : undefined}
              featured={isFeatured || selectedBlogId === blog.id}
              onClick={() => onArticleClick?.(blog.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
