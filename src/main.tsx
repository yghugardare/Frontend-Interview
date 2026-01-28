import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreateBlogPage from "./pages/CreateBlogPage";
import LatestBlogPage from "./pages/LatestBlogPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPostsPage from "./pages/CategoryPostsPage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <App />
              </Layout>
            }
          />
          <Route
            path="/blogs"
            element={
              <Layout>
                <LatestBlogPage />
              </Layout>
            }
          />
          <Route
            path="/categories"
            element={
              <Layout>
                <CategoriesPage />
              </Layout>
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <Layout>
                <CategoryPostsPage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path="/create"
            element={
              <Layout>
                <CreateBlogPage />
              </Layout>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
