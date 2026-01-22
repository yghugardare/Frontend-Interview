export interface Blog {
  id: number | string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export interface CreateBlogPayload {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
  date: string;
}
