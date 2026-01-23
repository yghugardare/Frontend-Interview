import { useState } from "react";
import { BlogList } from "../components/blog/BlogList";
import { BlogDetail } from "../components/blog/BlogDetail";
import { BlogForm } from "../components/blog/BlogForm";
import { Button } from "../components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";

export function HomePage() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleBlogCreated = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Blog Application</h1>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              variant={showCreateForm ? "outline" : "default"}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {showCreateForm ? "View Blogs" : "Create Blog"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {showCreateForm ? (
          /* Create Blog Form */
          <div className="max-w-3xl mx-auto">
            <BlogForm onSuccess={handleBlogCreated} />
          </div>
        ) : (
          /* Master-Detail Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Blog List */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
                <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
                <BlogList
                  onSelectBlog={setSelectedBlogId}
                  selectedBlogId={selectedBlogId}
                />
              </div>
            </div>

            {/* Right Panel - Blog Detail */}
            <div className="lg:col-span-8 xl:col-span-9">
              <BlogDetail blogId={selectedBlogId} />
            </div>
          </div>
        )}
      </main>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  );
}
