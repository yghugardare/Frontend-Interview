import type { Blog, CreateBlogInput } from "../types/blog";

const API_BASE_URL = "http://localhost:3001";

export const blogApi = {
  getAll: async (): Promise<Blog[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Cannot connect to the server. Make sure JSON server is running on port 3001.");
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Blog> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Cannot connect to the server. Make sure JSON server is running on port 3001.");
      }
      throw error;
    }
  },

  create: async (data: CreateBlogInput): Promise<Blog> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to create blog: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Cannot connect to the server. Make sure JSON server is running on port 3001.");
      }
      throw error;
    }
  },
};
