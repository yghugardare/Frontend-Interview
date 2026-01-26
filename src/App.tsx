import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlogList } from "@/components/BlogList";
import { BlogDetail } from "@/components/BlogDetail";
import { CreateBlogForm } from "@/components/CreateBlogForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function BlogApp() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-lg">CA MONK</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Tools</a>
              <a href="#" className="hover:text-white transition-colors">Practice</a>
              <a href="#" className="hover:text-white transition-colors">Events</a>
              <a href="#" className="hover:text-white transition-colors">Job Board</a>
              <a href="#" className="hover:text-white transition-colors">Points</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <CreateBlogForm />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">CA Monk Blog</h1>
        <p className="text-gray-400 max-w-xl mx-auto px-4">
          Stay updated with the latest trends in finance, accounting, and career growth
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Blog List Panel */}
          <aside className="lg:col-span-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Latest Articles</h2>
            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin">
              <BlogList
                selectedBlogId={selectedBlogId}
                onSelectBlog={setSelectedBlogId}
              />
            </div>
          </aside>

          {/* Blog Detail Panel */}
          <section className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <BlogDetail blogId={selectedBlogId} />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-lg">CA MONK</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300 text-sm uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300 text-sm uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 CA Monk. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogApp />
    </QueryClientProvider>
  );
}

export default App;
