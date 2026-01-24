import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';
import type { CreateBlogDto } from '@/types';

export default function CreateBlog() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<CreateBlogDto>({
        title: '',
        category: '',
        description: '',
        coverImage: '',
        content: '',
        date: new Date().toISOString(), // Initial value, but API service updates it
    });

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            navigate('/');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return; // Basic validation
        mutation.mutate(formData);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Button
                variant="ghost"
                className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
                onClick={() => navigate('/')}
            >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Home
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Create New Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter blog title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                placeholder="e.g., TECH, LIFESTYLE (comma separated for multiple)"
                                value={Array.isArray(formData.category) ? formData.category.join(', ') : formData.category}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    // Logic to handle comma separated values if needed, for now simple string
                                    setFormData(prev => ({ ...prev, category: e.target.value }))
                                }}
                                required
                            />
                            <p className="text-xs text-muted-foreground">For multiple categories, separate them with commas (e.g. TECH, FINANCE)</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Brief summary of the blog"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                placeholder="https://example.com/image.jpg"
                                value={formData.coverImage}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your blog content here..."
                                value={formData.content}
                                onChange={handleChange}
                                className="min-h-[200px]"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Publishing...' : 'Publish Blog'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
