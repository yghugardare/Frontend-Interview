import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

interface BlogItemProps {
  id: string;
  title: string;
  description: string;
  footer: string;
}

// this is ts file
// in wip
// sample blog post looks like this
const blogSample = {
  id: "9",
  title: "Digital Transformation in Accounting Firms",
  category: ["TECH", "CAREER"],
  description: "How firms are adapting to cloud-based accounting",
  date: "2025-12-15T09:00:00.000Z",
  coverImage:
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  content: "Accounting ...............",
};
// for blog item, content and cover image is not needed
// top left using shadcn badges we showcase category
// top right date
// remaining appropriate
// make necessary changes

export default function BlogItem({
  id,
  title,
  description,
  footer,
}: BlogItemProps) {
  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p>{description}</p>
      </CardContent>

      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
}
