import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Blog, BlogFormData } from "../../types/blog"
import { BlogCardComponent } from "./blog-card"
import { BlogForm } from "./blog-form"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Card, CardContent, CardHeader } from "../ui/card"

const API_URL = "http://localhost:3001"

async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_URL}/blogs`)
  if (!response.ok) {
    throw new Error("Failed to fetch blogs")
  }
  return response.json()
}

async function fetchBlogById(id: string): Promise<Blog> {
  const response = await fetch(`${API_URL}/blogs/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch blog")
  }
  return response.json()
}

async function createBlog(data: BlogFormData): Promise<Blog> {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      date: new Date().toISOString().split("T")[0],
    }),
  })
  if (!response.ok) {
    throw new Error("Failed to create blog")
  }
  return response.json()
}

async function updateBlog(id: string, data: BlogFormData): Promise<Blog> {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update blog")
  }
  return response.json()
}

async function deleteBlog(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete blog")
  }
}

// Loading Skeleton Component for Blog Card
function BlogCardSkeleton() {
  return (
    <Card className="h-full flex flex-col animate-pulse">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}

// Loading Skeleton for Blog Detail Panel
function BlogDetailSkeleton() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      <div className="p-6 border-b bg-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
        <div className="flex gap-3 mt-5">
          <div className="h-9 w-16 bg-gray-300 rounded"></div>
          <div className="h-9 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="h-64 w-full bg-gray-200 rounded-xl mb-6"></div>
          <div className="space-y-4 mb-8">
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export function BlogList() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const queryClient = useQueryClient()

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  })

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setIsCreating(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BlogFormData }) =>
      updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setEditingBlog(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
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
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-destructive">Error loading blogs. Make sure the server is running.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => setIsCreating(true)}>Create New Blog</Button>
      </div>

      {(isCreating || editingBlog) && (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">
            {editingBlog ? "Edit Blog" : "Create New Blog"}
          </h2>
          <BlogForm
            initialData={
              editingBlog
                ? {
                    title: editingBlog.title,
                    category: editingBlog.category,
                    description: editingBlog.description,
                    coverImage: editingBlog.coverImage,
                    content: editingBlog.content,
                  }
                : undefined
            }
            onSubmit={editingBlog ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsCreating(false)
              setEditingBlog(null)
            }}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <BlogCardComponent
              key={blog.id}
              blog={blog}
              onEdit={(blog) => setEditingBlog(blog)}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {(!blogs || blogs.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            No blogs yet. Create your first blog post!
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export { BlogCardSkeleton, BlogDetailSkeleton, fetchBlogById }

