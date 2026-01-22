import type { ReactNode } from "react";
import { CreateBlogDialog } from "../blogs/CreateBlogDialog";

interface AppShellProps {
  children: ReactNode;
  onBlogCreated?: (blogId: string) => void;
}

export function AppShell({ children, onBlogCreated }: AppShellProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              className="h-8 w-8"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z"
                fill="#1a1a1a"
              />
              <path
                d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.5 0 2.5-1 2.5-2.5 0-.65-.25-1.25-.67-1.67-.42-.42-.58-.83-.58-1.33 0-1 .75-1.75 1.75-1.75h2.05c2.48 0 4.5-2.02 4.5-4.5C24 10.69 20.42 8 16 8z"
                fill="#1a1a1a"
              />
            </svg>
            <span className="font-bold text-xl text-gray-900">
              CA Monk
            </span>
          </div>

          {/* Right side - New Blog Button */}
          <CreateBlogDialog onBlogCreated={onBlogCreated} />
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
