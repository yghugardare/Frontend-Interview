import { useBlogs } from '@/hooks/useBlogs';
import BlogList from '@/components/blog/BlogList';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const { data: blogs = [], isLoading, error } = useBlogs();

  const handleSelectBlog = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Blog</h1>
            <p className="text-gray-600">Discover amazing stories and insights</p>
          </div>
          <button onClick={() => navigate('/create')}>
            <Button>Create Blog</Button>
          </button>
        </div>

        {isLoading && <p>Loading blogs...</p>}
        {error && <p className="text-red-600">Error loading blogs</p>}
        {!isLoading && !error && blogs.length > 0 && (
          <BlogList onSelectBlog={handleSelectBlog} />
        )}
      </div>
    </div>
  );
};
