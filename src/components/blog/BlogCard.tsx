import { Blog } from "@/types/blog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  isSelected?: boolean;
}

export default function BlogCard({ blog, onClick, isSelected }: BlogCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 overflow-hidden ${
        isSelected 
          ? 'border-l-blue-600 shadow-lg' 
          : 'border-l-gray-200 hover:border-l-blue-400'
      }`}
    >
      <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        <img 
          src={blog.coverImage} 
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.category.map((c) => (
            <Badge 
              key={c}
              variant="secondary"
              className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              {c}
            </Badge>
          ))}
        </div>

        <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </CardTitle>

        <CardDescription className="line-clamp-2">
          {blog.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          {new Date(blog.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        <ArrowRight size={18} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
      </CardFooter>
    </Card>
  );
}
