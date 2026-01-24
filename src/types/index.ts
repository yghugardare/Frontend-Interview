export interface Blog {
    id: number;
    title: string;
    category: string | string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export type CreateBlogDto = Omit<Blog, 'id'>;
