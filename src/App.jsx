import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import SideBar from './Components/SideBar';
import { Bounce, ToastContainer } from 'react-toastify';
import { clearAuth } from './features/Users/authSlice';
import { clearTasks } from './features/Tasks/taskApiSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      dispatch(clearAuth());
      dispatch(clearTasks());
    }
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideBar />
      <main className="md:ml-0 ml-0 flex-1 min-h-screen">
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
