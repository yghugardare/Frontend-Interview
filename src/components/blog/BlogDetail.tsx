import { Blog } from "@/types/blog";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { TagList } from "@/components/shared/TagList";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <article className="max-w-3xl mx-auto">
      {blog.coverImage && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4 mb-8">
        <CategoryBadge category={blog.category} />

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(blog.createdAt)}
        </div>
      </div>

      <Separator className="my-6" />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">{blog.description}</p>

        <div className="whitespace-pre-wrap text-foreground leading-relaxed">
          {blog.content}
        </div>
      </div>

      <Separator className="my-8" />

      <TagList tags={blog.tags} />
    </article>
  );
}
