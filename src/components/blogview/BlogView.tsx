import React, {useEffect} from 'react'
import { useQuery } from "@tanstack/react-query";
import { timeFormatter } from "../../utilities/utilities" 
import { Button } from "@/components/ui/button";

interface BlogViewProps{
    blogID:string | null;
}
const BlogView = ({blogID}:BlogViewProps) => {
  const { data } = useQuery({
    queryKey: ["blogData", blogID],
    queryFn: () =>
      fetch(`http://localhost:3001/blogs/${blogID}`).then((res) => res.json()),
    enabled:!!blogID
  });

  // DATE FORMATE OPTION
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="blog-content col-span-8 rounded-lg col-span-12 md:col-span-8">
      {/* BlOG COVER */}
      <div
        className="blog-cover bg-cover bg-center rounded-t-lg bg-no-repeat w-full h-96 "
        style={{ backgroundImage: `url(${data?.coverImage})` }}
      ></div>
      {/* BLOG CONTENT */}
      <div className="blog-content-area p-8 text-left">
        <div className="blog-header space-y-8">
          <div className="category flex items-center gap-x-2 font-semibold text-gray-600 text-lg">
            <p className="text-indigo-700">{data?.category.join(" & ")}</p> •{" "}
            {timeFormatter(data?.date)}
          </div>
          <p className="blog-header-heading text-5xl font-bold  ">
            {data?.title}
          </p>
          <Button className="!bg-indigo-700 text-white"> Share Article </Button>
        </div>
        {/* MULTI PANE */}
        <div className="multi-pane border border-violet-200 grid grid-cols-12 justify-between rounded-lg bg-violet-50 h-24 my-8">
          <div className="category border-r-1  col-span-4 place-content-center place-items-center">
            <div className="heading text-gray-500 font-semibold">CATEGORY</div>
            <div className="info font-semibold">
              {data?.category?.join(" & ")}
            </div>
          </div>
          <div className="category border-x-2  col-span-4  place-content-center place-items-center">
            <div className="heading text-gray-500 font-semibold">READ TIME</div>
            <div className="info font-semibold">5 Mins</div>
          </div>
          <div className="category border-r-1 col-span-4  place-content-center place-items-center">
            <div className="heading text-gray-500 font-semibold">DATE</div>
            <div className="info font-semibold">
              {new Date(data?.date)?.toLocaleDateString("en-US", options)}
            </div>
          </div>
        </div>
        {/* BLOG CONTENT HEADER */}
        <div className="blog-header space-y-8">
          <div className="category flex items-center gap-x-2 font-semibold text-gray-600 text-lg">
            <p className="text-indigo-700">{data?.category?.join(" & ")}</p> •{" "}
            {timeFormatter(data?.date)}
          </div>
        </div>
      </div>

      <div className="blog-reading-content my-8 leading-[2] text-lg text-justify">
        <p>{data?.content}</p>
      </div>
      <div className="blogger"></div>
    </div>
  );
};

export default BlogView