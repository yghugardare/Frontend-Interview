import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        },
        mutations: {
            retry: 0,
        },
    },
});

export const QUERY_KEYS = {
    BLOGS: 'blogs',
    BLOG: 'blog',
} as const;
