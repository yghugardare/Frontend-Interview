import { Blog, CreateBlogInput } from "@/types/blog";
import { generateId } from "@/lib/utils";

const API_BASE_URL = "http://localhost:3001";

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
}

export async function getBlogById(id: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  return response.json();
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const newBlog: Blog = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString(),
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
}
