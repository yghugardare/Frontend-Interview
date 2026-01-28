import { Mail, MapPin, Phone, Twitter, Linkedin, Github, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About BlogHub</h1>
        <p className="text-xl text-gray-600">
          Discover stories, insights, and ideas from writers around the world
        </p>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            BlogHub is dedicated to providing a platform for writers and thinkers
            to share their perspectives with the world. We believe in the power of
            storytelling and the importance of diverse voices in today's digital
            landscape.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our platform empowers creators to publish their work, connect with
            readers, and build communities around shared interests. Whether you're
            an experienced writer or just starting out, BlogHub is your space to
            express yourself.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We're committed to maintaining a clean, intuitive, and engaging
            environment for both writers and readers. Your voice matters, and we're
            here to help you be heard.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 text-white flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Why Choose Us?</h3>
              <ul className="space-y-3 text-blue-50">
                <li className="flex items-start gap-3">
                  <span className="text-blue-200 mt-1">✓</span>
                  <span>Easy-to-use platform for publishing and reading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-200 mt-1">✓</span>
                  <span>Organized by categories and tags for easy discovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-200 mt-1">✓</span>
                  <span>Support for diverse topics and perspectives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-200 mt-1">✓</span>
                  <span>Community-driven platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-200 mt-1">✓</span>
                  <span>Regular updates and new features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-12 border-t border-b border-gray-200">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
          <p className="text-gray-600">Active Writers</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
          <p className="text-gray-600">Published Articles</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
          <p className="text-gray-600">Monthly Readers</p>
        </div>
      </div>

      {/* Team/Contact Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <Mail size={32} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-3">contact@bloghub.com</p>
            <a href="mailto:contact@bloghub.com" className="text-blue-600 hover:text-blue-700">
              Send Email
            </a>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <MapPin size={32} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600 mb-3">San Francisco, CA</p>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Visit Office
            </a>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <Phone size={32} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-3">+1 (555) 123-4567</p>
            <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-700">
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="#"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
            title="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
            title="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
        <p className="text-gray-600">
          Made with{" "}
          <Heart size={16} className="inline text-red-500" /> by the BlogHub team
        </p>
      </div>
    </div>
  );
}
