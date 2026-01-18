import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
    message?: string;
}

export const EmptyState = ({
    message = 'No blogs found.'
}: EmptyStateProps) => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Content</h3>
                <p className="text-muted-foreground">{message}</p>
            </CardContent>
        </Card>
    );
};
