import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";

const AddBlogForm = ({ isFormOpen, setIsFormOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    category: [],
    date: "",
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      category: [...prev.category, categoryInput.trim()],
    }));
    setCategoryInput("");
  };

  const handleRemoveCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== category),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const currDate = new Date();

      // Create updated data object
      const updatedFormData = {
        ...formData,
        date: currDate.toISOString(),
      };

      setFormData(updatedFormData);

      console.log("formdata", updatedFormData);

      const res = await axios.post(
        "http://localhost:3001/blogs",
        updatedFormData,
      );

      setTimeout(() => {
        setIsLoading(false);
        setIsFormOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl w-full">
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        {isLoading ? (
          <DialogContent className="sm:max-w-[500px]">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-800"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100"></div>
                </div>
              </div>
              <p className="mt-6 text-lg font-semibold text-slate-700">
                Submitting your blog...
              </p>
              <p className="mt-2 text-sm text-slate-500">Please wait</p>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[500px] h-[95%] overflow-y-auto scroll-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-slate-700"
                >
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="author"
                  className="text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter blog description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="coverImage"
                  className="text-sm font-medium text-slate-700"
                >
                  Cover Image URL
                </label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Categories
                </label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add category (e.g. Tech)"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddCategory}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {cat}
                      <button
                        type="button"
                        className="text-red-600"
                        onClick={() => handleRemoveCategory(cat)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="text-sm font-medium text-slate-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog content here..."
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-indigo-800 hover:bg-indigo-600"
                >
                  Create Blog
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AddBlogForm;
