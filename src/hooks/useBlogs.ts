import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, getBlogById, getBlogs } from "../api/blogs";
import type { Blog } from "../types/blog";

// Fetch all blogs
export const useBlogs = () => {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

// Fetch single blog by ID
export const useBlog = (id: number) => {
  return useQuery<Blog, Error>({
    queryKey: ["blogs", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
};

// Create a new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // Refetch blogs list after creating a blog
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
