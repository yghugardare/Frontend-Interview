import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, ThumbsUp, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Blog } from "@shared/schema";

interface ArticleDetailProps {
  blog: Blog;
}

export function ArticleDetail({ blog }: ArticleDetailProps) {
  const authorName = blog.author?.name || "Arjun Mehta";
  const authorRole = blog.author?.role || "Senior Financial Analyst";
  const readTime = blog.readTime || 5;

  return (
    <div className="space-y-6" data-testid={`article-detail-${blog._id}`}>
      {/* Cover Image */}
      <div className="rounded-lg overflow-hidden aspect-video bg-muted">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          data-testid="img-cover"
        />
      </div>

      {/* Article Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge 
            variant="secondary" 
            className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 border-0"
          >
            {blog.category[0]}
          </Badge>
          <span className="text-muted-foreground text-sm">
            {readTime} min read
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
          {blog.title}
        </h1>

        <Button 
          variant="default" 
          size="sm" 
          className="mb-6"
          data-testid="button-share-article"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Article
        </Button>

        {/* Metadata Row */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div>
              <p className="text-muted-foreground uppercase text-xs tracking-wide mb-1">Category</p>
              <p className="font-semibold text-foreground">{blog.category.join(" & ")}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase text-xs tracking-wide mb-1">Read Time</p>
              <p className="font-semibold text-foreground">{readTime} Mins</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase text-xs tracking-wide mb-1">Date</p>
              <p className="font-semibold text-foreground">{format(new Date(blog.date), "MMM d, yyyy")}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Article Content */}
      <div className="prose prose-slate max-w-none">
        {blog.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-xl font-serif font-bold text-foreground mt-8 mb-4">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 rounded-r-md italic text-muted-foreground">
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(l => l.startsWith('- '));
            return (
              <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
                {items.map((item, i) => (
                  <li key={i}>{item.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Author Section */}
      <div className="flex items-center justify-between pt-8 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {authorName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground text-sm">Written by {authorName}</p>
            <p className="text-xs text-muted-foreground">{authorRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" data-testid="button-like">
            <ThumbsUp className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-bookmark">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
