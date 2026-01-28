import { useState } from "react";
import { useCreateBlog } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function CreateBlogForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      title,
      category: category.split(",").map((c) => c.trim()),
      description,
      content,
      coverImage,
      date: new Date().toISOString(),
    });

    setTitle("");
    setCategory("");
    setDescription("");
    setContent("");
    setCoverImage("");

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 rounded-xl border bg-white p-6 shadow-sm my-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">Create New Blog</h2>

      {/* Title */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Category</Label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="FINANCE, TECH"
          required
        />
        <p className="text-xs text-gray-500">Separate categories with commas</p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short summary of the blog"
          rows={3}
          required
        />
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Cover Image URL
        </Label>
        <Input
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Content</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Write your blog content here..."
          required
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="
      bg-green-500
      w-full
      cursor-pointer
      transition-colors
      hover:bg-green-300
      hover:text-black
    "
        >
          {isPending ? "Creating..." : "Create Blog"}
        </Button>
      </div>
    </form>
  );
}
