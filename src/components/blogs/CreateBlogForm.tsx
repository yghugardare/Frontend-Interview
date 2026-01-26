import React, { useState } from 'react';
import type { CreateBlogInput } from '../../types/blog';
import { Button, Input, Textarea, Card } from '../ui';
import { useCreateBlog } from '../../hooks/useBlogs';

interface CreateBlogFormProps {
  onSuccess?: () => void;
}

export const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  onSuccess,
}) => {
  const createBlogMutation = useCreateBlog();
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    category: [],
    description: '',
    coverImage: '',
    content: '',
  });
  const [categoryInput, setCategoryInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (formData.category.length === 0) {
      newErrors.category = 'At least one category is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = () => {
    if (
      categoryInput.trim() &&
      !formData.category.includes(categoryInput.toUpperCase())
    ) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.toUpperCase()],
      });
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createBlogMutation.mutateAsync(formData);
      setFormData({
        title: '',
        category: [],
        description: '',
        coverImage: '',
        content: '',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Create New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          error={errors.title}
          placeholder="Enter blog title"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
              placeholder="Enter category and press Enter"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddCategory} size="md">
              Add
            </Button>
          </div>

          {formData.category.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {formData.category.map((cat) => (
                <div
                  key={cat}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full flex items-center gap-2"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="text-blue-800 hover:text-blue-900 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <Input
          label="Cover Image URL"
          value={formData.coverImage}
          onChange={(e) =>
            setFormData({ ...formData, coverImage: e.target.value })
          }
          error={errors.coverImage}
          placeholder="https://example.com/image.jpg"
          type="url"
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={errors.description}
          placeholder="Brief description of the blog"
          rows={3}
        />

        <Textarea
          label="Content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          error={errors.content}
          placeholder="Full blog content"
          rows={8}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            isLoading={createBlogMutation.isPending}
            disabled={createBlogMutation.isPending}
          >
            Create Blog
          </Button>
          {createBlogMutation.isError && (
            <p className="text-red-500 text-sm">
              Error creating blog: {createBlogMutation.error?.message}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};
