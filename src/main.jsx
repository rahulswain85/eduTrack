import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GetStarted from './Components/StudentRegisterLogin/GetStarted.jsx'


const router = createBrowserRouter(
  [{
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <GetStarted/>
      }
    ]
  }]
)

createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}/>
  
)
