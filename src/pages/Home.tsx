import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { useBlogs } from '@/hooks/useBlogs';
import { BlogListItem } from '@/components/blog/BlogListItem';
import { CreateBlogDialog } from '@/components/blog/CreateBlogDialog';
import { BlogArticle } from '@/components/blog/BlogArticle';

function Home() {
  const { data: blogs, isLoading, isError, error } = useBlogs();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!isError || !error) return;
    if (isError && error) toast.error('Failed to load blogs');
  }, [isError, error]);

  const selectedId = searchParams.get('id');
  const selectedBlog = blogs?.find((b) => String(b.id) === selectedId) ?? blogs?.[0];

  return (
    <div className="flex h-screen flex-col">
      <header className="flex justify-between border-b bg-white/80 px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">{APP_NAME}</h1>
          <p className="text-muted-foreground text-sm">{APP_TAGLINE}</p>
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                Blogs
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle>Latest Articles</SheetTitle>
              </SheetHeader>

              <div className="mt-4 space-y-4">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20" />)
                  : blogs?.map((b) => (
                      <BlogListItem
                        key={b.id}
                        blog={b}
                        onClick={() => setSearchParams({ id: b.id })}
                      />
                    ))}
              </div>
            </SheetContent>
          </Sheet>

          <CreateBlogDialog onCreated={(id) => id && setSearchParams({ id })} />
        </div>
      </header>

      <main className="flex flex-1">
        <aside className="hidden h-[calc(100vh-73px)] w-1/3 max-w-sm overflow-y-auto border-r bg-white/70 p-4 md:block">
          <div className="mt-4 flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20" />)
              : blogs?.map((b) => (
                  <BlogListItem key={b.id} blog={b} onClick={() => setSearchParams({ id: b.id })} />
                ))}
          </div>
        </aside>

        <section className="flex-1 p-6">
          {selectedBlog && <BlogArticle blog={selectedBlog} />}
        </section>
      </main>
    </div>
  );
}

export default Home;
