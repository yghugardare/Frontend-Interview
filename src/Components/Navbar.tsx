import { Button } from "@/components/ui/button"

const navItems = [
  "Tools",
  "Practice",
  "Events",
  "Job Board",
  "Points",
]

export default function Navbar() {
  return (
    <header className="sticky z-50 top-0 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-15 items-center justify-between px-8">
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            CA
          </div>
          <span className="text-lg font-semibold">MONK</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navItems.map((item) => (
            <button
              key={item}
              className="p-2 hover:font-bold hover:text-lg transition-all duration-120 ease-in-out"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
            Profile
          </Button>

        </div>

      </div>
    </header>
  )
}
