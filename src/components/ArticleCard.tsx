import formatDate from "@/utils/formateDate";
import { Card } from "./ui/card";

const ArticleCard = ({ title, description, category, date,isSelected }) => {
  return (
    <Card className={`p-4 cursor-pointer hover:shadow-md transition shadow-sm ${isSelected ? "border border-indigo-700" :""} border-2`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex gap-1">
            {category?.map((item, index) => {
              return (
                <span key={index} className="text-[10px] px-2 p-1  py-[2px] rounded-full bg-indigo-100 text-indigo-700 font-medium">
                  {item}
                </span>
              );
            })}
          </div>
          <span>{formatDate(date)}</span>
        </div>

        <h3 className="font-semibold text-sm text-gray-800 mb-3">{title}</h3>

        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
      </div>
    </Card>
  );
};

export default ArticleCard;
