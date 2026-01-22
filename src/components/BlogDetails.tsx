import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "@/api/blogs";
import { Button } from "./ui/button";
import { Share2, ThumbsUp, MessageSquare } from "lucide-react";

interface Props {
  blogId: number;
}

export function BlogDetails({ blogId }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
    enabled: !!blogId,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading blog...</p>
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <p>Error loading blog</p>
      </div>
    );
  if (!data) return null;

  return (
    <article className="space-y-6">
      <img
        src={data.coverImage}
        alt={data.title}
        className="rounded-xl w-full h-auto max-h-[400px] object-cover"
      />
      <div className="px-2">
        <p className="text-sm font-semibold text-blue-600 uppercase">
          {data.category.join(", ")}{" "}
          <span className="text-slate-500 font-normal normal-case">
            &bull; 5 min read
          </span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
          {data.title}
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Share2 className="mr-2 h-4 w-4" /> Share Article
        </Button>

        <div className="grid grid-cols-3 gap-4 my-8 p-6 bg-slate-100 rounded-lg text-center">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Category
            </p>
            <p className="font-bold text-slate-800 mt-1">Fintech & AI</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Read Time
            </p>
            <p className="font-bold text-slate-800 mt-1">5 Mins</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Date
            </p>
            <p className="font-bold text-slate-800 mt-1">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="prose max-w-none text-slate-600">
          <p>{data.content}</p>

          <h2>The Rise of Automated Accounting</h2>
          <p>
            Automation is no longer a buzzword; it's a reality. Routine tasks like
            data entry, reconciliation, and payroll processing are being automated
            at an unprecedented pace. This shift allows finance professionals to
            focus on high-value activities such as:
          </p>
          <ul>
            <li>Strategic financial planning and analysis (FP&A).</li>
            <li>Risk management and compliance auditing.</li>
            <li>
              Advisory services for business growth and sustainability.
            </li>
          </ul>

          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-500">
            "The accountant of the future will be a data scientist, a storyteller,
            and a strategic partner, all rolled into one."
          </blockquote>

          <h2>Preparing for the Shift</h2>
          <p>
            To stay relevant, CAs must upskill. Understanding Python for data
            analysis, mastering visualization tools like PowerBI, and getting
            comfortable with AI-driven ERP systems are now essential skills. The
            traditional syllabus provides the foundation, but continuous learning
            builds the career.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?u=arjunmehta"
              alt="Arjun Mehta"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-slate-800">
                Written by Abin Thomas
              </p>
              <p className="text-sm text-slate-500">
                Frontend Developer
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button className="hover:text-blue-600">
              <ThumbsUp size={20} />
            </button>
            <button className="hover:text-blue-600">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
