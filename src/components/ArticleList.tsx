import { fetchArticles } from "@/api/articles";
import ArticleCard from "./ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ArticleCardSkeleton from "./ArticleCardSkeleton";
import AddButton from "./AddButton";

const ArticleList = ({ setArticleDisplayData,setIsAddFormOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
  if (data && data.length > 0) {
    setArticleDisplayData(data[0]);
    setSelectedId(data[0].id);
  }
}, [data]);
  useEffect(() => {
    if (data && data.length > 0) {
      setArticleDisplayData(data[0]);
    }
  }, [data]);

  if (isLoading) return (
      <div className="flex flex-col gap-4 h-[90vh] overflow-y-auto pr-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    )
  if (error) return <p>Something went wrong</p>;

  const handleCardClick = (item) => {
    setArticleDisplayData(item);
    setSelectedId(item.id);
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-5 overflow-y-auto hover:scroll-auto h-[95vh] pr-2">
        {data.map((item, index) => {
          return (
            <div key={item.id} onClick={() => handleCardClick(item)}>
              <ArticleCard
                isSelected = {selectedId === item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                date={item.date}
              />
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-2 left-1">
      <AddButton setIsAddFormOpen={setIsAddFormOpen}/>
      </div>
    </div>
  );
};

export default ArticleList;
