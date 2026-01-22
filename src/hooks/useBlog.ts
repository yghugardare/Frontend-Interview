import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../api/blogs";
import type { Blog } from "../types/blog";

export function useBlog(id: string | number | null) {
  return useQuery<Blog, Error>({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id!),
    enabled: id !== null && id !== undefined && id !== "",
  });
}
