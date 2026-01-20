import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BlogForm } from "@/components/blog/BlogForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function CreateBlogPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Button
        variant="ghost"
        onClick={() => navigate("/blogs")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blogs
      </Button>

      <BlogForm />
    </PageContainer>
  );
}
