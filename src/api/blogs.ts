import type { Blog, CreateBlogPayload } from "../types";
import { API_BASE_URL } from "@/config";

async function getErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data?.message ?? "Request failed";
  } catch {
    return "Request failed";
  }
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`);

    if (!res.ok) {
      const message = await getErrorMessage(res);

      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Client error: ${message}`);
      }

      throw new Error(`Server error: ${message}`);
    }

    return res.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error");
  }
}

export async function getBlogById(id: string): Promise<Blog> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`);

    if (!res.ok) {
      const message = await getErrorMessage(res);
      if (res.status >= 400 && res.status < 500) {
        if (res.status === 404) {
          throw new Error("NOT_FOUND");
        }
        throw new Error(`Client error: ${message}`);
      }

      throw new Error(`Server error: ${message}`);
    }

    return res.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error");
  }
}

export async function createBlog(
  payload: CreateBlogPayload
): Promise<Blog> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const message = await getErrorMessage(res);

      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Client error: ${message}`);
      }

      throw new Error(`Server error: ${message}`);
    }

    return res.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error");
  }
}
