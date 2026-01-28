import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "@/assets/university.svg";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gray-100">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" className="h-10 w-10 bg-brand rounded-sm" />
          <h1 className="text-2xl font-bold ">CA Monk</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className=" hover:bg-white/20"
          >
            All Blogs
          </Button>
          <Button
            onClick={() => navigate("/create")}
            className=" hover:bg-brand/80 bg-brand text-white"
          >
            Create Blog
          </Button>
        </div>
      </div>
    </nav>
  );
}
