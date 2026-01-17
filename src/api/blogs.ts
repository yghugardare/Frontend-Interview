import type { Blog } from "../types/blog";

const BASE_URL = "http://localhost:3001";

// Fetch all blogs
export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${BASE_URL}/blogs`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data: Blog[] = await response.json();
  return data;
};

// Fetch single blog by ID
export const getBlogById = async (id: number): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data: Blog = await response.json();
  return data;
};

// Create a new blog
export const createBlog = async (blog: Omit<Blog, "id">): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  const data: Blog = await response.json();
  return data;
};
