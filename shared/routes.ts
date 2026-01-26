import { z } from 'zod';
import { blogSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  blogs: {
    list: {
      method: 'GET' as const,
      path: '/api/blogs',
      responses: {
        200: z.array(blogSchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/blogs/:id',
      responses: {
        200: blogSchema,
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type BlogResponse = z.infer<typeof api.blogs.get.responses[200]>;
export type BlogsListResponse = z.infer<typeof api.blogs.list.responses[200]>;
