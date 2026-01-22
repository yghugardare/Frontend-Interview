import type { Blog } from "../../types/blog";
import { formatDateShort } from "../../lib/utils";
import { cn } from "../../lib/utils";

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 hover:shadow-lg",
        isSelected && "ring-2 ring-black shadow-lg"
      )}
    >
      {/* Cover Image */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category | Date */}
        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="font-medium text-gray-900">
            {blog.category[0] || "General"}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">{formatDateShort(blog.date)}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors">
          {blog.title}
        </h3>
      </div>
    </article>
  );
}
