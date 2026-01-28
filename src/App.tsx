import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import CreateBlogForm from "@/components/CreateBlogForm";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlogForm />} />
        </Routes>
      </div>
    </Router>
  );
}
