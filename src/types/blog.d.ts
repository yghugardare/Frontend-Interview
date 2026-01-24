// Blog type definition
export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

// For creating new blogs
export interface CreateBlogInput {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}
