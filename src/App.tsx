import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from '@/pages/BlogList';
import BlogDetail from '@/pages/BlogDetail';
import CreateBlog from '@/pages/CreateBlog';
import { Button } from '@/components/ui/button';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Blog App</Link>
            <Link to="/create">
              <Button>Create Blog</Button>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/create" element={<CreateBlog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
