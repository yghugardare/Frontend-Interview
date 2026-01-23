import { useEffect } from "react";
import BlogItem from "./BlogItem";
import { useBlogs } from "@/hooks/blogs";

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
    return <div>Loading skeletons...</div>;
  }

  if (isError) {
    return <div>Failed to load blogs</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {data?.map((blog) => (
        <BlogItem
          key={blog.id}
          title={blog.title}
          description={blog.description}
          categories={blog.category}
          date={blog.date}
        />
      ))}
    </div>
  );
}
