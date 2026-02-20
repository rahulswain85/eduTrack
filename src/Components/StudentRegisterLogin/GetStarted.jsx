

import React, { useEffect, useState } from 'react'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Logo from '../Logo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function GetStarted() {

  const loggedUser = useSelector(state => state.loggedUser.loggedUser);
  const navigate = useNavigate();

  useEffect(()=>{if (loggedUser) {
    navigate("/dashboard");
  }}, [])
  

  const [changeSignInSignUp, setChangeSignInSignUp] = useState('SignIn')
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 ">
      {/* Card (Centered on screen) */}
      <div className="md:w-[90vh] w-full md:m-0 m-5 h-[80vh] shadow rounded-2xl flex flex-col p-5">
        {/* Toggle Section (Top of Card) */}
        <div className="flex md:w-[50%] w-full m-4 gap-8 px-4 py-3 rounded-full shadow justify-around items-center self-center">
          <h1
            className={`sm:text-md text-sm cursor-pointer ${
              changeSignInSignUp === "SignUp"
                ? "font-bold bg-indigo-400 text-white px-4 py-3 rounded-full"
                : ""
            }`}
            onClick={() => setChangeSignInSignUp("SignUp")}
          >
            Register
          </h1>

          <h1
            className={`sm:text-md text-sm cursor-pointer ${
              changeSignInSignUp === "SignIn"
                ? "font-bold bg-indigo-400 text-white px-4 py-3 rounded-full"
                : ""
            }`}
            onClick={() => setChangeSignInSignUp("SignIn")}
          >
            Login
          </h1>
        </div>

        {/* Form Section (Takes remaining space) */}
        <div className="flex-1 flex items-center justify-center p-2">
          {changeSignInSignUp === "SignUp" ? <RegisterForm /> : <LoginForm />}
        </div>
        <Logo />
      </div>
    </div>
  );
}

export default GetStarted