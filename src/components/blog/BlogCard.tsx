import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { Blog } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  isSelected?: boolean;
  onClick?: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary shadow-md",
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CategoryBadge category={blog.category} className="w-fit" />
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 mt-2">
          {blog.title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {blog.description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(blog.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
}
