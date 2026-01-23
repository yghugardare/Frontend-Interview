import type { Blog, NewBlog } from "../types"

export const fetchBlogs = async (): Promise<Blog[]> => {
    const res = await fetch('http://localhost:3001/blogs')
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}

export const fetchBlogById = async (id: string): Promise<Blog> => {
    const res = await fetch(`http://localhost:3001/blogs/${id}`)
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}

export const createBlog = async (newBlog: NewBlog): Promise<Blog> => {
    const res = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
    })
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}
