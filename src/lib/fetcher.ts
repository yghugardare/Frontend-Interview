import { API_BASE_URL } from '@/constants/app';

export async function fetcher<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error('Network error');
  }
  return res.json();
}
