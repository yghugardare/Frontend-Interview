import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsApi } from "../../api/blogs";
import type { CreateBlogInput } from "../../types/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface BlogFormProps {
  onSuccess?: () => void;
}

export function BlogForm({ onSuccess }: BlogFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    category: [],
    description: "",
    coverImage: "",
    content: "",
    author: "",
  });
  const [categoryInput, setCategoryInput] = useState("");

  const mutation = useMutation({
    mutationFn: blogsApi.create,
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      // Reset form
      setFormData({
        title: "",
        category: [],
        description: "",
        coverImage: "",
        content: "",
        author: "",
      });
      setCategoryInput("");

      // Call success callback
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.content ||
      !formData.author
    ) {
      return;
    }

    mutation.mutate(formData);
  };

  const handleAddCategory = () => {
    if (
      categoryInput.trim() &&
      !formData.category.includes(categoryInput.trim().toUpperCase())
    ) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim().toUpperCase()],
      });
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((cat) => cat !== categoryToRemove),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
        <CardDescription>
          Fill in the details below to create a new blog post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Categories</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                placeholder="Add category (e.g., TECH, FINANCE)"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddCategory}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {formData.category.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.category.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image URL */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={10}
              required
            />
          </div>

          {/* Success/Error Messages */}
          {mutation.isSuccess && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Blog created successfully!
              </AlertDescription>
            </Alert>
          )}

          {mutation.isError && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to create blog. Please try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Blog"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
