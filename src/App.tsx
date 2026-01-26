import { useState } from "react";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { CreateBlogForm } from "./components/CreateBlogForm";
import type { Blog } from "./types/blog";

function App() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">CA Monk Blog</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Blog List */}
          <div className="lg:col-span-1">
            <CreateBlogForm />
            <BlogList
              onSelectBlog={handleSelectBlog}
              selectedBlogId={selectedBlog?.id || null}
            />
          </div>

          {/* Right Panel - Blog Detail */}
          <div className="lg:col-span-2">
            <BlogDetail blogId={selectedBlog?.id || null} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
