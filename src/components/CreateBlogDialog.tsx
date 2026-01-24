import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateBlog } from "@/hooks/useBlogs";
import type { CreateBlogInput } from "@/types/blog";
import { Plus } from "lucide-react";

export const CreateBlogDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutate: createBlog, isPending } = useCreateBlog();

  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    category: [],
    description: "",
    coverImage: "",
    content: "",
  });

  const [categoryInput, setCategoryInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation - could be improved
    if (!formData.title || !formData.description || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.title.length < 5) {
      alert("Title should be at least 5 characters long");
      return;
    }

    createBlog(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          title: "",
          category: [],
          description: "",
          coverImage: "",
          content: "",
        });
        setCategoryInput("");
        setOpen(false);
      },
      onError: (error) => {
        alert(`Error creating blog: ${error.message}`);
      },
    });
  };

  const handleAddCategory = () => {
    const trimmedCategory = categoryInput.trim().toUpperCase();
    if (trimmedCategory && !formData.category.includes(trimmedCategory)) {
      setFormData({
        ...formData,
        category: [...formData.category, trimmedCategory],
      });
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== category),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new blog post.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter blog title"
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
                    handleAddCategory();
                  }
                }}
                placeholder="Add category (e.g., FINANCE, TECH)"
              />
              <Button type="button" onClick={handleAddCategory} variant="outline">
                Add
              </Button>
            </div>
            {formData.category.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {formData.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary rounded-full text-sm flex items-center gap-2"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of the blog"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your blog content here..."
              rows={10}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
