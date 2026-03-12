import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedUser) {
      if (storedUser.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  }, []);

  const onfieldChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const OnLogin = async e => {
    e.preventDefault(); // prevents page refresh

    if (!user.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (!user.password.trim()) {
      toast.error('Please enter your password');
      return;
    }

    try {
      const data = await loginUser(user);

      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        toast.success('User logged in successfully');

        const role = data.user.role;

        if (role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (e) {
      if (e.response?.data?.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={OnLogin} className="space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              name="email"
              value={user.email}
              onChange={e => onfieldChange(e, 'email')}
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              name="password"
              value={user.password}
              onChange={e => onfieldChange(e, 'password')}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="underline font-medium">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
