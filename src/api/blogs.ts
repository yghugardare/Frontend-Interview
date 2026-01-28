import { fetcher } from '@/lib/fetcher';
import type { BlogPost } from '@/types';

export const getBlogs = () => fetcher<BlogPost[]>('/blogs');
export const getBlogById = (id: number) => fetcher<BlogPost>(`/blogs/${id}`);
