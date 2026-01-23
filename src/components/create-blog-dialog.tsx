import { useState } from 'react'
import { Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createBlog } from "@/api/blogs"

interface CreateBlogDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: (newBlogId: string) => void
}

export function CreateBlogDialog({ open, onOpenChange, onSuccess }: CreateBlogDialogProps) {
    const queryClient = useQueryClient()
    const [newBlogData, setNewBlogData] = useState({
        title: '',
        category: '',
        description: '',
        coverImage: '',
        content: ''
    })

    const createBlogMutation = useMutation({
        mutationFn: createBlog,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            onSuccess(data.id)
            onOpenChange(false)
            setNewBlogData({
                title: '',
                category: '',
                description: '',
                coverImage: '',
                content: ''
            })
        }
    })

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const categoryArray = newBlogData.category.split(',').map(c => c.trim().toUpperCase()).filter(Boolean)

        createBlogMutation.mutate({
            ...newBlogData,
            category: categoryArray.length > 0 ? categoryArray : ['GENERAL'],
            date: new Date().toISOString()
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Blog</DialogTitle>
                    <DialogDescription>
                        Fill in the details to publish a new blog post.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter blog title"
                            value={newBlogData.title}
                            onChange={(e) => setNewBlogData({ ...newBlogData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categories (comma separated)</Label>
                        <Input
                            id="category"
                            placeholder="TECH, FINANCE, LIFE"
                            value={newBlogData.category}
                            onChange={(e) => setNewBlogData({ ...newBlogData, category: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Cover Image URL</Label>
                        <Input
                            id="image"
                            placeholder="https://..."
                            value={newBlogData.coverImage}
                            onChange={(e) => setNewBlogData({ ...newBlogData, coverImage: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief summary..."
                            value={newBlogData.description}
                            onChange={(e) => setNewBlogData({ ...newBlogData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Full blog content..."
                            className="min-h-[150px]"
                            value={newBlogData.content}
                            onChange={(e) => setNewBlogData({ ...newBlogData, content: e.target.value })}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={createBlogMutation.isPending}>
                            {createBlogMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Blog
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
