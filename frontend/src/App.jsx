import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import Home from './pages/Home';
import Collection from './pages/Collection';
import AdminAddProduct from './pages/AdminAddProduct';
import Product from './pages/Product';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import AdminOrders from './pages/AdminOrders';
import AdminProductList from './pages/AdminProductList';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <div className="min-h-screen bg-ivory text-dark font-sans">
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/collection/:category" element={<Collection />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Route */}
        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route path="/admin/product/edit/:id" element={<AdminAddProduct />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRole="USER" />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
