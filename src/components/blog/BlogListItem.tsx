import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost } from '@/types';
import clsx from 'clsx';
import { format } from 'date-fns';

export function BlogListItem({
  blog,
  selected,
  onClick,
}: {
  blog: BlogPost;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className={clsx('cursor-pointer', {
        'border-primary bg-muted border-l-4': selected,
      })}
    >
      <CardHeader>
        <CardTitle className="text-base">{blog.title}</CardTitle>
        {blog.description && (
          <CardDescription className="line-clamp-2 text-xs">{blog.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="text-muted-foreground text-xs">
        {format(new Date(blog.date), 'dd MMM yyyy')}
      </CardContent>
    </Card>
  );
}
