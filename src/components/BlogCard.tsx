import type { Blog } from '@/types/blog.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, truncateText } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    blog: Blog;
    isSelected?: boolean;
    onClick: () => void;
}

export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
                isSelected && "ring-2 ring-primary"
            )}
            onClick={onClick}
        >
            <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <CardTitle className="text-base sm:text-lg leading-tight">{blog.title}</CardTitle>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {formatDate(blog.date)}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs px-2 py-0.5">
                            {cat}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <CardDescription className="line-clamp-2 text-sm">
                    {truncateText(blog.description, 120)}
                </CardDescription>
            </CardContent>
        </Card>
    );
};
