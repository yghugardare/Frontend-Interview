import type { Blog, CreateBlogInput } from "@/types/blog";

const API_BASE = "http://localhost:3001";

export const blogApi = {
    getAll: async (): Promise<Blog[]> => {
        const response = await fetch(`${API_BASE}/blogs`);
        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }
        return response.json();
    },

    getById: async (id: string): Promise<Blog> => {
        const response = await fetch(`${API_BASE}/blogs/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch blog");
        }
        return response.json();
    },

    create: async (blog: CreateBlogInput): Promise<Blog> => {
        const response = await fetch(`${API_BASE}/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...blog,
                id: Date.now().toString(),
                date: new Date().toISOString(),
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to create blog");
        }
        return response.json();
    },

    update: async (id: string, blog: Partial<CreateBlogInput>): Promise<Blog> => {
        const response = await fetch(`${API_BASE}/blogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        if (!response.ok) {
            throw new Error("Failed to update blog");
        }
        return response.json();
    },
};
