import type { Blog, CreateBlogPayload } from "../types";
import { API_BASE_URL } from "@/config";

export async function getAllBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_BASE_URL}/blogs`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function getBlogById(id: string): Promise<Blog> {
  const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function createBlog(payload: CreateBlogPayload): Promise<Blog> {
  const res = await fetch(`${API_BASE_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}
