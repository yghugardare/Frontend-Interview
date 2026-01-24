import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `Uncaught error in ${this.props.name || "application"}:`,
      error,
      errorInfo,
    );
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-red-500 border rounded-xl">
          <AlertCircle className="mb-2 h-10 w-10" />
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="text-sm text-gray-500">{this.state.error?.message}</p>
          <button
            className="mt-4 rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
