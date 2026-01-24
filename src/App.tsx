import { Outlet, useLocation, useParams } from "react-router";
import BlogItemList from "./components/BlogList";
import { cn } from "./shadcn/lib/utils";
import { Button } from "./shadcn/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
          <BlogItemList />
        </aside>
        <section
          className={cn(
            "lg:block grow overflow-auto",
            isRoot ? "hidden" : "block",
          )}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;
