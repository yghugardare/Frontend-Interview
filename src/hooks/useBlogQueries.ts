import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogAPI } from '@/api/blog.api';
import type { Blog, CreateBlogDTO, APIError } from '@/types/blog.types';

import { QUERY_KEYS } from '@/lib/queryClient';

export const useBlogs = () => {
    return useQuery<Blog[], APIError>({
        queryKey: [QUERY_KEYS.BLOGS],
        queryFn: blogAPI.getAllBlogs,
        select: (blogs) => {
            // Sort blogs by date in descending order (latest first)
            return [...blogs].sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA; // Descending order
            });
        },
    });
};

export const useBlog = (id: string | undefined) => {
    return useQuery<Blog, APIError>({
        queryKey: [QUERY_KEYS.BLOG, id],
        queryFn: () => blogAPI.getBlogById(id!),
        enabled: !!id, // Only fetch when ID is available
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation<Blog, APIError, CreateBlogDTO>({
        mutationFn: blogAPI.createBlog,
        onSuccess: (newBlog) => {
            // Invalidate and refetch blogs list
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BLOGS] });

            // Optionally, set the new blog in cache
            queryClient.setQueryData<Blog>([QUERY_KEYS.BLOG, newBlog.id], newBlog);
        },
    });
};
