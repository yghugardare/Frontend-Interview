import { useState } from "react";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import BlogDetail from "@/components/BlogDetail";
import CreateBlogDialog from "@/components/CreateBlogDialog";
import { useBlogs, useBlog } from "@/hooks/useBlogs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: blogs, isLoading: isLoadingBlogs, isError: isBlogsError } = useBlogs();
  const { data: selectedBlog, isLoading: isLoadingBlog, isError: isBlogError } = useBlog(selectedBlogId);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onCreateClick={() => setIsCreateDialogOpen(true)} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
              CA Monk Blog
            </h1>
            <p className="mt-2 text-muted-foreground">
              Stay updated with the latest trends in finance, accounting, and career growth
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
            {/* Blog List Panel */}
            <aside>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Latest Articles</h2>
              <ScrollArea className="h-[calc(100vh-280px)] pr-4">
                <BlogList
                  blogs={blogs}
                  isLoading={isLoadingBlogs}
                  isError={isBlogsError}
                  selectedBlogId={selectedBlogId}
                  onSelectBlog={setSelectedBlogId}
                />
              </ScrollArea>
            </aside>

            {/* Blog Detail Panel */}
            <section className="rounded-xl border bg-card p-6 lg:p-8">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <BlogDetail
                  blog={selectedBlog}
                  isLoading={isLoadingBlog && selectedBlogId !== null}
                  isError={isBlogError}
                />
              </ScrollArea>
            </section>
          </div>
        </div>
      </main>

      <CreateBlogDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
      <Footer />
    </div>
  );
};

export default Index;
