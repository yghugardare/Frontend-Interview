import { Outlet, useLocation, useParams } from "react-router";
import BlogItemList from "./components/BlogList";
import { cn } from "./shadcn/lib/utils";
import { Button } from "./shadcn/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  const location = useLocation();
  const isRoot = location.pathname === "/blogs" || location.pathname === "/";

  return (
    <div className="h-screen flex flex-col ">
      <main className="h-full flex">
        <aside
          className={cn(
            "w-full lg:max-w-90 shrink-0 overflow-auto p-2 lg:block",
            isRoot ? "block" : "hidden",
          )}
        >
          <ErrorBoundary name="BlogList">
            <BlogItemList />
          </ErrorBoundary>
        </aside>
        <section
          className={cn(
            "lg:block grow overflow-auto",
            isRoot ? "hidden" : "block",
          )}
        >
          <ErrorBoundary name="BlogView">
            <Outlet />
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;
