export interface Blog {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string; // ISO date string
    coverImage: string;
    content: string;
}

export interface CreateBlogDTO {
    title: string;
    category: string[];
    description: string;
    coverImage: string;
    content: string;
    date?: string; // Optional, will be auto-generated
}

export interface APIResponse<T> {
    data: T;
    message?: string;
}

export interface APIError {
    message: string;
    status?: number;
}
