import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import Authprovider from './Authprovider/Authprovider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<QueryClientProvider client={queryClient}>
<Authprovider>
  <RouterProvider router={router} ></RouterProvider>
</Authprovider>

    </QueryClientProvider>


  </React.StrictMode>,
)
