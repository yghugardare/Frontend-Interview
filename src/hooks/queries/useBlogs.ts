import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { queryKeys } from "@/lib/queryKeys";

export function useBlogs() {
  return useQuery({
    queryKey: queryKeys.blogs.all,
    queryFn: getBlogs,
  });
}
