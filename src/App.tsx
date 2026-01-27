import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { LatestArticles } from "@/components/blog/LatestArticles"
import { BlogDetail } from "@/components/blog/BlogDetail"
import { CreateBlogForm } from "@/components/blog/CreateBlogForm"
import { useBlogs, useBlog } from "@/hooks/useBlogs"
import { formatDate, formatReadTimeForDisplay } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function App() {
  const { data: blogs } = useBlogs()
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Set default blog ID when blogs are loaded
  useEffect(() => {
    if (blogs && blogs.length > 0 && !selectedBlogId) {
      setSelectedBlogId(blogs[0].id)
    }
  }, [blogs, selectedBlogId])

  const displayBlogId = selectedBlogId || (blogs && blogs.length > 0 ? blogs[0].id : "1")
  const { data: blogToDisplay, isLoading } = useBlog(displayBlogId)

  const handleArticleClick = (id: string) => {
    setSelectedBlogId(id)
  }

  if (isLoading && !blogToDisplay) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="border-b bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                CA Monk Blog
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Stay updated with the latest trends in finance, accounting, and career growth.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <aside className="lg:col-span-1">
                <LatestArticles selectedBlogId={displayBlogId} onArticleClick={handleArticleClick} />
              </aside>
              <div className="lg:col-span-2">
                <div className="h-96 animate-pulse rounded-xl bg-muted" />
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!blogToDisplay) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="border-b bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                CA Monk Blog
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Stay updated with the latest trends in finance, accounting, and career growth.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-8">
            <p className="text-center text-muted-foreground">No blog selected</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const blogData = {
    coverImage: blogToDisplay.coverImage,
    category: blogToDisplay.category,
    readTime: formatReadTimeForDisplay(blogToDisplay.content),
    title: blogToDisplay.title,
    date: formatDate(blogToDisplay.date),
    content: blogToDisplay.content,
    authorName: "Arjun Mehta",
    authorTitle: "Senior Financial Analyst",
    authorAvatar: undefined,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="border-b bg-background py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                  CA Monk Blog
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Stay updated with the latest trends in finance, accounting, and career growth.
                </p>
              </div>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="hidden rounded-full bg-purple-600 hover:bg-purple-700 md:flex"
              >
                <Plus className="mr-2 size-4" />
                Create Blog
              </Button>
            </div>
            <div className="mt-4 flex justify-center md:hidden">
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="rounded-full bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                <Plus className="mr-2 size-4" />
                Create Blog
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Sidebar - Latest Articles */}
            <aside className="lg:col-span-1">
              <LatestArticles
                selectedBlogId={displayBlogId}
                onArticleClick={handleArticleClick}
              />
            </aside>

            {/* Right Column - Blog Detail */}
            <div className="lg:col-span-2">
              <BlogDetail {...blogData} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <CreateBlogForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onBlogCreated={(blogId) => {
          setSelectedBlogId(blogId)
        }}
      />
    </div>
  )
}

export default App
