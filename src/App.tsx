import { useState } from "react";
import "./App.css";
import ArticleDisplay from "./components/ArticleDisplay";
import ArticleList from "./components/ArticleList";
import AddBlogForm from "./components/AddBlogForm";

function App() {
  
  const [articleDisplayData,setArticleDisplayData] = useState();
  const [isAddFormOpen,setIsAddFormOpen] = useState(false)

  return (
    <div className="overflow-hidden h-[100vh] relative">
      <div className="flex p-5 gap-10 bg-gray-200 relative">
        <div className="w-1/3">
        <div className="fixed w-1/3 ">
        <ArticleList setIsAddFormOpen={setIsAddFormOpen} setArticleDisplayData={setArticleDisplayData}/>
        </div>
        </div>
        <div className="w-2/3 border">
        <ArticleDisplay articleDisplayData={articleDisplayData}/>
        </div>
      </div>
      <div>
      {
        isAddFormOpen ? <div className="bg-black absolute top-0">
          <AddBlogForm setIsFormOpen = {setIsAddFormOpen} isFormOpen = {isAddFormOpen}/>
        </div> : ""
      }
      </div>
    </div>
  );
}

export default App;
