import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import CreateBlogForm from "../components/blog/CreateBlogForm";

export default function CreateBlogPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            ← Back to Blogs
          </Button>
          <h1 className="text-4xl font-bold text-brand mb-2">Create New Blog</h1>
          <p className="text-foreground/70">
            Share your thoughts and insights with our community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
            <CardDescription>
              Fill in all the fields below to create a new blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateBlogForm onSuccess={() => navigate("/")} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
