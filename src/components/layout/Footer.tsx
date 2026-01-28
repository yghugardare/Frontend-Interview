import { BookOpen, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">BlogHub</span>
            </Link>
            <p className="text-gray-400">
              A platform for professionals to share insights, learn from experts, and grow their careers.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-400 transition-colors">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-blue-400 transition-colors">
                  Write a Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Popular Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Finance & Banking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Career Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Regulations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:hello@bloghub.com" className="hover:text-blue-400 transition-colors">
                    hello@bloghub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p>New York, USA</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} BlogHub. All rights reserved.
            </p>
            <div className="flex gap-6 md:justify-end text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          Made with <span className="text-red-500">❤️</span> for professionals
        </div>
      </div>
    </footer>
  );
}
