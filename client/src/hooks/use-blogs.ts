import { useQuery } from "@tanstack/react-query";
import type { Blog } from "@shared/schema";

export function useBlogs() {
  return useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });
}

export function useBlog(id: string) {
  return useQuery<Blog>({
    queryKey: ["/api/blogs", id],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog");
      return res.json();
    },
    enabled: !!id,
  });
}
