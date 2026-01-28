import type { Blog } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

interface Props {
  blog: Blog;
  onClick: () => void;
  isSelected?: boolean;
}

export default function BlogCard({ blog, onClick, isSelected }: Props) {
  return (
    <Card
      onClick={onClick}
      className={clsx(
        "cursor-pointer hover:bg-muted transition",
        isSelected && "border-l-4 border-l-amber-300",
      )}
    >
      <CardContent className="p-4 space-y-6">
        <p className="text-xs text-muted-foreground">
          {blog.category.join(", ")}
        </p>
        <h3 className="font-semibold">{blog.title}</h3>
        <p className="text-sm text-muted-foreground">{blog.description}</p>
      </CardContent>
    </Card>
  );
}
