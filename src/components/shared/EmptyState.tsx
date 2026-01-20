import { FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  type: "no-blogs" | "no-selection";
}

export function EmptyState({ type }: EmptyStateProps) {
  const navigate = useNavigate();

  if (type === "no-selection") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">
          Select a blog to preview
        </h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Click on any blog from the list
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium">No blogs yet</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Create your first blog post to get started
      </p>
      <Button onClick={() => navigate("/create")}>Create Blog</Button>
    </div>
  );
}
