import { useEffect } from "react";
import { Link } from "react-router";
import BlogItem from "./BlogItem";
import { useBlogs } from "@/hooks/blogs";
import BlogItemSkeleton from "./BlogItemSkeleton";
import { Button } from "@/shadcn/components/ui/button";
import { Plus as PlusIcon } from "lucide-react";

export default function BlogItemList() {
  const { data, isPending, isError, error } = useBlogs();

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
    console.log(error);
    throw error;
  }

  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Button asChild variant="default" size="lg">
        <Link to="/blogs/new">
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Blog
        </Link>
      </Button>
      <div className="flex-1 flex flex-col space-y-2 overflow-auto  p-2">
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
    </div>
  );
}
