import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';
import { AppErrorBoundary } from './components/error/AppErrorBoundary.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
);
