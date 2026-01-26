import { BlogModel, type IBlog } from "./mongodb";

export interface IStorage {
  getBlogs(): Promise<IBlog[]>;
  getBlog(id: string): Promise<IBlog | null>;
  createBlog(blog: Omit<IBlog, "_id">): Promise<IBlog>;
}

export class MongoStorage implements IStorage {
  async getBlogs(): Promise<IBlog[]> {
    const blogs = await BlogModel.find().sort({ date: -1 }).lean();
    return blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString()
    })) as IBlog[];
  }

  async getBlog(id: string): Promise<IBlog | null> {
    try {
      const blog = await BlogModel.findById(id).lean();
      if (!blog) return null;
      return { ...blog, _id: blog._id.toString() } as IBlog;
    } catch {
      return null;
    }
  }

  async createBlog(blogData: Omit<IBlog, "_id">): Promise<IBlog> {
    const blog = await BlogModel.create(blogData);
    const obj = blog.toObject();
    return { ...obj, _id: obj._id.toString() } as IBlog;
  }
}

export const storage = new MongoStorage();
