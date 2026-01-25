const Footer = () => {
  return (
    <footer className="bg-[#0b0d14] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold rounded">
                C
              </div>
              <span className="text-white font-semibold text-lg">
                CA MONK
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation of financial leaders with tools,
              community, and knowledge.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">RESOURCES</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Webinars</li>
              <li className="hover:text-white cursor-pointer">Case Studies</li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">PLATFORM</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Job Board</li>
              <li className="hover:text-white cursor-pointer">Practice Tests</li>
              <li className="hover:text-white cursor-pointer">Mentorship</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">CONNECT</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">LinkedIn</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
              <li className="hover:text-white cursor-pointer">Instagram</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <span>© 2024 CA Monk. All rights reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;