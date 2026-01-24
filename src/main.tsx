import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import "./index.css";
import App from "./App.tsx";
import BlogDetailContainer from "./components/BlogDetailContainer.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          <Route path="blogs" element={<App />}>
            <Route
              index
              element={
                <div className="flex h-full items-center justify-center p-4 text-muted-foreground">
                  Select a blog to view
                </div>
              }
            />
            <Route path=":id" element={<BlogDetailContainer />} />
            {/* <Route path="new" element={<BlogForm />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
