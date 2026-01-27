import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchBlogs, fetchBlogById, createBlog, type CreateBlogInput } from "@/lib/api"

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  })
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  })
}

export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBlogInput) => createBlog(data),
    onSuccess: () => {
      // Invalidate and refetch blogs list after successful creation
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })
}
