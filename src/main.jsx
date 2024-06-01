import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/routes.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={routes}/>
    </AuthProvider>
  </React.StrictMode>,
)
