import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Blog } from "@shared/schema";

interface ArticleSidebarProps {
  blogs: Blog[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ArticleSidebar({ blogs, selectedId, onSelect }: ArticleSidebarProps) {
  return (
    <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          onClick={() => onSelect(blog._id)}
          className={`p-4 cursor-pointer transition-all hover-elevate ${
            selectedId === blog._id 
              ? "border-primary bg-primary/5" 
              : "border-border"
          }`}
          data-testid={`card-article-${blog._id}`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge 
              variant="secondary" 
              className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 border-0"
            >
              {blog.category[0]}
            </Badge>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(new Date(blog.date), { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="font-serif font-bold text-foreground mb-2 text-base leading-tight">
            {blog.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {blog.description}
          </p>
          
          {blog.tags && blog.tags.length > 0 && (
            <Badge 
              variant="outline" 
              className="text-xs text-muted-foreground"
            >
              {blog.tags[0]}
            </Badge>
          )}
        </Card>
      ))}
    </div>
  );
}
