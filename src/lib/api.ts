const API_BASE_URL = "http://localhost:3001"

export type Blog = {
  id: string
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

export async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs`)
  if (!response.ok) {
    throw new Error("Failed to fetch blogs")
  }
  return response.json()
}

export async function fetchBlogById(id: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch blog")
  }
  return response.json()
}

export type CreateBlogInput = {
  title: string
  category: string[]
  description: string
  coverImage: string
  content: string
}

export async function createBlog(data: CreateBlogInput): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      date: new Date().toISOString(),
    }),
  })
  if (!response.ok) {
    throw new Error("Failed to create blog")
  }
  return response.json()
}
