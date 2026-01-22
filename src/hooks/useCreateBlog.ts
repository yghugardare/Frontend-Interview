import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";
import type { Blog, CreateBlogPayload } from "../types/blog";

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation<Blog, Error, CreateBlogPayload>({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      // Invalidate the blogs list to refetch
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      // Optionally set the new blog in cache
      queryClient.setQueryData(["blog", newBlog.id], newBlog);
    },
  });
}
