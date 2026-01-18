import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogs, useBlog } from '@/hooks/useBlogQueries';
import { BlogCard } from '@/components/BlogCard';
import { BlogDetail } from '@/components/BlogDetail';
import { BlogForm } from '@/components/BlogForm';
import { BlogListSkeleton, BlogDetailSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const BlogsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [showForm, setShowForm] = useState(false);
    const formContainerRef = useRef<HTMLDivElement>(null);

    const { data: blogs, isLoading, isError, error, refetch } = useBlogs();
    const { data: selectedBlog, isLoading: isBlogLoading, isError: isBlogError } = useBlog(id);

    const handleBlogClick = (blogId: string) => {
        setShowForm(false);
        navigate(`/blogs/${blogId}`);
    };

    const handleCreateClick = () => {
        setShowForm(true);
        navigate('/blogs/new');
    };

    useEffect(() => {
        if (showForm && formContainerRef.current) {
            const isMobile = window.innerWidth < 1024;
            if (isMobile) {
                formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [showForm]);

    useEffect(() => {
        if (!isLoading && !isError && blogs && blogs.length > 0 && !id) {
            // Select a random blog from the list
            const randomIndex = Math.floor(Math.random() * blogs.length);
            const randomBlog = blogs[randomIndex];
            navigate(`/blogs/${randomBlog.id}`, { replace: true });
        }
    }, [blogs, isLoading, isError, id, navigate]);

    const handleFormSuccess = () => {
        setShowForm(false);
        navigate('/blogs');
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-3 py-4 sm:p-4 md:p-6">
                {/* Header - Responsive Typography */}
                <div className="mb-4 sm:mb-6 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">CA MONK Blog</h1>
                    <p className="text-sm sm:text-base text-muted-foreground px-2">
                        Stay Updated with the Latest trends in finance, technology, career, and more
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

                    <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-xl sm:text-2xl font-semibold">Latest Articles</h2>
                            <Button onClick={handleCreateClick} size="sm" className="shrink-0">
                                <PlusCircle className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">Create Blog</span>
                                <span className="sm:hidden">Create</span>
                            </Button>
                        </div>

                        {/* Responsive scroll container */}
                        <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto pr-1 sm:pr-2">
                            {isLoading && <BlogListSkeleton />}

                            {isError && (
                                <ErrorState
                                    message={error?.message || 'Failed to load blogs'}
                                    onRetry={refetch}
                                />
                            )}

                            {!isLoading && !isError && blogs && blogs.length === 0 && (
                                <EmptyState message="No blogs available. Create your first blog!" />
                            )}

                            {!isLoading && !isError && blogs && blogs.length > 0 && (
                                blogs.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        blog={blog}
                                        isSelected={blog.id === id}
                                        onClick={() => handleBlogClick(blog.id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div ref={formContainerRef} className="lg:sticky lg:top-6 h-fit order-1 lg:order-2">
                        {showForm ? (
                            <BlogForm onSuccess={handleFormSuccess} />
                        ) : id && selectedBlog ? (
                            <>
                                {isBlogLoading && <BlogDetailSkeleton />}
                                {isBlogError && (
                                    <ErrorState message="Failed to load blog details" />
                                )}
                                {!isBlogLoading && !isBlogError && selectedBlog && (
                                    <BlogDetail blog={selectedBlog} />
                                )}
                            </>
                        ) : (
                            <div className="flex items-center justify-center min-h-[300px] sm:h-96 border-2 border-dashed rounded-lg p-4">
                                <div className="text-center text-muted-foreground">
                                    <p className="text-base sm:text-lg">Select a blog to view details</p>
                                    <p className="text-xs sm:text-sm mt-2">or <span className='text-blue-600 cursor-pointer hover:underline' onClick={handleCreateClick}>create a new blog post</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
