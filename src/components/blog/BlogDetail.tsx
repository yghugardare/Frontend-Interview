import { useBlog } from "@/hooks/useBlog";
import { useBlogs } from "@/hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Share2, ArrowLeft, Clock, User, Eye, ThumbsUp, MessageCircle, Bookmark } from "lucide-react";
import { useState } from "react";

interface BlogDetailProps {
  id: number;
  onBack?: () => void;
  onSelectBlog?: (id: number) => void;
}

export default function BlogDetail({ id, onBack, onSelectBlog }: BlogDetailProps) {
  const { data: blog, isLoading, isError } = useBlog(id);
  const { data: allBlogs } = useBlogs();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-8">
        <p className="font-bold text-red-900 text-lg">Failed to load article</p>
        <p className="text-red-700 mt-2">Please try again later</p>
      </div>
    );
  }

  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Section with Cover */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden bg-gray-900 flex-shrink-0">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover brightness-75"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.category.map((c) => (
                <Badge 
                  key={c}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm font-semibold"
                >
                  {c}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
              {blog.title}
            </h1>
            {/* Meta Info in Hero */}
            <div className="flex flex-wrap items-center gap-6 text-gray-100 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>Author Name</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 flex-1">
        
        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8 font-semibold group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Articles</span>
          </button>
        )}

        {/* Description/Excerpt */}
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-10 pb-8 border-b border-gray-200">
          {blog.description}
        </p>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6">
          {blog.content.split('\n\n').map((paragraph, idx) => {
            // Check if it looks like a heading
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={idx} className="text-3xl font-bold text-gray-900 mt-10 mb-6">
                  {paragraph.replace(/^#+\s?/, '')}
                </h2>
              );
            }
            if (paragraph.startsWith('#')) {
              return (
                <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-5">
                  {paragraph.replace(/^#+\s?/, '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-gray-800 leading-8 mb-6">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Article Footer Section */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          
          {/* Engagement Actions */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <ThumbsUp size={20} className={isLiked ? 'fill-red-600' : ''} />
              <span>{isLiked ? 'Liked' : 'Like Article'}</span>
            </button>
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${isSaved ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Bookmark size={20} className={isSaved ? 'fill-yellow-600' : ''} />
              <span>{isSaved ? 'Saved' : 'Save Article'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
              <MessageCircle size={20} />
              <span>Comments (0)</span>
            </button>
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Share this article</h3>
                <p className="text-gray-600">Help others discover this content</p>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors" title="Share on Twitter">
                  𝕏
                </button>
                <button className="w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors" title="Share on Facebook">
                  f
                </button>
                <button className="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full flex items-center justify-center transition-colors" title="Share on LinkedIn">
                  in
                </button>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={48} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Author Name</h3>
              <p className="text-gray-600 mb-4">
                Passionate writer and blogger sharing insights about technology, business, and personal growth. Join me on this journey of continuous learning.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Follow Author
              </button>
            </div>
          </div>

          {/* Article Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye size={20} className="text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">2.5K</span>
              </div>
              <p className="text-gray-600 text-sm">Views</p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ThumbsUp size={20} className="text-green-600" />
                <span className="text-2xl font-bold text-gray-900">124</span>
              </div>
              <p className="text-gray-600 text-sm">Likes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle size={20} className="text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">18</span>
              </div>
              <p className="text-gray-600 text-sm">Comments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-8 md:py-12 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allBlogs
              ?.filter(article => article.id !== id)
              .slice(0, 2)
              .map((article) => (
                <div 
                  key={article.id}
                  onClick={() => onSelectBlog?.(article.id)}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="h-40 overflow-hidden bg-gray-900">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {article.category.slice(0, 2).map(cat => (
                        <Badge key={cat} variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{Math.ceil(article.content.split(/\s+/).length / 200)} min read</span>
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
