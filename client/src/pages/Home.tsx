import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { ArticleDetail } from "@/components/ArticleDetail";
import { Loader2 } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function Home() {
  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const selectedBlog = selectedBlogId 
    ? blogs?.find(b => b._id === selectedBlogId) 
    : blogs?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" data-testid="loader-main" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h2 className="text-2xl font-serif font-bold text-destructive mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-4">Failed to load articles. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          data-testid="button-reload"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background py-8 text-center border-b border-border">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
          CA Monk Blog
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          Stay updated with the latest trends in finance, accounting, and career growth
        </p>
      </section>

      {/* Main Content - Two Column Layout */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Article List */}
          <aside className="lg:w-[340px] flex-shrink-0">
            <h2 className="text-lg font-bold text-foreground mb-6">Latest Articles</h2>
            <ArticleSidebar 
              blogs={blogs || []} 
              selectedId={selectedBlog?._id || null}
              onSelect={(id) => setSelectedBlogId(id)}
            />
          </aside>

          {/* Right Content - Article Detail */}
          <div className="flex-grow">
            {selectedBlog ? (
              <ArticleDetail blog={selectedBlog} />
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                Select an article to read
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
