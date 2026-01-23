import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Blog, BlogFormData } from './types/blog'
import { BlogListPanel } from './components/blog/blog-list-panel'
import { BlogDetailPanel } from './components/blog/blog-detail-panel'
import { BlogForm } from './components/blog/blog-form'
import { Button } from './components/ui/button'

const API_URL = 'http://localhost:3001'

async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_URL}/blogs`)
  if (!response.ok) {
    throw new Error('Failed to fetch blogs')
  }
  return response.json()
}

async function updateBlog(id: string, data: BlogFormData): Promise<Blog> {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update blog')
  }
  return response.json()
}

async function createBlog(data: BlogFormData): Promise<Blog> {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      date: new Date().toISOString(),
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create blog')
  }
  return response.json()
}

async function deleteBlog(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete blog')
  }
}

function App() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const queryClient = useQueryClient()

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  })

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setIsCreating(false)
      setSelectedBlog(newBlog)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BlogFormData }) =>
      updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setEditingBlog(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setSelectedBlog(null)
    },
  })

  const handleCreate = (data: BlogFormData) => {
    createMutation.mutate(data)
  }

  const handleUpdate = (data: BlogFormData) => {
    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, data })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-muted-foreground">Loading blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-destructive">Error loading blogs. Make sure the server is running.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <p className="text-white/70 text-sm">Manage your content</p>
              </div>
            </div>
            <Button
              onClick={() => setIsCreating(true)}
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create New Blog
            </Button>
          </div>
        </div>
      </header>

      {/* Two-Panel Layout */}
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          
          {/* Left Panel: Blog List View */}
          <div className="col-span-4 rounded-xl shadow-lg overflow-hidden">
            <BlogListPanel
              blogs={blogs || []}
              selectedBlog={selectedBlog}
              onSelectBlog={setSelectedBlog}
            />
          </div>

          {/* Right Panel: Blog Detail View */}
          <div className="col-span-8 rounded-xl shadow-lg overflow-hidden">
            <BlogDetailPanel
              blog={selectedBlog}
              onEdit={(blog) => setEditingBlog(blog)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Create Blog Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
            <BlogForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreating(false)}
              isLoading={createMutation.isPending}
            />
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <BlogForm
              initialData={{
                title: editingBlog.title,
                category: editingBlog.category,
                description: editingBlog.description,
                coverImage: editingBlog.coverImage,
                content: editingBlog.content,
              }}
              onSubmit={handleUpdate}
              onCancel={() => setEditingBlog(null)}
              isLoading={updateMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

