import { useState } from "react"
import { BlogList } from "@/components/BlogList"
import { BlogDetail } from "@/components/BlogDetail"
import { CreateBlogForm } from "@/components/CreateBlogForm"
import { Button } from "@/components/ui/button"

function App() {
  // Track which blog is currently being read
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // After creating a new blog, automatically open it
  const handleCreateSuccess = (blogId: number) => {
    setSelectedBlogId(blogId)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary"> CA Monk Blog Application</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">{/* main layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <aside className={`lg:col-span-1 ${selectedBlogId ? 'animate-slide-in-left' : ''}`}>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="w-full"
              >
                + New Blog
              </Button>
              <div className="bg-card rounded-lg border p-4">
                <BlogList
                  onSelectBlog={setSelectedBlogId}
                  selectedBlogId={selectedBlogId}
                />
              </div>
            </div>
          </aside>

          <main className={`lg:col-span-2 ${selectedBlogId ? 'animate-slide-in-right' : ''}`}>
            <div className="bg-card rounded-lg border p-6 min-h-[600px] overflow-y-auto">
              <BlogDetail
                blogId={selectedBlogId}
                onBack={() => setSelectedBlogId(null)}
              />
            </div>
          </main>
        </div>
      </main>

      <CreateBlogForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
}

export default App
