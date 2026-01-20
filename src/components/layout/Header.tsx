import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Plus, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/blogs" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">BlogApp</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={isActive("/blogs") ? "secondary" : "ghost"}
            asChild
            className={cn(
              "hidden sm:inline-flex",
              isActive("/blogs") && "bg-secondary",
            )}
          >
            <Link to="/blogs">Blogs</Link>
          </Button>

          <Button
            variant={isActive("/create") ? "secondary" : "default"}
            asChild
            size="sm"
          >
            <Link to="/create">
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">New Blog</span>
              <span className="sm:hidden">New</span>
            </Link>
          </Button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
