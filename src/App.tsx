import { useState } from "react";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import Hero from "./components/layout/Hero";

function BlogDetailWrapper({ id, onBack, onSelectBlog }: { id: number; onBack: () => void; onSelectBlog: (id: number) => void }) {
  return <BlogDetail id={id} onBack={onBack} onSelectBlog={onSelectBlog} />;
}

export default function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="py-8 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
            <p className="text-gray-600 text-sm">Discover insights from industry experts and professionals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-screen">
            
            {/* LEFT PANEL - Blog List (Wider) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit lg:sticky lg:top-24 flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                  <h2 className="text-white font-bold text-base">Latest Articles</h2>
                </div>
                <div className="overflow-y-auto max-h-96 lg:max-h-[calc(100vh-200px)]">
                  <BlogList onSelectBlog={setSelectedBlogId} selectedBlogId={selectedBlogId} />
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Blog Detail (Full Height) */}
            <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {selectedBlogId ? (
                <div className="overflow-y-auto h-auto lg:h-[calc(100vh-100px)]">
                  <BlogDetailWrapper 
                    id={selectedBlogId} 
                    onBack={() => setSelectedBlogId(null)}
                    onSelectBlog={setSelectedBlogId}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center text-center p-12 h-96">
                  <div>
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">📖</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Select an Article
                    </h3>
                    <p className="text-gray-600 max-w-sm mx-auto text-sm">
                      Choose an article from the list to read the full content
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
