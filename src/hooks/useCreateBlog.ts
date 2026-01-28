import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { BlogPost } from '@/types';
import { API_BASE_URL } from '@/constants/app';

export function useCreateBlog() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<BlogPost, 'id'>) => {
      const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS });
    },
  });
}
