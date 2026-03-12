import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-10">
      <h1 className="text-4xl font-serif mb-10">Welcome Admin, {user?.name}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Products */}
        <Link
          to="/admin/products"
          className="bg-white shadow-xl rounded-2xl p-8 hover:-translate-y-1 hover:shadow-2xl transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-gray-600 text-sm">
            View, add, update or delete products
          </p>
        </Link>

        {/* Orders */}
        <Link
          to="/admin/orders"
          className="bg-white shadow-xl rounded-2xl p-8 hover:-translate-y-1 hover:shadow-2xl transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-600 text-sm">
            View and manage customer orders
          </p>
        </Link>

        {/* Users */}
        <Link
          to="/admin/users"
          className="bg-white shadow-xl rounded-2xl p-8 hover:-translate-y-1 hover:shadow-2xl transition duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600 text-sm">Manage registered users</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
