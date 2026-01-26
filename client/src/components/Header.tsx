import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" data-testid="link-home">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">CA</span>
          </div>
          <span className="font-bold text-foreground text-lg">CA MONK</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-tools">
            Tools
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-practice">
            Practice
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-events">
            Events
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-job-board">
            Job Board
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-points">
            Points
          </a>
        </nav>

        {/* Profile Button */}
        <Button variant="default" size="sm" data-testid="button-profile">
          Profile
        </Button>
      </div>
    </header>
  );
}
