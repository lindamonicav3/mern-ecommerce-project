import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const { cart, clearCart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.clear();
    clearCart();
    navigate('/');
  };

  return (
    <header className="bg-[#fdfaf6] border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Auria Logo"
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/collection/jewellery">Jewellery</Link>
          <Link to="/collection/clothing">Women’s Clothing</Link>
          <Link to="/collection/phone">Phone Accessories</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              {user?.role !== 'ADMIN' && (
                <Link to="/user/dashboard">Hi, {user?.name}</Link>
              )}

              {user?.role === 'ADMIN' && (
                <Link to="/admin/dashboard">Hi, {user?.name}</Link>
              )}

              <button
                onClick={handleLogout}
                className="cursor-pointer px-3 py-1 border rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}

          <Link to="/cart" className="relative">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
