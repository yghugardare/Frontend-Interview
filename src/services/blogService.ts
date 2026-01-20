import axios from 'axios';
import type { Blog, CreateBlogPayload } from '@/types/blog';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const blogService = {
  getAllBlogs: async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>('/blogs');
    return response.data;
  },

  getBlogById: async (id: string): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${id}`);
    return response.data;
  },

  createBlog: async (payload: CreateBlogPayload): Promise<Blog> => {
    const response = await api.post<Blog>('/blogs', payload);
    return response.data;
  },
};
