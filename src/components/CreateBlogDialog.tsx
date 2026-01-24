import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateBlogDto } from "@/types";
import { useState } from "react";
import { X } from "lucide-react";

interface CreateBlogDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBlogDialog = ({ isOpen, onClose }: CreateBlogDialogProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateBlogDto>();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      reset();
      onClose();
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: CreateBlogDto) => {
    // Add default values for simplicity
    const newBlog = {
      ...data,
      id: Math.random().toString(36).substr(2, 9), // Simple ID gen
      date: new Date().toISOString(),
      category: typeof data.category === 'string' ? (data.category as string).split(',').map((s: string) => s.trim()) : ["General"]
    };
    mutation.mutate(newBlog as any); // Casting for this simple example
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border text-card-foreground shadow-lg rounded-lg w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Create New Blog</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input {...register("title", { required: true })} placeholder="Blog Title" />
            {errors.title && <span className="text-red-500 text-xs">Required</span>}
          </div>
          
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input {...register("description", { required: true })} placeholder="Short description" />
          </div>

          <div>
            <label className="text-sm font-medium">Cover Image URL</label>
            <Input {...register("coverImage", { required: true })} placeholder="https://..." />
          </div>

          <div>
            <label className="text-sm font-medium">Categories (comma separated)</label>
            <Input {...register("category", { required: true })} placeholder="TECh, FINANCE" />
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea {...register("content", { required: true })} className="h-32" placeholder="Full blog content..." />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Publish Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};