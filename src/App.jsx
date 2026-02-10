
import { Outlet } from 'react-router-dom'
import './App.css'
import SideBar from './Components/SideBar'

function App() {

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App
