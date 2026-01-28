import type { Blog } from "@/types/blog";

export async function fetchBlogs(): Promise<Blog[]> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  const response = await fetch("http://localhost:3001/blogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

export async function fetchBlogById(id: string): Promise<Blog> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  const response = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
}

export async function createBlog(data: {
  title: string;
  category: string;
  description: string;
  coverImage: string;
  content: string;
}) {
  const response = await fetch("http://localhost:3001/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      category: data.category.split(",").map((c) => c.trim()),
      date: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return response.json();
}
