import { Menu, X, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              BlogHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Blogs
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
          </div>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <Link to="/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Write Blog
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link to="/" className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/blogs" className="block text-gray-700 hover:text-blue-600">
              Blogs
            </Link>
            <Link to="/categories" className="block text-gray-700 hover:text-blue-600">
              Categories
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/create" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Write Blog
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
