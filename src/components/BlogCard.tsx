import type { Blog } from "@/types/blog";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCardProps {
    blog: Blog;
    isSelected: boolean;
    onClick: () => void;
}

// Category icon mapping
const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
        FINANCE: "💰",
        TECH: "⚡",
        CAREER: "👔",
        EDUCATION: "📚",
        REGULATIONS: "📋",
        LIFESTYLE: "🌟",
    };
    return icons[category] || "📄";
};

// Category color mapping
const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        FINANCE: "text-purple-600",
        TECH: "text-yellow-600",
        CAREER: "text-blue-600",
        EDUCATION: "text-green-600",
        REGULATIONS: "text-orange-600",
        LIFESTYLE: "text-pink-600",
    };
    return colors[category] || "text-gray-600";
};

// Get tag style
const getTagStyle = (category: string) => {
    const styles: Record<string, string> = {
        FINANCE: "bg-purple-100 text-purple-700",
        TECH: "bg-yellow-100 text-yellow-700",
        CAREER: "bg-blue-100 text-blue-700",
        EDUCATION: "bg-green-100 text-green-700",
        REGULATIONS: "bg-orange-100 text-orange-700",
        LIFESTYLE: "bg-pink-100 text-pink-700",
    };
    return styles[category] || "bg-gray-100 text-gray-700";
};

// Format time ago
const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
};

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    const primaryCategory = blog.category[0] || "GENERAL";
    const tagCategory = blog.category[1] || blog.category[0] || "General";

    return (
        <div
            className={`bg-white rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${isSelected
                    ? "border-blue-500 shadow-md"
                    : "border-transparent hover:border-gray-200 hover:shadow-sm"
                }`}
            onClick={onClick}
        >
            {/* Category and Time */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm">{getCategoryIcon(primaryCategory)}</span>
                    <span className={`text-xs font-medium uppercase ${getCategoryColor(primaryCategory)}`}>
                        {primaryCategory}
                    </span>
                </div>
                <span className="text-xs text-gray-400">{getTimeAgo(blog.date)}</span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                {blog.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {blog.description}
            </p>

            {/* Tag */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTagStyle(tagCategory)}`}>
                {tagCategory.charAt(0) + tagCategory.slice(1).toLowerCase()}
            </span>
        </div>
    );
}

export function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <Skeleton className="h-6 w-20 rounded-full" />
        </div>
    );
}
