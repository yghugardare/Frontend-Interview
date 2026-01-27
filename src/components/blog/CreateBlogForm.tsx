import { useState } from "react"
import { useCreateBlog } from "@/hooks/useBlogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

const CATEGORY_OPTIONS = [
  "FINANCE",
  "TECH",
  "CAREER",
  "EDUCATION",
  "REGULATIONS",
  "SKILLS",
  "TECHNOLOGY",
  "LIFESTYLE",
]

type CreateBlogFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBlogCreated?: (blogId: string) => void
}

export function CreateBlogForm({ open, onOpenChange, onBlogCreated }: CreateBlogFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const createBlogMutation = useCreateBlog()

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !content || !coverImage || selectedCategories.length === 0) {
      return
    }

    try {
      const newBlog = await createBlogMutation.mutateAsync({
        title,
        description,
        content,
        coverImage,
        category: selectedCategories,
      })
      // Reset form
      setTitle("")
      setDescription("")
      setContent("")
      setCoverImage("")
      setSelectedCategories([])
      onOpenChange(false)
      // Notify parent to select the new blog
      if (onBlogCreated && newBlog.id) {
        onBlogCreated(newBlog.id)
      }
    } catch (error) {
      console.error("Failed to create blog:", error)
    }
  }

  const isFormValid =
    title.trim() &&
    description.trim() &&
    content.trim() &&
    coverImage.trim() &&
    selectedCategories.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new blog post. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL *</Label>
            <Input
              id="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Categories *</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`rounded-md border px-3 py-1 text-sm transition-colors ${
                    selectedCategories.includes(category)
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-input bg-background hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {selectedCategories.length === 0 && (
              <p className="text-xs text-muted-foreground">Select at least one category</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={10}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createBlogMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || createBlogMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {createBlogMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </DialogFooter>
        </form>

        {createBlogMutation.isError && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            Failed to create blog. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
