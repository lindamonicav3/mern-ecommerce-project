import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../services/orderService';
import { FaShoppingBag, FaRupeeSign } from 'react-icons/fa';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        setOrders(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const recentOrders = orders.slice(0, 3);
console.log(recentOrders)
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold">
            Welcome back, <span className="text-gray-700">{user?.name}</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Track your orders and manage your shopping activity.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Total Orders */}
          <div className="bg-white shadow-md rounded-2xl p-8 flex items-center gap-6 hover:shadow-lg transition">
            <div className="bg-black text-white p-4 rounded-full text-xl">
              <FaShoppingBag />
            </div>

            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                Total Orders
              </p>
              <p className="text-3xl font-bold mt-1">{totalOrders}</p>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-white shadow-md rounded-2xl p-8 flex items-center gap-6 hover:shadow-lg transition">
            <div className="bg-green-600 text-white p-4 rounded-full text-xl">
              <FaRupeeSign />
            </div>

            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                Total Spent
              </p>
              <p className="text-3xl font-bold mt-1">
                ₹{totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>

            <Link
              to="/orders"
              className="text-sm font-medium text-black hover:underline"
            >
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                You haven’t placed any orders yet.
              </p>

              <Link
                to="/collection/jewellery"
                className="inline-block mt-6 px-6 py-2 bg-black text-white rounded-full hover:opacity-90"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div
                  key={order._id}
                  className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <img
                      src={order.items[0]?.image}
                      alt=""
                      className="w-14 h-14 rounded object-cover"
                    />

                    <div>
                      <p className="font-medium">
                        Order #{order._id.slice(-6)}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-gray-400">
                        {order.items.length} item(s)
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ₹{order.totalAmount}
                    </p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium
                        ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-700'
                              : order.status === 'Processing'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
