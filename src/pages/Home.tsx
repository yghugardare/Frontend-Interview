import { useState } from "react";
import BlogList from "@/components/BlogList";
import BlogDetails from "@/components/BlogDetails";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>("1");

  return (
    <div className="flex my-12.5">
      <div className="w-[30%] pl-3">
        <BlogList onSelect={setSelectedId} selectedId={selectedId} />
      </div>
      <div className="w-[70%] p-6 mt-5">
        <BlogDetails id={selectedId} />
      </div>
    </div>
  );
}
