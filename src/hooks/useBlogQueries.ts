import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import type { CreateBlogPayload } from '@/types/blog';

// Query keys
export const blogQueryKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogQueryKeys.all, 'list'] as const,
  list: () => [...blogQueryKeys.lists()] as const,
  details: () => [...blogQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogQueryKeys.details(), id] as const,
};

// Hook to fetch all blogs
export const useBlogs = () => {
  return useQuery({
    queryKey: blogQueryKeys.list(),
    queryFn: () => blogService.getAllBlogs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch a single blog by ID
export const useBlog = (id: string) => {
  return useQuery({
    queryKey: blogQueryKeys.detail(id),
    queryFn: () => blogService.getBlogById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to create a new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => blogService.createBlog(payload),
    onSuccess: () => {
      // Invalidate blogs list query to refetch
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.list() });
    },
  });
};
