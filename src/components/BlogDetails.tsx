import { useBlog } from "@/hooks/useBlogs";
import LoadingSkeleton from "./LoadingSkeleton";

export default function BlogDetails({ id }: { id?: string }) {
  const { data, isLoading } = useBlog(id);

  if (!id) return <p>Select a blog to view details</p>;
  if (isLoading) return <LoadingSkeleton variant="details" />;

  return (
    <div className="space-y-4">
      <img
        src={data?.coverImage}
        className="rounded-lg w-full h-80 object-cover"
        alt=""
      />
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p className="text-sm text-muted-foreground">
        {data?.category.join(", ")} ·{" "}
        {new Date(data!.date).toLocaleDateString()}
      </p>
      <p>{data?.description}</p>
      <div className="whitespace-pre-line">{data?.content}</div>
    </div>
  );
}
