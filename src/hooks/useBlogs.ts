import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "../lib/api";
import type { CreateBlogInput } from "../types/blog";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogApi.getAll,
  });
};

export const useBlog = (id: string | null) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogApi.getById(id!),
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogInput) => blogApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
