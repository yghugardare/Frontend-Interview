import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchBlogs, fetchBlogById } from '@/api/blogs'
import { BlogList } from '@/components/blog-list'
import { BlogDetail } from '@/components/blog-detail'
import { CreateBlogDialog } from '@/components/create-blog-dialog'

function App() {
  const { data: blogs, isLoading: isBlogsLoading, error: blogsError } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  })

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data: selectedBlog, isLoading: isBlogLoading, error: blogError } = useQuery({
    queryKey: ['blog', selectedBlogId],
    queryFn: () => fetchBlogById(selectedBlogId!),
    enabled: !!selectedBlogId, 
  })

  if (blogs && blogs.length > 0 && !selectedBlogId) {
    setSelectedBlogId(blogs[0].id)
  }

  if (blogsError) {
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        Error loading blogs: {blogsError.message}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <div className="w-full md:w-1/3 lg:w-[400px] h-1/3 md:h-full border-b md:border-b-0 md:border-r border-border flex-shrink-0">
        <BlogList
          blogs={blogs}
          isLoading={isBlogsLoading}
          selectedBlogId={selectedBlogId}
          onSelectBlog={setSelectedBlogId}
          onCreateClick={() => setIsCreateDialogOpen(true)}
        />
      </div>

      <div className="flex-1 h-2/3 md:h-full overflow-hidden">
        <BlogDetail
          blog={selectedBlog}
          isLoading={isBlogLoading}
          error={blogError}
        />
      </div>

      <CreateBlogDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={setSelectedBlogId}
      />
    </div>
  )
}

export default App
