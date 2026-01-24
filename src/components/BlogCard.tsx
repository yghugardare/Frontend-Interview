import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Wait, I might need to add Badge component
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import type { Blog } from '@/types';

interface BlogCardProps {
    blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                    src={blog.coverImage || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                />
            </div>
            <CardHeader>
                <div className="flex gap-2 mb-2 flex-wrap">
                    {Array.isArray(blog.category) ? (
                        blog.category.map((cat) => (
                            <Badge key={cat} variant="secondary">
                                {cat}
                            </Badge>
                        ))
                    ) : (
                        <Badge variant="secondary">
                            {blog.category}
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm mt-2">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(blog.date).toLocaleDateString()}
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                    {blog.description}
                </p>
            </CardContent>
            <CardFooter>
                <Link to={`/blogs/${blog.id}`} className="w-full">
                    <Button variant="outline" className="w-full">Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
