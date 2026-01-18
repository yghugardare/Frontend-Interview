import apiClient from './axios.config';
import type { Blog, CreateBlogDTO } from '@/types/blog.types';


export const blogAPI = {
    /**
     * Fetch all blogs
     * GET /blogs
     */
    getAllBlogs: async (): Promise<Blog[]> => {
        const response = await apiClient.get<Blog[]>('/blogs');
        return response.data;
    },

    /**
     * Fetch a single blog by ID
     * GET /blogs/:id
     */
    getBlogById: async (id: string): Promise<Blog> => {
        const response = await apiClient.get<Blog>(`/blogs/${id}`);
        return response.data;
    },

    /**
     * Create a new blog
     * POST /blogs
     */
    createBlog: async (data: CreateBlogDTO): Promise<Blog> => {
        const blogData = {
            ...data,
            date: data.date || new Date().toISOString(),
            id: crypto.randomUUID(), // Generate ID for JSON Server
        };
        const response = await apiClient.post<Blog>('/blogs', blogData);
        return response.data;
    },
};
