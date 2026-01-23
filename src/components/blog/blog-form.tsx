import { useState } from "react"
import type { BlogFormData } from "../../types/blog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"

interface BlogFormProps {
  initialData?: Partial<BlogFormData>
  onSubmit: (data: BlogFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function BlogForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || "",
    category: initialData?.category || [],
    description: initialData?.description || "",
    coverImage: initialData?.coverImage || "",
    content: initialData?.content || "",
  })

  const [categoryInput, setCategoryInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, categoryInput.trim()],
      }))
      setCategoryInput("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== category),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter blog title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          type="url"
          value={formData.coverImage}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
          }
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categories</Label>
        <div className="flex gap-2">
          <Input
            id="category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Add a category"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddCategory()
              }
            }}
          />
          <Button type="button" onClick={handleAddCategory}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.category.map((cat) => (
            <Button
              key={cat}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleRemoveCategory(cat)}
            >
              {cat} ×
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Brief description of the blog"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Full blog content"
          rows={6}
          required
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}

