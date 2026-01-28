import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateBlog } from "@/hooks/useCreateBlog";
import { CheckCircle, AlertCircle, Loader2, Image, Type, FileText, Tag, Sparkles } from "lucide-react";

export default function BlogForm() {
  const { mutate, isPending, isSuccess, isError } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = "Blog title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!coverImage.trim()) newErrors.coverImage = "Cover image URL is required";
    if (!category.trim()) newErrors.category = "At least one category is required";
    if (!content.trim()) newErrors.content = "Blog content is required";
    if (title.length < 5) newErrors.title = "Title must be at least 5 characters";
    if (title.length > 100) newErrors.title = "Title must be less than 100 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    mutate({
      title,
      description,
      coverImage,
      content,
      category: category.split(",").map((c) => c.trim()).filter(c => c),
    });
  }

  const charCount = content.length;
  const titleCount = title.length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Success Message */}
      {isSuccess && (
        <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-900">Published Successfully! 🎉</h3>
              <p className="text-green-700 mt-1">Your blog post is now live and ready for readers to discover.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {isError && (
        <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Publication Failed</h3>
              <p className="text-red-700 mt-1">There was an issue creating your blog post. Please try again.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={28} className="text-blue-100" />
              <h2 className="text-3xl font-bold text-white">Create New Blog Post</h2>
            </div>
            <p className="text-blue-100">Share your knowledge and connect with readers worldwide</p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* Title Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="title" className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Type size={18} className="text-blue-600" />
                  Blog Title
                </label>
                <span className={`text-xs font-semibold ${titleCount > 100 ? 'text-red-600' : titleCount > 80 ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {titleCount}/100
                </span>
              </div>
              <Input
                id="title"
                placeholder="Write a compelling title that captures your story..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: "" });
                }}
                className={`text-lg h-12 border-2 transition-colors ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'}`}
              />
              {errors.title && <p className="text-xs text-red-600 font-semibold">{errors.title}</p>}
            </div>

            {/* Cover Image Section */}
            <div className="space-y-3">
              <label htmlFor="cover" className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Image size={18} className="text-blue-600" />
                Cover Image URL
              </label>
              <div className="relative">
                <Input
                  id="cover"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                    if (errors.coverImage) setErrors({ ...errors, coverImage: "" });
                  }}
                  className={`h-12 border-2 transition-colors ${errors.coverImage ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'}`}
                />
              </div>
              {coverImage && (
                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img src={coverImage} alt="Cover preview" className="w-full h-40 object-cover" onError={(e) => (e.currentTarget.src = '')} />
                </div>
              )}
              {errors.coverImage && <p className="text-xs text-red-600 font-semibold">{errors.coverImage}</p>}
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Categories */}
              <div className="space-y-3">
                <label htmlFor="category" className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Tag size={18} className="text-blue-600" />
                  Categories
                </label>
                <Input
                  id="category"
                  placeholder="e.g., Technology, AI, Web Dev"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors({ ...errors, category: "" });
                  }}
                  className={`h-12 border-2 transition-colors ${errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'}`}
                />
                <p className="text-xs text-gray-500">Separate multiple categories with commas</p>
                {errors.category && <p className="text-xs text-red-600 font-semibold">{errors.category}</p>}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <FileText size={18} className="text-blue-600" />
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="A compelling summary of your blog post (1-2 sentences)..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: "" });
                  }}
                  className={`h-12 border-2 resize-none transition-colors ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'}`}
                />
                {errors.description && <p className="text-xs text-red-600 font-semibold">{errors.description}</p>}
              </div>
            </div>

            {/* Full Content Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="content" className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <FileText size={18} className="text-blue-600" />
                  Full Content
                </label>
                <span className={`text-xs font-semibold ${charCount > 10000 ? 'text-red-600' : charCount > 8000 ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {charCount} characters
                </span>
              </div>
              <Textarea
                id="content"
                placeholder="Write your full blog post here... Share your insights, stories, and knowledge..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors({ ...errors, content: "" });
                }}
                className={`h-96 border-2 resize-none transition-colors font-mono text-sm ${errors.content ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'}`}
              />
              <p className="text-xs text-gray-500">Rich formatting coming soon. Use line breaks to organize paragraphs.</p>
              {errors.content && <p className="text-xs text-red-600 font-semibold">{errors.content}</p>}
            </div>
          </div>

          {/* Form Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Publishing...</span>
                </div>
              ) : (
                <span>✨ Publish Blog Post</span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 px-8 font-semibold border-2 border-gray-300 hover:bg-gray-100"
            >
              Save Draft
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
