import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600"></div>
                <span className="text-2xl font-bold text-blue-900">CA Monk Blog</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link to="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
                <Link to="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Webinars
                </Link>
                <Link to="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Resources
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">CA Monk Blog</h3>
              <p className="text-gray-600 text-sm">
                Stay updated with the latest trends in finance, accounting, and career growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-blue-600">Blog</Link></li>
                <li><Link to="#" className="hover:text-blue-600">Webinars</Link></li>
                <li><Link to="#" className="hover:text-blue-600">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-blue-600">Job Board</Link></li>
                <li><Link to="#" className="hover:text-blue-600">Practice Tests</Link></li>
                <li><Link to="#" className="hover:text-blue-600">Mentorship</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-blue-600">LinkedIn</Link></li>
                <li><Link to="#" className="hover:text-blue-600">Twitter</Link></li>
                <li><Link to="#" className="hover:text-blue-600">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            © 2024 CA Monk Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}