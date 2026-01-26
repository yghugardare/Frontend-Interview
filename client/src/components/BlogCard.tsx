import { Link } from "wouter";
import { format } from "date-fns";
import type { BlogResponse } from "@shared/routes";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  blog: BlogResponse;
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${blog.id}`} className="group cursor-pointer block">
        <article className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-border hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-10" />
            <img 
              src={blog.coverImage} 
              alt={blog.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.category.map((cat, i) => (
                <span key={i} className="px-3 py-1 text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight mb-4 group-hover:text-primary transition-colors">
              {blog.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 line-clamp-3 leading-relaxed">
              {blog.description}
            </p>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {format(new Date(blog.date), "MMMM d, yyyy")}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                5 min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${blog.id}`} className="group cursor-pointer h-full">
      <article className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
          <img 
            src={blog.coverImage} 
            alt={blog.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {blog.category.slice(0, 1).map((cat, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold tracking-wider uppercase text-white bg-black/50 backdrop-blur-md rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-xs text-muted-foreground mb-3 gap-2">
            <span>{format(new Date(blog.date), "MMM d, yyyy")}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>3 min read</span>
          </div>
          
          <h3 className="text-xl font-bold font-serif leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
            {blog.description}
          </p>
          
          <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
            Read Article <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
