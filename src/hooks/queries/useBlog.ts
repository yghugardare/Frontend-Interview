import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/api/blogs";
import { queryKeys } from "@/lib/queryKeys";

export function useBlog(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.blogs.detail(id!),
    queryFn: () => getBlogById(id!),
    enabled: !!id,
  });
}
