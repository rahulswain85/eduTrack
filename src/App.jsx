
import { Outlet } from 'react-router-dom'
import './App.css'
import SideBar from './Components/SideBar'
import { Bounce, ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
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

export default App
