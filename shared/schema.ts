import { z } from "zod";

export const blogSchema = z.object({
  _id: z.string(),
  title: z.string(),
  category: z.array(z.string()),
  description: z.string(),
  date: z.string(),
  coverImage: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  author: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string()
  }).optional(),
  readTime: z.number().optional()
});

export type Blog = z.infer<typeof blogSchema>;
export type BlogResponse = Blog;
export type BlogsListResponse = Blog[];
