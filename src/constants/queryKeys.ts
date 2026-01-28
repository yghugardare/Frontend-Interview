export const QUERY_KEYS = {
  BLOGS: ['blogs'] as const,
  BLOG: (id: string) => ['blog', id] as const,
};
