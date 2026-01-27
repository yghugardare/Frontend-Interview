import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  className?: string
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header className={cn("border-b bg-background/80 backdrop-blur", className)}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-wide text-foreground">CA MONK</span>
        </div>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a className="hover:text-foreground" href="#">
            Tools
          </a>
          <a className="hover:text-foreground" href="#">
            Practice
          </a>
          <a className="hover:text-foreground" href="#">
            Events
          </a>
          <a className="hover:text-foreground" href="#">
            Job Board
          </a>
          <a className="hover:text-foreground" href="#">
            Points
          </a>
        </nav>

        <Button className="rounded-full bg-purple-600 hover:bg-purple-700" size="sm">
          Profile
        </Button>
      </div>
    </header>
  )
}

