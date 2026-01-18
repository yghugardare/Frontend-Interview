import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
    message = 'Something went wrong. Please try again.',
    onRetry
}: ErrorStateProps) => {
    return (
        <Card className="border-destructive/50">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold mb-2">Error</h3>
                <p className="text-muted-foreground mb-4">{message}</p>
                {onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        Try Again
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
