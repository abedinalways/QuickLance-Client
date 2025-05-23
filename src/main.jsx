import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes'
import AuthProvider from './Context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './Context/ThemeContext'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
