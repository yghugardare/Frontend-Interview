import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

type Blog = {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
};

const CATEGORIES = [
  { id: "FINANCE", label: "Finance" },
  { id: "TECH", label: "Technology" },
  { id: "BUSINESS", label: "Business" },
  { id: "MARKETING", label: "Marketing" },
  { id: "DESIGN", label: "Design" },
];

interface CreateBlogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBlog({ open, setOpen }: CreateBlogType) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    category: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      coverImage: "",
      category: "",
    });
  };

  const createBlogMutation = useMutation({
    mutationFn: async (blogData: typeof formData): Promise<Blog> => {
      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...blogData,
          category: [blogData.category],
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create blog");
      }

      return response.json();
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.setQueryData(["blogs"], (old: Blog[] = []) => [
        newBlog,
        ...old,
      ]);

      toast("Blog created successfully!", {
        description: `"${newBlog.title}" has been published.`,
      });

      resetForm();
      setOpen(false);
    },
    onError: (error: Error) => {
      toast("Error creating blog", {
        description: error.message,
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast("Validation Error", {
        description: "Title is required",
      });
      return;
    }

    if (!formData.category) {
      toast("Validation Error", {
        description: "Please select a category",
      });
      return;
    }

    createBlogMutation.mutate(formData);
    window.location.reload();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Blog Post</SheetTitle>
          <SheetDescription>
            Fill in the details below to publish a new blog article.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-6 p-8">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData?.title}
              onChange={handleInputChange}
              placeholder="Enter a compelling title..."
              disabled={isSubmitting}
              required
            />
            <p className="text-sm text-gray-500">
              Make it catchy and descriptive.
            </p>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Brief overview of your blog post..."
              className="min-h-32"
              disabled={isSubmitting}
              required
            />
            <p className="text-sm text-gray-500">
              A short summary that appears in blog listings.
            </p>
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <Label htmlFor="content">Blog Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData?.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here..."
              className="min-h-64"
              disabled={isSubmitting}
              required
            />
            <p className="text-sm text-gray-500">
              The main content of your blog post.
            </p>
          </div>

          {/* Cover Image URL Field */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL *</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData?.coverImage}
              onChange={handleInputChange}
              placeholder="https://images.pexels.com/photo-..."
              disabled={isSubmitting}
              required
            />
            <p className="text-sm text-gray-500">
              Enter a direct URL to your cover image.
            </p>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData?.category}
              onValueChange={handleSelectChange}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Choose the most relevant category for your blog.
            </p>
          </div>

          {/* Preview Section */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Preview</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Title:</p>
                <p className="font-medium truncate">
                  {formData?.title || "Your title will appear here"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category:</p>
                <p className="text-gray-700">
                  {formData.category
                    ? CATEGORIES.find((c) => c.id === formData?.category)?.label
                    : "No category selected"}
                </p>
              </div>
            </div>
          </div>

          <SheetFooter className="pt-6">
            <SheetClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </SheetClose>

            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Creating...</span>
                  <span className="animate-spin">⟳</span>
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
