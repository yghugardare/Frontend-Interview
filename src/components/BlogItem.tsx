import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Badge } from "@/shadcn/components/ui/badge";
import { Link } from "react-router";

interface BlogItemProps {
  id: string;
  title: string;
  description: string;
  categories: string[];
  date: string;
}

export default function BlogItem({
  id,
  title,
  description,
  categories,
  date,
}: BlogItemProps) {
  return (
    <Link
      key={id}
      to={`/blogs/${id}`}
      className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
    >
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <span className="text-xs text-muted-foreground">
              {new Date(date).toLocaleDateString("en-IN")}
            </span>
          </div>

          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
