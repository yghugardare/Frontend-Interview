import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  return (
    <nav className="w-full border-b shadow-sm radius-md bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">CA Monk</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button className="cursor-pointer hover:text-foreground transition">
            Tools
          </button>
          <button className="cursor-pointer hover:text-foreground transition">
            Practice
          </button>
          <button className="cursor-pointer hover:text-foreground transition">
            Events
          </button>
          <button className="cursor-pointer hover:text-foreground transition">
            Job Board
          </button>
          <button className="cursor-pointer hover:text-foreground transition">
            Points
          </button>
        </div>

        {/* Right: Create Blog/Home */}
        <div className="flex items-center gap-2 ">
          {isCreatePage ? (
            <Link to="/">
              <Button
                className="cursor-pointer hover:bg-green-300 transition"
                variant="outline"
                size="sm"
              >
                Home
              </Button>
            </Link>
          ) : (
            <Link to="/create">
              <Button
                className="cursor-pointer hover:bg-green-300 transition"
                variant="outline"
                size="sm"
              >
                Create Blog
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
