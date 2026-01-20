import { useBlog } from "../../hooks/useBlogs";

type RightPanelProps = {
  selectedBlogId: number | null;
};

const RightPanel = ({ selectedBlogId }: RightPanelProps) => {
  const { data, isLoading, isError, error } = useBlog(selectedBlogId ?? 0);

  if (!selectedBlogId) {
    return <div>Select a blog to view details</div>;
  }

  if (isLoading) {
    return <div>Loading blog details...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No blog found</div>;
  }

  return (
    <div className="h-full px-6 py-5 overflow-y-auto">
      {/* Title */}
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        {data.title}
      </h1>

      {/* Categories */}
      <div className="flex gap-2 mb-4">
        {data.category.map((cat) => (
          <span
            key={cat}
            className="px-2 py-0.5 text-xs rounded-md border border-border bg-muted"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </p>
      </div>

      <hr className="border-border mb-6" />

      {/* Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{data.content}</p>
      </article>
    </div>
  );

};

export default RightPanel;
