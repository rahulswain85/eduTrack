import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GetStarted from './Components/StudentRegisterLogin/GetStarted.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store.js'
import { PersistGate } from 'redux-persist/integration/react'
import Dashboard from './Components/StudentDashboard/Dashboard.jsx'
import CreateTask from './Components/StudentDashboard/CreateTask.jsx'
import ManageTask from './Components/StudentDashboard/ManageTask.jsx'
import Analysis from './Components/StudentDashboard/Analysis.jsx'



const router = createBrowserRouter(
  [{
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <GetStarted/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/create',
        element: <CreateTask/>
      },
      {
        path: '/manage',
        element: <ManageTask/>
      },
      {
        path: '/analysis',
        element: <Analysis/>
      }
    ]
  }]
)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>


  
);
