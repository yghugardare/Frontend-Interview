import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateBlogForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    mutation.mutate({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      category: ["TECH"],
      coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
      date: new Date().toISOString(),
    });

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" placeholder="Title" required />
      <Input name="description" placeholder="Description" required />
      <Input name="content" placeholder="Content" required />

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </Button>

      {mutation.isError && (
        <p className="text-red-500">Failed to create blog</p>
      )}
    </form>
  );
}
