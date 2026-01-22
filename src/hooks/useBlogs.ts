import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogs";
import type { Blog } from "../types/blog";

export function useBlogs() {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
}
