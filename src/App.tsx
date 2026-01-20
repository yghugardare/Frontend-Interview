import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlogForm } from '@/components/CreateBlogForm';
import type { Blog } from '@/types/blog';
import './globals.css';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header with Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">≡</span>
            </div>
            <span className="font-bold text-lg">CA MONK</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Tools</a>
            <a href="#" className="hover:text-gray-900">Practice</a>
            <a href="#" className="hover:text-gray-900">Events</a>
            <a href="#" className="hover:text-gray-900">Job Board</a>
            <a href="#" className="hover:text-gray-900">Points</a>
          </nav>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
            Profile
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">CA Monk Blog</h1>
          <p className="text-gray-600 text-lg">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 h-full flex gap-8">
          {/* Left Column - Blog List */}
          <div className="w-96 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <CreateBlogForm onSuccess={() => {}} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <BlogList onSelectBlog={setSelectedBlog} />
            </div>
          </div>

          {/* Right Column - Featured Blog */}
          <div className="flex-1 overflow-y-auto">
            {selectedBlog ? (
              <BlogDetail
                blogId={selectedBlog.id}
                onBack={() => setSelectedBlog(null)}
              />
            ) : (
              <div className="text-center text-gray-500 flex items-center justify-center h-full">
                <p>Select an article to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
