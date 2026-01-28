import axios from "axios";
import { Blog, CreateBlogInput } from "@/types/blog";

const API_URL = "http://localhost:3001/blogs";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const blogAPI = {
  // GET /blogs
  getBlogs: async (): Promise<Blog[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return response.json();
  },

  // GET /blogs/:id
  getBlog: async (id: number): Promise<Blog> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch blog");
    return response.json();
  },

  // POST /blogs
  createBlog: async (data: CreateBlogInput): Promise<Blog> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        date: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Failed to create blog");
    return response.json();
  },
};
