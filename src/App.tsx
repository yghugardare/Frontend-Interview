import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs, fetchBlogById } from '@/api/blogs';
import { BlogCard } from '@/components/BlogCard';
import { CreateBlogDialog } from '@/components/CreateBlogDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  
  const { data: selectedBlog, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['blog', selectedBlogId],
    queryFn: () => fetchBlogById(selectedBlogId!),
    enabled: !!selectedBlogId,
  });

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 text-center p-10">Error loading blogs. Is the JSON server running?</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">CA Monk Blog</h1>
          <Button onClick={() => setIsCreateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Blog
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 h-[calc(100vh-65px)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          
          <div className="md:col-span-4 lg:col-span-3 overflow-y-auto pr-2 space-y-4 h-full scrollbar-thin">
            {blogs?.map((blog) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                isSelected={selectedBlogId === blog.id}
                onClick={() => setSelectedBlogId(blog.id)}
              />
            ))}
          </div>

          <div className="md:col-span-8 lg:col-span-9 h-full overflow-y-auto bg-card border rounded-lg p-8 shadow-sm">
            {selectedBlogId ? (
              isDetailsLoading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
              ) : selectedBlog ? (
                <article className="prose dark:prose-invert max-w-none">
                  <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={selectedBlog.coverImage} 
                      alt={selectedBlog.title} 
                      className="object-cover w-full h-full"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400' }}
                    />
                  </div>
                  <div className="flex gap-2 mb-4">
                    {selectedBlog.category.map(cat => (
                      <span key={cat} className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{selectedBlog.title}</h1>
                  <p className="text-muted-foreground mb-6">{new Date(selectedBlog.date).toDateString()}</p>
                  <div className="whitespace-pre-wrap text-lg leading-relaxed">
                    {selectedBlog.content}
                  </div>
                </article>
              ) : null
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p>Select a blog from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateBlogDialog isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}

export default App;