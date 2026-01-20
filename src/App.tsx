import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { BlogListPage } from "@/pages/BlogListPage";
import { BlogDetailPage } from "@/pages/BlogDetailPage";
import { CreateBlogPage } from "@/pages/CreateBlogPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/create" element={<CreateBlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
