export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-white"
                                    strokeWidth="2"
                                >
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-white">CA MONK</span>
                        </div>
                        <p className="text-sm text-gray-400 max-w-sm">
                            Experience true one-stop platform for personalized investment.
                            Build wealth with ease.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm">RESOURCES</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/blogs" className="text-sm hover:text-white transition-colors">
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a href="/faqs" className="text-sm hover:text-white transition-colors">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm">POLICIES</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/privacy" className="text-sm hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-sm hover:text-white transition-colors">
                                    Terms of Use
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company & Connect Combined */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm">COMPANY</h3>
                        <ul className="space-y-3 mb-6">
                            <li>
                                <a href="/careers" className="text-sm hover:text-white transition-colors">
                                    Careers
                                </a>
                            </li>
                        </ul>
                        <h3 className="text-white font-semibold mb-4 text-sm">CONNECT</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/contact" className="text-sm hover:text-white transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/support" className="text-sm hover:text-white transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} CA MONK. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="/privacy"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
