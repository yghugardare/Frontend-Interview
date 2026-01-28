import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormField } from '@/components/form/FormField';
import { CategoryInput } from '@/components/blog/CategoryInput';
import { useCreateBlog } from '@/hooks/useCreateBlog';
import { useState } from 'react';

export function CreateBlogDialog({ onCreated }: { onCreated?: (id?: string) => void }) {
  const createBlog = useCreateBlog();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (categories.length === 0) {
      toast.error('Select at least one category');
      return;
    }

    createBlog.mutate(
      {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        content: formData.get('content') as string,
        coverImage: formData.get('coverImage') as string,
        category: categories,
        date: new Date().toISOString(),
      },
      {
        onSuccess: (blog) => {
          toast.success('Blog created 🎉');
          onCreated?.(blog?.id?.toString());
          setCategories([]);
          setOpen(false);
          e.currentTarget.reset();
        },
        onError: () => toast.error('Failed to create blog'),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create Blog</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Title" name="title" placeholder="Enter blog title" required />
          <FormField
            label="Cover Image URL"
            name="coverImage"
            placeholder="https://example.com/cover.jpg"
            required
          />
          <FormField
            label="Short Description"
            name="description"
            placeholder="Brief summary of the blog post"
            as="textarea"
          />
          <FormField
            label="Content"
            name="content"
            placeholder="Write your blog content here..."
            as="textarea"
            rows={8}
          />

          <CategoryInput value={categories} onChange={setCategories} />

          <Button className="w-full cursor-pointer" type="submit" disabled={createBlog.isPending}>
            {createBlog.isPending ? 'Creating…' : 'Create Blog'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
