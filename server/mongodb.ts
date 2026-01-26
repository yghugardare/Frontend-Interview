import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: [String], required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  coverImage: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  author: {
    name: { type: String, default: "Arjun Mehta" },
    role: { type: String, default: "Senior Financial Analyst" },
    avatar: { type: String, default: "" }
  },
  readTime: { type: Number, default: 5 }
});

export const BlogModel = mongoose.model("Blog", blogSchema);

export interface IBlog {
  _id: string;
  title: string;
  category: string[];
  description: string;
  date: Date;
  coverImage: string;
  content: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: number;
}
