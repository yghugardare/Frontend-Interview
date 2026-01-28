import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Blog } from "../types/blog";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get<Blog[]>("/blogs");
      return res.data;
    },
  });
}
