import React, { useState } from 'react'
import Logo from '../Logo';
import { useDispatch } from 'react-redux';
import { registerStudent } from '../../features/Users/userSlice';
import { toast } from 'react-toastify';

function RegisterForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function handleUserRegistration(event) {
    event.preventDefault();

    const newStudent = { name, email, password }

    try {
      dispatch(registerStudent(newStudent));
      toast.success("You are registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Registration failed!");
    }
    
  }

  return (
    <div className="flex flex-col w-full">
      
      <form className="flex flex-col gap-2 w-full" onSubmit={(e)=>handleUserRegistration(e)}>
        <input
          type="text"
          required
          placeholder="Enter your name"
          className="w-full rounded-lg py-2 px-1 bg-gray-50 outline outline-indigo-200"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-lg py-2 px-1 bg-gray-50 outline outline-indigo-200"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Enter your password"
          className="w-full rounded-lg py-2 px-1 bg-gray-50 outline outline-indigo-200"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="px-4 py-3 rounded-lg font-bold bg-indigo-400 border hover:bg-indigo-500 transition duration-300 text-white md:w-[50%] w-full m-auto sm:text-lg text-md">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm