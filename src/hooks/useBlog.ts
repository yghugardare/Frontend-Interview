import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { blogAPI } from "@/lib/api"

// Fetch all blogs with caching
export const useBlogList = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogAPI.getAllBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes before refetching
    gcTime: 1000 * 60 * 10, // 10 minutes before garbage collection
  })
}

// Fetch a single blog by ID
export const useBlog = (id: number) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogAPI.getBlogById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!id, // Only run query if ID is provided
  })
}

// Create a new blog and invalidate the cache
export const useCreateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogAPI.createBlog,
    onSuccess: (newBlog) => {
      // Invalidate blog list to refetch
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      // Add new blog to cache
      queryClient.setQueryData(["blogs", newBlog.id], newBlog)
    },
  })
}
