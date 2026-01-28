import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogAPI } from "@/services/api";
import { CreateBlogInput } from "@/types/blog";

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogInput) => blogAPI.createBlog(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
