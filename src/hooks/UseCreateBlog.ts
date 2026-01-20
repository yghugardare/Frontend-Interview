import { createBlog } from "@/modules/AllBlogsPage";
import type { Blog, CreateBlogPayload } from "@/types/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<Blog, Error, CreateBlogPayload>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-blogs"] });
    },
  });
};
