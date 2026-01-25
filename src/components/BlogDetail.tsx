import { format } from "date-fns";
import { Blog } from "@/types/blog";
import CategoryBadge from "./CategoryBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogDetailProps {
  blog: Blog | undefined;
  isLoading: boolean;
  isError: boolean;
}

const BlogDetailSkeleton = () => (
  <div className="animate-fade-in">
    <Skeleton className="aspect-video w-full rounded-xl" />
    <div className="mt-6">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-3 h-10 w-3/4" />
      <Skeleton className="mt-4 h-10 w-32" />
      <div className="mt-6 grid grid-cols-3 gap-4 border-y py-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

const BlogDetail = ({ blog, isLoading, isError }: BlogDetailProps) => {
  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="mb-3 h-12 w-12 text-destructive" />
        <p className="text-lg font-medium text-destructive">Failed to load blog</p>
        <p className="mt-1 text-sm text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-muted-foreground">Select a blog to read</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose an article from the list on the left
        </p>
      </div>
    );
  }

  const formattedDate = format(new Date(blog.date), "MMM dd, yyyy");
  const readTime = Math.ceil(blog.content.split(" ").length / 200);

  return (
    <article className="animate-fade-in">
      <div className="overflow-hidden rounded-xl">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="aspect-video w-full object-cover"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-category-text">{blog.category[0]}</span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>

        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {blog.title}
        </h1>

        <Button variant="default" size="sm" className="mt-4 gap-2">
          <Share2 className="h-4 w-4" />
          Share Article
        </Button>

        <div className="mt-6 grid grid-cols-3 gap-4 border-y py-4">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Category</p>
            <p className="mt-1 text-sm font-medium">{blog.category}</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Read Time</p>
            <p className="mt-1 text-sm font-medium">{readTime} Mins</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Date</p>
            <p className="mt-1 text-sm font-medium">{formattedDate}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg leading-relaxed text-muted-foreground">{blog.description}</p>
        </div>

        <div className="mt-6 space-y-4 text-foreground">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
            <CategoryBadge key={blog.category} category={blog.category} />
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
