import type { Blog } from '@/types/blog.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface BlogDetailProps {
    blog: Blog;
}

export const BlogDetail = ({ blog }: BlogDetailProps) => {
    return (
        <div className="h-full overflow-y-auto">
            <Card className="border-0 shadow-none">
                <CardHeader className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                        {blog.coverImage && (
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                            />
                        )}
                        <div>
                            <CardTitle className="text-2xl sm:text-3xl mb-2 leading-tight">{blog.title}</CardTitle>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <span className="shrink-0">{formatDate(blog.date)}</span>
                                <div className="flex flex-wrap gap-2">
                                    {blog.category.map((cat) => (
                                        <Badge key={cat} variant="outline" className="text-xs">
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="prose prose-gray max-w-none">
                        <p className="text-base sm:text-lg font-medium text-muted-foreground mb-3 sm:mb-4">
                            {blog.description}
                        </p>
                        <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                            {blog.content}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
