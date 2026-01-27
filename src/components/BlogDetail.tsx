import type { Blog } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-2 md:px-8 max-w-6xl mx-auto w-full animate-in fade-in duration-500">
      <div className="lg:hidden mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
        </Button>
      </div>
      <Card className="overflow-hidden">
        {blog.coverImage && (
          <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
            />
          </div>
        )}
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {blog.category.map((cat) => (
              <Badge key={cat} variant="secondary" className="capitalize">
                {cat}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
            {blog.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>
              {new Date(blog.date).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed text-lg">
              {blog.content}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
