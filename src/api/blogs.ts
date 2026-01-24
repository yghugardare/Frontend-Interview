import axios from 'axios';
import type { Blog, CreateBlogDto } from '@/types';

const API_URL = 'http://localhost:3001/blogs';

export const fetchBlogs = async (): Promise<Blog[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const fetchBlogById = async (id: string): Promise<Blog> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createBlog = async (newBlog: CreateBlogDto): Promise<Blog> => {
  const { data } = await axios.post(API_URL, newBlog);
  return data;
};