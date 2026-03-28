import { useEffect, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Logo from '../Logo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function GetStarted() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [changeSignInSignUp, setChangeSignInSignUp] = useState('SignIn');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      <div className="md:w-120 w-full mx-4 max-w-md shadow-xl rounded-3xl flex flex-col justify-center items-center overflow-hidden p-2 bg-white/90 backdrop-blur-sm border border-indigo-100">
        <div className="flex w-full gap-2 p-2 m-4 mx-6 rounded-2xl bg-indigo-100/80">
          <button
            type="button"
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
              changeSignInSignUp === 'SignUp'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-indigo-600 hover:bg-indigo-100'
            }`}
            onClick={() => setChangeSignInSignUp('SignUp')}
          >
            Register
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
              changeSignInSignUp === 'SignIn'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-indigo-600 hover:bg-indigo-100'
            }`}
            onClick={() => setChangeSignInSignUp('SignIn')}
          >
            Login
          </button>
        </div>
        <div className="flex-1 flex w-full items-center justify-center p-6 pt-2">
          {changeSignInSignUp === 'SignUp' ? <RegisterForm /> : <LoginForm />}
        </div>
        <div className="p-4">
          <Logo />
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
