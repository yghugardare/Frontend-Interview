import { useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "../modules/AllBlogsPage/index.ts";
import type { Blog } from "@/types/blogs.ts";

export const useGetAllBlogs = () => {
  return useQuery<Blog[], Error>({
    queryKey: ["all-blogs"],
    queryFn: fetchAllBlogs,
    staleTime: 1000 * 60 * 5,
  });
};
