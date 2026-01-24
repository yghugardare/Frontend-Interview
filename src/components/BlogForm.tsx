import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateBlog } from "@/hooks/blogs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { Label } from "@/shadcn/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

export default function BlogForm() {
  const navigate = useNavigate();
  const { mutateAsync: createBlog, isPending, isError } = useCreateBlog();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBlog = await createBlog({
        ...formData,
        category: formData.category
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        date: new Date().toISOString(),
      });
      navigate(`/blogs/${newBlog.id}`);
    } catch (error) {
      console.log(error);
      throw new Error("failed to create new blog");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isError && (
              <div className="p-3 rounded bg-destructive/15 text-destructive text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Failed to create blog. Please try again.</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                placeholder="Blog title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                placeholder="Short description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Categories</Label>
              <Input
                id="categories"
                placeholder="Tech, Regulation, Finance (comma separated)"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                required
                placeholder="Markdown content... (or just text for now)"
                className="min-h-50"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
