import { useState } from "react";
import { useBlog } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EditBlogForm } from "@/components/EditBlogForm";

interface BlogDetailProps {
    blogId: string | null;
}

// Calculate read time
const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} Mins`;
};

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export function BlogDetail({ blogId }: BlogDetailProps) {
    const [copied, setCopied] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const { data: blog, isLoading, isError, error } = useBlog(blogId);

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/blog/${blogId}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog?.title,
                    text: blog?.description,
                    url: shareUrl,
                });
            } catch {
                await copyToClipboard(shareUrl);
            }
        } else {
            await copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!blogId) {
        return (
            <div className="flex items-center justify-center h-full min-h-[500px]">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">Select an article</p>
                    <p className="text-gray-500">Choose an article from the list to start reading</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <BlogDetailSkeleton />;
    }

    if (isError) {
        return (
            <div className="rounded-xl bg-red-50 border border-red-200 p-6">
                <p className="text-red-600 font-medium">Error loading article</p>
                <p className="text-sm text-red-500 mt-1">
                    {error instanceof Error ? error.message : "Something went wrong"}
                </p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Article not found</p>
            </div>
        );
    }

    return (
        <>
            <article className="max-w-none">
                {/* Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-6">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Category and Read Time */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-purple-600 font-semibold text-sm uppercase">
                        {blog.category[0]}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{getReadTime(blog.content)} read</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {blog.title}
                </h1>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-6">
                    <Button
                        onClick={handleShare}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                        </svg>
                        {copied ? "Copied!" : "Share Article"}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setEditOpen(true)}
                        className="gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit
                    </Button>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Category</p>
                        <p className="text-sm font-medium text-gray-900">
                            {blog.category.join(" & ")}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Read Time</p>
                        <p className="text-sm font-medium text-gray-900">{getReadTime(blog.content)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(blog.date)}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">{blog.description}</p>

                {/* Content */}
                <div className="prose prose-gray max-w-none">
                    {blog.content.split("\n\n").map((paragraph, index) => {
                        // Check if it's a heading-like paragraph
                        if (paragraph.length < 60 && !paragraph.includes(".")) {
                            return (
                                <h2 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                                    {paragraph}
                                </h2>
                            );
                        }
                        return (
                            <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                                {paragraph}
                            </p>
                        );
                    })}
                </div>

                {/* Quote Block */}
                <div className="my-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <p className="text-gray-700 italic">
                        "The accountant of the future will be a data scientist, a storyteller, and a strategic partner, all rolled into one."
                    </p>
                </div>

                {/* Author Section */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {blog.title.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Written by CA Monk</p>
                            <p className="text-sm text-gray-500">Senior Financial Analyst</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                            </svg>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </article>

            {/* Edit Dialog */}
            <EditBlogForm blog={blog} open={editOpen} onOpenChange={setEditOpen} />
        </>
    );
}

function BlogDetailSkeleton() {
    return (
        <div>
            <Skeleton className="aspect-[16/9] w-full rounded-2xl mb-6" />
            <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex gap-3 mb-6">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-20" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8 py-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-20 w-full mb-6" />
            <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}
