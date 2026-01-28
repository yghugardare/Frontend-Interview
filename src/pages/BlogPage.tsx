import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlog';
import { BlogDetail } from '@/components/blog/BlogDetail';

export const BlogPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const numId = parseInt(id || '0', 10);
  const { data: blog, isLoading, error } = useBlog(numId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BlogDetail 
          blog={blog!} 
          isLoading={isLoading} 
          error={error as Error | null}
          onBack={() => navigate(-1)}
        />
      </div>
    </div>
  );
};
