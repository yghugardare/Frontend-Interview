import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { BlogDetailSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/queries/useBlog";
import { ArrowLeft } from "lucide-react";

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError, refetch } = useBlog(id);

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

      {isLoading && <BlogDetailSkeleton />}

      {isError && (
        <ErrorState message="Failed to load blog post" onRetry={refetch} />
      )}

      {blog && <BlogDetail blog={blog} />}
    </PageContainer>
  );
}
