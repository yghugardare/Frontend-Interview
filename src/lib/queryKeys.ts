export const queryKeys = {
  blogs: {
    all: ["blogs"] as const,
    detail: (id: string) => ["blogs", id] as const,
  },
} as const;
