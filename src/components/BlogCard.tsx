import { formatDistanceToNow } from "date-fns";
import { Blog } from "@/types/blog";
import CategoryBadge from "./CategoryBadge";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  isActive: boolean;
  onClick: () => void;
}

const BlogCard = ({ blog, isActive, onClick }: BlogCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(blog.date), { addSuffix: true });
  console.log("Blog Date:", blog.date, "Formatted Time Ago:", timeAgo);
  return (
    <article
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg border bg-card p-4 transition-all hover:bg-card-hover",
        isActive && "blog-card-active border-primary/20 bg-card-hover"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={blog.category} />
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{timeAgo}</span>
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-tight text-foreground">
        {blog.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
        {blog.description}
      </p>
    </article>
  );
};

export default BlogCard;
