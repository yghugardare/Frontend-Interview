import { useBlog } from "@/hooks/use-blogs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { Loader2, ArrowLeft, Share2, Bookmark, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: blog, isLoading, error } = useBlog(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-serif font-bold mb-4">Article not found</h2>
        <a href="/" className="text-primary hover:underline">Return Home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
          <img 
            src={blog.coverImage} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <article className="container mx-auto px-4 relative z-20 -mt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-background rounded-3xl p-8 md:p-16 shadow-xl shadow-black/5 border border-border/50"
          >
            {/* Header */}
            <header className="mb-12 text-center">
              <div className="flex justify-center gap-2 mb-6">
                {blog.category.map((cat, i) => (
                  <span key={i} className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8 text-foreground">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm md:text-base border-y border-border/40 py-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(blog.date), "MMMM d, yyyy")}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>
            </header>

            {/* Body */}
            <div className="prose prose-lg prose-slate mx-auto prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg">
               {/* 
                 Safety: We're trusting backend content. 
                 In a real app with user-generated HTML, use DOMPurify.
                 Here we render mostly plain text from the description for now,
                 or if content has actual HTML structure.
               */}
               <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Footer Actions */}
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
              <a 
                href="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Articles
              </a>
              
              <div className="flex gap-4">
                <button className="p-3 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" title="Save for later">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
