import BlogDetail from "@/components/blog/BlogDetail";

interface FullArticlePageProps {
  id: number;
}

export default function FullArticlePage({ id }: FullArticlePageProps) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <BlogDetail id={id} />
    </div>
  );
}
