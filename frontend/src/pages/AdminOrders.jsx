import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingDetails?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.shippingDetails?.phone?.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Change order status to ${status}?`)) return;

    try {
      const updatedOrder = await updateOrderStatus(id, status);

      setOrders(prev =>
        prev.map(order => (order._id === id ? updatedOrder : order))
      );
    } catch (error) {
      console.error(error);
    }
  };

  /* ===============================
     📊 Revenue Summary Calculations
  =============================== */

  const totalRevenue = orders
    .filter(order => order.status === 'Delivered')
    .reduce((acc, order) => acc + order.totalAmount, 0);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-semibold mb-8">Admin Order Management</h1>

      {/* ===============================
           💰 Revenue Summary Cards
      =============================== */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">₹{totalRevenue}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold">{totalOrders}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Delivered Orders</p>
          <h2 className="text-2xl font-bold">{deliveredOrders}</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="All">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* ===============================
           📋 Orders Table
      =============================== */}

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm uppercase">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-4">#{order._id.slice(-6)}</td>

                <td className="p-4">
                  {order.userId?.name}
                  <div className="text-xs text-gray-500">
                    {order.userId?.email}
                  </div>
                </td>

                <td className="p-4">₹{order.totalAmount}</td>

                <td className="p-4">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Unpaid
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* ===============================
                     🔽 STATUS DROPDOWN
                =============================== */}

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order._id, e.target.value)}
                    className="border px-3 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {order.deliveredAt && (
                    <div className="text-xs text-green-600 mt-1">
                      Delivered on{' '}
                      {new Date(order.deliveredAt).toLocaleDateString()}
                    </div>
                  )}
                </td>

                {/* ===============================
                     🔍 VIEW DETAILS BUTTON
                =============================== */}

                <td className="p-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-sm px-4 py-1 bg-black text-white rounded-full hover:opacity-80"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===============================
           📦 ORDER DETAILS MODAL
      =============================== */}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-bold">
                Order #{selectedOrder._id.slice(-6)}
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Customer Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Customer</h3>
              <p>{selectedOrder.userId?.name}</p>
              <p className="text-sm text-gray-500">
                {selectedOrder.userId?.email}
              </p>
            </div>

            {/* Payment + Shipping */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Payment Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Payment Details</h3>

                <p className="text-sm">
                  <span className="font-medium">Payment ID:</span>{' '}
                  {selectedOrder.paymentId}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Razorpay Order ID:</span>{' '}
                  {selectedOrder.razorpayOrderId}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Paid At:</span>{' '}
                  {new Date(selectedOrder.paidAt).toLocaleString()}
                </p>

                <p className="mt-2">
                  <span className="font-medium">Status:</span>{' '}
                  {selectedOrder.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </p>
              </div>

              {/* Shipping Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Shipping Details</h3>

                <p className="text-sm font-medium">
                  {selectedOrder.shippingDetails?.fullName}
                </p>

                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingDetails?.phone}
                </p>

                <p className="text-sm mt-2 text-gray-600">
                  {selectedOrder.shippingDetails?.address}
                </p>

                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingDetails?.city},{' '}
                  {selectedOrder.shippingDetails?.state}
                </p>

                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingDetails?.pincode}
                </p>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Ordered Items</h3>

              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="font-semibold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 border-t pt-4 text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹{selectedOrder.totalAmount}</span>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
