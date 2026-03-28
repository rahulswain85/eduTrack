import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import GetStarted from './Components/StudentRegisterLogin/GetStarted.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './Components/StudentDashboard/Dashboard.jsx';
import CreateTask from './Components/StudentDashboard/CreateTask.jsx';
import ManageTask from './Components/StudentDashboard/ManageTask.jsx';
import { Analysis } from './Components/StudentDashboard/Analysis.jsx';
import AllTasks from './Components/StudentDashboard/AllTasks.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <GetStarted />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/create',
        element: (
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        ),
      },
      {
        path: '/manage',
        element: (
          <ProtectedRoute>
            <ManageTask />
          </ProtectedRoute>
        ),
      },
      {
        path: '/all-tasks',
        element: (
          <ProtectedRoute>
            <AllTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: '/analysis',
        element: (
          <ProtectedRoute>
            <Analysis />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
