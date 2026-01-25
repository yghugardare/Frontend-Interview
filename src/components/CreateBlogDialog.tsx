import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateBlog } from "@/hooks/useBlogs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CreateBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateBlogDialog = ({ open, onOpenChange }: CreateBlogDialogProps) => {
  const { toast } = useToast();
  const createBlog = useCreateBlog();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    coverImage: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createBlog.mutateAsync({
        title: formData.title,
        category: formData.category.split(",").map((c) => c.trim().toUpperCase()),
        description: formData.description,
        coverImage: formData.coverImage || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        content: formData.content,
      });

      toast({
        title: "Success",
        description: "Blog created successfully!",
      });

      setFormData({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Create New Blog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categories (comma separated)</Label>
            <Input
              id="category"
              placeholder="e.g., Finance, Tech, Career"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Write a short description..."
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content..."
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createBlog.isPending}>
              {createBlog.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Blog
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;
