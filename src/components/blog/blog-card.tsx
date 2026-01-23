import type { Blog } from "../../types/blog"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

interface BlogCardProps {
  blog: Blog
  onEdit: (blog: Blog) => void
  onDelete: (id: string) => void
}

export function BlogCardComponent({ blog, onEdit, onDelete }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.category.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-muted-foreground">{blog.date}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{blog.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={() => onEdit(blog)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(blog.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

