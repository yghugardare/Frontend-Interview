import axios from 'axios';
import type { Blog, CreateBlogDto } from '@/types';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await api.get('/blogs');
    return response.data;
};

export const getBlogById = async (id: string | number): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (data: CreateBlogDto): Promise<Blog> => {
    const response = await api.post('/blogs', {
        ...data,
        date: new Date().toISOString()
    });
    return response.data;
};
