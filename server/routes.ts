import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { connectMongoDB, BlogModel } from "./mongodb";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  await connectMongoDB();
  await seedDatabase();

  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      const blog = await storage.createBlog(req.body);
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: "Failed to create blog" });
    }
  });

  return httpServer;
}

async function seedDatabase() {
  const count = await BlogModel.countDocuments();
  if (count > 0) return;

  const blogs = [
    {
      title: "Future of Fintech",
      category: ["FINANCE"],
      description: "Exploring how AI and blockchain are reshaping financial services and what it means for future...",
      date: new Date("2026-01-11T09:12:45.120Z"),
      coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
      tags: ["Fintech"],
      readTime: 5,
      author: { name: "Arjun Mehta", role: "Senior Financial Analyst", avatar: "" },
      content: `The intersection of finance and technology has never been more vibrant. As we look towards 2024, the role of the Chartered Accountant is evolving from mere bookkeeping to strategic financial analysis powered by AI.

## The Rise of Automated Accounting

Automation is no longer a buzzword; it's a reality. Routine tasks like data entry, reconciliation, and payroll processing are being automated at an unprecedented pace. This shift allows finance professionals to focus on high-value activities such as:

- Strategic financial planning and analysis (FP&A).
- Risk management and compliance auditing.
- Advisory services for business growth and sustainability.

## Blockchain: Beyond Cryptocurrency

While Bitcoin grabs the headlines, the underlying technology—blockchain—is quietly revolutionizing auditing. The immutable ledger provides a "single source of truth" that could potentially eliminate the need for sampling in audits, allowing for 100% verification of transactions.

> "The accountant of the future will be a data scientist, a storyteller, and a strategic partner, all rolled into one."

## Preparing for the Shift

To stay relevant, CAs must upskill. Understanding Python for data analysis, mastering visualization tools like PowerBI, and getting comfortable with AI-driven ERP systems are now essential skills. The traditional syllabus provides the foundation, but continuous learning builds the career.`
    },
    {
      title: "Ace Your CA Finals",
      category: ["CAREER"],
      description: "Strategies and study plans to help you clear your exams in the first attempt without burning out.",
      date: new Date("2026-01-13T06:42:36.580Z"),
      coverImage: "https://images.pexels.com/photos/5212327/pexels-photo-5212327.jpeg",
      tags: ["Study Tips"],
      readTime: 7,
      author: { name: "Priya Sharma", role: "CA Coach", avatar: "" },
      content: `Clearing CA finals on the first attempt requires more than hard work—it demands smart planning and mental discipline. The syllabus is vast, and without a structured approach, students often feel overwhelmed.

## Creating Your Study Plan

A realistic timetable that balances study, revision, and rest is the foundation of effective preparation. Conceptual clarity should always take priority over rote learning.

## Key Strategies

- Focus on understanding practical applications
- Practice with past exam papers
- Join study groups for peer learning
- Take regular breaks to avoid burnout`
    },
    {
      title: "Understanding Tax Reforms",
      category: ["REGULATIONS"],
      description: "A comprehensive breakdown of the new tax laws introduced this fiscal year and their impact on...",
      date: new Date("2026-01-05T10:20:15.000Z"),
      coverImage: "https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg",
      tags: ["Taxation"],
      readTime: 6,
      author: { name: "Rajesh Kumar", role: "Tax Consultant", avatar: "" },
      content: `Recent tax reforms have introduced notable changes affecting individuals, startups, and large enterprises alike. Revised slabs, updated compliance requirements, and stricter reporting norms aim to increase transparency and widen the tax base.

## Key Changes

Understanding the intent behind reforms is essential for professionals. Incentives for digital transactions, reduced corporate tax rates, and streamlined GST filing processes are steps toward a more efficient economy.`
    },
    {
      title: "Soft Skills for Auditors",
      category: ["SKILLS"],
      description: "Why technical knowledge isn't enough. Mastering communication and negotiation in your audits.",
      date: new Date("2026-01-03T14:10:00.000Z"),
      coverImage: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
      tags: ["Development"],
      readTime: 4,
      author: { name: "Arjun Mehta", role: "Senior Financial Analyst", avatar: "" },
      content: `Technical expertise is just one part of being a successful auditor. Communication, negotiation, and interpersonal skills are equally important in building client relationships and delivering value.

## Essential Soft Skills

- Active listening and empathy
- Clear and concise communication
- Negotiation and conflict resolution
- Professional skepticism with tact`
    },
    {
      title: "Audit Automation Tools",
      category: ["TECHNOLOGY"],
      description: "A comprehensive guide to the latest tools transforming audit workflows and efficiency.",
      date: new Date("2026-01-01T08:30:00.000Z"),
      coverImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      tags: ["Automation"],
      readTime: 8,
      author: { name: "Tech Team", role: "CA Monk Research", avatar: "" },
      content: `Artificial intelligence is transforming the auditing profession by automating repetitive tasks and enhancing accuracy. AI tools can analyze massive datasets in minutes, flag anomalies, and identify potential risks.

## Top Tools for Modern Auditors

- Data analytics platforms
- Automated sampling tools
- AI-powered anomaly detection
- Cloud-based collaboration suites`
    }
  ];

  await BlogModel.insertMany(blogs);
  console.log("Database seeded with sample blogs");
}
