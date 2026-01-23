import type { Blog } from "../../types/blog"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { CardContent } from "../ui/card"

// Color mapping for categories
const categoryColors: Record<string, { bg: string; text: string }> = {
  FINANCE: { bg: "bg-emerald-100", text: "text-emerald-700" },
  TECH: { bg: "bg-blue-100", text: "text-blue-700" },
  HEALTH: { bg: "bg-rose-100", text: "text-rose-700" },
  SCIENCE: { bg: "bg-violet-100", text: "text-violet-700" },
  BUSINESS: { bg: "bg-amber-100", text: "text-amber-700" },
  LIFESTYLE: { bg: "bg-teal-100", text: "text-teal-700" },
}

function getCategoryStyle(category: string) {
  return categoryColors[category] || { bg: "bg-gray-100", text: "text-gray-700" }
}

interface BlogDetailPanelProps {
  blog: Blog | null
  onEdit: (blog: Blog) => void
  onDelete: (id: string) => void
}

export function BlogDetailPanel({
  blog,
  onEdit,
  onDelete,
}: BlogDetailPanelProps) {
  if (!blog) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="w-24 h-24 mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-400"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Blog Selected</h3>
        <p className="text-gray-500 max-w-sm">
          Select a blog post from the list to view its full details, cover image, and content
        </p>
        <div className="mt-6 flex gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-slate-50">
      <div className="p-6 border-b bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.category.map((cat) => {
            const style = getCategoryStyle(cat)
            return (
              <span
                key={cat}
                className={`px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text}`}
              >
                {cat}
              </span>
            )
          })}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-white/90 text-sm">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>
              {new Date(blog.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button
            variant="secondary"
            onClick={() => onEdit(blog)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all"
          >
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
              className="mr-2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this blog?")) {
                onDelete(blog.id)
              }
            }}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all"
          >
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
              className="mr-2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Delete
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6">
          {blog.coverImage && (
            <div className="relative mb-6 overflow-hidden rounded-xl shadow-lg">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}
          <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl border border-indigo-100">
            <p className="text-lg font-medium text-gray-700 leading-relaxed italic">
              <span className="text-3xl text-indigo-400 mr-2">"</span>
              {blog.description}
              <span className="text-3xl text-indigo-400 ml-2">"</span>
            </p>
          </div>
          <CardContent className="p-0">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                Full Article
              </h3>
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 text-gray-600 leading-loose hover:text-gray-800 transition-colors"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </div>
      </ScrollArea>
    </div>
  )
}

