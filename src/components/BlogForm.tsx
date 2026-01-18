import { useState } from 'react';
import type { CreateBlogDTO } from '@/types/blog.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useCreateBlog } from '@/hooks/useBlogQueries';

interface BlogFormProps {
    onSuccess?: () => void;
}

const AVAILABLE_CATEGORIES = [
    'FINANCE',
    'TECH',
    'CAREER',
    'EDUCATION',
    'REGULATIONS',
    'LIFESTYLE',
];

export const BlogForm = ({ onSuccess }: BlogFormProps) => {
    const [formData, setFormData] = useState<CreateBlogDTO>({
        title: '',
        category: [],
        description: '',
        coverImage: '',
        content: '',
    });

    const createBlog = useCreateBlog();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.content || formData.category.length === 0) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            await createBlog.mutateAsync(formData);
            // Reset form
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

    const toggleCategory = (cat: string) => {
        setFormData(prev => ({
            ...prev,
            category: prev.category.includes(cat)
                ? prev.category.filter(c => c !== cat)
                : [...prev.category, cat]
        }));
    };

    return (
        <div className="h-full overflow-y-auto">
            <Card className="border-0 shadow-none">
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl">Create New Blog</CardTitle>
                    <CardDescription className="text-sm">Fill in the details to create a new blog post</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm sm:text-base">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter blog title"
                                className="text-sm sm:text-base h-10 sm:h-11"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm sm:text-base">Categories *</Label>
                            <div className="flex flex-wrap gap-2">
                                {AVAILABLE_CATEGORIES.map((cat) => (
                                    <Badge
                                        key={cat}
                                        variant={formData.category.includes(cat) ? "default" : "outline"}
                                        className="cursor-pointer text-xs sm:text-sm px-3 py-1.5 active:scale-95 transition-transform"
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {cat}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm sm:text-base">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Brief description of the blog"
                                rows={3}
                                className="text-sm sm:text-base resize-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage" className="text-sm sm:text-base">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                type="url"
                                value={formData.coverImage}
                                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                                placeholder="https://example.com/image.jpg"
                                className="text-sm sm:text-base h-10 sm:h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-sm sm:text-base">Content *</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="Write your blog content here..."
                                rows={12}
                                className="text-sm sm:text-base resize-none"
                                required
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                type="submit"
                                disabled={createBlog.isPending}
                                className="w-full h-11 text-sm sm:text-base"
                            >
                                {createBlog.isPending ? 'Creating...' : 'Create Blog'}
                            </Button>
                        </div>

                        {createBlog.isError && (
                            <p className="text-xs sm:text-sm text-destructive">
                                Error: {createBlog.error?.message || 'Failed to create blog'}
                            </p>
                        )}

                        {createBlog.isSuccess && (
                            <p className="text-xs sm:text-sm text-green-600">
                                Blog created successfully!
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
