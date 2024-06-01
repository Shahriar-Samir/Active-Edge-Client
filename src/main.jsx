import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/routes.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={routes}/>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
