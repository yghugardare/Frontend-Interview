import { useState, useRef } from "react";
import { useCreateBlog } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CreateBlogFormProps {
    onSuccess?: () => void;
}

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadMode, setUploadMode] = useState<"url" | "file">("url");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
    });

    const createBlog = useCreateBlog();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const categories = formData.category
            .split(",")
            .map((c) => c.trim().toUpperCase())
            .filter(Boolean);

        // Use the preview image (from file upload) or the URL
        const coverImageToUse = uploadMode === "file" && imagePreview
            ? imagePreview
            : formData.coverImage;

        await createBlog.mutateAsync({
            title: formData.title,
            category: categories,
            description: formData.description,
            coverImage: coverImageToUse,
            content: formData.content,
        });

        setFormData({
            title: "",
            category: "",
            description: "",
            coverImage: "",
            content: "",
        });
        setImagePreview(null);
        setUploadMode("url");
        setOpen(false);
        onSuccess?.();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const isValid =
        formData.title &&
        formData.category &&
        formData.description &&
        formData.content;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    New Blog
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Blog</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new blog post.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
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
                        <Label htmlFor="category">Categories *</Label>
                        <Input
                            id="category"
                            name="category"
                            placeholder="e.g., TECH, FINANCE (comma-separated)"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Separate multiple categories with commas
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="A brief summary of your blog"
                            value={formData.description}
                            onChange={handleChange}
                            rows={2}
                            required
                        />
                    </div>

                    {/* Cover Image Section */}
                    <div className="space-y-3">
                        <Label>Cover Image</Label>

                        {/* Toggle between URL and Upload */}
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant={uploadMode === "url" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setUploadMode("url")}
                            >
                                URL
                            </Button>
                            <Button
                                type="button"
                                variant={uploadMode === "file" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setUploadMode("file")}
                            >
                                Upload
                            </Button>
                        </div>

                        {uploadMode === "url" ? (
                            <Input
                                id="coverImage"
                                name="coverImage"
                                placeholder="https://example.com/image.jpg"
                                value={formData.coverImage}
                                onChange={handleChange}
                            />
                        ) : (
                            <div className="space-y-3">
                                {/* Upload Area */}
                                {!imagePreview ? (
                                    <div
                                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <svg
                                            className="w-10 h-10 mx-auto text-muted-foreground mb-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="text-sm font-medium">Click to upload image</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                ) : (
                                    /* Image Preview */
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Cover preview"
                                            className="w-full aspect-video object-cover rounded-lg"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={handleRemoveImage}
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="Write your blog content here..."
                            value={formData.content}
                            onChange={handleChange}
                            rows={8}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || createBlog.isPending}
                        >
                            {createBlog.isPending ? "Creating..." : "Create Blog"}
                        </Button>
                    </div>

                    {createBlog.isError && (
                        <p className="text-sm text-destructive">
                            {createBlog.error instanceof Error
                                ? createBlog.error.message
                                : "Failed to create blog"}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
