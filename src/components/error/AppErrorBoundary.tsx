import * as React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

type State = {
  hasError: boolean;
  error?: Error;
};

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crashed:', error, info);
  }

  reload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="bg-muted flex min-h-screen items-center justify-center px-6">
        <div className="bg-background w-full max-w-md rounded-xl border p-6 shadow-sm">
          <div className="text-destructive flex items-start gap-3">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0" />

            <div className="space-y-2">
              <h1 className="text-lg font-semibold">Something went wrong</h1>

              <p className="text-muted-foreground text-sm">
                The application encountered an unexpected error. Please try refreshing the page.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <pre className="bg-muted mt-3 max-h-40 overflow-auto rounded-md p-3 text-xs">
                  {this.state.error.message}
                </pre>
              )}

              <Button onClick={this.reload} className="mt-4">
                Reload App
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
