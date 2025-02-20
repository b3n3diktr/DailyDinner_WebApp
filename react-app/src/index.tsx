import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

let devMode = false;

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
    devMode = true;
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

const queryClient = new QueryClient();

if(devMode) {
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </StrictMode>
    )
}else{
    root.render(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    )
}
