import axios from "axios";
import type { Blog } from "@/types/blog";
import { env } from "@/config/env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
});

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await api.get("/blogs");
  return res.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog = async (data: Omit<Blog, "id">) => {
  return api.post("/blogs", data);
};
