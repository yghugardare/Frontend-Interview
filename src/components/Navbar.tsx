import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur upports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">CA Monk</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost">All Blogs</Button>
          <Button>Create Blog</Button>
        </div>
      </div>
    </nav>
  );
}
