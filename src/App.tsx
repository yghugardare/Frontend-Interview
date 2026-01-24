import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlogView from "./components/blogview/BlogView";
import { timeFormatter } from "./utilities/utilities";
import CreateBlog from "./components/createblog/CreateBLog";
import { Plus } from "lucide-react";

import "./App.css";

type ArticleCategory =
  | "FINANCE"
  | "TECH"
  | "BUSINESS"
  | "ACCOUNTING"
  | "INNOVATION";

type ArticleType = {
  id: string;
  title: string;
  category: ArticleCategory[];
  description: string;
  date: string; // ISO date string
  coverImage: string;
  content: string;
};

interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

interface FooterSection {
  category: string;
  links: FooterLink[];
}

function App() {
  // DATE FORMATE OPTION
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const [blogId, setBlogId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // TANSTACK QUERY CLIENT
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:3001/blogs").then((res) => res.json()),
  });
  useEffect(() => {
    if (data) {
      setBlogId(data[0].id);
    }
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // BLOG CARD CLICK HANDLER
  const handleBLogCardClick = (id: string) => {
    setBlogId(id);
  };

  const footerData: FooterSection[] = [
    {
      category: "RESOURCES",
      links: [
        { label: "Blog", url: "/blog" },
        { label: "Case Studies", url: "/case-studies" },
        { label: "Practice Tests", url: "/practice-tests" },
      ],
    },
    {
      category: "PLATFORM",
      links: [
        { label: "Webinars", url: "/webinars" },
        { label: "Job Board", url: "/job-board" },
        { label: "Mentorship", url: "/mentorship" },
      ],
    },
    {
      category: "CONNECT",
      links: [
        { label: "Linkedin", url: "https://linkedin.com", external: true },
        { label: "Twitter", url: "https://twitter.com", external: true },
        { label: "Instagram", url: "https://instagram.com", external: true },
      ],
    },
  ];
  return (
    <div className="main-container w-full ">
      {/* NAVBAR */}
      <div className="nav-bar w-full  flex-1 flex justify-between h-20 md:h-24 px-4 py-2 items-center border-b-1 border-gray-400">
        {/* BRAND */}
        <div className="brand flex items-center gap-x-4">
          <div className="brand-logo w-10 h-10 rounded-lg bg-indigo-600 flex justify-center items-center text-white font-bold">
            CA
          </div>
          <p className="font-semibold text-2xl">CA MONK</p>
        </div>

        {/* NAV MENU LINK */}
        <div className="nav-menu-link text-gray-400 text-lg font-semibold hidden md:block">
          <ul className="nav-link-list flex gap-x-8">
            <li className="nav menu-link">
              <a href="/">Tools</a>
            </li>
            <li className="nav menu-link">
              <a href="/">Practice</a>
            </li>
            <li className="nav menu-link">
              <a href="/">Events</a>
            </li>
            <li className="nav menu-link">
              <a href="/">Job Board</a>
            </li>
            <li className="nav menu-link">
              <a href="/">Points</a>
            </li>
          </ul>
        </div>

        {/* NAV PROFILE */}
        <div className="nav-profile w-24 h-10 rounded-lg text-xl bg-indigo-600 text-white px-2 py-1">
          Profile
        </div>
      </div>

      {/* BLOG COVER */}
      <div className="blog-cover-section space-y-4 h-96 place-content-center px-8">
        <p className="blog-cover-heading font-extrabold text-6xl">
          CA Monk Blog
        </p>
        <p className="blog-cover-sub-heading text-2xl text-gray-500">
          Stay updated with latest trends in finance, accounting, and career
          growth
        </p>
      </div>
      <div className="blog-create flex justify-end w-full p-8">
        <Button
          className={"!p-6 text-lg font-semibold bg-indigo-700"}
          onClick={() => setOpen(true)}
        >
          <Plus /> Create Blog
        </Button>
      </div>

      {/* BLOG CONTAINER */}
      <div className="main-blog-container w-full grid grid-cols-12  gap-y-12 gap-x-8 p-4 md:p-8  ">
        {/* BLOG POST LIST */}
        <div className="blog-post-list flex md:block w-full col-span-12 lg:col-span-4  space-x-6 md:space-y-8 overflow-x-scroll overflow-y-hidden h-[28vh] md:overflow-x-hidden md:overflow-y-scroll md:h-[150vh] custom-scrollbar py-4 px-4 ">
          {data?.map((el: ArticleType) => {
            return (
              <Card
                key={`blog-card-${el.id}`}
                className={` ${
                  el.id === blogId ? "border-l-6  border-l-indigo-700" : ""
                } min-w-76 min-h-32`}
                onClick={() => handleBLogCardClick(el.id)}
              >
                <CardHeader>
                  <CardTitle>
                    <div className="blog-post-card-title-section flex justify-between items-center w-full text-gray-500 text-xs md:text-lg">
                      <div className="blog-post-card-title text-indigo-600">
                        {el.category.join(" & ")}
                      </div>
                      <div className="blog-post-card-time">
                        {timeFormatter(el.date)}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-2">
                  <div className="card-heading font-semibold txt-md md:text-2xl line-clamp-1">
                    {el.title}
                  </div>
                  <div className="card-desc text-xs md:text-xl text-gray-500 line-clamp-2">
                    {el.description}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="blog-category-tag text-xs md:text-normal bg-indigo-100 px-4 py-1 flex justify-center items-center rounded-full text-indigo-600 font-semibold">
                    Featured
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* BLOG CONTENT */}
        <BlogView blogID={blogId} />
        <CreateBlog open={open} setOpen={setOpen} />
      </div>
      {/* BLOG FOOTER */}
      <footer className="w-full h-fit bg-black">
        <div className="footer-content w-full md:grid grid-cols-12 p-8 md:p-12 space-y-12 md:gap-x-12 text-white">
          <div className="brand-info  col-span-12 md:col-span-3 space-y-4">
            {/* BRAND */}
            <div className="brand w-full flex items-center gap-x-4">
              <div className="brand-logo w-10 h-10 rounded-lg bg-white flex justify-center items-center text-black font-bold">
                CA
              </div>
              <p className="font-semibold text-2xl  ">CA MONK</p>
            </div>
            {/* BRAND INFO */}
            <div className="brand-info text-gray-300">
              <p className="font-semibold text-xl text-left leading-8">
                Empowering the next generation of financial leaders with tools,
                community, and knowledge.
              </p>
            </div>
          </div>
          <div className="footer-link col-span-12  md:col-span-9 grid grid-cols-12 text-left">
            {footerData.map((section) => {
              return (
                <div
                  key={section.category}
                  className="footer-menu-link text-gray-400 text-lg font-semibold col-span-4"
                >
                  <div className="footer-grp-heading font-bold mb-4">
                    {section.category}
                  </div>
                  <ul className="footer-link-list  space-y-4 ">
                    {section.links.map((link) => {
                      return (
                        <li key={link.label} className="nav menu-link">
                          <a target="_blank" href={link.url}>
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer-base w-full flex-col flex md:flex-row justify-between items-center h-18 place-content-center border-t-1 border-slate-400 text-gray-400 px-8">
          <div className="all-right">© 2024 CA Monk. All rights reserved.</div>
          <div className="all-right space-x-4">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
