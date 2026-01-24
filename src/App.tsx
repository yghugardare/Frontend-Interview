import { useState } from "react";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { CreateBlogDialog } from "./components/CreateBlogDialog";
import { Button } from "./components/ui/button";
import { User } from "lucide-react";
import { NAV_LINKS } from "./constants";
import type { Blog } from "./types/blog";
import "./App.css";

function App() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between gap-8">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                CM
              </div>
              <h1 className="text-2xl font-bold hidden sm:block text-gray-800">CA Monk</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <span className="w-px h-5 bg-gray-300"></span>
              <span className="text-sm font-semibold text-blue-600">Blog</span>
            </nav>

            {/* Mobile Menu Button & Create Button */}
            <div className="flex items-center gap-3">
              <CreateBlogDialog />
              
              {/* Profile Button */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => window.location.href = "#profile"}
              >
                <User className="h-5 w-5" />
              </Button>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation (shown on small screens) */}
          <nav className="md:hidden mt-4 flex flex-wrap gap-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Blog List */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Latest Articles</h2>
              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                <BlogList
                  onSelectBlog={setSelectedBlog}
                  selectedBlogId={selectedBlog?.id}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Blog Detail */}
          <div className="lg:col-span-7 xl:col-span-8">
            {selectedBlog ? (
              <BlogDetail blogId={selectedBlog.id} />
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center px-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Select an article to read
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pick something interesting from the list on the left
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
