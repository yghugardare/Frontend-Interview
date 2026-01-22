import { useState } from "react";
import { BlogList } from "@/components/BlogList";
import { BlogDetails } from "@/components/BlogDetails";
import { Button } from "./components/ui/button";

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-200 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-slate-900">CA MONK</div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600">Tools</a>
            <a href="#" className="hover:text-blue-600">Practice</a>
            <a href="#" className="hover:text-blue-600">Events</a>
            <a href="#" className="hover:text-blue-600">Job Board</a>
            <a href="#" className="hover:text-blue-600">Points</a>
          </div>
          <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">Profile</Button>
          <button className="md:hidden text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">CA Monk Blog</h1>
          <p className="text-slate-500 mt-2">Stay updated with the latest trends in finance, accounting, and career growth.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          <aside className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Articles</h2>
            <BlogList selectedBlogId={selectedBlogId} onSelectBlog={setSelectedBlogId} />
          </aside>
          <div className="lg:col-span-2">
            {selectedBlogId ? (
              <BlogDetails blogId={selectedBlogId} />
            ) : (
              <div className="flex items-center justify-center h-full rounded-lg bg-slate-50 text-slate-500">
                Select a blog to view details
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 w-[100vw] text-slate-300 mt-12">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl text-white mb-2">CA MONK</h3>
            <p className="text-sm">Empowering the next generation of financial leaders with tools, community, and knowledge.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Webinars</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Job Board</a></li>
              <li><a href="#" className="hover:text-white">Practice Tests</a></li>
              <li><a href="#" className="hover:text-white">Mentorship</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 py-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 CA Monk. All rights reserved.</p>
          <div className="space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
