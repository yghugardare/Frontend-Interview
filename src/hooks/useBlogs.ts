import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/api/blogs';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { BlogPost } from '@/types';

export const useBlogs = () =>
  useQuery<BlogPost[]>({
    queryKey: QUERY_KEYS.BLOGS,
    queryFn: getBlogs,
  });
