export function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span className="font-bold text-white text-lg">CA MONK</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering the next generation of financial leaders with tools, community, and knowledge.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2024 CA Monk. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
