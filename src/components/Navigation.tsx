import { Button } from '@/components/ui/button';

export function Navigation() {
    return (
        <nav className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
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
                        <span className="text-lg font-bold text-gray-900">CA MONK</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="/"
                            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="/portfolios"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Portfolios
                        </a>
                        <a
                            href="/events"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Events
                        </a>
                        <a
                            href="/get-started"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Get Started
                        </a>
                        <a
                            href="/blogs"
                            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Posts
                        </a>
                    </div>

                    {/* Sign Up Button */}
                    <div className="flex items-center gap-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
