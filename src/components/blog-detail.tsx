import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Blog } from "@/types"

interface BlogDetailProps {
    blog?: Blog
    isLoading: boolean
    error: Error | null
}

export function BlogDetail({ blog, isLoading, error }: BlogDetailProps) {
    return (
        <main className="flex-1 h-full overflow-y-auto bg-background p-6 md:p-10 lg:p-14 relative scroll-smooth">
            {isLoading ? (
                <div className="space-y-6 max-w-3xl mx-auto">
                    <Skeleton className="w-full aspect-video rounded-xl" />
                    <Skeleton className="h-10 w-3/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ) : error ? (
                <div className="h-full flex items-center justify-center text-destructive">
                    Error loading blog details: {error.message}
                </div>
            ) : blog ? (
                <div className="max-w-3xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
                 
                    <div className="relative mb-8 group rounded-2xl overflow-hidden shadow-lg border border-border/50">
                        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                  
                    <div className="mb-10 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4">
                            <div className="flex gap-2">
                                {blog.category.map((cat) => (
                                    <Badge key={cat} className="uppercase tracking-wider">
                                        {cat}
                                    </Badge>
                                ))}
                            </div>
                            <div className="w-px h-4 bg-border" />
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <time dateTime={blog.date}>
                                    {new Date(blog.date).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                            {blog.description}
                        </p>
                    </div>

                 
                    <article className="prose prose-zinc dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-p:leading-loose">
                        <div className="whitespace-pre-wrap font-serif text-lg leading-8 text-foreground/90">
                            {blog.content}
                        </div>
                    </article>

                    <div className="mt-12 pt-8 border-t border-border flex gap-2">
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Tags:</span>
                        {blog.category.map((tag) => (
                            <span key={tag} className="text-sm text-primary hover:underline cursor-pointer">#{tag.toLowerCase()}</span>
                        ))}
                    </div>

                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                    <div className="p-4 rounded-full bg-muted/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                    <p className="text-lg">Select a blog to view details</p>
                </div>
            )}
        </main>
    )
}
