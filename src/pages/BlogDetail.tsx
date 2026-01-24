import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '@/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => getBlogById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto space-y-6">
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="text-center py-10 text-destructive">
                <h2 className="text-xl font-bold">Error loading blog</h2>
                <Button onClick={() => navigate('/')} variant="link" className="mt-4">
                    Go Home
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Button
                variant="ghost"
                className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
                onClick={() => navigate(-1)}
            >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="rounded-xl overflow-hidden mb-8 shadow-sm border">
                <img
                    src={blog.coverImage || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg"}
                    alt={blog.title}
                    className="w-full h-[400px] object-cover"
                />
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        {Array.isArray(blog.category) ? (
                            blog.category.map((cat) => (
                                <Badge key={cat} variant="secondary">
                                    {cat}
                                </Badge>
                            ))
                        ) : (
                            <Badge variant="secondary">
                                {blog.category}
                            </Badge>
                        )}
                        <div className="flex items-center text-muted-foreground text-sm ml-auto">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {new Date(blog.date).toLocaleDateString(undefined, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {blog.title}
                    </h1>

                    <p className="text-xl text-muted-foreground italic border-l-4 pl-4 border-primary/20">
                        {blog.description}
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="leading-relaxed mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
