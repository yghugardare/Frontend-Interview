import { useState } from "react"
import { useCreateBlog } from "@/hooks/useBlog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface CreateBlogFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (blogId: number) => void
}

export function CreateBlogForm({ open, onOpenChange, onSuccess }: CreateBlogFormProps) {
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [content, setContent] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [categoryInput, setCategoryInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createBlogMutation = useCreateBlog()

  // Add category to list
  const handleAddCategory = () => {
    const trimmed = categoryInput.trim().toUpperCase()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed])
      setCategoryInput("")
    }
  }

  // Remove category from list
  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  // Submit form and create blog
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !content.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const newBlog = await createBlogMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        coverImage: coverImage.trim() || "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
        category: categories.length > 0 ? categories : ["GENERAL"],
        content: content.trim(),
      })

      // Reset form
      setTitle("")
      setDescription("")
      setCoverImage("")
      setContent("")
      setCategories([])
      setCategoryInput("")

      onOpenChange(false)
      onSuccess?.(newBlog.id)
    } catch (error) {
      console.error("Failed to create blog:", error)
      alert("Failed to create blog. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Input
              placeholder="Brief description of your blog"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image URL</label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Categories</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="e.g., TECH"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCategory()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddCategory}>
                Add
              </Button>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="ml-2 hover:opacity-70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <Textarea
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-40"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || createBlogMutation.isPending}
              className="flex-1"
            >
              {isSubmitting || createBlogMutation.isPending ? "Creating..." : "Create Blog"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
