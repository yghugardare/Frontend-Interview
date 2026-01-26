import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '../api/blogs';
import type { CreateBlogInput } from '../types/blog';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogApi.getAllBlogs,
  });
};

export const useBlogById = (id: string) => {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogApi.getBlogById(id),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog: CreateBlogInput) => blogApi.createBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
