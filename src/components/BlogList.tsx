import { useBlogs } from "@/hooks/useBlogs";
import BlogCard from "@/components/BlogCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function BlogList({
  onSelect,
  selectedId,
}: {
  onSelect: (id: string) => void;
  selectedId: string;
}) {
  const { data, isLoading, isError } = useBlogs();

  if (isLoading) return <LoadingSkeleton variant="list" count={data?.length} />;
  if (isError) return <p>Failed to load blogs</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Latest Articles</h2>
      <div className="space-y-4">
        {data?.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={() => onSelect(blog.id)}
            isSelected={selectedId === blog.id}
          />
        ))}
      </div>
    </div>
  );
}
