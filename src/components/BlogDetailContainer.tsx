import { useParams } from "react-router";
import { useBlog } from "@/hooks/blogs";
import BlogDetail from "./BlogDetail";
import { AlertCircle } from "lucide-react";
import BlogDetailSkeleton from "./BlogDetailSkeleton";

export default function BlogDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isPending, isError } = useBlog(id || "");

  if (isPending) {
    return <BlogDetailSkeleton />;
  }

  if (isError || !blog) {
    if (isError) {
      throw new Error("Failed to load blog details");
    }
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
        <AlertCircle className="h-10 w-10 mb-2" />
        <p>Blog not found</p>
      </div>
    );
  }

  return <BlogDetail blog={blog} />;
}
