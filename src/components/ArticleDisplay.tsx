import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AritcleDisplaySkeleton from "./AritcleDisplaySkeleton";
import formatDate from "@/utils/formateDate";

const ArticleDisplay = ({ articleDisplayData }) => {
  return (
    <div>
      {!articleDisplayData ? (
        <AritcleDisplaySkeleton />
      ) : (
        <Card className="w-full max-w-3xl mx-auto rounded-xl border overflow-y-auto hover:scroll-auto h-[95vh] ">
          <CardHeader className="p-0">
            <img
              src={articleDisplayData?.coverImage}
              alt="cover"
              className="w-full h-72 object-cover"
            />
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {articleDisplayData.category?.map((item, index) => {
                return (
                  <Badge key={index} className="bg-indigo-700">
                    {item}
                  </Badge>
                );
              })}
              <span>• {formatDate(articleDisplayData.date)}</span>
            </div>

            <h1 className="text-3xl font-semibold">
              {articleDisplayData.title}
            </h1>

            <p className="text-muted-foreground leading-relaxed">
              {articleDisplayData.content}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArticleDisplay;
