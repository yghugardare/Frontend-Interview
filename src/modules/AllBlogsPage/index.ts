import type { Blog, CreateBlogPayload } from "@/types/blogs";
import axiosInstance from "../../lib/axios";
import { AxiosError } from "axios";

export const fetchAllBlogs = async (): Promise<Blog[]> => {
  try {
    const { data } = await axiosInstance.get<Blog[]>("/blogs");
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching blogs:", err.message);
    throw err;
  }
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  try {
    const { data } = await axiosInstance.get<Blog>(`/blogs/${id}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching single blog:", err.message);
    throw err;
  }
};

export const createBlog = async (payload: CreateBlogPayload): Promise<Blog> => {
  try {
    const { data } = await axiosInstance.post<Blog>("/blogs", payload);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error Creating blog:", err.message);
    throw err;
  }
};
