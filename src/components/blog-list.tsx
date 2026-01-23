import { useEffect, useRef, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Blog } from "@/types"

interface BlogListProps {
    blogs?: Blog[]
    isLoading: boolean
    selectedBlogId: string | null
    onSelectBlog: (id: string) => void
    onCreateClick: () => void
}

export function BlogList({
    blogs,
    isLoading,
    selectedBlogId,
    onSelectBlog,
    onCreateClick
}: BlogListProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!isMobile || isLoading || !blogs || blogs.length === 0) return

        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let scrollInterval: ReturnType<typeof setInterval>

        const timeoutId = setTimeout(() => {
            scrollInterval = setInterval(() => {
                if (scrollContainer) {
                    if (Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight) {
                        clearInterval(scrollInterval);
                    } else {
                        scrollContainer.scrollBy({ top: 1, behavior: 'instant' });
                    }
                }
            }, 30)
        }, 2000)

        const pauseScroll = () => clearInterval(scrollInterval)
        const resumeScroll = () => {
            clearInterval(scrollInterval)
            scrollInterval = setInterval(() => {
                if (scrollContainer) {
                    if (Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight) {
                        clearInterval(scrollInterval);
                    } else {
                        scrollContainer.scrollBy({ top: 1, behavior: 'instant' });
                    }
                }
            }, 30)
        }

        scrollContainer.addEventListener('mouseenter', pauseScroll)
        scrollContainer.addEventListener('mouseleave', resumeScroll)
        scrollContainer.addEventListener('touchstart', pauseScroll)
        scrollContainer.addEventListener('touchend', resumeScroll)

        return () => {
            clearTimeout(timeoutId)
            clearInterval(scrollInterval)
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', pauseScroll)
                scrollContainer.removeEventListener('mouseleave', resumeScroll)
                scrollContainer.removeEventListener('touchstart', pauseScroll)
                scrollContainer.removeEventListener('touchend', resumeScroll)
            }
        }
    }, [isMobile, isLoading, blogs])

    return (
        <aside className="w-full h-full flex flex-col bg-muted/10">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50 backdrop-blur-md sticky top-0 z-10">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-sm text-muted-foreground">
                        Latest updates
                    </p>
                </div>
                <Button onClick={onCreateClick} size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div
                ref={scrollRef}
                className={cn(
                    "flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth",
                    isMobile && "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                )}
            >
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-3 p-4 border rounded-xl">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    ))
                    : (
                        <>
                            {blogs?.map((blog) => (
                                <Card
                                    key={blog.id}
                                    onClick={() => onSelectBlog(blog.id)}
                                    className={`cursor-pointer transition-all duration-200 hover:shadow-md border-border/50 ${selectedBlogId === blog.id
                                        ? 'border-primary/50 bg-primary/5 shadow-md ring-1 ring-primary/20'
                                        : 'hover:bg-accent/50'
                                        }`}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex gap-2 flex-wrap">
                                                {blog.category.slice(0, 2).map((cat) => (
                                                    <Badge key={cat} variant="secondary" className="text-[10px] px-2 py-0.5 h-5">
                                                        {cat}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <span className="text-xs text-muted-foreground shrink-0">
                                                {new Date(blog.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg leading-snug line-clamp-2">
                                            {blog.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="line-clamp-2">
                                            {blog.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )
                }
            </div>
        </aside>
    )
}
