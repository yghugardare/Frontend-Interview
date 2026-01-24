import type { Blog } from "@/types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateFormatter";

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  isSelected?: boolean;
}

export const BlogCard = ({ blog, onClick, isSelected }: BlogCardProps) => {

  return (
    <Card
      className={`cursor-pointer hover:border-blue-400 transition-all hover:shadow-md ${
        isSelected ? "border-blue-500 bg-blue-50/40 shadow-sm" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs font-medium uppercase">
            {blog.category[0]}
          </Badge>
          <span className="text-xs text-gray-500">
            {formatDate(blog.date)}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-tight text-gray-800 hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {blog.description}
        </p>
      </CardContent>
    </Card>
  );
};
