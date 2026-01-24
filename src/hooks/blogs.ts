import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateBlogPayload } from "@/types";
import { getAllBlogs, getBlogById, createBlog } from "@/api/blogs";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
