import { Blog } from "@/types/blog";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { TagList } from "@/components/shared/TagList";
import { EmptyState } from "@/components/shared/EmptyState";
import { BlogPreviewSkeleton } from "@/components/shared/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPreviewProps {
  blog: Blog | null;
  isLoading?: boolean;
}

export function BlogPreview({ blog, isLoading }: BlogPreviewProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <BlogPreviewSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (!blog) {
    return (
      <Card className="h-full flex items-center justify-center">
        <EmptyState type="no-selection" />
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-0">
        {blog.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6 space-y-4">
          <CategoryBadge category={blog.category} />

          <h2 className="text-xl font-bold leading-tight">{blog.title}</h2>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(blog.createdAt)}
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground line-clamp-4">
            {blog.description}
          </p>

          <TagList tags={blog.tags} />

          <Button
            className="w-full mt-4"
            onClick={() => navigate(`/blogs/${blog.id}`)}
          >
            Read Full Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
