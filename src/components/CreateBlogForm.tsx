import { useState } from 'react';
import { useCreateBlog } from '@/hooks/useBlogQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertCircle, Loader2, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CreateBlogFormProps {
  onSuccess?: () => void;
}

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    coverImage: '',
  });

  const createBlogMutation = useCreateBlog();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!formData.content.trim()) {
      alert('Please enter content');
      return;
    }

    if (!formData.coverImage.trim()) {
      alert('Please enter a cover image URL');
      return;
    }

    if (!categories.trim()) {
      alert('Please enter at least one category');
      return;
    }

    const categoryList = categories
      .split(',')
      .map((cat) => cat.trim().toUpperCase())
      .filter((cat) => cat);

    try {
      await createBlogMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        content: formData.content,
        coverImage: formData.coverImage,
        category: categoryList,
        date: new Date().toISOString(),
      });

      setFormData({
        title: '',
        description: '',
        content: '',
        coverImage: '',
      });
      setCategories('');
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new blog post
          </DialogDescription>
        </DialogHeader>

        {createBlogMutation.error && (
          <Card className="border-destructive/50 bg-destructive/10 p-4">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Error creating blog</p>
                <p className="text-sm text-destructive/80">
                  {createBlogMutation.error instanceof Error
                    ? createBlogMutation.error.message
                    : 'An error occurred. Please try again.'}
                </p>
              </div>
            </div>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={createBlogMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="categories" className="text-sm font-medium">
              Categories (comma-separated)
            </label>
            <Input
              id="categories"
              placeholder="e.g., FINANCE, TECH, CAREER"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              disabled={createBlogMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={createBlogMutation.isPending}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="coverImage" className="text-sm font-medium">
              Cover Image URL
            </label>
            <Input
              id="coverImage"
              name="coverImage"
              placeholder="https://images.example.com/photo.jpg"
              value={formData.coverImage}
              onChange={handleInputChange}
              disabled={createBlogMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter the full blog content"
              value={formData.content}
              onChange={handleInputChange}
              disabled={createBlogMutation.isPending}
              rows={6}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createBlogMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createBlogMutation.isPending}
            >
              {createBlogMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {createBlogMutation.isPending ? 'Creating...' : 'Create Blog'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
