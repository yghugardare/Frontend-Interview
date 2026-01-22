import type { Blog, CreateBlogPayload } from "../types/blog";

const BASE_URL = "http://localhost:3001";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${BASE_URL}/blogs`);
  return handleResponse<Blog[]>(response);
}

export async function getBlog(id: string | number): Promise<Blog> {
  const response = await fetch(`${BASE_URL}/blogs/${id}`);
  return handleResponse<Blog>(response);
}

export async function createBlog(payload: CreateBlogPayload): Promise<Blog> {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Blog>(response);
}
