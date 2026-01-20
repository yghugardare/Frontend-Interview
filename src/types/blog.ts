export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  createdAt: string;
}

export type CreateBlogInput = Omit<Blog, "id" | "createdAt">;
