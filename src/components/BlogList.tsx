import { useEffect } from "react";
import BlogItem from "./BlogItem";
import { useBlogs } from "@/hooks/blogs";
import BlogItemSkeleton from "./BlogItemSkeleton";
import { Button } from "@/shadcn/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BlogItemList() {
  const { data, isPending, isError } = useBlogs();

  useEffect(() => {
    if (isPending) {
      console.log("isPending");
      return;
    }
    console.log(data);
  }, [data, isPending]);

  if (isPending) {
    return (
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <BlogItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load blogs</div>;
  }

  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {data?.map((blog) => (
        <BlogItem
          key={blog.id}
          id={blog.id}
          title={blog.title}
          description={blog.description}
          categories={blog.category}
          date={blog.date}
        />
      ))}
    </div>
  );
}
