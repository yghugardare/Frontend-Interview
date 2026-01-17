import { useState } from "react";
import LeftPanel from "../components/Layout/LeftPanel";
import RightPanel from "../components/Layout/RightPanel";
import { useBlogs } from "../hooks/useBlogs";

const Home = () => {
  const { data, isLoading, isError, error } = useBlogs();
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  if (isLoading) return <div className="p-6">Loading blogs...</div>;
  if (isError) return <div className="p-6">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Page container */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Main layout */}
        <div className="flex gap-6">
          {/* Left panel */}
          <div className="w-[320px] shrink-0">
            <LeftPanel
              blogs={data ?? []}
              selectedBlogId={selectedBlogId}
              onSelectBlog={(id) => {
                console.log("Clicked blog id:", id);
                setSelectedBlogId(id);
              }}
            />
          </div>

          {/* Right panel */}
          <div className="flex-1">
            <RightPanel selectedBlogId={selectedBlogId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
