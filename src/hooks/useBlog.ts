import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Blog } from "../types/blog";

export function useBlog(id: number) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await api.get<Blog>(`/blogs/${id}`);
      return res.data;
    },
  });
}
