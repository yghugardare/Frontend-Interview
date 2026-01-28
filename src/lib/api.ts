import axios from "axios"

// JSON Server runs on port 3001
const API_BASE_URL = "http://localhost:3001"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Blog data structure
export interface Blog {
  id: number
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

// Payload for creating a new blog
export interface CreateBlogPayload {
  title: string
  description: string
  coverImage?: string
  category: string[]
  content: string
}

// Blog API endpoints
export const blogAPI = {
  // GET all blogs
  getAllBlogs: async () => {
    const response = await apiClient.get<Blog[]>("/blogs")
    return response.data
  },

  // GET single blog by ID
  getBlogById: async (id: number) => {
    const response = await apiClient.get<Blog>(`/blogs/${id}`)
    return response.data
  },

  // POST create new blog
  createBlog: async (blog: CreateBlogPayload) => {
    const response = await apiClient.post<Blog>("/blogs", {
      ...blog,
      date: new Date().toISOString(),
    })
    return response.data
  },
}
