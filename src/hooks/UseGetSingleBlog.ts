import { fetchBlogById } from "@/modules/AllBlogsPage";
import type { Blog } from "@/types/blogs";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogById = (id: number) => {
  return useQuery<Blog, Error>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id, 
  });
};
