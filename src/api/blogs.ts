import type { Blog, CreateBlogInput } from "@/types/blog";
import { API_URL } from "@/constants";

const API_BASE_URL = API_URL;

export const blogsApi = {
  // Get all blogs
  getAllBlogs: async (): Promise<Blog[]> => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    return response.json();
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with id: ${id}`);
    }
    return response.json();
  },

  // Create a new blog
  createBlog: async (blog: CreateBlogInput): Promise<Blog> => {
    const newBlog = {
      ...blog,
      date: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog");
    }
    return response.json();
  },
};
