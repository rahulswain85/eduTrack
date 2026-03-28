import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/Users/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [name, setName] = useState('');
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

  async function handleUserRegistration(event) {
    event.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success('You are registered successfully!');
      navigate('/dashboard');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error(err || 'Registration failed');
    }
  }

  return (
    <div className="flex  flex-col w-full">
      <form className="flex flex-col gap-4 w-full" onSubmit={handleUserRegistration}>
        <input
          type="text"
          required
          placeholder="Enter your name"
          className="w-full rounded-xl py-3 px-4 bg-white/80 border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
