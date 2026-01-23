import type { Blog } from "../../types/blog"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"

// Color mapping for categories
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  FINANCE: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  TECH: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  HEALTH: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
  SCIENCE: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200" },
  BUSINESS: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  LIFESTYLE: { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-200" },
}

function getCategoryStyle(category: string) {
  return categoryColors[category] || { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" }
}

interface BlogListPanelProps {
  blogs: Blog[]
  selectedBlog: Blog | null
  onSelectBlog: (blog: Blog) => void
}

export function BlogListPanel({
  blogs,
  selectedBlog,
  onSelectBlog,
}: BlogListPanelProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <div className="p-5 border-b bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h2 className="text-xl font-bold">Blog Posts</h2>
        <p className="text-white/80 text-sm">
          {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {blogs.map((blog) => {
            const isSelected = selectedBlog?.id === blog.id
            
            return (
              <Card
                key={blog.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  isSelected
                    ? "ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                    : "bg-white border-gray-100 hover:border-purple-200"
                }`}
                onClick={() => onSelectBlog(blog)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {blog.category.map((cat) => {
                      const style = getCategoryStyle(cat)
                      return (
                        <span
                          key={cat}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
                        >
                          {cat}
                        </span>
                      )
                    })}
                  </div>
                  <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {blog.description}
                  </p>
                  {isSelected && (
                    <div className="mt-3 flex items-center text-purple-600 text-sm font-medium">
                      <span>Viewing details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No blogs yet</p>
              <p className="text-gray-400 text-sm">Create your first blog post!</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

