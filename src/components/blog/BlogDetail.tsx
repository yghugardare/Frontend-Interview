import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Share2, ThumbsUp, MessageCircle } from "lucide-react"

type BlogDetailProps = {
  coverImage: string
  category: string | string[]
  readTime: string
  title: string
  date: string
  content: string
  authorName?: string
  authorTitle?: string
  authorAvatar?: string
}

export function BlogDetail({
  coverImage,
  category,
  readTime,
  title,
  date,
  content,
  authorName,
  authorTitle,
  authorAvatar,
}: BlogDetailProps) {
  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Article Metadata */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-bold uppercase text-foreground">
          {Array.isArray(category) ? category[0] : category}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{readTime}</span>
      </div>

      {/* Title and Share Button */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <Button className="shrink-0 rounded-full bg-purple-600 hover:bg-purple-700">
          <Share2 className="size-4" />
          Share Article
        </Button>
      </div>

      {/* Article Info Box */}
      <Card className="bg-muted/50">
        <CardContent className="grid grid-cols-3 divide-x p-4">
          <div className="px-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Category</p>
            <p className="mt-1 text-sm font-medium">
              {Array.isArray(category) ? category.join(" & ") : category}
            </p>
          </div>
          <div className="px-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Read Time</p>
            <p className="mt-1 text-sm font-medium">{readTime}</p>
          </div>
          <div className="px-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Date</p>
            <p className="mt-1 text-sm font-medium">{date}</p>
          </div>
        </CardContent>
      </Card>

      {/* Article Content */}
      <div className="space-y-6 text-foreground">
        {content.split("\n\n").map((paragraph, index) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          
          // Check if it's a section title (starts with "The Rise", "Blockchain", "Preparing")
          if (trimmed.startsWith("The Rise") || trimmed.startsWith("Blockchain") || trimmed.startsWith("Preparing")) {
            return (
              <h2 key={index} className="text-xl font-bold text-foreground">
                {trimmed}
              </h2>
            )
          }
          // Check if it's a quote (starts with quote mark)
          if (trimmed.startsWith('"')) {
            return (
              <Card key={index} className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <p className="text-sm italic leading-relaxed text-foreground">{trimmed}</p>
                </CardContent>
              </Card>
            )
          }
          // Check if it's a bullet list (contains bullet points)
          if (trimmed.includes("•")) {
            const items = trimmed.split("•").filter(item => item.trim())
            return (
              <ul key={index} className="list-none space-y-2 pl-0">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                    <span className="leading-relaxed text-muted-foreground">{item.trim()}</span>
                  </li>
                ))}
              </ul>
            )
          }
          // Regular paragraph
          return (
            <p key={index} className="leading-relaxed text-muted-foreground">
              {trimmed}
            </p>
          )
        })}
      </div>

      {/* Author Section */}
      {authorName && (
        <div className="flex items-center justify-between border-t pt-6">
          <div className="flex items-center gap-3">
            <Avatar>
              {authorAvatar ? (
                <AvatarImage src={authorAvatar} alt={authorName} />
              ) : (
                <AvatarFallback>
                  {authorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Written by {authorName}</p>
              {authorTitle && <p className="text-xs text-muted-foreground">{authorTitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ThumbsUp className="size-5" />
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <MessageCircle className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
