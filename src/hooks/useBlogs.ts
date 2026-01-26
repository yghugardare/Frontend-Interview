import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/api/blogApi";
import type { CreateBlogInput } from "@/types/blog";

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: blogApi.getAll,
    });
};

export const useBlog = (id: string | null) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => blogApi.getById(id!),
        enabled: !!id,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blog: CreateBlogInput) => blogApi.create(blog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, blog }: { id: string; blog: Partial<CreateBlogInput> }) =>
            blogApi.update(id, blog),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
        },
    });
};
