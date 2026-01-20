import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { queryKeys } from "@/lib/queryKeys";
import { CreateBlogInput } from "@/types/blog";

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBlogInput) => createBlog(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
    },
  });
}
