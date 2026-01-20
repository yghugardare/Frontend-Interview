export type BlogCategory = "FINANCE" | "TECH" | "AI" | "STARTUP"; 

export interface Blog {
  id: number;
  title: string;
  category: BlogCategory[];
  description: string;
  date: string; 
  coverImage: string;
  content: string;
}

export interface CreateBlogPayload {
  title: string;
  category: BlogCategory[];
  description: string;
  coverImage: string;
  content: string;
}

