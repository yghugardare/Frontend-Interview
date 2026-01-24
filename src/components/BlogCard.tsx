import type { Blog } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react"; 

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
}

export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className={`h-full transition-colors hover:bg-accent/50 ${isSelected ? 'border-primary border-2 bg-accent' : ''}`}>
        <CardHeader>
          <div className="flex gap-2 mb-2 flex-wrap">
            {blog.category.map((cat) => (
              <span key={cat} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                {cat}
              </span>
            ))}
          </div>
          <CardTitle className="text-lg">{blog.title}</CardTitle>
          <p className="text-xs text-muted-foreground">{new Date(blog.date).toLocaleDateString()}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{blog.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};