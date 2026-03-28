import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/Users/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  async function handleStudentLogin(event) {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success('You are logged in successfully!');
      navigate('/dashboard');
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error(err || 'Invalid credentials');
    }
  }

  return (
    <div className="flex flex-col w-full">
      <form className="flex flex-col gap-4 w-full" onSubmit={handleStudentLogin}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-xl py-3 px-4 bg-white/80 border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          required
          placeholder="Enter your password"
          className="w-full rounded-xl py-3 px-4 bg-white/80 border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] transition duration-200 text-white w-full disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
