import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types';
import { getReadingTime } from '@/utils/readingTime';
import { format } from 'date-fns';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export function BlogArticle({ blog }: { blog: BlogPost }) {
  function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.description ?? 'Check out this blog post',
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  }

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      {blog.coverImage && (
        <img
          key={blog.id}
          src={blog.coverImage}
          alt={blog.title}
          className="h-64 w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {blog.category?.map((c: string) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          title="Share"
          className="cursor-pointer"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <span>{format(new Date(blog.date), 'PPP')}</span>
        <span>•</span>
        <span>{getReadingTime(blog.content)}</span>
      </div>

      <h1 className="text-3xl font-semibold">{blog.title}</h1>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{blog.content}</p>
    </article>
  );
}
