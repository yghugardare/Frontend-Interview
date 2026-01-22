import { useState } from "react";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateBlogDialogProps {
  onBlogCreated?: (blogId: string) => void;
}

interface FormData {
  title: string;
  category: string;
  description: string;
  coverImage: string;
  content: string;
}

interface FormErrors {
  title?: string;
  category?: string;
  description?: string;
  coverImage?: string;
  content?: string;
}

const initialFormData: FormData = {
  title: "",
  category: "",
  description: "",
  coverImage: "",
  content: "",
};

export function CreateBlogDialog({ onBlogCreated }: CreateBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const createBlogMutation = useCreateBlog();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (formData.coverImage.trim()) {
      try {
        new URL(formData.coverImage);
      } catch {
        newErrors.coverImage = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert comma-separated categories to array
    const categories = formData.category
      .split(",")
      .map((cat) => cat.trim().toUpperCase())
      .filter((cat) => cat.length > 0);

    const payload = {
      title: formData.title.trim(),
      category: categories.length > 0 ? categories : ["GENERAL"],
      description: formData.description.trim(),
      coverImage:
        formData.coverImage.trim() ||
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      content: formData.content.trim(),
      date: new Date().toISOString(),
    };

    try {
      const newBlog = await createBlogMutation.mutateAsync(payload);
      toast.success("Blog created successfully!", {
        description: `"${newBlog.title}" has been published.`,
      });
      setFormData(initialFormData);
      setErrors({});
      setOpen(false);
      if (onBlogCreated) {
        onBlogCreated(String(newBlog.id));
      }
    } catch (error) {
      toast.error("Failed to create blog", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setFormData(initialFormData);
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-6">
          <Plus className="h-4 w-4" />
          New Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Blog</DialogTitle>
          <DialogDescription>
            Share your insights with the world. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Categories</Label>
            <Input
              id="category"
              name="category"
              placeholder="Finance, Tech, Career (comma-separated)"
              value={formData.category}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">
              Enter categories separated by commas
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief summary of your blog"
              value={formData.description}
              onChange={handleInputChange}
              rows={2}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              name="coverImage"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={handleInputChange}
              className={errors.coverImage ? "border-red-500" : ""}
            />
            {errors.coverImage && (
              <p className="text-sm text-red-500">{errors.coverImage}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createBlogMutation.isPending}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              {createBlogMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
