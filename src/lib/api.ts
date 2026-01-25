import { Blog, CreateBlogInput } from "@/types/blog";

const API_BASE_URL = "http://localhost:3001";

export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_BASE_URL}/blogs`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  console.log("Parsed Blogs Data:", data);

  return data;
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
};

export const createBlog = async (blog: CreateBlogInput): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...blog,
      date: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create blog");
  }
  return response.json();
};
