import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupUser } from '../../services/authService';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onfieldChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const validateForm = () => {
    if (!user.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!user.email.trim()) {
      toast.error('Email is required');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      toast.error('Enter a valid email');
      return false;
    }

    if (!user.password) {
      toast.error('Password is required');
      return false;
    }

    if (user.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const onSignup = async (e) => {
    e.preventDefault(); // prevents page refresh

    if (!validateForm()) return;

    try {
      await signupUser(user);
      toast.success('User created successfully');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={onSignup} className="space-y-4">
          <div>
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              name="name"
              value={user.name}
              onChange={(e) => onfieldChange(e, 'name')}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              name="email"
              value={user.email}
              onChange={(e) => onfieldChange(e, 'email')}
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              name="password"
              value={user.password}
              onChange={(e) => onfieldChange(e, 'password')}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;