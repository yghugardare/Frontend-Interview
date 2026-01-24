import { Link } from "react-router";
import { Button } from "@/shadcn/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Button asChild>
        <Link to="/blogs">Go Home</Link>
      </Button>
    </div>
  );
}
