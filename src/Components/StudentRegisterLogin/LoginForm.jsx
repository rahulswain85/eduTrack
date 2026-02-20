import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "../../features/Users/loggedUserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const studentSelector = useSelector(state => state.users.users);
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleStudentLogin(event) {
    event.preventDefault();

    const loggedUser = studentSelector.filter(student => student.email === email && student.password === password);

    if (loggedUser.length > 0) {
      try {
        dispatch(studentLogin(loggedUser[0]));
        toast.success("You are logged in successfully!");
        navigate("/dashboard")
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
        
        toast.error("Problem logging in!");
      }
    }
    else {
      toast.error("Invalid user credentials!");
    }

  }
  

  return (
    <div className="flex flex-col w-full">
      
      <form className="flex flex-col gap-2 w-full" onSubmit={(e)=>handleStudentLogin(e)}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-lg py-2 px-1 bg-gray-50 outline outline-indigo-200"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Enter your password"
          className="w-full rounded-lg py-2 px-1 bg-gray-50 outline outline-indigo-200"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="px-4 py-3 rounded-lg font-bold bg-indigo-400 border hover:bg-indigo-500 transition duration-300 text-white md:w-[50%] w-full m-auto sm:text-lg text-md">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm