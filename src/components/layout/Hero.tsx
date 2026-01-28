import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 py-20 px-6">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                Welcome to BlogHub
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Discover Amazing <span className="text-blue-100">Stories</span> & <span className="text-yellow-200">Insights</span>
            </h1>

            <p className="text-xl text-blue-50 leading-relaxed max-w-lg">
              Explore thought-provoking articles on finance, career, technology, and professional development. Join thousands of professionals staying ahead of the curve.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#blogs">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 h-12 px-6 text-base font-semibold">
                  Explore Blogs
                  <ArrowRight size={20} />
                </Button>
              </a>
              <a href="/create">
                <Button 
                  variant="outline" 
                  className=" border-white text-black hover:bg-white/10 h-12 px-6 text-base font-semibold"
                >
                  Start Writing
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-blue-50">Blog Posts</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-blue-50">Readers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">20+</p>
                <p className="text-blue-50">Categories</p>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square">
              {/* Large Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-3xl"></div>
              
              {/* Cards Floating */}
              <div className="absolute top-10 right-10 w-48 h-32 bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="w-full h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg mb-3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>

              <div className="absolute bottom-20 left-10 w-48 h-32 bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="w-full h-16 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg mb-3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>

              {/* Center Indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="w-10 h-10 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { BookOpen } from "lucide-react";
