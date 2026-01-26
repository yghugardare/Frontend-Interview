import { useState } from "react";
import { useCreateBlog } from "../hooks/useBlogs";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import type { CreateBlogInput } from "../types/blog";

export function CreateBlogForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    category: [],
    description: "",
    coverImage: "",
    content: "",
  });
  const [categoryInput, setCategoryInput] = useState("");

  const createBlog = useCreateBlog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlog.mutateAsync(formData);
      setFormData({
        title: "",
        category: [],
        description: "",
        coverImage: "",
        content: "",
      });
      setCategoryInput("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  const addCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim())) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim()],
      });
      setCategoryInput("");
    }
  };

  const removeCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full mb-4">
        Create New Blog
      </Button>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
        <CardDescription>Fill in the details to create a new blog post</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                setFormData({ ...formData, coverImage: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categories</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
                placeholder="Add category and press Enter"
              />
              <Button type="button" onClick={addCategory}>
                Add
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {formData.category.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => removeCategory(cat)}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createBlog.isPending}>
              {createBlog.isPending ? "Creating..." : "Create Blog"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
