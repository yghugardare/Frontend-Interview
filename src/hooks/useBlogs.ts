import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsApi } from "@/api/blogs";
import type { CreateBlogInput } from "@/types/blog";

// Query keys for cache management
export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters: string) => [...blogKeys.lists(), { filters }] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
};

// Get all blogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: blogKeys.lists(),
    queryFn: blogsApi.getAllBlogs,
  });
};

// Get blog by ID
export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => blogsApi.getBlogById(id),
    enabled: !!id,
  });
};

// Create a new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: CreateBlogInput) => blogsApi.createBlog(blog),
    onSuccess: () => {
      // Refresh the blog list after creating
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
};
